import React from "react";

type Props = {
  children: React.ReactNode;
};

const Layout = ({ children }: Props) => {
  return <div className="md:ml-[250px] w-full">{children}</div>;
};

export default Layout;
