// Banner.tsx
import React from "react";

interface BannerProps {
  bannerImageUrl: string;
}

const Banner: React.FC<BannerProps> = ({ bannerImageUrl }) => {
  return (
    <img
      src={bannerImageUrl}
      alt="Channel Banner"
      className="w-full rounded-md mt-4 h-64 object-cover"
    />
  );
};

export default Banner;
