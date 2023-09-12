import { useInfiniteQuery } from "@tanstack/react-query";

import getUserImages from "@/services/user/getUserImages";

import { getUserImagesProps } from "@/types/image";

const useUserImages = (data: getUserImagesProps) => {
  return useInfiniteQuery(
    ["images", data.userId, data.currentUserId],
    ({ pageParam = "" }) => getUserImages(data, pageParam),
    {
      getNextPageParam: (lastPage) => lastPage.nextId ?? false,
    }
  );
};

export default useUserImages
