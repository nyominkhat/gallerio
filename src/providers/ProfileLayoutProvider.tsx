"use client";

import { Heart, ImageIcon, Mail, UserCog2 } from "lucide-react";
import Image from "next/image";
import React, { useEffect } from "react";
import { useInView } from "react-intersection-observer";
import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import Link from "next/link";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import ImageUploadButton from "@/components/upload/ImageUploadButton";
import Loading from "@/components/Loading";
import { useToast } from "@/components/ui/use-toast";

import useUser from "@/hooks/user/useUser";
import useUpdateCover from "@/hooks/user/useUpdateCover";

interface LayoutProps {
  children: React.ReactNode;
  userId: string;
}

const ProfileLayoutProvider = ({ children, userId }: LayoutProps) => {
  const { data: session } = useSession();
  const { data, isLoading, refetch } = useUser({ userId });
  const { ref, inView } = useInView();

  const { toast } = useToast();

  const {
    mutate,
    isLoading: mutationIsLoading,
    isError,
    isSuccess,
    error,
  } = useUpdateCover();

  const currentpath = usePathname();

  const onUpload = (value: string) => {
    mutate({
      coverPic: value,
      userId: session?.user.id,
    });
  };

  useEffect(() => {
    if (isSuccess) {
      toast({
        description: "Upload cover photo successfully!",
      });

      refetch();
    }

    if (isError) {
      toast({
        variant: "destructive",
        description: error as string,
      });
    }
  }, [isSuccess, isError, toast, error, refetch]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <section className="min-h-full -mt-8">
      <div ref={ref} className="w-full h-60 relative">
        <figure className="h-full w-full">
          <Image
            key={data.id}
            alt={data.id}
            src={
              data.coverPic
                ? data.coverPic
                : `https://res.cloudinary.com/nyominkhat/image/upload/v1694113151/rkp8keyflpsqki9nygtj.jpg`
            }
            width={"1000"}
            height={"1000"}
            loading="lazy"
            quality={100}
            className={`blur-sm transition-all duration-700 w-full h-full object-cover`}
            onLoadingComplete={(image) => image.classList.remove("blur-sm")}
          />
        </figure>

        {userId === session?.user.id && (
          <ImageUploadButton
            onChange={(value) => onUpload(value)}
            css="absolute right-10 bottom-6"
            text="Change cover"
          />
        )}

        <Avatar className="cursor-pointer w-24 h-24 absolute left-10 -bottom-12 border-2">
          <AvatarImage
            src={data.image ? data.image : "/black-profile.avif"}
            alt="Avatar"
          />
          <AvatarFallback>Avatar</AvatarFallback>
        </Avatar>
      </div>

      <div
        className={`px-12 rounded-sm py-4 mt-12 mb-6 border-b flex md:flex-row flex-col justify-between sticky top-[5rem] bg-white z-40 ${
          !inView ? "items-center gap-4" : "md:items-end items-start gap-4"
        }`}
      >
        <div
          className={`flex gap-2 ${
            inView ? "flex-col" : " flex-row items-center"
          }`}
        >
          <Avatar className={`w-6 h-6 ${inView && "hidden"}`}>
            <AvatarImage
              src={data.image ? data.image : "/black-profile.avif"}
              alt="Avatar"
            />
            <AvatarFallback>Avatar</AvatarFallback>
          </Avatar>
          <p className="text-lg font-semibold">{data.name}</p>
          <p
            className={`text-sm flex items-center gap-1 ${!inView && "hidden"}`}
          >
            <Mail size={18} />
            {data.email}
          </p>
        </div>

        <div className="flex items-center gap-5">
          <Link
            className={`flex text-sm items-center gap-1 text-slate-600 hover:text-slate-900 transition-all ${
              currentpath === `/profile/${userId}` ? "text-slate-900" : ""
            }`}
            href={`/profile/${userId}/`}
          >
            <ImageIcon size={15} />
            Images
          </Link>

          <Link
            className={`flex text-sm items-center gap-1 text-slate-600 hover:text-slate-900 transition-all ${
              currentpath === `/profile/${userId}/likes` ? "text-slate-900" : ""
            }`}
            href={`/profile/${userId}/likes`}
          >
            <Heart
              fill={
                currentpath === `/profile/${userId}/likes` ? "black" : "white"
              }
              size={15}
            />
            Likes
          </Link>

          {data.id === session?.user.id && (
            <Link
              className={`flex text-sm items-center gap-1 text-slate-600 hover:text-slate-900 transition-all ${
                currentpath === `/profile/${userId}/setting`
                  ? "text-slate-900"
                  : ""
              }`}
              href={`/profile/${userId}/setting`}
            >
              <UserCog2 size={15} />
              Edit profile
            </Link>
          )}
        </div>
      </div>

      {children}
    </section>
  );
};

export default ProfileLayoutProvider;
