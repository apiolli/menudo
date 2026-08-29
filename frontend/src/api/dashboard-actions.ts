import { api } from "../lib/api";
import type { DasboardResponse } from "./types/dashboard-response";

export const getDashboardData = async (): Promise<DasboardResponse> => {
  const { data } = await api.get<DasboardResponse>("/api/dashboard");
  return data;
};
