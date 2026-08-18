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
  saveData: (e: React.FormEvent) => void;
  errors: Record<string, string>;
  name: string;
  email: string;
  currency: string;
  setCurrency: React.Dispatch<React.SetStateAction<string>>;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  setName: React.Dispatch<React.SetStateAction<string>>;
  changePassword: (e: React.FormEvent<Element>) => void;
  password: {
    current: string;
    new: string;
    repeat: string;
  };
  setPassword: React.Dispatch<
    React.SetStateAction<{
      current: string;
      new: string;
      repeat: string;
    }>
  >;
  passwordErrors: Record<string, string>;
}

export const MainColum = ({
  saveData,
  errors,
  name,
  email,
  currency,
  setCurrency,
  setEmail,
  setName,
  changePassword,
  password,
  setPassword,
  passwordErrors,
}: Props) => {
  const handleSelect = (value: string | null) => {
    setCurrency(value ?? "USD");
  };

  return (
    <section className="surface p-6 lg:col-span-2">
      {/* Formulario de datos personales */}
      <h2 className="text-base font-semibold">Datos personales</h2>
      <p className="text-xs text-muted-foreground">
        Esta información solo la ves tú.
      </p>
      <form onSubmit={saveData} className="mt-5 grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="p-nombre">Nombre completo</Label>
          <Input
            id="p-nombre"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Tu nombre"
          />
          {errors.name && (
            <p className="text-xs text-destructive">{errors.name}</p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="p-email">Email</Label>
          <Input
            id="p-email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="correo@ejemplo.com"
          />
          {errors.email && (
            <p className="text-xs text-destructive">{errors.email}</p>
          )}
        </div>
        <div className="space-y-2">
          <Label>Moneda</Label>
          <Select value={currency} onValueChange={handleSelect}>
            <SelectTrigger>
              <SelectValue placeholder="Selecciona una moneda">
                {currency || "Selecciona una moneda"}
              </SelectValue>
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
        Usa al menos 8 caracteres con números y letras.
      </p>
      <form
        onSubmit={changePassword}
        className="mt-5 grid gap-4 sm:grid-cols-2"
      >
        <div className="space-y-2 sm:col-span-2">
          <Label htmlFor="p-actual">Contraseña actual</Label>
          <Input
            id="p-actual"
            type="password"
            value={password.current}
            onChange={(e) =>
              setPassword({ ...password, current: e.target.value })
            }
            placeholder="••••••••"
          />
          {passwordErrors.current && (
            <p className="text-xs text-destructive">{passwordErrors.current}</p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="p-nueva">Nueva contraseña</Label>
          <Input
            id="p-nueva"
            type="password"
            value={password.new}
            onChange={(e) => setPassword({ ...password, new: e.target.value })}
            placeholder="••••••••"
          />
          {passwordErrors.new && (
            <p className="text-xs text-destructive">{passwordErrors.new}</p>
          )}
        </div>
        <div className="space-y-2">
          <Label htmlFor="p-repetir">Repetir contraseña</Label>
          <Input
            id="p-repetir"
            type="password"
            value={password.repeat}
            onChange={(e) =>
              setPassword({ ...password, repeat: e.target.value })
            }
            placeholder="••••••••"
          />
          {passwordErrors.repeat && (
            <p className="text-xs text-destructive">{passwordErrors.repeat}</p>
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
