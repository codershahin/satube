"use client";
import TextWithLinks from "@/components/text-with-links";
import { Channel, Video } from "@prisma/client";
import { Dot, ShieldCheck } from "lucide-react";
import { useRouter } from "next/navigation";

const HistoryVideoCard = ({
  video,
}: {
  video: Video & { channel: Channel };
}) => {
  const router = useRouter();
  return (
    <>
      {/* <Link href={`/watch?v=${video.videoId}`}> */}
      <div
        onClick={() => router.push(`/watch?v=${video.videoId}`)}
        className="my-3 hover:cursor-pointer overflow-hidden flex gap-x-4 drop-shadow-sm w-full"
      >
        <img
          src={video.thumbnail}
          alt={video.title}
          className="w-[250px] object-cover h-[150px] rounded-xl"
        />
        <div className="mt-2">
          <h2 className="text-lg font-normal text-white ">{video.title}</h2>
          <h4
            title={video.channel.verified ? "Verified" : ""}
            className="text-xs text-gray-500 flex items-center"
          >
            {video.channel.name}{" "}
            <>
              {video.channel.verified && (
                <ShieldCheck className="mx-1" size={14} />
              )}
            </>{" "}
            <Dot /> <span>{video.views.toLocaleString()} views</span>
          </h4>
          <div className="text-xs mt-2 max-h-[100px] w-full truncate">
            <TextWithLinks text={video.description || ""} />
          </div>
        </div>
      </div>
      {/* </Link> */}
      <div className="border-b border-gray-500" />
    </>
  );
};

export default HistoryVideoCard;
