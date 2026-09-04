"use client";

import { useState } from "react";

interface BookingLookupFormProps {
  onSubmit: (code: string, contact: string) => void;
}

const DEMO_CODES = [
  { key: "confirmed", label: "Đã xác nhận", code: "DS-10294" },
  { key: "pending", label: "Chờ xác nhận", code: "DS-10312" },
  { key: "completed", label: "Hoàn thành", code: "DS-10218" },
  { key: "notfound", label: "Không tìm thấy", code: "DS-99999" },
];

export function BookingLookupForm({ onSubmit }: BookingLookupFormProps) {
  const [code, setCode] = useState("");
  const [contact, setContact] = useState("");
  const [error, setError] = useState("");

  const contactIcon = contact.includes("@") ? "mail" : "phone";

  function validateAndSubmit(submitCode: string, submitContact: string) {
    const normalized = submitCode.trim().toUpperCase();
    if (!normalized || !normalized.startsWith("DS-") || normalized.length < 4) {
      setError("Mã đặt sân không hợp lệ (phải có định dạng DS-XXXXX)");
      return;
    }
    setError("");
    onSubmit(normalized, submitContact.trim());
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    validateAndSubmit(code, contact);
  }

  function fillDemo(demoCode: string) {
    setCode(demoCode);
    setContact("");
    setError("");
    validateAndSubmit(demoCode, "");
  }

  return (
    <div
      className="bg-white rounded-[14px] p-[26px]"
      style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.07)" }}
    >
      <form onSubmit={handleSubmit}>
        {/* Booking code */}
        <div className="mb-4">
          <label className="block text-[11px] font-semibold uppercase tracking-[0.07em] text-gray-500 mb-1.5 font-mono">
            Mã đặt sân *
          </label>
          <div className="relative">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[17px] text-gray-400 pointer-events-none">
              confirmation_number
            </span>
            <input
              value={code}
              onChange={(e) => {
                setCode(e.target.value.toUpperCase());
                setError("");
              }}
              type="text"
              placeholder="DS-XXXXX"
              className={`w-full bg-gray-50 border rounded-lg text-[#1a1a2e] text-sm pl-10 pr-3 py-[11px] outline-none transition-[border-color,box-shadow] duration-150 placeholder:text-gray-400 font-mono tracking-[0.08em] uppercase focus:border-emerald-500 focus:shadow-[0_0_0_3px_rgba(16,185,129,0.12)] focus:bg-white ${
                error
                  ? "border-red-400 focus:border-red-400 focus:shadow-[0_0_0_3px_rgba(239,68,68,0.12)]"
                  : "border-gray-200"
              }`}
            />
          </div>
          {error && (
            <p className="flex items-center gap-1 text-xs text-red-500 mt-1">
              <span className="material-symbols-outlined text-[14px]">
                error
              </span>
              {error}
            </p>
          )}
        </div>

        {/* Contact (optional) */}
        <div className="mb-3.5">
          <label className="block text-[11px] font-semibold uppercase tracking-[0.07em] text-gray-500 mb-1.5 font-mono">
            Số điện thoại hoặc Email (Không bắt buộc)
          </label>
          <div className="relative">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[17px] text-gray-400 pointer-events-none">
              {contactIcon}
            </span>
            <input
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              type="text"
              placeholder="090xxxxxxx hoặc email@gmail.com"
              className="w-full bg-gray-50 border border-gray-200 rounded-lg text-[#1a1a2e] text-sm pl-10 pr-3 py-[11px] outline-none transition-[border-color,box-shadow] duration-150 placeholder:text-gray-400 focus:border-emerald-500 focus:shadow-[0_0_0_3px_rgba(16,185,129,0.12)] focus:bg-white"
            />
          </div>
        </div>

        {/* Info note */}
        <div className="flex items-start gap-2.5 px-3.5 py-2.5 bg-green-50 border border-green-200 rounded-lg text-xs text-green-800 leading-relaxed mb-[22px]">
          <span className="material-symbols-outlined text-[16px] text-emerald-500 flex-shrink-0 mt-px">
            info
          </span>
          <p className="m-0">
            Mã đặt sân có định dạng{" "}
            <strong className="font-mono">DS-XXXXX</strong> và được cung cấp khi
            bạn đặt sân thành công.
          </p>
        </div>

        {/* Submit */}
        <button
          type="submit"
          className="w-full inline-flex items-center justify-center gap-1.5 bg-emerald-500 text-white rounded-lg py-3 text-[13px] font-mono font-medium tracking-[0.04em] transition-[background,box-shadow] duration-150 hover:bg-emerald-600 hover:shadow-[0_4px_14px_rgba(16,185,129,0.28)]"
        >
          <span className="material-symbols-outlined text-[17px]">search</span>
          TRA CỨU ĐƠN
        </button>

        {/* Demo shortcuts */}
        <div className="flex gap-1.5 flex-wrap justify-center items-center mt-4">
          <span className="text-[11px] text-gray-400">Demo:</span>
          {DEMO_CODES.map((d) => (
            <button
              key={d.key}
              type="button"
              onClick={() => fillDemo(d.code)}
              className="bg-slate-50 border border-gray-200 rounded-md px-2.5 py-1 text-[11px] text-gray-500 font-mono transition-colors duration-100 hover:bg-slate-100 hover:text-gray-700 hover:border-gray-300"
            >
              {d.label}
            </button>
          ))}
        </div>
      </form>
    </div>
  );
}
