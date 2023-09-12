import axios from "axios";

const deleteImage = async (imageId: string) => {
  try {
    await axios.delete(`/api/images/${imageId}`);
  } catch (error: any) {
    throw new Error(error.response.data.error);
  }
};

export default deleteImage;
