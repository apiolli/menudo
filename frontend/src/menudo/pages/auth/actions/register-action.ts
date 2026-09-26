import { menudoApi } from "../../../../api/menudo-api";
import type { User } from "../../../../types/user.interface";

export const registerAction = async (
  name: string,
  email: string,
  password: string,
): Promise<User> => {
  try {
    const { data } = await menudoApi.post<User>("/auth/register", {
      name,
      email,
      password,
    });

    return data;
  } catch (error) {
    throw error;
  }
};
