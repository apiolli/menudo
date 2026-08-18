export type Categoria = {
  id: string;
  nombre: string;
  color: string;
  icono: string;
  presupuesto?: number;
};

export type MetodoPago = {
  id: string;
  nombre: string;
  tipo:
    | "Efectivo"
    | "Tarjeta de credito"
    | "Tarjeta de debito"
    | "Transferencia"
    | "Billetera";
  detalle?: string;
};

export type Gasto = {
  id: string;
  monto: number;
  fecha: string; // yyyy-mm-dd
  descripcion: string;
  categoriaId: string;
  metodoPagoId: string;
};

export type Usuario = {
  id: string;
  nombre: string;
  email: string;
  moneda: string;
  avatarColor: string;
};

export const currency = (value: number) =>
  new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);

export const currencyExact = (value: number) =>
  new Intl.NumberFormat("es-AR", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 2,
  }).format(value);

export const formatDate = (iso: string) =>
  new Date(`${iso}T12:00:00`).toLocaleDateString("es-AR", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

export const monthKey = (iso: string) => iso.slice(0, 7);

export const monthLabel = (key: string) =>
  new Date(`${key}-01T12:00:00`).toLocaleDateString("es-AR", {
    month: "long",
    year: "numeric",
  });
