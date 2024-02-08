// SubscribeButton.tsx
"use client";
import { cn } from "@/lib/utils";
import { Channel } from "@prisma/client";
import axios from "axios";
import React, { useState } from "react";
import toast from "react-hot-toast";
interface SubscribeButtonProps {
  channel: Channel;
  userId: string;
}

const SubscribeButton: React.FC<SubscribeButtonProps> = ({
  channel,
  userId,
}) => {
  const [loading, setLoading] = useState(false);
  const [subscribed, setSubscribed] = useState(
    channel?.subscribersIds?.find((i) => i === userId)
  );
  const subscribe = async () => {
    setLoading(true);
    try {
      const res = await axios.patch(
        `/api/youtube/channel/${channel.username}/subscribe?userId=${userId}`
      );
      toast.success(res.data);
      if (res.data === "Subscribed") {
        setSubscribed("true");
      } else {
        setSubscribed(undefined);
      }
    } catch (error: any) {
      toast.error(error?.response?.data || error?.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      disabled={loading}
      onClick={subscribe}
      className={cn(
        `bg-red-500 text-white px-4 py-2 disabled:bg-gray-500 disabled:cursor-not-allowed rounded-full`,
        subscribed ? "bg-gray-500" : ""
      )}
    >
      {subscribed ? "Unsubscribe" : "Subscribe"}
    </button>
  );
};

export default SubscribeButton;
