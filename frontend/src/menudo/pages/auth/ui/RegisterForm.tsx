import { useState } from "react";
import { useNavigate } from "react-router";
import { Label } from "../../../../components/ui/label";
import { Input } from "../../../../components/ui/input";
import { Button } from "../../../../components/ui/button";

export const RegisterForm = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    nombre: "",
    email: "",
    password: "",
    repeat: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const set = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const submit = () => {
    navigate("/");
  };

  return (
    <form onSubmit={submit} className="mt-6 space-y-4">
      {[
        { k: "nombre", label: "Nombre completo", type: "text" },
        { k: "email", label: "Email", type: "email" },
        { k: "password", label: "Contraseña", type: "password" },
        { k: "repeat", label: "Repetir contraseña", type: "password" },
      ].map((f) => (
        <div key={f.k} className="space-y-2">
          <Label htmlFor={f.k}>{f.label}</Label>
          <Input
            id={f.k}
            type={f.type}
            value={form[f.k as keyof typeof form]}
            onChange={(e) => set(f.k, e.target.value)}
          />
          {errors[f.k] && (
            <p className="text-xs text-destructive">{errors[f.k]}</p>
          )}
        </div>
      ))}
      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? "Creando cuenta…" : "Crear cuenta"}
      </Button>
    </form>
  );
};
