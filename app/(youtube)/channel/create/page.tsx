import CreateChannel from "@/components/youtube/create-channel";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Create Channel on SaTube",
  description: "Create Channel",
};

const Page = () => {
  return (
    <div>
      <CreateChannel />
    </div>
  );
};

export default Page;
