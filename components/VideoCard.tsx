import React from "react";
import VideoHeader from "./VideoHeader";
import { Card, CardContent, CardHeader } from "./ui/card";
import VideoComp from "./VideoComp";
import { Category, Channel, Video } from "@prisma/client";

type videoType = Video & {
  user: User;
  category: Category;
  channel: Channel;
};

type Props = {
  video: videoType;
};

const VideoCard = ({ video }: Props) => {
  return (
    <Card className="shadow-md md:max-w-lg mx-w-md mx-auto max-h-[95vh] my-10 bg-white p-2">
      {/* Header */}
      <CardHeader className="p-2">
        <VideoHeader video={video} />
      </CardHeader>
      <CardContent className="md:p-3 p-0">
        <VideoComp video={video} />
      </CardContent>
    </Card>
  );
};

export default VideoCard;
