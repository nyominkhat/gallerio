import { useInfiniteQuery } from "@tanstack/react-query";

import getImages from "@/services/images/getImages";

import { getImagesProps } from "@/types/image";

const useImages = (data: getImagesProps) => {
  return useInfiniteQuery(
    ["images", data.search, data.currentUserId],
    ({ pageParam = "" }) => getImages(data, pageParam),
    {
      getNextPageParam: (lastPage) => lastPage.nextId ?? false,
    }
  );
};

export default useImages;
