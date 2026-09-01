import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { LoginForm } from "@/components/auth/LoginForm";

export const metadata = { title: "Đăng nhập – ShuttleVN" };

export default function LoginPage() {
  return (
    <main className="w-full max-w-[400px]">
      <Card className="px-8 py-9">
        {/* Logo */}
        <div className="flex flex-col items-center mb-8">
          <div className="flex items-center gap-2">
            <span
              className="material-symbols-outlined text-emerald-500 text-[30px]"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              sports_tennis
            </span>
            <span className="font-display text-2xl font-bold text-gray-900 tracking-tight">
              ShuttleVN
            </span>
          </div>
        </div>

        {/* Form */}
        <LoginForm />

        {/* Divider */}
        <div className="flex items-center gap-3 my-6">
          <div className="flex-1 h-px bg-gray-200" />
          <span className="text-xs text-gray-400">hoặc</span>
          <div className="flex-1 h-px bg-gray-200" />
        </div>

        {/* Footer */}
        <p className="text-center text-[13px] text-gray-500">
          Chưa có tài khoản?
          <Link
            href="/register"
            className="text-emerald-500 font-semibold ml-1 hover:text-emerald-600 transition-colors"
          >
            Đăng ký ngay
          </Link>
        </p>
      </Card>
    </main>
  );
}
