# HỆ THỐNG THIẾT KẾ GIAO DIỆN (DESIGN SYSTEM) – SHUTTLEVN
### Đặc tả Quy chuẩn Giao diện, Design Tokens & Thành phần UI Codebase

**Hệ thống Quản lý và Đặt sân Cầu lông Trực tuyến ShuttleVN**  
**Phiên bản tài liệu:** 1.0 · **Ngày cập nhật:** 20/10/2026  
**Căn cứ kỹ thuật & nghiệp vụ:**
- Mã nguồn giao diện thực tế trong `shuttle-vn-frontend/src` (Next.js 15 App Router, TypeScript, Tailwind CSS, TanStack Query, Zustand, Sonner, Recharts).
- Tệp cấu hình gốc: `tailwind.config.mts`, `src/app/globals.css`, `src/app/layout.tsx`, `src/config/app.ts`.
- Hồ sơ nghiệp vụ chuẩn: `SRS.md` v1.7, `UseCase.md` v1.5, `User-Flows.md` v1.1, `Wireframes.md` v2.0, `UI-screens.md` v2.0.

> **NGUYÊN TẮC BẢO ĐẢM:**
> 1. **Tuyệt đối trung thực với mã nguồn:** Phản ánh chính xác các biến token, lớp CSS, font chữ, kích thước, bo góc, màu sắc và component đang chạy thực tế trong `src/`.
> 2. **Đồng bộ với chuẩn nghiệp vụ tương lai:** Cung cấp đầy đủ hướng dẫn quy chuẩn cho các thành phần đang phát triển (Modal OTP 6 ô rời, Timeline xử lý đơn, bảng audit chỉ đọc, bộ lọc đa tiêu chí).
> 3. **Loại bỏ triệt để các tàn dư mockup lỗi thời:** Không có token hay component cho tỷ lệ lấp đầy, chấm công/ca làm việc, quản lý phiên/thiết bị hay cảnh báo phần cứng.

---

## MỤC LỤC

1. [Triết lý Thiết kế & Phân vùng Không gian (Design Philosophy)](#1-triết-lý-thiết-kế--phân-vùng-không-gian-design-philosophy)
2. [Hệ thống Design Tokens Nền tảng](#2-hệ-thống-design-tokens-nền-tảng)
   - [2.1 Bảng màu (Color Palette)](#21-bảng-màu-color-palette)
   - [2.2 Kiểu chữ & Phân cấp Typography](#22-kiểu-chữ--phân-cấp-typography)
   - [2.3 Khoảng cách & Bố cục Lưới (Spacing & Layout Grid)](#23-khoảng-cách--bố-cục-lưới-spacing--layout-grid)
   - [2.4 Bo góc (Border Radius) & Đổ bóng (Box Shadow)](#24-bo-góc-border-radius--đổ-bóng-box-shadow)
   - [2.5 Biểu tượng (Iconography)](#25-biểu-tượng-iconography)
   - [2.6 Phân cấp Lớp Z-Index (Z-Index Layer Tokens)](#26-phân-cấp-lớp-z-index-z-index-layer-tokens)
3. [Quy chuẩn Layout Shells & Điều hướng](#3-quy-chuẩn-layout-shells--điều-hướng)
   - [3.1 Cổng Khách hàng (Customer Shell)](#31-cổng-khách-hàng-customer-shell)
   - [3.2 Cổng Quản trị & Vận hành (Admin Shell)](#32-cổng-quản-trị--vận-hành-admin-shell)
4. [Thư viện Thành phần UI Cơ bản (Atomic Components)](#4-thư-viện-thành-phần-ui-cơ-bản-atomic-components)
   - [4.1 Nút bấm (Button)](#41-nút-bấm-button)
   - [4.2 Nhãn trạng thái (Badge)](#42-nhãn-trạng-thái-badge)
   - [4.3 Khung nội dung (Card)](#43-khung-nội-dung-card)
   - [4.4 Trường nhập liệu (Input & Label)](#44-trường-nhập-liệu-input--label)
   - [4.5 Hộp thoại xác nhận (ConfirmDialog & Modal Shell)](#45-hộp-thoại-xác-nhận-confirmdialog--modal-shell)
   - [4.6 Bộ chọn ngày (CustomDatePicker)](#46-bộ-chọn-ngày-customdatepicker)
   - [4.7 Thanh phân trang (Pagination)](#47-thanh-phân-trang-pagination)
5. [Thành phần Giao diện Nghiệp vụ Đặc thù (Domain Components)](#5-thành-phần-giao-diện-nghiệp-vụ-đặc-thù-domain-components)
   - [5.1 Lưới ô đặt sân (Court Slot Grid)](#51-lưới-ô-đặt-sân-court-slot-grid)
   - [5.2 Cửa sổ chọn thời lượng nổi (SlotPopup)](#52-cửa-sổ-chọn-thời-lượng-nổi-slotpopup)
   - [5.3 Bảng dữ liệu Vận hành (Admin Data Table)](#53-bảng-dữ-liệu-vận-hành-admin-data-table)
   - [5.4 Thanh phân bổ giá giờ chơi (PricingTimeline)](#54-thanh-phân-bổ-giá-giờ-chơi-pricingtimeline)
   - [5.5 Biểu đồ Doanh thu (RevenueChart)](#55-biểu-đồ-doanh-thu-revenuechart)
   - [5.6 Dòng thời gian lịch sử trạng thái (Status Timeline)](#56-dòng-thời-gian-lịch-sử-trạng-thái-status-timeline)
   - [5.7 Modal Xác minh Email OTP 6 ô rời (Modal M-01)](#57-modal-xác-minh-email-otp-6-ô-rời-modal-m-01)
   - [5.8 Widget Trợ lý ảo AI (ChatWidget.tsx - WF-08)](#58-widget-trợ-lý-ảo-ai-chatwidgettsx---wf-08)
6. [Hệ thống Phản hồi Trạng thái & Thông báo (Feedback & States)](#6-hệ-thống-phản-hồi-trạng-thái--thông-báo-feedback--states)
7. [Tiêu chuẩn Khả năng Tiếp cận & Quy tắc Lập trình UI](#7-tiêu-chuẩn-khả-năng-tiếp-cận--quy-tắc-lập-trình-ui)

---

## 1. TRIẾT LÝ THIẾT KẾ & PHÂN VÙNG KHÔNG GIAN (DESIGN PHILOSOPHY)

Hệ thống ShuttleVN phục vụ hai nhóm đối tượng với nhu cầu sử dụng hoàn toàn khác nhau, do đó giao diện được phân chia thành **hai không gian trải nghiệm (2 Sub-systems / Portals)** với đặc trưng thị giác riêng biệt:

### 1.1 Cổng Khách hàng (Customer Experience Portal)
- **Tôn chỉ:** Năng động, tin cậy, thể thao hiện đại, tối ưu hóa tốc độ hoàn tất giao dịch đặt sân.
- **Phong cách thị giác:**
  - Kết hợp nền tối sang trọng (`#1a1f2e` Dark Navy) ở thanh điều hướng và Hero Section với nền sáng (`bg-slate-50`) ở khu vực lưới sân và nội dung.
  - Điểm nhấn thị giác mạnh bằng tông xanh ngọc thể thao (`Emerald / Badminton Green`), tạo cảm giác tươi mới, chuẩn sân thi đấu.
  - Các khối thẻ bo góc lớn mềm mại (`rounded-[14px]`, `rounded-2xl`), hiệu ứng đổ bóng sâu (`shadow-[0_4px_24px_rgba(0,0,0,0.07)]`) tạo chiều sâu không gian.

### 1.2 Cổng Quản trị & Vận hành (Admin & Staff Productivity Portal)
- **Tôn chỉ:** Tối đa hóa năng suất làm việc (High-Density Productivity), rõ ràng, trung tính, không gây mỏi mắt trong ca trực kéo dài.
- **Phong cách thị giác (Clean Notion-like / Minimalist Workspace):**
  - Sử dụng nền xám trắng sạch sẽ (`#FBFBFA` Notion off-white), đường viền mảnh nhẹ nhàng (`#EAEAEA`, `border-slate-200`).
  - Phân cấp dữ liệu chặt chẽ bằng Typography kỹ thuật (`JetBrains Mono` cho mã số, ngày giờ; `Hanken Grotesk` cho tiêu đề; `Inter` cho nội dung bảng).
  - Tối ưu hóa mật độ hiển thị thông tin bảng biểu (Compact Data Grid), thao tác vi mô nhanh thông qua các nút hành động nhỏ (`text-[11px] font-mono`).

---

## 2. HỆ THỐNG DESIGN TOKENS NỀN TẢNG

### 2.1 Bảng màu (Color Palette)

Hệ màu ShuttleVN được định nghĩa trong `tailwind.config.mts` và các quy ước màu ngữ nghĩa trong `src/config/app.ts`, `src/app/globals.css`.

#### A. Tông màu Thương hiệu Chủ đạo (Primary Emerald Scale)
Màu xanh cầu lông đại diện cho sân đấu, sức khỏe và tính sẵn sàng:

| Token | Mã HEX | Ứng dụng thực tế trong Codebase |
|---|---|---|
| `primary-50` | `#f0fdf4` | Nền hover ô slot còn trống (`.slot-available:hover`), nền icon sân |
| `primary-100` | `#dcfce7` | Nền nhãn sân đang hoạt động, badge active |
| `primary-200` | `#bbf7d0` | Viền badge, viền ô slot trạng thái nhẹ |
| `primary-300` | `#86efac` | Viền hover ô slot còn trống (`border-color: #86efac`) |
| `primary-400` | `#4ade80` | Điểm nhấn active icon, viền focus sáng |
| `primary-500` | `#22c55e` | Màu nút bấm chính (`bg-emerald-500`), chấm nhấp nháy cập nhật thời gian thực |
| `primary-600` | `#16a34a` | Trạng thái hover nút chính (`hover:bg-emerald-600`), icon logo admin |
| `primary-700` | `#15803d` | Màu chữ nhấn mạnh trên nền sáng, text nút lịch & giá |
| `primary-800` | `#166534` | Con trỏ kéo timeline (`.pricing-boundary::-webkit-slider-thumb`) |
| `primary-900` | `#14532d` | Chữ tiêu đề tương phản cao |
| `primary-950` | `#052e16` | Nền tối tương phản tối đa |

#### B. Màu sắc Trạng thái Ngữ nghĩa (Semantic Status Colors)
Quy chuẩn đồng nhất giữa `Badge.tsx`, `BOOKING_STATUS_COLOR`, `INVOICE_STATUS_LABEL`:

| Trạng thái Nghiệp vụ | Mã Màu Tailwind | Lớp CSS thực tế (`Badge.tsx`) | Ý nghĩa & Đối tượng áp dụng |
|---|---|---|---|
| **Hoàn thành / Đã thanh toán / Hoạt động** | `Green / Emerald` | `bg-green-50 text-green-600 border-green-200` | Đơn `Completed`, Hóa đơn `Paid`, Sân `Active`, Khách `Active` |
| **Đã xác nhận / Đang sử dụng** | `Blue` | `bg-blue-50 text-blue-600 border-blue-200` | Đơn `Confirmed`, Sân `IN_USE`, Cột biểu đồ `RevenueChart` (`#3b82f6`) |
| **Chờ xác nhận / Chưa thanh toán / Bảo trì** | `Amber / Yellow` | `bg-amber-50 text-amber-600 border-amber-200` | Đơn `Pending`, Hóa đơn `Unpaid`, Sân `Maintenance`, Warning |
| **Đã hủy / Đóng cửa / Nguy hiểm** | `Red` | `bg-red-50 text-red-600 border-red-200` | Đơn `Cancelled`, Hóa đơn `Cancelled`, Sân `Closed`, Nút Xóa |

#### C. Màu Trạng thái Ô Slot Đặt sân (Court Slot Colors trong `globals.css`)

| Trạng thái Slot | Lớp CSS Component | Màu nền & Viền | Hiệu ứng Con trỏ & Tương tác |
|---|---|---|---|
| **Còn trống (`AVAILABLE`)** | `.slot-available` | Nền trắng `#FFFFFF`, viền `#E5E7EB` (`gray-200`) | Hover: nền `#f0fdf4`, viền `#86efac`, con trỏ `pointer` |
| **Đã đặt (`BOOKED`)** | `.slot-booked` | Nền xám `#E5E7EB` (`gray-200`), viền `#D1D5DB` (`gray-300`) | Con trỏ `not-allowed`, không tương tác |
| **Đặt của bạn (`MINE`)** | `.slot-mine` | Nền xanh ngọc `#10b981`, viền `#059669` | Con trỏ `pointer`, hiển thị tooltip đơn của khách |
| **Đóng cửa / Nghỉ (`CLOSED`)** | `.slot-closed` | Nền `#f3f4f6`, sọc chéo -45° `#d1d5db` & `#e5e7eb` | Con trỏ `not-allowed`, vô hiệu hóa hoàn toàn |

#### D. Màu Phân đoạn Bảng giá Giờ chơi (`PricingTimeline.tsx`)

| Đoạn giá | Lớp Màu Nền | Ý nghĩa phân đoạn |
|---|---|---|
| Phân đoạn 1 | `bg-[#DDECDD]` | Giờ thấp điểm sáng sớm (ví dụ: 05:00–08:00) |
| Phân đoạn 2 | `bg-[#DDECF3]` | Giờ hành chính ban ngày (ví dụ: 08:00–16:00) |
| Phân đoạn 3 | `bg-[#F5EACB]` | Giờ cao điểm chiều tối (ví dụ: 16:00–20:00) |
| Phân đoạn 4 | `bg-[#E8E2F0]` | Giờ đêm muộn (ví dụ: 20:00–22:00) |

---

### 2.2 Kiểu chữ & Phân cấp Typography

Codebase tích hợp 3 font chữ chuyên biệt thông qua `@next/font/google` trong `src/app/layout.tsx`:

```typescript
// Định nghĩa trong layout.tsx
const inter = Inter({ subsets: ["latin", "vietnamese"], variable: "--font-inter" });
const hankenGrotesk = Hanken_Grotesk({ subsets: ["latin"], variable: "--font-hanken" });
const jetBrainsMono = JetBrains_Mono({ subsets: ["latin"], variable: "--font-jetbrains" });
```

#### A. Bảng ánh xạ Font chữ (Font Mapping)

| Phân loại | Tên Font | Lớp Tailwind | Phạm vi Ứng dụng |
|---|---|---|---|
| **Body Sans** | **Inter** | `font-sans` | Toàn bộ văn bản nội dung, đoạn văn, nhãn form, mô tả chung, placeholder |
| **Display Heading** | **Hanken Grotesk** | `font-display` | Tiêu đề trang (H1, H2), Tên sân, Số liệu Dashboard lớn, Brand Logo |
| **Data & Technical** | **JetBrains Mono** | `font-mono` | Mã đơn (`DS-XXXXX`), Mã Hóa đơn (`HD-...`), Giờ giấc (`17:30`), Đơn giá (`100.000 ₫`), Nhãn Badge, Nút bấm (`Button.tsx`), Nhãn Label in hoa |

#### B. Phân cấp Cỡ chữ & Trọng số (Type Hierarchy & Scale)

| Cấp bậc | Cỡ chữ / Line-height | Font chữ & Trọng số | Ví dụ sử dụng trong Codebase |
|---|---|---|---|
| **Hero Title** | `text-2xl` hoặc `text-3xl` (24–30px) | `font-display font-bold` | "Đặt Sân Cầu Lông" trên trang `/courts` |
| **Page Title** | `text-[17px]` hoặc `text-[16px]` | `font-display font-bold` | Tiêu đề Header Admin ("Quản lý sân", "Lịch sân") |
| **Card / Section Title** | `text-[15px]` | `font-display font-bold` | Tên thứ trong tuần ở lưới sân, Tiêu đề biểu đồ doanh thu |
| **Body Regular** | `text-sm` (14px) / 20px | `font-sans font-normal` | Văn bản nội dung form, mô tả modal, kết quả tra cứu |
| **Table Content** | `text-[13px]` | `font-sans` hoặc `font-display` | Tên khách hàng, email trong bảng, mô tả sân |
| **Button Label** | `text-[13px]` (`md`), `text-xs` (`sm`) | `font-mono font-medium tracking-[0.05em]` | "ĐĂNG NHẬP", "XÁC NHẬN ĐẶT SÂN", "Lịch & giá" |
| **Badge Label** | `text-[11px]` | `font-mono font-semibold tracking-[0.03em]` | "Chờ xác nhận", "Đã thanh toán", "Đang hoạt động" |
| **Form Uppercase Label** | `text-[11px]` | `font-mono font-semibold uppercase tracking-[0.06em]` | "HỌ VÀ TÊN *", "MÃ ĐẶT SÂN *", "SỐ ĐIỆN THOẠI *" |
| **Table Header** | `text-[10px]` | `font-mono font-semibold uppercase tracking-wider` | "TÊN SÂN", "TRẠNG THÁI", "THAO TÁC" trong `CourtTable` |
| **Micro Tag** | `text-[9px]` | `font-mono font-medium uppercase tracking-wide` | Tag "ADMIN" trên thanh Sidebar `AdminSidebar.tsx` |

---

### 2.3 Khoảng cách & Bố cục Lưới (Spacing & Layout Grid)

Hệ thống khoảng cách tuân thủ bước nhảy lũy tiến 4px (Base-4 scale của Tailwind CSS):

- **Micro Spacing:**
  - `gap-1` (4px), `gap-1.5` (6px), `gap-2` (8px): Khoảng cách giữa icon và chữ trong button, khoảng cách giữa các badge.
  - `px-2.5 py-[3px]`: Padding chuẩn của badge.
  - `px-3 py-1.5`: Padding chuẩn của button kích cỡ nhỏ `sm`.
- **Form & Input Spacing:**
  - `py-[11px] px-3`: Chiều cao chuẩn ô input (tương đương height 44px đạt chuẩn cảm ứng ngón tay).
  - `mb-1.5`: Khoảng cách giữa Label và Input.
  - `space-y-4` (16px) hoặc `space-y-5` (20px): Khoảng cách giữa các hàng form fields.
- **Card & Table Spacing:**
  - `p-5` hoặc `p-6`: Padding bên trong của Card và Modal.
  - `px-5 py-3.5`: Padding ô dữ liệu của Table hàng ngang.
- **Lưới ô thời gian (Court Grid Cell Matrix):**
  - Chiều rộng mỗi ô 30 phút: `w-[72px] min-w-[72px]`.
  - Chiều cao hàng sân: `h-14` (56px).
  - Khoảng cách cột giờ chẵn (60 phút): Đường kẻ đậm hơn (`border-r-gray-300` so với `border-r-gray-200` của mốc 30 phút).

---

### 2.4 Bo góc (Border Radius) & Đổ bóng (Box Shadow)

#### A. Quy chuẩn Bo góc (Radius Tokens)
Định nghĩa trong `:root { --radius: 0.5rem; }` (`globals.css`) và các lớp cụ thể:

| Radius Token | Giá trị | Lớp Tailwind | Áp dụng cho Component |
|---|---|---|---|
| **Full** | `9999px` | `rounded-full` | `Badge.tsx`, Avatar khách hàng, Nút floating bot tròn |
| **Extra Large** | `16px` | `rounded-2xl` | Container Lưới sân `CourtGrid.tsx`, Thẻ Hero Section |
| **Large Card** | `14px` | `rounded-[14px]` | `Card.tsx`, Thẻ đặt sân `BookingCard.tsx` |
| **Modal / Table** | `12px` | `rounded-xl` | `ConfirmDialog.tsx`, `CourtTable.tsx`, Khung biểu đồ |
| **Medium Element** | `8px` | `rounded-lg` / `rounded-[8px]` | Thẻ sân `CourtCardGrid.tsx`, Icon container |
| **Control Standard** | `7px` | `rounded-[7px]` | `Button.tsx`, `Input.tsx`, Nút bấm xác nhận trong dialog |
| **Slot Cell** | `5px` | `rounded-[5px]` | Ô slot trạng thái bên trong lưới sân `CourtSlotCell.tsx` |

#### B. Quy chuẩn Đổ bóng (Elevation & Shadows)

| Cấp bậc Elevation | Giá trị Shadow CSS | Ngữ cảnh Sử dụng |
|---|---|---|
| **Subtle (Bảng / Thẻ Admin)** | `shadow-[0_1px_3px_rgba(0,0,0,0.04)]` | Thẻ thống kê Admin, Bảng danh sách sân, Bảng khách hàng |
| **Card Elevation (Khách hàng)**| `shadow-[0_4px_24px_rgba(0,0,0,0.07)]` | Thẻ `Card.tsx`, Thẻ tra cứu đơn, Thẻ hồ sơ cá nhân |
| **Primary Button Glow** | `hover:shadow-[0_4px_14px_rgba(16,185,129,0.28)]` | Hiệu ứng rê chuột trên nút chính màu xanh Emerald |
| **Focus Ring Glow** | `focus:shadow-[0_0_0_3px_rgba(16,185,129,0.12)]` | Viền phát sáng tập trung khi focus vào Input |
| **Dialog Backdrop Elevation** | `shadow-2xl` (tương đương `0 25px 50px -12px rgba(0,0,0,0.25)`) | Hộp thoại nổi Modal, `ConfirmDialog.tsx`, Popup chọn thời lượng |

---

### 2.5 Biểu tượng (Iconography)

ShuttleVN chuẩn hóa việc sử dụng bộ thư viện **Google Material Symbols Outlined** (được nhúng qua CDN font trong `layout.tsx`).

- **Cấu hình chuẩn:**
  ```html
  <span className="material-symbols-outlined text-[18px]" style={{ fontVariationSettings: "'FILL' 0" }}>
    icon_name
  </span>
  ```
  *(Khi biểu tượng ở trạng thái active hoặc được chọn, chuyển `fontVariationSettings: "'FILL' 1"`)*.

- **Bảng quy ước Biểu tượng chuẩn theo Nghiệp vụ:**

| Biểu tượng | Tên Icon Material | Ý nghĩa / Màn hình sử dụng |
|---|---|---|
| 🎾 | `sports_tennis` | Logo thương hiệu ShuttleVN, Quản lý sân đấu |
| 📊 | `space_dashboard` | Bảng điều khiển tổng quan (`WF-09`) |
| 📅 | `calendar_month` | Lịch sân vận hành (`WF-12`) |
| ⏰ | `calendar_clock` | Nút cấu hình lịch và bảng giá sân (`WF-15`) |
| 💳 | `payments` | Quản lý thanh toán & hóa đơn (`WF-13`) |
| 👥 | `group` | Quản lý khách hàng (`WF-14`) |
| 🪪 | `badge` | Quản lý nhân viên & tài khoản (`WF-16`) |
| 📈 | `monitoring` | Thống kê & báo cáo doanh thu (`WF-18`) |
| 📜 | `history` | Nhật ký hoạt động Audit Log (`WF-19`) |
| 🔍 | `search` | Ô tìm kiếm mã đơn, tìm kiếm khách hàng |
| ⚠️ | `warning` | Icon cảnh báo trong `ConfirmDialog.tsx` |
| 👁️ | `visibility` / `visibility_off` | Toggle Hiện / Ẩn mật khẩu trong `Input.tsx` |
| 🔄 | `sync` | Đổi nhanh trạng thái sân trong bảng |
| 🤖 | `smart_toy` / `chat` | Widget Trợ lý AI Chatbot (`WF-08`) |
| 🚪 | `logout` | Nút Đăng xuất trên thanh Topbar |

---

### 2.6 Phân cấp Lớp Z-Index (Z-Index Layer Tokens)

Để ngăn chặn triệt để lỗi xung đột ngữ cảnh xếp lớp (Stacking Context conflicts) giữa các thành phần giao diện cố định và cửa sổ nổi, ShuttleVN quy chuẩn hóa 7 cấp độ `z-index`:

| Token / Lớp | Giá trị Z-Index | Thành phần Giao diện Áp dụng |
|---|---|---|
| `z-normal` | `z-0` | Nội dung văn bản, bảng, thẻ thông thường |
| `z-sticky-element` | `z-10` | Cột tên sân cố định bên trái lưới (`CourtGrid`), Header cố định của bảng |
| `z-dropdown` | `z-20` | Popover lịch chọn ngày (`CustomDatePicker`), Dropdown menu tài khoản (`UserMenu`) |
| `z-header` | `z-50` | Thanh điều hướng khách (`CustomerNav`), Topbar quản trị (`AdminHeader`), Nút tròn nổi AI Bot |
| `z-popover-panel` | `z-[60]` | Khung hội thoại AI Chatbot khi mở rộng ở góc phải màn hình |
| `z-court-popup` | `z-[100]` | Cửa sổ chọn thời lượng slot nổi trên lưới (`SlotPopup.tsx`) |
| `z-modal-backdrop` | `z-[110]` | Lớp phủ nền mờ và cửa sổ Modal (`ConfirmDialog.tsx`, Modals `M-01` đến `M-19`) |
| `z-toast-notification`| `z-[9999]` | Thông báo Toast góc trên bên phải màn hình (`Sonner Toaster`) |

---

## 3. QUY CHUẨN LAYOUT SHELLS & ĐIỀU HƯỚNG

### 3.1 Cổng Khách hàng (Customer Shell)
- **File tham chiếu:** `src/app/(customer)/layout.tsx`, `src/components/layout/CustomerNav.tsx`.
- **Đặc điểm kích thước:**
  - Header cố định trên cùng: Chiều cao `h-[56px]`, màu nền `#1a1f2e` (Dark Navy).
  - Vùng nội dung chính: Căn giữa `max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6`.
- **Thành phần điều hướng:**
  - Trái: Logo ShuttleVN kèm biểu tượng `sports_tennis` màu xanh ngọc.
  - Giữa: Liên kết điều hướng chính:
    - `Đặt sân`: `/courts` (hoặc `/booking`).
    - `Lịch sử đặt sân`: `/my-bookings` (chỉ hiển thị khi đã đăng nhập, `requiresAuth: true`).
    - `Tra cứu đơn`: `/lookup` (dành cho mọi đối tượng).
  - Phải:
    - Chưa đăng nhập: `LoginButton.tsx` dẫn tới `/login`.
    - Đã đăng nhập: `UserMenu.tsx` (avatar tròn chứa chữ cái đầu họ tên, menu popover dẫn tới `/profile`, `/my-bookings` và nút Đăng xuất).

### 3.2 Cổng Quản trị & Vận hành (Admin Shell)
- **File tham chiếu:** `src/app/(admin)/layout.tsx`, `src/components/layout/AdminSidebar.tsx`, `src/components/layout/AdminHeader.tsx`.
- **Đặc điểm kích thước:**
  - Sidebar bên trái cố định: Chiều rộng `w-[220px] flex-shrink-0 min-h-screen`, màu nền `#FBFBFA`, viền phải `border-r border-[#EAEAEA]`.
  - Header trên cùng (Topbar): Chiều cao `h-[52px]`, màu nền trắng, viền dưới `border-b border-gray-200`.
  - Content Workspace: Nền `bg-slate-50`, phần đệm `p-6 overflow-y-auto`.
- **Phân quyền hiển thị Menu Sidebar (Theo Quyết định cốt lõi X-02):**
  - **Nhân viên vận hành (`Employee` - thấy 4 mục):**
    - Lịch sân (`/schedule`)
    - Yêu cầu đặt sân (`/booking-requests`)
    - Thanh toán (`/payments`)
    - Khách hàng (`/customers`)
  - **Quản trị viên (`Admin` - thấy toàn bộ 9 mục thuộc 4 nhóm):**
    - *Tổng quan:* Bảng điều khiển (`/dashboard`), Thống kê (`/statistics`).
    - *Vận hành:* Lịch sân (`/schedule`), Yêu cầu đặt sân (`/booking-requests`), Thanh toán (`/payments`), Quản lý sân (`/manage-courts`).
    - *Quản trị:* Khách hàng (`/customers`), Nhân viên (`/employees`), Đặt sân toàn hệ thống (`/bookings`), Nhật ký hoạt động (`/audits`).

---

## 4. THƯ VIỆN THÀNH PHẦN UI CƠ BẢN (ATOMIC COMPONENTS)

### 4.1 Nút bấm (Button)
- **File mã nguồn:** `src/components/ui/Button.tsx`.
- **Đặc tính kỹ thuật:** Hỗ trợ `loading` (spinner xoay `animate-spin`), `disabled`, và tự động vô hiệu hóa khi đang tải.
- **Biến thể (Variants):**

```typescript
// 1. Primary Variant (Chủ đạo): Dùng cho hành động quan trọng nhất (Đăng nhập, Đặt sân, Lưu)
className = "bg-emerald-500 text-white hover:bg-emerald-600 hover:shadow-[0_4px_14px_rgba(16,185,129,0.28)] disabled:bg-emerald-300"

// 2. Outline Variant: Dùng cho hành động phụ, điều hướng phân trang, nút quay lại
className = "bg-transparent border border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50"

// 3. Ghost Variant: Dùng trong thanh công cụ, icon action không viền
className = "bg-transparent text-gray-600 hover:bg-gray-100 disabled:opacity-50"
```

- **Kích cỡ (Sizes):**
  - `sm`: `px-3 py-1.5 text-xs` (dùng trong phân trang, micro-actions).
  - `md` *(mặc định)*: `px-4 py-3 text-[13px]` (dùng trong form).
  - `lg`: `px-6 py-3.5 text-sm` (dùng trong hero CTA).

---

### 4.2 Nhãn trạng thái (Badge)
- **File mã nguồn:** `src/components/ui/Badge.tsx`.
- **Kiểu dáng:** Bo tròn tuyệt đối (`rounded-full`), font chữ kỹ thuật (`font-mono text-[11px] font-semibold tracking-[0.03em] border`).
- **Mã ánh xạ màu sắc chuẩn:**

```typescript
const STATUS_CLASSES: Record<BadgeStatus, string> = {
  // Trạng thái đơn đặt sân
  Pending:     "bg-amber-50 text-amber-600 border-amber-200", // Chờ xác nhận
  Confirmed:   "bg-blue-50 text-blue-600 border-blue-200",     // Đã xác nhận
  Completed:   "bg-green-50 text-green-600 border-green-200",  // Hoàn thành
  Cancelled:   "bg-red-50 text-red-600 border-red-200",        // Đã hủy

  // Trạng thái sân đấu
  Active:      "bg-green-50 text-green-600 border-green-200",  // Đang hoạt động
  Maintenance: "bg-amber-50 text-amber-600 border-amber-200", // Bảo trì
  Closed:      "bg-red-50 text-red-600 border-red-200",        // Đóng cửa
  IN_USE:      "bg-blue-50 text-blue-600 border-blue-200",     // Đang có người chơi

  // Trạng thái hóa đơn
  Unpaid:      "bg-amber-50 text-amber-600 border-amber-200", // Chưa thanh toán
  Paid:        "bg-green-50 text-green-600 border-green-200",  // Đã thanh toán
};
```

---

### 4.3 Khung nội dung (Card)
- **File mã nguồn:** `src/components/ui/Card.tsx`.
- **Quy cách:** `bg-white border border-gray-200 rounded-[14px] shadow-[0_4px_24px_rgba(0,0,0,0.07)]`.
- **Ứng dụng:** Thẻ tóm tắt thông tin, thẻ đặt sân của khách, khung tra cứu đơn, khung form đăng nhập.

---

### 4.4 Trường nhập liệu (Input & Label)
- **File mã nguồn:** `src/components/ui/Input.tsx`, `src/components/ui/Label.tsx`.
- **Đặc tính thông minh của Input:**
  - Hỗ trợ Icon bên trái (`pl-10`).
  - Tự động tích hợp nút toggle Hiện/Ẩn mắt mật khẩu khi `type="password"` (icon `visibility` / `visibility_off`).
  - Hỗ trợ hiển thị dòng thông báo lỗi validation màu đỏ bên dưới.
- **Quy chuẩn hiển thị:**
  - Trạng thái thường: `bg-gray-50 border border-gray-300 rounded-[7px] text-[#1a1a2e] text-sm py-[11px] pr-3`.
  - Trạng thái Focus: `focus:border-emerald-500 focus:shadow-[0_0_0_3px_rgba(16,185,129,0.12)] focus:bg-white`.
  - Trạng thái Disabled: `disabled:bg-gray-100 disabled:text-gray-400 disabled:border-gray-200 disabled:cursor-not-allowed`.
  - Trạng thái Lỗi: `border-red-400 focus:border-red-400 focus:shadow-[0_0_0_3px_rgba(239,68,68,0.12)]`.
- **Quy cách Label:**
  - Font kỹ thuật in hoa: `text-[11px] font-semibold uppercase tracking-[0.06em] text-gray-500 mb-1.5 font-mono`.
  - Dấu hoa thị bắt buộc: `<span className="text-red-500 ml-0.5">*</span>`.

---

### 4.5 Hộp thoại xác nhận (ConfirmDialog & Modal Shell)
- **File mã nguồn:** `src/components/ui/ConfirmDialog.tsx`.
- **Quy cách Modal Overlay:**
  - Lớp mờ nền (Backdrop): `fixed inset-0 bg-gray-900/60 flex items-center justify-center z-[110]`.
  - Thân Modal (Dialog Container): `bg-white border border-gray-200 rounded-xl w-[420px] max-w-[95vw] shadow-2xl p-6`.
  - Biến thể: `warning` (icon cảnh báo màu vàng amber-500, nút confirm `bg-amber-500`) hoặc `danger` (nút confirm `bg-red-600 hover:bg-red-700`).

---

### 4.6 Bộ chọn ngày (CustomDatePicker)
- **File mã nguồn:** `src/components/ui/CustomDatePicker.tsx`.
- **Quy cách:**
  - Hiển thị ngày được chọn dạng thân thiện tiếng Việt: `"Thứ 2, 20/10/2026"`.
  - Popover lịch dạng ma trận tháng, hỗ trợ điều hướng Tháng trước / Tháng sau, tự động đóng khi click ra ngoài.
  - Phím chọn nhanh: "Hôm nay", "Ngày mai".

---

### 4.7 Thanh phân trang (Pagination)
- **File mã nguồn:** `src/components/ui/Pagination.tsx`.
- **Quy cách:**
  - Bên trái: Chỉ số bản ghi `font-sans text-xs text-gray-500` dạng `"1–20 / 85"`.
  - Bên phải: Nút "Trước" (`variant="outline" size="sm"`), số trang `font-mono text-xs` (`"1/5"`), nút "Sau". Tự động vô hiệu hóa ở trang đầu và trang cuối.

---

## 5. THÀNH PHẦN GIAO DIỆN NGHIỆP VỤ ĐẶC THÙ (DOMAIN COMPONENTS)

### 5.1 Lưới ô đặt sân (Court Slot Grid)
- **File mã nguồn:** `src/components/court/CourtGrid.tsx`, `CourtSlotCell.tsx`.
- **Cấu trúc:**
  - Trục ngang: Trục thời gian từ 05:00 đến 22:00 chia thành các slot 30 phút (`w-[72px] min-w-[72px]`).
  - Trục dọc: Danh sách tên sân cố định bên trái (`sticky left-0 bg-white z-10 w-[140px]`).
  - Hàng Now Marker: Đường kẻ chỉ giờ hiện tại (màu đỏ/xanh) tính theo tỷ lệ `nowFrac` di chuyển liên tục theo thời gian thực.
  - Nhịp cập nhật dữ liệu: Hiển thị chấm tròn xanh nhấp nháy kèm chữ "Cập nhật mỗi 30 giây" (`font-mono text-[11px]`).

---

### 5.2 Cửa sổ chọn thời lượng nổi (SlotPopup)
- **File mã nguồn:** `src/components/court/SlotPopup.tsx`.
- **Đặc tính:** Cửa sổ popover nổi được tính toán tọa độ động (`x`, `y`) neo trực tiếp ngay trên ô slot vừa click.
- **Nội dung:**
  - Tên sân & Thời gian bắt đầu: ví dụ `"Sân 1 · Bắt đầu lúc 17:30"`.
  - Các nút chọn thời lượng (Pills): `[ 30p ]`, `[ 60p ]`, `[ 90p ]`, `[ 120p ]`, `[ 150p ]`, `[ 180p ]`. *(Đã bổ sung mốc 30 phút theo chuẩn BR-20)*.
  - Tự động kiểm tra các ô liên tiếp phía sau: Nếu bị vướng slot đã đặt thì disable các mức thời lượng vượt quá.
  - Nút Submit: `"Đặt sân · {Tổng tiền} ₫"` (`bg-emerald-500 text-white`).

---

### 5.3 Bảng dữ liệu Vận hành (Admin Data Table)
- **File mã nguồn:** `src/components/admin/CourtTable.tsx`, `src/app/(admin)/customers/CustomersClient.tsx`, `EmployeesClient.tsx`.
- **Quy chuẩn cấu trúc:**
  - Khung bao: `bg-white border border-slate-200 rounded-xl overflow-hidden shadow-[0_1px_3px_rgba(0,0,0,0.04)]`.
  - Header bảng: `bg-slate-50/50 text-[10px] font-mono text-slate-400 uppercase tracking-wider px-5 py-3 border-b border-slate-100`.
  - Hàng dữ liệu: `hover:bg-slate-50 transition-colors border-b border-slate-100 last:border-b-0`.
  - Nút thao tác nhanh (Micro Action Buttons): `inline-flex items-center gap-1 px-2.5 py-1.5 rounded-lg border text-[11px] font-mono font-medium transition-colors cursor-pointer`.

---

### 5.4 Thanh phân bổ giá giờ chơi (PricingTimeline)
- **File mã nguồn:** `src/components/admin/PricingTimeline.tsx`.
- **Đặc tính:** Giao diện trực quan cho phép Quản trị viên cấu hình bảng giá nhiều mức theo khung giờ trong ngày:
  - Chia đoạn 30 phút (`STEP = 30`).
  - Thanh trượt mốc giờ (`.pricing-boundary::-webkit-slider-thumb`) kéo mốc giờ bắt đầu/kết thúc mượt mà.
  - Màu sắc phân biệt các đoạn giá: `bg-[#DDECDD]`, `bg-[#DDECF3]`, `bg-[#F5EACB]`, `bg-[#E8E2F0]`.
  - Nút "+ Thêm mốc giá" và icon xóa đoạn giá.

---

### 5.5 Biểu đồ Doanh thu (RevenueChart)
- **File mã nguồn:** `src/components/admin/RevenueChart.tsx`.
- **Thư viện:** Recharts (`ResponsiveContainer`, `BarChart`, `Bar`, `XAxis`, `YAxis`, `Tooltip`).
- **Quy cách hiển thị:**
  - Cột doanh thu: Màu xanh dương `#3b82f6` (`blue-500`), bo góc trên `radius={[4, 4, 0, 0]}`, độ rộng cột `barSize={32}`.
  - Trục tọa độ: Font `var(--font-jetbrains-mono)` cỡ 10px, màu `#64748b`.
  - Tooltip: Bo góc `8px`, viền `#e2e8f0`, format đơn vị tiền tệ VNĐ chuẩn xác.
  - Nghiệp vụ: **Chỉ cộng doanh thu từ các hóa đơn đã thanh toán (`Paid`)**, không tính hóa đơn chưa thanh toán hay đã hủy.

---

### 5.6 Dòng thời gian lịch sử trạng thái (Status Timeline)
- **Áp dụng tại:** Trang chi tiết đơn đặt sân (`WF-11`) và theo dõi đặt sân (`WF-17`).
- **Cấu trúc thị giác:**
  - Dạng cột dọc: Trục kẻ xám mảnh nối các nút tròn trạng thái.
  - Nút tròn: Đổi màu theo trạng thái (Vàng cho Chờ xác nhận, Xanh dương cho Đã xác nhận, Xanh lá cho Hoàn thành, Đỏ cho Đã hủy).
  - Nội dung mỗi mốc:
    - Trạng thái: `Cũ → Mới`.
    - Thời điểm: Giờ Việt Nam `dd/MM/yyyy HH:mm` (`font-mono text-xs`).
    - Tác nhân: Badge `System` / `Employee` / `Customer` kèm họ tên người thực hiện.
    - **Lý do thay đổi:** Bắt buộc hiển thị chữ nghiêng màu xám khi đơn bị Hủy hoặc Từ chối (`BR-13`).

---

### 5.7 Modal Xác minh Email OTP 6 ô rời (Modal M-01)
- **Áp dụng tại:** Đăng ký tài khoản (`WF-01`), Quên mật khẩu (`WF-03`), Khách vãng lai đặt nhanh (`WF-04`).
- **Quy cách thiết kế mục tiêu:**
  - 6 ô input số độc lập: `w-11 h-13 text-center text-xl font-mono font-bold border border-gray-300 rounded-lg focus:border-emerald-500 focus:ring-2 focus:ring-emerald-500/20`.
  - Tự động nhảy con trỏ sang ô tiếp theo khi nhập số.
  - Tự động xóa lùi khi bấm Backspace.
  - Hỗ trợ sự kiện Paste: Tự động phân tách chuỗi 6 ký tự số vào 6 ô.
  - Đếm ngược gửi lại mã: Bộ đếm 60 giây dạng `Gửi lại mã (59s)`.
  - Hạn sử dụng: 10 phút; nhập sai quá 5 lần thì tự động vô hiệu hóa mã và hiển thị banner thông báo lỗi.

---

### 5.8 Widget Trợ lý ảo AI (ChatWidget.tsx - WF-08)
- **Áp dụng tại:** Tất cả các màn hình thuộc Cổng Khách hàng (ẩn hoàn toàn ở Cổng Quản trị theo chuẩn `G-11`).
- **Kết nối Backend:** Endpoint `src/app/api/chat/route.ts` sử dụng Claude 3.5 Sonnet / Haiku của Anthropic SDK.
- **Quy cách thị giác:**
  - **Nút kích hoạt tròn nổi (Floating Trigger):**
    - Vị trí: `fixed bottom-6 right-6 z-50`.
    - Kích thước: `w-14 h-14 rounded-full bg-emerald-500 hover:bg-emerald-600 text-white shadow-lg hover:shadow-xl flex items-center justify-center transition-all cursor-pointer`.
    - Icon: Material Symbol `smart_toy` (size 28px).
  - **Khung hội thoại mở rộng (Chat Panel):**
    - Vị trí: `fixed bottom-24 right-6 z-[60] w-[380px] max-w-[90vw] h-[520px] max-h-[80vh] bg-white rounded-2xl shadow-2xl border border-gray-200 flex flex-col overflow-hidden`.
    - **Header:** Chiều cao 56px, nền `#1a1f2e` (Dark Navy), chữ trắng `font-display font-bold text-sm`, nút thu nhỏ/đóng icon `close`.
    - **Danh sách tin nhắn (Message Thread):** Vùng cuộn `flex-1 p-4 overflow-y-auto space-y-3 bg-slate-50`.
      - Tin nhắn khách hàng: Căn phải, `bg-emerald-500 text-white rounded-2xl rounded-tr-none px-4 py-2.5 text-sm`.
      - Tin nhắn AI: Căn trái, `bg-white border border-gray-200 text-slate-800 rounded-2xl rounded-tl-none px-4 py-2.5 text-sm shadow-sm`.
      - Hiệu ứng phản hồi: 3 chấm nhảy sinh động (`animate-bounce`) khi đang gọi API Claude.
    - **Gợi ý nhanh (Quick Chips):** Thanh trượt ngang chứa các câu hỏi mẫu (`text-xs font-mono bg-white border border-emerald-200 text-emerald-700 px-3 py-1 rounded-full hover:bg-emerald-50 cursor-pointer`).
    - **Input Footer:** Ô nhập câu hỏi `font-sans text-sm bg-gray-50 border border-gray-200 rounded-xl px-3 py-2 focus:bg-white` và nút Gửi màu xanh ngọc.

---

## 6. HỆ THỐNG PHẢN HỒI TRẠNG THÁI & THÔNG BÁO (FEEDBACK & STATES)

### 6.1 Thông báo Toast (Sonner)
Cấu hình trong `src/app/providers.tsx`:
```tsx
<Toaster position="top-right" richColors closeButton toastOptions={{ duration: 3000 }} />
```
- **Toast Thành công (`toast.success`):** Nền xanh lá nhạt, icon check. Sử dụng cho: *"Đăng nhập thành công"*, *"Lưu thông tin thành công"*, *"Xác nhận đặt sân thành công"*.
- **Toast Thất bại (`toast.error`):** Nền đỏ nhạt, icon lỗi. Sử dụng cho lỗi mạng, lỗi validate hệ thống.
- **Nguyên tắc nghiệp vụ:** **Không dùng toast cho lỗi nghiệp vụ nghiêm trọng** (ví dụ tài khoản bị khóa do đăng nhập sai quá 5 lần, hoặc vi phạm bảo vệ QTV cuối cùng) – những trường hợp này bắt buộc dùng Banner lỗi cố định trong trang hoặc trong Modal.

### 6.2 Trạng thái Trống (Empty State)
- Áp dụng khi danh sách không có dữ liệu (không có đơn đặt sân, bảng khách hàng rỗng, audit log không khớp bộ lọc).
- Cấu trúc: Khung căn giữa, icon kích thước lớn màu xám nhạt (`text-gray-300 text-[48px]`), tiêu đề trung tính (`text-gray-600 font-medium text-sm`), và nút hành động gợi ý nếu người dùng có thể tạo dữ liệu mới.

### 6.3 Trạng thái Đang tải (Loading Skeleton)
- Sử dụng hiệu ứng xung nhịp (`animate-pulse`) với màu nền xám nhạt `bg-slate-200/60 rounded-md`.
- Độ cao skeleton khớp với độ cao của dòng bảng thực tế để tránh nhảy layout (layout shift) khi dữ liệu tải xong.

---

## 7. TIÊU CHUẨN KHẢ NĂNG TIẾP CẬN & QUY TẮC LẬP TRÌNH UI

### 7.1 Chuẩn tiếp cận Web (Accessibility - WCAG AA)
1. **Độ tương phản màu sắc (Contrast Ratio):** Mọi văn bản hiển thị phải đạt độ tương phản tối thiểu `4.5:1` so với màu nền.
2. **Hỗ trợ Screen Reader:**
   - Mọi nút bấm chỉ chứa icon (như nút sửa, xóa, toggle mật khẩu) bắt buộc phải có thuộc tính `aria-label` hoặc thẻ `<span className="sr-only">`.
   - Các bảng dữ liệu bắt buộc có thẻ `<thead>`, `<th>` kèm `scope="col"`.
3. **Điều hướng bàn phím (Keyboard Navigation):**
   - Hỗ trợ phím `Tab` tuần tự qua các ô input.
   - Phím `Enter` để kích hoạt submit form.
   - Phím `Escape` để đóng ngay lập tức bất kỳ Modal / Dialog / Popover nào đang mở.

### 7.2 Quy tắc Lập trình UI trong Codebase
1. **Hợp nhất lớp CSS (Class Merging):** Bắt buộc sử dụng hàm tiện ích `cn()` từ `src/utils/index.ts`:
   ```typescript
   export function cn(...inputs: ClassValue[]): string {
     return twMerge(clsx(inputs));
   }
   ```
2. **Không viết style inline tùy tiện:** Chỉ sử dụng style inline cho các giá trị động được tính toán theo thời gian thực (ví dụ: tọa độ `x`, `y` của popover, vị trí phần trăm `nowFrac` của Now Marker). Toàn bộ kiểu dáng còn lại phải sử dụng lớp Tailwind chuẩn.
3. **Định dạng dữ liệu thống nhất:**
   - Tiền tệ: Bắt buộc dùng `formatCurrency(amount)` (sinh chuỗi VND có dấu phân cách hàng nghìn).
   - Ngày tháng: Bắt buộc dùng `formatDate(date)` (`dd/MM/yyyy`) hoặc `formatDateTime(date)` (`dd/MM/yyyy HH:mm`) theo múi giờ Việt Nam (UTC+7).

---

*Tài liệu được biên soạn đồng bộ, kiểm duyệt nghiêm ngặt dựa trên mã nguồn thực tế và hệ thống tiêu chuẩn kỹ thuật của ShuttleVN.*
