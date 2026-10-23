# ShuttleVN

> Tài liệu hướng dẫn chính cho mọi AI coding agent (Codex, Claude Code, Gemini CLI...) khi làm việc trong codebase **frontend** này.
> Đọc file này trước mỗi task để đảm bảo output đúng convention và production-ready.
> Nội dung phản ánh codebase tại 23/10/2026. Phần đánh dấu **(mục tiêu)** là chuẩn sẽ triển khai, chưa có trong code.

## Tài liệu liên quan (đọc trước khi làm UI)

| Việc | Đọc |
|---|---|
| Màn hình nào làm gì, hiện trạng vs chuẩn, thứ tự ưu tiên, quyết định đã chốt | `docs/design/UI-screens.md` (đặc biệt §7, §8) |
| Token, component dùng chung, quy tắc thị giác | `docs/design/Design-System.md` |
| Wireframe, luồng người dùng | `docs/design/Wireframes.md`, `docs/design/User-Flows.md` |
| Kiến trúc, convention chi tiết | `docs/architecture/Frontend-Architecture.md`, `docs/standards/Frontend-Conventions.md` |
| Nghiệp vụ gốc (SRS, UseCase), API backend | `ShuttleVNBackend/docs/product/SRS.md`, `UseCase.md`; `docs/api/swagger.json` |

Khi tài liệu mâu thuẫn nhau: **SRS/UseCase** → quyết định trong `UI-screens.md` §8 → Wireframes → code hiện tại.

## Quy tắc cứng (KHÔNG BAO GIỜ vi phạm)

### Before writing code

Luôn:

1. Đọc các file liên quan trước khi chỉnh sửa.
2. Tìm các implementation hiện có trước khi tạo mới.
3. Ưu tiên tái sử dụng các hook, component và utility có sẵn khi có thể.
4. Chỉ thực hiện những thay đổi tối thiểu cần thiết.
5. Không chỉnh sửa hoặc viết lại những phần code không liên quan.
6. Sau khi hoàn thành, giải thích ngắn gọn những gì đã thay đổi.

### Coding Style

- Ưu tiên chỉnh sửa các file hiện có.
- Chỉ tạo file mới khi thực sự cần thiết.
- Ưu tiên giữ mỗi hàm dưới 50 dòng nếu hợp lý.
- Mỗi component chỉ nên đảm nhiệm một trách nhiệm chính.
- Tuân thủ cấu trúc thư mục và convention hiện có của project.
- File <= **1000 dòng** (chạm 300 là tín hiệu nên tách).
- Function complexity < **15** (refactor: lookup table, early return, split).

### Before finishing

Luôn chạy:

- `npm run type-check` (script là `tsc --noEmit`; **không** có script `typecheck`)
- `npm run lint` (script là `next lint`; repo hiện **chưa có file cấu hình ESLint** và Next.js 16 có thể không còn lệnh này. Nếu lệnh lỗi vì thiếu cấu hình/lệnh, báo rõ trong phần giải thích cuối task, không tự bỏ qua im lặng)

Khắc phục toàn bộ lỗi do thay đổi của bạn trước khi hoàn thành task.

---

## 1. Project Overview

**ShuttleVN** là hệ thống quản lý và đặt sân cầu lông trực tuyến với **ba vai trò**:

| Role | Chức năng chính (theo SRS/UseCase) |
| --- | --- |
| **Customer** | Xem lưới sân và bảng giá; đặt sân khi có tài khoản; **đặt nhanh không tài khoản** bằng email + mã OTP; tra cứu đơn bằng mã + SĐT/Email; xem lịch sử; **khách thành viên** tự hủy/đổi lịch đơn chưa thanh toán còn ≥ 1 giờ (khách vãng lai và đơn đã thanh toán phải qua nhân viên); hồ sơ cá nhân; hỏi trợ lý AI |
| **Employee (Nhân viên)** | Xác nhận/từ chối yêu cầu đặt sân, ghi nhận hoàn thành, hủy do sự cố, tạo lịch đặt thay khách tại quầy, thu tiền hóa đơn, quản lý lịch sân/trạng thái sân, quản lý hồ sơ khách và khóa/mở khóa tài khoản khách |
| **Admin (Quản trị viên)** | Mọi quyền của nhân viên + dashboard, quản lý sân và bảng giá, nhân viên và phân quyền, xem toàn bộ đặt sân, báo cáo doanh thu/đặt sân, nhật ký hoạt động |

Hóa đơn **không** do nhân viên lập thủ công: hệ thống tự lập đúng một hóa đơn khi đơn được xác nhận (xem §4).

**Tech Stack (theo `package.json`):**

- **Framework:** Next.js **16** (`^16.2`), App Router, React **19**
- **Language:** TypeScript strict (no `any`)
- **State:** Zustand v5 (chỉ `auth.store`, **không persist**) + TanStack Query v5
- **HTTP:** Axios, `baseURL: "/api"`, cookie phiên do trình duyệt quản lý
- **Forms:** React Hook Form + Zod (`@hookform/resolvers`)
- **Styling:** Tailwind CSS **v4** (`@import "tailwindcss"` + `@config "../../tailwind.config.mts"`, PostCSS `@tailwindcss/postcss`)
- **Ngày giờ:** `date-fns` (+ locale `vi`)
- **Charts:** Recharts (dùng cho báo cáo doanh thu, WF-18)
- **Notifications:** Sonner
- **Icon:** Google Material Symbols Outlined (`<span className="material-symbols-outlined">`). `lucide-react` có trong dependencies nhưng **chưa được dùng**, không đưa vào component mới
- **AI:** route `/api/chat` gọi Anthropic server-side với **system prompt cố định**; **chưa có Function Calling** (xem §4)
- **Backend:** ASP.NET Core Web API – do NOT write C# code

---

## 2. Project Structure

```
src/
├── api/schema.d.ts             # Kiểu sinh từ OpenAPI (docs/api/swagger.json) – không sửa tay
├── proxy.ts                    # Next.js 16 proxy (thay middleware.ts): chỉ kiểm tra cookie phiên
├── app/
│   ├── layout.tsx              # Root layout (Inter + Hanken Grotesk + JetBrains Mono, Providers)
│   ├── page.tsx                # redirect('/courts')
│   ├── providers.tsx           # QueryClientProvider + AuthProvider + Toaster + DevTools
│   ├── globals.css             # Tailwind v4 + slot-* utility classes
│   ├── api/chat/route.ts       # AI chatbot (Anthropic, server-side)
│   ├── (auth)/                 # login, register
│   ├── (customer)/             # courts, booking, booking/guest, my-bookings, lookup, profile
│   └── (admin)/                # dashboard, schedule, payments, manage-courts, customers,
│                               # employees, statistics, audits   (URL KHÔNG có tiền tố /admin)
├── types/                      # api, auth, booking, court, dashboard, chat, audit, index (barrel)
├── config/app.ts               # APP_CONFIG, label maps, BOOKING_STATUS_COLOR, QUERY_KEYS
├── lib/                        # axios.ts, query-client.ts
├── services/                   # auth, court, booking, customer, dashboard, employee – wrapper API mỏng
├── hooks/                      # useAuth, useCourt, useBooking, useDashboard, useEmployee
├── stores/                     # auth.store (không persist); booking-cart.store (không còn được dùng)
├── mocks/                      # config.ts (IS_MOCK) + data/ – chỉ cho phát triển cục bộ
├── utils/                      # index.ts (cn, formatCurrency, formatDate, getErrorMessage...), auth-mapper.ts
└── components/
    ├── layout/                 # CustomerNav, AdminSidebar, AdminHeader, auth-provider
    ├── ui/                     # Button, Input, Label, Card, Badge, ConfirmDialog, Pagination,
    │                           # CustomDatePicker, UserMenu, LoginButton
    ├── auth/                   # LoginForm, RegisterForm, RoleGuard
    ├── court/                  # CourtGrid, CourtSlotCell, SlotPopup
    ├── booking/                # ReservationForm, BookingHistoryList, BookingCard, BookingListToolBar,
    │                           # BookingLookupForm, BookingLookupResult
    ├── profile/                # ProfileInfoForm, ProfileSidebar, ChangePasswordForm
    └── admin/                  # DashboardStats, RevenueChart, CourtStats, CourtCardGrid, CourtTable,
                                # CourtFormModal, CourtStatusModal, CourtOperationsModal, PricingTimeline,
                                # EmployeeFormModal
```

**Route khu quản trị (mục tiêu, `UI-screens.md` §2.6):** chuyển sang `/admin/*` bằng thư mục `src/app/(admin)/admin/...` (`/admin/dashboard`, `/admin/booking-requests`, `/admin/bookings`, `/admin/bookings/[id]`, `/admin/court-schedule`, `/admin/payments`, `/admin/customers`, `/admin/courts`, `/admin/staff`, `/admin/accounts`, `/admin/reports`, `/admin/audit-log`), kèm redirect route cũ. **Trang admin mới phải tạo trực tiếp ở đường dẫn mới**, không tạo thêm trang theo URL cũ.

Không tồn tại (đừng tham chiếu): `BookingCart`, `BookingForm`, `WalkInBookingForm`, `ScheduleTimeline`, `PaymentConfirmation`, `components/chatbot/*`, `components/ui/Modal`. Modal hiện tự dựng bằng `fixed inset-0` trong từng component.

---

## 3. Coding Rules

### TypeScript

- **Không dùng `any`** – dùng `unknown` + type guard hoặc proper generic.
- Mọi type/interface export từ `src/types/` và re-export qua `src/types/index.ts`. Type API lấy từ `@/api/schema` (qua `src/types/api.ts`), không khai báo lại bằng tay.
- API responses wrap trong `ApiResponse<T>` – luôn lấy `response.data.data`. Phân trang dùng `PaginatedResponse<T>`.
- **Literal types theo đúng backend** (PascalCase), như đang dùng trong code:
  - `BookingStatus`: `"Pending" | "Confirmed" | "Completed" | "Cancelled"`
  - `InvoiceStatus`: `"Unpaid" | "Paid" | "Cancelled"`
  - `PaymentMethod`: `"Bank" | "Cash"` (không phải `BANKING`/`MONEY`)
  - `CourtStatus`, `AccountStatus`: lấy từ schema (`"Active" | "Maintenance" | "Closed"`, `"Active" | "Disabled"`)
  - `UserRole`: `"Admin" | "Employee" | "Customer"` (suy ra từ `UserAccount`, không phải từ server enum)
- **Ngoại lệ chữ HOA:** `SlotDisplayStatus` = `"AVAILABLE" | "BOOKED" | "CLOSED"` và giá trị `IN_USE` của `Badge`.
- **Không dùng type cũ:** `CreateInvoiceRequest`, `ConfirmPaymentRequest`, `UpdateBookingStatusRequest`, `CartSlot` còn trong `types/booking.ts` nhưng không khớp nghiệp vụ hiện hành.

### Next.js App Router

- **Server Component** (default): layout, page – không có state/effect/browser API.
- **Client Component** (`'use client'`): mọi component có `useState`, `useEffect`, event handler, Zustand store, hoặc TanStack Query hook.
- Không dùng `getServerSideProps` / `getStaticProps`.
- Proxy nằm ở `src/proxy.ts` (Next.js 16), **không** tạo `middleware.ts`.

### Tailwind CSS (v4)

- Cấu hình ở `tailwind.config.mts`, nạp qua `@config` trong `globals.css`.
- Component hiện dùng màu **`emerald-*`** của Tailwind cho màu thương hiệu. Token `primary-*` đã khai báo nhưng gần như chưa dùng; không trộn hai hệ màu trong một component. Chi tiết: `Design-System.md` §2.1.
- Slot classes trong `globals.css`: `.slot-available`, `.slot-booked`, `.slot-mine`, `.slot-closed`. (Không có `court-slot-*`.)
- Dùng `cn()` từ `@/utils` để gộp class. Style inline **chỉ** cho giá trị tính động (tọa độ popup, %).
- Responsive: mobile-first (`sm:`, `md:`, `lg:`).

### Forms

```typescript
// Pattern chuẩn: React Hook Form + Zod
const schema = z.object({ ... });
type FormData = z.infer<typeof schema>;
const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
  resolver: zodResolver(schema),
});
```

Quy tắc kiểm tra dữ liệu (đồng bộ `UI-screens.md`): mật khẩu **8–128 ký tự** (đăng ký, đặt lại, đổi mật khẩu, tạo nhân viên); SĐT 8–15 chữ số, cho phép `+` ở đầu; email cắt khoảng trắng và đổi chữ thường; dùng chung `Input` + `Label` (có `required`).

### API & State

- Services (`src/services/`) chỉ gọi `axiosInstance` – không có logic UI.
- `axiosInstance` có `baseURL: "/api"` và `withCredentials: true`. Next.js **rewrite** `/api/:path*` → `${NEXT_PUBLIC_API_BASE_URL}/:path*` (xem `next.config.ts`); route handler `app/api/chat` được ưu tiên vì là route trong filesystem. Đường dẫn trong service **không** lặp `/api` (ví dụ `"/courts/grid"`).
- Không đọc, gắn, refresh hay lưu access/refresh token ở `localStorage`, Zustand hay URL. **Không** thêm `Authorization: Bearer ...` interceptor.
- Request `POST`/`PUT`/`PATCH`/`DELETE` gửi CSRF: interceptor đọc cookie `XSRF-TOKEN` và gắn header `X-CSRF-TOKEN`. Không tắt kiểm tra CSRF để làm request chạy được.
- Lỗi `401`: interceptor chỉ gọi `clearAuth()`. Việc chuyển trang do `RoleGuard`/`proxy.ts` xử lý.
- Request tạo đặt sân gửi header `Idempotency-Key` (`crypto.randomUUID()`, giữ nguyên khi thử lại, đổi khi có báo giá mới).
- Hooks (`src/hooks/`) dùng TanStack Query, gọi services. Mặc định query: `staleTime` 2 phút, `gcTime` 10 phút, `retry` 1, `refetchOnWindowFocus: false`; mutation `retry: 0`.
- Zustand chỉ cho client state của phiên (`auth.store`). Phiên được khôi phục bằng `AuthProvider` → `GET /auth/me`, **không** lưu vào `localStorage`.
- Invalidate query sau mutation: `queryClient.invalidateQueries({ queryKey: QUERY_KEYS.xxx })`.
- **Mock:** `NEXT_PUBLIC_USE_MOCKS="true"` bật dữ liệu giả (`src/mocks`). Chỉ dùng khi phát triển cục bộ; không bật khi chạy thật và **không** thêm mock mới cho chức năng đã có API. Chức năng chưa có API backend thì ẩn nút hoặc hiện "Chưa khả dụng" (`UI-screens.md` QĐ-10).

### Error Handling

```typescript
import { getErrorMessage } from "@/utils";
import { toast } from "sonner";

// Trong mutation onError:
onError: (error) => toast.error(getErrorMessage(error));
```

Lỗi nghiệp vụ nghiêm trọng (tài khoản bị khóa, vi phạm bảo vệ Admin cuối, hủy quá hạn) dùng **banner/modal cố định**, không chỉ toast.

---

## 4. Key Domain Logic

### Real-time Court Grid

- `useCourtGrid(date)` – refetch interval **30 giây**.
- Backend trả `displayStatus` cho từng slot: `"AVAILABLE" | "BOOKED" | "CLOSED"`. FE chỉ bổ sung: slot **đã qua giờ** của hôm nay bị coi là đóng (hiện dùng giờ trình duyệt; chuẩn là giờ máy chủ).
- Lưới hiện cố định **05:00–22:00**, ô 30 phút. Chuẩn (mục tiêu): theo giờ mở cửa từng sân/ngày (cần backend).
- `CourtStatus` hiện: `"Active" | "Maintenance" | "Closed"`. SRS có thêm trạng thái xóa mềm `Deleted` (chưa có trong API).
- Lưới công khai **không lộ người đặt**. Trạng thái "Đặt của bạn" (`slot-mine`) cần backend trả cờ riêng, hiện chưa có.

### Booking Flow (thành viên)

1. Bấm slot `AVAILABLE` → `SlotPopup` chọn thời lượng (hiện 60–180 phút; chuẩn bước 30 phút, tối thiểu 30 phút – BR-20).
2. `CourtGrid.handleReserve` điều hướng tới `/booking?courtId=&date=&startTime=&endTime=` (chưa đăng nhập: `/booking/guest?...`).
3. `ReservationForm` gọi `usePricePreview` → hiển thị giá máy chủ tính → bấm xác nhận gọi `useCreateBooking()` với `CreateBookingRequest { courtId, date, startTime, endTime, totalCost, quoteFingerprint }`.
4. Nếu giá đã đổi (HTTP **409**) → hiển thị **báo giá mới** để khách xác nhận lại, không tự đặt với giá mới.
5. Thành công → hiển thị mã `DS-XXXXX`; đơn ở trạng thái **Chờ xác nhận**, chưa có hóa đơn.

Tài khoản **nội bộ** (Employee/Admin) không tự đặt sân (BR-10): dùng "Tạo lịch đặt" ở Lịch sân (mục tiêu).

### Đặt nhanh (khách vãng lai, không tài khoản)

1. `/booking/guest` thu `fullName`, `phone`, `email` (**email bắt buộc**) + gửi mã `CodeType = "QuickBooking"`.
2. Submit → `useCreateGuestBooking()` với `CreateGuestBookingRequest { ..., fullName, phone, email, verificationCode }`.
3. BE dùng lại hồ sơ khách theo email hoặc tạo mới (`accountId = null`), rồi tạo đơn.
4. Hiển thị `bookingCode` (`DS-{5+ ký tự}`) để tra cứu ở `/lookup` (bắt buộc cặp mã + SĐT **hoặc** email – mục tiêu).
5. Mục tiêu: mã OTP nhập trong **modal 6 ô (M-01)**, thay cho ô nhập inline hiện tại.

### Booking Status Flow

```
Pending ──► Confirmed ──► Completed
   │            │
   └────────────┴──► Cancelled
```

- Hủy/đổi lịch theo yêu cầu khách (đơn Chờ xác nhận hoặc Đã xác nhận) chỉ khi còn **≥ 1 giờ** trước giờ bắt đầu (BR-05): đơn **chưa thanh toán** do khách thành viên tự xử lý, khách vãng lai qua nhân viên; đơn **đã thanh toán** chỉ nhân viên xử lý. Nhân viên hủy do sự cố được phép quá mốc 1 giờ (BR-24).
- **Hoàn thành không đồng nghĩa đã thanh toán.**

### Invoice & Payment Flow

```
Nhân viên Xác nhận đơn (ConfirmBookingRequest { isPaid, paymentMethod?, paidAt?, note? })
    → hệ thống tự lập đúng 1 Invoice
    → Unpaid (nếu chưa thu) hoặc Paid (nếu đã thu, kèm phương thức + thời điểm thu)

Thu tiền sau: Invoice Unpaid → Paid (trạng thái đặt sân không đổi)
Hủy/đổi lịch đơn đã có hóa đơn → Invoice Cancelled (hoặc hoàn tiền nếu đã Paid)

Invoice status: Unpaid → Paid | Cancelled
Invoice code:   HD-{yyyyMMdd}-{STT}
Payment method: Bank (Chuyển khoản) | Cash (Tiền mặt)
```

Không có nút "lập hóa đơn thủ công", thanh toán một phần hay đặt cọc. Nhãn khi đơn chưa có hóa đơn: `NO_INVOICE_LABEL` = "Chưa lập hóa đơn". API hóa đơn/thu tiền/hoàn tiền phía backend còn thiếu (`UI-screens.md` §8.2).

### Auth Flow

- Login → gọi `/auth/login` với `withCredentials: true`; backend tạo cookie HttpOnly (proxy đọc cookie `shuttlevn.auth` chỉ để biết có phiên). Lưu thông tin hiển thị tối thiểu (`AuthUser`), không lưu credential.
- Khởi động app: `AuthProvider` gọi `authService.getProfile()` (`GET /auth/me`) để khôi phục `AuthUser`; lỗi → `clearAuth()`.
- Logout → `/auth/logout` → `clearAuth()` → `queryClient.clear()` → chuyển về `/courts`.
- Khóa tài khoản: sai mật khẩu **5 lần liên tiếp** → `Disabled` (BR-12). Đặt lại mật khẩu **không** mở khóa; chỉ nhân viên/Admin mở khóa.
- **Phân quyền 3 role** suy ra từ `UserAccount` bằng `mapAccountToAuthUser`:
  - `accountType === "Customer"` → `"Customer"`
  - nhân viên với `employee.isAdmin === true` → `"Admin"`
  - nhân viên với `employee.isAdmin === false` → `"Employee"`
- **Chuyển hướng sau đăng nhập:**
  - Hiện (`useAuth`): `Customer` → `/courts`; `Employee`/`Admin` → `/dashboard`.
  - **Mục tiêu:** `Customer` → `/courts`; `Admin` → `/admin/dashboard`; `Employee` → `/admin/booking-requests`.
- `proxy.ts` **không** phân quyền theo vai trò; chỉ chuyển người chưa đăng nhập khỏi route không công khai về `/courts` (public: `/login`, `/register`, `/courts`, `/lookup`, `/booking/guest`; **mục tiêu** thêm `/forgot-password`).
- Phân quyền theo vai trò dùng `RoleGuard` (`allowedRoles`). Sai quyền hiện chuyển về `/courts`; **mục tiêu** hiện trang 403.
- Quản lý sân (`/manage-courts`) chỉ **Admin**: nhân viên chỉ đổi trạng thái sân qua Lịch sân. (Hiện `allowedRoles` còn cho `Employee`, cần sửa.)

### AI Chatbot

- Hiện: route `/api/chat` nhận `{ messages }`, gọi Anthropic (model đặt trong route) với **System Prompt cố định**, trả `{ message }`. **Chưa có Function Calling**, chưa có `ChatWidget`.
- Type `ChatRequest`/`ChatResponse` trong `types/chat.ts` chưa khớp contract của route (`{messages}` → `{message}`); đồng bộ khi làm widget.
- **Mục tiêu (WF-08):** widget nổi trên mọi trang Cổng Khách hàng, ẩn ở Cổng Quản trị. AI chỉ tư vấn **thông tin công khai** (hướng dẫn đặt sân, giá tham khảo, gợi ý giờ trống, hotline); **không** đặt/hủy/đổi sân, thu tiền hay xem dữ liệu cá nhân. Nếu bổ sung tool, chỉ dùng endpoint công khai, không dữ liệu cá nhân.
- `ChatMessage`: `{ id, role: "user" | "assistant", content, createdAt }`.

### Quyết định UI đã chốt (tóm tắt, chi tiết ở `UI-screens.md` §8)

- Giữ trang xác nhận đặt sân `/booking`, `/booking/guest`; không thêm thẻ "đặt sân nhanh" trên lưới.
- **Không** có nút/modal Hóa đơn phía khách; thanh toán hiển thị bằng nhãn.
- Tra cứu đơn hiển thị đủ tên khách, không hiển thị SĐT/email; một thông báo chung khi không khớp.
- Gỡ: upload avatar + thẻ thống kê ở hồ sơ, nút "Thêm khách hàng", thẻ thống kê trang nhân viên, trường "Lý do" ở modal đổi trạng thái sân, biểu đồ + bảng "Đặt sân gần đây" trên dashboard.
- Dashboard gồm 3 thẻ: Doanh thu hôm nay, Đơn chờ duyệt, Lượt sân đặt trong ngày + danh sách đơn cần xử lý. **Không** có tỷ lệ lấp đầy.
- Giữ tab Đổi mật khẩu ở hồ sơ.

---

## 5. Constants & Labels

Tất cả export từ `src/config/app.ts` (key theo đúng giá trị backend, PascalCase):

```typescript
APP_CONFIG;               // { name, description, apiBaseUrl }

// Booking
BOOKING_STATUS_LABEL;     // { Pending: 'Chờ xác nhận', Confirmed: 'Đã xác nhận', Completed: 'Hoàn thành', Cancelled: 'Đã huỷ' }
BOOKING_STATUS_COLOR;     // { Pending: 'yellow', Confirmed: 'blue', Completed: 'green', Cancelled: 'red' }

// Invoice
INVOICE_STATUS_LABEL;     // { Unpaid: 'Chưa thanh toán', Paid: 'Đã thanh toán', Cancelled: 'Đã huỷ' }
PAYMENT_METHOD_LABEL;     // { Bank: 'Chuyển khoản', Cash: 'Tiền mặt' }
NO_INVOICE_LABEL;         // 'Chưa lập hóa đơn'

// Court
COURT_STATUS_LABEL;       // { Active: 'Đang hoạt động', Maintenance: 'Bảo trì', Closed: 'Đóng cửa' }
SLOT_DISPLAY_STATUS_LABEL;// { AVAILABLE: 'Còn trống', BOOKED: 'Đã đặt', CLOSED: 'Đóng cửa' }

// Account / audit
ACCOUNT_STATUS_LABEL;     // { Active: 'Hoạt động', Disabled: 'Vô hiệu hoá' }  → chuẩn: Disabled = 'Bị khóa'
ACTOR_TYPE_LABEL;         // { System: 'Hệ thống', Employee: 'Nhân viên', Customer: 'Khách hàng' }
USER_ROLE_LABEL;          // { Admin: 'Quản trị viên', Employee: 'Nhân viên', Customer: 'Khách hàng' }

// Misc
DAY_OF_WEEK_LABEL;        // { 0: 'Chủ nhật', 1: 'Thứ 2', ..., 6: 'Thứ 7' }
BookingAdminQueryParams;  // kiểu tham số lọc đặt sân phía admin

// Query Keys (typed factory)
QUERY_KEYS = {
  courts, court(id), courtSchedules(courtId), pricingRules(courtId), courtGrid(date), courtGrids,
  bookings, booking(id), bookingByCode(code), myBookings,
  pendingBookings(params), pendingBookingsAll, adminBookings(params), adminBookingsAll,
  bookingDetail(id), customerBookings(customerId, params),
  invoices, invoice(id), bookingInvoice(bookingId),
  customers, customer(id), employees, employee(id),
  dashboard, revenueStats(from, to),
  auditLogs,
}
```

Ghi chú: nhãn đơn ghi "Đã huỷ" trong code; thống nhất hiển thị theo `UI-screens.md` §2.5 ("Đã hủy", "Bị khóa") khi chỉnh các file này.

---

## 6. Lộ trình triển khai

Thứ tự ưu tiên chi tiết nằm ở `docs/design/UI-screens.md` §7. Tóm tắt:

| Mức | Phạm vi |
| --- | --- |
| **P0 – Nền tảng/sai nghiệp vụ** | Chuyển route admin sang `/admin/*` và lọc sidebar theo vai trò; chặn `/manage-courts` với Nhân viên; tra cứu đơn bắt buộc cặp mã + liên hệ (bỏ nút DEMO); popup có bước 30 phút; banner khóa tài khoản, nút Đăng xuất, chuyển hướng theo vai trò |
| **P1 – Luồng chính còn thiếu** | Yêu cầu đặt sân + chi tiết + xử lý đơn (xác nhận/từ chối/hoàn thành/hủy do sự cố); Quên mật khẩu + modal OTP M-01 dùng chung; hủy đơn bằng modal M-06, nhãn tiếng Việt, nhãn thanh toán; Lịch sân (bấm ô đã đặt, lọc sân, tạo lịch đặt thay khách); quản lý khách (tìm kiếm, trạng thái TK, lịch sử, khóa/mở khóa) |
| **P2 – Hoàn thiện** | Thanh toán/hóa đơn (chờ API), báo cáo, nhật ký, đặt sân toàn hệ thống; dashboard 3 thẻ; form sân có Xem trước, xóa mềm sân, đổi vai trò; footer hotline, widget AI; skeleton, empty state, error boundary |

---

## 7. Output Rules

Khi sinh code cho project này:

1. **Production-ready only** – không có `// TODO`, không có partial code, không có placeholder UI.
2. **Full file content** – output toàn bộ nội dung file, không cắt bớt.
3. **Vietnamese strings** – mọi text hiển thị người dùng đều bằng tiếng Việt (có dấu, đúng thuật ngữ trong `UI-screens.md` §2.5).
4. **'use client' đúng chỗ** – chỉ thêm khi component thực sự cần.
5. **Import từ barrel** – dùng `@/types`, `@/utils`, `@/services`, `@/hooks`, không import sâu.
6. **Không viết code C# / backend** – chỉ tập trung frontend.
7. **Không dùng `any`** – TypeScript strict mode.
8. **Literal types đúng casing** – PascalCase cho status/method/role như `types/*.ts`; chữ HOA chỉ cho `SlotDisplayStatus` và `IN_USE`.
9. **Không tự thêm tính năng ngoài phạm vi** SRS/UseCase (ca làm, đặt cọc, thanh toán một phần, tỷ lệ lấp đầy, quản lý thiết bị/phiên...).

---

## 8. Environment Variables

```bash
# .env.local
NEXT_PUBLIC_API_BASE_URL=http://localhost:5000/api   # URL backend, dùng cho rewrite /api/:path* trong next.config.ts
ANTHROPIC_API_KEY=sk-ant-...                          # Server-side only (route /api/chat)
NEXT_PUBLIC_USE_MOCKS=false                           # "true" = dữ liệu giả (chỉ phát triển cục bộ)
# Có trong .env.local.example nhưng chưa được code sử dụng (chỉ remotePatterns ảnh trong next.config.ts):
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...
```

Luồng gọi API:

```
Browser  →  axiosInstance (baseURL "/api")  →  Next.js rewrite  →  ${NEXT_PUBLIC_API_BASE_URL}/...
// ví dụ: GET /api/courts/grid  →  http://localhost:5000/api/courts/grid
```

`APP_CONFIG.apiBaseUrl` đọc cùng biến môi trường; `src/lib/axios.ts` **không** dùng nó để dựng `baseURL`.
