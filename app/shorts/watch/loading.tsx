import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

type Props = {};

const Page = (props: Props) => {
  return (
    <div className="md:ml-[250px] py-10 md:px-5">
      <Skeleton className="md:w-[25vw] w-full my-10 h-[80vh] shadow-md rounded-md mx-auto">
        <Skeleton className="h-full" />
      </Skeleton>
    </div>
  );
};

export default Page;
