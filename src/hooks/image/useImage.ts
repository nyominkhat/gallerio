import { useQuery } from "@tanstack/react-query";

import getImage from "@/services/images/getImage";

import { getImageProps } from "@/types/image";

const useImage = (data: getImageProps) => {
  return useQuery(["image", data.currentUserId, data.imageId], () =>
    getImage(data)
  );
};

export default useImage;
