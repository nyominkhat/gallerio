import { useMutation } from "@tanstack/react-query";

import imageUpload from "@/services/fileUpload/imageUpload";

const useImageUpload = () => {
  return useMutation(imageUpload);
};

export default useImageUpload;
