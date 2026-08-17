import {
  LayoutDashboard,
  Receipt,
  Tags,
  CreditCard,
  BarChart3,
  UserRound,
  FileText,
  FileSpreadsheet,
  Table2,
} from "lucide-react";
import * as Icons from "lucide-react";
import type { Categoria, MetodoPago, Gasto, Usuario } from "./finance-types";

/**
 * Capa de datos puramente visual: valores estáticos de demostración.
 * No hay persistencia, ni sesión, ni mutaciones — solo diseño.
 */

export const CATEGORIAS: Categoria[] = [
  {
    id: "c1",
    nombre: "Alimentación",
    color: "#2f7d63",
    icono: "ShoppingBasket",
    presupuesto: 600,
  },
  {
    id: "c2",
    nombre: "Transporte",
    color: "#c2d84b",
    icono: "Bus",
    presupuesto: 180,
  },
  {
    id: "c3",
    nombre: "Vivienda",
    color: "#d99a3f",
    icono: "Home",
    presupuesto: 900,
  },
  {
    id: "c4",
    nombre: "Ocio",
    color: "#c25a4a",
    icono: "Popcorn",
    presupuesto: 220,
  },
  {
    id: "c5",
    nombre: "Salud",
    color: "#4a7fc2",
    icono: "HeartPulse",
    presupuesto: 150,
  },
  {
    id: "c6",
    nombre: "Educación",
    color: "#7a5ec2",
    icono: "GraduationCap",
    presupuesto: 120,
  },
];

export const METODOS: MetodoPago[] = [
  { id: "m1", nombre: "Efectivo", tipo: "efectivo" },
  {
    id: "m2",
    nombre: "Visa Crédito",
    tipo: "tarjeta_credito",
    detalle: "•••• 4821",
  },
  {
    id: "m3",
    nombre: "Débito Galicia",
    tipo: "tarjeta_debito",
    detalle: "•••• 7745",
  },
  { id: "m4", nombre: "Transferencia", tipo: "transferencia" },
  { id: "m5", nombre: "Mercado Pago", tipo: "billetera" },
];

export const DESCRIPCIONES: Record<string, string[]> = {
  c1: [
    "Supermercado semanal",
    "Verdulería",
    "Café con amigos",
    "Delivery de sushi",
    "Panadería",
  ],
  c2: ["Carga SUBE", "Nafta", "Viaje en taxi", "Peaje", "Mantenimiento auto"],
  c3: ["Alquiler", "Expensas", "Luz y gas", "Internet", "Servicio de agua"],
  c4: [
    "Entradas de cine",
    "Suscripción streaming",
    "Salida a cenar",
    "Concierto",
    "Libro nuevo",
  ],
  c5: ["Farmacia", "Consulta médica", "Obra social", "Gimnasio", "Óptica"],
  c6: [
    "Curso online",
    "Materiales de estudio",
    "Suscripción plataforma",
    "Taller de diseño",
  ],
};

// Muestras deterministas para poblar las pantallas de forma estable.
export function muestras(): Gasto[] {
  const out: Gasto[] = [];
  const today = new Date();
  let seed = 7;
  const rnd = () => {
    seed = (seed * 1103515245 + 12345) % 2147483648;
    return seed / 2147483648;
  };
  for (let m = 0; m < 6; m++) {
    const base = new Date(today.getFullYear(), today.getMonth() - m, 1);
    const daysInMonth =
      m === 0
        ? today.getDate()
        : new Date(base.getFullYear(), base.getMonth() + 1, 0).getDate();
    const count = 14 + Math.floor(rnd() * 8);
    for (let i = 0; i < count; i++) {
      const cat = CATEGORIAS[Math.floor(rnd() * CATEGORIAS.length)];
      const day = 1 + Math.floor(rnd() * daysInMonth);
      const descs = DESCRIPCIONES[cat.id];
      const magnitud = cat.id === "c3" ? 180 + rnd() * 620 : 8 + rnd() * 130;
      out.push({
        id: `g${m}-${i}`,
        monto: Math.round(magnitud * 100) / 100,
        fecha: `${base.getFullYear()}-${String(base.getMonth() + 1).padStart(2, "0")}-${String(day).padStart(2, "0")}`,
        descripcion: descs[Math.floor(rnd() * descs.length)],
        categoriaId: cat.id,
        metodoPagoId: METODOS[Math.floor(rnd() * METODOS.length)].id,
      });
    }
  }
  return out.sort((a, b) => (a.fecha < b.fecha ? 1 : -1));
}

export const GASTOS = muestras();

export const DEMO_USER: Usuario = {
  id: "u1",
  nombre: "Valentina Ríos",
  email: "valentina@finanzas.app",
  moneda: "USD",
  avatarColor: "#2f7d63",
};
export const noop = () => {};

export const nav = [
  { to: "/", label: "Dashboard", icon: LayoutDashboard },
  { to: "/expenses", label: "Gastos", icon: Receipt },
  { to: "/categories", label: "Categorías", icon: Tags },
  { to: "/paymentMethods", label: "Métodos de pago", icon: CreditCard },
  { to: "/reports", label: "Reportes", icon: BarChart3 },
  { to: "/profile", label: "Perfil", icon: UserRound },
] as const;

export const formatos = [
  { id: "txt", label: "TXT", desc: "Datos planos", icon: FileText },
  {
    id: "excel",
    label: "Excel",
    desc: "Hoja de cálculo .xlsx",
    icon: FileSpreadsheet,
  },
  { id: "json", label: "JSON", desc: "Formato JSON", icon: Table2 },
] as const;

export const COLORES = [
  "#2f7d63",
  "#c2d84b",
  "#d99a3f",
  "#c25a4a",
  "#4a7fc2",
  "#7a5ec2",
  "#3fa3a3",
  "#b5477f",
];
export const ICONOS = [
  "ShoppingBasket",
  "Bus",
  "Home",
  "Popcorn",
  "HeartPulse",
  "GraduationCap",
  "Plane",
  "Dog",
  "Shirt",
  "Gift",
];

export function Icono({
  name,
  className,
}: {
  name: string;
  className?: string;
}) {
  const Cmp =
    (
      Icons as unknown as Record<
        string,
        React.ComponentType<{ className?: string }>
      >
    )[name] ?? Icons.Tag;
  return <Cmp className={className} />;
}
