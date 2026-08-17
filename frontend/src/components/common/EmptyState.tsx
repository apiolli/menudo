import { Inbox } from "lucide-react";
import type { ReactNode } from "react";

interface Props {
  title: string;
  description: string;
  action: ReactNode;
}

export const EmptyState = ({ title, description, action }: Props) => {
  return (
    <div className="surface flex flex-col items-center gap-3 px-6 py-14 text-center">
      <span className="grid size-12 place-items-center rounded-full bg-secondary text-secondary-foreground">
        <Inbox className="size-5" />
      </span>
      <div>
        <p className="font-display text-base font-semibold">{title}</p>
        <p className="mx-auto mt-1 max-w-sm text-sm text-muted-foreground">
          {description}
        </p>
      </div>
      {action}
    </div>
  );
};
