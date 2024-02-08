import React from "react";
import VideoPlayer from "./VideoPlayer";
import VideoWidget from "./VideoWidget";
import { Video } from "@prisma/client";

type Props = {
  video: Video;
};

const VideoComp = ({ video }: Props) => {
  return (
    <div className="flex relative justify-center w-full h-[80vh]">
      <VideoPlayer url={video.url} />
      <VideoWidget video={video} />
    </div>
  );
};

export default VideoComp;
