import { useState } from "react";
import { useNavigate } from "react-router";
import { toast } from "sonner";
import { Input } from "../../../../components/ui/input";
import { Label } from "../../../../components/ui/label";
import { Button } from "../../../../components/ui/button";
import { apiClient } from "../../../../lib/api";
import { useAuth } from "../../../../hooks/useAuth";

import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email("Debe ser un correo válido"),
  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
});

export const LoginForm = () => {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [loading, setLoading] = useState(false);

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const result = loginSchema.safeParse({ email, password });
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
      // Usamos 'any' o una interfaz flexible para atrapar tanto 'token' como 'Token' de C#
      const response = await apiClient<any>("/api/auth/login", {
        method: "POST",
        body: { email, password },
      });

      // Extraemos el token soportando ambas variantes de serialización de .NET
      const token = response?.token || response?.Token;

      if (!token) {
        throw new Error("El servidor no devolvió un token válido");
      }

      login(token);
      toast.success("Sesión iniciada");
      navigate("/dashboard");
    } catch (error: any) {
      const msg =
        error.response?.data?.message ||
        error.message ||
        "Credenciales inválidas";
      toast.error(msg);
      setErrors({ email: "Credenciales inválidas" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={submit} className="mt-6 space-y-4">
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {errors.email && (
          <p className="text-xs text-destructive">{errors.email}</p>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="password">Contraseña</Label>
        <Input
          id="password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {errors.password && (
          <p className="text-xs text-destructive">{errors.password}</p>
        )}
      </div>
      <button type="button" className="text-xs text-primary hover:underline">
        ¿Olvidaste tu contraseña?
      </button>
      <Button type="submit" className="w-full" disabled={loading}>
        {loading ? "Ingresando…" : "Iniciar sesión"}
      </Button>
    </form>
  );
};
