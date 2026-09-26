import { useNavigate } from "react-router";
import { Input } from "../../../../components/ui/input";
import { Label } from "../../../../components/ui/label";
import { Button } from "../../../../components/ui/button";
import { useForm } from "react-hook-form";

import { z } from "zod";
import type { LoginDTO } from "../types/loginDTO";
import { useState } from "react";
import { useAuthStore } from "../store/auth.store";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";

const loginSchema = z.object({
  email: z.string().email("Debe ser un correo válido"),
  password: z.string().min(6, "La contraseña debe tener al menos 6 caracteres"),
});

interface Props {
  isLoading: boolean;
}

export const LoginForm = ({}: Props) => {
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuthStore();

  const {
    formState: { errors },
    register,
    handleSubmit,
  } = useForm({
    resolver: zodResolver(loginSchema),
  });

  const navigate = useNavigate();

  const onSubmit = async (loginDto: LoginDTO) => {
    setIsLoading(true);

    const isValid = await login(loginDto.email, loginDto.password);

    if (isValid) {
      toast.success("Login exitoso, bienvenido.");
      return;
    }

    toast.error("Error");

    setIsLoading(false);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-4">
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          {...register("email", {
            required: true,
          })}
        />
        {errors.email && (
          <p className="text-xs text-destructive">{errors.email.message}</p>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="password">Contraseña</Label>
        <Input
          id="password"
          type="password"
          {...register("password", {
            required: true,
            minLength: 8,
          })}
        />
        {errors.password && (
          <p className="text-xs text-destructive">{errors.password.message}</p>
        )}
      </div>
      <button type="button" className="text-xs text-primary hover:underline">
        ¿Olvidaste tu contraseña?
      </button>
      <Button type="submit" className="w-full" disabled={isLoading}>
        {isLoading ? "Ingresando…" : "Iniciar sesión"}
      </Button>
    </form>
  );
};
