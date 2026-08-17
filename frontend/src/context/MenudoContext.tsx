import { createContext, type PropsWithChildren } from "react";
import type {
  Usuario,
  Gasto,
  Categoria,
  MetodoPago,
} from "../data/finance-types";
import {
  DEMO_USER,
  GASTOS,
  CATEGORIAS,
  METODOS,
  noop,
} from "../data/finance-store";

interface MenudoContextProps {
  loading: boolean;
  usuario: Usuario | null;
  gastos: Gasto[];
  categorias: Categoria[];
  metodos: MetodoPago[];
  login: (email: string, nombre?: string) => void;
  logout: () => void;
  updateUsuario: (patch: Partial<Usuario>) => void;
  saveGasto: (g: Omit<Gasto, "id"> & { id?: string }) => void;
  deleteGasto: (id: string) => void;
  saveCategoria: (c: Omit<Categoria, "id"> & { id?: string }) => void;
  deleteCategoria: (id: string) => void;
  saveMetodo: (m: Omit<MetodoPago, "id"> & { id?: string }) => void;
  deleteMetodo: (id: string) => void;
}

// 1. Estado inicial con valores por defecto reales en lugar de `{}`
const initialContextValue: MenudoContextProps = {
  loading: false,
  usuario: DEMO_USER,
  gastos: GASTOS,
  categorias: CATEGORIAS,
  metodos: METODOS,
  login: noop,
  logout: noop,
  updateUsuario: noop,
  saveGasto: noop,
  deleteGasto: noop,
  saveCategoria: noop,
  deleteCategoria: noop,
  saveMetodo: noop,
  deleteMetodo: noop,
};

export const MenudoContext =
  createContext<MenudoContextProps>(initialContextValue);

export const MenudoContextProvider = ({ children }: PropsWithChildren) => {
  return (
    // 2. Usar .Provider explícito
    <MenudoContext.Provider value={initialContextValue}>
      {children}
    </MenudoContext.Provider>
  );
};
