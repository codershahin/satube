// // YouTubeVideoCard.tsx
// import React from "react";

// interface YouTubeVideoCardProps {
//   title: string;
//   channel: string;
//   views: number;
//   thumbnailUrl: string;
// }

// const YouTubeVideoCard: React.FC<YouTubeVideoCardProps> = ({
//   title,
//   channel,
//   views,
//   thumbnailUrl,
// }) => {
//   return (
//     <div className="max-w-2xl mx-auto mb-8 bg-white rounded-lg overflow-hidden shadow-md">
//       <img
//         src={thumbnailUrl}
//         alt={title}
//         className="w-full h-48 object-cover"
//       />

//       <div className="p-6">
//         <h2 className="text-xl font-bold mb-2">{title}</h2>
//         <p className="text-gray-700 text-sm mb-2">{channel}</p>
//         <p className="text-gray-500 text-sm">{views.toLocaleString()} views</p>
//       </div>
//     </div>
//   );
// };

// export default YouTubeVideoCard;

// YouTubeVideoCard.tsx
// YouTubeVideoCard.tsx
"use client";
import { Delete, Edit, ShieldCheck } from "lucide-react";

import { useRouter } from "next/navigation";
import React from "react";
import { Button } from "../ui/button";

interface YouTubeVideoCardProps {
  title: string;
  channel: string;
  verified: boolean;
  views: number;
  thumbnailUrl: string;
  channelFaviconUrl: string;
  videoId: string;
  username: string;
  videoPublishDate?: string;
  isEdit?: boolean;
  editUrl?: string;
}

const RelatedVideoCard: React.FC<YouTubeVideoCardProps> = ({
  title,
  channel,
  views,
  thumbnailUrl,
  channelFaviconUrl,
  videoId,
  videoPublishDate,
  username,
  verified,
  isEdit,
  editUrl,
}) => {
  const router = useRouter();

  return (
    <div className="cursor-pointer w-[320px] max-w-2xl mx-auto mb-8 rounded-lg overflow-hidden">
      <img
        onClick={() => router.push(`/watch/?v=${videoId}`)}
        src={thumbnailUrl}
        alt={title}
        className="w-full h-[180px] object-cover rounded-lg mx-auto"
      />

      <div
        onClick={() => router.push(`/watch/?v=${videoId}`)}
        className="p-2 flex items-start"
      >
        <img
          src={channelFaviconUrl}
          alt={`${channel} favicon`}
          className="w-8 h-8 rounded-full mr-4"
        />

        <div className="space-y-[1px]">
          <h2 title={title} className="text-lg text-white font-normal">
            {title.length > 26 ? (
              title.slice(0, 26) + "..."
            ) : (
              <p dangerouslySetInnerHTML={{ __html: title }}></p>
            )}
          </h2>
          <div>
            <p className="text-gray-500 text-xs flex items-center">{channel}</p>
            <p
              title={verified ? "verified" : ""}
              className="text-gray-500 text-xs flex items-center"
            >
              @{username}
              {verified && <ShieldCheck className="w-4 h-4 mr-2" />}
            </p>
          </div>
          <p className="text-gray-500 text-xs ">
            {views.toLocaleString()} views {"|"}{" "}
            {videoPublishDate && videoPublishDate}
          </p>
        </div>
      </div>

      {isEdit && editUrl && (
        <div className="flex gap-x-2 justify-end">
          <Button className="text-red-500">
            <Delete />
          </Button>
          <Button
            onClick={() => router.push(editUrl)}
            className="text-green-500"
          >
            <Edit />
          </Button>
        </div>
      )}
    </div>
  );
};

export default RelatedVideoCard;
