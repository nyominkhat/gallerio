"use client";

import React, { useEffect, useState } from "react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { format } from "date-fns";
import Image from "next/image";
import { CalendarDays, Download, Frame, Heart } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import SocialShareDropdown from "@/components/SocialShareDropdown";
import ReportDropdown from "@/components/ReportDropdown";
import FullScreenImage from "@/components/FullScreenImage";
import LikeButton from "@/components/LikeButton";
import Loading from "@/components/Loading";
import DeleteButton from "@/components/DeleteButton";
import ImageEditButton from "@/components/ImageEditButton";

import useImage from "@/hooks/image/useImage";
import saveImage from "@/hooks/saveImage";
import useLikeStore from "@/hooks/image/likeStore";

import { likeByTypes } from "@/types/image";

interface ImageDetailPageProps {
  params: {
    id: string;
  };
}

const ImageDetailPage = ({ params }: ImageDetailPageProps) => {
  const { data: session } = useSession();
  const router = useRouter();
  const [viewImage, setViewImage] = useState(false);
  const [likeUserCount, setLikeUserCount] = useState(0);
  const { addLike, removeLike } = useLikeStore();

  const { data, isLoading, refetch } = useImage({
    imageId: params.id,
    currentUserId: session?.user.id!,
  });

  useEffect(() => {
    if (data) {
      const likeUsers = data.likeBy.filter(
        (like: likeByTypes) => like.isLiked === true
      );

      setLikeUserCount(likeUsers.length);

      if (data.isLiked) {
        addLike(data.id);
      } else {
        removeLike(data.id);
      }
    }
  }, [data, addLike, removeLike]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <section className="h-full flex flex-col justify-between md:p-6 gap-6 container">
      <div className="flex items-center justify-between">
        <div
          onClick={() => {
            router.push(`/profile/${data.userId}`);
          }}
          className="cursor-pointer flex items-center gap-2 transition-all duration-500"
        >
          <Avatar className="cursor-pointer">
            <AvatarImage
              src={data.user.image ? data.user.image : "/black-profile.avif"}
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
              data={data}
              refetch={refetch}
              css=""
            />
          )}

          <Button size={"icon"} onClick={() => saveImage(data.url, data.tag)}>
            <Download size={18} />
          </Button>
        </div>
      </div>

      {/* image */}
      <figure className="flex items-center justify-center md:h-[70vh] md:min-h-[70vh]">
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
          className={`cursor-zoom-in blur-sm transition-all duration-700 w-auto h-full`}
          onLoadingComplete={(image) => image.classList.remove("blur-sm")}
        />
      </figure>

      <footer className="flex items-baseline justify-between">
        <div className="space-y-3">
          <p className="text-xs text-slate-600 flex items-center gap-1">
            <CalendarDays size={18} />
            Published at {format(new Date(data.createdAt), "PP")}
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
            LikeBy{" "}
            <span className="underline text-slate-800">{likeUserCount}</span>
          </p>
        </div>

        <div className=" flex items-center gap-4">
          {session?.user.id === data.userId && (
            <DeleteButton imageId={data.id} />
          )}

          <SocialShareDropdown imageId={data.id} />

          {data.userId !== session?.user.id && <ReportDropdown imageId={``} />}
        </div>
      </footer>

      {/* view image */}
      {viewImage ? (
        <FullScreenImage
          viewImage={viewImage}
          setViewImage={setViewImage}
          alt={data.id}
          src={data.url}
        />
      ) : null}
    </section>
  );
};

export default ImageDetailPage;
