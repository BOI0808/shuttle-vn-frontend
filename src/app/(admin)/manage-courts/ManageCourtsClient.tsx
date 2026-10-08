"use client";

import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { Court } from "@/types";
import { useCourts } from "@/hooks";
import { cn } from "@/utils";
import { CourtStatusModal } from "@/components/admin/CourtStatusModal";
import { CourtFormModal } from "@/components/admin/CourtFormModal";
import { CourtStats } from "@/components/admin/CourtStats";
import { CourtCardGrid } from "@/components/admin/CourtCardGrid";
import { CourtTable } from "@/components/admin/CourtTable";

export default function ManageCourtsClient() {
  const { data: courts = [], isLoading, isError } = useCourts();
  const [viewMode, setViewMode] = useState<"card" | "list">("card");
  const [statusCourt, setStatusCourt] = useState<Court | null>(null);
  const [formCourt, setFormCourt] = useState<Court | "create" | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  return (
    <div className="flex flex-col gap-6">
      {mounted &&
        typeof document !== "undefined" &&
        document.getElementById("admin-header-actions") &&
        createPortal(
          <div className="flex items-center gap-2.5">
            <div className="flex bg-slate-100 p-0.5 rounded-[8px] border border-slate-200">
              <button
                type="button"
                onClick={() => setViewMode("card")}
                className={cn(
                  "flex items-center gap-1 px-2.5 py-1 rounded-[6px] text-[12px] font-medium transition-all cursor-pointer",
                  viewMode === "card"
                    ? "bg-white text-gray-900 shadow-sm font-semibold"
                    : "text-gray-500 hover:text-gray-800"
                )}
              >
                <span className="material-symbols-outlined text-[15px]">
                  grid_view
                </span>
                Thẻ
              </button>
              <button
                type="button"
                onClick={() => setViewMode("list")}
                className={cn(
                  "flex items-center gap-1 px-2.5 py-1 rounded-[6px] text-[12px] font-medium transition-all cursor-pointer",
                  viewMode === "list"
                    ? "bg-white text-gray-900 shadow-sm font-semibold"
                    : "text-gray-500 hover:text-gray-800"
                )}
              >
                <span className="material-symbols-outlined text-[15px]">
                  table_rows
                </span>
                Danh sách
              </button>
            </div>

            <button
              type="button"
              onClick={() => setFormCourt("create")}
              className="flex items-center gap-1.5 px-3 py-1.5 text-[13px] font-medium text-gray-700 bg-white border border-gray-300 rounded-[8px] hover:bg-gray-50 hover:border-gray-400 shadow-sm transition-all cursor-pointer"
            >
              <span className="material-symbols-outlined text-[17px] text-gray-600">
                add
              </span>
              Thêm sân mới
            </button>
          </div>,
          document.getElementById("admin-header-actions")!
        )}

      <CourtStats courts={courts} />

      {isLoading ? (
        <div className="bg-white border border-slate-200 rounded-xl p-12 text-center text-slate-500 font-mono text-sm">Đang tải dữ liệu sân...</div>
      ) : isError ? (
        <div className="bg-white border border-red-200 rounded-xl p-12 text-center text-red-600 text-sm">Không thể tải danh sách sân.</div>
      ) : courts.length === 0 ? (
        <div className="bg-white border border-slate-200 rounded-xl p-12 text-center text-slate-500 text-sm">Chưa có sân nào.</div>
      ) : viewMode === "card" ? (
        <CourtCardGrid courts={courts} onStatusChange={setStatusCourt} onEdit={setFormCourt} />
      ) : (
        <CourtTable courts={courts} onStatusChange={setStatusCourt} onEdit={setFormCourt} />
      )}

      {statusCourt && <CourtStatusModal court={statusCourt} onClose={() => setStatusCourt(null)} />}
      {formCourt && <CourtFormModal court={formCourt === "create" ? undefined : formCourt} onClose={() => setFormCourt(null)} />}
    </div>
  );
}
