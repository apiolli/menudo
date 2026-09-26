import { menudoApi } from "../../../../api/menudo-api";

export const loginAction = async (email: string, password: string) => {
  try {
    const { data } = await menudoApi.post("/auth/login", {
      email,
      password,
    });
    return data;
  } catch (error) {
    throw error;
  }
};
