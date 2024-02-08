// RelatedVideos.tsx
"use client";
import React from "react";
import { Channel, Video } from "@prisma/client";
import ResponsiveVideoGrid from "./responsive-video-grid";
import RelatedVideoCard from "./related-video-card";

interface VideoProps extends Video {
  channel: Channel;
  user?: User;
}

interface RelatedVideosProps {
  // You can pass additional props if needed
  relatedVideos: VideoProps[];
}

const RelatedVideos: React.FC<RelatedVideosProps> = ({ relatedVideos }) => {
  // Replace this with actual related video data fetching logic or use a state management library

  // const relatedVideos = await db.video.findMany({
  //   where: {
  //     userId: userID,
  //     id: {
  //       notIn: [videoId],
  //     },
  //   },
  //   include: { user: true },
  // });
  // Add more related video objects as needed
  if (!relatedVideos) return null;
  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Related Videos</h2>
      {/* <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4"> */}
      <ResponsiveVideoGrid>
        {relatedVideos.map((video) => (
          <RelatedVideoCard
            username={video.channel.username}
            verified={video.channel.verified}
            title={video.title}
            channel={video.channel.name}
            views={video.views}
            videoId={video.videoId}
            videoPublishDate={new Date(video.createdAt!)?.toLocaleString()}
            thumbnailUrl={video.thumbnail}
            channelFaviconUrl={video.channel.logo!}
            key={video.id}
          />
        ))}
        {/* </div> */}
      </ResponsiveVideoGrid>
    </div>
  );
};

{
  /* <div
            key={video.id}
            className="bg-slate-800 rounded-lg overflow-hidden shadow-md"
          >
            <img
              src={video.user.image!}
              alt={video.title}
              className="w-full h-32 object-cover"
            />
            <div className="p-4">
              <h3 className="text-md font-bold mb-2">{video.title}</h3>

              <div className="flex items-center gap-x-1">
                <img
                  className="h-6 w-6 rounded-full drop-shadow-md border"
                  src={video.user.image!}
                />
                <p className="text-gray-500 text-sm">{video.user.name}</p>
              </div>
            </div>
          </div> */
}

export default RelatedVideos;
