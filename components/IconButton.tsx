"use client";
import { cn } from "@/lib/utils";
import React, { HTMLAttributes } from "react";

interface Props extends HTMLAttributes<HTMLButtonElement> {
  Icon: React.ReactNode;
  handleClick: () => void;
}
const IconButton = ({ Icon,className, handleClick, ...rest }: Props) => {
  return (
    <button
      onClick={handleClick}
      {...rest}
      className={cn(
        "flex justify-center relative items-center text-slate-900 h-10 w-10 font-medium bg-gray-300 rounded-full",
        className
      )}
    >
      {Icon}
    </button>
  );
};

export default IconButton;
