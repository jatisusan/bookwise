import { db } from "@/database/drizzle";
import { users } from "@/database/schema";
import config from "@/lib/config";
import { eq } from "drizzle-orm";
import { Avatar, AvatarFallback } from "./ui/avatar";
import { getInitials } from "@/lib/utils";
import { Image } from "@imagekit/next";

const UserCard = async ({ userId }: { userId: string }) => {
  const [user] = await db
    .select()
    .from(users)
    .where(eq(users.id, userId))
    .limit(1);

  return (
    <div className="gradient-blue flex-1 h-fit rounded-2xl relative pt-18 px-10 pb-8">
      <img
        src="/images/clip.svg"
        width={48}
        height={1000}
        alt="clip"
        className="absolute -top-5 left-1/2 -translate-x-1/2"
      />

      <div className="flex gap-6 sm:flex-row flex-col sm:items-center mb-8">
        <div className="gradient-gray rounded-full w-fit p-2">
          <Avatar className="w-22 h-22">
            <AvatarFallback className="text-4xl font-bold text-dark-300">
              {getInitials(user.fullName || "U")}
            </AvatarFallback>
          </Avatar>
        </div>

        <div>
          <div className="flex gap-2">
            <img
              src={
                user.status === "APPROVED"
                  ? "/icons/verified.svg"
                  : user.status === "PENDING"
                  ? "/icons/clock.svg"
                  : "/icons/warning.svg"
              }
              width={22}
              height={22}
              alt="status"
            />
            <p className="text-light-100 text-sm">
              {user.status === "APPROVED"
                ? "Verified Student"
                : user.status === "PENDING"
                ? "Verification Pending"
                : "Unverified User"}
            </p>
          </div>

          <p className="text-white text-2xl mt-1.5 mb-1 font-semibold">
            {user.fullName}
          </p>
          <p className="text-light-100">{user.email}</p>
        </div>
      </div>

      <div className="mb-4">
        <p className="text-light-100 mb-1">University</p>
        <p className="text-white text-xl font-semibold">ABC university</p>
      </div>

      <div className="mb-4">
        <p className="text-light-100 mb-1">Student ID</p>
        <p className="text-white text-xl font-semibold">{user.universityId}</p>
      </div>

      <Image
        urlEndpoint={config.env.imagekit.urlEndpoint}
        src={user.universityCard}
        width={1000}
        height={1000}
        alt="id"
        className="rounded-xl w-full h-64 object-cover"
      />
    </div>
  );
};

export default UserCard;
