import { useContext, useState } from "react";
import { MenudoContext } from "../../../../context/MenudoContext";
import { toast } from "sonner";
import { MainColum } from "./MainColum";
import { SideColum } from "./SideColum";

export const ProfileContent = () => {
  const { usuario, gastos, categorias, updateUsuario, logout } =
    useContext(MenudoContext);
  const [nombre, setNombre] = useState(usuario?.nombre ?? "");
  const [email, setEmail] = useState(usuario?.email ?? "");
  const [moneda, setMoneda] = useState(usuario?.moneda ?? "USD");
  const [errors, setErrors] = useState<Record<string, string>>({});

  const [pass, setPass] = useState({ actual: "", nueva: "", repetir: "" });
  const [passErrors, setPassErrors] = useState<Record<string, string>>({});

  const guardarDatos = (e: React.FormEvent) => {
    e.preventDefault();
    const err: Record<string, string> = {};
    if (nombre.trim().length < 3) err.nombre = "Ingresá tu nombre completo";
    if (!/^[^@\s]+@[^@\s]+\.[a-z]{2,}$/i.test(email))
      err.email = "Ingresá un email válido";
    setErrors(err);
    if (Object.keys(err).length) return;
    updateUsuario({ nombre: nombre.trim(), email: email.trim(), moneda });
    toast.success("Datos actualizados");
  };

  const cambiarPass = (e: React.FormEvent) => {
    e.preventDefault();
    const err: Record<string, string> = {};
    if (pass.actual.length < 8) err.actual = "Ingresá tu contraseña actual";
    if (pass.nueva.length < 8)
      err.nueva = "La nueva contraseña debe tener al menos 8 caracteres";
    if (pass.nueva !== pass.repetir)
      err.repetir = "Las contraseñas no coinciden";
    setPassErrors(err);
    if (Object.keys(err).length) return;
    setPass({ actual: "", nueva: "", repetir: "" });
    toast.success("Contraseña actualizada");
  };

  const total = gastos.reduce((s, g) => s + g.monto, 0);

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      {/* Columna principal: datos personales y seguridad */}
      <MainColum
        guardarDatos={guardarDatos}
        errors={errors}
        nombre={nombre}
        email={email}
        moneda={moneda}
        setMoneda={setMoneda}
        setEmail={setEmail}
        setNombre={setNombre}
        cambiarPass={cambiarPass}
        pass={pass}
        passErrors={passErrors}
      />

      {/* Columna lateral: avatar, estadísticas y cierre de sesión */}
      <SideColum
        usuario={usuario}
        gastos={gastos}
        logout={logout}
        total={total}
        categorias={categorias}
      />
    </div>
  );
};
