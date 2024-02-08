import React from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "./ui/card";
import MiniAvatar from "./MiniAvatar";
import Link from "next/link";
import { Channel } from "@prisma/client";

type Props = {
  channel: Channel;
};

const MiniUser = ({ channel }: Props) => {
  return (
    <Card className="border-none shadow-none">
      <CardHeader className="p-1">
        <MiniAvatar channel={channel} />
      </CardHeader>
      <CardContent>
        <CardTitle>
          <Link href={`/channel/${channel?.username}`} className="text-sm">
            {channel?.name}
          </Link>
        </CardTitle>
        <CardDescription>{channel?.bio}</CardDescription>
      </CardContent>
    </Card>
  );
};

export default MiniUser;
