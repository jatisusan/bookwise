import BookList from "@/components/BookList";
import Paginate from "@/components/Paginate";
import Search from "@/components/Search";
import { db } from "@/database/drizzle";
import { books } from "@/database/schema";
import { ilike, sql } from "drizzle-orm";
import Image from "next/image";

const page = async ({
  searchParams,
}: {
  searchParams: Promise<{ search?: string; page: number }>;
}) => {
  const sp = await searchParams;
  const query = sp.search || "";

  const page = Number(sp.page) || 1;

  const [{ count }] = query
    ? await db
        .select({ count: sql<number>`count(*)` })
        .from(books)
        .where(ilike(books.title, `%${query}%`))
    : await db.select({ count: sql<number>`count(*)` }).from(books);

  const pageSize = 5;
  const totalPages = Math.ceil(count / pageSize);

  const result = query
    ? await db
        .select()
        .from(books)
        .where(ilike(books.title, `%${query}%`))
        .limit(pageSize)
        .offset((page - 1) * pageSize)
    : await db
        .select()
        .from(books)
        .limit(pageSize)
        .offset((page - 1) * pageSize);

  return (
    <>
      <div className="library">
        <p className="library-subtitle">Discover your next great read</p>

        <h2 className="library-title">
          Explore and search for{" "}
          <span className="text-primary-default">any book</span> in our library
        </h2>

        <Search />
      </div>

      <div className="mt-12">
        {result.length > 0 ? (
          <BookList
            books={result}
            title={query ? "Search Results" : "All Books"}
          />
        ) : (
          <div>
            <h2 className="font-bebas-neue text-4xl text-light-100">
              Search Results
            </h2>

            <div className="flex flex-col justify-center items-center gap-2 my-12">
              <Image
                src="/images/no-books.png"
                width={140}
                height={140}
                alt="no-books"
              />

              <h4 className="text-2xl text-white font-semibold">
                No Results Found
              </h4>
              <p className="text-light-100 text-sm max-w-sm text-center">
                We couldn't find any books matching your search. Try using
                different keywords or check for typos.
              </p>
            </div>
          </div>
        )}
      </div>

      <div className="mt-16 flex justify-end">
        <Paginate totalPages={totalPages} page={page} search={query} />
      </div>
    </>
  );
};

export default page;
