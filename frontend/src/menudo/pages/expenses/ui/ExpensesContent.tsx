import { useContext, useMemo, useState } from "react";
import { type Gasto } from "../../../../data/finance-types";
import { MenudoContext } from "../../../../context/MenudoContext";
import { toast } from "sonner";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../../../../components/ui/alert-dialog";
import { ResultsSummary } from "./ResultsSummary";
import { ExpensesFilter } from "./ExpensesFilter";
import { ExpensesTable } from "./ExpensesTable";

interface Props {
  onNuevo: () => void;
  onEditar: (g: Gasto) => void;
}

const PAGE_SIZE = 8;

export const ExpensesContent = ({ onNuevo, onEditar }: Props) => {
  const { gastos, categorias, metodos, deleteGasto } =
    useContext(MenudoContext);
  const [q, setQ] = useState("");
  const [cat, setCat] = useState("todas");
  const [met, setMet] = useState("todos");
  const [desde, setDesde] = useState("");
  const [hasta, setHasta] = useState("");
  const [page, setPage] = useState(1);
  const [toDelete, setToDelete] = useState<Gasto | null>(null);

  const filtrados = useMemo(() => {
    const term = q.trim().toLowerCase();
    return gastos.filter((g) => {
      if (term && !g.descripcion.toLowerCase().includes(term)) return false;
      if (cat !== "todas" && g.categoriaId !== cat) return false;
      if (met !== "todos" && g.metodoPagoId !== met) return false;
      if (desde && g.fecha < desde) return false;
      if (hasta && g.fecha > hasta) return false;
      return true;
    });
  }, [gastos, q, cat, met, desde, hasta]);

  const total = filtrados.reduce((s, g) => s + g.monto, 0);
  const pages = Math.max(1, Math.ceil(filtrados.length / PAGE_SIZE));
  const current = Math.min(page, pages);
  const visibles = filtrados.slice(
    (current - 1) * PAGE_SIZE,
    current * PAGE_SIZE,
  );
  const hayFiltros = q || cat !== "todas" || met !== "todos" || desde || hasta;

  const limpiar = () => {
    setQ("");
    setCat("todas");
    setMet("todos");
    setDesde("");
    setHasta("");
    setPage(1);
  };

  return (
    <div className="space-y-5">
      {/* Filtros: búsqueda, categoría, método y rango de fechas */}
      <ExpensesFilter
        q={q}
        cat={cat}
        met={met}
        setQ={setQ}
        setPage={setPage}
        setCat={setCat}
        categorias={categorias}
        setMet={setMet}
        metodos={metodos}
        setDesde={setDesde}
        setHasta={setHasta}
        desde={desde}
        hasta={hasta}
      />

      {/* Resumen de resultados + limpiar filtros */}
      <ResultsSummary
        total={total}
        hayFiltros={hayFiltros}
        limpiar={limpiar}
        filtrados={filtrados}
      />

      {/* Estado vacío / Tabla de gastos con paginación */}
      <ExpensesTable
        filtrados={filtrados}
        hayFiltros={hayFiltros}
        visibles={visibles}
        categorias={categorias}
        metodos={metodos}
        onNuevo={onNuevo}
        limpiar={limpiar}
        onEditar={onEditar}
        setToDelete={setToDelete}
        current={current}
        pages={pages}
        setPage={setPage}
      />

      {/* Confirmación de eliminación */}
      <AlertDialog
        open={!!toDelete}
        onOpenChange={(v) => !v && setToDelete(null)}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>¿Eliminar este gasto?</AlertDialogTitle>
            <AlertDialogDescription>
              Se eliminará “{toDelete?.descripcion}” de forma permanente. Esta
              acción no se puede deshacer.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => {
                if (toDelete) deleteGasto(toDelete.id);
                setToDelete(null);
                toast.success("Gasto eliminado");
              }}
            >
              Eliminar
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};
