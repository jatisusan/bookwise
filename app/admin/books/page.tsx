import { bookColumns } from "@/components/admin/table/columns";
import { DataTable } from "@/components/admin/table/DataTable";
import { db } from "@/database/drizzle";
import { books } from "@/database/schema";
import { desc } from "drizzle-orm";
import React from "react";

const page = async () => {
  const result = await db.select().from(books).orderBy(desc(books.createdAt));
  return (
    <section className="p-7 w-full rounded-2xl bg-white">
      <DataTable columns={bookColumns} data={result} title="All Books" addBtn searchColumn="title" />
    </section>
  );
};

export default page;
