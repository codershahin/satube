import React from "react";

type Props = {
  children: React.ReactNode;
};

const Layout = async ({ children }: Props) => {
  return <div className="pl-[290px] py-10">{children}</div>;
};

export default Layout;
