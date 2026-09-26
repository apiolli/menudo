import { menudoApi } from "../../../../api/menudo-api";
import type { User } from "../../../../types/user.interface";

export const loginAction = async (
  email: string,
  password: string,
): Promise<User> => {
  try {
    const { data } = await menudoApi.post<User>("/auth/login", {
      email,
      password,
    });
    return data;
  } catch (error) {
    throw error;
  }
};
