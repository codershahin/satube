import Link from "next/link";
import React from "react";
import SearchBox from "./SearchBox";
import { MoreVertical } from "lucide-react";
import UserNav from "./UserNav";
import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
type Props = {};

const Header = async (props: Props) => {
  const session = await getAuthSession();
  const channel = await db.channel.findFirst({
    where: {
      userId: session?.user.id,
    },
  });

  return (
    <header className="w-full z-40 fixed bg-slate-800 top-0 p-2 shadow-md drop-shadow-md flex justify-between items-center">
      <div>
        <Link href="/" className="text-xl text-white">
          SaTube
        </Link>
      </div>
      <div className="hidden md:block">
        <SearchBox />
      </div>
      <div className="flex  text-white items-center justify-items-center gap-x-2">
        {session && session.user.email ? (
          <>
            <UserNav channel={channel} user={session.user} />
          </>
        ) : (
          <>
            <Link
              href="/upload"
              className="px-4 hover:opacity-95 btn-hover py-[.3rem] border bg-green-500 text-white rounded-md"
            >
              + Upload
            </Link>
            <Link
              href="/sign-in"
              className="text-white btn-hover font-medium bg-red-500 py-[.3rem] px-4 rounded-md"
            >
              Login
            </Link>
            <button>
              <MoreVertical />
            </button>
          </>
        )}
      </div>
    </header>
  );
};

export default Header;
