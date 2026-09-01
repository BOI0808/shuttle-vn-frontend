import { ReactNode } from "react";

export default function AuthLayout({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-[#f0f2f5] flex items-center justify-center p-4">
      {children}
    </div>
  );
}
