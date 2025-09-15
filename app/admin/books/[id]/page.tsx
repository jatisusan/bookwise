import BookCover from "@/components/BookCover";
import BookVideo from "@/components/BookVideo";
import { Button } from "@/components/ui/button";
import { db } from "@/database/drizzle";
import { books } from "@/database/schema";
import { eq } from "drizzle-orm";
import Image from "next/image";
import Link from "next/link";

const page = async ({ params }: { params: Promise<{ id: string }> }) => {
  const id = (await params).id;

  const [bookDetails] = await db
    .select()
    .from(books)
    .where(eq(books.id, id))
    .limit(1);

  return (
    <>
      <Button className="back-btn" asChild>
        <Link href={"/admin/books"}>Go back</Link>
      </Button>

      <section className="w-full flex gap-10 flex-col lg:flex-row">
        <div
          style={{ backgroundColor: `${bookDetails.coverColor}44` }}
          className="w-[360px] flex justify-center items-center px-12 py-8 rounded-xl"
        >
          <BookCover
            coverColor={bookDetails.coverColor}
            coverImage={bookDetails.coverUrl}
            variant="medium"
          />
        </div>

        <div className="flex flex-col gap-4">
          <div className="flex gap-6">
            <p className="text-slate-500">Created at: </p>
            <div className="flex gap-2 items-center">
              <Image
                src="/icons/admin/calendar.svg"
                alt="calendar"
                width={22}
                height={22}
              />
              <p className="text-dark-200">
                {bookDetails.createdAt?.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                  year: "numeric",
                })}
              </p>
            </div>
          </div>

          <h2 className="text-dark-400 text-3xl font-semibold mt-2">
            {bookDetails.title}
          </h2>
          <h3 className="text-dark-200 text-xl font-semibold mb-2">
            {bookDetails.author}
          </h3>
          <p className="text-slate-500 font-normal">{bookDetails.genre}</p>

          <div className="flex gap-6 items-center">
            <p className="text-dark-200 font-normal">Total: {bookDetails.totalCopies}</p>
            <p className="text-dark-200 font-normal">Available: {bookDetails.availableCopies}</p>
          </div>

          <Button
            className="bg-primary-admin hover:bg-primary-admin/90 min-h-12 py-4 flex items-center"
            asChild
          >
            <Link href={`/admin/books/${bookDetails.id}/update`}>
              <Image
                src="/icons/admin/edit-2.svg"
                alt="edit"
                width={22}
                height={22}
              />
              <p>Edit Book</p>
            </Link>
          </Button>
        </div>
      </section>

      <section className="flex flex-col gap-12 mt-12">
        <div>
          <h3 className="text-xl text-dark-200 font-semibold mb-4">Summary</h3>
          <div className="space-y-5 text-base text-slate-500">
            {bookDetails.summary.split("\n").map((para, i) => (
              <p key={i}>{para}</p>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-xl text-dark-200 font-semibold mb-4">Video</h3>
          <BookVideo videoUrl={bookDetails.videoUrl} />
        </div>
      </section>
    </>
  );
};

export default page;
