import { apiClient } from "../lib/api";

export interface ImportResult {
  successCount: number;
  failureCount: number;
  errors: string[];
}

export const importService = {
  async downloadTemplate(): Promise<void> {
    const blob = await apiClient<Blob>("/api/import/template", {
      method: "GET",
      responseType: "blob",
    });

    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "gastos_template.xlsx";
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  },

  async uploadFile(file: File): Promise<ImportResult> {
    const formData = new FormData();
    formData.append("file", file);

    return await apiClient<ImportResult>("/api/import", {
      method: "POST",
      body: formData,
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
  },
};
