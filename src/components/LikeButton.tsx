import React, { useEffect, useState } from "react";
import { Heart } from "lucide-react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";

import { Button } from "./ui/button";

import useAddLike from "@/hooks/image/useAddLike";
import useLikeStore from "@/hooks/image/likeStore";

import { imageTypes } from "@/types/image";

interface LikeButtonProps {
  imageId: string;
  css: string;
  data: imageTypes;
  refetch: () => void;
}

const LikeButton = ({ imageId, css, data, refetch }: LikeButtonProps) => {
  const { addLike, removeLike, likedImages } = useLikeStore();

  const { data: session } = useSession();
  const router = useRouter();

  const isLiked = likedImages.includes(data.id);

  const {
    mutate: addMutation,
    isSuccess: addedSuccess,
    isLoading: addedLoading,
  } = useAddLike();

  const [debounceTimer, setDebounceTimer] = useState<
    NodeJS.Timeout | undefined
  >(undefined);

  const handleLike = () => {
    if (session) {
      if (isLiked === false) {
        addLike(imageId);
      } else {
        removeLike(imageId);
      }

      addMutation({
        userId: session.user.id,
        imageId: imageId,
      });
    } else {
      router.push("/signin");
      return null;
    }
  };

  useEffect(() => {
    if (addedSuccess) {
      refetch();
    }
  }, [addedSuccess, refetch]);

  return (
    <Button
      variant={isLiked ? "destructive" : "secondary"}
      onClick={(e) => {
        e.stopPropagation();

        handleLike();
      }}
      disabled={addedLoading}
      className={`${css} duration-75`}
    >
      <Heart size={18} fill="white" />
    </Button>
  );
};

export default LikeButton;
