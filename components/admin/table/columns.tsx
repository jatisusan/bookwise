"use client";

import { ColumnDef } from "@tanstack/react-table";
import Image from "next/image";
import Link from "next/link";
import CommonModal from "../CommonModal";
import BookCover from "@/components/BookCover";

export const bookColumns: ColumnDef<BookTable>[] = [
  {
    accessorKey: "title",
    header: "Book Title",
    cell: ({ row }) => (
      <div className="flex gap-2 items-center">
        <BookCover
          variant="extraSmall"
          coverColor={row.original.coverColor}
          coverImage={row.original.coverUrl}
        />
        <p className="text-dark-400 font-medium text-sm">
          {row.original.title}
        </p>
      </div>
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

      return (
        <div className="flex gap-2">
          <Link href={`/admin/books/${book.id}/update`}>
            <Image
              src="/icons/admin/edit.svg"
              alt="edit"
              width={18}
              height={18}
            />
          </Link>
          <CommonModal />
        </div>
      );
    },
  },
];
