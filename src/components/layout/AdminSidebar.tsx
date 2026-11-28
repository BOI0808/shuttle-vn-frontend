"use client";

import { useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useAuthStore } from "@/stores/auth.store";
import type { UserRole } from "@/types";
import { cn } from "@/utils";

interface NavLink {
  href: string;
  label: string;
  icon: string;
  roles: readonly UserRole[];
}

interface NavGroup {
  label: string;
  links: readonly NavLink[];
}

const ADMIN_ONLY: readonly UserRole[] = ["Admin"];
const STAFF: readonly UserRole[] = ["Admin", "Employee"];

const NAV_GROUPS: readonly NavGroup[] = [
  {
    label: "TỔNG QUAN",
    links: [
      { href: "/dashboard", label: "Bảng điều khiển", icon: "space_dashboard", roles: ADMIN_ONLY },
      { href: "/statistics", label: "Báo cáo & Thống kê", icon: "monitoring", roles: ADMIN_ONLY },
    ],
  },
  {
    label: "VẬN HÀNH",
    links: [
      { href: "/schedule", label: "Lịch sân", icon: "calendar_month", roles: STAFF },
      { href: "/booking-requests", label: "Yêu cầu đặt sân", icon: "inbox", roles: STAFF },
      { href: "/payments", label: "Thanh toán", icon: "payments", roles: STAFF },
      { href: "/manage-courts", label: "Quản lý sân", icon: "sports_tennis", roles: ADMIN_ONLY },
    ],
  },
  {
    label: "QUẢN TRỊ",
    links: [
      { href: "/customers", label: "Khách hàng", icon: "group", roles: STAFF },
      { href: "/employees", label: "Nhân viên", icon: "badge", roles: ADMIN_ONLY },
      { href: "/all-bookings", label: "Đặt sân toàn hệ thống", icon: "event_note", roles: ADMIN_ONLY },
      { href: "/audits", label: "Nhật ký hoạt động", icon: "history", roles: ADMIN_ONLY },
    ],
  },
];

interface AdminSidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export function AdminSidebar({ isOpen = false, onClose }: AdminSidebarProps) {
  const pathname = usePathname();
  const role = useAuthStore((state) => state.user?.role);

  useEffect(() => {
    if (!isOpen || !onClose) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, onClose]);

  const visibleGroups = NAV_GROUPS.map((group) => ({
    ...group,
    links: group.links.filter(
      (link) => role !== undefined && link.roles.includes(role)
    ),
  })).filter((group) => group.links.length > 0);

  return (
    <>
      {isOpen && (
        <div
          aria-hidden="true"
          onClick={onClose}
          className="fixed inset-0 z-40 bg-ink/40 backdrop-blur-xs lg:hidden"
        />
      )}

      <aside
        aria-label="Thanh điều hướng quản trị"
        className={cn(
          "fixed inset-y-0 left-0 z-50 flex h-screen w-[240px] shrink-0 flex-col border-r border-line bg-surface-bg px-4 py-5",
          "transition-transform duration-200 ease-out lg:sticky lg:top-0 lg:z-auto lg:translate-x-0",
          isOpen ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="mb-5 flex items-center gap-3 px-2">
          <Link
            href={role === "Employee" ? "/schedule" : "/dashboard"}
            onClick={onClose}
            className="flex items-center gap-3 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand rounded-[8px]"
            aria-label={
              role === "Employee"
                ? "ShuttleVN - Lịch sân"
                : "ShuttleVN Admin - Bảng điều khiển"
            }
          >
            <span
              className="material-symbols-outlined text-[28px] text-brand"
              style={{ fontVariationSettings: "'FILL' 1" }}
              aria-hidden="true"
            >
              sports_tennis
            </span>
            <span className="font-display text-[18px] font-medium leading-[26px] text-ink">
              ShuttleVN
            </span>
          </Link>
        </div>

        <div className="mb-4 flex items-center justify-between px-2">
          {onClose && (
            <button
              type="button"
              onClick={onClose}
              aria-label="Đóng menu điều hướng"
              className="inline-flex size-[28px] items-center justify-center rounded-[6px] text-ink-muted hover:bg-surface-soft hover:text-ink lg:hidden"
            >
              <span className="material-symbols-outlined text-[18px]" aria-hidden="true">
                left_panel_close
              </span>
            </button>
          )}
        </div>

        <nav aria-label="Điều hướng quản trị" className="flex-1 space-y-5 overflow-y-auto">
          {visibleGroups.map((group) => (
            <div key={group.label}>
              <p className="mb-2 px-2 font-sans text-[12px] font-semibold leading-[16px] text-ink-muted">
                {group.label}
              </p>
              <div className="space-y-1">
                {group.links.map((link) => {
                  const isActive =
                    pathname === link.href || pathname.startsWith(`${link.href}/`);

                  return (
                    <Link
                      key={link.href}
                      href={link.href}
                      onClick={onClose}
                      aria-current={isActive ? "page" : undefined}
                      className={cn(
                        "flex h-[44px] w-full items-center gap-3 rounded-[8px] px-3 font-sans text-[14px] font-semibold leading-[20px]",
                        "transition-colors duration-150 ease-out active:scale-[0.98]",
                        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand",
                        isActive
                          ? "bg-brand-soft text-brand-strong"
                          : "bg-surface-bg text-ink-secondary hover:bg-surface-soft hover:text-ink"
                      )}
                    >
                      <span
                        className="material-symbols-outlined text-[20px]"
                        style={{ fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0" }}
                        aria-hidden="true"
                      >
                        {link.icon}
                      </span>
                      <span className="truncate">{link.label}</span>
                    </Link>
                  );
                })}
              </div>
            </div>
          ))}
        </nav>

        <div className="mt-4 border-t border-line px-2 pt-4">
          <p className="font-sans text-[14px] font-semibold leading-[20px] text-ink">
            ShuttleVN Admin
          </p>
          <p className="font-sans text-[12px] font-normal leading-[16px] text-ink-secondary">
            Quản lý cơ sở cầu lông
          </p>
        </div>
      </aside>
    </>
  );
}
