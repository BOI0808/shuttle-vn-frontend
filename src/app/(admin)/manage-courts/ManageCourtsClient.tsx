"use client";

import { useState } from "react";
import { Court } from "@/types";
import { useCourts } from "@/hooks";
import { getErrorMessage } from "@/utils";
import { Button } from "@/components/ui/Button";
import { CourtStatusModal } from "@/components/admin/CourtStatusModal";
import { CourtFormModal } from "@/components/admin/CourtFormModal";
import { CourtStats } from "@/components/admin/CourtStats";
import { CourtCardGrid } from "@/components/admin/CourtCardGrid";
import { CourtTable } from "@/components/admin/CourtTable";
import { CourtOperationsModal } from "@/components/admin/CourtOperationsModal";

function ManageCourtsSkeleton() {
  return (
    <div className="flex flex-col gap-6" aria-busy="true">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {[0, 1, 2].map((index) => (
          <div
            key={index}
            className="h-[128px] animate-pulse rounded-[12px] border border-line bg-white p-[19px]"
          >
            <div className="h-[14px] w-24 rounded-[4px] bg-line" />
            <div className="mt-3 h-[32px] w-14 rounded-[4px] bg-line" />
            <div className="mt-4 h-[12px] w-36 rounded-[4px] bg-surface-soft" />
          </div>
        ))}
      </div>

      <div className="rounded-[12px] border border-line bg-white p-5">
        <div className="flex items-center justify-between gap-4 pb-4">
          <div className="h-[24px] w-36 animate-pulse rounded-[4px] bg-line" />
          <div className="flex gap-2">
            <div className="h-[44px] w-24 animate-pulse rounded-[8px] bg-surface-soft" />
            <div className="h-[44px] w-20 animate-pulse rounded-[8px] bg-surface-soft" />
          </div>
        </div>
        <div className="space-y-3">
          {[0, 1, 2].map((row) => (
            <div
              key={row}
              className="h-[56px] animate-pulse rounded-[8px] bg-surface-bg"
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default function ManageCourtsClient() {
  const { data: courts = [], isLoading, isError, error, refetch } = useCourts();
  const [viewMode, setViewMode] = useState<"list" | "card">("list");
  const [statusCourt, setStatusCourt] = useState<Court | null>(null);
  const [formCourt, setFormCourt] = useState<Court | "create" | null>(null);
  const [operationsCourt, setOperationsCourt] = useState<Court | null>(null);

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="font-display text-[24px] font-semibold leading-[32px] text-ink">
            Quản lý sân &amp; Bảng giá
          </h1>
          <p className="mt-1 font-sans text-[14px] font-normal leading-[20px] text-ink-secondary">
            Thông tin sân, trạng thái và cấu hình vận hành
          </p>
        </div>

        <Button
          type="button"
          variant="primary"
          icon="add"
          onClick={() => setFormCourt("create")}
        >
          Thêm sân
        </Button>
      </div>

      {isLoading ? (
        <ManageCourtsSkeleton />
      ) : isError ? (
        <div
          role="alert"
          className="max-w-xl rounded-[12px] border border-line bg-white p-5"
        >
          <div className="flex size-[40px] items-center justify-center rounded-[8px] bg-status-danger-soft text-status-danger">
            <span className="material-symbols-outlined text-[24px]" aria-hidden="true">
              warning
            </span>
          </div>
          <h2 className="mt-4 font-display text-[18px] font-medium leading-[26px] text-ink">
            Không thể tải danh sách sân
          </h2>
          <p className="mt-2 font-sans text-[14px] leading-[20px] text-ink-secondary">
            {getErrorMessage(error)}
          </p>
          <div className="mt-5">
            <Button type="button" variant="primary" onClick={() => refetch()}>
              Thử lại
            </Button>
          </div>
        </div>
      ) : (
        <>
          <CourtStats courts={courts} />

          <section className="overflow-hidden rounded-[12px] border border-line bg-white">
            <div className="flex flex-wrap items-center justify-between gap-3 px-5 py-4">
              <h2 className="font-display text-[18px] font-medium leading-[26px] text-ink">
                Danh sách sân
              </h2>

              <div
                className="flex items-center gap-2"
                role="group"
                aria-label="Chế độ hiển thị danh sách sân"
              >
                <Button
                  type="button"
                  variant={viewMode === "list" ? "outline" : "ghost"}
                  onClick={() => setViewMode("list")}
                  aria-pressed={viewMode === "list"}
                >
                  Danh sách
                </Button>
                <Button
                  type="button"
                  variant={viewMode === "card" ? "outline" : "ghost"}
                  onClick={() => setViewMode("card")}
                  aria-pressed={viewMode === "card"}
                >
                  Thẻ
                </Button>
              </div>
            </div>

            {courts.length === 0 ? (
              <div className="flex flex-col items-center border-t border-line px-6 py-12 text-center">
                <div className="flex size-[48px] items-center justify-center rounded-[12px] bg-brand-soft text-brand-strong">
                  <span className="material-symbols-outlined text-[24px]" aria-hidden="true">
                    sports_tennis
                  </span>
                </div>
                <p className="mt-4 font-sans text-[14px] font-semibold text-ink">
                  Chưa có sân nào
                </p>
                <p className="mt-1 max-w-md font-sans text-[14px] text-ink-secondary">
                  Thêm sân đầu tiên để bắt đầu cấu hình lịch hoạt động và bảng giá.
                </p>
                <div className="mt-5">
                  <Button
                    type="button"
                    variant="primary"
                    icon="add"
                    onClick={() => setFormCourt("create")}
                  >
                    Thêm sân
                  </Button>
                </div>
              </div>
            ) : viewMode === "list" ? (
              <CourtTable
                courts={courts}
                onStatusChange={setStatusCourt}
                onEdit={setFormCourt}
                onConfigure={setOperationsCourt}
              />
            ) : (
              <div className="border-t border-line p-5">
                <CourtCardGrid
                  courts={courts}
                  onStatusChange={setStatusCourt}
                  onEdit={setFormCourt}
                  onConfigure={setOperationsCourt}
                />
              </div>
            )}
          </section>
        </>
      )}

      {statusCourt && (
        <CourtStatusModal
          court={statusCourt}
          onClose={() => setStatusCourt(null)}
        />
      )}
      {formCourt && (
        <CourtFormModal
          court={formCourt === "create" ? undefined : formCourt}
          onClose={() => setFormCourt(null)}
        />
      )}
      {operationsCourt && (
        <CourtOperationsModal
          court={operationsCourt}
          onClose={() => setOperationsCourt(null)}
        />
      )}
    </div>
  );
}
