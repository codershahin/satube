import { redirect } from "next/navigation";
import React from "react";

type Props = {};

const Page = (props: Props) => {
  return redirect("/");
};

export default Page;
