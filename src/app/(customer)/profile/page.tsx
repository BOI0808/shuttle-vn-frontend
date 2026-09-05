"use client";

import { useState } from "react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { cn } from "@/utils";
import { useAuthStore } from "@/stores/auth.store";
import { ProfileSidebar } from "@/components/profile/ProfileSidebar";
import { ProfileInfoForm } from "@/components/profile/ProfileInfoForm";
import { ChangePasswordForm } from "@/components/profile/ChangePasswordForm";
import { SessionList } from "@/components/profile/SessionList";
import { DeactivateAccountModal } from "@/components/profile/DeactivateAccountModal";

type Tab = "info" | "password";

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState<Tab>("info");
  const [showDeactivateModal, setShowDeactivateModal] = useState(false);
  const router = useRouter();
  const { clearAuth } = useAuthStore();

  function handleConfirmDeactivate() {
    // TODO: gọi useDeactivateAccount() mutation khi có endpoint
    setShowDeactivateModal(false);
    clearAuth();
    toast.error("Tài khoản đã được vô hiệu hóa");
    router.push("/login");
  }

  return (
    <>
      <div className="max-w-[960px] mx-auto px-7 py-7">
        <div className="grid grid-cols-[280px_1fr] gap-6 items-start">
          {/* Left column */}
          <ProfileSidebar
            onRequestDeactivate={() => setShowDeactivateModal(true)}
          />

          {/* Right column: tabs */}
          <div>
            <div className="inline-flex gap-0.5 bg-slate-100 rounded-[9px] p-[3px] mb-5">
              <button
                onClick={() => setActiveTab("info")}
                className={cn(
                  "flex items-center gap-1.5 px-4 py-[7px] text-xs font-mono font-medium rounded-[7px] transition-all duration-150",
                  activeTab === "info"
                    ? "bg-white text-gray-900 shadow-[0_1px_3px_rgba(0,0,0,0.1)]"
                    : "text-slate-500 hover:text-gray-700"
                )}
              >
                <span className="material-symbols-outlined text-[16px]">
                  person
                </span>
                Thông tin
              </button>
              <button
                onClick={() => setActiveTab("password")}
                className={cn(
                  "flex items-center gap-1.5 px-4 py-[7px] text-xs font-mono font-medium rounded-[7px] transition-all duration-150",
                  activeTab === "password"
                    ? "bg-white text-gray-900 shadow-[0_1px_3px_rgba(0,0,0,0.1)]"
                    : "text-slate-500 hover:text-gray-700"
                )}
              >
                <span className="material-symbols-outlined text-[16px]">
                  lock
                </span>
                Bảo mật
              </button>
            </div>

            {activeTab === "info" && <ProfileInfoForm />}
            {activeTab === "password" && (
              <>
                <ChangePasswordForm />
                <SessionList />
              </>
            )}
          </div>
        </div>
      </div>

      <DeactivateAccountModal
        open={showDeactivateModal}
        onClose={() => setShowDeactivateModal(false)}
        onConfirm={handleConfirmDeactivate}
      />
    </>
  );
}
