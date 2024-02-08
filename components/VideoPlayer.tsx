"use client";
import axios from "axios";
import { useEffect, useRef, useState } from "react";
import { Button } from "./ui/button";
import { Play } from "lucide-react";

type Props = {
  url: string;
};

const VideoPlayer = ({ url }: Props) => {
  const videoRef = useRef<HTMLVideoElement>(null);
  const [isPaused, setPaused] = useState(false);
  const [isPlaying, setIsPlaying] = useState(true);

  const updateView = async (url: string) => {
    try {
      await axios.post(`/api/videos/views`, { url: url });
    } catch (error: any) {
      console.log("views error", error?.message);
      // console.log("views update error", error);
    }
  };

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) {
        if (video.paused) {
          video.play();
          updateView(video.src);
          setPaused(false);
        }
      } else {
        if (!video.paused) {
          video.pause();
          setPaused(true);
        }
      }
    });
    observer.observe(video);
    return () => {
      observer.unobserve(video);
    };
  }, []);

  const handleClick = () => {
    if (videoRef.current) {
      if (videoRef.current.paused) {
        videoRef.current.play();
        setIsPlaying(true);
      } else {
        videoRef.current.pause();
        setIsPlaying(false);
      }
    }
  };

  return (
    <div className="rounded-xl relative w-full h-[80vh]">
      <video
        onClick={handleClick}
        ref={videoRef}
        controls={false}
        src={url}
        loop={true}
        aria-label={url}
        className="object-cover h-[90%] rounded-xl w-full"
      />
      {!isPlaying && (
        <Button
          onClick={handleClick}
          variant={"outline"}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2
          "
        >
          <Play />
        </Button>
      )}
    </div>
  );
};

export default VideoPlayer;
