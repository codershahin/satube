// LikeButton.tsx
"use client";
import { cn } from "@/lib/utils";
import { Video } from "@prisma/client";
import axios from "axios";
import { ThumbsUp } from "lucide-react";
import { useSession } from "next-auth/react";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
interface LikeButtonProps {
  video: Video;
  userId: string;
}

const LikeButton: React.FC<LikeButtonProps> = ({ video, userId }) => {
  const { status, data } = useSession({
    required: true,
    onUnauthenticated() {
      toast.error("You must be logged in to like a video");
    },
  });
  const [loading, setLoading] = useState(false);
  const [likedvideo, setLikedVideo] = useState(
    video?.likesIds?.includes(userId)
  );
  const doLike = async () => {
    setLoading(true);
    try {
      const res = await axios.patch(
        `/api/youtube/like?videoId=${video.videoId}&userId=${userId}`
      );
      toast.success(res.data);
      if (res.data === "success") {
        setLikedVideo(true);
      }
    } catch (error: any) {
      toast.error(error?.response?.data || error?.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    if (data) {
      if (data.user) {
        setLikedVideo(video?.likesIds?.includes(data.user.id));
        // console.log(video?.likesIds);
      }
    }
    // setLikedVideo(video?.likesIds?.includes(userId));
    // console.log(video?.likesIds.findIndex((i) => i == userId));
    // console.log(video?.likesIds.find((i) => i == userId));
  }, [data, video]);

  return (
    <button
      disabled={loading}
      onClick={doLike}
      className={cn(
        `bg-green-500 px-2 py-1 flex items-center gap-x-1 text-white md:px-4 md:py-2 disabled:bg-gray-500 disabled:cursor-not-allowed rounded-full`,
        likedvideo ? "bg-green-800" : ""
      )}
    >
      <ThumbsUp /> <span>{video?.likesIds?.length}</span>
      Like
    </button>
  );
};

export default LikeButton;
