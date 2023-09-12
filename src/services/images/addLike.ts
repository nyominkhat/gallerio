import { likeCreateTypes } from "@/types/image";
import axios from "axios";

const like = async (data: likeCreateTypes) => {
  try {
    await axios.post("/api/like", {
      ...data,
    });
  } catch (error: any) {
    throw new Error(error.response.data.error);
  }
};

export default like;
