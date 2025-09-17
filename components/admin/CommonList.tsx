import React from "react";
import BookCover from "../BookCover";
import { Avatar, AvatarFallback } from "../ui/avatar";
import { getInitials, stringToColor } from "@/lib/utils";

interface Props {
  type: "borrowList" | "bookList" | "userList";
  fetcher: () => Promise<any[]>;
}

const CommonList = async ({ type, fetcher }: Props) => {
  const items = await fetcher();

  return (
    <>
      {type === "userList" ? (
        <div className="grid grid-cols-3">
          {items.length > 0 &&
            items.map((item, i) => (
              <div key={i} className="bg-light-300 p-3 rounded-lg flex flex-col justify-center items-center">
                <Avatar className="w-12 h-12 text-sm">
                  <AvatarFallback
                    style={{
                      backgroundColor: stringToColor(item.fullName),
                    }}
                  >
                    {getInitials(item.fullName)}
                  </AvatarFallback>
                </Avatar>
                <p className="text-sm text-dark-400">{item.fullName}</p>
                <p className="text-sm text-slate-500 w-full truncate">
                  {item.email}
                </p>
              </div>
            ))}
        </div>
      ) : (
        <ul className="flex flex-col gap-4">
          {items.length > 0 &&
            items.map((item, i) => (
              <li
                key={i}
                className="bg-light-300 py-3 px-4 rounded-lg flex items-center gap-5"
              >
                <BookCover
                  coverColor={item.coverColor}
                  coverImage={item.coverUrl}
                  variant="extraSmall"
                />
                <div className="flex flex-col">
                  <p className="text-base font-semibold ">{item.title}</p>
                  <div className="flex gap-3 items-center font-normal text-sm text-slate-500">
                    <p>By {item.author}</p>
                    <span>.</span>
                    <p>{item.genre}</p>
                  </div>

                  {type === "borrowList" && (
                    <div className="flex gap-2 items-center mt-2">
                      <Avatar className="w-6 h-6 text-xs">
                        <AvatarFallback
                          style={{
                            backgroundColor: stringToColor(item.userFullName),
                          }}
                        >
                          {getInitials(item.userFullName)}
                        </AvatarFallback>
                      </Avatar>
                      <p className="text-sm text-slate-500">
                        {item.userFullName}
                      </p>
                    </div>
                  )}
                </div>
              </li>
            ))}
        </ul>
      )}
    </>
  );
};

export default CommonList;
