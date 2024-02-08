import Image from "next/image";
import React from "react";
import { Button } from "./ui/button";
import Link from "next/link";

type Props = {};

const VideoNotFound = (props: Props) => {
  return (
    <div className="container mx-auto my-10 md:ml-[250px] py-10 md:px-5 h-full w-full">
      <div className="mx-auto max-w-md text-center">
        <Image
          src={"/unavailable_video.png"}
          alt="unavailable_video"
          className="mx-auto"
          width={250}
          height={250}
        />
        <h1 className="text-lg font-normal text-white">
          This video is not available
        </h1>
        <Button variant={"outline"} className="rounded-xl my-3">
          <Link href={"/"} className="capitalize">
            Go to home
          </Link>
        </Button>
      </div>
    </div>
  );
};

export default VideoNotFound;
