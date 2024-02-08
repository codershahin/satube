import React, { Suspense } from "react";

type Props = {
  children: React.ReactNode;
};

const Layout = (props: Props) => {
  return (
    <>
      <Suspense fallback={<p>Loading...</p>}>{props.children}</Suspense>
    </>
  );
};

export default Layout;
