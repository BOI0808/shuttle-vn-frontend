import { ReactNode } from "react";
import { CustomerNav } from "@/components/layout/CustomerNav";

export default function CustomerLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-[#f0f2f5]">
      <CustomerNav />
      {children}
    </div>
  );
}
