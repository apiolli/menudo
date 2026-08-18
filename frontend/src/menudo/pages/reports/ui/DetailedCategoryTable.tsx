import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../../components/ui/table";
import { currencyExact } from "../../../../data/finance-types";
import { Progress } from "../../../../components/ui/progress";

interface Props {
  porCategoria: {
    name: string;
    color: string;
    value: number;
    cantidad: number;
  }[];
  total: number;
}

export const DetailedCategoryTable = ({ porCategoria, total }: Props) => {
  return (
    <section className="surface overflow-hidden">
      <header className="border-b border-border px-5 py-4">
        <h2 className="text-base font-semibold">Detalle por categoría</h2>
        <p className="text-xs text-muted-foreground">
          Participación sobre el total del período
        </p>
      </header>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Categoría</TableHead>
              <TableHead className="text-right">Gastos</TableHead>
              <TableHead className="text-right">Total</TableHead>
              <TableHead className="w-55">Participación</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {porCategoria.map((c) => (
              <TableRow key={c.name}>
                <TableCell>
                  <span className="inline-flex items-center gap-2 font-medium">
                    <span
                      className="size-2.5 rounded-full"
                      style={{ backgroundColor: c.color }}
                    />
                    {c.name}
                  </span>
                </TableCell>
                <TableCell className="num text-right">{c.cantidad}</TableCell>
                <TableCell className="num text-right font-semibold">
                  {currencyExact(c.value)}
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-3">
                    <Progress value={(c.value / total) * 100} className="h-2" />
                    <span className="num w-12 text-right text-xs text-muted-foreground">
                      {((c.value / total) * 100).toFixed(1)}%
                    </span>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </section>
  );
};
