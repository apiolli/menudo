import { useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { Label } from "../../../../components/ui/label";
import { Input } from "../../../../components/ui/input";
import { Button } from "../../../../components/ui/button";
import { apiClient } from "../../../../lib/api";
import { useAuth } from "../../../../hooks/useAuth";

import { z } from "zod";

const registerSchema = z
  .object({
    name: z.string().min(3, "El nombre debe tener al menos 3 caracteres"),
    email: z.string().email("Debe ser un correo válido"),
    password: z
      .string()
      .min(6, "La contraseña debe tener al menos 6 caracteres"),
    repeat: z.string(),
  })
  .refine((data) => data.password === data.repeat, {
    message: "Las contraseñas no coinciden",
    path: ["repeat"],
  });

export const RegisterForm = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    repeat: "",
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);
  const set = (k: string, v: string) => setForm((f) => ({ ...f, [k]: v }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const result = registerSchema.safeParse(form);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.issues.forEach((issue) => {
        fieldErrors[String(issue.path[0])] = issue.message;
      });
      setErrors(fieldErrors);
      return;
    }

    setLoading(true);

    try {
      // CORRECCIÓN: Enviamos el objeto plano directamente en 'body'
      const { name, email, password } = result.data;
      const response = await apiClient<{ token: string }>(
        "/api/auth/register",
        {
          method: "POST",
          body: {
            name: name,
            email: email,
            password: password,
          },
        },
      );

      login(response.token);
      toast.success("Cuenta creada exitosamente");
      navigate("/dashboard");
    } catch (error: any) {
      const msg = error.response?.data?.message || "Error al registrarse";
      toast.error(msg);
      if (msg.includes("in use") || msg.includes("uso")) {
        setErrors({ email: "El correo ya está en uso" });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={submit} className="mt-6 space-y-4">
      {[
        { k: "name", label: "Nombre completo", type: "text" },
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
