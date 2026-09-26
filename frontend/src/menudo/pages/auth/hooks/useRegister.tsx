import { useState } from "react";
import { useAuthStore } from "../store/auth.store";
import type { RegisterDTO } from "../types/registerDTO";
import { toast } from "sonner";
import { useNavigate } from "react-router";

export const useRegister = () => {
  const [isLoading, setisLoading] = useState(false);
  const navigate = useNavigate();
  const { register } = useAuthStore();

  const onSubmit = async (registerDto: RegisterDTO) => {
    setisLoading(true);
    const isValid = await register(
      registerDto.name,
      registerDto.email,
      registerDto.password,
    );

    if (isValid) {
      toast.success("Cuenta creada con exito, bienvenid@!");
      navigate("/dasboard");
      return;
    }

    setisLoading(true);
  };

  return {
    isLoading,
    onSubmit,
  };
};
