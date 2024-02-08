"use client"
import React from "react";
import IconButton from "./IconButton";
import { Heart, MessageCircleIcon, Bookmark, ForwardIcon } from "lucide-react";
import { Video } from "@prisma/client";

type Props = {
  video: Video;
};

const VideoWidget = ({ video }: Props) => {
  const handleLike = ()=>{
    console.log('liked')
  }
  const handleShare = ()=>{}
  const handleFav = ()=>{}
  const handleComment =  ()=>{}
  return (
    <div className="self-end bottom-10 w-max absolute right-5">
      <div className="flex flex-col justify-center items-center space-y-3">
        <IconButton  handleClick={handleLike} Icon={<Heart className="text-lg" />} />
        <IconButton  handleClick={handleComment} Icon={<MessageCircleIcon className="text-lg" />} />
        <IconButton  handleClick={handleFav} Icon={<Bookmark className="text-lg" />} />
        <IconButton  handleClick={handleShare} Icon={<ForwardIcon className="text-lg" />} />
      </div>
    </div>
  );
};

export default VideoWidget;
