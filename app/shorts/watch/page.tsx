import VideoCard from "@/components/VideoCard";
import VideoNotFound from "@/components/video-not-found";
import { db } from "@/lib/db";
import { redirect } from "next/navigation";
import React from "react";

type Props = {
  searchParams: {
    v: string;
    user: string;
  };
};

const Page = async ({ searchParams: { v, user } }: Props) => {
  if (!v || !user) {
    return redirect("/");
  }

  const video = await db.video.findFirst({
    where: {
      url: {
        endsWith: ".mp4",
      },
      videoId: v,
      user: {
        username: user,
      },
    },
    include: {
      user: true,
      category: true,
    },
  });
  const videos = await db.video.findMany({
    where: {
      NOT: {
        videoId: v,
      },
      url: {
        endsWith: ".mp4",
      },
      user: {
        username: user,
      },
    },
    include: {
      user: true,
      category: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  if (!video) return <VideoNotFound />;
  return (
    <div className="md:ml-[250px] py-10 md:px-5">
      <div className="w-full">
        {/* <VideoCard video={video!} /> */}

        {/* {videos.length > 0
          ? videos.map((video) => <VideoCard video={video} key={video?.id!} />)
          : null} */}
      </div>
    </div>
  );
};

export default Page;
