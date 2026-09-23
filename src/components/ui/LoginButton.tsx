import Link from "next/link";

export function LoginButton() {
  return (
    <Link
      href="/login"
      className="text-[13px] font-semibold px-3.5 py-1.5 rounded-lg border transition-all duration-150 text-white"
      style={{
        background: 'linear-gradient(135deg,#10b981,#059669)',
        borderColor: 'rgba(255,255,255,0.12)',
      }}
    >
      Đăng Nhập
    </Link>
  );
}