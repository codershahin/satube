import React from "react";
import { Activity, LogIn, Home, Users, Youtube, Video } from "lucide-react";
import Link from "next/link";
import { getAuthSession } from "@/lib/auth";
import SidebarBottomUser from "./SidebarBottomUser";
import SidebarBottomWidget from "./SidebarBottomWidget";
import { db } from "@/lib/db";

export async function Sidebar() {
  const session = await getAuthSession();
  const channel = await db.channel.findFirst({
    where: {},
  });
  return (
    <aside className="hidden md:flex fixed left-0 h-screen w-64 flex-col overflow-y-auto border-r bg-slate-800 px-5 py-8">
      <Link
        className="flex transform items-center rounded-lg px-3 py-2 text-gray-600 transition-colors duration-300 hover:bg-gray-100 hover:text-gray-700"
        href="/youtube"
      >
        <Youtube className="h-5 w-5" aria-hidden="true" />
        <span className="mx-2 text-xl font-semoibold">SATok</span>
      </Link>
      <div className="mt-6 flex flex-1 flex-col justify-between">
        <nav className="-mx-3 space-y-6 ">
          <div className="space-y-3 ">
            <Link
              className="flex transform items-center rounded-lg px-3 py-2 text-gray-600 transition-colors duration-300 hover:bg-gray-100 hover:text-gray-700"
              href="/youtube"
            >
              <Home className="h-5 w-5" aria-hidden="true" />
              <span className="mx-2 text-xl font-medium">Home</span>
            </Link>
            <Link
              className="flex transform items-center rounded-lg px-3 py-2 text-gray-600 transition-colors duration-300 hover:bg-gray-100 hover:text-gray-700"
              href="/"
            >
              <Video className="h-5 w-5" aria-hidden="true" />
              <span className="mx-2 text-xl font-medium">Shorts</span>
            </Link>
            <Link
              className="flex transform items-center rounded-lg px-3 py-2 text-gray-600 transition-colors duration-300 hover:bg-gray-100 hover:text-gray-700"
              href={`/channel/${channel?.username}/history`}
            >
              <Activity className="h-5 w-5" aria-hidden="true" />
              <span className="mx-2 text-xl font-medium">History</span>
            </Link>
          </div>
        </nav>
        <div className="mt-6">
          {session && session.user ? (
            <SidebarBottomUser
              name={session.user.name!}
              image={session.user.image!}
            />
          ) : (
            <SidebarBottomWidget />
          )}
          {/* avatar logged in widget */}
        </div>
      </div>
    </aside>
  );
}
