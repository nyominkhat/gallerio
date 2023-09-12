import axios from "axios";

import { getUserImagesProps } from "@/types/image";

const getUserImages = async (data: getUserImagesProps, pageParam: number) => {
  let query = `cursor=${pageParam}&currentUserId=${data.currentUserId}`;

  try {
    const response = await axios.get(
      `/api/user/${data.userId}/images?${query}`
    );

    return response.data;
  } catch (error: any) {
    throw new Error(error.response.data.error);
  }
};

export default getUserImages;
