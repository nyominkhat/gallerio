import { useMutation } from "@tanstack/react-query";

import updateCover from "@/services/user/updateCover";

const useUpdateCover = () => {
  return useMutation(updateCover);
};

export default useUpdateCover;
