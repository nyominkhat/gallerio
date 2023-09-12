import { useInfiniteQuery } from "@tanstack/react-query";

import getUserLikedImages from "@/services/user/getUserLikedImages";

import { getUserLikedImagesProps } from "@/types/image";

const useUserLikedImages = (data: getUserLikedImagesProps) => {
  return useInfiniteQuery(
    ["liked-images", data.userId, data.currentUserId],
    ({ pageParam = "" }) => getUserLikedImages(data, pageParam),
    {
      getNextPageParam: (lastPage) => lastPage.nextId ?? false,
    }
  );
};

export default useUserLikedImages;
