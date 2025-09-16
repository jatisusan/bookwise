"use server";

import { db } from "@/database/drizzle";
import { users } from "@/database/schema";
import { eq } from "drizzle-orm";

export const changeUserRole = async (id: string, role: "ADMIN" | "USER") => {
  try {
    const updatedUser = await db
      .update(users)
      .set({ role: role })
      .where(eq(users.id, id))
      .returning();

    return { success: true, data: JSON.parse(JSON.stringify(updatedUser[0])) };
  } catch (error) {
    console.error(error);
    return { success: false, message: "Failed to update user role." };
  }
};
