import axios from "axios";

import { EditUserProps } from "@/types/user";

const editUser = async (data: EditUserProps) => {
  try {
    await axios.patch(`/api/user/${data.userId}/edit`, {
      ...data,
    });
  } catch (error: any) {
    throw new Error(error.response.data.error);
  }
};

export default editUser;
