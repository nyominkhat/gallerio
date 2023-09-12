import { signOut } from "next-auth/react";
import { useRouter } from "next/navigation";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import useSearch from "@/hooks/useSearch";
import useUploadModal from "@/hooks/modal/useUploadModal";

interface AvatarDropdownProps {
  image: string | null;
  userId: string;
  session: any;
}

const AvatarDropdown = ({ image, userId, session }: AvatarDropdownProps) => {
  const router = useRouter();
  const { clearSearch } = useSearch();
  const { onOpen: uploadModalOpen } = useUploadModal();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Avatar className="cursor-pointer">
          <AvatarImage
            src={image ? image : "/black-profile.avif"}
            alt="Avatar"
          />
          <AvatarFallback>Avatar</AvatarFallback>
        </Avatar>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-40">
        <DropdownMenuItem
          onClick={() => {
            clearSearch();
            router.push(`/profile/${userId}`);
          }}
          className="block text-xs font-normal cursor-pointer w-full px-2 py-3 transition-all"
        >
          View profile
        </DropdownMenuItem>

        <DropdownMenuItem
          onClick={() => {
            clearSearch();
            router.push(`/profile/${userId}/setting`);
          }}
          className="block text-xs font-normal cursor-pointer w-full px-2 py-3 transition-all"
        >
          Setting
        </DropdownMenuItem>

        <DropdownMenuSeparator />

        <DropdownMenuItem
          onClick={() => {
            signOut();
          }}
          className="cursor-pointer text-xs font-normal w-full px-2 py-3 transition-all"
        >
          Signout
        </DropdownMenuItem>

        <DropdownMenuSeparator className="md:hidden flex" />

        <DropdownMenuItem
          onClick={() => {
            !session ? router.push("/signin") : uploadModalOpen();
          }}
          className="cursor-pointer text-xs font-normal w-full px-2 py-3 transition-all md:hidden flex"
        >
          Upload image
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default AvatarDropdown;
