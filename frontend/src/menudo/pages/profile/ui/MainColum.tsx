import { Label } from "../../../../components/ui/label";
import { Input } from "../../../../components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../../components/ui/select";
import { Button } from "../../../../components/ui/button";
import { Separator } from "../../../../components/ui/separator";
import { ShieldCheck } from "lucide-react";

interface Props {
  guardarDatos: (e: React.FormEvent) => void;
  errors: Record<string, string>;
  nombre: string;
  email: string;
  moneda: string;
  setMoneda: React.Dispatch<React.SetStateAction<string>>;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  setNombre: React.Dispatch<React.SetStateAction<string>>;
  cambiarPass: (e: React.FormEvent<Element>) => void;
  pass: {
    actual: string;
    nueva: string;
    repetir: string;
  };
  passErrors: Record<string, string>;
}

export const MainColum = ({
  guardarDatos,
  errors,
  nombre,
  email,
  moneda,
  setMoneda,
  setEmail,
  setNombre,
  cambiarPass,
  pass,
  passErrors,
}: Props) => {
  const handleSelect = (value: string | null) => {
    setMoneda(value ?? ""); // Convierte null en string vacío
  };

  return (
    <section className="surface p-6 lg:col-span-2">
      {/* Formulario de datos personales */}
      <h2 className="text-base font-semibold">Datos personales</h2>
      <p className="text-xs text-muted-foreground">
        Esta información solo la ves vos.
      </p>
      <form onSubmit={guardarDatos} className="mt-5 grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="p-nombre">Nombre completo</Label>
          <Input
            id="p-nombre"
            value={nombre}
            onChange={(e) => setNombre(e.target.value)}
          />
          {errors.nombre && (
            <p className="text-xs text-destructive">{errors.nombre}</p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="p-email">Email</Label>
          <Input
            id="p-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          {errors.email && (
            <p className="text-xs text-destructive">{errors.email}</p>
          )}
        </div>
        <div className="space-y-2">
          <Label>Moneda</Label>
          <Select value={moneda} onValueChange={handleSelect}>
            <SelectTrigger>
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {["USD", "ARS", "EUR", "MXN", "CLP"].map((m) => (
                <SelectItem key={m} value={m}>
                  {m}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="flex items-end">
          <Button type="submit">Guardar cambios</Button>
        </div>
      </form>

      <Separator className="my-8" />

      {/* Formulario de cambio de contraseña */}
      <h2 className="text-base font-semibold">Cambiar contraseña</h2>
      <p className="text-xs text-muted-foreground">
        Usá al menos 8 caracteres con números y letras.
      </p>
      <form onSubmit={cambiarPass} className="mt-5 grid gap-4 sm:grid-cols-2">
        <div className="space-y-2 sm:col-span-2">
          <Label htmlFor="p-actual">Contraseña actual</Label>
          <Input id="p-actual" type="password" value={pass.actual} />
          {passErrors.actual && (
            <p className="text-xs text-destructive">{passErrors.actual}</p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="p-nueva">Nueva contraseña</Label>
          <Input id="p-nueva" type="password" value={pass.nueva} />
          {passErrors.nueva && (
            <p className="text-xs text-destructive">{passErrors.nueva}</p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="p-repetir">Repetir contraseña</Label>
          <Input id="p-repetir" type="password" value={pass.repetir} />
          {passErrors.repetir && (
            <p className="text-xs text-destructive">{passErrors.repetir}</p>
          )}
        </div>
        <div className="sm:col-span-2">
          <Button type="submit" variant="secondary" className="gap-2">
            <ShieldCheck className="size-4" /> Actualizar contraseña
          </Button>
        </div>
      </form>
    </section>
  );
};
