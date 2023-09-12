import { useMutation } from "@tanstack/react-query";

import deleteImage from "@/services/images/deleteImage";

const useDeleteImage = () => {
  return useMutation(deleteImage);
};

export default useDeleteImage;
