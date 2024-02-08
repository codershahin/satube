// ChannelPage.tsx
"use client";
import Banner from "@/components/youtube/channel-banner";
import ChannelInfo from "@/components/youtube/channel-info";
import SubscribeButton from "@/components/youtube/subscribe-button";
import React, { useEffect, useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Channel, User, Video } from "@prisma/client";
import toast from "react-hot-toast";
import axios from "axios";
import YouTubeVideoCard from "@/components/youtube/video-card";
import { Skeleton } from "@/components/ui/skeleton";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import ChannelPlaylist from "@/components/youtube/channel-playlist";
import ChannelCommunity from "@/components/youtube/channel-community";
import VideosLoading from "@/components/youtube/video-loading-component";
import TextWithLinks from "@/components/text-with-links";
import ResponsiveVideoGrid from "@/components/youtube/responsive-video-grid";

interface VideoTypes extends Video {
  channel: Channel;
}

interface Props {
  params: {
    username: string;
  };
}

type TabType = "videos" | "playlist" | "community" | "about";

const ChannelPage: React.FC<Props> = ({ params: { username } }) => {
  const { data: session } = useSession();
  const [loading, setLoading] = useState(true);
  const [videos, setVideos] = useState<VideoTypes[]>([]);
  const [tab, setTab] = useState<TabType>("videos");
  const [channel, setChannel] = useState<Channel>();
  // Replace this with actual channel data fetching logic or use a state management library
  const channelData = {
    bannerImageUrl: "https://via.placeholder.com/1200x400",
    channelIconUrl: "https://via.placeholder.com/100x100",
    channelName: "Channel Name",
    subscribeCount: 1234567,
    about:
      "Welcome to our channel! We create amazing content for our subscribers.",
  };

  const [isSubscribed, setSubscribed] = useState(false);

  const loadVideos = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `/api/youtube/channel/${username}/videos`
      );
      setVideos(response.data);
    } catch (error: any) {
      console.log(error);
      toast.error(error?.response?.data || error?.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const loadProfile = async () => {
      setLoading(true);
      try {
        const { data } = await axios.get(`/api/youtube/channel/${username}`);
        setChannel(data);
      } catch (error) {
        toast.error("Unable to load Profile.");
      } finally {
        setLoading(false);
      }
    };
    loadProfile();
    if (tab === "videos") {
      loadVideos();
    }
  }, [tab]);

  return (
    <div className="md:container mx-auto p-4">
      {/* Banner */}
      {loading ? (
        <Skeleton className="w-full h-64" />
      ) : (
        <Banner
          bannerImageUrl={
            channel?.banner ? channel?.banner! : channelData.bannerImageUrl
          }
        />
      )}

      {/* Channel Info */}
      <div className="mt-4">
        {!channel || loading ? (
          <Skeleton className="w-full h-20" />
        ) : (
          <ChannelInfo
            verified={channel.verified}
            channelIconUrl={
              channel?.logo ? channel?.logo! : channelData.channelIconUrl
            }
            channelName={channel?.name!}
            channelUsername={channel?.username!}
            subscribeCount={channel.subscribersIds.length}
            about={channel?.bio!}
          />
        )}
      </div>

      {/* Subscribe Button */}
      {loading ? (
        <Skeleton className="w-[100px] h-10 my-2 rounded-lg" />
      ) : (
        <div className="mt-4">
          {session && session?.user?.id === channel?.userId ? (
            <div className="flex gap-x-2 items-center">
              <Button variant={"default"} className="bg-gray-700 text-white">
                Customize Channel
              </Button>
              <Button variant={"default"} className="bg-gray-700 text-white">
                Manage Videos
              </Button>
            </div>
          ) : (
            <SubscribeButton channel={channel!} userId={session?.user?.id!} />
          )}
        </div>
      )}

      {/* Tabs */}
      <div className="mt-8">
        {/* Replace these with your actual tabs */}
        <Tabs
          onValueChange={(val: string) => setTab(val as TabType)} // Ensure that val is of type string
          defaultValue="videos"
          value={tab}
        >
          <TabsList className="md:w-[71vw] w-full bg-gray-400 justify-start">
            <TabsTrigger value="videos">Videos</TabsTrigger>
            <TabsTrigger value="playlist">Playlist</TabsTrigger>
            <TabsTrigger value="community">Community</TabsTrigger>
            <TabsTrigger value="about">About</TabsTrigger>
          </TabsList>
          <TabsContent value="videos">
            {!videos || loading ? (
              //   Skeleton for loading state
              <VideosLoading />
            ) : (
              <ResponsiveVideoGrid>
                {/* // <div className="p-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-x-4"> */}
                {videos.length > 0 &&
                  videos.map((video, index) => (
                    <YouTubeVideoCard
                      isEdit={session?.user?.id === channel?.userId}
                      editUrl={`/studio/${video.channel.username}/videos/${video.videoId}/edit`}
                      verified={video.channel.verified}
                      title={video.title}
                      channel={video.channel.name}
                      views={video.views}
                      videoId={video.videoId}
                      username={video.channel.username}
                      videoPublishDate={new Date(
                        video.createdAt!
                      )?.toLocaleString()}
                      thumbnailUrl={video.thumbnail}
                      channelFaviconUrl={video.channel?.logo!}
                      key={index}
                    />
                  ))}
                {/* </div> */}
              </ResponsiveVideoGrid>
            )}

            {videos && !loading && videos?.length === 0 && (
              <div className="flex w-full items-center justify-center">
                {session && session?.user?.id === channel?.userId ? (
                  <div className="text-center">
                    <img
                      className="w-40 h-40 mx-auto"
                      src="https://www.gstatic.com/youtube/img/channels/core_channel_no_activity_dark.svg"
                    />
                    <h4 className="text-white ">
                      Create content on any device
                    </h4>
                    <p className="text-center text-white my-3">
                      Upload and record at home or on the go. <br />
                      Everything you make public will appear here.
                    </p>

                    <Link
                      href={`/youtube/studio/${channel?.username}/videos/create`}
                    >
                      <Button className="bg-red-500 h-0 py-4 px-4">
                        Create
                      </Button>
                    </Link>
                  </div>
                ) : (
                  <div className="text-center">
                    <img
                      className="w-40 h-40 mx-auto"
                      src="https://www.gstatic.com/youtube/img/channels/core_channel_no_activity_dark.svg"
                    />
                    <h4 className="text-white ">No videos Published yet.</h4>

                    <Link href={`/`}>
                      <Button className="bg-green-500 h-0 py-4 px-4">
                        Back to Home
                      </Button>
                    </Link>
                  </div>
                )}
              </div>
            )}
          </TabsContent>
          <TabsContent value="playlist">
            <ChannelPlaylist />
          </TabsContent>
          <TabsContent value="community">
            <ChannelCommunity />
          </TabsContent>
          <TabsContent value="about">
            <div>
              <h1 className="text-lg text-white">About - {channel?.name}</h1>
              <div className="p-2">
                <TextWithLinks text={channel?.bio ? channel?.bio : ""} />
              </div>
            </div>
          </TabsContent>
        </Tabs>

        {/* Tab Content */}
        {/* Replace this with the content of the active tab */}
        {/* <div className="mt-4">Tab Content Goes Here</div> */}
      </div>
    </div>
  );
};

export default ChannelPage;
