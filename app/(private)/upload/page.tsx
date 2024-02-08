import Upload from "@/components/Upload";
import { getAuthSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import React from "react";

const Page = async () => {
  const session = await getAuthSession();
  if (!session) return redirect("/sign-in");
  return <div>{/* <Upload /> */}</div>;
};

export default Page;
