import { useMutation } from "@tanstack/react-query";

import register from "@/services/auth/register";

const useRegister = () => {
  return useMutation(register);
};

export default useRegister;
