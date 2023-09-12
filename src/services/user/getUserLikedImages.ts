import axios from "axios";

import { getUserLikedImagesProps } from "@/types/image";

const getUserLikedImages = async (
  data: getUserLikedImagesProps,
  pageParam: number
) => {
  let query = `cursor=${pageParam}&currentUserId=${data.currentUserId}`;

  try {
    const response = await axios.get(`/api/user/${data.userId}/likes?${query}`);

    return response.data;
  } catch (error: any) {
    throw new Error(error.response.data.error);
  }
};

export default getUserLikedImages;
