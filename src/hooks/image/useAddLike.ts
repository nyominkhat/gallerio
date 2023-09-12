import { useMutation } from "@tanstack/react-query";

import addLike from "@/services/images/addLike";

const useAddLike = () => {
  return useMutation(addLike);
};

export default useAddLike;
