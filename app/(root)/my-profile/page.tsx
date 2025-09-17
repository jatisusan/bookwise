import { auth } from "@/auth";
import BookCover from "@/components/BookCover";
import UserCard from "@/components/UserCard";
import { db } from "@/database/drizzle";
import { books, borrowRecords } from "@/database/schema";
import { daysLeftToDue } from "@/lib/utils";
import { and, eq } from "drizzle-orm";
import Image from "next/image";
import Link from "next/link";
import React from "react";

const page = async () => {
  const session = await auth();

  const myBooks = await db
    .select({
      id: borrowRecords.id,
      borrowDate: borrowRecords.borrowDate,
      dueDate: borrowRecords.dueDate,
      returnDate: borrowRecords.returnDate,
      status: borrowRecords.status,
      bookId: borrowRecords.bookId,
      title: books.title,
      genre: books.genre,
      coverUrl: books.coverUrl,
      coverColor: books.coverColor,
    })
    .from(borrowRecords)
    .innerJoin(books, eq(borrowRecords.bookId, books.id))
    .where(eq(borrowRecords.userId, session?.user?.id as string));

  const borrowed = myBooks.filter((book) => book.status === "BORROWED");
  const requested = myBooks.filter((book) => book.status === "REQUESTED");
  console.log(requested);

  return (
    <div className="w-full flex lg:flex-row flex-col justify-between gap-20">
      <UserCard userId={session?.user?.id as string} />

      <div
        className={`${
          borrowed.length < 1 && requested.length < 1 && "lg:flex-1"
        }`}
      >
        <div>
          <h2 className="text-4xl font-bebas-neue text-light-100 mb-3">
            Borrowed Books
          </h2>
          {borrowed.length !== 0 ? (
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-2 w-full">
              {borrowed.map((book, i) => (
                <li key={i} className="borrowed-book">
                  <Link href={`/books/${book.bookId}`}>
                    <div
                      className="borrowed-book_cover"
                      style={{ backgroundColor: `${book.coverColor}44` }}
                    >
                      <BookCover
                        coverColor={book.coverColor}
                        coverImage={book.coverUrl}
                        variant="medium"
                      />
                    </div>
                  </Link>

                  <div className="mt-4 line-clamp-1">
                    <p className="book-title">{book.title}</p>
                    <p className="book-genre">{book.genre}</p>
                  </div>

                  <div className="flex gap-2 my-1.5 mt-3.5">
                    <Image
                      src="/icons/book-2.svg"
                      alt="book"
                      width={20}
                      height={20}
                    />
                    <p className="text-light-100">
                      Borrowed on{" "}
                      {new Date(book.borrowDate!).toLocaleDateString("en-US", {
                        month: "short",
                        day: "numeric",
                        year: "numeric",
                      })}
                    </p>
                  </div>

                  {book.returnDate ? (
                    <div className="flex gap-2">
                      <Image
                        src="/icons/tick.svg"
                        alt="book"
                        width={20}
                        height={20}
                      />
                      <p className="text-light-100">
                        Returned on{" "}
                        {new Date(book.returnDate).toLocaleDateString("en-US", {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </p>
                    </div>
                  ) : daysLeftToDue(book.dueDate!, book.returnDate) < 0 ? (
                    <div className="flex gap-2">
                      <Image
                        src="/icons/warning.svg"
                        alt="book"
                        width={20}
                        height={20}
                      />
                      <p className="text-red-default">Overdue Return</p>
                    </div>
                  ) : (
                    <div className="flex gap-2">
                      <Image
                        src="/icons/calendar.svg"
                        alt="book"
                        width={20}
                        height={20}
                      />
                      <p className="text-light-100">
                        {daysLeftToDue(book.dueDate!, book.returnDate)} days
                        left to due
                      </p>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-light-100 text-xl">
              You haven't borrowed any books.
            </p>
          )}
        </div>

        {requested.length !== 0 && (
          <>
            <h2 className="text-4xl font-bebas-neue text-light-100 mb-3 mt-16">
              Requested Books
            </h2>
            <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 xl:grid-cols-2 gap-6 w-full">
              {requested.map((book, i) => (
                <li key={i} className="borrowed-book">
                  <Link href={`/books/${book.bookId}`}>
                    <div
                      className="borrowed-book_cover"
                      style={{ backgroundColor: `${book.coverColor}44` }}
                    >
                      <BookCover
                        coverColor={book.coverColor}
                        coverImage={book.coverUrl}
                        variant="medium"
                      />
                    </div>
                  </Link>

                  <div className="mt-4 line-clamp-1 mb-4">
                    <p className="book-title">{book.title}</p>
                    <p className="book-genre">{book.genre}</p>
                  </div>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  );
};

export default page;
