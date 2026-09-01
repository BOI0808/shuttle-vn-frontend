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

const loginSchema = z.object({
  email: z.string().email("Email không hợp lệ"),
  password: z.string().min(6, "Mật khẩu tối thiểu 6 ký tự"),
});

type LoginFormData = z.infer<typeof loginSchema>;

export function LoginForm() {
  const { login, isLoggingIn } = useAuth();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = (data: LoginFormData) => {
    login(
      {
        username: data.email,
        password: data.password,
      },
      {
        onError: (error) => toast.error(getErrorMessage(error)),
      }
    );
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-5">
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
        <div className="text-right mt-1.5">
          <a
            href="#"
            className="text-xs text-emerald-500 font-medium hover:text-emerald-600 transition-colors"
          >
            Quên mật khẩu?
          </a>
        </div>
      </div>

      <Button type="submit" loading={isLoggingIn} className="mt-1">
        ĐĂNG NHẬP
      </Button>
    </form>
  );
}
