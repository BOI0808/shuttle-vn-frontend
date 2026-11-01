import type { Metadata } from "next";

import { Card } from "@/components/ui/Card";
import { SetPasswordForm } from "@/components/auth/SetPasswordForm";

export const metadata: Metadata = {
  title: "Đặt mật khẩu",
  referrer: "no-referrer",
};

type SearchParamValue = string | string[] | undefined;

interface SetPasswordPageProps {
  searchParams: Promise<{ email?: SearchParamValue; token?: SearchParamValue }>;
}

function firstValue(value: SearchParamValue): string {
  return (Array.isArray(value) ? value[0] : value) ?? "";
}

export default async function SetPasswordPage({
  searchParams,
}: SetPasswordPageProps) {
  const { email, token } = await searchParams;

  return (
    <main className="w-full max-w-[420px]">
      <Card className="px-8 py-9">
        <div className="mb-7 flex flex-col items-center">
          <div className="flex items-center gap-2">
            <span
              className="material-symbols-outlined text-[30px] text-emerald-500"
              style={{ fontVariationSettings: "'FILL' 1" }}
            >
              sports_tennis
            </span>
            <span className="font-display text-[22px] font-bold tracking-tight text-gray-900">
              ShuttleVN
            </span>
          </div>
        </div>

        <SetPasswordForm email={firstValue(email)} token={firstValue(token)} />
      </Card>
    </main>
  );
}
