import CommonList from "@/components/admin/CommonList";
import Loader from "@/components/admin/Loader";
import StatCard from "@/components/admin/StatCard";
import { db } from "@/database/drizzle";
import { books, borrowRecords, users } from "@/database/schema";
import { desc, eq } from "drizzle-orm";
import Link from "next/link";
import { Suspense } from "react";

const page = () => {
  const getBooksCount = async () => {
    const result = await db.$count(books);
    return result;
  };
  const getUsersCount = async () => {
    const result = await db.$count(users);
    return result;
  };
  const getBorrowedCount = async () => {
    const result = await db.$count(borrowRecords);
    return result;
  };

  const getBorrowRequests = async () => {
    const result = await db
      .select({
        title: books.title,
        author: books.author,
        coverColor: books.coverColor,
        coverUrl: books.coverUrl,
        genre: books.genre,
        userFullName: users.fullName,
      })
      .from(borrowRecords)
      .innerJoin(users, eq(users.id, borrowRecords.userId))
      .innerJoin(books, eq(books.id, borrowRecords.bookId))
      .orderBy(desc(borrowRecords.createdAt))
      .limit(2);
    return result;
  };
  const getBooks = async () => {
    const result = await db
      .select({
        title: books.title,
        author: books.author,
        coverColor: books.coverColor,
        coverUrl: books.coverUrl,
        genre: books.genre,
      })
      .from(books)
      .orderBy(desc(books.createdAt))
      .limit(5);
    return result;
  };
  const getAccountRequests = async () => {
    const result = await db
      .select({
        fullName: users.fullName,
        email: users.email,
      })
      .from(users)
      .where(eq(users.status, "PENDING"))
      .orderBy(desc(users.createdAt))
      .limit(3);
    return result;
  };

  return (
    <>
      <div className="grid grid-cols-3 gap-4 my-3 ">
        <div className="bg-white p-5 rounded-xl shadow h-28">
          <Suspense fallback={<Loader />}>
            <StatCard title="Borrowed Books" fetcher={getBorrowedCount} />
          </Suspense>
        </div>
        <div className="bg-white p-5 rounded-xl shadow h-28">
          <Suspense fallback={<Loader />}>
            <StatCard title="Total Users" fetcher={getUsersCount} />
          </Suspense>
        </div>
        <div className="bg-white p-5 rounded-xl shadow h-28">
          <Suspense fallback={<Loader />}>
            <StatCard title="Total Books" fetcher={getBooksCount} />
          </Suspense>
        </div>
      </div>

      <div className="flex gap-6 mt-6">
        <div className="flex-1 flex flex-col gap-6">
          <div className="shadow rounded-xl bg-white h-80 p-5 flex flex-col gap-3 relative">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-semibold text-dark-400">
                Borrow Requests
              </h3>
              <Link
                href="/admin/borrow-records"
                className="bg-[#F8F8FF] text-primary-admin py-1 px-4 rounded-lg"
              >
                View All
              </Link>
            </div>

            <Suspense fallback={<Loader />}>
              <CommonList type="borrowList" fetcher={getBorrowRequests} />
            </Suspense>

            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#f1f1f1] to-transparent h-36 rounded-b-xl" />
          </div>

          <div className="shadow rounded-xl bg-white h-56 p-5 flex flex-col gap-3 relative">
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-semibold text-dark-400">
                Account Requests
              </h3>
              <Link
                href="/admin/account-requests"
                className="bg-[#F8F8FF] text-primary-admin py-1 px-4 rounded-lg"
              >
                View All
              </Link>
            </div>

            <Suspense fallback={<Loader />}>
              <CommonList type="userList" fetcher={getAccountRequests} />
            </Suspense>

            <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#fafafa] to-transparent h-32 rounded-b-xl" />
          </div>
        </div>

        <div className="flex-1 shadow rounded-xl bg-white h-full py-5 px-8 flex flex-col gap-3 relative">
          <div className="flex justify-between items-center">
            <h3 className="text-xl font-semibold text-dark-400">
              Recently Added Books
            </h3>
            <Link
              href="/admin/books"
              className="bg-[#F8F8FF] text-primary-admin py-1 px-4 rounded-lg"
            >
              View All
            </Link>
          </div>

          <Link
            href="/admin/books/new"
            className="bg-light-300 py-3 px-4 rounded-lg flex items-center gap-5"
          >
            <div className="bg-white p-4 rounded-full h-12 w-12 flex items-center justify-center text-3xl text-dark-200">
              +
            </div>
            <p className="text-dark-400 font-semibold">Add New Book</p>
          </Link>

          <Suspense fallback={<Loader />}>
            <CommonList type="bookList" fetcher={getBooks} />
          </Suspense>

          <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-[#f1f1f1] to-transparent h-36 rounded-b-xl" />
        </div>
      </div>
    </>
  );
};

export default page;
