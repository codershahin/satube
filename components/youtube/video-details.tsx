"use client";
import { Channel, Comment, Video } from "@prisma/client";
import React from "react";
import TextWithLinks from "../text-with-links";
import Link from "next/link";
import YouTubeVideoPlayer from "./youtube-video-player";
import Comments from "./coments";
import CommentInput from "./coment-input";
import RelatedVideos from "./related-videos";
import { Copy, ShieldCheck } from "lucide-react";
import toast from "react-hot-toast";
import moment from "moment";
import SubscribeButton from "./subscribe-button";
import LikeButton from "./like-button";
import { useSession } from "next-auth/react";
import DisLikeButton from "./dislike-button";
import { ShareButton } from "./share-button";

interface VideoProps extends Video {
  channel: Channel;
  user?: User;
}

interface CommentType extends Comment {
  user: {
    name: string;
    image: string;
  };
}

type Props = {
  video: VideoProps;
  commentsData: CommentType[] | [];
  relatedVideos: VideoProps[];
};

const VideoDetails = ({ video, commentsData, relatedVideos }: Props) => {
  const handleCopyLink = () => {
    window.navigator.clipboard.writeText(window.location.href);
    toast.success("Link Copied!");
  };
  const session = useSession();
  return (
    <div className="text-white">
      <div className="md:container mx-auto p-4 relative text-white">
        <div
        //   className="absolute top-0 left-0 w-full h-full z-[-1] bg-cover bg-center"
        //   style={{ backgroundImage: `url(${video.user.image!})` }}
        />
        <div className="rounded-lg md:p-6">
          <div className="mb-4 border-b">
            {/* <video
          width="100%"
          height="400"
          controls
          className="rounded-lg h-[450px]"
        >
          <source src={video.url} type="video/mp4" />
          Your browser does not support the video tag.
        </video> */}
            <YouTubeVideoPlayer url={video.url} />
          </div>

          <div>
            <h1 className="text-2xl font-bold mb-1">{video.title}</h1>
            <div className="flex items-center max-w-max gap-x-3 mb-4 ">
              <div>
                <Link
                  href={`/channel/${video.channel.username}`}
                  className="flex items-start my-3"
                >
                  <img
                    src={video.channel.logo!}
                    alt={`${video.channel.username} favicon`}
                    className="w-10 h-10 rounded-full mr-4"
                  />
                  <div className="flex flex-col">
                    <h2 className="text-gray-500 flex items-center">
                      {video.channel.name}
                      <span
                        className="text-gray-500 flex items-center text-sm"
                        title={video.channel.verified ? "verified" : ""}
                      >
                        {/* @{channelUsername}{" "} */}
                        {video.channel.verified && (
                          <ShieldCheck className="w-4 h-4" />
                        )}
                      </span>
                    </h2>
                    <h4 className="text-gray-500 text-xs">
                      {video.channel.subscribersIds.length}{" "}
                      <span>Subscribers</span>
                    </h4>
                  </div>
                </Link>
              </div>
              <SubscribeButton channel={video.channel} userId={video.userId} />
            </div>
          </div>

          <div className="mb-4 ">
            <button className="bg-gray-200 rounded-full mx-3 text-gray-800 px-4 py-2">
              Download
            </button>
          </div>

          <div className="flex flex-col md:flex-row lg:flex-row xl:flex-row mt-4 border border-gray-400  md:items-center p-2 md:gap-x-2 ">
            <div className="md:mr-10">
              <p className="text-gray-500">
                Published:{" "}
                {video?.createdAt && moment(video?.createdAt).fromNow()}
              </p>
              <p className="text-gray-500">
                {video.views.toLocaleString()} views
              </p>
            </div>
            <div className="flex my-2 flex-wrap gap-2">
              <LikeButton
                video={video}
                userId={session?.data?.user?.id ? session?.data?.user?.id : ""}
              />
              <DisLikeButton
                video={video}
                userId={session?.data?.user?.id ? session?.data?.user?.id : ""}
              />
              <ShareButton
                shareUrl={`https://remotedataops.vercel.app/watch?/?v=${video.videoId}`}
                title={video.title}
                media={video.url}
              />
              <button
                onClick={handleCopyLink}
                className="flex items-center text-xs"
              >
                <Copy />
                Copy Link
              </button>
            </div>
          </div>

          <div className="my-4 border border-gray-400 p-4 overflow-auto">
            {/* <p className="text-gray-400"> */}
            <TextWithLinks text={video.description!} />
            {/* </p> */}
          </div>

          {/* Display Comments */}
          {/* @ts-ignore */}
          {commentsData && <Comments comments={commentsData!} />}

          {/* Comment Input */}
          <CommentInput videoId={video.id} />
        </div>

        {/* Related videos */}
        <RelatedVideos relatedVideos={relatedVideos} />
      </div>
    </div>
  );
};

export default VideoDetails;
