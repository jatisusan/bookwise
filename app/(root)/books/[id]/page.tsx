import { auth } from "@/auth";
import BookCard from "@/components/BookCard";
import BookCover from "@/components/BookCover";
import BookList from "@/components/BookList";
import BookOverview from "@/components/BookOverview";
import BookVideo from "@/components/BookVideo";
import { db } from "@/database/drizzle";
import { books } from "@/database/schema";
import { and, eq, ilike, ne, or } from "drizzle-orm";
import Link from "next/link";
import { redirect } from "next/navigation";

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id;

  const [bookDetails] = await db
    .select()
    .from(books)
    .where(eq(books.id, id))
    .limit(1);

  if (!bookDetails) redirect("/404");

  const session = await auth();

  // Split genres and trim whitespace
  const genres = bookDetails.genre
    .split("/")
    .map((g: string) => g.trim())
    .filter(Boolean);

  // Build OR conditions for genre matching (case-insensitive, partial match)
  const genreConditions = genres.map((g) => ilike(books.genre, `%${g}%`));

  const similarBooks = await db
    .select()
    .from(books)
    .where(and(or(...genreConditions), ne(books.id, id)))
    .limit(6);

  return (
    <>
      <BookOverview {...bookDetails} userId={session?.user?.id as string} />

      <div className="book-details">
        <div className="flex-[1.5]">
          <section className="flex flex-col gap-7">
            <h3>Video</h3>
            <BookVideo videoUrl={bookDetails.videoUrl} />
          </section>

          <section className="flex flex-col gap-7 mt-10">
            <h3 className="text-white">Summary</h3>

            <div className="space-y-5 text-xl text-light-100">
              {bookDetails.summary.split("\n").map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          </section>
        </div>

        <div className="flex-1">
          <h3>More Similar Books</h3>

          <ul className="w-full xl:grid xl:grid-cols-3 sm:flex sm:flex-wrap grid grid-cols-3 gap-4 mt-7">
            {similarBooks.map((book) => (
              <Link key={book.title} href={`/books/${book.id}`}>
                <BookCover
                  variant="small"
                  coverColor={book.coverColor}
                  coverImage={book.coverUrl}
                />
              </Link>
            ))}
          </ul>
        </div>
      </div>
    </>
  );
};

export default page;
