import { db } from "@/lib/db";
import React from "react";

type Props = {
  children: React.ReactNode;
  params: {
    username: string;
  };
};

export async function generateMetadata({ params, ...rest }: Props) {
  console.log(rest);
  if (!params?.username) return;
  const channel = await db.channel.findFirst({
    where: {
      username: params.username,
    },
  });
  if (!channel) {
    return {
      title: "Channel Not Found",
    };
  }
  return {
    title: `${channel.name} - @${channel.username}  on SaTube`,
    description: channel?.bio || "",
    openGraph: {
      title: `@${channel.username} - ${channel.name} on SaTube`,
      description: channel?.bio || "",
      images: [
        {
          url: channel.logo,
          width: 800,
          height: 600,
        },
      ],
    },
  };
}

const Layout = ({ children }: Props) => {
  return <>{children}</>;
};

export default Layout;
