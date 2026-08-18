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
import type { Category } from "../../../../data/finance-types";

interface Props {
  fromDate: string;
  toDate: string;
  category: string;
  setCategory: React.Dispatch<React.SetStateAction<string>>;
  setFromDate: (v: string) => void;
  setToDate: (v: string) => void;
  categories: Category[];
}

export const ReportsFilter = ({
  fromDate,
  toDate,
  category,
  setCategory,
  setFromDate,
  setToDate,
  categories,
}: Props) => {
  const handleSelect = (value: string | null) => {
    setCategory(value ?? "todas");
  };

  const selectedCategory = categories.find((c) => String(c.id) === category);

  return (
    <section className="surface grid gap-4 p-5 md:grid-cols-3">
      <div className="space-y-2">
        <Label htmlFor="r-desde">Desde</Label>
        <Input
          id="r-desde"
          type="date"
          value={fromDate}
          onChange={(e) => setFromDate(e.target.value)}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="r-hasta">Hasta</Label>
        <Input
          id="r-hasta"
          type="date"
          value={toDate}
          onChange={(e) => setToDate(e.target.value)}
        />
      </div>
      <div className="space-y-2">
        <Label>Categoría</Label>
        <Select value={category} onValueChange={handleSelect}>
          <SelectTrigger>
            <SelectValue placeholder="Todas las categorías">
              {category === "todas" ? (
                "Todas las categorías"
              ) : selectedCategory ? (
                <span className="flex items-center gap-2">
                  <span
                    className="size-2.5 rounded-full"
                    style={{ backgroundColor: selectedCategory.color }}
                  />
                  {selectedCategory.name}
                </span>
              ) : (
                "Todas las categorías"
              )}
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="todas">Todas las categorías</SelectItem>
            {categories.map((c) => (
              <SelectItem key={c.id} value={String(c.id)}>
                <span className="flex items-center gap-2">
                  <span
                    className="size-2.5 rounded-full"
                    style={{ backgroundColor: c.color }}
                  />
                  {c.name}
                </span>
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </section>
  );
};
