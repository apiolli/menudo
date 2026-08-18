import { useState, useEffect } from "react";
import { toast } from "sonner";
import { MainColum } from "./MainColum";
import { SideColum } from "./SideColum";
import { useAuth } from "../../../../hooks/useAuth";
import { apiClient } from "../../../../lib/api";
import { z } from "zod";

const updateSchema = z.object({
  name: z.string().min(3, "El nombre debe tener al menos 3 caracteres"),
  email: z.string().email("IngresÃ¡ un email vÃ¡lido"),
  currency: z.string(),
});

const passwordSchema = z
  .object({
    current: z.string().min(6, "La contraseÃ±a actual es requerida"),
    new: z
      .string()
      .min(6, "La nueva contraseÃ±a debe tener al menos 6 caracteres"),
    repeat: z.string(),
  })
  .refine((data) => data.new === data.repeat, {
    message: "Las contraseÃ±as no coinciden",
    path: ["repeat"],
  });

export const ProfileContent = () => {
  const { user, setUser, logout } = useAuth();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [currency, setCurrency] = useState("USD");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [password, setPassword] = useState({
    current: "",
    new: "",
    repeat: "",
  });
  const [passwordErrors, setPasswordErrors] = useState<Record<string, string>>(
    {},
  );

  useEffect(() => {
    if (user) {
      setName(user.name);
      setEmail(user.email);
    }
  }, [user]);

  const saveData = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrors({});

    const result = updateSchema.safeParse({ name, email, currency });
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.issues.forEach((issue) => {
        fieldErrors[String(issue.path[0])] = issue.message;
      });
      setErrors(fieldErrors);
      return;
    }

    try {
      const updatedUser = await apiClient<{
        id: number;
        name: string;
        email: string;
      }>("/api/user/me", {
        method: "PUT",
        body: JSON.stringify({ name, email }),
      });
      setUser(updatedUser);
      toast.success("Datos actualizados");
    } catch (error: any) {
      toast.error(
        error.response?.data?.message || "Error al actualizar perfil",
      );
    }
  };

  const changePassword = async (e: React.FormEvent) => {
    e.preventDefault();
    setPasswordErrors({});

    const result = passwordSchema.safeParse(password);
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.issues.forEach((issue) => {
        fieldErrors[String(issue.path[0])] = issue.message;
      });
      setPasswordErrors(fieldErrors);
      return;
    }

    try {
      await apiClient("/api/user/me/password", {
        method: "PUT",
        body: JSON.stringify({
          currentPassword: password.current,
          newPassword: password.new,
        }),
      });
      setPassword({ current: "", new: "", repeat: "" });
      toast.success("ContraseÃ±a actualizada exitosamente");
    } catch (error: any) {
      toast.error(
        error.response?.data?.message || "Error al cambiar la contraseÃ±a",
      );
    }
  };

  // Mocked for now until Expenses/Categories are integrated

  const categories: any[] = [];
  const total = 0;

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      {/* Columna principal: datos personales y seguridad */}
      <MainColum
        saveData={saveData}
        errors={errors}
        name={name}
        email={email}
        currency={currency}
        setCurrency={setCurrency}
        setEmail={setEmail}
        setName={setName}
        changePassword={changePassword}
        password={password}
        setPassword={setPassword}
        passwordErrors={passwordErrors}
      />

      {/* Columna lateral: avatar, estadÃ­sticas y cierre de sesiÃ³n */}
      <SideColum
        user={
          user
            ? {
                id: user.id.toString(),
                name: user.name,
                email: user.email,
                avatarColor: "#22c55e",
                currency,
              }
            : null
        }
        expenses={[]}
        logout={logout}
        total={total}
        categories={categories}
      />
    </div>
  );
};
