"use client";

import { useMemo, useState } from "react";
import { toast } from "sonner";
import {
  useEmployees,
  useLockEmployee,
  useUnlockEmployee,
  useDeleteEmployee,
} from "@/hooks/useEmployee";
import { EmployeeFormModal } from "@/components/admin/EmployeeFormModal";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { ConfirmDialog } from "@/components/ui/ConfirmDialog";
import { Input } from "@/components/ui/Input";
import { Select } from "@/components/ui/Select";
import { UserAccount } from "@/types";
import { cn, getErrorMessage } from "@/utils";

const STATUS_LABEL: Record<string, string> = {
  Active: "Hoạt động",
  Disabled: "Đã khóa",
};

const ROLE_LABEL = (isAdmin: boolean) =>
  isAdmin ? "Quản trị viên" : "Nhân viên";

export default function EmployeesClient() {
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [editingEmployee, setEditingEmployee] = useState<
    UserAccount | null | undefined
  >(undefined);
  const [lockTarget, setLockTarget] = useState<UserAccount | null>(null);
  const [deleteTarget, setDeleteTarget] = useState<UserAccount | null>(null);

  const { data, isLoading, isError, error, refetch } = useEmployees({
    pageNumber: 1,
    pageSize: 100,
  });
  const employees = (data?.items ?? []).filter((e) => e.employee !== null);

  const lockMutation = useLockEmployee();
  const unlockMutation = useUnlockEmployee();
  const deleteMutation = useDeleteEmployee();

  const filtered = useMemo(() => {
    return employees.filter((e) => {
      const emp = e.employee!;
      const matchesSearch =
        !search ||
        emp.fullName.toLowerCase().includes(search.toLowerCase()) ||
        emp.email.toLowerCase().includes(search.toLowerCase()) ||
        emp.phone.includes(search);
      const matchesRole =
        !roleFilter || (roleFilter === "Admin" ? emp.isAdmin : !emp.isAdmin);
      const matchesStatus = !statusFilter || e.status === statusFilter;
      return matchesSearch && matchesRole && matchesStatus;
    });
  }, [employees, search, roleFilter, statusFilter]);

  const stats = useMemo(
    () => ({
      total: employees.length,
      active: employees.filter((e) => e.status === "Active").length,
      admin: employees.filter((e) => e.employee!.isAdmin).length,
    }),
    [employees]
  );

  const hasActiveFilters = Boolean(search || roleFilter || statusFilter);
  const isLockPending = lockMutation.isPending || unlockMutation.isPending;

  function confirmToggleLock() {
    if (!lockTarget?.employee) return;
    const isActive = lockTarget.status === "Active";
    const mutation = isActive ? lockMutation : unlockMutation;
    mutation.mutate(lockTarget.employee.employeeId, {
      onSuccess: () => {
        toast.success(
          isActive ? "Đã khóa tài khoản" : "Đã mở khóa tài khoản"
        );
        setLockTarget(null);
      },
      onError: (err) => {
        toast.error(getErrorMessage(err));
        setLockTarget(null);
      },
    });
  }

  function confirmDelete() {
    if (!deleteTarget?.employee) return;
    deleteMutation.mutate(deleteTarget.employee.employeeId, {
      onSuccess: () => {
        toast.success("Đã xóa nhân viên");
        setDeleteTarget(null);
      },
      onError: (err) => {
        toast.error(getErrorMessage(err));
        setDeleteTarget(null);
      },
    });
  }

  const statCards = [
    {
      label: "Tổng nhân viên",
      value: isLoading ? "—" : String(stats.total),
      hint: isLoading
        ? "Đang tải thống kê nhân viên"
        : `${stats.total} nhân viên trong hệ thống`,
      cardBg: "bg-status-info-soft",
      valueColor: "text-status-info",
    },
    {
      label: "Đang hoạt động",
      value: isLoading ? "—" : String(stats.active),
      hint: isLoading
        ? "Đang tải thống kê nhân viên"
        : `${stats.active} tài khoản đang hoạt động`,
      cardBg: "bg-brand-soft",
      valueColor: "text-brand-strong",
    },
    {
      label: "Quản trị viên",
      value: isLoading ? "—" : String(stats.admin),
      hint: isLoading
        ? "Đang tải thống kê nhân viên"
        : `${stats.admin} tài khoản quản trị`,
      cardBg: "bg-status-info-soft",
      valueColor: "text-status-info",
    },
  ];

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-wrap items-start justify-between gap-4">
        <div>
          <h1 className="font-display text-[24px] font-semibold leading-[32px] text-ink">
            Nhân viên
          </h1>
          <p className="mt-1 font-sans text-[14px] font-normal leading-[20px] text-ink-secondary">
            Tài khoản nhân viên, vai trò và quyền truy cập
          </p>
        </div>

        <Button
          type="button"
          variant="primary"
          icon="person_add"
          onClick={() => setEditingEmployee(null)}
        >
          Thêm nhân viên
        </Button>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        {statCards.map((stat) => (
          <div
            key={stat.label}
            className={cn(
              "flex min-h-[128px] flex-col justify-between rounded-[12px] border border-line p-[19px]",
              stat.cardBg
            )}
          >
            <p className="font-sans text-[14px] font-normal leading-[20px] text-ink-secondary">
              {stat.label}
            </p>
            <p
              className={cn(
                "font-sans text-[32px] font-semibold leading-[40px] tracking-normal tabular-nums",
                stat.valueColor
              )}
            >
              {stat.value}
            </p>
            <p className="font-sans text-[12px] font-normal leading-[16px] text-ink-secondary">
              {stat.hint}
            </p>
          </div>
        ))}
      </div>

      <section className="overflow-hidden rounded-[12px] border border-line bg-white">
        <div className="flex flex-wrap items-center justify-between gap-2 px-5 pt-4 pb-3">
          <div>
            <h2 className="font-display text-[18px] font-medium leading-[26px] text-ink">
              Danh sách nhân viên
            </h2>
            <p className="mt-0.5 font-sans text-[12px] leading-[16px] text-ink-secondary tabular-nums">
              {isLoading
                ? "Đang tải dữ liệu nhân viên…"
                : `${filtered.length} nhân viên`}
            </p>
          </div>
        </div>

        <div className="flex flex-wrap items-center gap-3 px-5 pb-4">
          <Input
            icon={
              <span
                className="material-symbols-outlined text-[20px]"
                aria-hidden="true"
              >
                search
              </span>
            }
            placeholder="Tìm theo tên, email, SĐT..."
            aria-label="Tìm nhân viên"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            containerClassName="min-w-[220px] flex-1 max-w-[360px]"
          />
          <Select
            aria-label="Lọc theo vai trò"
            value={roleFilter}
            onChange={(e) => setRoleFilter(e.target.value)}
            containerClassName="w-full sm:w-[180px]"
          >
            <option value="">Tất cả vai trò</option>
            <option value="Admin">Quản trị viên</option>
            <option value="Employee">Nhân viên</option>
          </Select>
          <Select
            aria-label="Lọc theo trạng thái"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            containerClassName="w-full sm:w-[180px]"
          >
            <option value="">Tất cả trạng thái</option>
            <option value="Active">Hoạt động</option>
            <option value="Disabled">Đã khóa</option>
          </Select>
        </div>

        {isLoading ? (
          <div aria-busy="true">
            <div className="hidden h-[44px] grid-cols-5 items-center border-y border-line bg-status-info-soft px-5 font-sans text-[12px] font-semibold text-ink-secondary md:grid">
              <span>Nhân viên</span>
              <span>Liên hệ</span>
              <span>Vai trò</span>
              <span>Trạng thái</span>
              <span>Thao tác</span>
            </div>
            <div className="space-y-4 p-5">
              {[0, 1, 2, 3].map((row) => (
                <div
                  key={row}
                  className="grid grid-cols-1 gap-3 py-1.5 animate-pulse md:grid-cols-5"
                >
                  <div className="h-[16px] w-44 rounded-[8px] bg-surface-soft" />
                  <div className="h-[16px] w-48 rounded-[8px] bg-surface-soft" />
                  <div className="h-[16px] w-28 rounded-[8px] bg-surface-soft" />
                  <div className="h-[16px] w-28 rounded-[8px] bg-surface-soft" />
                  <div className="h-[16px] w-36 rounded-[8px] bg-surface-soft" />
                </div>
              ))}
              <p className="border-t border-line pt-4 font-sans text-[12px] leading-[16px] text-ink-secondary">
                Chưa nhận dữ liệu, không hiển thị thông tin hay số lượng giả lập.
              </p>
            </div>
          </div>
        ) : isError ? (
          <div role="alert" className="border-t border-line p-6">
            <div className="flex size-[40px] items-center justify-center rounded-[8px] bg-status-danger-soft text-status-danger">
              <span
                className="material-symbols-outlined text-[24px]"
                aria-hidden="true"
              >
                warning
              </span>
            </div>
            <h3 className="mt-4 font-display text-[18px] font-medium leading-[26px] text-ink">
              Không tải được nhân viên
            </h3>
            <p className="mt-1 font-sans text-[14px] leading-[20px] text-ink-secondary">
              {getErrorMessage(error)}
            </p>
            <div className="mt-4">
              <Button type="button" variant="primary" onClick={() => refetch()}>
                Thử lại
              </Button>
            </div>
          </div>
        ) : filtered.length === 0 ? (
          <div className="flex flex-col items-center border-t border-line px-6 py-12 text-center">
            <div className="flex size-[48px] items-center justify-center rounded-[12px] bg-brand-soft text-brand-strong">
              <span
                className="material-symbols-outlined text-[24px]"
                aria-hidden="true"
              >
                badge
              </span>
            </div>
            <p className="mt-4 font-sans text-[14px] font-semibold text-ink">
              {hasActiveFilters
                ? "Không tìm thấy nhân viên"
                : "Chưa có nhân viên để hiển thị"}
            </p>
            <p className="mt-1 max-w-md font-sans text-[12px] text-ink-secondary">
              {hasActiveFilters
                ? "Không có nhân viên phù hợp với bộ lọc hiện tại."
                : "Thêm nhân viên đầu tiên để phân quyền vận hành hệ thống."}
            </p>
            <div className="mt-4">
              {hasActiveFilters ? (
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setSearch("");
                    setRoleFilter("");
                    setStatusFilter("");
                  }}
                >
                  Xóa bộ lọc
                </Button>
              ) : (
                <Button
                  type="button"
                  variant="primary"
                  icon="person_add"
                  onClick={() => setEditingEmployee(null)}
                >
                  Thêm nhân viên
                </Button>
              )}
            </div>
          </div>
        ) : (
          <>
            <div className="hidden overflow-x-auto md:block">
              <table className="w-full border-collapse text-left">
                <thead>
                  <tr className="h-[44px] border-y border-line bg-status-info-soft font-sans text-[12px] font-semibold leading-[16px] text-ink-secondary">
                    <th scope="col" className="px-5 py-3 font-semibold">
                      Nhân viên
                    </th>
                    <th scope="col" className="px-5 py-3 font-semibold">
                      Liên hệ
                    </th>
                    <th scope="col" className="px-5 py-3 font-semibold">
                      Vai trò
                    </th>
                    <th scope="col" className="px-5 py-3 font-semibold">
                      Trạng thái
                    </th>
                    <th
                      scope="col"
                      className="px-5 py-3 text-right font-semibold"
                    >
                      Thao tác
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-line">
                  {filtered.map((e) => {
                    const emp = e.employee!;
                    const isActive = e.status === "Active";
                    return (
                      <tr
                        key={emp.employeeId}
                        className="transition-colors duration-100 hover:bg-surface-bg"
                      >
                        <td className="px-5 py-4 align-middle">
                          <p className="font-sans text-[14px] font-semibold leading-[20px] text-ink">
                            {emp.fullName}
                          </p>
                          <p className="font-sans text-[12px] leading-[16px] text-ink-secondary tabular-nums">
                            {emp.employeeId}
                          </p>
                        </td>
                        <td className="px-5 py-4 align-middle">
                          <p className="font-sans text-[14px] leading-[20px] text-ink tabular-nums">
                            {emp.phone}
                          </p>
                          <p className="font-sans text-[12px] leading-[16px] text-ink-secondary">
                            {emp.email}
                          </p>
                        </td>
                        <td className="px-5 py-4 align-middle">
                          <Badge status={emp.isAdmin ? "Confirmed" : "NoInvoice"}>
                            {ROLE_LABEL(emp.isAdmin)}
                          </Badge>
                        </td>
                        <td className="px-5 py-4 align-middle">
                          <Badge status={isActive ? "Active" : "Disabled"}>
                            {STATUS_LABEL[e.status] || e.status}
                          </Badge>
                        </td>
                        <td className="px-5 py-4 text-right align-middle">
                          <div className="flex items-center justify-end gap-2">
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              aria-label={`Chỉnh sửa ${emp.fullName}`}
                              onClick={() => setEditingEmployee(e)}
                            >
                              Chỉnh sửa
                            </Button>
                            <Button
                              type="button"
                              variant="outline"
                              size="sm"
                              aria-label={
                                isActive
                                  ? `Khóa tài khoản ${emp.fullName}`
                                  : `Mở khóa tài khoản ${emp.fullName}`
                              }
                              className={
                                isActive
                                  ? "border-status-danger/40 text-status-danger hover:border-status-danger hover:bg-status-danger-soft hover:text-status-danger"
                                  : undefined
                              }
                              onClick={() => setLockTarget(e)}
                            >
                              {isActive ? "Khóa" : "Mở khóa"}
                            </Button>
                            {!emp.isAdmin && (
                              <Button
                                type="button"
                                variant="outline"
                                size="sm"
                                aria-label={`Xóa nhân viên ${emp.fullName}`}
                                className="border-status-danger/40 text-status-danger hover:border-status-danger hover:bg-status-danger-soft hover:text-status-danger"
                                onClick={() => setDeleteTarget(e)}
                              >
                                Xóa
                              </Button>
                            )}
                          </div>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            <div className="divide-y divide-line border-t border-line md:hidden">
              {filtered.map((e) => {
                const emp = e.employee!;
                const isActive = e.status === "Active";
                return (
                  <div key={emp.employeeId} className="p-4">
                    <div className="flex items-start justify-between gap-3">
                      <div className="min-w-0">
                        <p className="truncate font-sans text-[14px] font-semibold text-ink">
                          {emp.fullName}
                        </p>
                        <p className="mt-0.5 font-sans text-[14px] text-ink-secondary tabular-nums">
                          {emp.phone}
                        </p>
                        <p className="truncate font-sans text-[12px] text-ink-secondary">
                          {emp.email}
                        </p>
                      </div>
                      <div className="flex shrink-0 flex-col items-end gap-1">
                        <Badge status={emp.isAdmin ? "Confirmed" : "NoInvoice"}>
                          {ROLE_LABEL(emp.isAdmin)}
                        </Badge>
                        <Badge status={isActive ? "Active" : "Disabled"}>
                          {STATUS_LABEL[e.status] || e.status}
                        </Badge>
                      </div>
                    </div>
                    <div className="mt-3 flex flex-wrap gap-2">
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => setEditingEmployee(e)}
                      >
                        Chỉnh sửa
                      </Button>
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        className={
                          isActive
                            ? "border-status-danger/40 text-status-danger hover:border-status-danger hover:bg-status-danger-soft hover:text-status-danger"
                            : undefined
                        }
                        onClick={() => setLockTarget(e)}
                      >
                        {isActive ? "Khóa" : "Mở khóa"}
                      </Button>
                      {!emp.isAdmin && (
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          className="border-status-danger/40 text-status-danger hover:border-status-danger hover:bg-status-danger-soft hover:text-status-danger"
                          onClick={() => setDeleteTarget(e)}
                        >
                          Xóa
                        </Button>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </>
        )}
      </section>

      {editingEmployee !== undefined && (
        <EmployeeFormModal
          userAccount={editingEmployee}
          onClose={() => setEditingEmployee(undefined)}
        />
      )}

      {lockTarget && (
        <ConfirmDialog
          title={
            lockTarget.status === "Active"
              ? "Khóa tài khoản nhân viên?"
              : "Mở khóa tài khoản nhân viên?"
          }
          description={
            lockTarget.status === "Active"
              ? `Nhân viên "${lockTarget.employee?.fullName}" sẽ không thể truy cập khi tài khoản bị khóa. Hãy chắc chắn rằng bạn muốn khóa tài khoản này.`
              : `Cho phép tài khoản "${lockTarget.employee?.fullName}" truy cập lại sau khi xác nhận.`
          }
          confirmLabel={
            lockTarget.status === "Active" ? "Xác nhận khóa" : "Mở khóa"
          }
          variant={lockTarget.status === "Active" ? "danger" : "warning"}
          isLoading={isLockPending}
          onConfirm={confirmToggleLock}
          onCancel={() => setLockTarget(null)}
        />
      )}

      {deleteTarget && (
        <ConfirmDialog
          title="Xóa nhân viên?"
          description={`Thao tác xóa tài khoản "${deleteTarget.employee?.fullName}" không thể hoàn tác. Hãy chắc chắn rằng bạn muốn xóa nhân viên này khỏi hệ thống.`}
          confirmLabel="Xác nhận xóa"
          variant="danger"
          isLoading={deleteMutation.isPending}
          onConfirm={confirmDelete}
          onCancel={() => setDeleteTarget(null)}
        />
      )}
    </div>
  );
}
