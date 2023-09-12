import axios from "axios";

const removeLike = async (likeId: string) => {
  try {
    await axios.delete(`/api/like/${likeId}`);
  } catch (error: any) {
    throw new Error(error.response.data.error);
  }
};

export default removeLike;
