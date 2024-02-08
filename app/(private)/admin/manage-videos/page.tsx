import VideosTable from "@/components/tables/videos-table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { db } from "@/lib/db";
import React from "react";
export const revalidate = 0;
type Props = {};

const Page = async (props: Props) => {
  const videos = await db.video.findMany({
    include: {
      category: true,
      user: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return (
    <div className="border py-10 px-5">
      <Card>
        <CardHeader>
          <CardTitle>All videos</CardTitle>
        </CardHeader>
        <CardContent>
          <VideosTable videos={videos} />
        </CardContent>
      </Card>
    </div>
  );
};

export default Page;
