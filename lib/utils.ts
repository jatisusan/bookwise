import { clsx, type ClassValue } from "clsx";
import dayjs from "dayjs";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const getInitials = (name: string) => {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();
};

export const daysLeftToDue = (dueDate: Date | string, returnDate?: Date | string | null) => {
  if (returnDate) return 0; // already returned → no days left

  const today = dayjs().startOf("day");
  const due = dayjs(dueDate).startOf("day");

  return due.diff(today, "day"); // positive = days left, negative = overdue days
};
