"use client";

import { useMemo, useState } from "react";
import { toast } from "sonner";
import {
  useEmployees,
  useGrantAdminRole,
  useLockEmployee,
  useUnlockEmployee,
} from "@/hooks/useEmployee";
import { EmployeeFormModal } from "@/components/admin/EmployeeFormModal";
import { Button } from "@/components/ui/Button";
import { UserAccount } from "@/types";
import { getErrorMessage } from "@/utils";
import { ConfirmDialog } from "@/components/ui/ConfirmDialog";

const STATUS_LABEL: Record<string, string> = {
  Active: "Hoạt động",
  Disabled: "Đã khoá",
};
const STATUS_CLASS: Record<string, string> = {
  Active: "bg-green-50 text-green-600 border-green-200",
  Disabled: "bg-red-50 text-red-600 border-red-200",
};
const ROLE_LABEL = (isAdmin: boolean) =>
  isAdmin ? "Quản trị viên" : "Nhân viên";
const ROLE_CLASS = (isAdmin: boolean) =>
  isAdmin
    ? "bg-purple-50 text-purple-600 border-purple-200"
    : "bg-blue-50 text-blue-600 border-blue-200";

export default function EmployeesClient() {
  const [search, setSearch] = useState("");
  const [roleFilter, setRoleFilter] = useState("");
  const [statusFilter, setStatusFilter] = useState("");
  const [editingEmployee, setEditingEmployee] = useState<
    UserAccount | null | undefined
  >(undefined);

  const { data, isLoading } = useEmployees({ pageNumber: 1, pageSize: 100 });
  const employees = (data?.items ?? []).filter((e) => e.employee !== null);

  const [grantAdminTarget, setGrantAdminTarget] = useState<UserAccount | null>(
    null
  );
  const grantAdminMutation = useGrantAdminRole();
  const lockMutation = useLockEmployee();
  const unlockMutation = useUnlockEmployee();

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

  function handleGrantAdmin(account: UserAccount) {
    if (!grantAdminMutation.isPending) setGrantAdminTarget(account);
  }

  function confirmGrantAdmin() {
    if (!grantAdminTarget?.employee) return;
    grantAdminMutation.mutate(grantAdminTarget.employee.employeeId, {
      onSuccess: () => {
        toast.success("Đã cấp quyền Quản trị viên");
        setGrantAdminTarget(null);
      },
      onError: (error) => {
        toast.error(getErrorMessage(error));
        setGrantAdminTarget(null);
      },
    });
  }

  function handleToggleLock(account: UserAccount) {
    const mutation =
      account.status === "Active" ? lockMutation : unlockMutation;
    mutation.mutate(account.employee!.employeeId, {
      onSuccess: () =>
        toast.success(
          account.status === "Active"
            ? "Đã khoá tài khoản"
            : "Đã mở khoá tài khoản"
        ),
      onError: (error) => toast.error(getErrorMessage(error)),
    });
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between">
        <h2 className="text-xl font-bold text-slate-900">
          Quản lý nhân viên
        </h2>
        <Button
          className="w-auto px-4"
          onClick={() => setEditingEmployee(null)}
        >
          <span className="material-symbols-outlined text-[16px] mr-1">person_add</span>
          Thêm nhân viên
        </Button>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <StatCard
          label="Tổng nhân viên"
          value={stats.total}
          color="text-blue-600"
        />
        <StatCard
          label="Đang hoạt động"
          value={stats.active}
          color="text-emerald-600"
        />
        <StatCard
          label="Quản trị viên"
          value={stats.admin}
          color="text-purple-500"
        />
      </div>

      {/* Filters */}
      <div className="flex flex-wrap items-center gap-3">
        <input
          className="flex-1 min-w-[280px] border border-slate-200 rounded-xl px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all"
          placeholder="Tìm theo tên, email, SĐT..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          className="border border-slate-200 rounded-xl px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all bg-white"
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
        >
          <option value="">Tất cả vai trò</option>
          <option value="Admin">Quản trị viên</option>
          <option value="Employee">Nhân viên</option>
        </select>
        <select
          className="border border-slate-200 rounded-xl px-4 py-2 text-sm outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all bg-white"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="">Tất cả trạng thái</option>
          <option value="Active">Hoạt động</option>
          <option value="Disabled">Đã khoá</option>
        </select>
        <span className="ml-auto text-xs font-medium text-slate-500 bg-slate-100 px-3 py-1.5 rounded-full">
          {filtered.length} nhân viên
        </span>
      </div>

      {/* Table */}
      <div className="bg-white border border-slate-200 rounded-xl overflow-hidden shadow-[0_1px_3px_rgba(0,0,0,0.04)]">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-slate-50/50 text-[10px] font-mono text-slate-400 uppercase tracking-wider border-b border-slate-100">
                <th className="px-5 py-3 font-semibold">Nhân viên</th>
                <th className="px-5 py-3 font-semibold">Vai trò</th>
                <th className="px-5 py-3 font-semibold">Liên hệ</th>
                <th className="px-5 py-3 font-semibold">Trạng thái</th>
                <th className="px-5 py-3 font-semibold text-center">Thao tác</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {isLoading && (
                <tr>
                  <td
                    colSpan={5}
                    className="px-5 py-8 text-center text-slate-500 font-mono"
                  >
                    Đang tải...
                  </td>
                </tr>
              )}
              {!isLoading && filtered.length === 0 && (
                <tr>
                  <td
                    colSpan={5}
                    className="px-5 py-8 text-center text-slate-500 font-mono"
                  >
                    Không tìm thấy nhân viên
                  </td>
                </tr>
              )}
              {filtered.map((e) => (
                <tr
                  key={e.employee!.employeeId}
                  className="hover:bg-slate-50 transition-colors"
                >
                  <td className="px-5 py-4">
                    <p className="text-[13px] font-bold text-slate-900">
                      {e.employee!.fullName}
                    </p>
                    <p className="font-mono text-[11px] text-slate-400">
                      {e.employee!.employeeId}
                    </p>
                  </td>
                  <td className="px-5 py-4">
                    <span
                      className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono font-semibold border ${ROLE_CLASS(
                        e.employee!.isAdmin
                      )}`}
                    >
                      {ROLE_LABEL(e.employee!.isAdmin)}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <p className="text-[13px] text-slate-700">
                      {e.employee!.phone}
                    </p>
                    <p className="text-[11px] text-slate-400">
                      {e.employee!.email}
                    </p>
                  </td>
                  <td className="px-5 py-4">
                    <span
                      className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-mono font-semibold border ${
                        STATUS_CLASS[e.status]
                      }`}
                    >
                      {STATUS_LABEL[e.status]}
                    </span>
                  </td>
                  <td className="px-5 py-4">
                    <div className="flex gap-2 justify-center">
                      <button
                        title="Chỉnh sửa"
                        className="border border-slate-200 rounded-lg p-1.5 text-slate-500 hover:border-emerald-500 hover:text-emerald-600 transition-colors bg-white shadow-sm"
                        onClick={() => setEditingEmployee(e)}
                      >
                        <span className="material-symbols-outlined text-[18px]">
                          edit
                        </span>
                      </button>
                      {!e.employee!.isAdmin && (
                        <button
                          title="Cấp quyền Admin"
                          className="border border-purple-100 rounded-lg p-1.5 text-purple-500 hover:bg-purple-50 transition-colors bg-white shadow-sm"
                          onClick={() => handleGrantAdmin(e)}
                        >
                          <span className="material-symbols-outlined text-[18px]">
                            admin_panel_settings
                          </span>
                        </button>
                      )}
                      <button
                        title={
                          e.status === "Active" ? "Khoá tài khoản" : "Mở khoá"
                        }
                        className={`border rounded-lg p-1.5 transition-colors bg-white shadow-sm ${
                          e.status === "Active"
                            ? "border-red-100 text-red-500 hover:bg-red-50"
                            : "border-emerald-100 text-emerald-500 hover:bg-emerald-50"
                        }`}
                        onClick={() => handleToggleLock(e)}
                      >
                        <span className="material-symbols-outlined text-[18px]">
                          {e.status === "Active" ? "lock" : "lock_open"}
                        </span>
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {editingEmployee !== undefined && (
        <EmployeeFormModal
          userAccount={editingEmployee}
          onClose={() => setEditingEmployee(undefined)}
        />
      )}

      {grantAdminTarget && (
        <ConfirmDialog
          title="Cấp quyền Quản trị viên"
          description={`Bạn sắp cấp quyền Admin cho "${grantAdminTarget.employee?.fullName}". Hành động này không thể hoàn tác (chưa có chức năng thu hồi quyền Admin).`}
          confirmLabel="Cấp quyền Admin"
          variant="danger"
          isLoading={grantAdminMutation.isPending}
          onConfirm={confirmGrantAdmin}
          onCancel={() => setGrantAdminTarget(null)}
        />
      )}
    </div>
  );
}

function StatCard({
  label,
  value,
  color,
}: {
  label: string;
  value: number;
  color: string;
}) {
  return (
    <div className="bg-white border border-slate-200 rounded-2xl shadow-[0_1px_3px_rgba(0,0,0,0.04)] px-6 py-5">
      <p className="font-mono text-[10px] uppercase text-slate-400 tracking-wider mb-1">
        {label}
      </p>
      <p className={`font-bold text-2xl ${color}`}>{value}</p>
    </div>
  );
}
