import React from "react";
import Avatar from "./Avatar";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "./ui/hover-card";
import MiniUser from "./MiniUser";
import { Channel, Video } from "@prisma/client";
import Link from "next/link";
import SubscribeButton from "./youtube/subscribe-button";
import { getAuthSession } from "@/lib/auth";

type Props = {
  video: Video & { user: User; channel: Channel };
};

const VideoHeader = async ({ video }: Props) => {
  const session = await getAuthSession();
  return (
    <div>
      <div className="flex items-center justify-between">
        <HoverCard>
          <HoverCardTrigger className="p-0">
            {/* @ts-ignore */}
            <Avatar
              user={{
                image: video.channel.logo,
                username: video.channel.name,
                bio: video.channel.bio,
              }}
            />
          </HoverCardTrigger>
          <HoverCardContent className="md:w-80 mx-auto w-full">
            {/* @ts-ignore */}
            <MiniUser channel={video?.channel} />
          </HoverCardContent>
        </HoverCard>
        {/* <button className="hover:bg-red-100 border-red-500 border-2 text-red-500 rounded-md py-1 px-2">
          Subscribe
        </button> */}
        <SubscribeButton
          channel={video?.channel}
          userId={(session && session.user.id) || ""}
        />
      </div>

      <p className="text-base font-semibold my-1 hover:underline">
        <Link href={`/watch?v=${video.videoId}&user=${video?.user?.username}`}>
          {video.description && video.description.length > 200
            ? `${video.description?.slice(0, 200)}...`
            : video.description}
        </Link>
      </p>
    </div>
  );
};

export default VideoHeader;
