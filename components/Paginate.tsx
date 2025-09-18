"use client";
import Link from "next/link";
import clsx from "clsx";

interface Props {
  totalPages: number;
  page: number;
  search: string;
}

const Paginate = ({ totalPages, page, search }: Props) => {
  const makeHref = (p: number) =>
    search ? `/books?search=${search}&page=${p}` : `/books?page=${p}`;

  return (
    <div className="flex items-center gap-2">
      {/* Previous */}
      {page > 1 ? (
        <Link
          href={makeHref(page - 1)}
          className="px-3 py-2 bg-dark-300 rounded text-white"
        >
          Prev
        </Link>
      ) : (
        <span className="px-3 py-2 bg-dark-300/50 rounded text-white/50 cursor-not-allowed">Prev</span>
      )}

      <div className="px-4 py-2 bg-primary-default rounded">{page}</div>

      {/* Next */}
      {page < totalPages ? (
        <Link
          href={makeHref(page + 1)}
          className="px-3 py-2 bg-dark-300 rounded text-white"
        >
          Next
        </Link>
      ) : (
        <span className="px-3 py-2 bg-dark-300/50 rounded text-white/50 cursor-not-allowed">Next</span>
      )}
    </div>
  );
};

export default Paginate;
