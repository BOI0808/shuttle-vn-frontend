"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { useAuthStore } from "@/stores/auth.store";
import { useAuth } from "@/hooks/useAuth";
import { cn } from "@/utils";
import { UserMenu } from "@/components/ui/UserMenu";
import { LoginButton } from "@/components/ui/LoginButton";

const NAV_LINKS = [
  { href: "/courts", label: "Đặt sân" },
  { href: "/my-bookings", label: "Lịch sử đặt sân", requiresAuth: true },
  { href: "/lookup", label: "Tra cứu đơn" },
];

export function CustomerNav() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);
  const { user } = useAuthStore();
  const { logout, isLoggingOut } = useAuth();

  const initials = user?.fullName
    ? user.fullName.trim().split(" ").pop()?.charAt(0).toUpperCase() ?? "K"
    : "K";

  const displayName = user?.fullName?.trim() ?? "Khách";

  function handleLogout() {
    setMenuOpen(false);
    logout();
  }

  return (
    <>
      <header
        className="sticky top-0 z-50 h-14 px-7 flex items-center justify-between"
        style={{ background: "#1a1f2e" }}
      >
        {/* Left: logo + nav */}
        <div className="flex items-center gap-5">
          <div className="flex items-center gap-2">
            <span
              className="material-symbols-outlined text-emerald-500"
              style={{ fontSize: 24, fontVariationSettings: "'FILL' 1" }}
            >
              sports_tennis
            </span>
            <span className="font-display text-[18px] font-bold text-white tracking-tight">
              ShuttleVN
            </span>
          </div>
          <nav className="flex gap-0.5">
            {NAV_LINKS.filter((link) => !link.requiresAuth || user)
                .map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "text-[13px] font-medium px-3.5 py-1.5 rounded-md transition-all duration-150",
                  pathname === link.href
                    ? "text-white"
                    : "text-gray-400 hover:text-white hover:bg-white/8"
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>

        {/* Right: avatar / login */}
        <div className="relative">
          {user ? (
            <UserMenu
              initials={ initials }
              displayName={ displayName }
              isLoggingOut={ isLoggingOut }
              onLogout={ handleLogout }
            />
          ) : (
            <LoginButton />
          )}
        </div>
      </header>

      {/* Overlay to close menu */}
      {menuOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setMenuOpen(false)}
        />
      )}
    </>
  );
}
