import React from "react";

type Props = {};

const Page = (props: Props) => {
  return (
    <div className="w-full h-screen py-5">
      <div className="flex w-full h-full justify-center items-center p-4">
        <h2 className="text-xl font-semibold text-emerald-500">Loading...</h2>
      </div>
    </div>
  );
};

export default Page;
