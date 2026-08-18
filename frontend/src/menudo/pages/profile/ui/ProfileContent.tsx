import { useState, useEffect } from "react";
import { toast } from "sonner";
import { MainColum } from "./MainColum";
import { SideColum } from "./SideColum";
import { useAuth } from "../../../../hooks/useAuth";
import { useMenudo } from "../../../../context/MenudoContext";
import { userService } from "../../../../services/user.service";
import { z } from "zod";

const updateSchema = z.object({
  name: z.string().min(3, "El nombre debe tener al menos 3 caracteres"),
  email: z.string().email("Ingresá un email válido"),
  currency: z.string(),
});

const passwordSchema = z
  .object({
    current: z.string().min(6, "La contraseña actual es requerida"),
    new: z
      .string()
      .min(6, "La nueva contraseña debe tener al menos 6 caracteres"),
    repeat: z.string(),
  })
  .refine((data) => data.new === data.repeat, {
    message: "Las contraseñas no coinciden",
    path: ["repeat"],
  });

export const ProfileContent = () => {
  const { user, setUser, logout } = useAuth();
  const { categories, expenses } = useMenudo();

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
      const updatedUser = await userService.updateProfile({ name, email });
      setUser(updatedUser as any);
      toast.success("Datos actualizados exitosamente");
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
      await userService.changePassword({
        currentPassword: password.current,
        newPassword: password.new,
      });
      setPassword({ current: "", new: "", repeat: "" });
      toast.success("Contraseña actualizada exitosamente");
    } catch (error: any) {
      toast.error(
        error.response?.data?.message || "Error al cambiar la contraseña",
      );
    }
  };

  const total = expenses.reduce((acc, curr) => acc + curr.amount, 0);

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

      {/* Columna lateral: avatar, estadísticas y cierre de sesión */}
      <SideColum
        user={
          user
            ? {
                id: String(user.id),
                name: user.name,
                email: user.email,
                avatarColor: "#22c55e",
                currency,
              }
            : null
        }
        expenses={expenses}
        logout={logout}
        total={total}
        categories={categories}
      />
    </div>
  );
};
