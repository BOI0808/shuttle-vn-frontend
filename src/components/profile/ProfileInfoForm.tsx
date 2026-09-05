"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { useAuthStore } from "@/stores/auth.store";
import { getErrorMessage } from "@/utils";

const schema = z.object({
  fullName: z.string().min(2, "Họ tên không được để trống"),
  email: z.string().email("Email không hợp lệ"),
  phone: z.string().regex(/^0\d{9}$/, "Số điện thoại không hợp lệ"),
});

type FormData = z.infer<typeof schema>;

const inputClass =
  "w-full bg-gray-50 border border-gray-300 rounded-[7px] text-[#1a1a2e] text-sm pl-10 pr-3 py-[10px] outline-none transition-[border-color,box-shadow] duration-150 placeholder:text-gray-400 focus:border-emerald-500 focus:shadow-[0_0_0_3px_rgba(16,185,129,0.12)] focus:bg-white disabled:text-gray-500 disabled:cursor-not-allowed disabled:bg-gray-100 disabled:border-gray-200";

export function ProfileInfoForm() {
  const { user, setUser } = useAuthStore();
  const [isEditing, setIsEditing] = useState(false);

  const defaultValues: FormData = {
    fullName: user?.customer?.fullName ?? "",
    email: user?.customer?.email ?? "",
    phone: user?.customer?.phone ?? "",
  };

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({ resolver: zodResolver(schema), defaultValues });

  function handleEdit() {
    reset(defaultValues);
    setIsEditing(true);
  }

  function handleCancel() {
    reset(defaultValues);
    setIsEditing(false);
  }

  const onSubmit = (data: FormData) => {
    try {
      if (user) {
        setUser({
          ...user,
          customer: user.customer
            ? {
                ...user.customer,
                fullName: data.fullName,
                email: data.email,
                phone: data.phone,
              }
            : user.customer,
        });
      }
      // TODO: gọi useUpdateCustomerProfile() mutation khi có endpoint
      setIsEditing(false);
      toast.success("Thông tin đã được cập nhật");
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-[0_1px_3px_rgba(0,0,0,0.04)] p-6">
      <div className="flex items-center justify-between mb-[22px]">
        <div>
          <h2 className="text-[15px] font-bold text-gray-900 mb-0.5">
            Thông tin cá nhân
          </h2>
          <p className="text-xs text-gray-500">
            Cập nhật họ tên, email và số điện thoại
          </p>
        </div>
        {!isEditing && (
          <button
            onClick={handleEdit}
            className="inline-flex items-center gap-1.5 bg-white border border-gray-300 text-gray-500 rounded-[7px] px-3.5 py-[7px] text-xs font-mono font-medium transition-colors duration-150 hover:border-emerald-500 hover:text-emerald-600 hover:bg-green-50"
          >
            <span className="material-symbols-outlined text-[15px]">edit</span>
            Chỉnh sửa
          </button>
        )}
      </div>

      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-[18px]"
      >
        {/* Họ và tên */}
        <div>
          <label className="block text-[11px] font-semibold uppercase tracking-[0.06em] text-gray-500 mb-1.5 font-mono">
            Họ và tên
          </label>
          <div className="relative">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[17px] text-gray-400 pointer-events-none">
              person
            </span>
            <input
              disabled={!isEditing}
              className={inputClass}
              type="text"
              {...register("fullName")}
            />
          </div>
          {errors.fullName && (
            <p className="flex items-center gap-1 text-xs text-red-500 mt-1">
              <span className="material-symbols-outlined text-[14px]">
                error
              </span>
              {errors.fullName.message}
            </p>
          )}
        </div>

        {/* Email */}
        <div>
          <label className="block text-[11px] font-semibold uppercase tracking-[0.06em] text-gray-500 mb-1.5 font-mono">
            Email
            <span className="ml-1.5 bg-blue-50 text-blue-600 border border-blue-200 rounded px-1.5 py-px text-[10px] normal-case tracking-normal">
              Dùng để đăng nhập
            </span>
          </label>
          <div className="relative">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[17px] text-gray-400 pointer-events-none">
              mail
            </span>
            <input
              disabled={!isEditing}
              className={inputClass}
              type="email"
              {...register("email")}
            />
          </div>
          {errors.email && (
            <p className="flex items-center gap-1 text-xs text-red-500 mt-1">
              <span className="material-symbols-outlined text-[14px]">
                error
              </span>
              {errors.email.message}
            </p>
          )}
        </div>

        {/* Số điện thoại */}
        <div>
          <label className="block text-[11px] font-semibold uppercase tracking-[0.06em] text-gray-500 mb-1.5 font-mono">
            Số điện thoại
          </label>
          <div className="relative">
            <span className="material-symbols-outlined absolute left-3 top-1/2 -translate-y-1/2 text-[17px] text-gray-400 pointer-events-none">
              phone
            </span>
            <input
              disabled={!isEditing}
              className={inputClass}
              type="tel"
              {...register("phone")}
            />
          </div>
          {errors.phone && (
            <p className="flex items-center gap-1 text-xs text-red-500 mt-1">
              <span className="material-symbols-outlined text-[14px]">
                error
              </span>
              {errors.phone.message}
            </p>
          )}
        </div>

        {isEditing && (
          <div className="flex gap-2.5 pt-1">
            <button
              type="submit"
              className="inline-flex items-center gap-1.5 bg-emerald-500 text-white rounded-[7px] px-5 py-[10px] text-[13px] font-mono font-medium tracking-[0.04em] transition-colors duration-150 hover:bg-emerald-600"
            >
              <span className="material-symbols-outlined text-[16px]">
                save
              </span>
              Lưu thay đổi
            </button>
            <button
              type="button"
              onClick={handleCancel}
              className="inline-flex items-center gap-1.5 bg-white border border-gray-300 text-gray-500 rounded-[7px] px-4 py-[10px] text-[13px] font-mono font-medium transition-colors duration-150 hover:border-emerald-500 hover:text-emerald-600"
            >
              Hủy
            </button>
          </div>
        )}
      </form>
    </div>
  );
}
