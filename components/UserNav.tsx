"use client";
import { FC } from "react";

import {
  CreditCard,
  History,
  List,
  LogOut,
  PlusCircle,
  Settings,
  SubscriptIcon,
  User as UserIcon,
  Video,
} from "lucide-react";
import { signOut, useSession } from "next-auth/react";
import { type User } from "next-auth";
import Link from "next/link";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";
import { Button } from "./ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { Badge } from "./ui/badge";
import { adminMenus } from "./data/menus";
import { Channel } from "@prisma/client";
import { Videotape } from "lucide-react";

interface UserPros extends User {}

interface UserNavProps {
  text?: string;
  user: UserPros;
  channel: Channel | null;
}

const UserNav: FC<UserNavProps> = ({ user, channel }) => {
  const { data } = useSession();
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="secondary" className="relative h-8 w-8 rounded-full">
          <Avatar className="h-8 w-8">
            {user?.image ? (
              <AvatarImage src={user?.image!} alt={user?.name!} />
            ) : (
              <AvatarFallback>{user?.name}</AvatarFallback>
            )}
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm flex justify-start items-center gap-x-1 font-medium leading-none">
              {user?.name}
              <Badge>SATuber</Badge>
            </p>
            <p className="text-xs leading-none text-muted-foreground">
              {user?.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem asChild>
            {channel ? (
              <>
                <DropdownMenuItem asChild>
                  <Link href={`/channel/${channel?.username}`}>
                    <Video className="mr-2 h-4 w-4" />
                    <span>Your Cannel</span>
                    <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href={`/studio/${channel?.username}/videos/create`}>
                    <CreditCard className="mr-2 h-4 w-4" />
                    <span>Upload</span>
                    <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
                  </Link>
                </DropdownMenuItem>
              </>
            ) : (
              <Link href={`/channel/create`}>
                <PlusCircle className="mr-2 h-4 w-4" />
                <span>Create Channel</span>
                <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
              </Link>
            )}
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/">
              <Video className="mr-2 h-4 w-4" />
              <span>Home</span>
              <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/shorts">
              <Videotape className="mr-2 h-4 w-4" />
              <span>Shorts</span>
              <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/subscriptions">
              <List className="mr-2 h-4 w-4" />
              <span>Subscriptions</span>
              <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
            </Link>
          </DropdownMenuItem>
          <DropdownMenuItem asChild>
            <Link href="/history">
              <History className="mr-2 h-4 w-4" />
              <span>History</span>
              <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
            </Link>
          </DropdownMenuItem>

          <DropdownMenuItem asChild>
            <Link href="/profile">
              <UserIcon className="mr-2 h-4 w-4" />
              <span>Profile</span>
              <DropdownMenuShortcut>⇧⌘P</DropdownMenuShortcut>
            </Link>
          </DropdownMenuItem>
          {data && data.user.role === "ADMIN" && (
            <>
              {adminMenus.map((menu) => (
                <DropdownMenuItem asChild>
                  <Link href={`/admin/${menu.href}`}>
                    {menu.icon}
                    <span>{menu.name}</span>
                    {/* <DropdownMenuShortcut>⌘S</DropdownMenuShortcut> */}
                  </Link>
                </DropdownMenuItem>
              ))}
            </>
          )}
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={() => signOut()}>
          <LogOut className="mr-2 h-4 w-4" />
          <span>Log out</span>
          <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default UserNav;
