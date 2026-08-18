import { EmptyState } from "../../../../components/common/EmptyState";
import { Button } from "../../../../components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../../../../components/ui/table";
import { Pencil, Trash2 } from "lucide-react";
import {
  formatDate,
  currencyExact,
  type Gasto,
  type Categoria,
  type MetodoPago,
} from "../../../../data/finance-types";
import { ExpensesPagination } from "./ExpensesPagination";
import { Badge } from "../../../../components/ui/badge";
import type { SetStateAction } from "react";

interface Props {
  filtrados: Gasto[];
  hayFiltros: string | true;
  visibles: Gasto[];
  categorias: Categoria[];
  metodos: MetodoPago[];
  onNuevo: () => void;
  limpiar: () => void;
  onEditar: (g: Gasto) => void;
  setToDelete: React.Dispatch<SetStateAction<Gasto | null>>;
  current: number;
  pages: number;
  setPage: React.Dispatch<SetStateAction<number>>;
}

export const ExpensesTable = ({
  filtrados,
  hayFiltros,
  visibles,
  categorias,
  metodos,
  onNuevo,
  limpiar,
  onEditar,
  setToDelete,
  current,
  pages,
  setPage,
}: Props) => {
  return (
    <>
      {filtrados.length === 0 ? (
        <EmptyState
          title={hayFiltros ? "Sin resultados" : "Aún no cargaste gastos"}
          description={
            hayFiltros
              ? "Probá ajustando los filtros o el término de búsqueda."
              : "Registrá tu primer gasto para verlo acá."
          }
          action={
            hayFiltros ? (
              <Button variant="outline" onClick={limpiar}>
                Limpiar filtros
              </Button>
            ) : (
              <Button onClick={onNuevo}>Registrar gasto</Button>
            )
          }
        />
      ) : (
        <section className="surface overflow-hidden">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Fecha</TableHead>
                  <TableHead>Descripción</TableHead>
                  <TableHead>Categoría</TableHead>
                  <TableHead>Método</TableHead>
                  <TableHead className="text-right">Monto</TableHead>
                  <TableHead className="w-24 text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {visibles.map((g) => {
                  const c = categorias.find((x) => x.id === g.categoriaId);
                  const m = metodos.find((x) => x.id === g.metodoPagoId);
                  return (
                    <TableRow key={g.id}>
                      <TableCell className="num whitespace-nowrap text-sm text-muted-foreground">
                        {formatDate(g.fecha)}
                      </TableCell>
                      <TableCell className="max-w-60 truncate font-medium">
                        {g.descripcion}
                      </TableCell>
                      <TableCell>
                        <span className="inline-flex items-center gap-2 text-sm">
                          <span
                            className="size-2.5 rounded-full"
                            style={{ backgroundColor: c?.color }}
                          />
                          {c?.nombre ?? "—"}
                        </span>
                      </TableCell>
                      <TableCell>
                        <Badge variant="secondary">{m?.nombre ?? "—"}</Badge>
                      </TableCell>
                      <TableCell className="num text-right font-semibold">
                        {currencyExact(g.monto)}
                      </TableCell>
                      <TableCell className="text-right">
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => onEditar(g)}
                          aria-label="Editar"
                        >
                          <Pencil className="size-4" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="text-destructive hover:text-destructive"
                          onClick={() => setToDelete(g)}
                          aria-label="Eliminar"
                        >
                          <Trash2 className="size-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          </div>

          {/* Paginación */}
          <ExpensesPagination
            current={current}
            pages={pages}
            setPage={setPage}
          />
        </section>
      )}
    </>
  );
};
