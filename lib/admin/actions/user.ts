"use server";

import { db } from "@/database/drizzle";
import { users } from "@/database/schema";
import { sendEmail } from "@/lib/workflow";
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

export const changeUserStatus = async (
  id: string,
  status: "APPROVED" | "REJECTED"
) => {
  try {
    const updatedUser = await db
      .update(users)
      .set({ status: status })
      .where(eq(users.id, id))
      .returning();

    if (updatedUser) {
      if (status === "APPROVED") {
        await sendEmail({
          name: updatedUser[0].fullName,
          email: updatedUser[0].email,
          subject: "Account Approval",
          title: "Your BookWise Account Has Been Approved!",
          message:
            "Congratulations! Your BookWise account has been approved. You can now browse our library, borrow books, and enjoy all the features of your new account.",
        });
      } else {
        await sendEmail({
          name: updatedUser[0].fullName,
          email: updatedUser[0].email,
          subject: "Account Denied",
          title: "Your BookWise Account Has Been Rejected!",
          message:
            "Sorry! Your BookWise account has been rejected. Use a valid university ID and create a new account.",
        });
      }
    }

    return { success: true, data: JSON.parse(JSON.stringify(updatedUser[0])) };
  } catch (error) {
    console.error(error);
    return { success: false, message: "Failed to update user status." };
  }
};
