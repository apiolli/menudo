import { useState } from "react";
import { formatos } from "../../data/finance-store";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "../ui/dialog";
import { Download } from "lucide-react";
import { toast } from "sonner";
import { cn } from "../../lib/utils";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { Input } from "../ui/input";

interface Props {
  fromDate?: string;
  toDate?: string;
}

export const ExportDialog = ({
  fromDate: initialFromDate,
  toDate: initialToDate,
}: Props) => {
  const [open, setOpen] = useState(false);
  const [exportFormat, setExportFormat] =
    useState<(typeof formatos)[number]["id"]>("excel");
  const [fromDate, setFromDate] = useState(
    initialFromDate ?? new Date().toISOString().slice(0, 8) + "01",
  );
  const [toDate, setToDate] = useState(
    initialToDate ?? new Date().toISOString().slice(0, 10),
  );
  const [exporting, setExporting] = useState(false);

  const exportData = async () => {
    if (fromDate > toDate) {
      toast.error("El rango de fechas es invÃ¡lido");
      return;
    }
    setExporting(true);

    try {
      const params = new URLSearchParams();
      params.append("FromTheDate", fromDate);
      params.append("ToTheDate", toDate);
      params.append("format", exportFormat);

      const res = await fetch(
        `https://localhost:7254/api/expenses/export?${params.toString()}`,
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        },
      );

      if (!res.ok) throw new Error("Error al exportData");

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `gastos_${fromDate}_${toDate}.${exportFormat === "excel" ? "xlsx" : exportFormat}`;
      a.click();
      URL.revokeObjectURL(url);

      toast.success(`Reporte ${exportFormat.toUpperCase()} generado`);
      setOpen(false);
    } catch (error) {
      toast.error("Error al generar el reporte");
    } finally {
      setExporting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Button variant="outline" className="gap-2">
          <Download className="size-4" /> Exportar
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>Exportar reporte</DialogTitle>
          <DialogDescription>
            ElegÃ­ el exportFormat y el rango de fechas a incluir.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-3 sm:grid-cols-3">
          {formatos.map((f) => (
            <button
              key={f.id}
              type="button"
              onClick={() => setExportFormat(f.id)}
              className={cn(
                "rounded-xl border border-border p-4 text-left transition-colors hover:bg-secondary",
                exportFormat === f.id &&
                  "border-primary bg-secondary ring-2 ring-primary/25",
              )}
            >
              <f.icon className="size-5 text-primary" />
              <p className="mt-2 text-sm font-semibold">{f.label}</p>
              <p className="text-xs text-muted-foreground">{f.desc}</p>
            </button>
          ))}
        </div>

        <div className="grid gap-4 sm:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="exp-fromDate">Desde</Label>
            <Input
              id="exp-fromDate"
              type="date"
              value={fromDate}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setFromDate(e.target.value)
              }
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="exp-toDate">Hasta</Label>
            <Input
              id="exp-toDate"
              type="date"
              value={toDate}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setToDate(e.target.value)
              }
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancelar
          </Button>
          <Button onClick={exportData} disabled={exporting} className="gap-2">
            <Download className="size-4" />
            {exporting ? "Generandoâ€¦" : "Exportar"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
