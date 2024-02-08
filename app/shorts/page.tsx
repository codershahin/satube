import VideoCard from "@/components/VideoCard";
import { db } from "@/lib/db";

export const revalidate = 0;

const getVideos = async () => {
  const videos = await db.video.findMany({
    where: {
      url: {
        endsWith: ".mp4",
      },
    },
    include: { user: true, category: true, channel: true },
    orderBy: { id: "desc" },
  });
  return videos;
};

export default async function Home() {
  const videos = await getVideos();
  return (
    <div className="w-full">
      {/* <h1 className="text-2xl font-medium text-green-500">
        Home Tiktalk clone
      </h1> */}
      {videos.length > 0
        ? videos.map((video) => <VideoCard video={video} key={video?.id!} />)
        : null}
    </div>
  );
}
