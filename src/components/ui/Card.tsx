import { HTMLAttributes } from "react";
import { cn } from "@/utils";

export function Card({
  className,
  children,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        "rounded-[12px] border border-line bg-white",
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
}
