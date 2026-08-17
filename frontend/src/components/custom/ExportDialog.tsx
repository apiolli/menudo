import { useContext, useState } from "react";
import { formatos } from "../../data/finance-store";
import { MenudoContext } from "../../context/MenudoContext";
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
import { Switch } from "../ui/switch";

interface Props {
  desde?: string;
  hasta?: string;
}

export const ExportDialog = ({
  desde: desdeInicial,
  hasta: hastaInicial,
}: Props) => {
  const { gastos, categorias, metodos } = useContext(MenudoContext);
  const [open, setOpen] = useState(false);
  const [formato, setFormato] =
    useState<(typeof formatos)[number]["id"]>("pdf");
  const [desde, setDesde] = useState(
    desdeInicial ?? new Date().toISOString().slice(0, 8) + "01",
  );
  const [hasta, setHasta] = useState(
    hastaInicial ?? new Date().toISOString().slice(0, 10),
  );
  const [incluirGraficos, setIncluirGraficos] = useState(true);
  const [incluirDetalle, setIncluirDetalle] = useState(true);
  const [exporting, setExporting] = useState(false);

  const exportar = () => {
    if (desde > hasta) {
      toast.error("El rango de fechas es inválido");
      return;
    }
    setExporting(true);
    const filas = gastos.filter((g) => g.fecha >= desde && g.fecha <= hasta);

    setTimeout(() => {
      if (formato === "csv") {
        const head = "fecha,descripcion,categoria,metodo_pago,monto";
        const body = filas
          .map((g) =>
            [
              g.fecha,
              `"${g.descripcion.replace(/"/g, "'")}"`,
              categorias.find((c) => c.id === g.categoriaId)?.nombre ?? "",
              metodos.find((m) => m.id === g.metodoPagoId)?.nombre ?? "",
              g.monto.toFixed(2),
            ].join(","),
          )
          .join("\n");
        const url = URL.createObjectURL(
          new Blob([`${head}\n${body}`], { type: "text/csv;charset=utf-8" }),
        );
        const a = document.createElement("a");
        a.href = url;
        a.download = `gastos_${desde}_${hasta}.csv`;
        a.click();
        URL.revokeObjectURL(url);
      }
      setExporting(false);
      setOpen(false);
      toast.success(`Reporte ${formato.toUpperCase()} generado`, {
        description: `${filas.length} movimientos entre ${desde} y ${hasta}.`,
      });
    }, 900);
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
            Elegí el formato y el rango de fechas a incluir.
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-3 sm:grid-cols-3">
          {formatos.map((f) => (
            <button
              key={f.id}
              type="button"
              onClick={() => setFormato(f.id)}
              className={cn(
                "rounded-xl border border-border p-4 text-left transition-colors hover:bg-secondary",
                formato === f.id &&
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
            <Label htmlFor="exp-desde">Desde</Label>
            <Input
              id="exp-desde"
              type="date"
              value={desde}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setDesde(e.target.value)
              }
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="exp-hasta">Hasta</Label>
            <Input
              id="exp-hasta"
              type="date"
              value={hasta}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                setHasta(e.target.value)
              }
            />
          </div>
        </div>

        <div className="space-y-3 rounded-xl bg-muted/60 p-4">
          <div className="flex items-center justify-between">
            <Label htmlFor="graf" className="font-normal">
              Incluir gráficos
            </Label>
            <Switch
              id="graf"
              checked={incluirGraficos}
              onCheckedChange={setIncluirGraficos}
            />
          </div>
          <div className="flex items-center justify-between">
            <Label htmlFor="det" className="font-normal">
              Incluir tabla de detalle
            </Label>
            <Switch
              id="det"
              checked={incluirDetalle}
              onCheckedChange={setIncluirDetalle}
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => setOpen(false)}>
            Cancelar
          </Button>
          <Button onClick={exportar} disabled={exporting} className="gap-2">
            <Download className="size-4" />
            {exporting ? "Generando…" : "Exportar"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};
