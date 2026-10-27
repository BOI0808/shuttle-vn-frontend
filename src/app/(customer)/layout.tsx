import { ReactNode } from "react";
import { CustomerNav } from "@/components/layout/CustomerNav";
import { HotlineLink } from "@/components/ui/HotlineLink";

export default function CustomerLayout({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-screen flex-col bg-[#f0f2f5]">
      <CustomerNav />
      <div className="flex-1">{children}</div>
      <footer className="flex flex-wrap items-center justify-between gap-3 border-t border-gray-200 bg-white px-7 py-4 text-xs text-gray-500">
        <span>© ShuttleVN</span>
        <HotlineLink className="font-semibold text-emerald-500 hover:text-emerald-600" />
      </footer>
    </div>
  );
}
