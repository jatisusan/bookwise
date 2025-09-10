import { auth } from "@/auth";
import BookOverview from "@/components/BookOverview";
import BookVideo from "@/components/BookVideo";
import { db } from "@/database/drizzle";
import { books } from "@/database/schema";
import { eq } from "drizzle-orm";
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

  return (
    <>
      <BookOverview {...bookDetails} userId={session?.user?.id as string}  />

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

        <div></div>
      </div>
    </>
  );
};

export default page;
