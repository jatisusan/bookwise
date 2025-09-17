import { accountColumns } from "@/components/admin/table/columns";
import { DataTable } from "@/components/admin/table/DataTable";
import { db } from "@/database/drizzle";
import { users } from "@/database/schema";
import { eq } from "drizzle-orm";

const page = async () => {
  const result = await db
    .select()
    .from(users)
    .where(eq(users.status, "PENDING"));
  return (
    <section className="p-7 w-full rounded-2xl bg-white">
      <DataTable
        columns={accountColumns}
        data={result}
        title="Pending Account Requests"
        searchColumn="fullName"
      />
    </section>
  );
};

export default page;
