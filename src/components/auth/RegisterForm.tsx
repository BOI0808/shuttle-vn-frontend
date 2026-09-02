"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";
import { Label } from "@/components/ui/Label";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import { useAuth } from "@/hooks/useAuth";
import { getErrorMessage } from "@/utils";

const registerSchema = z
  .object({
    fullName: z.string().min(2, "Họ tên tối thiểu 2 ký tự"),
    email: z.string().email("Vui lòng nhập đúng định dạng email"),
    phone: z
      .string()
      .regex(/^(0[3|5|7|8|9])+([0-9]{8})$/, "Số điện thoại không hợp lệ"),
    password: z.string().min(6, "Mật khẩu tối thiểu 6 ký tự"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Mật khẩu xác nhận không khớp",
    path: ["confirmPassword"],
  });

type RegisterFormData = z.infer<typeof registerSchema>;

export function RegisterForm() {
  const { register: registerUser, isRegistering } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const onSubmit = (data: RegisterFormData) => {
    registerUser(
      {
        username: data.email,
        fullName: data.fullName,
        email: data.email,
        phone: data.phone,
        password: data.password,
      },
      {
        onError: (error) => toast.error(getErrorMessage(error)),
      }
    );
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-[18px]"
    >
      {/* Họ và tên */}
      <div>
        <Label htmlFor="fullName" required>
          Họ và tên
        </Label>
        <Input
          id="fullName"
          type="text"
          placeholder="Nguyễn Văn A"
          icon={
            <span className="material-symbols-outlined text-[18px]">
              person
            </span>
          }
          error={errors.fullName?.message}
          {...register("fullName")}
        />
      </div>

      {/* Email */}
      <div>
        <Label htmlFor="email" required>
          Email
        </Label>
        <Input
          id="email"
          type="email"
          placeholder="example@gmail.com"
          icon={
            <span className="material-symbols-outlined text-[18px]">mail</span>
          }
          error={errors.email?.message}
          {...register("email")}
        />
      </div>

      {/* Số điện thoại */}
      <div>
        <Label htmlFor="phone" required>
          Số điện thoại
        </Label>
        <Input
          id="phone"
          type="tel"
          placeholder="090xxxxxxx"
          icon={
            <span className="material-symbols-outlined text-[18px]">phone</span>
          }
          error={errors.phone?.message}
          {...register("phone")}
        />
      </div>

      {/* Mật khẩu */}
      <div>
        <Label htmlFor="password" required>
          Mật khẩu
        </Label>
        <Input
          id="password"
          type="password"
          placeholder="••••••••"
          icon={
            <span className="material-symbols-outlined text-[18px]">lock</span>
          }
          error={errors.password?.message}
          {...register("password")}
        />
      </div>

      {/* Xác nhận mật khẩu */}
      <div>
        <Label htmlFor="confirmPassword" required>
          Xác nhận mật khẩu
        </Label>
        <Input
          id="confirmPassword"
          type="password"
          placeholder="••••••••"
          icon={
            <span className="material-symbols-outlined text-[18px]">
              lock_reset
            </span>
          }
          error={errors.confirmPassword?.message}
          {...register("confirmPassword")}
        />
      </div>

      <Button type="submit" loading={isRegistering} className="mt-1">
        ĐĂNG KÝ
      </Button>
    </form>
  );
}
