import { ReactNode } from "react";
import { ChatWidget } from "@/components/chatbot/ChatWidget";
import { CustomerNav } from "@/components/layout/CustomerNav";
import { HotlineLink } from "@/components/ui/HotlineLink";

export default function CustomerLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-surface-bg">
      <CustomerNav />
      <main className="flex-1">{children}</main>
      <footer className="border-t border-line bg-white px-4 py-4 sm:px-6 lg:px-10">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-3 font-sans text-[12px] leading-[16px] text-ink-secondary">
          <span>© 2026 ShuttleVN</span>
          <div className="flex items-center gap-2">
            <span>Giờ Việt Nam (UTC+7)</span>
            <span aria-hidden="true">·</span>
            <span>
              Hotline{" "}
              <HotlineLink className="font-medium text-ink-secondary hover:text-brand-strong hover:underline" />
            </span>
          </div>
        </div>
      </footer>
      <ChatWidget />
    </div>
  );
}
