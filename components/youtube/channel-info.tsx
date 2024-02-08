// ChannelInfo.tsx
import { ShieldCheck } from "lucide-react";
import React from "react";

interface ChannelInfoProps {
  channelIconUrl: string;
  channelName: string;
  subscribeCount: number;
  about: string;
  channelUsername: string;
  verified: boolean;
}

const ChannelInfo: React.FC<ChannelInfoProps> = ({
  channelIconUrl,
  channelName,
  subscribeCount,
  about,
  verified,
  channelUsername,
}) => {
  return (
    <div className="flex items-center">
      <img
        src={channelIconUrl}
        alt={`${channelName} Icon`}
        className="w-16 h-16 rounded-full mr-4"
      />
      <div>
        <h1 className="text-2xl text-white font-bold">
          {channelName}
          <span
            className="text-gray-500 flex items-center text-sm"
            title={verified ? "verified" : ""}
          >
            @{channelUsername}{" "}
            {verified && <ShieldCheck className="w-6 h-6 mr-2" />}
          </span>
        </h1>
        <p className="text-gray-500">
          {subscribeCount.toLocaleString()} subscribers
        </p>
      </div>
    </div>
  );
};

export default ChannelInfo;
