"use client";
import { Play } from "lucide-react";
import React from "react";
import ReactVideoPlayer from "react-player/file";
type Props = {
  url: string;
};

const YouTubeVideoPlayer = ({ url }: Props) => {
  return (
    <div className="react-player md:h-[600px] mt-10 rounded-md h-[250px] w-full object-cover md:p-5">
      <ReactVideoPlayer
        width={"100%"}
        progressInterval={100}
        playIcon={<Play />}
        pip
        playing
        height={"100%"}
        controls
        url={url}
      />
    </div>
  );
};

export default YouTubeVideoPlayer;
