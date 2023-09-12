import axios from "axios";

import { imageUploadProps } from "@/types/image";

const imageUpload = async (data: imageUploadProps) => {
  try {
    await axios.post("/api/upload", {
      ...data,
    });
  } catch (error: any) {
    throw new Error(error.response.data.error);
  }
};

export default imageUpload;
