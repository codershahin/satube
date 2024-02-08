import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import React from "react";
import HistoryVideoCard from "./_components/video-card";
import ResponsiveVideoGrid from "@/components/youtube/responsive-video-grid";
import YouTubeVideoCard from "@/components/youtube/video-card";

export const revalidate = 0;

type Props = {};

const Page = async (props: Props) => {
  const session = await getAuthSession();
  if (!session) {
    return redirect("/login");
  }
  const history = await db.history.findFirst({
    where: {
      userId: session?.user.id!,
    },
    include: {
      videos: {
        include: {
          channel: true,
        },
      },
    },
    orderBy: {
      id: "desc",
    },
  });

  return (
    <div className="container mx-auto md:my-10 mt-20">
      <h2 className="text-4xl my-10 font-bold text-white">Watch history</h2>
      <div>
        {!history && (
          <h2 className="text-2xl font-semibold text-gray-500">
            No History found. Watch video to make history.
          </h2>
        )}
        {history && history.videos.length > 0 && (
          <ResponsiveVideoGrid>
            {history.videos.map((video) => (
              // <HistoryVideoCard key={video.id} video={video} />
              <YouTubeVideoCard
                username={video.channel.username}
                verified={video.channel.verified}
                title={video.title}
                channel={video.channel.name}
                views={video.views}
                videoId={video.videoId}
                videoPublishDate={new Date(video.createdAt!)?.toLocaleString()}
                thumbnailUrl={video.thumbnail}
                channelFaviconUrl={video.channel?.logo!}
                key={video.videoId}
              />
            ))}
          </ResponsiveVideoGrid>
        )}
      </div>
    </div>
  );
};

export default Page;
