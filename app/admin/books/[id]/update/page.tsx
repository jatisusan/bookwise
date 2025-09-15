import BookForm from "@/components/admin/forms/BookForm";
import { Button } from "@/components/ui/button";
import { db } from "@/database/drizzle";
import { books } from "@/database/schema";
import { eq } from "drizzle-orm";
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

      <section className="w-full max-w-2xl">
        <BookForm type="update" {...bookDetails} />
      </section>
    </>
  );
};

export default page;
