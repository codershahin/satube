// YouTubeVideoCardContainer.tsx
import CategoriesTabs from "@/components/youtube/categories-tabs";
import ResponsiveVideoGrid from "@/components/youtube/responsive-video-grid";
import YouTubeVideoCard from "@/components/youtube/video-card";
import { db } from "@/lib/db";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "SaTube",
  description: "This a platform like youtube developed by Shahin Alam",
};

const getVideos = async (category: string) => {
  if (category !== "all") {
    const videos = await db.video.findMany({
      where: {
        category: {
          id: category,
        },
      },
      include: { user: true, category: true, channel: true },
      orderBy: { id: "desc" },
    });
    return videos;
  } else if (category === "all") {
    const videos = await db.video.findMany({
      where: {
        channelId: {},
      },
      include: { user: true, category: true, channel: true },
      orderBy: { id: "desc" },
    });
    return videos;
  } else {
    const videos = await db.video.findMany({
      where: {
        channelId: {},
      },
      include: { user: true, category: true, channel: true },
      orderBy: { id: "desc" },
    });
    return videos;
  }
};

interface YouTubeVideoCardContainerProps {
  searchParams: {
    category?: string;
  };
}

const YouTubeVideoCardContainer: React.FC<
  YouTubeVideoCardContainerProps
> = async ({ searchParams }) => {
  const videos = await getVideos(searchParams?.category!);
  const categories = await db.category.findMany({});
  return (
    <div className="container mx-auto w-full py-10">
      <CategoriesTabs category={categories} />
      {/* <div className="container mx-auto p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4"> */}
      <ResponsiveVideoGrid>
        {videos.length > 0 &&
          videos.map((video, index) => (
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
              key={index}
            />
          ))}
      </ResponsiveVideoGrid>
      {/* </div> */}
    </div>
  );
};

export default YouTubeVideoCardContainer;
