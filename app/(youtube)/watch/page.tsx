import VideoNotFound from "@/components/video-not-found";
import VideoDetails from "@/components/youtube/video-details";
import { getAuthSession } from "@/lib/auth";
import { db } from "@/lib/db";
import React from "react";

type Props = {
  searchParams: { v: string };
};
export const revalidate = 0;
export async function generateMetadata({ searchParams }: Props) {
  const video = await db.video.findFirst({
    where: {
      videoId: searchParams.v,
    },
    include: {
      channel: true,
      category: true,
    },
  });
  if (!video) return;
  return {
    title: `${video.title} on SaTube by Shahin Alam`,
    description: video.description,
    openGraph: {
      title: video.title,
      description: video.description,
      images: [
        {
          url: video.thumbnail,
          width: 800,
          height: 600,
        },
      ],
    },
  };
}

const createHistory = async (videoId: string, id: string) => {
  try {
    const session = await getAuthSession();
    if (!session) {
      return null;
    }
    // check history exists
    const history = await db.history.findFirst({
      where: {
        userId: session.user.id!,
      },
      include: { videos: true },
    });
    // const body = await req.json();
    if (!videoId) {
      // return NextResponse.json("Video Id is missing.", { status: 400 });
      return null;
    }
    if (!history) {
      // create history and add video
      const history = await db.history.create({
        data: {
          userId: session.user.id,
          videos: {
            connect: {
              id,
            },
          },
        },
      });
      // return NextResponse.json(history, { status: 201 });
    } else {
      await db.history.update({
        where: { id: history.id },
        data: {
          videos: {
            connect: {
              id,
            },
          },
        },
      });
      //   revalidatePath('/');
      // return NextResponse.json("success", { status: 200 });
    }
  } catch (error: any) {
    console.log("error", error?.response?.data || error?.message);
  }
};

const Page = async (props: Props) => {
  const video = await db.video.findFirst({
    where: {
      videoId: props.searchParams.v,
    },
    include: {
      channel: true,
      category: true,
    },
  });

  if (!video) return <VideoNotFound />;

  let commentsData = await db.comment.findMany({
    where: {
      videoId: video.id,
    },
    include: {
      user: {
        select: {
          name: true,
          image: true,
        },
      },
    },
  });

  const relatedVideos = await db.video.findMany({
    where: {
      category: {
        name: video?.category?.name,
      },
      NOT: {
        videoId: video.videoId,
      },
    },
    include: { user: true, channel: true },
  });

  // update video views
  await db.video.update({
    where: {
      videoId: video.videoId,
    },
    data: {
      views: {
        increment: 1,
      },
    },
  });

  // const history = await db.history.findFirst({
  //   where:{
  //     userId: sessio
  //   }
  // })

  // create history
  createHistory(video.videoId, video.id);

  return (
    <div className="w-full">
      <VideoDetails
        //   @ts-ignore
        commentsData={commentsData ? commentsData : []}
        video={video}
        relatedVideos={relatedVideos}
      />
    </div>
  );
};

export default Page;
