import { userColumns } from "@/components/admin/table/columns";
import { DataTable } from "@/components/admin/table/DataTable";
import { db } from "@/database/drizzle";
import { borrowRecords, users } from "@/database/schema";
import { count, desc, eq, getTableColumns, ne } from "drizzle-orm";
import React from "react";

const page = async () => {
  const result = await db
    .select({
      ...getTableColumns(users),
      borrowedBooks: count(borrowRecords.id).as("borrowedBooks"), // <-- count borrow records
    })
    .from(users)
    .leftJoin(borrowRecords, eq(users.id, borrowRecords.userId))
    .where(ne(users.status, 'PENDING'))
    .groupBy(
      users.id,
      users.fullName,
      users.email,
      users.universityId,
      users.password,
      users.universityCard,
      users.status,
      users.role,
      users.lastActivityDate,
      users.createdAt
    ) // group by user so count works
    .orderBy(desc(users.createdAt));
  return (
    <section className="p-7 w-full rounded-2xl bg-white">
      <DataTable
        columns={userColumns}
        data={result}
        title="All Users"
        searchColumn="fullName"
      />
    </section>
  );
};

export default page;
