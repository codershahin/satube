// ResponsiveVideoGrid.tsx
import React from "react";

interface ResponsiveVideoGridProps {
  children: React.ReactNode;
}

const ResponsiveVideoGrid: React.FC<ResponsiveVideoGridProps> = ({
  children,
}) => {
  return (
    <div className="my-10 mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-y-3 gap-x-6">
      {children}
    </div>
  );
};

export default ResponsiveVideoGrid;
