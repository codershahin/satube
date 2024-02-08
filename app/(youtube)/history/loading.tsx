import { Skeleton } from "@/components/ui/skeleton";
import ResponsiveVideoGrid from "@/components/youtube/responsive-video-grid";
import React from "react";

type Props = {};

const Loading = () => {
  return (
    <div className="container mx-auto md:my-10 my-20">
      <ResponsiveVideoGrid>
        <Skeleton className="h-[150px] w-full" />
        <Skeleton className="h-[150px] w-full" />
        <Skeleton className="h-[150px] w-full" />
        <Skeleton className="h-[150px] w-full" />
      </ResponsiveVideoGrid>
    </div>
  );
};

export default Loading;
