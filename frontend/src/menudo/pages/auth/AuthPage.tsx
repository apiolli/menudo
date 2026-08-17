import { Wallet, ShieldCheck, PieChart, FileDown } from "lucide-react";
import { RegisterForm } from "./ui/RegisterForm";
import { LoginForm } from "./ui/LoginForm";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../../components/ui/tabs";

export const AuthPage = () => {
  return (
    <div className="grid min-h-screen lg:grid-cols-2">
      {/* Panel lateral de marca (solo desktop) */}
      <aside className="relative hidden flex-col justify-between bg-sidebar p-12 lg:flex">
        <div className="flex items-center gap-2.5">
          <span className="grid size-9 place-items-center rounded-xl bg-sidebar-primary text-sidebar-primary-foreground">
            <Wallet className="size-5" />
          </span>
          <p className="font-display text-lg font-semibold text-sidebar-foreground">
            menudo
          </p>
        </div>
        <div className="max-w-md">
          <h2 className="font-display text-4xl font-semibold leading-tight text-sidebar-foreground">
            Cada peso, en su lugar.
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-sidebar-foreground/70">
            Registra tus gastos en segundos, entiende a dónde se va tu dinero y
            exporta reportes cuando los necesites.
          </p>
          <ul className="mt-8 space-y-4 text-sm text-sidebar-foreground/80">
            {[
              {
                icon: PieChart,
                text: "Análisis por categoría y método de pago",
              },
              { icon: FileDown, text: "Exportación en PDF, Excel y CSV" },
              {
                icon: ShieldCheck,
                text: "Tus datos son privados y solo tuyos",
              },
            ].map((f) => (
              <li key={f.text} className="flex items-center gap-3">
                <span className="grid size-8 place-items-center rounded-lg bg-sidebar-accent text-sidebar-primary">
                  <f.icon className="size-4" />
                </span>
                {f.text}
              </li>
            ))}
          </ul>
        </div>
        <p className="text-xs text-sidebar-foreground/50">
          © {new Date().getFullYear()} menudo
        </p>
      </aside>

      {/* Formularios de acceso: login y registro */}
      <main className="flex items-center justify-center px-6 py-14">
        <div className="w-full max-w-sm">
          <div className="mb-8 lg:hidden">
            <span className="grid size-10 place-items-center rounded-xl bg-primary text-primary-foreground">
              <Wallet className="size-5" />
            </span>
          </div>
          <h1 className="text-2xl font-semibold">Bienvenida de vuelta</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Gestioná tus gastos personales desde un solo lugar.
          </p>

          {/* Pestañas: Iniciar sesión / Crear cuenta */}
          <Tabs defaultValue="login" className="mt-8">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Iniciar sesión</TabsTrigger>
              <TabsTrigger value="registro">Crear cuenta</TabsTrigger>
            </TabsList>
            <TabsContent value="login">
              <LoginForm />
            </TabsContent>
            <TabsContent value="registro">
              <RegisterForm />
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
};
