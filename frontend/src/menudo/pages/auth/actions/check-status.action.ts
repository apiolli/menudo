import { menudoApi } from "../../../../api/menudo-api";
import type { User } from "../../../../types/user.interface";

export const checkStatusAction = async (): Promise<User> => {
  const token = localStorage.getItem("jwt_token");
  if (!token) throw new Error("Token no encontrado");

  try {
    const { data } = await menudoApi.get<User>("/auth/check-status");
    localStorage.setItem("jwt_token", data.token);
    return data;
  } catch (error) {
    throw new Error("Token invalido o expirado.");
  }
};
