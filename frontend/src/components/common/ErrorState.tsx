import { AlertTriangle } from "lucide-react";
import { Button } from "../ui/button";

interface Props {
  title?: string;
  description?: string;
  onRetry?: () => void;
}

export const ErrorState = ({
  title = "No pudimos cargar la información",
  description = "Revisá tu conexión e intentá nuevamente. Si el problema persiste, volvé a iniciar sesión.",
  onRetry,
}: Props) => {
  return (
    <div className="surface flex flex-col items-center gap-3 border-destructive/30 px-6 py-12 text-center">
      <span className="grid size-12 place-items-center rounded-full bg-destructive/10 text-destructive">
        <AlertTriangle className="size-5" />
      </span>
      <div>
        <p className="font-display text-base font-semibold">{title}</p>
        <p className="mx-auto mt-1 max-w-sm text-sm text-muted-foreground">
          {description}
        </p>
      </div>
      {onRetry && (
        <Button variant="outline" onClick={onRetry}>
          Reintentar
        </Button>
      )}
    </div>
  );
};
