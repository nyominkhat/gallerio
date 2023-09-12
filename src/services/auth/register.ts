import axios from "axios";
import { signIn } from "next-auth/react";

import { RegisterProps } from "@/types/auth";

const register = async (data: RegisterProps) => {
  try {
    const response = await axios.post("/api/auth/register", {
      ...data,
    });

    if (response.status === 200) {
      await signIn("credentials", {
        email: data.email,
        password: data.password,
      });
    }
  } catch (error: any) {
    throw new Error(error.response.data.error);
  }
};

export default register;
