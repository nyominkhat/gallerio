import { useMutation } from "@tanstack/react-query";

import addReported from "@/services/report/addReported";

const useAddReported = () => {
  return useMutation(addReported);
};

export default useAddReported;
