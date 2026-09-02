import Link from "next/link";
import { Card } from "@/components/ui/Card";
import { RegisterForm } from "@/components/auth/RegisterForm";

export const metadata = { title: "Đăng ký – ShuttleVN" };

export default function RegisterPage() {
  return (
    <main className="w-full max-w-[420px]">
      <Card className="px-8 py-9">
        {/* Logo */}
        <div className="flex flex-col items-center mb-7">
          <div className="flex items-center gap-2">
            <span
              className="material-symbols-outlined text-emerald-500 text-[30px]"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              sports_tennis
            </span>
            <span className="font-display text-[22px] font-bold text-gray-900 tracking-tight">
              ShuttleVN
            </span>
          </div>
        </div>

        {/* Form */}
        <RegisterForm />

        {/* Footer */}
        <div className="border-t border-gray-200 mt-6 pt-5 text-center">
          <p className="text-[13px] text-gray-500">
            Đã có tài khoản?
            <Link
              href="/login"
              className="text-emerald-500 font-semibold ml-1 hover:text-emerald-600 transition-colors"
            >
              Đăng nhập
            </Link>
          </p>
        </div>
      </Card>
    </main>
  );
}
