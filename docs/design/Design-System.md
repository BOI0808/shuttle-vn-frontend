# HỆ THỐNG THIẾT KẾ GIAO DIỆN (DESIGN SYSTEM) – SHUTTLEVN
### Quy chuẩn giao diện, Design Tokens và thành phần UI

**Hệ thống Quản lý và Đặt sân Cầu lông Trực tuyến ShuttleVN**
**Phiên bản tài liệu:** 2.0 (thay thế 1.0) · **Ngày cập nhật:** 23/10/2026

**Căn cứ:**
- Mã nguồn `shuttle-vn-frontend/src` (Next.js 16 App Router, React 19, TypeScript, **Tailwind CSS v4**, TanStack Query, Zustand, Sonner, Recharts).
- Cấu hình: `tailwind.config.mts` (nạp qua `@config` trong `globals.css`), `src/app/globals.css`, `src/app/layout.tsx`, `src/config/app.ts`.
- Nghiệp vụ và màn hình: `SRS.md` v1.7, `UseCase.md` v1.5, `User-Flows.md` v1.1, `Wireframes.md` v2.0, `UI-screens.md` v3.1.

> **NGUYÊN TẮC:**
> 1. **Trung thực với mã nguồn:** mỗi mục có phần **Hiện trạng** ghi đúng giá trị đang chạy trong `src/`.
> 2. **Tách rõ chuẩn mục tiêu:** phần **Chuẩn** là quy định cho code mới và khi sửa code cũ, kèm trạng thái: ✅ code đã đúng chuẩn · ⚠ có nhưng lệch chuẩn · ❌ chưa có.
> 3. **Không có tàn dư ngoài phạm vi:** không có token hay component cho tỷ lệ lấp đầy, ca làm việc, đặt cọc, thanh toán một phần, quản lý phiên/thiết bị.

---

## MỤC LỤC

1. Triết lý thiết kế và phân vùng không gian
2. Design Tokens nền tảng (màu, chữ, khoảng cách, bo góc/đổ bóng, icon, z-index)
3. Layout shells và điều hướng
4. Thành phần UI cơ bản (Button, Badge, Card, Input/Label, Modal/ConfirmDialog, DatePicker, Pagination)
5. Thành phần nghiệp vụ (lưới sân, SlotPopup, bảng admin, PricingTimeline, biểu đồ, Status Timeline, OTP, ChatWidget)
6. Phản hồi trạng thái (toast, banner, empty, loading)
7. Khả năng tiếp cận và quy tắc lập trình UI
8. Các điểm bản 1.0 đã sai và được sửa

---

## 1. TRIẾT LÝ THIẾT KẾ VÀ PHÂN VÙNG KHÔNG GIAN

Giao diện chia thành **hai cổng** với đặc trưng thị giác riêng.

### 1.1 Cổng Khách hàng (Customer Portal)
- **Tôn chỉ:** năng động, tin cậy, tối ưu tốc độ hoàn tất đặt sân.
- **Hiện trạng thị giác:**
  - Thanh điều hướng nền tối `#1a1f2e`; Hero trang `/courts` dùng gradient xanh đậm + ảnh phủ mờ (`h-[260px]`).
  - Nền trang khách `bg-[#f0f2f5]` (`(customer)/layout.tsx`); nền mặc định `body` là `bg-slate-50 text-slate-800`.
  - Nhấn thương hiệu bằng xanh ngọc `emerald-*`.
  - Thẻ bo góc lớn (`rounded-[14px]`, `rounded-xl`, `rounded-2xl`), đổ bóng mềm `shadow-[0_4px_24px_rgba(0,0,0,0.07)]`.
- **Chuẩn bề rộng nội dung** (mỗi trang tự đặt, không có container chung): lưới sân `max-w-[1400px] px-7 py-6`; lịch sử đặt sân và hồ sơ `max-w-[960px] px-7 py-7`; tra cứu đơn `max-w-[560px] px-4`. Trang mới theo nhóm gần nhất.

### 1.2 Cổng Quản trị và Vận hành (Admin Portal)
- **Tôn chỉ:** năng suất cao, rõ ràng, trung tính, không gây mỏi mắt.
- **Hiện trạng thị giác:**
  - Sidebar nền `#FBFBFA`, viền `#EAEAEA`; vùng làm việc nền `bg-gray-100`; thanh tiêu đề trắng viền `border-gray-200`.
  - Tiêu đề dùng `Hanken Grotesk` (`font-display`), mã số/ngày giờ/nhãn dùng `JetBrains Mono` (`font-mono`), nội dung bảng dùng `Inter` (`font-sans`).
  - Mật độ cao: bảng gọn (`text-[13px]`), nút thao tác nhỏ (`text-[11px] font-mono`).

---

## 2. DESIGN TOKENS NỀN TẢNG

### 2.1 Bảng màu

#### A. Màu thương hiệu

**Hiện trạng:** `tailwind.config.mts` khai báo thang `primary-50…950`, nhưng **gần như không component nào dùng** (chỉ 1 chỗ `text-primary-600`). Toàn bộ component dùng thang **`emerald-*` mặc định của Tailwind**. Hai thang **không trùng mã màu** (ví dụ `primary-500` = `#22c55e`, trong khi nút chính dùng `emerald-500`).

**Chuẩn:** dùng **`emerald-*`** cho màu thương hiệu trong mọi component mới; không trộn `primary-*` và `emerald-*` trong cùng component. Nếu sau này muốn chuyển sang `primary-*` thì đổi một lần cho toàn bộ codebase.

| Vai trò | Giá trị đang dùng | Nơi dùng |
|---|---|---|
| Nút chính | `bg-emerald-500`, hover `bg-emerald-600`, disabled `bg-emerald-300` | `Button` (primary) |
| Viền/nền nhẹ | `emerald-50`, `emerald-100`, `emerald-200` | Nút thao tác admin, badge nhẹ |
| Chữ nhấn | `emerald-600`, `emerald-700` | Liên kết nhỏ, chữ nút thao tác |
| Focus input | `border-emerald-500` + bóng `rgba(16,185,129,0.12)` | `Input` |
| Màu inline | `#10b981`, hover `#059669` | `.slot-mine`, nút "Đặt sân" trong `SlotPopup` |
| Nền tối cổng khách | `#1a1f2e` | `CustomerNav`, header khung chat (mục tiêu) |
| Popup chọn giờ | `#1f2937`, mục `#374151`, hover `#4b5563` | `SlotPopup` |
| Sidebar admin | nền `#FBFBFA`, viền `#EAEAEA`, mục đang chọn `bg-[#EDF3EC] text-[#346538]`, nhãn nhóm `#9B9A97` | `AdminSidebar` |

Thang `primary-*` (chưa dùng, giữ để tham chiếu): 50 `#f0fdf4` · 100 `#dcfce7` · 200 `#bbf7d0` · 300 `#86efac` · 400 `#4ade80` · 500 `#22c55e` · 600 `#16a34a` · 700 `#15803d` · 800 `#166534` · 900 `#14532d` · 950 `#052e16`.

#### B. Màu trạng thái ngữ nghĩa

**Hiện trạng** (`Badge.tsx`, `STATUS_CLASSES`): `bg-{màu}-50 text-{màu}-600 border-{màu}-200`.

| Màu | Trạng thái (key `Badge`) | Ý nghĩa |
|---|---|---|
| Xanh lá | `Completed`, `Paid`, `Active` | Hoàn thành, Đã thanh toán, Hoạt động |
| Xanh dương | `Confirmed`, `IN_USE` | Đã xác nhận; `IN_USE` ("Đang sử dụng") **không thuộc SRS**, không dùng cho màn hình mới |
| Vàng (amber) | `Pending`, `Unpaid`, `Maintenance` | Chờ xác nhận, Chưa thanh toán, Bảo trì |
| Đỏ | `Cancelled`, `Closed` | Đã hủy, Đóng cửa |

**Chuẩn bổ sung** (theo `UI-screens.md` §2.5; ❌ chưa có trong `Badge`):

| Cần có | Màu | Dùng cho |
|---|---|---|
| `Disabled` | Đỏ (như `Cancelled`) | Tài khoản "Bị khóa" (WF-14, WF-16B). Nhãn hiển thị là **"Bị khóa"** |
| `NoInvoice` | Xám: `bg-gray-50 text-gray-500 border-gray-200` | "Chưa lập hóa đơn" (đơn Chờ xác nhận) |

Quy tắc: nhãn thanh toán của đơn **Đã hủy** hiển thị "—", không dùng badge.

#### C. Màu ô slot đặt sân (`globals.css`, `@layer components`)

**Hiện trạng:**

| Slot | Lớp | Nền / viền | Tương tác |
|---|---|---|---|
| Còn trống (`AVAILABLE`) | `.slot-available` | nền trắng, viền `gray-200`; hover nền `#f0fdf4`, viền `#86efac` | `pointer` |
| Đã đặt (`BOOKED`) | `.slot-booked` | nền `gray-200`, viền `gray-300` | `not-allowed` |
| Đặt của bạn | `.slot-mine` | nền `#10b981`, viền `#059669` | `pointer` |
| Đóng (`CLOSED`) | `.slot-closed` | nền `#f3f4f6`, sọc chéo -45° `#d1d5db`/`#e5e7eb` | `not-allowed` |

⚠ `.slot-mine` hiện **không bao giờ xuất hiện**: backend chỉ trả `AVAILABLE | BOOKED | CLOSED`. ⚠ Ô **đã qua giờ** đang dùng chung `.slot-closed` (chỉ khác tooltip "Đã qua").

**Chuẩn** (`UI-screens.md` WF-04):
- ❌ Thêm `.slot-past` riêng cho "Đã qua giờ": nền `gray-50`, viền `gray-100`, **không sọc**, `not-allowed`, để phân biệt với "Đóng cửa" (sọc).
- Mọi trạng thái có **ký hiệu hoặc chữ trong chú giải**, không chỉ dựa vào màu. Tooltip theo trạng thái: "Còn trống – bấm để đặt", "Đã có người đặt", "Đơn của bạn", "Đã qua giờ", "Đóng cửa".
- `.slot-mine` chỉ dùng cho khách thành viên và chỉ khi backend trả cờ đơn của chính họ; không bấm được.

#### D. Phân đoạn bảng giá (`PricingTimeline.tsx`) — ✅

| Đoạn | Lớp | Gợi ý |
|---|---|---|
| 1 | `bg-[#DDECDD]` | Giờ thấp điểm sáng sớm |
| 2 | `bg-[#DDECF3]` | Giờ ban ngày |
| 3 | `bg-[#F5EACB]` | Giờ cao điểm chiều tối |
| 4 | `bg-[#E8E2F0]` | Giờ muộn |

Khung timeline `border-[#D9DDD8] bg-[#F2F3F2]`; con trỏ kéo mốc `#166534` (`.pricing-boundary`).

#### E. Màu biểu đồ (`RevenueChart.tsx`)
Cột `#3b82f6`; lưới `#f1f5f9`; chữ trục `#64748b` cỡ 10; tooltip viền `#e2e8f0`, bo `8px`.

---

### 2.2 Kiểu chữ

**Hiện trạng** (`src/app/layout.tsx`, import từ **`next/font/google`**):

```typescript
const inter = Inter({ subsets: ["latin", "vietnamese"], variable: "--font-inter" });
const hankenGrotesk = Hanken_Grotesk({ subsets: ["latin"], variable: "--font-hanken" });
const jetBrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains" });
```

`tailwind.config.mts` ánh xạ: `font-sans` → `--font-inter`, `font-display` → `--font-hanken`, `font-mono` → `--font-jetbrains`. `<body>` có `font-sans bg-slate-50 text-slate-800 antialiased`.

⚠ `RevenueChart` tham chiếu `var(--font-jetbrains-mono)` — biến này **không tồn tại**; phải là `var(--font-jetbrains)`.

| Phân loại | Lớp | Phạm vi |
|---|---|---|
| Nội dung | `font-sans` (Inter) | Văn bản, mô tả, placeholder, nội dung bảng |
| Tiêu đề | `font-display` (Hanken Grotesk) | Tiêu đề trang, tên sân, số liệu lớn, logo |
| Dữ liệu kỹ thuật | `font-mono` (JetBrains Mono) | Mã đơn `DS-XXXXX`, hóa đơn `HD-…`, giờ, giá, nhãn `Badge`, chữ `Button`, nhãn `Label`, tiêu đề cột |

**Thang chữ (giá trị đang dùng trong code):**

| Cấp | Cỡ / kiểu | Ví dụ |
|---|---|---|
| Hero | `text-[34px] font-display font-bold` | "Đặt Sân Cầu Lông" ở `/courts` |
| Tiêu đề trang admin | `text-[16px] font-display font-bold` | `AdminHeader` |
| Tiêu đề khối | `text-[15px] font-bold` | Tiêu đề thẻ/biểu đồ, tiêu đề dialog |
| Nội dung | `text-sm` (14px) | Form, mô tả modal |
| Nội dung bảng | `text-[13px]` | Tên, email trong bảng |
| Nút | `font-mono font-medium tracking-[0.05em]`; `sm` `text-xs`, `md` `text-[13px]`, `lg` `text-sm` | `Button` |
| Badge | `text-[11px] font-mono font-semibold tracking-[0.03em]` | Nhãn trạng thái |
| Nhãn form | `text-[11px] font-mono font-semibold uppercase tracking-[0.06em]` | `Label` |
| Nhãn số liệu | `text-[11px] font-mono uppercase tracking-wider` | Thẻ thống kê |
| Tiêu đề cột | `text-[10px] font-mono font-semibold uppercase tracking-wider` | `CourtTable` |
| Nhãn nhỏ | `text-[9px] font-mono font-medium uppercase` | Tag "ADMIN", nhãn nhóm sidebar |

---

### 2.3 Khoảng cách và lưới

Bước nhảy 4px của Tailwind. Giá trị đang dùng:

- **Badge:** `px-2.5 py-[3px]`. **Button:** `sm` `px-3 py-1.5`, `md` `px-4 py-3`, `lg` `px-6 py-3.5`.
- **Input:** `py-[11px] pl-3 pr-3` (cao ≈ 44px, đạt chuẩn cảm ứng); khoảng cách nhãn–ô `mb-1.5`; khoảng cách giữa các trường `space-y-4`/`space-y-5`.
- **Dialog/Modal:** padding `p-6`. **Bảng:** ô tiêu đề `px-5 py-3`.
- **Lưới sân:** ô 30 phút `w-[72px] min-w-[72px] h-14`; cột tên sân `min-width 130px`, đệm `10px 16px`; đường kẻ dọc đậm hơn (`border-r-gray-300`) tại mốc giờ chẵn, mốc 30 phút dùng `border-r-gray-200`.

---

### 2.4 Bo góc và đổ bóng

`:root { --radius: 0.5rem }`; `tailwind.config.mts` đặt `rounded-lg` = `--radius` (8px), `rounded-md` = 6px, `rounded-sm` = 4px.

| Bo góc | Lớp | Áp dụng (hiện trạng) |
|---|---|---|
| Tròn | `rounded-full` | `Badge`, avatar, nút chọn ngày dạng viên |
| 16px | `rounded-2xl` | Khung `CourtGrid`, popover lịch, khối hero |
| 14px | `rounded-[14px]` | `Card`, `SlotPopup` |
| 12px | `rounded-xl` | `ConfirmDialog`, bảng admin, thẻ thống kê, `BookingCard`, `CourtCardGrid` |
| 10px | `rounded-[10px]` | Menu người dùng (`UserMenu`) |
| 8px | `rounded-lg` | Nút thao tác trong bảng, ô cấu hình giá |
| 7px | `rounded-[7px]` | `Button`, `Input`, nút trong dialog |
| 5px | `rounded-[5px]` | Ô slot trong lưới |

| Đổ bóng | Giá trị | Ngữ cảnh |
|---|---|---|
| Nhẹ (admin) | `shadow-[0_1px_3px_rgba(0,0,0,0.04)]` | Thẻ thống kê, bảng admin |
| Thẻ khách | `shadow-[0_4px_24px_rgba(0,0,0,0.07)]` | `Card` |
| Header admin | `shadow-sm` | `AdminHeader` |
| Nút chính khi hover | `hover:shadow-[0_4px_14px_rgba(16,185,129,0.28)]` | `Button` primary |
| Focus input | `focus:shadow-[0_0_0_3px_rgba(16,185,129,0.12)]` (lỗi: `rgba(239,68,68,0.12)`) | `Input` |
| Popover lịch | `shadow-[0_10px_35px_rgba(0,0,0,0.18)]` | `CustomDatePicker` |
| Nổi | `shadow-2xl` | Modal, `ConfirmDialog`; `SlotPopup` dùng `0 16px 48px rgba(0,0,0,0.32)` |

---

### 2.5 Biểu tượng

Dùng **Google Material Symbols Outlined**, nạp bằng thẻ `<link>` tới Google Fonts trong `<head>` của `layout.tsx`.

```html
<span className="material-symbols-outlined text-[18px]">icon_name</span>
```

Trạng thái chọn/active: `style={{ fontVariationSettings: "'FILL' 1" }}` (mặc định `FILL 0`). Không dùng `lucide-react` (đã cài nhưng không dùng).

| Icon | Ý nghĩa / nơi dùng |
|---|---|
| `sports_tennis` | Logo, Quản lý sân |
| `space_dashboard` | Bảng điều khiển |
| `calendar_month` | Lịch sân |
| `payments` | Thanh toán |
| `group` | Khách hàng |
| `badge` | Nhân viên |
| `monitoring` | Thống kê / Báo cáo |
| `history` | Nhật ký hoạt động; Lịch sử đặt sân (menu người dùng) |
| `calendar_clock` | Nút "Lịch & giá" của sân |
| `calendar_today` | Nút chọn ngày |
| `search` | Ô tìm kiếm |
| `warning` | Cảnh báo trong `ConfirmDialog` |
| `visibility` / `visibility_off` | Hiện/Ẩn mật khẩu |
| `sync` | Đổi trạng thái sân |
| `person`, `logout` | Menu người dùng |
| `smart_toy` | Nút trợ lý AI — ❌ **chưa dùng** (chưa có widget) |

Nút chỉ có icon **bắt buộc** có `aria-label`.

---

### 2.6 Phân cấp z-index

**Hiện trạng** (giá trị thực trong code):

| z-index | Thành phần |
|---|---|
| `z-[2]` | Nội dung hero `/courts` |
| `z-[5]`, `z-[11]` | Cột tên sân cố định và hàng giờ của `CourtGrid` |
| `z-10`, `z-20` | Cột/hàng cố định ở Lịch sân; con trượt `PricingTimeline`; popover `CustomDatePicker` (`z-20`) |
| `z-40` | Lớp phủ trong `CustomerNav` (menu cũ, không còn dùng) |
| `z-50` | `CustomerNav`; ⚠ dialog chi tiết/hóa đơn trong `BookingHistoryList` |
| `z-60` | Menu thả `UserMenu` |
| `z-[100]` | Modal admin: `CourtFormModal`, `CourtOperationsModal`, `CourtStatusModal`, `EmployeeFormModal` |
| `z-[110]` | `ConfirmDialog` |
| `z-[200]` | `SlotPopup` |
| rất cao | Toast Sonner (thư viện tự quản lý) |

**Chuẩn** (thang dùng cho code mới):

| Lớp | Giá trị | Dùng cho |
|---|---|---|
| Nội dung | `z-0` | Văn bản, bảng, thẻ |
| Cố định trong nội dung | `z-10` | Cột/hàng sticky của lưới và bảng |
| Popover nhỏ | `z-20` | `CustomDatePicker` |
| Header, nút nổi | `z-50` | `CustomerNav`, nút tròn AI (mục tiêu) |
| Dropdown/panel | `z-[60]` | `UserMenu`, khung chat AI (mục tiêu) |
| Modal | `z-[100]` | Mọi modal và dialog chi tiết (⚠ sửa dialog đang `z-50` trong `BookingHistoryList`) |
| Xác nhận trên modal | `z-[110]` | `ConfirmDialog` |
| Popup neo trên lưới | `z-[200]` | `SlotPopup` (giữ nguyên, không xuất hiện cùng modal) |
| Toast | do Sonner | Không đặt phần tử khác cao hơn |

---

## 3. LAYOUT SHELLS VÀ ĐIỀU HƯỚNG

### 3.1 Cổng Khách hàng

- **File:** `src/app/(customer)/layout.tsx`, `components/layout/CustomerNav.tsx`, `ui/UserMenu.tsx`, `ui/LoginButton.tsx`.
- **Hiện trạng:**
  - Header **`sticky top-0 z-50 h-14 px-7`**, nền `#1a1f2e` (không phải `fixed`).
  - Trái: logo `sports_tennis` + ShuttleVN. Giữa: **Đặt sân** (`/courts`), **Lịch sử đặt sân** (`/my-bookings`, chỉ khi đã đăng nhập), **Tra cứu đơn** (`/lookup`).
  - Phải: chưa đăng nhập chỉ có nút **"Đăng Nhập"**; đã đăng nhập là `UserMenu` (avatar tròn `w-7 h-7` chữ cái đầu; menu `z-60`, `min-w-[190px]`, mục *Hồ sơ cá nhân*, *Lịch sử đặt sân*, *Đăng xuất*).
  - ⚠ Còn state `menuOpen` và lớp phủ `z-40` không dùng.
  - Không có footer.
- **Chuẩn:**
  - ❌ Chưa đăng nhập hiện **cả "Đăng nhập" và "Đăng ký"** (wireframe 4.1).
  - ❌ Thêm **footer** `© ShuttleVN` + **Hotline** lấy từ một hằng cấu hình duy nhất (G-06).
  - Tài khoản Nhân viên/Admin khi vào trang khách: không hiển thị luồng đặt sân (BR-10, xem `UI-screens.md` WF-04).

### 3.2 Cổng Quản trị

- **File:** `src/app/(admin)/layout.tsx`, `components/layout/AdminSidebar.tsx`, `AdminHeader.tsx`.
- **Hiện trạng:**
  - Khung: `min-h-screen bg-gray-100 flex`. Sidebar `sticky top-0 w-[220px] flex-shrink-0 px-2.5 py-3.5`, nền `#FBFBFA`, viền phải `#EAEAEA`, logo + tag "ADMIN".
  - Header trên: `h-[52px] bg-white border-b border-gray-200 shadow-sm px-6`, tiêu đề `font-display font-bold text-[16px]`, vùng thao tác `#admin-header-actions` (portal ở `/manage-courts`; trang nhân viên dùng sự kiện `open-add-employee`).
  - Vùng nội dung: `main.flex-1.p-6.overflow-auto`.
  - Sidebar **8 mục / 3 nhóm** (Tổng quan: Bảng điều khiển, Thống kê · Vận hành: Lịch sân, Thanh toán, Quản lý sân · Quản trị: Khách hàng, Nhân viên, Nhật ký hoạt động) và **chưa lọc theo vai trò**.
  - ⚠ Tiêu đề trang: `/statistics`, `/audits` rơi về "Admin Panel"; `/payments` ghi "Xác nhận thanh toán".
  - ❌ Không có nút **Đăng xuất**.
- **Chuẩn** (`UI-screens.md` §2.3, §2.4, §2.6, X-02, G-15, G-22, G-23):

| Vai trò | Mục sidebar → route mục tiêu |
|---|---|
| **Nhân viên (4)** | Lịch sân `/admin/court-schedule` · Yêu cầu đặt sân `/admin/booking-requests` · Thanh toán `/admin/payments` · Khách hàng `/admin/customers` |
| **Quản trị viên (10)** | Bảng điều khiển `/admin/dashboard` · Lịch sân · Yêu cầu đặt sân · Thanh toán · Quản lý sân `/admin/courts` · Khách hàng · Quản lý nhân viên `/admin/staff` · Báo cáo & Thống kê `/admin/reports` · Nhật ký hoạt động `/admin/audit-log` · Tài khoản & Phân quyền `/admin/accounts` |

  - "Tất cả đặt sân" (`/admin/bookings`) **không phải mục sidebar**: là tab cạnh "Yêu cầu chờ xác nhận", chỉ Admin thấy.
  - Sidebar lọc theo `user.role`; mục đang mở dùng `bg-[#EDF3EC] text-[#346538]`.
  - Header có nút **Đăng xuất** (icon `logout`) ở góc phải; mỗi trang có tiêu đề đúng tên menu.
  - Nhân viên mặc định vào "Yêu cầu đặt sân"; Admin vào "Bảng điều khiển".

---

## 4. THÀNH PHẦN UI CƠ BẢN

### 4.1 Button — `src/components/ui/Button.tsx`
- Có `loading` (spinner `animate-spin`), tự vô hiệu khi `loading`/`disabled`.
- ⚠ Mặc định **`w-full`** (chiếm hết bề ngang). Nút đặt cạnh nhau/trong hàng phải truyền `className="w-auto"`.
- Biến thể:

| Variant | Lớp | Dùng cho |
|---|---|---|
| `primary` | `bg-emerald-500 text-white hover:bg-emerald-600 hover:shadow-[…] disabled:bg-emerald-300` | Hành động chính |
| `outline` | `bg-transparent border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50` | Hành động phụ, Hủy, phân trang |
| `ghost` | `bg-transparent text-gray-600 hover:bg-gray-100 disabled:opacity-50` | Thanh công cụ |

- Kích cỡ: `sm` `px-3 py-1.5 text-xs` · `md` (mặc định) `px-4 py-3 text-[13px]` · `lg` `px-6 py-3.5 text-sm`. Bo `rounded-[7px]`, chữ `font-mono font-medium tracking-[0.05em]`.
- **Chuẩn:** hành động nguy hiểm (xóa, hủy đơn) dùng nền đỏ `bg-red-600 hover:bg-red-700` như `ConfirmDialog`; ❌ chưa có variant `danger` trong `Button`.

### 4.2 Badge — `src/components/ui/Badge.tsx`
- Dạng viên `rounded-full`, `font-mono text-[11px] font-semibold tracking-[0.03em] border`.
- Key hiện có: `Pending`, `Confirmed`, `Completed`, `Cancelled`, `Active`, `Maintenance`, `Closed`, `IN_USE`, `Unpaid`, `Paid` (màu ở §2.1.B).
- Nội dung hiển thị lấy từ `src/config/app.ts` (`BOOKING_STATUS_LABEL`, `INVOICE_STATUS_LABEL`, `COURT_STATUS_LABEL`...), **không** viết cứng chuỗi.
- ❌ Cần thêm `Disabled` và `NoInvoice` (§2.1.B).

### 4.3 Card — `src/components/ui/Card.tsx`
`bg-white border border-gray-200 rounded-[14px] shadow-[0_4px_24px_rgba(0,0,0,0.07)]`. Dùng cho khung form đăng nhập, thẻ khách, khối tra cứu.

### 4.4 Input và Label — `ui/Input.tsx`, `ui/Label.tsx`
- `Input`: hỗ trợ `icon` bên trái (`pl-10`), tự thêm nút Hiện/Ẩn khi `type="password"` (`aria-label` "Hiện/Ẩn mật khẩu"), hiển thị lỗi dưới ô `mt-1 text-xs text-red-500`.
- Trạng thái: thường `bg-gray-50 border border-gray-300 rounded-[7px] text-sm py-[11px]`; focus `border-emerald-500 bg-white` + bóng; disabled `bg-gray-100 text-gray-400 border-gray-200`; lỗi `border-red-400`.
- `Label`: `block text-[11px] font-semibold uppercase tracking-[0.06em] text-gray-500 mb-1.5 font-mono`; `required` thêm `*` đỏ `ml-0.5`.
- ⚠ Một số form (`ReservationForm`, `BookingLookupForm`) dùng `<input>` thô. **Chuẩn:** mọi trường nhập dùng `Input` + `Label`.

### 4.5 Modal và ConfirmDialog

**Hiện trạng:**
- `ConfirmDialog` (`ui/ConfirmDialog.tsx`): lớp phủ `fixed inset-0 bg-gray-900/60 z-[110]`, thân `bg-white border border-gray-200 rounded-xl w-[420px] max-w-[95vw] shadow-2xl p-6`; biến thể `warning` (nút `bg-amber-500`) và `danger` (`bg-red-600`); icon `warning` `text-amber-500`; có `isLoading` ("Đang xử lý...").
- **Chưa có component Modal dùng chung.** Các modal admin tự dựng `fixed inset-0 z-[100] bg-gray-900/60 backdrop-blur-[2px]`; dialog chi tiết đặt sân tự dựng với `z-50`.
- ⚠ `ConfirmDialog` và các modal **chưa** đóng bằng phím Esc, chưa có `role="dialog"`/`aria-modal`.

**Chuẩn Modal Shell** (cho các modal mới ở `UI-screens.md` §5; ❌ tách thành component `Modal` khi làm modal mới đầu tiên):
- Lớp phủ `fixed inset-0 z-[100] bg-gray-900/60 backdrop-blur-[2px] flex items-center justify-center`.
- Thân `bg-white border border-gray-200 rounded-xl shadow-2xl max-w-[95vw] max-h-[90vh] overflow-y-auto`; rộng 420px (xác nhận) hoặc 480–640px (form).
- Tiêu đề `font-display font-bold text-[15px]`; nút đóng icon `close` có `aria-label="Đóng"`.
- Chân: nút phụ `outline` (Hủy/Giữ…) bên trái nút chính; thao tác phá hủy dùng nền đỏ.
- Có `role="dialog" aria-modal="true" aria-labelledby`, đóng bằng **Esc**; đóng bằng X/Hủy **không** thay đổi dữ liệu; nút gửi vô hiệu khi đang xử lý; lỗi hiện ngay trong modal.
- Modal OTP, thu tiền, hoàn tiền… theo quy tắc riêng ở `UI-screens.md`.

### 4.6 Bộ chọn ngày — `ui/CustomDatePicker.tsx`
- **Hiện trạng:** nút dạng viên (`rounded-full`, nền trắng, icon `calendar_today`) hiển thị `T2, 20/10/2026` (viết tắt `CN, T2…T7`); popover lịch `w-[310px] rounded-2xl`, chuyển tháng trước/sau, chân có **"Hôm nay"** và **"Đóng"**; đóng khi bấm ra ngoài. **Không** có "Ngày mai". Vị trí mặc định `absolute bottom-5 left-7 z-20` (ghi đè bằng `className`). Dùng ngày **giờ trình duyệt**.
- **Chuẩn:** ❌ thêm nút `[<]` `[>]` chuyển ngày trước/sau cạnh nút chọn (WF-04, WF-12); khách không chọn được ngày quá khứ; đóng bằng Esc.

### 4.7 Phân trang — `ui/Pagination.tsx`
- Trái: `{từ}–{đến} / {tổng}` (`text-xs text-gray-500`). Phải: nút **Trước** / **Sau** (`outline`, `sm`) và `{trang}/{tổng trang}` (`font-mono text-xs`); tự vô hiệu ở đầu/cuối; ẩn khi không có bản ghi.
- **Chuẩn:** phân trang **phía máy chủ**, mặc định **20 bản ghi/trang**; đổi bộ lọc hoặc tab thì về trang 1.

---

## 5. THÀNH PHẦN NGHIỆP VỤ ĐẶC THÙ

### 5.1 Lưới ô đặt sân — `court/CourtGrid.tsx`, `CourtSlotCell.tsx`
- **Hiện trạng:**
  - Trục ngang 05:00–22:00 (hằng `START_HOUR`/`END_HOUR`), ô 30 phút `w-[72px] h-14`; trục dọc là tên sân + mô tả, cố định bên trái (`sticky left-0 z-[5]`).
  - Khung `bg-white rounded-2xl overflow-hidden`; cuộn ngang bằng bánh xe chuột (cuộn dọc → ngang).
  - Chân khung: chấm xanh `w-[7px] h-[7px] bg-green-500` **tĩnh** + chữ "Cập nhật mỗi 30 giây" (đúng với `refetchInterval` 30 giây); chú giải 4 mục: Còn trống, Đã đặt, Đặt của bạn, Đóng cửa.
  - Ô đã qua giờ của hôm nay bị vô hiệu (tính bằng giờ trình duyệt).
  - ⚠ Marker "giờ hiện tại": `isNowSlot` và `nowFrac` được tính và truyền xuống `CourtSlotCell` nhưng **không được vẽ** (chưa có gì hiển thị).
- **Chuẩn:**
  - Màu và tooltip ô theo §2.1.C; chú giải có chữ cho từng trạng thái; bỏ mục "Đặt của bạn" khỏi chú giải cho tới khi backend trả cờ `isMine`.
  - ⚠ Hàng sân Bảo trì/Đóng hiện **badge** trạng thái trên tiêu đề hàng (G-13).
  - Giờ hiển thị theo giờ mở cửa từng sân/ngày (G-04) — cần backend.
  - Marker giờ hiện tại là tùy chọn: nếu làm, vẽ vạch dọc `bg-red-500` rộng 2px tại vị trí `nowFrac` chỉ khi ngày đang xem là hôm nay; nếu không làm, xóa hai prop thừa.

### 5.2 Popup chọn thời lượng — `court/SlotPopup.tsx`
- **Hiện trạng:**
  - Panel tối `#1f2937`, `w-[210px] rounded-[14px] p-4`, neo bằng tọa độ động ngay trên ô được bấm (`fixed z-[200] -translate-x-1/2 -translate-y-full`) có mũi tên; đóng khi bấm ra ngoài.
  - Tiêu đề = tên sân; dòng giờ `HH:mm – HH:mm (nhãn)` (`font-mono text-[11px]`).
  - Danh sách thời lượng **60 / 90 / 120 / 150 / 180 phút** (nền `#374151`, chọn thì viền `emerald-500`, kèm giá), tự ẩn mức bị vướng slot đã đặt; không đủ chỗ hiện "Không đủ thời gian trống liên tiếp (tối thiểu 1 giờ)".
  - Nút `#10b981`: **"Đặt sân · {giá}"** (giá từ `usePricePreview`); trạng thái "Đang tính...", "Chưa có báo giá", "Không tải được giá".
  - ⚠ Nhiều giá trị đặt bằng `style` inline và `onMouseEnter/Leave`.
- **Chuẩn:**
  - ❌ **Bước 30 phút, tối thiểu 30 phút** (BR-20): thêm mức 30 phút (và 30 phút lẻ nếu lưới cho phép); thông báo "tối thiểu 30 phút".
  - Mức bị vô hiệu (trùng lịch, quá giờ đóng cửa, qua nửa đêm) hiển thị mờ kèm lý do ngắn, không ẩn hẳn.
  - Chuyển màu hover/chọn sang lớp Tailwind; giữ inline chỉ cho tọa độ.

### 5.3 Bảng dữ liệu vận hành — `admin/CourtTable.tsx`, `CustomersClient.tsx`, `EmployeesClient.tsx`
- **Hiện trạng/Chuẩn khung:**
  - Khung `bg-white border border-slate-200 rounded-xl overflow-hidden shadow-[0_1px_3px_rgba(0,0,0,0.04)]`.
  - Hàng tiêu đề `bg-slate-50/50 text-[10px] font-mono text-slate-400 uppercase tracking-wider`, ô `px-5 py-3 border-b border-slate-100 font-semibold`.
  - Hàng dữ liệu `hover:bg-slate-50 transition-colors`, đường kẻ `border-slate-100`.
  - Nút thao tác: `inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg border text-[11px] font-mono font-medium`; màu theo ý nghĩa — hiện ở `CourtTable`: **emerald** (Lịch & giá), **amber** (Trạng thái), **slate** (Chỉnh sửa); chuẩn: thao tác phá hủy (Xóa, Khóa) dùng **red**.
- **Chuẩn bổ sung:** dùng `<th scope="col">`; chữ tiêu đề cột `text-slate-500` (xem §7.1 về tương phản); có trạng thái rỗng và phân trang (§6, §4.7).
- **Thẻ thống kê** (`DashboardStats`, `CourtStats`): `bg-white border border-slate-200 rounded-xl` + bóng nhẹ, đệm `p-[18px]` (Dashboard) hoặc `p-4` (CourtStats); nhãn `text-[11px] font-mono uppercase tracking-wider text-slate-500`. Dashboard chuẩn có **3 thẻ** (Doanh thu hôm nay, Đơn chờ duyệt, Lượt sân đặt trong ngày); **không** có thẻ tỷ lệ lấp đầy.

### 5.4 Thanh phân bổ giá giờ chơi — `admin/PricingTimeline.tsx` ✅
- Chia đoạn 30 phút (`STEP = 30`, đoạn tối thiểu 30 phút); thanh trượt kéo mốc giờ (`.pricing-boundary`); màu đoạn theo §2.1.D; nút thêm/xóa mốc giá (nút xóa có `aria-label`, mốc đầu và mốc duy nhất không xóa được).
- Dùng trong `CourtOperationsModal` (tab T2–CN). **Chuẩn:** lưu lịch và lưu giá đi qua bước **Xem trước** (Wireframes 15.4/15.5) — hiện là hai nút lưu riêng.

### 5.5 Biểu đồ doanh thu — `admin/RevenueChart.tsx`
- **Hiện trạng:** Recharts `BarChart` trong khung `bg-white border border-slate-200 rounded-xl p-5 h-[350px]`, tiêu đề "Doanh thu 7 ngày gần nhất" (`text-[15px] font-bold`), cột `#3b82f6` `radius={[4,4,0,0]}` `barSize={32}`, lưới `#f1f5f9`, tooltip bo 8px viền `#e2e8f0` định dạng `formatCurrency`. Đang đặt trên Dashboard.
- **Chuẩn** (`UI-screens.md` QĐ-06): **gỡ khỏi Dashboard**, dùng lại ở **Báo cáo & Thống kê (WF-18)** làm biểu đồ cột theo kỳ (ngày/tháng).
- **Quy tắc nghiệp vụ:** doanh thu chỉ cộng hóa đơn **Đã thanh toán**, tính theo **thời điểm thu**; không tính hóa đơn Chưa thanh toán hay Đã hủy. Số liệu do API trả, không tự cộng ở FE.
- ⚠ Sửa `fontFamily` trục thành `var(--font-jetbrains)`.

### 5.6 Dòng thời gian lịch sử trạng thái — ❌ chưa có component
- **Áp dụng:** chi tiết đặt sân (WF-11) và theo dõi toàn hệ thống (WF-17).
- **Dữ liệu:** `statusHistory[]` gồm `oldStatus`, `newStatus`, `actorType`, `actorName`, `changedAt`, `reason`.
- **Chuẩn:** cột dọc, trục xám mảnh nối các nút tròn; màu nút theo trạng thái mới (Chờ xác nhận vàng, Đã xác nhận xanh dương, Hoàn thành xanh lá, Đã hủy đỏ). Mỗi mốc: `Cũ → Mới` (nhãn tiếng Việt), thời điểm giờ Việt Nam `dd/MM/yyyy HH:mm` (`font-mono text-xs`), tác nhân bằng `ACTOR_TYPE_LABEL` (**Hệ thống / Nhân viên / Khách hàng**) kèm họ tên, và **lý do** (chữ nghiêng màu xám) khi có (hủy, từ chối, đổi lịch…) — BR-13.

### 5.7 Modal xác minh OTP 6 ô (`M-01`) — ❌ chưa có
- **Áp dụng:** Đăng ký (WF-01), Quên mật khẩu (WF-03), Đặt nhanh vãng lai (WF-04). Hiện các luồng này dùng ô nhập mã inline.
- **Chuẩn:**
  - 6 ô số độc lập `w-11 h-12 text-center text-xl font-mono font-bold border border-gray-300 rounded-lg focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20`; tự nhảy ô khi nhập; Backspace lùi ô; hỗ trợ dán chuỗi 6 số.
  - Đếm ngược gửi lại **60 giây** (`Gửi lại mã (59s)`); mã hiệu lực **10 phút**; sai **5 lần** thì vô hiệu mã và hiện banner lỗi.

### 5.8 Widget Trợ lý AI — ❌ chưa có (`WF-08`)
- **Hiện trạng:** chỉ có route `src/app/api/chat/route.ts` (system prompt cố định; model đặt trong route). Chưa có component widget và chưa dùng icon `smart_toy`.
- **Chuẩn:**
  - Hiện trên mọi trang Cổng Khách hàng, **ẩn ở Cổng Quản trị** (G-11).
  - Nút nổi: `fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white shadow-lg`, icon `smart_toy` 28px.
  - Khung chat: `fixed bottom-24 right-6 z-[60] w-[380px] max-w-[90vw] h-[520px] max-h-[80vh] bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col overflow-hidden`; header 56px nền `#1a1f2e` chữ trắng `font-display font-bold text-sm`, nút `close`.
  - Tin khách: căn phải `bg-emerald-500 text-white rounded-2xl rounded-tr-none px-4 py-2.5 text-sm`; tin AI: căn trái `bg-white border border-gray-200 text-slate-800 rounded-2xl rounded-tl-none px-4 py-2.5 text-sm shadow-sm`; đang trả lời: 3 chấm `animate-bounce`.
  - **Banner cố định** đầu khung: AI chỉ tư vấn thông tin công khai, không đặt/hủy/đổi sân, không thu tiền, không xem dữ liệu cá nhân. Gợi ý nhanh (chip): Hướng dẫn đặt sân · Giá theo giờ · Gợi ý giờ còn trống · Hotline. Giá nêu là tham khảo; không có thông tin thì chỉ về hotline.

---

## 6. PHẢN HỒI TRẠNG THÁI

### 6.1 Toast (Sonner)
Cấu hình `src/app/providers.tsx`: `<Toaster position="top-right" richColors closeButton toastOptions={{ duration: 3000 }} />`.
- `toast.success`: thao tác thành công nhẹ ("Lưu thông tin thành công"…). `toast.error`: lỗi mạng, lỗi chung (dùng `getErrorMessage`).
- **Không dùng toast** cho lỗi nghiệp vụ nghiêm trọng (tài khoản bị khóa do sai mật khẩu 5 lần, bảo vệ Admin cuối, hủy quá hạn) — dùng **banner** trong trang hoặc **trong modal**.

### 6.2 Banner thông báo — ❌ chưa có component dùng chung
- **Chuẩn:** `rounded-lg border px-4 py-3 text-sm flex gap-2.5` + icon; `role="alert"` cho lỗi.
  - Lỗi: `bg-red-50 border-red-200 text-red-700`; cảnh báo: `bg-amber-50 border-amber-200 text-amber-700`; thông tin: `bg-blue-50 border-blue-200 text-blue-700`.
  - Banner lỗi tải dữ liệu có nút **Thử lại** (`outline`, `sm`).
- **Dùng cho:** banner khóa tài khoản và sai thông tin đăng nhập (WF-02), banner email đã có tài khoản (WF-01), lỗi tải danh sách, cảnh báo không khóa/xóa Admin cuối.

### 6.3 Trạng thái rỗng
- **Chuẩn:** khung căn giữa, icon `text-gray-300 text-[48px]`, tiêu đề `text-gray-600 font-medium text-sm`, nút gợi ý nếu người dùng có thể tạo dữ liệu. Câu chữ theo từng màn hình ở `UI-screens.md`.
- **Hiện trạng:** chỉ có ở `BookingLookupResult`; các danh sách khác chỉ hiện một dòng chữ.

### 6.4 Trạng thái đang tải
- **Hiện trạng:** chủ yếu là chữ "Đang tải…" (11 chỗ); chỉ `CourtOperationsModal` có skeleton thật. `animate-pulse` ở `CourtTable`/`CourtCardGrid` là chấm nhấp nháy của nhãn "Đang sử dụng", không phải skeleton.
- **Chuẩn:** skeleton `animate-pulse bg-slate-200/60 rounded-md`, cao bằng hàng thực để tránh nhảy bố cục; áp dụng cho lưới sân, bảng và thẻ thống kê. Nút gửi hiển thị `loading` (§4.1).

---

## 7. KHẢ NĂNG TIẾP CẬN VÀ QUY TẮC LẬP TRÌNH UI

### 7.1 Khả năng tiếp cận (WCAG AA)
**Hiện trạng:** 13 chỗ có `aria-label`; **chưa** có `scope="col"`, `sr-only`, hay xử lý phím Esc cho modal/popover; nhiều chữ `text-gray-400`/`text-slate-400` có độ tương phản thấp (`slate-400` trên nền trắng ≈ 2.6:1).

**Chuẩn:**
1. **Tương phản ≥ 4.5:1** cho chữ cung cấp thông tin: tối thiểu `text-gray-500`/`text-slate-500` (≈ 4.8:1 trên nền trắng); `*-400` chỉ cho placeholder, icon trang trí.
2. **Screen reader:** nút chỉ có icon bắt buộc có `aria-label`; bảng dùng `<thead>`, `<th scope="col">`; modal có `role="dialog"`, `aria-modal`, `aria-labelledby`; lỗi form gắn với trường; banner lỗi `role="alert"`.
3. **Bàn phím:** `Tab` tuần tự; `Enter` gửi form; **`Esc` đóng** modal/dialog/popover; trạng thái focus nhìn thấy rõ.
4. **Không chỉ dựa vào màu:** trạng thái ô lưới, nhãn đơn/hóa đơn luôn có chữ hoặc ký hiệu.

### 7.2 Quy tắc lập trình UI
1. **Gộp class bằng `cn()`** (`src/utils/index.ts`): `twMerge(clsx(inputs))`.
2. **Hạn chế style inline:** chỉ cho giá trị tính động (tọa độ popup, %, vị trí). ⚠ Hiện còn nhiều inline ở `SlotPopup`, chú giải lưới, hero — chuyển sang Tailwind khi sửa các file này.
3. **Định dạng dữ liệu:**
   - Tiền: `formatCurrency(amount)` → `100.000 ₫` (`Intl.NumberFormat("vi-VN")`).
   - Ngày giờ: `formatDate()` (`dd/MM/yyyy`), `formatDateTime()` (`dd/MM/yyyy HH:mm`) — dùng `date-fns`.
   - ⚠ Các hàm này và `CustomDatePicker` dùng **múi giờ trình duyệt**, và `toISODate()`/`getTodayISO()` dùng **UTC** (sai ngày trong khoảng 00:00–07:00 giờ VN; `ScheduleClient` đang dùng `getTodayISO()` làm ngày mặc định). **Chuẩn:** ngày/giờ nghiệp vụ lấy từ chuỗi API (`date`, `startTime` dạng `HH:mm`), không tự quy đổi; khi cần "hôm nay" dùng ngày địa phương theo giờ Việt Nam (như `localToday` trong `CourtGrid`), không dùng `getTodayISO()`.
4. **Nhãn trạng thái:** lấy từ `src/config/app.ts`; thuật ngữ hiển thị thống nhất theo `UI-screens.md` §2.5 ("Đã hủy", "Bị khóa", "Chưa lập hóa đơn"...).
5. **Màu thương hiệu:** dùng `emerald-*` (§2.1.A).

---

## 8. CÁC ĐIỂM BẢN 1.0 ĐÃ SAI VÀ ĐƯỢC SỬA

| # | Bản 1.0 | Thực tế / Chuẩn |
|---|---|---|
| 1 | Next.js 15, Tailwind "v3" ngầm định; font từ `@next/font/google` | Next.js 16, Tailwind v4 (`@import "tailwindcss"` + `@config`); font từ `next/font/google` |
| 2 | `primary-500` → "nút chính `bg-emerald-500`" | Hai thang màu khác mã; `primary-*` gần như không dùng, component dùng `emerald-*` |
| 3 | Marker giờ hiện tại và chấm xanh "nhấp nháy" trên lưới | Marker **không được vẽ**; chấm xanh tĩnh |
| 4 | Cột tên sân `w-[140px] z-10` | `min-width 130px`, `z-[5]` |
| 5 | `SlotPopup` "đã bổ sung mốc 30 phút"; nền popup xanh | Chỉ 60–180 phút; popup nền tối `#1f2937`; `z-[200]` |
| 6 | Dropdown `UserMenu` `z-20`; popup `z-[100]`; modal `z-[110]` | `UserMenu` `z-60`; modal admin `z-[100]`; `ConfirmDialog` `z-[110]`; `SlotPopup` `z-[200]`; dialog chi tiết đặt sân `z-50` |
| 7 | Header khách "fixed" và nội dung `max-w-7xl` chung | Header `sticky`; mỗi trang tự đặt bề rộng (1400/960/560) |
| 8 | Vùng nội dung admin `bg-slate-50`, `overflow-y-auto` | `bg-gray-100`, `overflow-auto` |
| 9 | Admin "9 mục / 4 nhóm" có "Đặt sân toàn hệ thống" | Chuẩn 10 mục; "Tất cả đặt sân" là tab, thêm "Tài khoản & Phân quyền"; code hiện 8 mục / 3 nhóm |
| 10 | Route admin `/schedule`, `/booking-requests`, `/bookings`… | Route mục tiêu `/admin/*` (`UI-screens.md` §2.6) |
| 11 | `CustomDatePicker` có "Hôm nay", "Ngày mai"; nhãn "Thứ 2" | Chỉ "Hôm nay"/"Đóng"; nhãn `T2`, `CN` |
| 12 | `Button` không nói rõ bề ngang | Mặc định `w-full` |
| 13 | Hero chữ 24–30px; bo `BookingCard`/`CourtCardGrid` là 14px/8px | Hero 34px; cả hai `rounded-xl` |
| 14 | Widget AI dùng "Claude 3.5 Sonnet / Haiku", mô tả như đã có | Chưa có widget; model đặt trong route; đây là chuẩn mục tiêu |
| 15 | Esc đóng modal, `scope="col"`, `sr-only`, toast `z-[9999]`, skeleton phổ biến | Là chuẩn mục tiêu; hiện chưa có (toast do Sonner quản lý z-index) |
| 16 | `formatDate`/`formatDateTime` theo múi giờ Việt Nam | Theo múi giờ trình duyệt; `getTodayISO` theo UTC (lưu ý ở §7.2) |
| 17 | Còn tham chiếu `UI-screens.md` v2.0, modal `M-01…M-19` | Đồng bộ `UI-screens.md` v3.1; mã modal giữ đúng Wireframes |
| 18 | Biểu đồ doanh thu thuộc Dashboard | Gỡ khỏi Dashboard (QĐ-06), dùng ở Báo cáo WF-18 |
