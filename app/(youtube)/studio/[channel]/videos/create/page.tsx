import Upload from "@/components/Upload";
import React from "react";

type Props = {
  params: {
    channel: string;
  };
};

const Page = ({ params: { channel } }: Props) => {
  return (
    <div className="p-5">
      <Upload channel={channel} />
    </div>
  );
};

export default Page;
