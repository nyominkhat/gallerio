import React from "react";
import Link from "next/link";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import AvatarDropdown from "./AvatarDropdown";
import SearchInput from "./Search";

import useUploadModal from "@/hooks/modal/useUploadModal";
import useSearch from "@/hooks/useSearch";
import { LogIn } from "lucide-react";

const Navbar = () => {
  const { data: session } = useSession();
  const { onOpen: uploadModalOpen } = useUploadModal();
  const router = useRouter();
  const { clearSearch } = useSearch();

  return (
    <header className="fixed z-50 top-0 left-0 right-0 shadow-md bg-background">
      <nav className="h-20 flex justify-between container items-center min-h-[5rem] z-[1000]">
        <div className="flex items-center gap-1 md:gap-5">
          <figure
            onClick={() => {
              router.push("/");
              clearSearch();
            }}
            className="cursor-pointer w-8 h-8 min-w-[2rem] min-h-[2rem]"
          >
            <img src="/logo.png" alt="Logo" className=" w-full h-full" />
          </figure>

          {/* search bar */}
          <SearchInput />
        </div>

        <div className="flex items-center gap-2">
          <Button
            className="hidden md:block"
            onClick={() => {
              !session ? router.push("/signin") : uploadModalOpen();
            }}
            variant={"outline"}
          >
            Upload image
          </Button>

          {session ? (
            <div className="flex items-center gap-3">
              <AvatarDropdown
                image={session.user.image!}
                userId={session.user.id}
                session={session}
              />
            </div>
          ) : (
            <Link href={"/signin"}>
              <Button className="flex items-center gap-1" variant={"outline"}>
                <LogIn size={15} />
                <span className=" md:block hidden">Sign in</span>
              </Button>
            </Link>
          )}
        </div>
      </nav>
    </header>
  );
};

export default Navbar;
