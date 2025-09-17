import { borrowColumns } from "@/components/admin/table/columns";
import { DataTable } from "@/components/admin/table/DataTable";
import { db } from "@/database/drizzle";
import { books, borrowRecords, users } from "@/database/schema";
import { eq, getTableColumns } from "drizzle-orm";

const page = async () => {
  const result = await db
    .select({
      ...getTableColumns(borrowRecords),
      userFullName: users.fullName,
      userEmail: users.email,
      bookTitle: books.title,
      bookCoverUrl: books.coverUrl,
      bookCoverColor: books.coverColor,
    })
    .from(borrowRecords)
    .innerJoin(books, eq(books.id, borrowRecords.bookId))
    .innerJoin(users, eq(users.id, borrowRecords.userId));

  return (
    <section className="p-7 w-full rounded-2xl bg-white">
      <DataTable
        columns={borrowColumns}
        data={result}
        title="Borrow Requests"
        searchColumn="userFullName"
      />
    </section>
  );
};

export default page;
