import axios from "axios";

import { getImageProps } from "@/types/image";

const getImage = async (data: getImageProps) => {
  try {
    const response = await axios.get(
      `/api/images/${data.imageId}?currentUserId=${data.currentUserId}`
    );

    return response.data;
  } catch (error: any) {
    throw new Error(error.response.data.error);
  }
};

export default getImage;
