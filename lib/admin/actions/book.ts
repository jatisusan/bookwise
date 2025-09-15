"use server";

import { db } from "@/database/drizzle";
import { books } from "@/database/schema";
import { eq } from "drizzle-orm";

export const createBook = async (params: BookParams) => {
  try {
    const newBook = await db
      .insert(books)
      .values({
        ...params,
        availableCopies: params.totalCopies,
      })
      .returning();

    return { success: true, data: JSON.parse(JSON.stringify(newBook[0])) };
  } catch (error) {
    console.log("Error creating book:", error);
    return { success: false, message: "Failed to create book." };
  }
};


export const updateBook = async (id: string, params: Partial<Book>) => {
  try {
    const updatedBook = await db
      .update(books)
      .set(params)
      .where(eq(books.id, id))
      .returning();

    return { success: true, data: JSON.parse(JSON.stringify(updatedBook[0])) };
  } catch (error) {
    console.log("Error updating book:", error);
    return { success: false, message: "Failed to update book." };
  }
};
