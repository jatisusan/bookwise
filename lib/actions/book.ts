"use server";

import { db } from "@/database/drizzle";
import { books, borrowRecords } from "@/database/schema";
import { eq } from "drizzle-orm";

export const borrowBook = async (params: BorrowBookParams) => {
  const { bookId, userId } = params;
  try {
    const book = await db
      .select({ availableCopies: books.availableCopies })
      .from(books)
      .where(eq(books.id, bookId))
      .limit(1);

    if (!book.length || book[0].availableCopies <= 0) {
      return { success: false, error: "Book not available for borrowing" };
    }

    const record = await db.insert(borrowRecords).values({
      bookId,
      userId,
      status: "REQUESTED",
    });

    await db
      .update(books)
      .set({ availableCopies: book[0].availableCopies - 1 })
      .where(eq(books.id, bookId));

    return { success: true, data: JSON.parse(JSON.stringify(record)) };
  } catch (error) {
    console.log(error);
    return { success: false, error: "Failed to borrow book" };
  }
};
