import { useQuery } from "@tanstack/react-query";

import getUser from "@/services/user/getUser";

import { getUserDataProps } from "@/types/image";

const useUser = (data: getUserDataProps) => {
  return useQuery(["user", data.userId], () => getUser(data));
};

export default useUser;
