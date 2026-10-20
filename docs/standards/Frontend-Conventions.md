# QUY ƯỚC LẬP TRÌNH FRONTEND (FRONTEND CONVENTIONS) – SHUTTLEVN
### Bộ Tiêu chuẩn Mã nguồn, Quy chuẩn Đặt tên & Thực hành Lập trình Tốt nhất

**Hệ thống Quản lý và Đặt sân Cầu lông Trực tuyến ShuttleVN**  
**Phiên bản tài liệu:** 1.0 · **Ngày cập nhật:** 20/10/2026  
**Căn cứ kỹ thuật & mã nguồn thực tế:**
- Framework: Next.js 16/15 (App Router), React 19, TypeScript 5 (chế độ `strict: true`).
- Styling: Tailwind CSS v4, Material Symbols Outlined, CSS Modules / Global CSS utilities.
- State & Data: TanStack Query v5, Zustand v5, Axios with CSRF/401 Interceptors, React Hook Form, Zod v3.
- Hồ sơ quy chuẩn: `SRS.md` v1.7, `UseCase.md` v1.5, `User-Flows.md` v1.1, `Wireframes.md` v2.0, `UI-screens.md` v2.0, `Design-System.md` v1.0, `Frontend-Architecture.md` v1.0.

> **NGUYÊN TẮC BẮT BUỘC:**
> 1. **100% Đồng nhất với Codebase:** Mọi quy tắc trong tài liệu này đều dựa trên cấu trúc thư mục, tệp cấu hình và mã nguồn đang chạy thực tế trong `src/`.
> 2. **Bảo đảm Nghiệp vụ Chuẩn:** Nghiêm cấm đưa vào mã nguồn các tính năng đã bị loại bỏ (như Tỷ lệ lấp đầy `X-04`, chấm công/ca làm việc, nút tạo hóa đơn thủ công `D-07`).
> 3. **Rõ ràng - Rành mạch - Có ví dụ Đối chiếu (Do & Don't):** Cung cấp mẫu code chuẩn xác cho từng quy tắc để lập trình viên áp dụng ngay mà không có sự nhập nhằng.

---

## MỤC LỤC

1. [Quy ước Đặt tên Tệp & Thư mục (File & Directory Naming)](#1-quy-ước-đặt-tên-tệp--thư-mục-file--directory-naming)
2. [Quy chuẩn TypeScript & Type Safety](#2-quy-chuẩn-typescript--type-safety)
3. [Quy chuẩn Cấu trúc Component & Hooks (React Patterns)](#3-quy-chuẩn-cấu-trúc-component--hooks-react-patterns)
4. [Quy ước Import & Tổ chức Phụ thuộc (Import Ordering)](#4-quy-ước-import--tổ-chức-phụ-thuộc-import-ordering)
5. [Quy chuẩn Styling & Tailwind CSS](#5-quy-chuẩn-styling--tailwind-css)
6. [Quy chuẩn Quản lý Dữ liệu & TanStack Query](#6-quy-chuẩn-quản-lý-dữ-liệu--tanstack-query)
7. [Quy chuẩn Biểu mẫu & Xác thực Dữ liệu (Form & Zod Validation)](#7-quy-chuẩn-biểu-mẫu--xác-thực-dữ-liệu-form--zod-validation)
8. [Quy chuẩn Nghiệp vụ & Dữ liệu Miền (Domain-Specific Rules)](#8-quy-chuẩn-nghiệp-vụ--dữ-liệu-miền-domain-specific-rules)
9. [Quy ước Xử lý Lỗi, Thông báo & Logging](#9-quy-ước-xử-lý-lỗi-thông-báo--logging)
10. [Quy trình Git & Kiểm tra Trước khi Commit (Pre-commit Checklist)](#10-quy-trình-git--kiểm-tra-trước-khi-commit-pre-commit-checklist)

---

## 1. QUY ƯỚC ĐẶT TÊN TỆP & THƯ MỤC (FILE & DIRECTORY NAMING)

Mọi tệp tin và thư mục trong dự án phải tuân thủ nghiêm ngặt bảng quy ước sau:

| Đối tượng | Quy ước Đặt tên | Định dạng Mở rộng | Ví dụ Chuẩn trong Codebase |
|---|---|---|---|
| **React Components** | `PascalCase` | `.tsx` | `BookingCard.tsx`, `CourtGrid.tsx`, `SlotPopup.tsx`, `ConfirmDialog.tsx` |
| **Next.js Pages / Layouts** | `kebab-case` / lowercase | `.tsx` | `page.tsx`, `layout.tsx`, `providers.tsx` |
| **Next.js API Routes** | lowercase | `.ts` | `src/app/api/chat/route.ts` |
| **Route Groups (Next.js)** | `(kebab-case)` | Thư mục | `(auth)`, `(customer)`, `(admin)` |
| **Custom Hooks** | `useCamelCase` | `.ts` | `useAuth.ts`, `useBooking.ts`, `useCourt.ts`, `useEmployee.ts` |
| **Zustand Stores** | `kebab-case.store` | `.ts` | `auth.store.ts`, `booking-cart.store.ts` |
| **Domain Services** | `camelCase.service` | `.ts` | `auth.service.ts`, `booking.service.ts`, `court.service.ts` |
| **TypeScript Types** | `kebab-case` | `.ts` | `booking.ts`, `court.ts`, `auth.ts`, `api.ts`, `audit.ts` |
| **Utility Functions** | `kebab-case` | `.ts` | `auth-mapper.ts`, `index.ts` |
| **Config Files** | `kebab-case` hoặc `camelCase` | `.ts` / `.mts` | `app.ts`, `tailwind.config.mts`, `next.config.ts` |

### Quy tắc Thư mục Bắt buộc:
1. **Không tạo thư mục viết hoa:** Tên thư mục luôn là `kebab-case` hoặc lowercase (ví dụ: `components/admin`, `components/court`, `hooks`, `services`).
2. **Không đặt tên file mơ hồ:** Không đặt tên file dạng `utils2.ts`, `helper.ts`, `data.ts` chung chung. Mỗi file tiện ích phải phản ánh rõ nhiệm vụ (ví dụ: `auth-mapper.ts`).

---

## 2. QUY CHUẨN TYPESCRIPT & TYPE SAFETY

Dự án bật chế độ kiểm tra nghiêm ngặt `strict: true` trong `tsconfig.json`. Mọi đóng góp mã nguồn phải bảo đảm 100% Type-safe.

### 2.1 Quy ước sử dụng `interface` vs `type`
- **Sử dụng `interface`:** Cho định nghĩa cấu trúc đối tượng (Entities, Models, Props của Component):
  ```typescript
  // CHUẨN: Dùng interface cho props và data entities
  export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    loading?: boolean;
    variant?: "primary" | "ghost" | "outline";
    size?: "sm" | "md" | "lg";
    children: ReactNode;
  }

  export interface Booking {
    bookingId: string;
    bookingCode: string;
    courtId: number;
    status: BookingStatus;
    totalCost: number;
  }
  ```
- **Sử dụng `type`:** Cho kiểu kết hợp (Union Types), kiểu nguyên thủy, Tuple, hoặc trích xuất từ schema:
  ```typescript
  // CHUẨN: Dùng type cho union và type inference
  export type BookingStatus = "Pending" | "Confirmed" | "Completed" | "Cancelled";
  export type UserRole = "Admin" | "Employee" | "Customer";
  export type CreateFormData = z.infer<typeof createSchema>;
  ```

### 2.2 Quy tắc Cấm & Hạn chế trong TypeScript
- **Tuyệt đối cấm sử dụng `any`:**
  - ❌ `const data: any = response.data;`
  - ✅ `const data: ApiResponse<Booking> = response.data;`
  - Trường hợp ngoại lệ chưa rõ kiểu: Dùng `unknown` và bóc tách an toàn bằng type guards.
- **Không ép kiểu bừa bãi (Type Assertions):**
  - Tránh lạm dụng `as T` trừ khi làm việc với thư viện bên ngoài hoặc ref DOM (`e.currentTarget as HTMLElement`).
- **Tận dụng OpenAPI Schema:**
  - Các kiểu dữ liệu cốt lõi phải tham chiếu hoặc đồng bộ với `src/api/schema.d.ts` (ví dụ `CourtStatus = components["schemas"]["CourtStatus"]`).

---

## 3. QUY CHUẨN CẤU TRÚC COMPONENT & HOOKS (REACT PATTERNS)

### 3.1 Khai báo Component (Named Exports)
- **Luôn sử dụng Named Export:** Giúp IDE auto-import chính xác và ngăn ngừa sai lệch tên khi refactor:
  ```tsx
  // CHUẨN
  export function BookingCard({ booking, onCancel }: BookingCardProps) { ... }

  // KHÔNG DÙNG cho component thông thường
  const BookingCard = (...) => { ... };
  export default BookingCard;
  ```
- *Ngoại lệ:* Chỉ sử dụng `export default` cho các tệp trang Next.js (`src/app/**/page.tsx`) và client page wrappers theo yêu cầu của Next.js App Router.

### 3.2 Thứ tự Tổ chức Nội dung Bên trong Component
Để mã nguồn dễ đọc và bảo trì, mọi React Component phải tuân theo thứ tự 5 phần từ trên xuống dưới:

```tsx
"use client"; // 1. Directive (nếu là Client Component)

// 2. Imports (tuân thủ nhóm import chuẩn)
import { useState, useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import type { Booking } from "@/types";
import { formatCurrency } from "@/utils";

// 3. Types / Interfaces nội bộ của Component
interface BookingItemProps {
  booking: Booking;
  onSelect: (id: string) => void;
}

// 4. Khai báo Component chính
export function BookingItem({ booking, onSelect }: BookingItemProps) {
  // A. Hooks: Router, Stores, Queries, Mutations, State, Refs
  const [isExpanded, setIsExpanded] = useState(false);

  // B. Derived State (Giá trị tính toán)
  const isPending = booking.status === "Pending";
  const formattedPrice = formatCurrency(booking.totalCost);

  // C. Event Handlers (Đầu ngữ "handle...")
  const handleToggle = useCallback(() => {
    setIsExpanded((prev) => !prev);
    onSelect(booking.bookingId);
  }, [booking.bookingId, onSelect]);

  // D. Early Returns (Loading, Error, Empty State)
  if (!booking) return null;

  // E. Main JSX Return
  return (
    <div className="border border-gray-200 rounded-xl p-4">
      <div className="flex justify-between items-center">
        <span className="font-mono font-bold">{booking.bookingCode}</span>
        <Badge status={booking.status}>{booking.status}</Badge>
      </div>
      <Button size="sm" onClick={handleToggle}>
        Chi tiết · {formattedPrice}
      </Button>
    </div>
  );
}
```

### 3.3 Quy ước Đặt tên Props & Handlers
- **Props truyền từ component cha vào:** Sử dụng tiền tố `on[HànhĐộng]` (ví dụ: `onConfirm`, `onCancel`, `onStatusChange`, `onClose`).
- **Hàm xử lý nội bộ trong component:** Sử dụng tiền tố `handle[HànhĐộng]` (ví dụ: `handleSubmit`, `handleSelectDuration`, `handleOpenModal`).

---

## 4. QUY ƯỚC IMPORT & TỔ CHỨC PHỤ THUỘC (IMPORT ORDERING)

Mọi tệp tin phải nhóm các câu lệnh `import` thành **5 nhóm rõ ràng**, mỗi nhóm cách nhau bởi 1 dòng trống:

```typescript
// Nhóm 1: React & Next.js Core
import { useState, useEffect, useCallback, useMemo } from "react";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";

// Nhóm 2: Thư viện bên thứ ba (Third-party)
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { toast } from "sonner";

// Nhóm 3: Components nội bộ (@/components/...)
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { Card } from "@/components/ui/Card";
import { Input } from "@/components/ui/Input";
import { ConfirmDialog } from "@/components/ui/ConfirmDialog";

// Nhóm 4: Hooks, Stores & Services nội bộ
import { useAuth } from "@/hooks/useAuth";
import { useBooking } from "@/hooks/useBooking";
import { useAuthStore } from "@/stores/auth.store";
import { bookingService } from "@/services";

// Nhóm 5: Types, Utils, Configs (@/types, @/utils, @/config)
import type { Booking, BookingStatus } from "@/types";
import { QUERY_KEYS, APP_CONFIG } from "@/config/app";
import { cn, formatCurrency, formatDate, getErrorMessage } from "@/utils";
```

> **CẤM:** Tuyệt đối không dùng relative import quá 2 cấp như `../../../components/ui/Button`. Luôn sử dụng path alias `@/components/...`.

---

## 5. QUY CHUẨN STYLING & TAILWIND CSS

### 5.1 Sử dụng Hàm Tiện ích `cn()`
Mọi hành động ghép nối lớp CSS hoặc class có điều kiện **bắt buộc** phải sử dụng hàm `cn()` (`twMerge(clsx(...))` định nghĩa tại `src/utils/index.ts`):

```tsx
// CHUẨN: Sử dụng cn() để merge class và xử lý conditional rendering
<div className={cn(
  "w-full bg-white border rounded-[7px] p-3 transition-colors",
  isHourSep ? "border-r-gray-300" : "border-r-gray-200",
  isActive && "border-emerald-500 bg-emerald-50/50",
  className
)} />

// CẤM: Ghép chuỗi thủ công bằng template string vì dễ gây xung đột class Tailwind
<div className={`w-full bg-white ${isActive ? "bg-emerald-50" : "bg-white"} ${className}`} />
```

### 5.2 Không Dùng Inline Styles Tùy tiện
- **Quy tắc:** Tuyệt đối không viết `style={{ ... }}` cho các thuộc tính tĩnh mà Tailwind đã hỗ trợ (như `color`, `padding`, `margin`, `display`, `flex`).
- **Ngoại lệ duy nhất:** Chỉ dùng inline style cho các giá trị động được tính toán theo thời gian thực (ví dụ: tọa độ `x`, `y` của `SlotPopup.tsx`, tỷ lệ phần trăm `nowFrac` của vạch giờ hiện tại).

### 5.3 Phân cấp Typography & Màu sắc Chuẩn hóa
- **Chữ nội dung, mô tả, form:** Luôn mang lớp `font-sans` (`Inter`).
- **Tiêu đề trang, tên sân, logo:** Luôn mang lớp `font-display` (`Hanken Grotesk`).
- **Mã số, tiền tệ, ngày giờ, nhãn badge, button label:** Luôn mang lớp `font-mono` (`JetBrains Mono`).

---

## 6. QUY CHUẨN QUẢN LÝ DỮ LIỆU & TANSTACK QUERY

### 6.1 Sử dụng Hằng số `QUERY_KEYS` Tập trung
- Mọi câu lệnh `useQuery` và `invalidateQueries` phải lấy key từ đối tượng `QUERY_KEYS` trong `src/config/app.ts`:
  ```typescript
  // CHUẨN
  export function useCourts() {
    return useQuery({
      queryKey: QUERY_KEYS.courts,
      queryFn: courtService.getCourts,
    });
  }

  // CẤM: Tự viết string key tự do dễ gây xung đột hoặc sót cache
  useQuery({ queryKey: ["all-courts-list"], ... });
  ```

### 6.2 Quản lý Mutation & Invalidation
- Mọi thay đổi dữ liệu (Tạo, Sửa, Xóa, Đổi trạng thái) phải được đóng gói trong một custom hook `useMutation`:
  ```typescript
  export function useCancelBooking() {
    const queryClient = useQueryClient();
    return useMutation({
      mutationFn: (id: string) => bookingService.cancelBooking(id),
      onSuccess: () => {
        // Tự động làm mới danh sách đơn của tôi
        queryClient.invalidateQueries({ queryKey: QUERY_KEYS.myBookings });
        // Làm mới ma trận lưới sân vì slot vừa được giải phóng
        queryClient.invalidateQueries({ queryKey: QUERY_KEYS.courtGrids });
      },
    });
  }
  ```

---

## 7. QUY CHUẨN BIỂU MẪU & XÁC THỰC DỮ LIỆU (FORM & ZOD VALIDATION)

### 7.1 Cấu trúc Biểu mẫu Chuẩn với `zod` và `react-hook-form`
Mọi form nhập liệu phải khai báo schema Zod ở ngoài component và suy diễn kiểu bằng `z.infer`:

```typescript
// 1. Khai báo Schema Zod bên ngoài component
export const registerSchema = z.object({
  fullName: z
    .string()
    .trim()
    .min(2, "Họ và tên tối thiểu 2 ký tự"),
  phone: z
    .string()
    .trim()
    .regex(/^(\+84|0)[1-9][0-9]{7,13}$/, "Số điện thoại phải từ 8 đến 15 chữ số"),
  email: z
    .string()
    .trim()
    .toLowerCase()
    .email("Vui lòng nhập đúng định dạng email"),
  password: z
    .string()
    .min(8, "Mật khẩu tối thiểu 8 ký tự")
    .max(128, "Mật khẩu tối đa 128 ký tự"),
  confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Xác nhận mật khẩu không khớp",
  path: ["confirmPassword"],
});

// 2. Suy diễn kiểu TypeScript tự động
export type RegisterFormData = z.infer<typeof registerSchema>;
```

### 7.2 Quy chuẩn Thông báo Lỗi Form
- Thông báo lỗi phải viết bằng **Tiếng Việt thân thiện**, chỉ rõ hành động người dùng cần thực hiện (ví dụ: *"Vui lòng nhập đúng định dạng email"*, không viết *"Invalid email format"*).
- Trường bắt buộc phải có dấu hoa thị màu đỏ: `<Label required>HỌ VÀ TÊN</Label>`.

---

## 8. QUY CHUẨN NGHIỆP VỤ & DỮ LIỆU MIỀN (DOMAIN-SPECIFIC RULES)

Nhằm bảo đảm tính nhất quán tuyệt đối giữa mã nguồn và các quyết định kiến trúc đã thống nhất:

### 8.1 Quy tắc Mã định danh (Code Identifiers)
- **Mã Đặt sân:** Tiền tố bắt buộc `DS-` (ví dụ `DS-10294`, `DS-7K3QP`).
- **Mã Hóa đơn:** Tiền tố bắt buộc `HD-` kèm định dạng ngày và số thứ tự (`HD-{yyyyMMdd}-{STT}`, ví dụ `HD-20261020-001`).
- **Mã Sân:** Định dạng hiển thị `ID-{STT}` (ví dụ `ID-001`, `ID-002`).

### 8.2 Quy tắc Trạng thái Hóa đơn & Đặt sân
1. **Không có Nút Tạo Hóa đơn Thủ công (D-07):**
   - Hóa đơn chỉ được sinh tự động duy nhất 1 lần khi nhân viên bấm "Xác nhận đặt sân" (`Pending → Confirmed`).
   - Cấm viết thêm nút "Tạo hóa đơn" độc lập trên giao diện.
2. **Loại bỏ Nút Hóa đơn trên Thẻ của Khách (D-13):**
   - Khách hàng chỉ xem lịch sử đặt sân của mình. Không hiển thị nút "Hóa đơn" trên `BookingCard.tsx`.
3. **Nhãn Thanh toán cho đơn Pending (D-12, SRS 3.3):**
   - Với các đơn đang ở trạng thái `Pending` (Chờ xác nhận), nhãn thanh toán **bắt buộc hiển thị là "Chưa lập hóa đơn"** (`NO_INVOICE_LABEL`), không hiển thị là "Chưa thanh toán".

### 8.3 Quy tắc Đặt sân Vãng lai vs Đặt tại Quầy
- **Khách vãng lai tự đặt qua Web (`WF-04`, `X-01`, `X-07`):**
  - Bắt buộc nhập đầy đủ: Họ tên, Số điện thoại, Email.
  - Bắt buộc kích hoạt **Modal OTP M-01** để xác minh email trước khi tạo đơn.
- **Nhân viên Đặt tại quầy thay khách (`WF-12`, `M-11`, `X-05`):**
  - Không gửi OTP qua email của khách. Đơn được tạo trực tiếp.

### 8.4 Quy tắc Bảo vệ Quản trị viên Cuối cùng (`BR-27`, `UC-38 E1`)
- Trong các thao tác Khóa tài khoản, Hạ quyền hoặc Xóa tài khoản nhân viên (`WF-16`):
  - Phải kiểm tra điều kiện: Nếu tài khoản là Quản trị viên Hoạt động (`ACTIVE`) duy nhất còn lại trong hệ thống, hệ thống **chặn hoàn toàn thao tác** và hiển thị thông báo lỗi rõ ràng.

### 8.5 Loại bỏ Triệt để Dữ liệu Lỗi thời (`X-04`)
- Cấm đưa vào giao diện:
  - Chỉ số "Tỷ lệ lấp đầy" (Occupancy Rate).
  - Quản lý ca làm việc, chấm công, ngày nghỉ nhân viên.
  - Quản lý phiên đăng nhập/thiết bị của khách hàng.
  - Cảnh báo phần cứng, CPU, sao lưu trong Nhật ký hoạt động.

---

## 9. QUY ƯỚC XỬ LÝ LỖI, THÔNG BÁO & LOGGING

### 9.1 Bóc tách Lỗi API qua hàm `getErrorMessage()`
Khi bắt lỗi từ API (trong `catch` hoặc `onError`), bắt buộc truyền lỗi qua hàm `getErrorMessage()` trong `src/utils/index.ts`:

```typescript
// CHUẨN
try {
  await authService.login(credentials);
  toast.success("Đăng nhập thành công!");
} catch (error) {
  toast.error(getErrorMessage(error));
}
```

### 9.2 Phân định Phương thức Phản hồi
- **Toast Notifications (`sonner`):** Dùng cho kết quả hành động tức thời có thể biến mất sau 3 giây (Lưu thành công, Thêm vào giỏ thành công, Lỗi mạng).
- **Banner Lỗi trong Trang / Modal:** Dùng cho lỗi chặn luồng nghiệp vụ (Ví dụ: Tài khoản bị khóa do nhập sai mật khẩu 5 lần theo `BR-12`, đơn không thể hủy vì đã thanh toán).

### 9.3 Quy tắc Dọn dẹp `console.log`
- Cấm để lại `console.log` debug trong mã nguồn production.
- Các handler đang là `TODO` trong quá trình phát triển phải được ghi chú rõ: `// TODO: Implement Modal M-06 (UC-09)`.

---

## 10. QUY TRÌNH GIT & KIỂM TRA TRƯỚC KHI COMMIT (PRE-COMMIT CHECKLIST)

### 10.1 Định dạng Commit Message (Conventional Commits)
Mọi commit message phải có tiền tố phản ánh chính xác phạm vi thay đổi:
- `feat:` Thêm màn hình hoặc tính năng mới (ví dụ: `feat(booking): add 30-minute slot duration option`).
- `fix:` Sửa lỗi giao diện hoặc logic nghiệp vụ (ví dụ: `fix(auth): redirect employee to booking-requests instead of dashboard`).
- `refactor:` Tái cấu trúc mã nguồn không làm đổi tính năng (ví dụ: `refactor(sidebar): implement role-based menu filtering`).
- `docs:` Chỉnh sửa tài liệu (ví dụ: `docs: update Design-System.md with z-index scale`).
- `style:` Chỉnh sửa format CSS, spacing, typography (ví dụ: `style: update button font-mono and padding`).

### 10.2 Checklist Bắt buộc Trước khi Push Code (Pre-commit Checklist)
Trước khi tạo Pull Request hoặc hoàn tất công việc, lập trình viên phải chạy kiểm tra:

- [ ] **Kiểm tra TypeScript không có lỗi:** `npm run type-check` (lệnh `tsc --noEmit` phải kết thúc với exit code 0).
- [ ] **Kiểm tra Linting:** `npm run lint` không có lỗi cú pháp hoặc cảnh báo nghiêm trọng.
- [ ] **Không sót `console.log` debug:** Đã dọn dẹp các lệnh in log thừa.
- [ ] **Sử dụng đúng hàm tiện ích:** Mọi className ghép nối đều qua hàm `cn()`.
- [ ] **Định dạng tiền & ngày:** Đã dùng `formatCurrency()`, `formatDate()` / `formatDateTime()`.
- [ ] **Không hardcode chuỗi API:** Mọi endpoint đều gọi qua Service Layer và `axiosInstance`.

---

*Tài liệu được biên soạn đồng bộ, kiểm duyệt nghiêm ngặt dựa trên toàn bộ mã nguồn thực tế và hệ thống tiêu chuẩn kỹ thuật của ShuttleVN.*

