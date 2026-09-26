import { menudoApi } from "../../../../api/menudo-api";
import type { DasboardResponse } from "../types/dashboard-response";

export const getDashboardAction = async (): Promise<DasboardResponse> => {
  try {
    const { data } = await menudoApi.get<DasboardResponse>("/dashboard");
    return data;
  } catch (error) {
    throw error;
  }
};
