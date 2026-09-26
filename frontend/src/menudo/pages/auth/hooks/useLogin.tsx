import { useState } from "react";
import { useNavigate } from "react-router";
import { useAuthStore } from "../../../../store/auth.store";
import type { LoginDTO } from "../types/loginDTO";
import { toast } from "sonner";

export const useLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuthStore();

  const onSubmit = async (loginDto: LoginDTO) => {
    setIsLoading(true);

    const isValid = await login(loginDto.email, loginDto.password);

    if (isValid) {
      toast.success("Login exitoso, bienvenido.");
      navigate("/dashboard");
      return;
    }

    toast.error("Error");

    setIsLoading(false);
  };
  return {
    isLoading,
    onSubmit,
  };
};
