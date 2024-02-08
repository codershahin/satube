import Image from "next/image";
import React from "react";
import { Button } from "./ui/button";

type Props = {
  user: any;
};

const Avatar = ({ user }: Props) => {
  return (
    <div>
      <Button
        variant={"link"}
        className="flex justify-between items-center gap-x-1"
      >
        <Image
          width={28}
          height={28}
          className="h-7 w-7 rounded-full object-cover"
          src={user?.image}
          alt="avatar"
        />
        <span className="md:text-[18px] font-bold text-slate-900 ">
          {user?.username}
        </span>
        <span className="hidden truncate md:block text-sm font-medium text-gray-700">
          {user?.bio}
        </span>
      </Button>
    </div>
  );
};

export default Avatar;
