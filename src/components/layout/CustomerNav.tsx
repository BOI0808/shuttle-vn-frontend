"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

import { LoginButton } from "@/components/ui/LoginButton";
import { UserMenu } from "@/components/ui/UserMenu";
import { APP_CONFIG } from "@/config/app";
import { useAuth } from "@/hooks/useAuth";
import { useAuthStore } from "@/stores/auth.store";
import { cn } from "@/utils";

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

  useEffect(() => {
    setMenuOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (!menuOpen) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [menuOpen]);

  const initials = user?.fullName
    ? user.fullName.trim().split(" ").pop()?.charAt(0).toUpperCase() ?? "K"
    : "K";

  const displayName = user?.fullName?.trim() ?? "Khách";
  const visibleLinks = NAV_LINKS.filter((link) => !link.requiresAuth || user);

  function handleLogout() {
    setMenuOpen(false);
    logout();
  }

  return (
    <>
      <header className="sticky top-0 z-50 h-[64px] bg-ink text-white px-4 sm:px-6 lg:px-10">
        <div className="mx-auto flex h-full max-w-7xl items-center justify-between gap-4">
          {/* Left: mobile menu toggle + logo + nav */}
          <div className="flex items-center gap-3 md:gap-6">
            <button
              type="button"
              onClick={() => setMenuOpen((prev) => !prev)}
              aria-label={menuOpen ? "Đóng menu điều hướng" : "Mở menu điều hướng"}
              aria-expanded={menuOpen}
              className="inline-flex size-[40px] items-center justify-center rounded-[8px] border border-white/15 text-white hover:bg-white/10 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand md:hidden"
            >
              <span className="material-symbols-outlined text-[20px]" aria-hidden="true">
                {menuOpen ? "close" : "menu"}
              </span>
            </button>

            <Link
              href="/courts"
              className="flex items-center gap-2 rounded-[8px] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
            >
              <span
                className="material-symbols-outlined text-[24px] text-brand"
                style={{ fontVariationSettings: "'FILL' 1" }}
                aria-hidden="true"
              >
                sports_tennis
              </span>
              <span className="font-display text-[18px] font-medium leading-[26px] text-white">
                ShuttleVN
              </span>
            </Link>

            <nav aria-label="Điều hướng khách hàng" className="hidden items-center gap-2 md:flex">
              {visibleLinks.map((link) => {
                const isActive =
                  pathname === link.href || pathname.startsWith(`${link.href}/`);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    aria-current={isActive ? "page" : undefined}
                    className={cn(
                      "rounded-[8px] px-3.5 py-2 font-sans text-[14px] leading-[20px] transition-colors duration-150",
                      "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand",
                      isActive
                        ? "bg-white/12 font-semibold text-white"
                        : "font-normal text-white/80 hover:bg-white/10 hover:text-white"
                    )}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </nav>
          </div>

          {/* Right: hotline + avatar / login */}
          <div className="flex items-center gap-4 lg:gap-6">
            <a
              href={`tel:${APP_CONFIG.hotline.tel}`}
              className="hidden items-center gap-1.5 font-sans text-[14px] font-medium leading-[20px] text-white/90 transition-colors hover:text-white tabular-nums sm:inline-flex"
            >
              {APP_CONFIG.hotline.display}
            </a>

            {user ? (
              <UserMenu
                initials={initials}
                displayName={displayName}
                isLoggingOut={isLoggingOut}
                onLogout={handleLogout}
              />
            ) : (
              <LoginButton />
            )}
          </div>
        </div>
      </header>

      {/* Mobile navigation drawer */}
      {menuOpen && (
        <div className="fixed inset-0 top-[64px] z-40 md:hidden">
          <div
            aria-hidden="true"
            onClick={() => setMenuOpen(false)}
            className="fixed inset-0 top-[64px] bg-ink/40 backdrop-blur-xs"
          />
          <nav
            aria-label="Menu di động"
            className="relative z-10 border-b border-line bg-white px-4 py-4 shadow-xl"
          >
            <div className="space-y-1">
              {visibleLinks.map((link) => {
                const isActive =
                  pathname === link.href || pathname.startsWith(`${link.href}/`);
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMenuOpen(false)}
                    aria-current={isActive ? "page" : undefined}
                    className={cn(
                      "flex h-[44px] items-center rounded-[8px] px-3 font-sans text-[14px] font-semibold leading-[20px] transition-colors",
                      isActive
                        ? "bg-brand-soft text-brand-strong"
                        : "text-ink-secondary hover:bg-surface-bg hover:text-ink"
                    )}
                  >
                    {link.label}
                  </Link>
                );
              })}
            </div>
            <div className="mt-3 border-t border-line pt-3">
              <a
                href={`tel:${APP_CONFIG.hotline.tel}`}
                className="flex h-[44px] items-center justify-between rounded-[8px] px-3 font-sans text-[14px] font-medium text-ink-secondary hover:bg-surface-bg"
              >
                <span>Hotline hỗ trợ</span>
                <span className="font-semibold text-brand-strong tabular-nums">
                  {APP_CONFIG.hotline.display}
                </span>
              </a>
            </div>
          </nav>
        </div>
      )}
    </>
  );
}
