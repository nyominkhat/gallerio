import { useMutation } from "@tanstack/react-query";

import removeLike from "@/services/images/removeLike";

const useRemoveLike = () => {
  return useMutation(removeLike);
};

export default useRemoveLike;
