import React from "react";
import Image from "next/image";
import Link from "next/link";
import { Channel } from "@prisma/client";
import SubscribeButton from "./youtube/subscribe-button";
import { getAuthSession } from "@/lib/auth";

type Props = {
  channel: Channel;
};

const MiniAvatar = async ({ channel }: Props) => {
  const session = await getAuthSession();
  return (
    <div className="flex justify-between items-center">
      <Link
        href={`/channel/${channel?.username}`}
        className="flex items-center gap-x-1 justify-between"
      >
        <Image
          width={28}
          height={28}
          className="h-7 w-7 rounded-full object-cover"
          src={channel?.logo}
          alt="avatar"
        />
        <span className="text-sm font-bold text-slate-900 ">
          @{channel?.username}
        </span>
      </Link>

      <SubscribeButton channel={channel} userId={session?.user.id!} />
    </div>
  );
};

export default MiniAvatar;
