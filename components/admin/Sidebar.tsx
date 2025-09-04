"use client";

import { adminSideBarLinks } from "@/constants";
import { cn, getInitials } from "@/lib/utils";
import { Session } from "next-auth";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Avatar, AvatarFallback } from "../ui/avatar";

const Sidebar = ({ session }: { session: Session }) => {
  const pathname = usePathname();
  return (
    <div className="admin-sidebar">
      <div>
        <div className="logo">
          <Image
            src={"/icons/admin/logo.svg"}
            alt="BookWise"
            width={37}
            height={37}
          />
          <h1>BookWise</h1>
        </div>

        <div className="flex flex-col gap-5 mt-10">
          {adminSideBarLinks.map((link) => {
            const isSelected = link.route !== '/admin' && pathname.includes(link.route) || pathname === link.route;

            return (
              <Link href={link.route} key={link.route}>
                <div
                  className={cn(
                    "link",
                    isSelected && "bg-primary-admin shadow-sm"
                  )}
                >
                  <div className="relative size-5">
                    <Image
                      src={link.img}
                      alt="icon"
                      fill
                      className={`${
                        isSelected && "invert brightness-0"
                      } object-contain`}
                    />
                  </div>

                  <p
                    className={cn(isSelected ? "text-white" : "text-dark-200")}
                  >
                    {link.text}
                  </p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>

      <div className="user">
        <Avatar>
          <AvatarFallback className="bg-amber-200">
            {getInitials(session.user?.name || "U")}
          </AvatarFallback>
        </Avatar>

        <div className="flex flex-col max-md:hidden">
            <p className="text-dark-200 font-semibold">{session?.user?.name}</p>
            <p className="text-light-500 text-xs">{session?.user?.email}</p>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
