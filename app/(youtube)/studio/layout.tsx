import { getAuthSession } from "@/lib/auth";
import { redirect } from "next/navigation";
import React from "react";

type Props = {
  children: React.ReactNode;
};

const Layout = async ({ children }: Props) => {
  const session = await getAuthSession();
  if (!session) {
    return redirect("/login");
  }
  return <div className="md:container mx-auto">{children}</div>;
};

export default Layout;
