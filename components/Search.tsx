"use client";

import Image from "next/image";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import { useDebounce } from "react-use";

const Search = () => {
  const [searchItem, setSearchItem] = useState("");

  const searchParams = useSearchParams();
  const router = useRouter();

  useDebounce(
    () => {
      const params = new URLSearchParams(searchParams.toString());

      if (searchItem) {
        params.set("search", searchItem);
      } else {
        params.delete("search");
      }

      router.push(`?${params.toString()}`);
    },
    800,
    [searchItem]
  );

  return (
    <div className="search">
      <Image src="/icons/search-fill.svg" alt="search" width={22} height={22} />
      <input
        type="text"
        placeholder="Search for a book"
        value={searchItem}
        onChange={(e) => setSearchItem(e.target.value)}
        className="search-input"
      />
    </div>
  );
};

export default Search;
