"use client";

import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import {
  useEmployees,
  useGrantAdminRole,
  useLockEmployee,
  useUnlockEmployee,
} from "@/hooks/useEmployee";
import { EmployeeFormModal } from "@/components/admin/EmployeeFormModal";
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

  // Lắng nghe sự kiện click "Thêm nhân viên" từ AdminHeader
  useEffect(() => {
    const handleOpenModal = () => setEditingEmployee(null);
    window.addEventListener("open-add-employee", handleOpenModal);
    return () =>
      window.removeEventListener("open-add-employee", handleOpenModal);
  }, []);

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
    <div className="p-6">
      {/* Stats */}
      <div className="grid grid-cols-3 gap-3.5 mb-[22px]">
        <StatCard
          label="Tổng nhân viên"
          value={stats.total}
          color="text-blue-600"
          icon="badge"
          iconBg="bg-blue-50"
        />
        <StatCard
          label="Đang hoạt động"
          value={stats.active}
          color="text-green-600"
          icon="check_circle"
          iconBg="bg-green-50"
        />
        <StatCard
          label="Quản trị viên"
          value={stats.admin}
          color="text-purple-500"
          icon="admin_panel_settings"
          iconBg="bg-purple-50"
        />
      </div>

      {/* Filters */}
      <div className="flex items-center gap-2.5 mb-4">
        <input
          className="flex-1 max-w-[320px] border border-gray-300 rounded-[7px] px-3 py-2 text-sm outline-none focus:border-emerald-500"
          placeholder="Tìm theo tên, email, SĐT..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select
          className="border border-gray-300 rounded-[7px] px-3 py-2 text-xs font-mono w-40"
          value={roleFilter}
          onChange={(e) => setRoleFilter(e.target.value)}
        >
          <option value="">Tất cả vai trò</option>
          <option value="Admin">Quản trị viên</option>
          <option value="Employee">Nhân viên</option>
        </select>
        <select
          className="border border-gray-300 rounded-[7px] px-3 py-2 text-xs font-mono w-40"
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
        >
          <option value="">Tất cả trạng thái</option>
          <option value="Active">Hoạt động</option>
          <option value="Disabled">Đã khoá</option>
        </select>
        <span className="ml-auto font-mono text-xs text-gray-500">
          {filtered.length} nhân viên
        </span>
      </div>

      {/* Table */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="border-b border-gray-200 bg-gray-50 text-[11px] font-mono text-gray-500 uppercase tracking-wider">
              <th className="px-4 py-2.5 font-medium">Nhân viên</th>
              <th className="px-4 py-2.5 font-medium">Vai trò</th>
              <th className="px-4 py-2.5 font-medium">Liên hệ</th>
              <th className="px-4 py-2.5 font-medium">Trạng thái</th>
              <th className="px-4 py-2.5 font-medium text-center">Thao tác</th>
            </tr>
          </thead>
          <tbody>
            {isLoading && (
              <tr>
                <td
                  colSpan={5}
                  className="text-center py-8 text-gray-400 text-sm"
                >
                  Đang tải...
                </td>
              </tr>
            )}
            {!isLoading && filtered.length === 0 && (
              <tr>
                <td
                  colSpan={5}
                  className="text-center py-8 text-gray-400 text-sm"
                >
                  Không tìm thấy nhân viên
                </td>
              </tr>
            )}
            {filtered.map((e) => (
              <tr
                key={e.employee!.employeeId}
                className="border-b border-gray-100 hover:bg-gray-50"
              >
                <td className="px-4 py-2.5">
                  <p className="text-sm font-medium text-gray-900">
                    {e.employee!.fullName}
                  </p>
                  <p className="font-mono text-[11px] text-gray-400">
                    {e.employee!.employeeId}
                  </p>
                </td>
                <td className="px-4 py-2.5">
                  <span
                    className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-mono font-semibold border ${ROLE_CLASS(
                      e.employee!.isAdmin
                    )}`}
                  >
                    {ROLE_LABEL(e.employee!.isAdmin)}
                  </span>
                </td>
                <td className="px-4 py-2.5">
                  <p className="font-mono text-[11px] text-gray-900">
                    {e.employee!.phone}
                  </p>
                  <p className="text-[11px] text-gray-500">
                    {e.employee!.email}
                  </p>
                </td>
                <td className="px-4 py-2.5">
                  <span
                    className={`inline-flex items-center px-2 py-0.5 rounded-full text-[10px] font-mono font-semibold border ${
                      STATUS_CLASS[e.status]
                    }`}
                  >
                    {STATUS_LABEL[e.status]}
                  </span>
                </td>
                <td className="px-4 py-2.5">
                  <div className="flex gap-1.5 justify-center">
                    <button
                      title="Chỉnh sửa"
                      className="border border-gray-300 rounded-[6px] p-1.5 text-gray-500 hover:border-emerald-500 hover:text-emerald-600"
                      onClick={() => setEditingEmployee(e)}
                    >
                      <span className="material-symbols-outlined text-[14px]">
                        edit
                      </span>
                    </button>
                    {!e.employee!.isAdmin && (
                      <button
                        title="Cấp quyền Admin"
                        className="border border-purple-200 rounded-[6px] p-1.5 text-purple-500 hover:bg-purple-50"
                        onClick={() => handleGrantAdmin(e)}
                      >
                        <span className="material-symbols-outlined text-[14px]">
                          admin_panel_settings
                        </span>
                      </button>
                    )}
                    <button
                      title={
                        e.status === "Active" ? "Khoá tài khoản" : "Mở khoá"
                      }
                      className={`border rounded-[6px] p-1.5 ${
                        e.status === "Active"
                          ? "border-red-200 text-red-500 hover:bg-red-50"
                          : "border-green-200 text-green-500 hover:bg-green-50"
                      }`}
                      onClick={() => handleToggleLock(e)}
                    >
                      <span className="material-symbols-outlined text-[14px]">
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

      {editingEmployee !== undefined && (
        <EmployeeFormModal
          userAccount={editingEmployee}
          onClose={() => setEditingEmployee(undefined)}
        />
      )}

      {grantAdminTarget && (
        <ConfirmDialog
          title="Cấp quyền Quản trị viên"
          description={`Bạn sắp cấp quyền Admin cho "${grantAdminTarget.employee?.fullName}". Hành động này không thể hoàn tác.`}
          confirmLabel="Cấp quyền Admin"
          variant="danger"
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
  icon,
  iconBg,
}: {
  label: string;
  value: number;
  color: string;
  icon: string;
  iconBg: string;
}) {
  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-4 flex items-center gap-3.5">
      <div
        className={`w-10 h-10 rounded-[9px] flex items-center justify-center flex-shrink-0 ${iconBg}`}
      >
        <span
          className={`material-symbols-outlined text-[20px] ${color}`}
          style={{ fontVariationSettings: "'FILL' 1" }}
        >
          {icon}
        </span>
      </div>
      <div>
        <p className="font-mono text-[10px] uppercase text-gray-500 mb-0.5 tracking-wider">
          {label}
        </p>
        <p className={`font-bold text-[22px] leading-tight ${color}`}>
          {value}
        </p>
      </div>
    </div>
  );
}
