"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { CalendarDays, Download, Frame, Heart } from "lucide-react";
import { format } from "date-fns";
import { useSession } from "next-auth/react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import FullScreenImage from "@/components/FullScreenImage";
import { Button } from "@/components/ui/button";
import ReportDropdown from "@/components/ReportDropdown";
import SocialShareDropdown from "@/components/SocialShareDropdown";
import LikeButton from "@/components/LikeButton";
import Loading from "@/components/Loading";
import DeleteButton from "@/components/DeleteButton";
import ImageEditButton from "@/components/ImageEditButton";

import useImage from "@/hooks/image/useImage";
import saveImage from "@/hooks/saveImage";

import { likeByTypes } from "@/types/image";

interface ImageModalPageProps {
  params: {
    id: string;
  };
}

const ImageModal = ({ params }: ImageModalPageProps) => {
  const [isOpen, setIsOpen] = useState(true);
  const [viewImage, setViewImage] = useState(false);
  const [likeUserCount, setLikeUserCount] = useState(0);
  const { data: session } = useSession();

  const router = useRouter();

  const {
    data,
    isLoading: imageLoading,
    refetch,
  } = useImage({
    imageId: params.id,
    currentUserId: session?.user.id!,
  });

  const handleOnOpenChange = () => {
    if (isOpen) {
      setIsOpen(false);
      router.back();
    }
  };

  // stop scrolling body
  useEffect(() => {
    if (isOpen) {
      document.body.classList.add("overflow-hidden");
    } else {
      document.body.classList.remove("overflow-hidden");
    }

    return () => {
      document.body.classList.remove("overflow-hidden");
    };
  }, [isOpen]);

  useEffect(() => {
    if (data) {
      const likeUsers = data.likeBy.filter(
        (like: likeByTypes) => like.isLiked === true
      );

      setLikeUserCount(likeUsers.length);
    }
  }, [data]);

  if (imageLoading) {
    return <Loading />;
  }

  return (
    <article
      onClick={handleOnOpenChange}
      className={`fixed cursor-zoom-out bg-foreground/20 text-black inset-0 z-[55555] ${
        viewImage ? "overflow-hidden" : "overflow-auto"
      }`}
    >
      {/* modal box */}
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full lg:px-40 lg:pt-20 lg:pb-24 relative pointer-events-none cursor-auto min-h-full flex flex-col justify-between"
      >
        <div className="pointer-events-auto w-full mx-auto my-auto bg-white rounded-sm space-y-10">
          {/* header */}
          <header className="p-6 flex items-center justify-between sticky top-0 left-0 bg-inherit rounded-t-sm z-50">
            <div
              onClick={(e) => {
                e.stopPropagation();
                router.push(`/profile/${data.userId}`);
                window.location.reload();
                return null;
              }}
              className="cursor-pointer flex items-center gap-2 transition-all duration-500"
            >
              <Avatar className="cursor-pointer">
                <AvatarImage
                  src={
                    data.user.image ? data.user.image : "/black-profile.avif"
                  }
                  alt="Avatar"
                />
                <AvatarFallback>Avatar</AvatarFallback>
              </Avatar>

              <p className="text-sm text-slate-800">{data.user.name}</p>
            </div>

            <div className="flex items-center gap-4">
              {data.userId === session?.user.id ? (
                <ImageEditButton />
              ) : (
                <LikeButton
                  imageId={data.id}
                  css=""
                  data={data}
                  refetch={refetch}
                />
              )}

              <Button
                size={"icon"}
                onClick={() => saveImage(data.url, data.tag)}
              >
                <Download size={18} />
              </Button>
            </div>
          </header>

          {/* image */}
          <figure className="md:h-[70vh] md:min-h-[70vh] h-[60vh] min-h-[60vh] flex items-center justify-center">
            <Image
              onClick={() => {
                setViewImage(true);
              }}
              key={data.id}
              alt={data.id}
              src={data.url}
              width={"1000"}
              height={"1000"}
              loading="lazy"
              quality={100}
              className={`cursor-zoom-in blur-sm transition-all duration-700 md:w-auto md:h-full w-full h-auto`}
              onLoadingComplete={(image) => image.classList.remove("blur-sm")}
            />
          </figure>

          {/* footer */}
          <footer className="p-6 flex items-baseline justify-between">
            <div className="space-y-3">
              <p className="text-xs text-slate-600 flex items-center gap-1">
                <CalendarDays size={18} />
                Published at {format(new Date(data.updatedAt), "PP")}
              </p>

              <p className="text-xs text-slate-600 flex items-center gap-1">
                <Frame size={18} />
                {data.tag || "_"}
              </p>

              <p className="text-xs text-slate-600 flex items-center gap-1">
                <Heart
                  size={18}
                  fill={data.isLiked ? "#ef4444" : "white"}
                  stroke={data.isLiked ? "#ef4444" : "black"}
                />
                Like By{" "}
                <span className="underline text-slate-800">
                  {likeUserCount}
                </span>
              </p>
            </div>

            {/* delete & share & report btns */}
            <div className="flex items-center gap-4">
              {session?.user.id === data.userId && (
                <DeleteButton imageId={data.id} />
              )}

              <SocialShareDropdown imageId={data.id} />

              {data.userId !== session?.user.id && (
                <ReportDropdown imageId={``} />
              )}
            </div>
          </footer>
        </div>
      </div>

      {/* view image */}
      {viewImage ? (
        <FullScreenImage
          viewImage={viewImage}
          setViewImage={setViewImage}
          alt={data.id}
          src={data.url}
        />
      ) : null}
    </article>
  );
};

export default ImageModal;
