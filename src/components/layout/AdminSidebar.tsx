"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/utils";

const NAV_GROUPS = [
  {
    label: "Tổng quan",
    links: [
      { href: "/dashboard", label: "Bảng điều khiển", icon: "space_dashboard" },
      { href: "/statistics", label: "Thống kê", icon: "monitoring" },
    ],
  },
  {
    label: "Vận hành",
    links: [
      { href: "/schedule", label: "Lịch sân", icon: "calendar_month" },
      { href: "/payments", label: "Thanh toán", icon: "payments" },
      { href: "/manage-courts", label: "Quản lý sân", icon: "sports_tennis" },
    ],
  },
  {
    label: "Quản trị",
    links: [
      { href: "/customers", label: "Khách hàng", icon: "group" },
      { href: "/employees", label: "Nhân viên", icon: "badge" },
      { href: "/audits", label: "Nhật ký hoạt động", icon: "history" },
    ],
  },
] as const;

export function AdminSidebar() {
  const pathname = usePathname();

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
        {NAV_GROUPS.map((group) => (
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
