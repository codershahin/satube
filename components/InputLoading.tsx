import React from "react";
import { Skeleton } from "./ui/skeleton";

type Props = {};

const InputLoading = (props: Props) => {
  return (
    <div>
      <Skeleton className="w-full h-[40px] rounded-md" />
    </div>
  );
};

export default InputLoading;
