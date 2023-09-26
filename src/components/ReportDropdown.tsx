import React from "react";
import { Loader2, MoreHorizontal } from "lucide-react";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "./ui/button";

import useAddReported from "@/hooks/report/useAddReported";

interface ReportDropdownProps {
  imageId: string;
  userId?: string;
}

const ReportDropdown = ({ imageId, userId }: ReportDropdownProps) => {
  const { mutate, isLoading } = useAddReported();

  const report = () => {
    mutate({
      userId,
      imageId,
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size={"icon"}>
          <MoreHorizontal />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40 z-[66666]">
        <DropdownMenuItem
          onClick={report}
          className="flex items-center text-xs font-normal  text-red-600 focus:text-red-400 cursor-pointer w-full px-2 py-3 transition-all"
        >
          Report
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ReportDropdown;
