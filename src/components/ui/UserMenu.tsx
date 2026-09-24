import { useState } from "react";
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

  return (
    <div className="relative">
      <button
        onClick={() => setMenuOpen((v) => !v)}
        className="flex items-center gap-2 px-3 py-1.5 rounded-lg border transition-all duration-150"
        style={{
          background: 'rgba(255,255,255,0.08)',
          borderColor: 'rgba(255,255,255,0.12)',
        }}
      >
        <div
          className="w-7 h-7 rounded-full flex items-center justify-center text-[11px] font-bold text-white flex-shrink-0"
          style={{ background: 'linear-gradient(135deg,#10b981,#059669)' }}
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
          style={{ boxShadow: '0 8px 30px rgba(0,0,0,0.12)' }}
        >
          <MenuItem href="/profile" icon="person" onClick={() => setMenuOpen(false)} accent>
            Hồ sơ cá nhân
          </MenuItem>
          <MenuItem href="/my-bookings" icon="history" onClick={() => setMenuOpen(false)}>
            Lịch sử đặt sân
          </MenuItem>
          <div className="border-t border-gray-100 my-1" />
          <button
            disabled={isLoggingOut}
            onClick={onLogout}
            className="w-full flex items-center gap-2 px-3 py-2.5 rounded-md text-[13px] font-medium text-red-500 hover:bg-red-50 transition-colors disabled:opacity-50"
          >
            <span className="material-symbols-outlined text-[16px]">logout</span>
            {isLoggingOut ? 'Đang đăng xuất...' : 'Đăng xuất'}
          </button>
        </div>
      )}
    </div>
  );
}

function MenuItem({ href, icon, children, onClick, accent }: {
  href: string;
  icon: string;
  children: React.ReactNode;
  onClick: () => void;
  accent?: boolean;
}) {
  return (
    <Link
      href={href}
      onClick={onClick}
      className={cn(
        'flex items-center gap-2 px-3 py-2.5 rounded-md text-[13px] font-medium hover:bg-gray-50 transition-colors',
        accent ? 'text-emerald-500' : 'text-gray-700'
      )}
    >
      <span className="material-symbols-outlined text-[16px]">{icon}</span>
      {children}
    </Link>
  );
}