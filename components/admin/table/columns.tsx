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
