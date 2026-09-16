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
    code: z.string().min(1, "Vui lòng nhập mã xác thực"),
    password: z.string().min(6, "Mật khẩu tối thiểu 6 ký tự"),
    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Mật khẩu xác nhận không khớp",
    path: ["confirmPassword"],
  });

type RegisterFormData = z.infer<typeof registerSchema>;

export function RegisterForm() {
  const {
    register: registerUser,
    isRegistering,
    sendVerificationCode,
  } = useAuth();

  const {
    register,
    handleSubmit,
    watch,
    getValues,
    trigger,
    formState: { errors },
  } = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
  });

  const emailValue = watch("email");

  const handleGetCode = async () => {
    const isEmailValid = await trigger("email");
    if (!isEmailValid) return;

    try {
      await sendVerificationCode(getValues("email"), "VerifyEmail");
      toast.success("Mã xác thực đã được gửi đến email của bạn");
    } catch (error) {
      toast.error(getErrorMessage(error));
    }
  };

  const onSubmit = (data: RegisterFormData) => {
    registerUser(
      {
        fullName: data.fullName,
        email: data.email,
        phone: data.phone,
        code: data.code,
        password: data.password,
        confirmPassword: data.confirmPassword,
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
        <div className="flex gap-2">
          <Input
            id="email"
            type="email"
            placeholder="example@gmail.com"
            icon={
              <span className="material-symbols-outlined text-[18px]">
                mail
              </span>
            }
            error={errors.email?.message}
            {...register("email")}
            containerClassName="flex-1"
          />
          <Button
            type="button"
            variant="outline"
            className="whitespace-nowrap h-[42px] w-auto"
            onClick={handleGetCode}
            disabled={!emailValue}
          >
            Lấy mã
          </Button>
        </div>
      </div>

      {/* Mã xác thực */}
      <div>
        <Label htmlFor="code" required>
          Mã xác thực
        </Label>
        <Input
          id="code"
          type="text"
          placeholder="Nhập mã xác thực từ email"
          icon={
            <span className="material-symbols-outlined text-[18px]">
              verified_user
            </span>
          }
          error={errors.code?.message}
          {...register("code")}
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
