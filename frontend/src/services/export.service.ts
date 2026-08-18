export type ExportFormat = "Excel" | "Json" | "Txt";

export const exportService = {
  async download(format: ExportFormat, filters?: any) {
    // Construimos los query params basados en los filtros que tengas
    const params = new URLSearchParams({ format, ...filters });

    const response = await fetch(`/api/expenses/export?${params.toString()}`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("jwt_token")}`,
      },
    });

    if (!response.ok) throw new Error("Error al exportar los datos");

    const blob = await response.blob();
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;

    // El nombre del archivo suele venir en el Content-Disposition,
    // pero aquí lo forzamos según el formato
    a.download = `gastos_export.${format.toLowerCase()}`;
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  },
};
