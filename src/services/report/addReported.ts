import axios from "axios";

import { addReportedTypes } from "@/types/image";

const addReported = async (data: addReportedTypes) => {
  try {
    await axios.post("/api/report", {
      ...data,
    });
  } catch (error: any) {
    throw new Error(error.response.data);
  }
};

export default addReported;
