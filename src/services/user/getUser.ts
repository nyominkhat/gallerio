import axios from "axios";

import { getUserDataProps } from "@/types/image";

const getUser = async (data: getUserDataProps) => {
  try {
    const response = await axios.get(`/api/user/${data.userId}`);

    return response.data;
  } catch (error: any) {
    throw new Error(error.response.data.error);
  }
};

export default getUser;
