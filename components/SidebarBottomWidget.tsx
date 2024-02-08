import Link from "next/link";
import React from "react";

type Props = {};

const SidebarBottomWidget = (props: Props) => {
  return (
    <div className="rounded-lg bg-gray-100 p-3 ">
      {/* <h2 className="text-sm font-medium text-gray-800">
      New feature availabel!
    </h2> */}
      <p className="mt-1 text-xs text-gray-500">
        Log in to follow creators, like videos, and view comments.
      </p>
      <Link href="/sign-in" className="px-6 block  w-max py-2 my-2 text-white font-medium bg-red-500 rounded-md">
        Login
      </Link>
    </div>
  );
};

export default SidebarBottomWidget;
