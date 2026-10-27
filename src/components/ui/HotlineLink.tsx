import { APP_CONFIG } from "@/config/app";
import { cn } from "@/utils";

interface HotlineLinkProps {
  className?: string;
}

export function HotlineLink({ className }: HotlineLinkProps) {
  return (
    <a
      href={`tel:${APP_CONFIG.hotline.tel}`}
      className={cn("inline-flex items-center gap-1.5", className)}
    >
      <span className="material-symbols-outlined text-[16px]">call</span>
      Hotline: {APP_CONFIG.hotline.display}
    </a>
  );
}