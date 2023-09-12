import { useMutation } from "@tanstack/react-query";

import editUser from "@/services/user/editUser";

const useEditUser = () => {
  return useMutation(editUser);
};

export default useEditUser;
