import { RequireAuth } from "../../../components/common/RequireAuth";
import { AppShell } from "../../layouts/AppShell";
import { ProfileContent } from "./ui/ProfileContent";

export const ProfilePage = () => {
  return (
    <AppShell title="Perfil" subtitle="Tu cuenta y preferencias">
      <RequireAuth>
        <ProfileContent />
      </RequireAuth>
    </AppShell>
  );
};
