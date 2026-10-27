"use client";

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
    label: "Tổng quan",
    links: [
      { href: "/dashboard", label: "Bảng điều khiển", icon: "space_dashboard", roles: ADMIN_ONLY },
      { href: "/statistics", label: "Báo cáo & Thống kê", icon: "monitoring", roles: ADMIN_ONLY },
    ],
  },
  {
    label: "Vận hành",
    links: [
      { href: "/schedule", label: "Lịch sân", icon: "calendar_month", roles: STAFF },
      { href: "/booking-requests", label: "Yêu cầu đặt sân", icon: "inbox", roles: STAFF },
      { href: "/payments", label: "Thanh toán", icon: "payments", roles: STAFF },
      { href: "/manage-courts", label: "Quản lý sân", icon: "sports_tennis", roles: ADMIN_ONLY },
    ],
  },
  {
    label: "Quản trị",
    links: [
      { href: "/customers", label: "Khách hàng", icon: "group", roles: STAFF },
      { href: "/employees", label: "Nhân viên", icon: "badge", roles: ADMIN_ONLY },
      { href: "/all-bookings", label: "Đặt sân toàn hệ thống", icon: "event_note", roles: ADMIN_ONLY },
      { href: "/audits", label: "Nhật ký hoạt động", icon: "history", roles: ADMIN_ONLY },
    ],
  },
];

export function AdminSidebar() {
  const pathname = usePathname();
  const role = useAuthStore((state) => state.user?.role);

  const visibleGroups = NAV_GROUPS.map((group) => ({
    ...group,
    links: group.links.filter(
      (link) => role !== undefined && link.roles.includes(role)
    ),
  })).filter((group) => group.links.length > 0);

  return (
    <aside className="sticky top-0 flex min-h-screen w-[220px] flex-shrink-0 flex-col border-r border-[#EAEAEA] bg-[#FBFBFA] px-2.5 py-3.5">
      <Link
        href="/dashboard"
        className="mb-3 flex items-center gap-2 border-b border-[#EAEAEA] px-2 pb-4"
        aria-label="ShuttleVN Admin - Bảng điều khiển"
      >
        <span
          className="material-symbols-outlined text-[23px] text-primary-600"
          style={{ fontVariationSettings: "'FILL' 1" }}
          aria-hidden="true"
        >
          sports_tennis
        </span>
        <span className="font-display text-[17px] font-bold tracking-tight text-[#2F3437]">
          ShuttleVN
        </span>
        <span className="ml-auto rounded bg-[#EDF3EC] px-1.5 py-0.5 font-mono text-[9px] font-medium uppercase tracking-wide text-[#346538]">
          Admin
        </span>
      </Link>

      <nav aria-label="Điều hướng quản trị" className="space-y-3">
          {visibleGroups.map((group) => (
          <div key={group.label}>
            <p className="px-2 py-1.5 font-mono text-[9px] font-medium uppercase tracking-[0.12em] text-[#9B9A97]">
              {group.label}
            </p>
            <div className="space-y-0.5">
              {group.links.map((link) => {
                const isActive =
                  pathname === link.href || pathname.startsWith(`${link.href}/`);

                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    aria-current={isActive ? "page" : undefined}
                    className={cn(
                      "flex items-center gap-2.5 rounded-md px-2.5 py-2 text-[13px] font-medium transition-colors duration-150 active:scale-[0.98]",
                      isActive
                        ? "bg-[#EDF3EC] text-[#346538]"
                        : "text-[#787774] hover:bg-white hover:text-[#2F3437]"
                    )}
                  >
                    <span
                      className="material-symbols-outlined text-[18px]"
                      style={{ fontVariationSettings: isActive ? "'FILL' 1" : "'FILL' 0" }}
                      aria-hidden="true"
                    >
                      {link.icon}
                    </span>
                    {link.label}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>
    </aside>
  );
}
