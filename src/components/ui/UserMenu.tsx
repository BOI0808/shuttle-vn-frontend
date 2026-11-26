import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { cn } from "@/utils";

export function UserMenu({
  initials,
  displayName,
  isLoggingOut,
  onLogout,
}: {
  initials: string;
  displayName: string;
  isLoggingOut: boolean;
  onLogout: () => void;
}) {
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target as Node)
      ) {
        setMenuOpen(false);
      }
    }

    function handleKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") {
        setMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      <button
        type="button"
        onClick={() => setMenuOpen((v) => !v)}
        aria-expanded={menuOpen}
        aria-haspopup="menu"
        className="flex h-[40px] items-center gap-2 rounded-[8px] border border-white/15 bg-white/10 px-3 transition-colors duration-150 hover:bg-white/15 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
      >
        <div className="flex size-[28px] shrink-0 items-center justify-center rounded-full bg-brand font-sans text-[12px] font-semibold text-white">
          {initials}
        </div>
        <span className="max-w-[160px] truncate font-sans text-[14px] font-semibold leading-[20px] text-white">
          {displayName}
        </span>
        <span
          className="material-symbols-outlined text-[18px] text-white/80"
          aria-hidden="true"
        >
          keyboard_arrow_down
        </span>
      </button>

      {menuOpen && (
        <div
          role="menu"
          className="absolute right-0 top-[calc(100%+8px)] z-60 min-w-[200px] rounded-[12px] border border-line bg-white p-1.5 shadow-md"
        >
          <MenuItem href="/profile" icon="person" onClick={() => setMenuOpen(false)} accent>
            Hồ sơ cá nhân
          </MenuItem>
          <MenuItem href="/my-bookings" icon="history" onClick={() => setMenuOpen(false)}>
            Lịch sử đặt sân
          </MenuItem>
          <div className="my-1 border-t border-line" />
          <button
            type="button"
            role="menuitem"
            disabled={isLoggingOut}
            onClick={onLogout}
            className="flex w-full items-center gap-2.5 rounded-[8px] px-3 py-2.5 font-sans text-[14px] font-medium text-status-danger transition-colors hover:bg-status-danger-soft disabled:opacity-50"
          >
            <span className="material-symbols-outlined text-[18px]" aria-hidden="true">
              logout
            </span>
            {isLoggingOut ? "Đang đăng xuất..." : "Đăng xuất"}
          </button>
        </div>
      )}
    </div>
  );
}

function MenuItem({
  href,
  icon,
  children,
  onClick,
  accent,
}: {
  href: string;
  icon: string;
  children: React.ReactNode;
  onClick: () => void;
  accent?: boolean;
}) {
  return (
    <Link
      href={href}
      role="menuitem"
      onClick={onClick}
      className={cn(
        "flex items-center gap-2.5 rounded-[8px] px-3 py-2.5 font-sans text-[14px] font-medium transition-colors hover:bg-surface-bg",
        accent ? "text-brand-strong" : "text-ink"
      )}
    >
      <span className="material-symbols-outlined text-[18px]" aria-hidden="true">
        {icon}
      </span>
      {children}
    </Link>
  );
}