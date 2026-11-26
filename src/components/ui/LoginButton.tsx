import Link from "next/link";

export function LoginButton() {
  return (
    <Link
      href="/login"
      className="inline-flex h-[40px] items-center justify-center rounded-[8px] bg-brand-strong px-4 font-sans text-[14px] font-semibold leading-[20px] text-white transition-colors duration-150 hover:bg-[#05523A] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand"
    >
      Đăng nhập
    </Link>
  );
}