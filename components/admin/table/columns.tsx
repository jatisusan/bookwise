"use client";

import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import Link from "next/link";
import CommonModal from "../CommonModal";
import BookCover from "@/components/BookCover";
import { ArrowUpDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { deleteBook } from "@/lib/admin/actions/book";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { getInitials, stringToColor } from "@/lib/utils";
import CardView from "../CardView";
import Dropdown from "../Dropdown";
import { changeUserStatus } from "@/lib/admin/actions/user";
import { sendEmail } from "@/lib/workflow";
import { Badge } from "@/components/ui/badge";

export const bookColumns: ColumnDef<BookTable>[] = [
  {
    accessorKey: "title",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Book Title
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <Link
        href={`/admin/books/${row.original.id}`}
        className="flex gap-2 items-center"
      >
        <BookCover
          variant="extraSmall"
          coverColor={row.original.coverColor}
          coverImage={row.original.coverUrl}
        />
        <p className="text-dark-400 font-medium text-sm">
          {row.original.title}
        </p>
      </Link>
    ),
  },
  {
    accessorKey: "author",
    header: "Author",
    cell: ({ row }) => <p className="text-dark-200">{row.original.author}</p>,
  },
  {
    accessorKey: "genre",
    header: "Genre",
    cell: ({ row }) => <p className="text-dark-200">{row.original.genre}</p>,
  },
  {
    accessorKey: "createdAt",
    header: "Date Created",
    cell: ({ row }) => (
      <p className="text-dark-200">
        {row.original.createdAt?.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        })}
      </p>
    ),
  },
  {
    header: "Actions",
    cell: ({ row }) => {
      const book = row.original;
      const router = useRouter();

      return (
        <div className="flex gap-4 px-1">
          <Link href={`/admin/books/${book.id}/update`}>
            <Image
              src="/icons/admin/edit.svg"
              alt="edit"
              width={18}
              height={18}
            />
          </Link>
          <CommonModal
            type="delete"
            onConfirm={async () => {
              const result = await deleteBook(book.id);
              if (result.success) {
                toast.success("Book deleted successfully");
                router.refresh();
              } else toast.error(result.message);
            }}
          />
        </div>
      );
    },
  },
];

export const userColumns: ColumnDef<UserTable>[] = [
  {
    accessorKey: "fullName",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="flex gap-4">
        <Avatar>
          <AvatarFallback
            style={{ backgroundColor: stringToColor(row.original.fullName) }}
          >
            {getInitials(row.original.fullName)}
          </AvatarFallback>
        </Avatar>
        <div>
          <p className="text-dark-100  font-semibold">
            {row.original.fullName}
          </p>
          <p className="text-slate-500">{row.original.email}</p>
        </div>
      </div>
    ),
  },
  {
    accessorKey: "createdAt",
    header: "Date Joined",
    cell: ({ row }) => (
      <p className="text-dark-200">
        {row.original.createdAt?.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        })}
      </p>
    ),
  },
  {
    accessorKey: "role",
    header: () => <p className="ml-2">Role</p>,
    cell: ({ row }) => (
      <Dropdown
        type="userRole"
        currentValue={row.original.role!}
        id={row.original.id}
      />
    ),
  },
  {
    accessorKey: "borrowedBooks",
    header: "Borrowed",
    cell: ({ row }) => (
      <p className="text-dark-200 text-center">{row.original.borrowedBooks}</p>
    ),
  },
  {
    accessorKey: "universityId",
    header: "ID No.",
    cell: ({ row }) => (
      <p className="text-dark-200">{row.original.universityId}</p>
    ),
  },
  {
    accessorKey: "universityCard",
    header: "University Card",
    cell: ({ row }) => (
      <CardView universityCard={row.original.universityCard} />
    ),
  },
  {
    accessorKey: "status",
    header: () => <p className="ml-3">Status</p>,
    cell: ({ row }) => (
      <Badge
        className={
          row.original.status === "APPROVED" ? "green-badge" : "red-badge"
        }
      >
        {row.original.status}
      </Badge>
    ),
  },
  {
    header: "Actions",
    cell: ({ row }) => {
      const book = row.original;
      const router = useRouter();

      return (
        <div className="ml-3">
          <CommonModal
            type="delete"
            onConfirm={async () => {
              const result = await deleteBook(book.id);
              if (result.success) {
                toast.success("Book deleted successfully");
                router.refresh();
              } else toast.error(result.message);
            }}
          />
        </div>
      );
    },
  },
];

export const accountColumns: ColumnDef<AccountTable>[] = [
  {
    accessorKey: "fullName",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Name
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => (
      <div className="flex gap-4">
        <Avatar>
          <AvatarFallback
            style={{ backgroundColor: stringToColor(row.original.fullName) }}
          >
            {getInitials(row.original.fullName)}
          </AvatarFallback>
        </Avatar>
        <div>
          <p className="text-dark-100  font-semibold">
            {row.original.fullName}
          </p>
          <p className="text-slate-500">{row.original.email}</p>
        </div>
      </div>
    ),
  },
  {
    accessorKey: "createdAt",
    header: "Date Joined",
    cell: ({ row }) => (
      <p className="text-dark-200">
        {row.original.createdAt?.toLocaleDateString("en-US", {
          month: "short",
          day: "numeric",
          year: "numeric",
        })}
      </p>
    ),
  },
  {
    accessorKey: "universityId",
    header: "ID No.",
    cell: ({ row }) => (
      <p className="text-dark-200">{row.original.universityId}</p>
    ),
  },
  {
    accessorKey: "universityCard",
    header: "University Card",
    cell: ({ row }) => (
      <CardView universityCard={row.original.universityCard} />
    ),
  },
  {
    header: "Actions",
    cell: ({ row }) => {
      const user = row.original;
      const router = useRouter();

      return (
        <div className="flex items-center gap-4">
          <CommonModal
            type="approve"
            onConfirm={async () => {
              const result = await changeUserStatus(user.id, "APPROVED");
              if (result.success) {
                toast.success(
                  "User has been approved and notified successfully."
                );
                router.refresh();
              } else toast.error(result.message);
            }}
          />
          <CommonModal
            type="deny"
            onConfirm={async () => {
              const result = await changeUserStatus(user.id, "REJECTED");
              if (result.success) {
                toast.success(
                  "User has been rejected and notified successfully."
                );
                router.refresh();
              } else toast.error(result.message);
            }}
          />
        </div>
      );
    },
  },
];
