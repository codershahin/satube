import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Share2 } from "lucide-react";
import { SocialShare } from "../social-share";

interface Props {
  shareUrl: string;
  title: string;
  media: string;
}

export const ShareButton = ({ shareUrl, title, media }: Props) => {
  return (
    <Popover>
      <PopoverTrigger>
        <button className="flex items-center mr-4">
          <Share2 />
          Share
        </button>
      </PopoverTrigger>
      <PopoverContent>
        <div className="overflow-auto">
          <SocialShare shareUrl={shareUrl} title={title} media={media} />
        </div>
      </PopoverContent>
    </Popover>
  );
};
