import { TrendingDown, TrendingUp } from "lucide-react";
import { cn } from "../../lib/utils";

interface Props {
  label: string;
  value: string;
  hint?: string;
  delta?: number;
  accent?: boolean;
}

export const StatCard = ({ label, value, hint, delta, accent }: Props) => {
  const up = (delta ?? 0) > 0;
  return (
    <div
      className={cn(
        "surface p-5",
        accent && "bg-primary text-primary-foreground border-primary",
      )}
    >
      <p
        className={cn(
          "text-xs font-medium uppercase tracking-wide",
          accent ? "opacity-75" : "text-muted-foreground",
        )}
      >
        {label}
      </p>
      <p className="num mt-2 text-3xl font-semibold">{value}</p>
      <div className="mt-2 flex items-center gap-2 text-xs">
        {delta !== undefined && Number.isFinite(delta) && (
          <span
            className={cn(
              "inline-flex items-center gap-1 rounded-full px-2 py-0.5 font-medium",
              accent
                ? "bg-primary-foreground/15"
                : up
                  ? "bg-destructive/10 text-destructive"
                  : "bg-success/12 text-success",
            )}
          >
            {up ? (
              <TrendingUp className="size-3" />
            ) : (
              <TrendingDown className="size-3" />
            )}
            {Math.abs(delta).toFixed(1)}%
          </span>
        )}
        {hint && (
          <span className={accent ? "opacity-75" : "text-muted-foreground"}>
            {hint}
          </span>
        )}
      </div>
    </div>
  );
};
