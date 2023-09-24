import React from "react";
import { MoreHorizontal } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "./ui/button";

interface ReportDropdownProps {
  imageId: string;
}

const ReportDropdown = ({ imageId }: ReportDropdownProps) => {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size={"icon"}>
          <MoreHorizontal />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40 z-[66666]">
        <DropdownMenuItem
          onClick={() => {
            // router.push("/setting");
            console.log("report");
          }}
          className="block text-xs font-normal text-red-600 focus:text-red-400 cursor-pointer w-full px-2 py-3 transition-all"
        >
          Report
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ReportDropdown;
