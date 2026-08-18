import React from "react";
import { Label } from "../../../../components/ui/label";
import { Input } from "../../../../components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../../components/ui/select";
import type { Categoria } from "../../../../data/finance-types";

interface Props {
  desde: string;
  hasta: string;
  cat: string;
  setCat: React.Dispatch<React.SetStateAction<string>>;
  setDesde: (v: string) => void;
  setHasta: (v: string) => void;
  categorias: Categoria[];
}

export const ReportsFilter = ({
  desde,
  hasta,
  cat,
  setCat,
  setDesde,
  setHasta,
  categorias,
}: Props) => {
  const handleSelect = (value: string | null) => {
    setCat(value ?? ""); // Convierte null en string vacío
  };
  return (
    <section className="surface grid gap-4 p-5 md:grid-cols-3">
      <div className="space-y-2">
        <Label htmlFor="r-desde">Desde</Label>
        <Input
          id="r-desde"
          type="date"
          value={desde}
          onChange={(e) => setDesde(e.target.value)}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="r-hasta">Hasta</Label>
        <Input
          id="r-hasta"
          type="date"
          value={hasta}
          onChange={(e) => setHasta(e.target.value)}
        />
      </div>
      <div className="space-y-2">
        <Label>Categoría</Label>
        <Select value={cat} onValueChange={handleSelect}>
          <SelectTrigger>
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="todas">Todas las categorías</SelectItem>
            {categorias.map((c) => (
              <SelectItem key={c.id} value={c.id}>
                {c.nombre}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </section>
  );
};
