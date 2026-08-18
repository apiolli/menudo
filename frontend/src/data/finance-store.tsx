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
  Banknote,
  Landmark,
  Smartphone,
} from "lucide-react";
import * as Icons from "lucide-react";

export const nav = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
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
  "Banknote",
  "CreditCard",
  "Smartphone",
  "Landmark",
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

export const TIPOS = [
  { id: 2, label: "Efectivo", icon: Banknote },
  { id: 4, label: "Tarjeta de crédito", icon: CreditCard },
  { id: 3, label: "Tarjeta de débito", icon: CreditCard },
  { id: 1, label: "Transferencia", icon: Landmark },
  { id: 5, label: "Billetera virtual", icon: Smartphone },
] as const;
