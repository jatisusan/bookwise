import { db } from "@/database/drizzle";
import { books, borrowRecords, users } from "@/database/schema";
import { sendEmail } from "@/lib/workflow";
import { serve } from "@upstash/workflow/nextjs";
import dayjs from "dayjs";
import { eq } from "drizzle-orm";

export const scheduledWorkflow = serve(async (context) => {
  await context.run("send-borrow-reminders", async () => {
    const records = await db
      .select({
        email: users.email,
        userFullName: users.fullName,
        bookTitle: books.title,
        status: borrowRecords.status,
        dueDate: borrowRecords.dueDate,
      })
      .from(borrowRecords)
      .leftJoin(users, eq(borrowRecords.userId, users.id))
      .leftJoin(books, eq(borrowRecords.bookId, books.id))
      .where(eq(borrowRecords.status, "BORROWED")); // only active borrows

    const today = dayjs().startOf("day");

    for (const record of records) {
      const due = dayjs(record.dueDate).startOf("day");

      const daysLeft = due.diff(today, "day");

      if (daysLeft === 2) {
        // 2-day reminder
        await sendEmail({
          email: record.email!,
          name: record.userFullName!,
          subject: "Your borrowed book is due soon",
          title: "Your borrowed book is due soon",
          message: `Your book "${record.bookTitle}" is due in 2 days. Please return it on time.`,
        });
      }

      if (daysLeft < 0) {
        // overdue
        await sendEmail({
          email: record.email!,
          name: record.userFullName!,
          subject: "Your borrowed book is overdue",
          title: "Your borrowed book is overdue",
          message: `Your book "${record.bookTitle}" was due on ${dayjs(
            record.dueDate
          ).format("MMM D, YYYY")}. Please return it as soon as possible.`,
        });
      }
    }
  });
});
