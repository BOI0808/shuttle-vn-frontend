"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { useAuthStore } from "@/stores/auth.store";
import { cn } from "@/utils";

const NAV_LINKS = [
  { href: "/courts", label: "Đặt sân" },
  { href: "/my-bookings", label: "Lịch sử đặt sân" },
  { href: "/lookup", label: "Tra cứu đơn" },
];

export function CustomerNav() {
  const pathname = usePathname();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const { user, clearAuth } = useAuthStore();

  const initials = user?.name
    ? user.name.trim().split(" ").pop()?.charAt(0).toUpperCase() ?? "K"
    : "K";

  const displayName = user?.name?.trim().split(" ").pop() ?? "Khách";

  function handleLogout() {
    clearAuth();
    router.push("/login");
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
            {NAV_LINKS.map((link) => (
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

        {/* Right: avatar */}
        <div className="relative">
          <button
            onClick={() => setMenuOpen((v) => !v)}
            className="flex items-center gap-2 px-3 py-1.5 rounded-lg border transition-all duration-150"
            style={{
              background: "rgba(255,255,255,0.08)",
              borderColor: "rgba(255,255,255,0.12)",
            }}
          >
            <div
              className="w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-bold text-white flex-shrink-0"
              style={{ background: "linear-gradient(135deg,#10b981,#059669)" }}
            >
              {initials}
            </div>
            <span className="text-[13px] font-semibold text-gray-50">
              {displayName}
            </span>
            <span className="material-symbols-outlined text-gray-400 text-[16px]">
              keyboard_arrow_down
            </span>
          </button>

          {menuOpen && (
            <div
              className="absolute right-0 top-[calc(100%+8px)] bg-white border border-gray-200 rounded-[10px] p-1.5 min-w-[190px] z-60"
              style={{ boxShadow: "0 8px 30px rgba(0,0,0,0.12)" }}
            >
              <Link
                href="/profile"
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-2 px-3 py-2.5 rounded-md text-[13px] font-medium text-emerald-500 hover:bg-gray-50 transition-colors"
              >
                <span className="material-symbols-outlined text-[16px]">
                  person
                </span>
                Hồ sơ cá nhân
              </Link>
              <Link
                href="/my-bookings"
                onClick={() => setMenuOpen(false)}
                className="flex items-center gap-2 px-3 py-2.5 rounded-md text-[13px] font-medium text-gray-700 hover:bg-gray-50 transition-colors"
              >
                <span className="material-symbols-outlined text-[16px]">
                  history
                </span>
                Lịch sử đặt sân
              </Link>
              <div className="border-t border-gray-100 my-1" />
              <button
                onClick={handleLogout}
                className="w-full flex items-center gap-2 px-3 py-2.5 rounded-md text-[13px] font-medium text-red-500 hover:bg-red-50 transition-colors"
              >
                <span className="material-symbols-outlined text-[16px]">
                  logout
                </span>
                Đăng xuất
              </button>
            </div>
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
