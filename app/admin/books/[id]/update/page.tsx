import BookForm from "@/components/admin/forms/BookForm";
import { Button } from "@/components/ui/button";
import Link from "next/link";

const page = () => {
  return (
    <>
      <Button className="back-btn" asChild>
        <Link href={"/admin/books"}>Go back</Link>
      </Button>

      <section className="w-full max-w-2xl">
        <BookForm type="update" />
      </section>
    </>
  );
};

export default page;
