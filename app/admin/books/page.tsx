import { bookColumns } from "@/components/admin/table/columns";
import { DataTable } from "@/components/admin/table/DataTable";
import { Button } from "@/components/ui/button";
import { db } from "@/database/drizzle";
import { books } from "@/database/schema";
import { desc } from "drizzle-orm";
import Link from "next/link";
import React from "react";

const page = async () => {
  const result = await db.select().from(books).orderBy(desc(books.createdAt));
  return (
    <section className="p-7 w-full rounded-2xl bg-white">
      <div className="flex flex-wrap justify-between items-center gap-2">
        <h2 className="text-xl font-semibold">All Books</h2>

        <Button className="bg-primary-admin hover:bg-primary-admin/90" asChild>
          <Link href="/admin/books/new" className="text-white">
            + Add New
          </Link>
        </Button>
      </div>

      <div className="w-full mt-10 overflow-hidden">
        <DataTable columns={bookColumns} data={result} />
      </div>
    </section>
  );
};

export default page;
