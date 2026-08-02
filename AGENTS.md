# ShuttleVN

> Đây là tài liệu hướng dẫn chính cho mọi AI coding agent (Codex, Claude Code, Gemini CLI...) khi làm việc trong codebase này.
> Đọc file này trước mỗi task để đảm bảo output đúng convention và production-ready.

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

- npm run lint
- npm run typecheck

Khắc phục toàn bộ lỗi trước khi hoàn thành task.

---

## 1. Project Overview

**ShuttleVN** là hệ thống quản lý và đặt sân cầu lông trực tuyến với **ba vai trò**:

| Role                      | Chức năng chính                                                                        |
| ------------------------- | -------------------------------------------------------------------------------------- |
| **Customer**              | Xem lưới sân real-time, đặt sân (có/không tài khoản), xem lịch sử đặt, dùng AI chatbot |
| **Staff (Nhân viên)**     | Tiếp nhận & xác nhận đặt sân, quản lý lịch sân, lập hóa đơn, hỗ trợ khách hàng         |
| **Admin (Quản trị viên)** | Dashboard doanh thu, quản lý sân/nhân viên/khách hàng, phân quyền, thống kê báo cáo    |

**Tech Stack:**

- **Framework:** Next.js 15, App Router, React 19
- **Language:** TypeScript strict (no `any`)
- **State:** Zustand v5 + TanStack Query v5
- **HTTP:** Axios + JWT interceptor + auto-refresh
- **Forms:** React Hook Form + Zod
- **Styling:** Tailwind CSS v3
- **Charts:** Recharts
- **Notifications:** Sonner
- **AI:** Anthropic API – server-side route `/api/chat`, dùng **System Prompt + Function Calling** để truy xuất dữ liệu động
- **Backend:** ASP.NET Core Web API (PostgreSQL/Supabase) – do NOT write C# code

---

## 2. Project Structure

```
src/
├── app/
│   ├── layout.tsx              # Root layout (Inter font, Providers)
│   ├── page.tsx                # redirect('/courts')
│   ├── providers.tsx           # QueryClientProvider + Toaster + DevTools
│   ├── globals.css             # Tailwind + court-slot utility classes
│   ├── api/chat/route.ts       # AI chatbot API route (Anthropic, server-side)
│   ├── (auth)/                 # login, register – AuthLayout (centered card)
│   ├── (customer)/             # courts, booking, booking/guest, my-bookings
│   └── (admin)/                # dashboard, schedule, payments, courts, customers, staff
├── types/                      # Strict TypeScript types (api, auth, court, booking, dashboard, chat)
├── config/app.ts               # TIME_SLOTS, QUERY_KEYS, label maps
├── lib/
│   ├── axios.ts                # Instance + JWT bearer + 401 auto-refresh
│   └── query-client.ts        # staleTime 2m, gcTime 10m, retry 1
├── services/                   # auth, court, booking, dashboard – thin API wrappers
├── hooks/                      # useAuth, useCourt, useBooking, useDashboard
├── stores/                     # auth.store (persist), booking-cart.store
├── utils/index.ts              # cn, formatCurrency, formatDate, calcHourDiff...
└── components/
    ├── layout/                 # CustomerNav, AdminSidebar, AdminHeader
    ├── ui/                     # Shared primitives (Button, Input, Modal, Badge...)
    ├── court/                  # CourtGrid, CourtSlotCell
    ├── booking/                # BookingCart, BookingForm, GuestBookingForm
    ├── admin/                  # DashboardStats, RevenueChart, ScheduleTimeline, PaymentConfirmation
    └── chatbot/                # ChatWidget, ChatMessage
```

---

## 3. Coding Rules

### TypeScript

- **Không dùng `any`** – dùng `unknown` + type guard hoặc proper generic.
- Mọi type/interface đều export từ `src/types/`.
- API responses wrap trong `ApiResponse<T>` – luôn destructure `data.data`.

### Next.js App Router

- **Server Component** (default): layout, page – không có state/effect/browser API.
- **Client Component** (`'use client'`): mọi component có `useState`, `useEffect`, event handler, Zustand store, hoặc TanStack Query hook.
- Không dùng `getServerSideProps` / `getStaticProps` – đây là App Router.

### Tailwind CSS

- Dùng các class `primary-*` từ `tailwind.config.ts` (màu xanh lá).
- Court slot classes đã có trong `globals.css`: `court-slot-available`, `court-slot-booked`, `court-slot-selected`, `court-slot-maintenance`.
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

### API & State

- Services (`src/services/`) chỉ gọi `axiosInstance` – không có logic UI.
- Hooks (`src/hooks/`) dùng TanStack Query, gọi services.
- Zustand stores chỉ cho client-side persistent state (auth, cart).
- Invalidate query sau mutation: `queryClient.invalidateQueries({ queryKey: QUERY_KEYS.xxx })`.

### Error Handling

```typescript
import { getErrorMessage } from "@/utils";
import { toast } from "sonner";

// Trong mutation onError:
onError: (error) => toast.error(getErrorMessage(error));
```

---

## 4. Key Domain Logic

### Real-time Court Grid

- `useCourtGrid(date)` – refetch interval **30 giây**.
- Slot status: `Available` | `Booked` | `Maintenance` | `Closed`.
- Click slot `Available` → add vào `useBookingCartStore`.

### Booking Flow (Registered)

1. Customer chọn slot → `BookingCart` sidebar.
2. Submit → `useCreateBooking()` với payload `{ slots: BookingSlot[], note? }`.
3. Redirect sau khi booking thành công.

### Guest Booking Flow

1. Customer điền `guestName`, `guestPhone`, `guestEmail?` + chọn slot.
2. Submit → `useCreateGuestBooking()` với `CreateGuestBookingRequest`.
3. Hiển thị `bookingCode` để tra cứu sau.

### Booking Status Flow

```
Pending → Confirmed → PaymentPending → Paid → Completed
                   ↘ Cancelled
```

### Admin/Staff Payment Confirmation

- `useConfirmPayment()` với `{ bookingId, method, amount, transactionRef? }`.
- Sau khi confirm: invalidate `bookings` + `dashboard`.

### Auth Flow

- Login → `setAuth(user, accessToken, refreshToken)` → persist localStorage.
- 401 response → auto-refresh token → retry original request.
- Logout → `clearAuth()` → `queryClient.clear()` → redirect `/login`.
- **Phân quyền 3 role:** `Customer` | `Staff` | `Admin` – middleware redirect theo role.

### AI Chatbot – Function Calling

- Route `/api/chat` nhận message từ client, gọi Anthropic API với **System Prompt** chứa thông tin tĩnh (quy định, hướng dẫn, dịch vụ).
- AI dùng **Function Calling (Tool Use)** để truy xuất dữ liệu động: lịch sân trống, giá sân, trạng thái đặt sân.
- Backend cung cấp các endpoint riêng cho AI tool calls; FE route handler đóng vai trò proxy + orchestrator.

---

## 5. Constants & Labels

```typescript
// src/config/app.ts
TIME_SLOTS; // ['06:00', '07:00', ..., '22:00']
BOOKING_STATUS_LABEL; // { Pending: 'Chờ xác nhận', ... }
PAYMENT_METHOD_LABEL; // { Cash: 'Tiền mặt', BankTransfer: 'Chuyển khoản', ... }
COURT_STATUS_LABEL; // { Available: 'Còn trống', ... }
COURT_TYPE_LABEL; // { Standard: 'Tiêu chuẩn', Premium: 'Cao cấp', VIP: 'VIP' }
USER_ROLE_LABEL; // { Customer: 'Khách hàng', Staff: 'Nhân viên', Admin: 'Quản trị viên' }
QUERY_KEYS; // typed query key factory
```

---

## 6. Development Phases

| Phase | Priority     | Scope                                                                                                                                                              |
| ----- | ------------ | ------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| **1** | Critical     | Auth UI: LoginForm, RegisterForm, middleware route guard (3 roles)                                                                                                 |
| **2** | Critical     | Customer: CourtGrid, BookingCart, BookingForm, GuestBookingForm, MyBookings                                                                                        |
| **3** | High         | Admin/Staff: DashboardStats, RevenueChart (Recharts), ScheduleTimeline, PaymentConfirmation, Court CRUD, Customer management, Staff management, Invoice management |
| **4** | High         | AI ChatWidget với Function Calling (System Prompt + Tool Use), tích hợp tra cứu lịch sân trống                                                                     |
| **5** | Nice-to-have | Loading skeletons, empty states, error boundaries, tối ưu UX                                                                                                       |

---

## 7. Output Rules

Khi Claude sinh code cho project này:

1. **Production-ready only** – không có `// TODO`, không có partial code, không có placeholder UI.
2. **Full file content** – output toàn bộ nội dung file, không cắt bớt.
3. **Vietnamese strings** – mọi text hiển thị người dùng đều bằng tiếng Việt.
4. **'use client' đúng chỗ** – chỉ thêm khi component thực sự cần.
5. **Import từ barrel** – dùng `@/types`, `@/utils`, `@/services`, `@/hooks`, không import sâu.
6. **Không viết code C# / backend** – chỉ tập trung frontend.
7. **Không dùng `any`** – TypeScript strict mode.

---

## 8. Environment Variables

```bash
# .env.local
NEXT_PUBLIC_API_BASE_URL=http://localhost:5000/api   # Backend URL
ANTHROPIC_API_KEY=sk-ant-...                          # Server-side only
NEXT_PUBLIC_SUPABASE_URL=https://xxx.supabase.co      # Nếu dùng Supabase client
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJ...                  # Nếu dùng Supabase client
```

API base URL được dùng trong `src/lib/axios.ts`:

```typescript
const BASE_URL = `${APP_CONFIG.apiBaseUrl}/${APP_CONFIG.apiVersion}`;
// → http://localhost:5000/api/v1
```
