import { getInitials } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Session } from "next-auth";
import { Button } from "./ui/button";
import { signOut } from "@/auth";

const Header = ({ session }: { session: Session }) => {
  return (
    <header className="mb-10 mt-8 flex justify-between gap-5">
      <Link href={"/"} className="flex gap-2 items-center">
        <Image src={"/icons/logo.svg"} alt="logo" width={40} height={40} />
        <p className="text-white sm:text-2xl text-xl font-semibold">BookWise</p>
      </Link>

      <ul className="flex flex-row items-center sm:gap-8 gap-4">
        <li>
          <Link
            href={"/books"}
            className="text-base cursor-pointer capitalize text-light-100"
          >
            Library
          </Link>
        </li>

        <li>
          <Link href={"/my-profile"}>
            <Avatar>
              <AvatarFallback>
                {getInitials(session.user?.name || "U")}
              </AvatarFallback>
            </Avatar>
          </Link>
        </li>

        <li>
          <form
            action={async () => {
              "use server";
              await signOut();
            }}
          >
            <Button className="p-0 bg-transparent">
              <Image
                src="/icons/logout.svg"
                alt="logout"
                width={26}
                height={26}
              />
            </Button>
          </form>
        </li>
      </ul>
    </header>
  );
};

export default Header;
