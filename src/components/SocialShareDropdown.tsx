import React from "react";
import {
  FacebookShareButton,
  FacebookIcon,
  PinterestShareButton,
  PinterestIcon,
  LinkedinShareButton,
  LinkedinIcon,
  // FacebookMessengerShareButton,
  // FacebookMessengerIcon,
} from "next-share";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "./ui/button";
import { Share2 } from "lucide-react";

interface SocialShareDropdownProps {
  imageId: string;
}

const URL = process.env.NEXT_PUBLIC_BASE_URL;

const SocialShareDropdown = ({ imageId }: SocialShareDropdownProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          className="flex items-center font-normal gap-2"
          variant={"outline"}
        >
          <Share2 size={18} /> Share
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40">
        {/* Facebook */}
        <DropdownMenuItem className="text-xs flex items-center gap-2 font-normal cursor-pointer w-full px-2 py-3 transition-all">
          <FacebookShareButton
            style={{ display: "flex", alignItems: "center", width: "100%" }}
            url={`${URL}/images/${imageId}`}
          >
            <FacebookIcon round className="mr-2" size={25} />
            Facebook
          </FacebookShareButton>
        </DropdownMenuItem>

        {/* Messenger */}
        {/* <DropdownMenuItem className="text-xs flex items-center gap-2 font-normal cursor-pointer w-full px-2 py-3 transition-all">
          <FacebookMessengerShareButton
            appId={""}
            style={{ display: "flex", alignItems: "center", width: "100%" }}
            url="https://lucide.dev/icons/share-2"
          >
            <FacebookMessengerIcon className="mr-2" round size={25} />
            Messenger
          </FacebookMessengerShareButton>
        </DropdownMenuItem> */}

        {/* Pinterest */}
        <DropdownMenuItem className="text-xs flex items-center gap-2 font-normal cursor-pointer w-full px-2 py-3 transition-all">
          <PinterestShareButton
            style={{ display: "flex", alignItems: "center", width: "100%" }}
            media=""
            url={`${URL}/images/${imageId}`}
          >
            <PinterestIcon round className="mr-2" size={25} />
            Pinterest
          </PinterestShareButton>
        </DropdownMenuItem>

        {/* Linkedin */}
        <DropdownMenuItem className="text-xs flex items-center gap-2 font-normal cursor-pointer w-full px-2 py-3 transition-all">
          <LinkedinShareButton
            style={{ display: "flex", alignItems: "center", width: "100%" }}
            url={`${URL}/images/${imageId}`}
          >
            <LinkedinIcon round className="mr-2" size={25} />
            Linkedin
          </LinkedinShareButton>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default SocialShareDropdown;
