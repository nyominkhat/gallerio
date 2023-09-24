import React, { useEffect, useState } from "react";
import { Download } from "lucide-react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useSession } from "next-auth/react";

import LikeButton from "./LikeButton";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "./ui/button";
import ImageEditButton from "./ImageEditButton";

import saveImage from "@/hooks/saveImage";
import useLikeStore from "@/hooks/image/likeStore";

import { imageTypes } from "@/types/image";

const ImageCard = ({
  data,
  refetch,
}: {
  data: imageTypes;
  refetch: () => void;
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const { addLike, removeLike } = useLikeStore();
  const { data: session } = useSession();

  const router = useRouter();

  const handleOpenModal = () => {
    router.push(`/images/${data.id}`);
  };

  useEffect(() => {
    if (data.isLiked) {
      addLike(data.id);
    } else {
      removeLike(data.id);
    }
  }, [addLike, removeLike, data]);

  return (
    <figure
      className="h-auto group w-full my-6 overflow-hidden relative"
      key={data.id}
    >
      <Image
        alt={data.id}
        src={data.url}
        width={"600"}
        height={"600"}
        className={`
              ease-in-out w-full h-auto transition-all duration-75 
              ${
                isLoading
                  ? "scale-105 blur-lg grayscale"
                  : "scale-100 blur-0 grayscale-0"
              })`}
        onLoadingComplete={() => setIsLoading(false)}
      />

      <div
        onClick={handleOpenModal}
        className="absolute top-0 left-0 right-0 bottom-0 cursor-zoom-in group-hover:bg-black/10 transition-all"
      >
        <div
          onClick={(e) => {
            e.stopPropagation();
            router.push(`/profile/${data.userId}`);
          }}
          className="absolute cursor-pointer flex items-center gap-2 bottom-4 left-4 group-hover:opacity-100 opacity-0 transition-all duration-500"
        >
          <Avatar>
            <AvatarImage
              src={data.user.image ? data.user.image : "/black-profile.avif"}
              alt="Avatar"
            />
            <AvatarFallback>Avatar</AvatarFallback>
          </Avatar>

          <p className="text-white text-xs">{data.user.name}</p>
        </div>

        {data.userId === session?.user.id ? (
          <ImageEditButton css="absolute top-4 right-4 group-hover:opacity-100 opacity-0 transition-all duration-500" />
        ) : (
          <LikeButton
            imageId={data.id}
            data={data}
            refetch={refetch}
            css="absolute top-4 right-4 group-hover:opacity-100 opacity-0 transition-all duration-500"
          />
        )}

        <Button
          variant={"secondary"}
          className="absolute right-4 bottom-4 group-hover:opacity-100 opacity-0 transition-all duration-500"
          onClick={(e) => {
            e.stopPropagation();

            saveImage(data.url, data.tag);
          }}
        >
          <Download />
        </Button>
      </div>
    </figure>
  );
};

export default ImageCard;
