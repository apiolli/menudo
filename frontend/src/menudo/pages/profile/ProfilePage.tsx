import { CustomHeader } from "../../../components/custom/CustomHeader";
import { ProfileContent } from "./ui/ProfileContent";

export const ProfilePage = () => {
  return (
    <>
      <CustomHeader title="Perfil" subtitle="Tu cuenta y preferencias" />
      <main className="flex-1 px-5 py-6 md:px-8 md:py-8">
        <ProfileContent />
      </main>
    </>
  );
};
