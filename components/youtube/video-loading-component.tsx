import React from "react";
import { Skeleton } from "../ui/skeleton";

type Props = {};

const VideosLoading = (props: Props) => {
  return (
    <div className="my-10 mx-auto gap-y-3 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4">
      <Skeleton className="w-full h-64" />
      <Skeleton className="w-full h-64" />
      <Skeleton className="w-full h-64" />
      <Skeleton className="w-full h-64" />
      <Skeleton className="w-full h-64" />
      <Skeleton className="w-full h-64" />
      <Skeleton className="w-full h-64" />
      <Skeleton className="w-full h-64" />
    </div>
  );
};

export default VideosLoading;
