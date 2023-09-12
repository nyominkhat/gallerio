import axios from "axios";

import { UpdateCoverProps } from "@/types/user";

const updateCover = async (data: UpdateCoverProps) => {
  try {
    await axios.post(`/api/user/${data.userId}/edit/cover`, {
      ...data,
    });
  } catch (error: any) {
    throw new Error(error.response.data.error);
  }
};

export default updateCover;
