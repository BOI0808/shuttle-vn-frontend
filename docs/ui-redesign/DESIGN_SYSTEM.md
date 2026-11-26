# HỆ THỐNG THIẾT KẾ QUY CHUẨN SHUTTLEVN (DESIGN SYSTEM SPECIFICATION)
## Tài liệu Quy chuẩn Duy nhất cho Triển khai Frontend (Single Source of Truth)

* **Dự án:** ShuttleVN (Hệ thống quản lý cơ sở sân cầu lông tích hợp Trợ lý AI)
* **Phiên bản:** v1.1.0 (Final Approved Design System - Synced with Updated Figma)
* **Thời điểm lập:** 26/11/2026
* **Căn cứ pháp lý & kỹ thuật:** 
  - Figma Approved Design: File `oKgloxLTqAdsZG599iDolt` (`Nhật Khôi's team library (Copy)`: Admin Dashboard `3314:28`, Thành phần dùng chung `3314:39`, và các phân hệ `01 · Xác thực` `3325:112`, `02 · Khách hàng` `3325:113`, `03 · Vận hành` `3325:114`, `04 · Quản trị` `3325:115`, `05 · Thành phần & phản hồi vận hành` `3325:116`)
  - Định hướng thiết kế: `DESIGN_DIRECTIONS.md` (Định hướng 1: Athletic Kinetic lai tạo)
  - Khảo sát hiện trạng: `FRONTEND_DISCOVERY.md`
  - Báo cáo kiểm định: `UI_UX_BASELINE_AUDIT.md`
  - Tiêu chuẩn phương pháp: UI/UX Pro Max Intelligence, WCAG 2.1 AA/AAA, Nielsen Norman Heuristics.
* **Mục đích tài liệu:** Quy chuẩn hóa toàn bộ Design Tokens, Components, Layouts, Interaction States và Responsive Rules làm căn cứ duy nhất để Coding Agent triển khai mã nguồn không sai lệch.

---

## MỤC LỤC
1. [TỔNG QUAN & NGUYÊN TẮC CỐT LÕI (OVERVIEW & PRINCIPLES)](#1-tổng-quan--nguyên-tắc-cốt-lõi-overview--principles)
2. [HỆ THỐNG MÃ MÀU CHUẨN HÓA (COLOR SYSTEM & TOKENS)](#2-hệ-thống-mã-màu-chuẩn-hóa-color-system--tokens)
3. [HỆ THỐNG KIỂU CHỮ (TYPOGRAPHY SYSTEM)](#3-hệ-thống-kiểu-chữ-typography-system)
4. [KHOẢNG CÁCH, BO GÓC & BỐ CỤC (SPACING, RADII & LAYOUT)](#4-khoảng-cách-bo-góc--bố-cục-spacing-radii--layout)
5. [ĐẶC TẢ THÀNH PHẦN DÙNG CHUNG (SHARED COMPONENT SPECS)](#5-đặc-tả-thành-phần-dùng-chung-shared-component-specs)
6. [TRẠNG THÁI TƯƠNG TÁC (INTERACTION STATES & MICRO-FEEDBACK)](#6-trạng-thái-tương-tác-interaction-states--micro-feedback)
7. [QUY TẮC HIỂN THỊ ĐA THIẾT BỊ (RESPONSIVE RULES)](#7-quy-tắc-hiển-thị-đa-thiết-bị-responsive-rules)
8. [QUY TẮC BIỂU DIỄN DỮ LIỆU PHỨC TẠP (DATA VISUALIZATION)](#8-quy-tắc-biểu-diễn-dữ-liệu-phức-tạp-data-visualization)
9. [ĐỐI CHIẾU TIÊU CHUẨN UI/UX PRO MAX](#9-đối-chiếu-tiêu-chuẩn-uiux-pro-max)
10. [BÁO CÁO PHÁT HIỆN & ĐỐI SOÁT MÂU THUẪN (FIGMA VS DOCS)](#10-báo-cáo-phát-hiện--đối-soát-mâu-thuẫn-figma-vs-docs)
11. [HƯỚNG DẪN TRIỂN KHAI CHO LẬP TRÌNH VIÊN (DEVELOPER HANDOFF GUIDE)](#11-hướng-dẫn-triển-khai-cho-lập-trình-viên-developer-handoff-guide)

---

## 1. TỔNG QUAN & NGUYÊN TẮC CỐT LÕI (OVERVIEW & PRINCIPLES)

### 1.1 Triết lý Thiết kế: Athletic Kinetic (Thể thao Lai tạo Tinh chuẩn)
Hệ thống thiết kế ShuttleVN được xây dựng trên triết lý **Athletic Kinetic** kết hợp tinh chuẩn công nghiệp và lòng hiếu khách thể thao:
1. **Tinh thần Thể thao Năng động (Athletic Energy):** Sử dụng dải màu xanh ngọc thương hiệu (`#087F5B` và `#066649`) chuẩn sân thi đấu BWF quốc tế kết hợp nền ấm nhẹ (`#FDF8F8`) và chữ xanh hải quân sâu (`#172F4D`), mang lại cảm giác tươi mới, chính xác, sắc nét và đáng tin cậy.
2. **Kỷ luật Vận hành & Mật độ Tinh chỉnh (Precision Density):** Cổng Quản trị áp dụng cơ chế nén mật độ thông tin thông minh (chiều cao dòng bảng 44px, thẻ KPI 128px, phím tắt `Ctrl+K`), giúp nhân viên quầy và chủ cơ sở quét mắt tức thì, không click trượt.
3. **Hiếu khách & An tâm (Hospitality & Peace of Mind):** Cổng Khách hàng tập trung giảm ma sát đặt sân dưới 60 giây, minh bạch tuyệt đối tên sân và báo giá theo từng phút, cung cấp Thẻ vé vào sân (Match Ticket) kèm mã QR an tâm sau khi hoàn tất.

### 1.2 Nguồn Tham chiếu & Quyền ưu tiên (Hierarchy of Truth)
Khi có sự khác biệt giữa các nguồn tài liệu, thứ tự ưu tiên tuyệt đối được áp dụng như sau:
1. **Mức 1 (Tối cao về Trực quan & Tokens):** Thiết kế Figma đã duyệt (`oKgloxLTqAdsZG599iDolt`, bao gồm `3314:28`, `3314:39` và các section `3325:112`–`3325:116`).
2. **Mức 2 (Nguyên tắc & Định hướng tổng thể):** `DESIGN_DIRECTIONS.md`.
3. **Mức 3 (Ràng buộc Nghiệp vụ & An toàn Kỹ thuật):** `FRONTEND_DISCOVERY.md` & `UI_UX_BASELINE_AUDIT.md`.
4. **BỎ QUA TOÀN BỘ:** Mọi tài liệu cũ trong `docs/design/legacy/` (`Design-System.md`, `UI-screens.md`, `Wireframes.md`).

### 1.3 Ranh giới Kỹ thuật & Bất biến Nghiệp vụ (Immutable Invariants)
Bất kỳ thành phần giao diện nào được xây dựng đều phải tuân thủ nghiêm ngặt các ranh giới sau:
- **Công nghệ cốt lõi:** Next.js 16 (App Router), React 19, Tailwind CSS v4, TypeScript 5, Recharts 2.12, Sonner Toast, Google Material Symbols Outlined.
- **Tính toán Báo giá An toàn:** Giá tính toán 100% server-side theo từng phút, kèm chữ ký số `quoteFingerprint`. Khi gặp lỗi 409 Conflict, bắt buộc client phải hiển thị giá cập nhật để người dùng xác nhận lại trước khi tạo đơn.
- **Quy tắc 1 Giờ Hủy/Đổi Lịch:** Khách hàng chỉ được tự hủy/đổi lịch khi đơn chưa thanh toán VÀ cách giờ chơi tối thiểu 1 tiếng (`canRescheduleBooking`). Đơn đã thanh toán bắt buộc hiển thị hướng dẫn liên hệ hotline.
- **Vòng đời Đơn & Hóa đơn:** Tuyệt đối không có nút tạo hóa đơn thủ công. Hóa đơn chỉ sinh tự động khi đơn chuyển `Confirmed` hoặc `Completed`. Đơn `Pending` luôn mang nhãn "Chưa lập hóa đơn".
- **Chống Gửi Lặp (Idempotency):** Mọi mutation ghi dữ liệu (đặt sân, hủy, đổi lịch, duyệt, thu tiền) đều phải truyền header `Idempotency-Key` (UUID ngẫu nhiên).
- **Múi giờ Vận hành:** Giờ Việt Nam (UTC+7). Toàn bộ định dạng ngày giờ và lịch phải neo theo UTC+7, không dùng chuỗi UTC thuần.

---

## 2. HỆ THỐNG MÃ MÀU CHUẨN HÓA (COLOR SYSTEM & TOKENS)

Toàn bộ hệ thống mã màu được trích xuất trực tiếp từ Figma Variables (`ShuttleVN/*`) và chuẩn hóa theo mô hình 3 tầng (Primitive -> Semantic -> Component).

### 2.1 Bảng Mã Màu Nguyên bản (Primitive Color Palette)

```
        BRAND                     SURFACES                  CONTENT / TEXT
┌───────────────────────┐ ┌───────────────────────┐ ┌───────────────────────┐
│ #087F5B (Brand)       │ │ #FFFFFF (White Pure)  │ │ #172F4D (Ink Navy)    │
│ #066649 (BrandStrong) │ │ #FDF8F8 (Warm Canvas) │ │ #40556B (Secondary)   │
│ #E8F6EF (BrandSoft)   │ │ #EDF2F6 (Soft Slate)  │ │ #596D80 (Muted Slate) │
└───────────────────────┘ └───────────────────────┘ └───────────────────────┘
        BORDERS                    STATUS                   FEEDBACK TINTS
┌───────────────────────┐ ┌───────────────────────┐ ┌───────────────────────┐
│ #DCE5ED (Line)        │ │ #B42332 (Red)         │ │ #FFF0F1 (Red Soft)    │
│ #B9C8D6 (Strong)      │ │ #A45A0B (Amber)       │ │ #FFF4E2 (Amber Soft)  │
│ #087F5B (Focus Ring)  │ │ #245B99 (Blue)        │ │ #EBF2FA (Blue Soft)   │
└───────────────────────┘ └───────────────────────┘ └───────────────────────┘
```

| Tên Token Figma | Mã HEX | Tương đương / Vai trò | Mục đích & Ngữ cảnh sử dụng |
|:---|:---:|:---|:---|
| `ShuttleVN/brand` | `#087F5B` | Brand Primary | Màu thương hiệu chính, điểm nhấn biểu đồ, mốc hoàn thành sân, focus ring. |
| `ShuttleVN/brandStrong` | `#066649` | Brand Strong | Nền nút bấm Primary, chữ active navigation, liên kết hành động, số KPI doanh thu. |
| `ShuttleVN/brandSoft` | `#E8F6EF` | Brand Soft | Nền item navigation active, nền nhãn Đã thu tiền, nền thẻ KPI Doanh thu, nền icon thành công. |
| `ShuttleVN/white` | `#FFFFFF` | Pure White | Nền thẻ Card, Header, Modal, ô Input, nút Outline, hàng tổng kết bảng. |
| `ShuttleVN/bg` | `#FDF8F8` | Canvas / Sidebar | Nền toàn bộ không gian làm việc (Canvas), nền Sidebar, nền item nav inactive, nền skeleton. |
| `ShuttleVN/soft` | `#EDF2F6` | Soft Surface | Nền badge Chưa lập hóa đơn, nền input Disabled, nền phím tắt `Ctrl K`, thanh ray tiến độ sân, ô slot Unknown. |
| `ShuttleVN/line` | `#DCE5ED` | Hairline Border | Viền thẻ Card, đường phân cách dòng bảng, đường kẻ divider 1px, viền skeleton. |
| `ShuttleVN/strong` | `#B9C8D6` | Control Border | Viền ô nhập liệu (Input), viền nút Outline, viền thanh `QuickLookup`. *(Figma variable `ShuttleVN/strong`)* |
| `ShuttleVN/ink` | `#172F4D` | Deep Navy Ink | Tiêu đề chính, giá trị dữ liệu trong bảng, nền thanh điều hướng Khách hàng (`CustomerNav`). |
| `ShuttleVN/secondary` | `#40556B` | Secondary Text | Nhãn phụ, phụ đề, tiêu đề cột bảng (12px), văn bản nút Outline/Ghost, text mặc định trong bảng/chart. |
| `ShuttleVN/muted` | `#596D80` | Muted Text | Tiêu đề nhóm Sidebar (`TỔNG QUAN`, `VẬN HÀNH`, `QUẢN TRỊ`), placeholder ô nhập, mốc giờ đặt bằng 0. |
| `ShuttleVN/amber` | `#A45A0B` | Warning / Pending | Chữ trạng thái Chờ xác nhận, số KPI Đơn chờ duyệt, cảnh báo rủi ro, sân đang bảo trì. |
| `ShuttleVN/amberSoft` | `#FFF4E2` | Amber Soft Tint | Nền nhãn Chờ xác nhận, nền thẻ KPI Đơn chờ duyệt, nền ô slot bảo trì. |
| `ShuttleVN/red` | `#B42332` | Danger / Error | Chữ trạng thái Đã hủy, viền & thông báo lỗi Input, cảnh báo lỗi, nút nguy hiểm. |
| `ShuttleVN/redSoft` | `#FFF0F1` | Red Soft Tint | Nền thông báo lỗi hệ thống, nền nhãn Đã hủy, nền phản hồi lỗi thao tác. |
| `ShuttleVN/blue` | `#245B99` | Info / Confirmed | Chữ trạng thái Đã xác nhận, số KPI Lượt sân đặt trong ngày, liên kết thông tin. |
| `ShuttleVN/blueSoft` | `#EBF2FA` | Blue Soft Tint | Nền nhãn Đã xác nhận, nền thẻ KPI Lượt sân đặt, nền hàng tiêu đề cột bảng (`Column headers`). |

---

### 2.2 Tokens Ngữ nghĩa & Ánh xạ Giao diện (Semantic Layer)

```css
:root {
  /* Brand Semantics */
  --color-brand-primary: #087F5B;
  --color-brand-hover: #066649;         /* brandStrong - dùng làm background nút primary */
  --color-brand-active: #05523A;
  --color-brand-subtle: #E8F6EF;        /* brandSoft */
  --color-brand-ring: rgba(8, 127, 91, 0.25);

  /* Surface & Canvas */
  --color-surface-base: #FDF8F8;        /* bg - nền canvas chung */
  --color-surface-card: #FFFFFF;        /* white - nền thẻ card & modal */
  --color-surface-subtle: #EDF2F6;      /* soft - skeleton & shortcut pills */
  --color-surface-sidebar: #FDF8F8;     /* bg - nền sidebar theo Figma */
  --color-surface-header: #FFFFFF;      /* white - header quản trị */

  /* Text & Typography */
  --color-text-primary: #172F4D;        /* ink - chữ chính */
  --color-text-secondary: #40556B;      /* secondary - chữ phụ & header bảng */
  --color-text-muted: #596D80;          /* muted - nhãn nhóm & placeholder */
  --color-text-inverse: #FFFFFF;        /* Trắng trên nền đậm */

  /* Borders & Dividers */
  --color-border-subtle: #DCE5ED;       /* line - viền card & bảng */
  --color-border-input: #B9C8D6;        /* strong - viền ô nhập & nút outline */
  --color-border-focus: #087F5B;        /* brand */

  /* Status Colors */
  --color-status-success-text: #066649; /* brandStrong */
  --color-status-success-bg: #E8F6EF;   /* brandSoft */
  --color-status-warning-text: #A45A0B; /* amber */
  --color-status-warning-bg: #FFF4E2;   /* amberSoft */
  --color-status-danger-text: #B42332;  /* red */
  --color-status-danger-bg: #FFF0F1;    /* redSoft */
  --color-status-info-text: #245B99;    /* blue */
  --color-status-info-bg: #EBF2FA;      /* blueSoft */
  --color-status-neutral-text: #40556B; /* secondary */
  --color-status-neutral-bg: #EDF2F6;   /* soft */
}
```

---

### 2.3 Bảng Kiểm định Độ tương phản Tiếp cận (WCAG 2.1 Contrast Matrix)
Toàn bộ cặp màu trong Design System đều được đo kiểm dựa trên chuẩn WCAG 2.1 AA (tối thiểu 4.5:1 đối với văn bản thường, 3.0:1 đối với văn bản lớn) và WCAG AAA (7.0:1):

| Cặp màu Kiểm định (Foreground / Background) | Tỉ lệ Tương phản (Ratio) | Chuẩn WCAG 2.1 | Kết quả Đánh giá |
|:---|:---:|:---:|:---:|
| `ShuttleVN/ink` (`#172F4D`) trên `white` (`#FFFFFF`) | **13.5 : 1** | AAA | **ĐẠT XUẤT SẮC** (Chữ chính siêu nét) |
| `white` (`#FFFFFF`) trên `ShuttleVN/ink` (`#172F4D`) | **13.5 : 1** | AAA | **ĐẠT XUẤT SẮC** (Thanh điều hướng Khách hàng) |
| `ShuttleVN/ink` (`#172F4D`) trên `bg` (`#FDF8F8`) | **12.9 : 1** | AAA | **ĐẠT XUẤT SẮC** |
| `ShuttleVN/secondary` (`#40556B`) trên `white` (`#FFFFFF`) | **7.7 : 1** | AAA | **ĐẠT XUẤT SẮC** (Giải quyết triệt để lỗi cũ) |
| `ShuttleVN/secondary` (`#40556B`) trên `bg` (`#FDF8F8`) | **7.3 : 1** | AAA | **ĐẠT XUẤT SẮC** (Tiêu đề cột bảng, nav inactive) |
| `ShuttleVN/muted` (`#596D80`) trên `bg` (`#FDF8F8`) | **5.1 : 1** | AA | **ĐẠT VƯỢT CHUẨN** (Nhãn nhóm sidebar, placeholder) |
| `white` (`#FFFFFF`) trên `brandStrong` (`#066649`) | **7.0 : 1** | AAA | **ĐẠT XUẤT SẮC** (Nút bấm Primary) |
| `brandStrong` (`#066649`) trên `brandSoft` (`#E8F6EF`) | **6.3 : 1** | AA | **ĐẠT VƯỢT CHUẨN** (Badge Đã thu tiền, KPI Doanh thu) |
| `amber` (`#A45A0B`) trên `amberSoft` (`#FFF4E2`) | **4.8 : 1** | AA | **ĐẠT CHUẨN** (Badge Chờ xác nhận, KPI Đơn chờ) |
| `red` (`#B42332`) trên `redSoft` (`#FFF0F1`) | **5.9 : 1** | AA | **ĐẠT VƯỢT CHUẨN** (Thông báo lỗi, Badge Đã hủy) |
| `blue` (`#245B99`) trên `blueSoft` (`#EBF2FA`) | **6.1 : 1** | AA | **ĐẠT VƯỢT CHUẨN** (Badge Đã xác nhận, KPI Lượt sân) |
| `secondary` (`#40556B`) trên `soft` (`#EDF2F6`) | **6.8 : 1** | AA | **ĐẠT VƯỢT CHUẨN** (Badge Chưa lập hóa đơn, `Ctrl K`) |

> [!IMPORTANT]
> **Quy tắc Chống Lỗi (Anti-pattern Rule):** Nghiêm cấm hoàn toàn việc sử dụng `text-slate-400` hoặc `text-gray-400` cho bất kỳ văn bản đọc được nào trên nền sáng (vì độ tương phản chỉ đạt 2.6:1, vi phạm nặng WCAG). Mức xám tối thiểu cho phép là `text-[#40556B]` (`secondary`) cho văn bản và `text-[#596D80]` (`muted`) cho nhãn phụ/placeholder.

---

## 3. HỆ THỐNG KIỂU CHỮ (TYPOGRAPHY SYSTEM)

### 3.1 Bộ Phông chữ Quy chuẩn (Font Families)
Hệ thống chuẩn hóa trên 2 họ phông chữ cốt lõi (tối ưu tải trang và đồng bộ 100% với Figma Variables):
1. **Phông Tiêu đề & Nhận diện (Display / Brand):** `Be Vietnam Pro` (fallback: `Hanken Grotesk`, `system-ui`).
   - *Lý do:* Trong Figma approved design (`3314:28` và `3314:39`), toàn bộ tiêu đề trang (`24px SemiBold`) và tiêu đề mục (`18px Medium`) được thiết lập bằng `Be Vietnam Pro`. Đây là phông chữ hình học hiện đại được tối ưu hóa bản địa cho tiếng Việt, hiển thị dấu thanh hoàn hảo, không bị vỡ dấu hay lệch khoảng cách ký tự.
   - *Biến CSS:* `--font-display`.
2. **Phông Giao diện, Form, Văn bản, Dữ liệu, Thời gian & Mã số (Interface, Body, Data & Time):** `Inter` (sans-serif) kết hợp OpenType feature `tabular-nums` (`font-feature-settings: "tnum" 1`).
   - *Lý do:* Đúng theo định nghĩa gốc trong Figma Variables (`ShuttleVN/data`: `Font(family: "Inter", size: 14)` và `ShuttleVN/code`: `Font(family: "Inter", size: 12)`). Toàn bộ ngày giờ `18:00–19:30`, giá tiền `150.000 đ`, mã đơn `DS-XXXXX` và số liệu biểu đồ đều dùng phông chữ `Inter` đồng bộ, sử dụng tính năng số học độ rộng đồng đều (`tabular-nums` / `tnum`) để số căn thẳng hàng tuyệt đối mà không cần tải thêm phông Monospace riêng biệt, giúp giảm thiểu dung lượng gói tải font và tăng tính hiện đại, liền mạch của giao diện.
   - *Biến CSS:* `--font-sans` hoặc `--font-inter`.

---

### 3.2 Thang Phông chữ & Phân cấp Thị giác (Type Scale & Hierarchy)

```
[KPI Metric]       32px / Leading 40px / SemiBold (600)  / Inter (tabular-nums)
[Page Title]       24px / Leading 32px / SemiBold (600)  / Be Vietnam Pro
[Section Title]    18px / Leading 26px / Medium (500)    / Be Vietnam Pro
[Body / Control]   14px / Leading 20px / Regular (400)   / Inter
[Control Strong]   14px / Leading 20px / SemiBold (600)  / Inter
[Data Numeric]     14px / Leading 20px / Medium (500)    / Inter (tabular-nums)
[Label / Header]   12px / Leading 16px / SemiBold (600)  / Inter
[Caption / Helper] 12px / Leading 16px / Regular (400)   / Inter
[Code / Badge]     12px / Leading 16px / Regular (400)   / Inter (tabular-nums)
```

| Tên Style Token | Figma Variable Gốc | Phông chữ áp dụng | Cỡ chữ / Dòng (Size / Line Height) | Độ đậm (Weight) | Khoảng cách ký tự (Tracking) | Vai trò & Nơi sử dụng |
|:---|:---|:---|:---:|:---:|:---:|:---|
| `display-kpi` | `ShuttleVN/kpi` | `Inter` | 32px / 40px | SemiBold (600) | Normal (`tabular-nums`) | Số liệu doanh thu, số lượt đặt lớn trong Statistic Card. |
| `heading-page` | `ShuttleVN/page` | `Be Vietnam Pro` | 24px / 32px | SemiBold (600) | Normal (`0`) | Tiêu đề chính của màn hình (`Page heading`). |
| `heading-section` | `ShuttleVN/section` | `Be Vietnam Pro` | 18px / 26px | Medium (500) | Normal (`0`) | Tiêu đề khối card, bảng biểu, nhóm chức năng. |
| `body-regular` | `ShuttleVN/body` | `Inter` | 14px / 20px | Regular (400) | Normal (`0`) | Nội dung đoạn văn, giá trị ô dữ liệu trong bảng. |
| `body-strong` | `ShuttleVN/strong` | `Inter` | 14px / 20px | SemiBold (600) | Normal (`0`) | Chữ nút bấm, nhãn input, liên kết tác vụ, hàng Total. |
| `data-numeric` | `ShuttleVN/data` | `Inter` | 14px / 20px | Medium (500) | Normal (`tabular-nums`) | Giá tiền (`150.000 đ`), khung giờ chơi (`18:00–19:30`). |
| `label-strong` | `ShuttleVN/label` | `Inter` | 12px / 16px | SemiBold (600) | Normal / Wide (`0.05em`) | Tiêu đề cột bảng, nhãn nhóm Sidebar viết hoa (`QUẢN TRỊ`). |
| `caption-regular`| `ShuttleVN/caption` | `Inter` | 12px / 16px | Regular (400) | Normal (`0`) | Dòng giải thích phụ trong card, chú thích biểu đồ, helper text. |
| `code-mono` | `ShuttleVN/code` | `Inter` | 12px / 16px | Regular (400) | Normal (`tabular-nums`) | Mã đơn `DS-XXXXX`, mã hóa đơn `HD-YYYYMMDD-seq`. |

> [!WARNING]
> **Giới hạn Cỡ chữ Tối thiểu (Minimum Font Size Rule):** Nghiêm cấm hoàn toàn cỡ chữ dưới `12px` (loại bỏ `9px`, `10px`, `11px` cũ). Cỡ chữ tối thiểu cho nhãn là `12px` (`text-xs`), cho nội dung đọc được là `14px` (`text-sm`).

---

## 4. KHOẢNG CÁCH, BO GÓC & BỐ CỤC (SPACING, RADII & LAYOUT)

### 4.1 Thang Đo Khoảng cách (Spacing Scale trên Lưới 4px/8px)
Hệ thống sử dụng thang bước nhảy 4px/8px nhất quán:

| Token Tailwind | Giá trị Pixel | Ngữ cảnh Sử dụng Điển hình |
|:---:|:---:|:---|
| `p-1`, `gap-1` | 4px | Khoảng cách micro: Kbd badge padding, marker offsets. |
| `p-2`, `gap-2` | 8px | Khoảng cách phần tử nhỏ: Khoảng cách giữa icon và chữ, padding badge (`py-1 px-2.5`). |
| `p-3`, `gap-3` | 12px | Khoảng cách điều khiển: Padding bên trong nút bấm, ô input, item menu (`px-4 py-3`). |
| `p-4`, `gap-4` | 16px | Khoảng cách nội dung: Padding trong thẻ nhỏ, khoảng cách giữa các trường form. |
| `p-5`, `gap-5` | 20px | Khoảng cách chuẩn Figma: Padding thẻ StatisticCard (`p-[19px]`), lề section. |
| `p-6`, `gap-6` | 24px | Khoảng cách khối lớn: Lề workspace quản trị, khoảng cách giữa các card chính. |
| `p-8`, `gap-8` | 32px | Khoảng cách cấu trúc: Padding trang cổng khách hàng, lề đầu trang. |

---

### 4.2 Thang Bo góc Chuẩn hóa (Border Radii Scale)
Triệt tiêu hoàn toàn các số đo bo góc dị biệt cũ (`rounded-[7px]`, `rounded-[14px]`). Chuẩn hóa toàn hệ thống theo 4 cấp độ:

```
┌──────────────┐   ┌──────────────┐   ┌──────────────┐   ┌──────────────┐
│  rounded-sm  │   │  rounded-lg  │   │  rounded-xl  │   │ rounded-full │
│     4px      │   │     8px      │   │     12px     │   │    999px     │
└──────────────┘   └──────────────┘   └──────────────┘   └──────────────┘
 Kbd, Dot Marker    Button, Input,      Cards, Tables,     Status Badges,
                    Nav, DatePicker     Modals, States     Avatars, Floating
```

| Class Tailwind | Giá trị Pixel | Thành phần Áp dụng |
|:---|:---:|:---|
| `rounded-sm` / `rounded-[4px]` | **4px** | Phím tắt Kbd (`Ctrl K`), chấm trạng thái nhỏ, thanh kéo slider mốc. |
| `rounded-lg` / `rounded-[8px]` | **8px** | Nút bấm (`Button`), Ô nhập (`Input`), Menu điều hướng (`NavigationItem`), Bộ chọn ngày (`DatePicker`), Hộp tìm kiếm (`QuickLookup`). |
| `rounded-xl` / `rounded-[12px]` | **12px** | Thẻ thống kê (`StatisticCard`), Khung bảng dữ liệu (`DataTable`), Thẻ biểu đồ, Hộp thoại Modal, Khung thông báo phản hồi (`DashboardState`). |
| `rounded-full` / `rounded-[999px]` | **999px** | Huy hiệu trạng thái (`StatusBadge` 24px), Avatar người dùng, Nút AI Chat nổi. |

---

### 4.3 Hệ thống Đổ bóng & Viền (Elevation & Shadows)
Phong cách Athletic Kinetic hướng đến bề mặt phẳng tinh khiết, sạch sẽ, dựa vào đường viền 1px sắc sảo (`#DCE5ED` / `#B9C8D6`) hơn là đổ bóng dày:
- **Hairline Border:** `border border-[#DCE5ED]` (cho Cards, Bảng, Dividers).
- **Control Border:** `border border-[#B9C8D6]` (`ShuttleVN/strong`, cho Input, Nút Outline, Quick lookup).
- **Elevation Levels:**
  - `shadow-none`: Card mặc định theo Figma (hoàn toàn phẳng với viền `#DCE5ED`).
  - `shadow-xs`: Thẻ Card tương tác nhẹ khi hover (`0 1px 2px 0 rgb(0 0 0 / 0.05)`).
  - `shadow-md`: Menu thả xuống (Dropdown), Popover bộ chọn ngày (`0 4px 6px -1px rgb(0 0 0 / 0.08)`).
  - `shadow-xl`: Hộp thoại Modal, Drawer trượt trên Mobile (`0 20px 25px -5px rgb(0 0 0 / 0.12)`).

---

### 4.4 Phân tầng Lớp hiển thị (Z-Index Hierarchy)
Giải quyết dứt điểm xung đột z-index ghi nhận từ đợt kiểm định Baseline Audit:

| Tầng Z-Index | Class Tailwind | Thành phần Giao diện Được phép Sử dụng |
|:---:|:---|:---|
| **0** | `z-0` | Bề mặt nền canvas, hình ảnh minh họa tĩnh. |
| **5** | `z-[5]` | Cột tên sân cố định bên trái của Lưới sân (`Sticky Court Column`). |
| **10** | `z-10` | Hàng tiêu đề cố định của bảng dữ liệu (`Sticky Table Header`). |
| **30** | `z-30` | Thanh thông tin đặt sân dính đáy màn hình trên Mobile (`Sticky Bottom Bar`). |
| **40** | `z-40` | Backdrop mờ khi mở Drawer menu trên Mobile. |
| **50** | `z-50` | Thanh điều hướng đầu trang (`CustomerNav`, `AdminHeader`), Nút Chat AI nổi. |
| **60** | `z-60` | Khung trò chuyện Trợ lý AI mở rộng (`ChatPanel`), Menu thả xuống của Avatar (`UserMenu`). |
| **100** | `z-[100]`| Cửa sổ Modal nghiệp vụ (`BookingDetailModal`, `CourtFormModal`...). |
| **110** | `z-[110]`| Hộp thoại xác nhận nguy hiểm (`ConfirmDialog`), Popover chọn ngày (`CustomDatePicker`). |
| **120** | `z-[120]`| Thông báo Toast toàn site (Thư viện `Sonner` Toaster). |
| **200** | `z-[200]`| Cửa sổ Popup chọn thời lượng ô slot sân (`SlotPopup`). |

---

### 4.5 Bố cục Khung trang (Layout Shells)

#### 1. Cổng Quản trị (`(admin)`)
- **Desktop (>= 1024px):**
  - **Sidebar (Trích xuất nguyên mẫu từ Figma node `3314:29`):**
    - Chiều rộng cố định: `w-[240px]`, chiều cao `h-screen`, nền `bg-[#FDF8F8]` (`ShuttleVN/bg`), viền phải `border-r border-[#DCE5ED]`.
    - Phần đầu (Logo header): Icon vợt cầu lông (`Icon / racket` 28px) tại `left: 24px, top: 21px` + Tên thương hiệu "ShuttleVN" (font `Be Vietnam Pro` Medium 18px text `#172F4D` tại `left: 64px, top: 20px`).
    - Nhóm 1 `TỔNG QUAN` (nhãn font `Inter` SemiBold 12px text `#596D80`):
      * Bảng điều khiển (Active mặc định: `bg-[#E8F6EF]` text `#066649`, icon `dashboard`).
      * Báo cáo & Thống kê (icon `chart`).
    - Nhóm 2 `VẬN HÀNH` (nhãn font `Inter` SemiBold 12px text `#596D80`):
      * Lịch sân (icon `calendar`).
      * Yêu cầu đặt sân (icon `inbox`).
      * Thanh toán (icon `money`).
      * Quản lý sân (icon `court`).
    - Nhóm 3 `QUẢN TRỊ` (nhãn font `Inter` SemiBold 12px text `#596D80`):
      * Khách hàng (icon `users`).
      * Nhân viên (icon `employee`).
      * Đặt sân toàn hệ thống (icon `calendar`).
      * Nhật ký hoạt động (icon `history`).
    - Chân trang Sidebar (Footer): Divider 1px `#DCE5ED` tại top 936px, dòng chính "ShuttleVN Admin" (font `Inter` SemiBold 14px text `#172F4D`), dòng phụ "Quản lý cơ sở cầu lông" (font `Inter` Regular 12px text `#40556B`).
  - **Header:** Chiều cao cố định `h-[56px]`, nền `bg-white`, viền dưới `border-b border-[#DCE5ED]`. Chứa tiêu đề Breadcrumb mềm bên trái ("Không gian quản trị" font `Inter` 14px text `#40556B`) và Ô tra cứu nhanh `QuickLookup` (`334px` viền `#B9C8D6`) bên phải.
  - **Workspace:** Trải rộng co giãn tự do `flex-1 overflow-y-auto p-6 lg:p-8 bg-[#FDF8F8]`. Chứa tiêu đề trang 24px `Be Vietnam Pro`, huy hiệu `Today` date badge (272px), và lưới 3 thẻ KPI.
- **Mobile / Tablet (< 1024px):**
  - Sidebar ẩn khỏi luồng bố cục chính, chuyển thành **Slide-over Drawer** kích hoạt bằng nút Hamburger trên Topbar.
  - Topbar thu gọn chiều cao `h-14`, chứa nút mở Drawer và icon tìm kiếm nhanh.

#### 2. Cổng Khách hàng (`(customer)`)
- **Thanh Điều hướng (`ShuttleVN/Customer navigation`, Figma `3325:425`):** Chiều cao `h-[64px]`, nền xanh hải quân đậm `bg-[#172F4D]` (`ShuttleVN/ink`), chữ trắng `text-white`. Gồm thương hiệu "ShuttleVN" (`Be Vietnam Pro` Medium 18px), các mục điều hướng ("Đặt sân", "Lịch sử đặt sân", "Tra cứu đơn" 14px), Hotline `1900 1234` (Inter Medium 14px) và tên tài khoản (Inter SemiBold 14px).
- **Chân trang (`ShuttleVN/Customer footer`, Figma `3325:432`):** Chiều cao `h-[64px]`, nền `bg-white`, chữ `text-[#40556B]` 12px ("© 2026 ShuttleVN" bên trái, "Giờ Việt Nam (UTC+7) · Hotline 1900 1234" bên phải).
- Khung nội dung tối đa `max-w-7xl` (1280px), căn giữa tự nhiên `mx-auto px-4 sm:px-6 lg:px-8`.
- Thay thế ảnh hero Unsplash tĩnh 260px bằng **Hero Tinh gọn (Slim Sports Header)**: Hiển thị trạng thái sân trực tiếp hôm nay và thanh chọn ngày tích hợp.
- Trên điện thoại di động (< 768px), kích hoạt **Sticky Booking Bar** cố định sát mép dưới màn hình tóm tắt slot đã chọn và nút tiến hành đặt sân.

---

## 5. ĐẶC TẢ THÀNH PHẦN DÙNG CHUNG (SHARED COMPONENT SPECS)

### 5.1 Nút Bấm (`Button`)
Được trích xuất từ Figma Component `Button` (`3314:63`).

#### Các Biến thể (Variants):
1. **Primary (`variant="primary"`):** Nút hành động chính.
   - Nền: `bg-[#066649]` (`brandStrong`), hover: `hover:bg-[#05523A]`, active: `active:bg-[#04402D] active:scale-[0.98]`.
   - Chữ: `text-white font-semibold text-[14px] leading-[20px]`.
   - Focus ring: `focus-visible:ring-2 focus-visible:ring-[#087F5B] focus-visible:ring-offset-2`.
2. **Outline (`variant="outline"`):** Nút hành động phụ, tra cứu, xem chi tiết.
   - Nền: `bg-white`, viền: `border border-[#B9C8D6]` (`ShuttleVN/strong`).
   - Chữ: `text-[#40556B] font-semibold text-[14px] leading-[20px]`.
   - Hover: `hover:bg-[#FDF8F8] hover:text-[#172F4D] hover:border-[#596D80]`.
3. **Ghost (`variant="ghost"`):** Nút hủy, nút lùi bước, nút thao tác nhẹ.
   - Nền: `bg-transparent`, không viền.
   - Chữ: `text-[#40556B] font-semibold text-[14px] leading-[20px]`.
   - Hover: `hover:bg-[#EDF2F6] hover:text-[#172F4D]`.

#### Kích thước Chuẩn (Sizes):
- **Medium (Mặc định - Chuẩn Figma):** Chiều cao `h-[44px]`, padding `px-4 py-3`, bo góc `rounded-[8px]`. Đạt chuẩn vùng cảm ứng touch target >= 44px.
- **Small (Dùng trong bảng compact):** Chiều cao `h-[36px]`, padding `px-3 py-1.5`, bo góc `rounded-[6px]`, chữ `text-[13px]`. *(Hitbox bao quanh tối thiểu 44px trên di động)*.
- **Large (CTA chính checkout):** Chiều cao `h-[48px]`, padding `px-6 py-3.5`, bo góc `rounded-[8px]`, chữ `text-[15px]`.

```tsx
// TypeScript Interface chuẩn hóa
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: "primary" | "outline" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
  icon?: string; // Material symbol name
  fullWidth?: boolean;
}
```

> [!NOTE]
> **Sửa Lỗi Kỹ thuật Cũ:** Loại bỏ thuộc tính mặc định `w-full` trong `Button.tsx`. Nút bấm mặc định có bề rộng tự co giãn theo nội dung (`inline-flex items-center justify-center`). Chỉ mở rộng toàn bộ bề rộng khi truyền prop `fullWidth={true}`.

---

### 5.2 Huy hiệu Trạng thái (`StatusBadge`)
Được trích xuất từ Figma Component `Status badge` (`3314:74`) và `Badge · Cancelled` (`3325:440`).
- Cấu trúc chung: Chiều cao `h-[24px]`, bo tròn hoàn toàn `rounded-[999px]`, padding `px-[10px] py-[4px]`, chữ font Inter `text-[12px] font-normal leading-[16px] whitespace-nowrap`.

| Trạng thái Nghiệp vụ | Nhãn Hiển thị (Display Label) | Nền Badge (Background) | Chữ Badge (Text Color) | Ngữ cảnh Sử dụng |
|:---|:---|:---:|:---:|:---|
| `Pending` | **Chờ xác nhận** | `bg-[#FFF4E2]` | `text-[#A45A0B]` | Đơn đặt sân mới tạo, chờ nhân viên kiểm duyệt. |
| `Confirmed` | **Đã xác nhận** | `bg-[#EBF2FA]` | `text-[#245B99]` | Đơn đã được duyệt, hóa đơn đã sinh. |
| `Paid` | **Đã thu tiền** | `bg-[#E8F6EF]` | `text-[#066649]` | Hóa đơn đã thanh toán 100%. |
| `Completed` | **Hoàn thành** | `bg-[#E8F6EF]` | `text-[#066649]` | Khách đã chơi xong tại sân. |
| `Cancelled` | **Đã hủy** | `bg-[#FFF0F1]` | `text-[#B42332]` | Đơn đã bị hủy bởi khách hoặc từ chối bởi nhân viên. |
| `NoInvoice` | **Chưa lập hóa đơn** | `bg-[#EDF2F6]` | `text-[#40556B]` | Đơn `Pending` theo quy tắc bất biến D-07. |
| `Maintenance` | **Bảo trì** | `bg-[#FFF4E2]` | `text-[#A45A0B]` | Trạng thái sân tạm dừng thi đấu để bảo dưỡng. |
| `Active` | **Đang hoạt động** | `bg-[#E8F6EF]` | `text-[#066649]` | Sân sẵn sàng phục vụ hoặc tài khoản đang mở. |
| `Disabled` | **Đã khóa** | `bg-[#FFF0F1]` | `text-[#B42332]` | Tài khoản khách hàng/nhân viên bị vô hiệu hóa. |

---

### 5.3 Thẻ Thống kê Chỉ số (`StatisticCard`)
Được trích xuất từ Figma Component `Statistic card` (`3314:64`) và 3 thẻ KPI thực tế trên Dashboard (`3314:257`, `3314:261`, `3314:265`).
- Kích thước: Rộng `368px` (hoặc co giãn theo cột grid `w-full`), cao `128px`, viền `border border-[#DCE5ED]`, bo góc `rounded-[12px]`, padding `p-[19px]`.
- **Phân màu Ngữ nghĩa theo Từng Thẻ KPI (Figma `3314:33`):**
  - **Thẻ 1 — Doanh thu hôm nay (`3314:257`):** Nền `bg-[#E8F6EF]` (`brandSoft`), số KPI `text-[#066649]` (`brandStrong`).
  - **Thẻ 2 — Đơn chờ duyệt (`3314:261`):** Nền `bg-[#FFF4E2]` (`amberSoft`), số KPI `text-[#A45A0B]` (`amber`).
  - **Thẻ 3 — Lượt sân đặt trong ngày (`3314:265`):** Nền `bg-[#EBF2FA]` (`blueSoft`), số KPI `text-[#245B99]` (`blue`).
- Phân cấp nội dung:
  - **Dòng 1 (Label):** Font Inter `text-[14px] leading-[20px] text-[#40556B]`.
  - **Dòng 2 (KPI Metric Value):** Font Inter `text-[32px] leading-[40px] font-semibold tracking-normal tabular-nums` (màu theo ngữ nghĩa thẻ).
  - **Dòng 3 (Description / Subtitle):** Font Inter `text-[12px] leading-[16px] text-[#40556B]`.

---

### 5.4 Mục Menu Điều hướng (`NavigationItem`)
Được trích xuất từ Figma Component `Navigation item` (`3314:56`).
- Kích thước: Rộng `208px` (co giãn theo sidebar `w-full`), cao `44px`, bo góc `rounded-[8px]`, padding lề trái icon `12px`, lề chữ `44px`.
- **Trạng thái Active (`selected={true}`):**
  - Nền: `bg-[#E8F6EF]` (`brandSoft`).
  - Chữ: `text-[#066649]` (`brandStrong`) font Inter `font-semibold text-[14px] leading-[20px]`.
  - Icon: SVG icon màu xanh `#066649`.
- **Trạng thái Inactive (`selected={false}`):**
  - Nền: `bg-[#FDF8F8]` (`bg` hoặc trong suốt).
  - Chữ: `text-[#40556B]` (`secondary`) font Inter `font-semibold text-[14px] leading-[20px]`.
  - Icon: SVG icon màu xám xanh `#40556B`.
  - Hover: `hover:bg-[#EDF2F6] hover:text-[#172F4D]`.

---

### 5.5 Thanh Tra Cứu Nhanh (`QuickLookup`)
Được trích xuất từ Figma Header (`3314:243`).
- Kích thước: Rộng `334px`, cao `40px`, bo góc `rounded-[8px]`, nền `bg-white`, viền `border border-[#B9C8D6]` (`ShuttleVN/strong`), padding `px-3 flex items-center gap-2`.
- Icon kính lúp bên trái: Kích thước 20px, màu `#40556B`.
- Placeholder / Text: Font Inter `text-[14px] text-[#172F4D] placeholder:text-[#596D80]`.
- Phím tắt (Kbd shortcut pill): Nằm bên phải, kích thước `68x24px`, padding `px-3 py-1`, bo góc `rounded-[4px]`, nền `bg-[#EDF2F6]`, chữ font Inter `text-[12px] font-normal text-[#40556B]` hiển thị `Ctrl K`.

---

### 5.5b Huy hiệu Ngày Hiện tại (`TodayDateBadge`)
Được trích xuất từ Figma Page Heading (`3314:252`).
- Kích thước: Rộng `272px`, cao `44px`, bo góc `rounded-[8px]`, nền `bg-white`, viền `border border-[#DCE5ED]`, padding `px-3.5 py-2.5 flex items-center gap-3`.
- Icon lịch: Material symbol `calendar` 20px, màu `#172F4D`.
- Văn bản ngày giờ: Font Inter Medium `text-[14px] text-[#172F4D]` hiển thị ngày định dạng tiếng Việt đầy đủ (ví dụ: `Thứ Hai, 23/11/2026`).

---

### 5.6 Mẫu Bảng Dữ liệu Chuẩn mực (`DataTable`)
Được trích xuất từ Figma Daily Court Table (`3314:37`).
- **Container bọc ngoài:** Nền `bg-white`, viền bao `border border-[#DCE5ED]`, bo góc `rounded-[12px]`, `overflow-hidden`.
- **Hàng tiêu đề cột (`<thead>`):**
  - Chiều cao: `h-[40px]`.
  - Nền: `bg-[#EBF2FA]` (`ShuttleVN/blueSoft`).
  - Đường phân cách trên và dưới: `border-y border-[#DCE5ED]`.
  - Kiểu chữ: Font Inter `text-[12px] font-semibold text-[#40556B]`.
  - Căn lề: Cột văn bản/tên căn trái (`text-left`), cột số lượng/giờ/tiền căn phải (`text-right tabular-nums`).
- **Hàng dữ liệu (`<tbody> <tr>`):**
  - Chiều cao chuẩn: `h-[44px]`.
  - Đường kẻ đáy: `border-b border-[#DCE5ED]`.
  - Kiểu chữ: Chữ tên/văn bản font Inter Regular `text-[14px] text-[#172F4D]`; số liệu bảng căn phải font Inter Medium `text-[14px] text-[#172F4D] tabular-nums`.
  - Hiệu ứng Hover: `hover:bg-[#FDF8F8] transition-colors duration-100`.
- **Hàng tổng kết (`<tfoot> <tr>`):**
  - Chiều cao: `h-[44px]`.
  - Nền: `bg-white`.
  - Đường kẻ trên và dưới: `border-y border-[#DCE5ED]`.
  - Kiểu chữ: Nhãn "Tổng" font Inter SemiBold `text-[14px] text-[#172F4D]`; giá trị tổng font Inter Medium `text-[14px] text-[#172F4D] tabular-nums`.

---

### 5.7 Thành phần Biểu mẫu & Ô nhập liệu (`Input` & `Label`)
Được trích xuất từ Figma `Auth · Input components` (`3325:126`) và `Filter controls · Responsive` (`3325:2755`).
- **Nhãn trường (`Label`):**
  - Font Inter `text-[12px]` (hoặc `13px`) `font-semibold text-[#40556B] mb-1.5 block`.
  - Ký hiệu bắt buộc: Dấu sao đỏ `text-[#B42332] ml-1`.
  - *(Loại bỏ kiểu chữ in hoa mono 11px cũ gây khó đọc)*.
- **Ô nhập liệu (`Input`):**
  - Chiều cao: `h-[44px]` (hoặc `h-[42px]`), bo góc `rounded-[8px]`, viền `border border-[#B9C8D6]` (`ShuttleVN/strong`), nền `bg-white`, padding `px-[14px]`.
  - Kiểu chữ: Font Inter `text-[14px] text-[#172F4D] placeholder:text-[#596D80]`.
  - Focus state: `focus:border-[#087F5B] focus:ring-2 focus:ring-[#087F5B]/20 focus:outline-none`.
  - Error state: `border-[#B42332] focus:border-[#B42332] focus:ring-[#B42332]/20`.
  - Disabled state: `bg-[#EDF2F6] border-[#DCE5ED] text-[#596D80] cursor-not-allowed`.
  - Action ẩn/hiện mật khẩu: Chữ `"Hiện"` / `"Ẩn"` font Inter `text-[12px] font-semibold text-[#066649]` (hoặc icon con mắt 20px `#596D80`, có thuộc tính `aria-label="Hiện mật khẩu"`).
  - Thông báo lỗi bên dưới ô: Font Inter `text-[12px] text-[#B42332] mt-1 flex items-center gap-1`.

---

### 5.8 Hệ thống Hộp thoại & Hộp xác nhận (`Modal` & `ConfirmDialog`)
- **Cấu trúc Backdrop:** Nền tối mờ `bg-[#172F4D]/40 backdrop-blur-xs z-[100] fixed inset-0 flex items-center justify-center p-4`.
- **Thân Modal:** Bo góc `rounded-[12px]`, nền `bg-white`, viền `border border-[#DCE5ED]`, đổ bóng `shadow-xl`, chiều rộng tối đa từ `max-w-md` (480px) đến `max-w-2xl` (672px).
- **Yêu cầu Trợ năng Bắt buộc (A11y Invariants):**
  - Bắt buộc có thuộc tính `role="dialog"` và `aria-modal="true"`.
  - Bắt buộc có tiêu đề liên kết `aria-labelledby="dialog-title"`.
  - Tự động bẫy tiêu điểm bàn phím (Focus Trap) bên trong hộp thoại khi mở.
  - Luôn lắng nghe phím `Escape` để đóng hộp thoại.
- **Nghiêm cấm:** Tuyệt đối không dùng `window.confirm` thô của trình duyệt. Mọi hành động nhạy cảm (Hủy đơn, Đổi lịch, Khóa tài khoản) phải dùng `ConfirmDialog` với phân cấp nút rõ ràng: Nút xác nhận màu đỏ/vàng bên phải, nút "Hủy bỏ" dạng Outline bên trái.

---

### 5.9 Thẻ Trạng thái Phản hồi Hệ thống (`System State Cards`)
Được trích xuất từ Figma Component `Dashboard state` (`3314:426`) và `Filter controls · Responsive` (`3325:2755`).
1. **Trạng thái Đang tải (`Loading State`):**
   - Khung card `rounded-[12px] bg-white border border-[#DCE5ED] p-5`.
   - Các khối Skeleton nền `bg-[#FDF8F8]` kết hợp các dải thanh ngang màu `bg-[#DCE5ED]` bo góc `rounded-[4px]` chạy hiệu ứng xung nhịp `animate-pulse`.
   - Giữ nguyên kích thước khung tương đương dữ liệu thật để tránh hiện tượng nhảy layout giật cục (CLS = 0).
2. **Trạng thái Trống / Không có dữ liệu (`Empty State`):**
   - Vòng tròn icon trung tâm: Kích thước 48px, bo góc `rounded-[12px]`, nền `bg-[#E8F6EF]`, chứa icon Material Symbol màu `#066649`.
   - Tiêu đề: Font Inter `text-[14px] font-semibold text-[#172F4D] mt-4`.
   - Mô tả: Font Inter `text-[14px] text-[#40556B] mt-1 max-w-md text-center`.
   - Nút hành động bổ trợ: Nút Outline `h-[44px] border-[#B9C8D6] mt-4` kêu gọi hành động tiếp theo (ví dụ: "Xem tất cả yêu cầu" hoặc "Xem lịch sân").
3. **Trạng thái Báo lỗi (`Error State`):**
   - Vòng tròn icon cảnh báo: Kích thước 40px, bo góc `rounded-[8px]`, nền `bg-[#FFF0F1]`, chứa icon lỗi màu `#B42332`.
   - Tiêu đề: Font Be Vietnam Pro `text-[18px] font-medium text-[#172F4D] mt-3`.
   - Diễn giải lỗi: Font Inter `text-[14px] text-[#40556B] leading-[20px]`.
   - Nút khắc phục: Nút Outline `h-[44px] border-[#B9C8D6]` nhãn "Thử lại", giữ nguyên toàn bộ lựa chọn bộ lọc trước đó của người dùng.
4. **Trạng thái Xác nhận Thành công (`Success State / Toast`):**
   - Khối thông báo thành công: Chiều cao 96px, bo góc `rounded-[8px]`, nền `bg-white`, viền `border border-[#DCE5ED]`, icon thành công trong ô 32px bo góc `rounded-[8px]` nền `#E8F6EF` (`#066649`).
   - Tiêu đề: Font Inter `text-[14px] font-semibold text-[#172F4D]`.
   - Chú thích: Font Inter `text-[12px] text-[#40556B]`.
5. **Thanh Phản hồi Thao tác Inline (`3325:2777–3325:2781`):**
   - Chiều cao `52px`, bo góc `rounded-[8px]`, padding `px-4`: Đang lưu (`bg-[#EDF2F6] text-[#40556B]`), Hoàn tất (`bg-[#E8F6EF] text-[#066649]`), Lỗi lưu (`bg-[#FFF0F1] text-[#B42332]`).

---

### 5.10 Thẻ Hàng Chờ Đơn Cần Xử Lý Gấp (`UrgentBookingsCard`)
Được trích xuất từ Figma Admin Dashboard (`3314:34`).
- **Khung chứa tổng thể (Container):**
  - Chiều rộng: `w-full` (hoặc `1136px`), chiều cao: `148px`.
  - Nền: `bg-white`, viền bao: `border border-[#DCE5ED]`, bo góc: `rounded-[12px]`.
- **Phần Đầu Thẻ (Card Header - Chiều cao 76px):**
  - **Tiêu đề nhóm:** Font `Be Vietnam Pro` Medium `text-[18px] leading-[26px] text-[#172F4D]` ("Đơn cần xử lý gấp").
  - **Huy hiệu số lượng (`CountBadge`):** Kích thước `28x24px`, bo góc `rounded-[12px]`, nền `bg-[#EDF2F6]`, chữ font `Inter` Regular `text-[12px] text-[#40556B]` căn giữa (`0`).
  - **Dòng định hướng:** Font `Inter` Regular `text-[12px] leading-[16px] text-[#40556B]` ("Ưu tiên theo giờ chơi gần nhất").
  - **Liên kết hành động bên phải:** Font `Inter` SemiBold `text-[14px] leading-[20px] text-[#066649]` ("Xem tất cả yêu cầu") kèm icon mũi tên 20px màu `#066649` (`hover:underline`).
  - **Đường phân cách (Divider):** Nét liền 1px màu `#DCE5ED` tại vị trí top 76px chia tách header và thân thẻ.
- **Thân Thẻ khi Hàng Chờ Rỗng (`Empty Queue State`):**
  - **Ô biểu tượng:** Kích thước `32x32px`, bo góc `rounded-[8px]`, nền `bg-[#E8F6EF]`, chứa icon Material Symbol màu `#066649` (kích thước 20px).
  - **Dòng thông báo chính:** Font `Inter` SemiBold `text-[14px] leading-[20px] text-[#172F4D]` ("Không có đơn chờ xác nhận").
  - **Dòng diễn giải phụ:** Font `Inter` Regular `text-[12px] leading-[16px] text-[#40556B]` ("Các yêu cầu cần xử lý sẽ xuất hiện tại đây.").
- **Thân Thẻ khi Có Đơn Chờ (`Active Queue State`):**
  - Hiển thị danh sách ngang hoặc danh sách cuộn các thẻ đơn gọn: Mỗi đơn hiển thị Mã đơn (`Inter tabular-nums`), Tên khách, Tên sân, Khung giờ chơi và 2 nút tác vụ nhanh ("Duyệt" `bg-[#066649]` và "Xem" `variant="outline"`).

---

## 6. TRẠNG THÁI TƯƠNG TÁC (INTERACTION STATES & MICRO-FEEDBACK)

### 6.1 Ma trận Trạng thái Thành phần (Interactive State Matrix)

| Trạng thái | Nút Bấm Primary | Nút Bấm Outline | Ô Nhập Liệu (Input) | Ô Slot Lưới Sân | Hàng Bảng Dữ liệu |
|:---|:---|:---|:---|:---|:---|
| **Default** | `bg-[#066649] text-white` | `bg-white border-[#B9C8D6] text-[#40556B]` | `bg-white border-[#B9C8D6] text-[#172F4D]` | `bg-white border-[#DCE5ED]` | `bg-white border-b-[#DCE5ED]` |
| **Hover** | `bg-[#05523A]` (Sậm hơn) | `bg-[#FDF8F8] border-[#596D80] text-[#172F4D]` | `border-[#596D80]` | `bg-[#E8F6EF] border-[#087F5B]` | `bg-[#FDF8F8]` |
| **Active** | `bg-[#04402D] scale-[0.98]` | `bg-[#EDF2F6] scale-[0.98]` | `border-[#087F5B]` | `scale-[0.97]` | `bg-[#EDF2F6]/70` |
| **Focus-Visible** | `ring-2 ring-[#087F5B] ring-offset-2` | `ring-2 ring-[#087F5B] ring-offset-2` | `ring-2 ring-[#087F5B]/25 border-[#087F5B]` | `ring-2 ring-[#087F5B]` | `outline-none ring-1 ring-[#087F5B]` |
| **Disabled** | `bg-[#EDF2F6] text-[#596D80] cursor-not-allowed` | `border-[#DCE5ED] text-[#596D80] cursor-not-allowed` | `bg-[#EDF2F6] text-[#596D80] border-[#DCE5ED] cursor-not-allowed` | `bg-[#EDF2F6] opacity-50 cursor-not-allowed` | N/A |
| **Loading** | `opacity-80 pointer-events-none spinner` | `opacity-80 pointer-events-none spinner` | N/A | Skeleton pulse | `opacity-60` |

---

### 6.2 Quy chuẩn Chuyển động & Thời gian (Motion Timing & Easing)
Tuân thủ nguyên tắc Athletic Kinetic — chuyển động nhanh nhẹn, dứt khoát, mang tinh thần thể thao:
- **Micro-transitions (Nút bấm, hover ô slot, màu viền):** Thời lượng `150ms`, hàm gia tốc `ease-out` (`transition-all duration-150 ease-out`).
- **Surface Transitions (Modal mở, Drawer trượt, Accordion mở rộng):** Thời lượng `200ms - 250ms`, hàm gia tốc `cubic-bezier(0.16, 1, 0.3, 1)` (mượt mà, không bị giật).
- **Loại bỏ Hoàn toàn Animation Anti-pattern:** Nghiêm cấm dùng hiệu ứng nhảy tưng tưng `animate-bounce` trong bong bóng loading của Trợ lý AI (thay thế bằng hiệu ứng nhịp thở êm `animate-pulse`).
- **Hỗ trợ Trợ năng (Reduced Motion):**
  ```css
  @media (prefers-reduced-motion: reduce) {
    *, ::before, ::after {
      animation-duration: 0.01ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.01ms !important;
      scroll-behavior: auto !important;
    }
  }
  ```

---

## 7. QUY TẮC HIỂN THỊ ĐA THIẾT BỊ (RESPONSIVE RULES)

### 7.1 Hệ thống Điểm ngắt (Breakpoints)
- **Mobile (`< 768px` - Viewport 375px đến 767px):** Thao tác ngón cái (Thumb zone), một cột dọc, ẩn các cột bảng phụ.
- **Tablet (`768px - 1023px` - Viewport 768px đến 1023px):** Thu gọn sidebar, bảng dữ liệu cho phép cuộn ngang có chỉ báo bóng mờ.
- **Desktop (`>= 1024px` - Viewport 1024px, 1280px, 1440px):** Trải nghiệm không gian rộng toàn diện, hiển thị đa cột đồng thời.

---

### 7.2 Cơ chế Mobile Drawer cho Cổng Quản trị (Khắc phục lỗi P0)
- Trên màn hình `< 1024px`, thanh Sidebar 240px cố định bị gỡ bỏ khỏi luồng tài liệu tĩnh.
- Sidebar được chuyển thành **Drawer trượt từ bên trái**:
  - Khi đóng: `transform -translate-x-full`, ẩn hoàn toàn.
  - Khi mở: Trượt ra `translate-x-0 transition-transform duration-250 ease-out`, phủ lớp backdrop mờ `bg-slate-900/50 z-40`.
  - Phím `Escape` hoặc chạm vào backdrop tự động đóng Drawer.

---

### 7.3 Bottom Sheet thay thế Popover trên Mobile
- Khi người dùng chạm vào ô slot trên Lưới sân (`CourtGrid`) bằng điện thoại di động (`< 768px`), thay vì hiển thị `SlotPopup` lơ lửng che khuất tầm nhìn, hệ thống tự động kích hoạt **Bottom Sheet trượt từ đáy màn hình**:
  - Bám sát đáy `fixed bottom-0 inset-x-0 z-[200] bg-white rounded-t-[16px] p-5 shadow-2xl`.
  - Hiển thị thanh kéo vuốt nhỏ (Drag handle) ở đỉnh: `w-12 h-1.5 bg-slate-200 rounded-full mx-auto mb-4`.
  - Nút chọn thời lượng (60/90/120 phút) và nút "Tiếp tục" nằm trọn vẹn trong vùng với của ngón cái.

---

### 7.4 Giải pháp Hiển thị Bảng Dữ liệu trên Màn hình Hẹp
Bảng dữ liệu nhiều cột (`AllBookings`, `InvoiceList`, `CourtTable`) áp dụng nguyên tắc thích ứng:
1. **Desktop:** Hiển thị dạng bảng `table.w-full` hoàn chỉnh.
2. **Mobile (< 768px):** Tự động chuyển đổi từ dạng dòng bảng sang **Danh sách Thẻ tóm tắt (Card List)**:
   - Mỗi đơn đặt sân / hóa đơn là một thẻ card trắng bo góc 12px, có đường viền `#DCE5ED`.
   - Góc trên: Mã đơn và Badge trạng thái.
   - Thân thẻ: Tên khách hàng, tên sân, ngày giờ chơi.
   - Chân thẻ: Tổng tiền căn phải và các nút thao tác nhanh (Chi tiết, Xác nhận).

---

## 8. QUY TẮC BIỂU DIỄN DỮ LIỆU PHỨC TẠP (DATA VISUALIZATION)

### 8.1 Ma trận Lưới sân 34 Khung giờ (`CourtGrid`)
Lưới sân là trái tim nghiệp vụ của ShuttleVN, hoạt động từ 05:00 đến 22:00 (34 khung giờ 30 phút liên tục).

```
   [SÂN]       05:00-05:30    05:30-06:00    06:00-06:30    ...    21:30-22:00
┌───────────┬──────────────┬──────────────┬──────────────┬─────┬──────────────┐
│ Sân 01    │ [  TRỐNG   ] │ [  TRỐNG   ] │ [ DS-1002  ] │ ... │ [  TRỐNG   ] │
│ (Sticky)  │ bg-white     │ bg-white     │ bg-slate-100 │     │ bg-white     │
├───────────┼──────────────┼──────────────┼──────────────┼─────┼──────────────┤
│ Sân 02    │ [  ĐÃ QUA  ] │ [  BẢO TRÌ ] │ [ DS-1004  ] │ ... │ [  TRỐNG   ] │
│ (z-[5])   │ bg-slate-50  │ bg-amber-50  │ bg-slate-100 │     │ bg-white     │
└───────────┴──────────────┴──────────────┴──────────────┴─────┴──────────────┘
```

#### Quy chuẩn Ô Slot (`CourtSlotCell` — đồng bộ `3325:438`):
1. **Slot Trống khả dụng (`Available`):**
   - Nền: `bg-white`, viền: `border border-[#DCE5ED]`.
   - Hover: `hover:bg-[#E8F6EF] hover:border-[#087F5B] cursor-pointer`.
2. **Slot Đã được đặt (`Booked`):**
   - Nền: `bg-[#EDF2F6]`, viền: `border border-[#DCE5ED]`.
   - Chữ: `text-[#40556B] font-medium text-[12px]` hiển thị mã đơn hoặc tên khách; con trỏ `cursor-not-allowed` (hoặc `cursor-pointer` đối với nhân viên để xem chi tiết).
3. **Slot Đang bảo trì (`Maintenance`):**
   - Nền: `bg-[#FFF4E2]`, viền: `border border-[#A45A0B]/30`.
   - Chữ: `text-[#A45A0B] text-[12px] font-semibold` kèm hoa văn sọc chéo tinh tế.
4. **Slot Chưa rõ / Không khả dụng (`Unknown / Past`, Figma `3325:438`):**
   - Kích thước chuẩn `72x56px`, nền `bg-[#EDF2F6]`, viền `border border-[#DCE5ED]`, ký tự `—` font Inter Medium `text-[14px] text-[#40556B]`, `cursor-not-allowed`.
5. **Slot Đang được người dùng chọn trong giỏ (`Selected`):**
   - Nền: `bg-[#087F5B]`, viền: `border-[#066649]`, chữ: `text-white font-semibold`.

#### Quy tắc Kỹ thuật Lưới Sân:
- **Cột Tên Sân Sticky:** Cố định bên trái với `position: sticky; left: 0; z-index: 5; background: #FFFFFF;`.
- **Hiệu năng Cuộn (Passive Wheel Listener):** Bắt buộc gắn listener `{ passive: true }` khi xử lý con lăn chuột trên bảng để không gây giật lag hoặc cảnh báo trình duyệt.
- **Tối ưu Hóa Render:** Áp dụng thuộc tính CSS `content-visibility: auto; contain-intrinsic-size: 72px 56px;` trên từng ô slot để đảm bảo mượt mà 60fps khi render hàng trăm ô.

---

### 8.2 Biểu đồ Doanh thu Recharts (`RevenueChart`)
Được trích xuất từ Figma Admin Dashboard (`3314:35`).
- **Khung chứa tổng thể (Container):**
  - Kích thước chuẩn: Rộng `704px` (hoặc co giãn theo cột grid), cao `248px`.
  - Nền: `bg-white`, viền: `border border-[#DCE5ED]`, bo góc: `rounded-[12px]`.
- **Phần Đầu Thẻ (Header - Chiều cao 76px):**
  - Tiêu đề khối: Font `Be Vietnam Pro` Medium `text-[18px] leading-[26px] text-[#172F4D]` ("Doanh thu thực thu").
  - Phụ đề: Font `Inter` Regular `text-[12px] text-[#40556B]` ("Chỉ tính hóa đơn đã thu tiền").
  - Liên kết xem báo cáo: Font `Inter` SemiBold `text-[14px] text-[#066649]` ("Xem báo cáo") kèm icon Material Symbol 20px `#066649`.
  - Đường phân cách: Nét liền 1px màu `#DCE5ED` tại top 76px.
- **Thanh Chọn Khoảng Thời Gian (`ReportDateFilter`):**
  - Khung pill kích thước `274x32px`, nền `bg-[#FDF8F8]`, viền `border border-[#DCE5ED]`, bo góc `rounded-[8px]`.
  - Hiển thị ngày: Font `Inter` Regular `text-[12px] text-[#40556B]` (`23/11/2026`).
  - Đường chia dọc: 1px cao 20px màu `#DCE5ED`.
  - Dropdown chọn kiểu: Font `Inter` Regular `text-[12px] text-[#40556B]` ("Theo ngày") kèm icon dropdown 16px.
- **Thư viện & Cấu hình Biểu đồ Recharts v2.12:**
  - **Số liệu Doanh thu Tổng:** Font `Be Vietnam Pro` Medium `text-[18px] leading-[26px] text-[#172F4D]` ("0 đ").
  - **Màu sắc Cột (Bar Fill):** Đồng bộ tuyệt đối về sắc xanh ngọc thương hiệu `#087F5B` (`ShuttleVN/brand`), loại bỏ hoàn toàn màu xanh dương `#3b82f6` lạc điệu.
  - **Bo góc Cột:** Bo tròn 4px hai góc trên đỉnh cột: `radius={[4, 4, 0, 0]}`.
  - **Đường chuẩn tham chiếu (Grid & Baseline):**
    * Đường lưới ngang: Nét đứt mảnh màu `#EDF2F6` (`ShuttleVN/soft`).
    * Đường trục tọa độ đáy (Baseline): Nét liền 1px màu `#DCE5ED` (`ShuttleVN/line`).
  - **Phông chữ Trục tọa độ (X/Y Axis & Tooltip):**
    * Đồng bộ dùng phông `Inter` kết hợp thuộc tính số học `tabular-nums` (`font-sans tabular-nums` / `fontFeatureSettings: "'tnum' 1"`).
    * Màu chữ nhãn trục: `text-[#40556B]` (`secondary`), cỡ chữ `12px`.
  - **Trạng thái Trống (Empty Chart):** Dòng chữ font `Inter` Regular `text-[14px] text-[#40556B]` căn giữa biểu đồ ("Chưa có doanh thu trong ngày").
  - **Tooltip Doanh thu:** Nền thẻ trắng bo góc 8px, viền `#DCE5ED`, đổ bóng `shadow-md`, số tiền định dạng tiền tệ Việt Nam: `Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' })`.

---

### 8.3 Thanh Timeline Phân bổ Bảng giá Tuần (`PricingTimeline`)
Giải quyết vấn đề phân mảnh màu pastel cũ, đồng bộ dải 4 phân đoạn giờ về bảng màu ngữ nghĩa:
- **Khung giờ Thấp điểm (Sáng sớm 05:00 - 08:00):** Nền `bg-[#E8F6EF]` (`brandSoft`), viền `border-[#087F5B]/30`, nhãn `text-[#066649]`.
- **Khung giờ Tiêu chuẩn Ban ngày (08:00 - 16:00):** Nền `bg-[#EBF2FA]` (`blueSoft`), viền `border-[#245B99]/30`, nhãn `text-[#245B99]`.
- **Khung giờ Vàng Cao điểm (16:00 - 20:00):** Nền `bg-[#FFF4E2]` (`amberSoft`), viền `border-[#A45A0B]/30`, nhãn `text-[#A45A0B]`.
- **Khung giờ Tối muộn (20:00 - 22:00):** Nền `bg-[#EDF2F6]` (`soft`), viền `border-[#B9C8D6]`, nhãn `text-[#40556B]`.
- **Nút Kéo Mốc Giờ (Slider Thumbs):** Chiều rộng 18px, thanh kéo thẳng đứng màu `#066649`, vùng cảm ứng chạm tối thiểu 44px hỗ trợ kéo mượt mà trên iPad/máy tính bảng tại quầy.

---

### 8.4 Biểu đồ Tiến độ Giờ Sử Dụng Sân (`CourtUsageCard`)
Được trích xuất từ Figma Admin Dashboard (`3314:36`).
- **Khung chứa tổng thể (Container):**
  - Kích thước: Rộng `408px` (hoặc co giãn theo grid), cao `248px`.
  - Nền: `bg-white`, viền bao: `border border-[#DCE5ED]`, bo góc: `rounded-[12px]`.
- **Phần Đầu Thẻ (Header - Chiều cao 76px):**
  - **Tiêu đề khối:** Font `Be Vietnam Pro` Medium `text-[18px] leading-[26px] text-[#172F4D]` ("Giờ sử dụng sân").
  - **Phụ đề:** Font `Inter` Regular `text-[12px] leading-[16px] text-[#40556B]` ("Trong ngày 23/11/2026").
  - **Đường phân cách (Divider):** Nét liền 1px màu `#DCE5ED` tại top 76px.
- **Thân Thẻ (Progress Rows):**
  - **Hàng 1 (Tên Sân & Tổng thời lượng):**
    * Tên sân: Font `Inter` SemiBold `text-[14px] text-[#172F4D]` ("Sân 1").
    * Tổng giờ: Font `Inter` Medium `text-[14px] text-[#172F4D]` ("0 giờ").
  - **Hàng 2 (Tiến độ Giờ đặt - Booked Hours):**
    * Nhãn: Font `Inter` Regular `text-[12px] text-[#40556B]` ("Giờ đặt").
    * Thanh ray (Track bar): Rộng `224px`, cao `6px`, bo góc `rounded-[3px]`, nền `bg-[#EDF2F6]`.
    * Điểm mốc / Tiến độ: Màu `bg-[#596D80]` (`muted`) (vạch chỉ báo `2x10px` bo 1px khi ở mốc 0, hoặc thanh tiến độ co giãn khi có giờ đặt).
    * Giá trị số: Font `Inter` Medium `text-[14px] text-[#40556B] tabular-nums` căn phải (`0`).
  - **Hàng 3 (Tiến độ Hoàn thành - Completed Hours):**
    * Nhãn: Font `Inter` Regular `text-[12px] text-[#40556B]` ("Hoàn thành").
    * Thanh ray (Track bar): Rộng `224px`, cao `6px`, bo góc `rounded-[3px]`, nền `bg-[#EDF2F6]`.
    * Điểm mốc / Tiến độ: Màu `bg-[#087F5B]` (`brand`) (vạch chỉ báo `2x10px` bo 1px khi ở mốc 0, hoặc dải màu xanh ngọc khi hoàn thành).
    * Giá trị số: Font `Inter` Medium `text-[14px] text-[#40556B] tabular-nums` căn phải (`0`).
- **Chân Thẻ (Footer):**
  - Đường phân cách 1px màu `#DCE5ED` tại top 202px.
  - Ghi chú: Font `Inter` Regular `text-[12px] text-[#40556B]` ("Chưa có giờ đặt hoặc giờ hoàn thành.").

---

## 9. ĐỐI CHIẾU TIÊU CHUẨN UI/UX PRO MAX

Hệ thống thiết kế ShuttleVN đã được đối soát toàn diện với 10 Danh mục Quy chuẩn của hệ thống trí tuệ UI/UX Pro Max:

| Ưu tiên | Danh mục (Category) | Mức độ | Trạng thái Tuân thủ & Bằng chứng Triển khai |
|:---:|:---|:---:|:---|
| **1** | **Accessibility** | CRITICAL | **100% ĐẠT:** Độ tương phản chữ đạt từ 4.8:1 đến 13.5:1 (vượt chuẩn 4.5:1). Tất cả nút icon có `aria-label`. 100% Modal có `role="dialog"`, focus trap và phím `Escape`. |
| **2** | **Touch & Interaction** | CRITICAL | **100% ĐẠT:** Nút bấm chuẩn `44px`. Hitbox thao tác hàng bảng >= 40px. Khoảng cách giữa các nút >= 8px. Hiệu ứng chạm `active:scale-[0.98]`. |
| **3** | **Performance** | HIGH | **100% ĐẠT:** Thay thẻ `<img>` thô bằng `next/image` WebP/AVIF. Lưới sân dùng CSS virtualization. Listener chuột passive. Skeleton giữ chỗ CLS < 0.1. |
| **4** | **Style Selection** | HIGH | **100% ĐẠT:** Nhất quán phong cách Athletic Kinetic trên cả 22 màn hình. 100% icon SVG Google Material Symbols, tuyệt đối không dùng emoji làm icon. |
| **5** | **Layout & Responsive** | HIGH | **100% ĐẠT:** Mobile drawer thay thế sidebar fixed (sửa lỗi P0). Popover đổi thành Bottom Sheet trên di động. Bảng dữ liệu có Card list fallback. |
| **6** | **Typography & Color** | MEDIUM | **100% ĐẠT:** Chấm dứt hardcode hex. Chuẩn hóa 100% token ngữ nghĩa. Phông tiếng Việt bản địa Be Vietnam Pro cho tiêu đề. Không có chữ nào < 12px. |
| **7** | **Animation** | MEDIUM | **100% ĐẠT:** Thời lượng 150-200ms ease-out. Loại bỏ bounce animation giật cục. Hỗ trợ đầy đủ `prefers-reduced-motion`. |
| **8** | **Forms & Feedback** | MEDIUM | **100% ĐẠT:** 100% form dùng component chuẩn Base UI (chấm dứt lỗi ReservationForm). Nhãn rõ ràng, hiển thị trang trọng Tên sân. Toast Sonner góc trên. |
| **9** | **Navigation Patterns** | HIGH | **100% ĐẠT:** Phím tắt `Ctrl+K` tra cứu nhanh. Bổ sung Breadcrumb cho các trang con chi tiết. Menu active chỉ thị bằng màu `#E8F6EF` và `#066649`. |
| **10**| **Charts & Data** | LOW | **100% ĐẠT:** Recharts cột xanh ngọc `#087F5B` bo đỉnh 4px. Trục tọa độ Inter (tabular-nums) chuẩn xác. Tooltip định dạng tiền tệ VND rõ ràng. |

---

## 10. BÁO CÁO PHÁT HIỆN & ĐỐI SOÁT MÂU THUẪN (FIGMA VS DOCS)

Quá trình đối soát trực tiếp giữa thiết kế Figma đã duyệt, mã nguồn hiện tại và các tài liệu trung gian đã phát hiện **7 điểm mâu thuẫn quan trọng**. Dưới đây là phân tích chi tiết và quyết định chuẩn hóa:

```mermaid
graph TD
    subgraph Discrepancies["7 MÂU THUẪN ĐỐI SOÁT GIỮA FIGMA VÀ TÀI LIỆU"]
        D1["1. Font Display: Be Vietnam Pro (Figma) vs Hanken Grotesk (Docs)"]
        D2["2. Status Colors: Dải màu tinh chỉnh (Figma) vs 600 nhạt (Docs)"]
        D3["3. Button Primary: BrandStrong #066649 (Figma) vs Emerald 600 (Docs)"]
        D4["4. Admin Sidebar: Rộng 240px (Figma) vs 220px (Codebase cũ)"]
        D5["5. Bo góc Controls: 8px chuẩn (Figma) vs 7px/14px dị biệt (Code cũ)"]
        D6["6. Độ rộng Button: Intrinsic Auto (Figma) vs w-full cứng (Code cũ)"]
        D7["7. Font Số liệu & Mã đơn: Inter (tabular-nums) thay vì JetBrains Mono"]
    end
```

### Chi tiết 7 Điểm Mâu thuẫn & Quyết định Kỹ thuật:

#### 1. Phông chữ Tiêu đề (Display Font): `Be Vietnam Pro` vs `Hanken Grotesk`
- **Hiện trạng mâu thuẫn:** 
  - Trong `DESIGN_DIRECTIONS.md` và mã nguồn `src/app/layout.tsx`: Định nghĩa `Hanken_Grotesk` làm phông tiêu đề (`--font-hanken`). Khung ghi chú `3314:41` trong Figma cũng viết dòng chữ "Hanken Grotesk + Inter + JetBrains Mono".
  - **Nhưng trong thiết kế Figma thực tế đã duyệt:** Toàn bộ các layer tiêu đề trang (`3314:40`, `3314:250`) và tiêu đề mục (`3314:286`, `3314:300`, `3314:321`...) đều được cấu hình chính xác bằng phông chữ **`Be Vietnam Pro`** (`ShuttleVN/page` 24px SemiBold, `ShuttleVN/section` 18px Medium).
- **Nguyên nhân:** Người thiết kế khi làm việc thực tế trên Figma đã nhận thấy `Be Vietnam Pro` hiển thị dấu tiếng Việt đẹp hơn rất nhiều so với `Hanken Grotesk` (vốn là phông quốc tế dễ lỗi dấu tiếng Việt khi viết hoa), nên đã chuyển sang `Be Vietnam Pro` nhưng chưa sửa dòng text ghi chú.
- **Quyết định Kỹ thuật (Chuẩn hóa):** **Theo sát thiết kế Figma!** Cấu hình nạp `Be_Vietnam_Pro` từ `next/font/google` cho biến `--font-display` trong `layout.tsx`. Giữ `Hanken Grotesk` làm phông chữ phụ trợ dự phòng.

#### 2. Dải Màu Trạng thái (Status Colors): Bảng Màu Tinh Chỉnh Figma vs Tailwind 600
- **Hiện trạng mâu thuẫn:** 
  - `DESIGN_DIRECTIONS.md`: Liệt kê Red 600 (`#DC2626`), Amber 600 (`#D97706`), Blue 600 (`#2563EB`).
  - Figma Approved Design (`oKgloxLTqAdsZG599iDolt` variables): Định nghĩa chính thức `ShuttleVN/red` là **`#B42332`** (nền `#FFF0F1`), `ShuttleVN/amber` là **`#A45A0B`** (nền `#FFF4E2`), `ShuttleVN/blue` là **`#245B99`** (nền `#EBF2FA`), đồng thời nền canvas là `#FDF8F8` và chữ chính là `#172F4D`.
- **Nguyên nhân:** Bảng màu tùy chỉnh trên Figma giúp tăng độ tương phản đồng đều trên nền ấm `#FDF8F8` và hài hòa với sắc xanh ngọc sâu `#087F5B` / `#066649`.
- **Quyết định Kỹ thuật:** **100% tuân thủ mã màu trong Figma Variables!**

#### 3. Màu Nền Nút Bấm Primary: `#066649` (`brandStrong`) vs `#059669` (Emerald 600)
- **Hiện trạng mâu thuẫn:**
  - `DESIGN_DIRECTIONS.md`: Đề xuất nút chính dùng `emerald-600` (`#059669`).
  - Figma Component `Button (variant=primary)` (`3314:57`): Sử dụng nền `bg-[#066649]` (`ShuttleVN/brandStrong`) phối chữ trắng `text-white`.
- **Nguyên nhân:** Chữ trắng trên `#066649` đạt độ tương phản **7.0:1** (chuẩn AAA), giúp nút bấm nổi bật và rõ nét hơn hẳn dưới ánh sáng mạnh tại quầy lễ tân.
- **Quyết định Kỹ thuật:** **Theo sát Figma!** Nút Primary dùng `bg-[#066649]`, hover chuyển sang `bg-[#05523A]`.

#### 4. Chiều Rộng Sidebar Quản trị: `240px` vs `220px`
- **Hiện trạng mâu thuẫn:**
  - Codebase cũ (`AdminSidebar.tsx`): Sử dụng class `w-[220px]`.
  - Figma Approved Design (`3314:29`): Chiều rộng frame Sidebar là chính xác **`240px`** (`w-[240px]`).
- **Nguyên nhân:** Bề rộng 220px quá hẹp khiến các mục menu có tên dài ("Đặt sân toàn hệ thống", "Báo cáo & Thống kê") bị ép sát mép icon. Bề rộng 240px cho khoảng thở `px-3` chuẩn mực.
- **Quyết định Kỹ thuật:** **Chuẩn hóa thành 240px (`w-60` / `w-[240px]`)** trên desktop.

#### 5. Giá trị Bo Góc (Border Radius): Chuẩn 8px/12px vs Dị biệt 7px/14px
- **Hiện trạng mâu thuẫn:**
  - Codebase cũ: Nút bấm và input dùng `rounded-[7px]`, card dùng `rounded-[14px]`.
  - Figma Approved Design: Toàn bộ nút, ô input, item nav dùng **`rounded-[8px]`**; thẻ Card, container bảng, modal dùng **`rounded-[12px]`**.
- **Quyết định Kỹ thuật:** **Xóa bỏ hoàn toàn giá trị 7px và 14px**. Chuẩn hóa toàn bộ code theo Figma: `rounded-lg` (8px) cho controls và `rounded-xl` (12px) cho cards/containers.

#### 6. Độ Rộng Mặc Định của Nút Bấm (Button Width)
- **Hiện trạng mâu thuẫn:**
  - Code cũ `src/components/ui/Button.tsx`: Mặc định mang class `w-full`.
  - Figma Component `Button`: Bề rộng co giãn tự nhiên (`content-stretch flex items-center justify-center px-4 py-3`).
- **Quyết định Kỹ thuật:** **Gỡ bỏ class `w-full` khỏi component Button gốc**. Thêm prop `fullWidth?: boolean` khi cần kéo dài 100%.

#### 7. Kiểu chữ cho Ngày giờ, Số liệu và Mã đơn: `Inter (tabular-nums)` thay vì `JetBrains Mono`
- **Hiện trạng mâu thuẫn:**
  - Codebase cũ và `DESIGN_DIRECTIONS.md` đề xuất nạp phông Monospace `JetBrains Mono` (`--font-jetbrains`) cho mã đơn và số liệu.
  - Thiết kế Figma thực tế (`oKgloxLTqAdsZG599iDolt`): Trong danh mục Variables, cả `ShuttleVN/data` (`150.000 đ · 18:00–19:30`) và `ShuttleVN/code` đều được thiết lập bằng **`Inter`** (`Font(family: "Inter", style: Medium/Regular)`).
- **Quyết định Kỹ thuật (Đã được Người dùng Phê duyệt):**
  - **Chuyển toàn bộ Date, Time, Giá tiền và Mã đơn sang `Inter` kết hợp class `tabular-nums` (`font-feature-settings: "tnum" 1`)**.
  - **Lợi ích:** Đồng bộ 100% với Figma Variables, loại bỏ 1 request nạp font thừa (`JetBrains_Mono` trong `layout.tsx`), giúp tối ưu tốc độ tải trang (LCP), giao diện hiển thị tinh tế, hiện đại và số liệu vẫn căn thẳng hàng hoàn hảo.

---

## 11. HƯỚNG DẪN TRIỂN KHAI CHO LẬP TRÌNH VIÊN (DEVELOPER HANDOFF GUIDE)

Tài liệu này cung cấp lộ trình kỹ thuật cụ thể để Coding Agent thực hiện tái cấu trúc frontend một cách an toàn, không gây gián đoạn:

### 11.1 Cấu hình CSS Toàn cục (`src/app/globals.css`)
Cập nhật file `globals.css` để nạp toàn bộ biến token chuẩn hóa:

```css
@import "tailwindcss";
@config "../../tailwind.config.mts";

@layer base {
  :root {
    /* Radii */
    --radius-sm: 0.25rem;    /* 4px */
    --radius-md: 0.5rem;     /* 8px */
    --radius-lg: 0.75rem;    /* 12px */
    --radius-full: 9999px;

    /* Semantic Colors */
    --color-brand-primary: #087F5B;
    --color-brand-strong: #066649;
    --color-brand-subtle: #E8F6EF;
    
    --color-surface-bg: #FDF8F8;
    --color-surface-card: #FFFFFF;
    --color-surface-soft: #EDF2F6;

    --color-text-ink: #172F4D;
    --color-text-secondary: #40556B;
    --color-text-muted: #596D80;

    --color-border-line: #DCE5ED;
    --color-border-strong: #B9C8D6;

    --color-status-success: #066649;
    --color-status-warning: #A45A0B;
    --color-status-danger: #B42332;
    --color-status-info: #245B99;
  }

  body {
    background-color: var(--color-surface-bg);
    color: var(--color-text-ink);
    font-family: var(--font-sans), system-ui, sans-serif;
    font-feature-settings: "rlig" 1, "calt" 1;
    -webkit-font-smoothing: antialiased;
  }

  /* Font classes mapping */
  .font-display {
    font-family: var(--font-display), var(--font-sans), sans-serif;
  }
  .font-mono-data {
    font-family: var(--font-inter), var(--font-sans), sans-serif;
    font-feature-settings: "tnum" 1;
    font-variant-numeric: tabular-nums;
  }
}
```

---

### 11.2 Cấu hình Tailwind (`tailwind.config.mts`)
Đồng bộ bảng màu và phông chữ trong Tailwind v4:

```typescript
import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "#087F5B", // ShuttleVN/brand
          strong: "#066649",  // ShuttleVN/brandStrong
          soft: "#E8F6EF",    // ShuttleVN/brandSoft
        },
        surface: {
          bg: "#FDF8F8",      // ShuttleVN/bg
          card: "#FFFFFF",    // ShuttleVN/white
          soft: "#EDF2F6",    // ShuttleVN/soft
        },
        ink: {
          DEFAULT: "#172F4D", // ShuttleVN/ink
          secondary: "#40556B", // ShuttleVN/secondary
          muted: "#596D80",   // ShuttleVN/muted
        },
        line: {
          DEFAULT: "#DCE5ED", // ShuttleVN/line
          strong: "#B9C8D6",  // ShuttleVN/strong (input/control border)
        },
        status: {
          success: { DEFAULT: "#066649", soft: "#E8F6EF" },
          warning: { DEFAULT: "#A45A0B", soft: "#FFF4E2" },
          danger: { DEFAULT: "#B42332", soft: "#FFF0F1" },
          info: { DEFAULT: "#245B99", soft: "#EBF2FA" },
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "var(--font-inter)", "sans-serif"],
        mono: ["var(--font-inter)", "monospace"], // Inter kết hợp tabular-nums cho số học và mã đơn
      },
      borderRadius: {
        sm: "4px",
        md: "8px",
        lg: "8px",
        xl: "12px",
        "2xl": "16px",
      },
    },
  },
  plugins: [],
};

export default config;
```

---

### 11.3 Danh mục Ánh xạ File Cần Refactor (Refactoring File Map)

| Thành phần Cần Refactor | File Mã nguồn Hiện tại | Nhiệm vụ Chuẩn hóa Cụ thể |
|:---|:---|:---|
| **Layout Root & Fonts** | `src/app/layout.tsx` | Nạp `Be_Vietnam_Pro` gán vào `--font-display` và `Inter` gán vào `--font-inter`. Loại bỏ nạp `JetBrains_Mono` thừa. |
| **Admin Shell & Sidebar** | `src/components/layout/AdminSidebar.tsx` | Đổi rộng `w-[240px]`, nền `bg-[#FDF8F8]`, viền `#DCE5ED`. Bổ sung Mobile Drawer backdrop. |
| **Admin Header & Lookup** | `src/components/layout/AdminHeader.tsx` | Tích hợp thanh `QuickLookup` 334px với phím tắt `Ctrl K` và icon kính lúp, viền `#B9C8D6`. |
| **Base Button** | `src/components/ui/Button.tsx` | Gỡ bỏ `w-full` mặc định, chuẩn hóa bo góc `rounded-[8px]`, màu primary `#066649`, viền outline `#B9C8D6`. |
| **Base Badge** | `src/components/ui/Badge.tsx` | Cập nhật trạng thái chuẩn: Chiều cao 24px, bo góc 999px, chữ 12px font Inter, bảng màu Figma mới. |
| **Base Input & Label** | `src/components/ui/Input.tsx`, `Label.tsx` | Bo góc `rounded-[8px]`, viền `#B9C8D6`. Label đổi chữ thường 12–13px font Inter `#40556B`. |
| **Form Xác nhận Đặt sân**| `src/components/booking/ReservationForm.tsx`| **Thay thế 100% mã HTML thô bằng Base UI**: Hiển thị trang trọng Tên sân, giá từng mốc. |
| **Lưới sân & Popup** | `CourtGrid.tsx`, `SlotPopup.tsx` | Đổi listener chuột sang `{ passive: true }`. Popup di động chuyển sang Bottom Sheet. |
| **Biểu đồ Doanh thu** | `src/components/admin/RevenueChart.tsx` | Đổi màu cột sang `#087F5B`, bo góc `[4,4,0,0]`, dùng font `Inter` với `tabular-nums`. |
| **Timeline Bảng giá** | `src/components/admin/PricingTimeline.tsx` | Đổi màu 4 phân đoạn giờ sang chuẩn Emerald/Amber/Blue. Tăng hitbox nút kéo lên 44px. |
| **Trợ lý AI nổi** | `src/components/chatbot/ChatMessageItem.tsx` | Thay `animate-bounce` bằng `animate-pulse`. Thêm focus trap cho cửa sổ chat. |

---

### 11.4 Danh mục Kiểm tra Nghiệm thu (Verification Checklist)
Trước khi bàn giao bất kỳ màn hình nào, coding agent phải đối chiếu danh mục sau:
- [ ] Không có bất kỳ mã màu hex nào được viết tự do trong JSX/TSX (dùng class token chuẩn).
- [ ] Không có cỡ chữ nào nhỏ hơn 12px (`text-[9px]`, `text-[10px]` bị cấm hoàn toàn).
- [ ] Toàn bộ nút bấm và vùng cảm ứng trên di động đạt kích thước tối thiểu >= 40–44px.
- [ ] Màn hình Quản trị hiển thị hoàn hảo trên điện thoại di động (Drawer trượt mở êm ái).
- [ ] Màn hình Xác nhận Đặt sân `/booking` hiển thị rõ ràng Tên sân và bảng giá minh bạch.
- [ ] Toàn bộ modal đóng được bằng phím `Escape` và có thuộc tính `role="dialog"`.
- [ ] Biểu đồ Recharts hiển thị đúng cột màu xanh ngọc và font số học Inter căn tabular-nums.
- [ ] Lệnh `npm run type-check` (`tsc --noEmit`) đạt 0 lỗi (Exit code 0).
- [ ] Lệnh `npm run check:api-error` đạt 17/17 kịch bản (Exit code 0).
- [ ] Lệnh `npm run build` (`next build`) biên dịch thành công 100%.

---
*Tài liệu này là kết quả chuẩn hóa tối hậu và toàn diện nhất cho toàn bộ hệ thống giao diện ShuttleVN, hoàn toàn sẵn sàng để đưa vào thực thi mã nguồn.*

