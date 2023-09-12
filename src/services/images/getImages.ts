import axios from "axios";

import { getImagesProps } from "@/types/image";

const getImages = async (data: getImagesProps, pageParam: number) => {
  let query = `cursor=${pageParam}&currentUserId=${data.currentUserId}`;

  if (data.search) {
    query += `&search=${data.search}`;
  }

  try {
    const response = await axios.get(`/api/images?${query}`);

    return response.data;
  } catch (error: any) {
    throw new Error(error.response.data.error);
  }
};

export default getImages;
