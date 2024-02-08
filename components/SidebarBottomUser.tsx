"use client";
import { LogIn } from "lucide-react";
import React from "react";
import { Button } from "./ui/button";
import { signOut } from "next-auth/react";
import Image from "next/image";

type Props = {
  name: string;
  image: string;
};

const SidebarBottomUser = ({ name, image }: Props) => {
  return (
    <div className="mt-6 flex items-center justify-between">
      <a href="#" className="flex items-center gap-x-2">
        <Image
          width={28}
          height={28}
          className="h-7 w-7 rounded-full object-cover"
          src={
            image
              ? image
              : "https://overreacted.io/static/profile-pic-c715447ce38098828758e525a1128b87.jpg"
          }
          alt="avatar"
        />
        <span className="text-sm font-medium text-gray-700">{name}</span>
      </a>
      <Button
        variant={"link"}
        onClick={() => signOut()}
        className="rotate-180 text-gray-800 transition-colors duration-200 hover:text-gray-900"
      >
        <LogIn className="h-5 w-5" />
      </Button>
    </div>
  );
};

export default SidebarBottomUser;
