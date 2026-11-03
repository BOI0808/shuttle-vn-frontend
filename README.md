# ShuttleVN Frontend

Ứng dụng Web giao diện người dùng cho hệ thống Quản lý và Đặt sân Cầu lông trực tuyến **ShuttleVN**.

---

## Mục lục (Table of Contents)

* [Công nghệ sử dụng](#công-nghệ-sử-dụng)
* [Cấu trúc Thư mục](#cấu-trúc-thư-mục)
* [Hướng dẫn Cài đặt và Khởi chạy](#hướng-dẫn-cài-đặt-và-khởi-chạy)
  * [1. Yêu cầu môi trường](#1-yêu-cầu-môi-trường)
  * [2. Cài đặt các gói phụ thuộc](#2-cài-đặt-các-gói-phụ-thuộc)
  * [3. Cấu hình biến môi trường](#3-cấu-hình-biến-môi-trường)
  * [4. Khởi chạy môi trường phát triển](#4-khởi-chạy-môi-trường-phát-triển)
* [Các lệnh thông dụng](#các-lệnh-thông-dụng)
* [Các tính năng nổi bật](#các-tính-năng-nổi-bật)

---

## Công nghệ sử dụng (Tech stack)

* **Framework**: [Next.js](https://nextjs.org/) (App Router, Standalone build) & [React 19](https://react.dev/)
* **Ngôn ngữ**: [TypeScript 5](https://www.typescriptlang.org/)
* **Styling & UI**:
  * [Tailwind CSS v4](https://tailwindcss.com/)
  * [Lucide React](https://lucide.dev/) & Google Material Symbols
  * [Recharts](https://recharts.org/) (Biểu đồ doanh thu & báo cáo phân tích)
  * [Sonner](https://sonner.emilkowal.ski/) (Toast Notifications)
* **Quản lý dữ liệu & Trạng thái**:
  * [TanStack React Query v5](https://tanstack.com/query/latest) (Server state, caching, synchronization, optimistic updates)
  * [Zustand v5](https://github.com/pmndrs/zustand) (Client global state: phiên xác thực người dùng, modal)
* **Giao tiếp mạng & Bảo mật**:
  * [Axios](https://axios-http.com/) với Interceptors tự động đính kèm `X-CSRF-TOKEN` và xử lý 401 Unauthorized
  * Cơ chế Next.js API Rewrites/Proxy ngăn ngừa lỗi CORS
* **Xử lý Form & Kiểm định dữ liệu**:
  * [React Hook Form](https://react-hook-form.com/) kết hợp [Zod v3](https://zod.dev/)

---

## Cấu trúc Thư mục

```text
src/
├── api/          # Typings và OpenAPI schemas đồng bộ từ Backend
├── app/          # Next.js App Router
│   ├── (auth)/        # Luồng đăng nhập, đăng ký, kích hoạt tài khoản (/set-password)
│   ├── (customer)/    # Luồng khách hàng: xem sân, đặt lịch, lịch sử đặt sân
│   ├── (admin)/       # Phân hệ Admin/Nhân viên: /dashboard, /statistics, /schedule...
│   └── api/           # API Route handlers (Next.js server-side, VD: AI assistant)
├── components/   # UI components dùng chung (admin, auth, ui, layout...)
├── config/       # Cấu hình hằng số ứng dụng, navigation, query keys
├── hooks/        # Custom React Query hooks (useBooking, useDashboard, useAuth...)
├── lib/          # Cấu hình Axios instance, React Query Client
├── mocks/        # Tầng dữ liệu giả lập (Mock data) phục vụ phát triển độc lập
├── services/     # Tầng gọi API Backend (tự động chuyển đổi giữa Mock và Real API)
├── stores/       # Zustand stores (auth.store.ts...)
├── types/        # TypeScript interfaces và models
└── utils/        # Hàm tiện ích (định dạng tiền tệ, ngày giờ, CSS merge...)
```

---

## Hướng dẫn Cài đặt & Khởi chạy 

### 1. Yêu cầu môi trường
* [Node.js](https://nodejs.org/) (Khuyến nghị phiên bản 20 LTS trở lên)
* Trình quản lý gói: `npm` (hoặc `pnpm`, `yarn`)

### 2. Cài đặt các gói phụ thuộc
```bash
npm install
```

### 3. Cấu hình biến môi trường
Tạo tệp `.env.local` từ mẫu `.env.local.example`:

```bash
cp .env.local.example .env.local
```

Nội dung `.env.local`:
```env
# URL của Backend API (dùng cho API rewrites / proxy)
NEXT_PUBLIC_API_BASE_URL=http://localhost:5062/api

# Chế độ Mock dữ liệu:
# - 'true': chạy độc lập với dữ liệu mẫu (không cần bật Backend)
# - 'false': gọi trực tiếp API Backend thực tế
NEXT_PUBLIC_USE_MOCKS=false

# Anthropic API Key (nếu sử dụng tính năng Trợ lý AI server-side)
ANTHROPIC_API_KEY=your_anthropic_api_key_here
```

### 4. Khởi chạy môi trường phát triển 
```bash
npm run dev
```

Ứng dụng sẽ chạy tại: [http://localhost:3000](http://localhost:3000).

---

## Các lệnh thông dụng 

| Lệnh | Mục đích |
| :--- | :--- |
| `npm run dev` | Khởi chạy máy chủ phát triển (Next.js dev server). |
| `npm run build` | Biên dịch và đóng gói ứng dụng cho môi trường Production (Standalone). |
| `npm run start` | Chạy ứng dụng sau khi đã build. |
| `npm run type-check`| Kiểm tra tính đúng đắn của toàn bộ TypeScript (`tsc --noEmit`). |
| `npm run lint` | Quét và kiểm tra chuẩn cú pháp mã nguồn với ESLint. |

---

## Các tính năng nổi bật

* **Cổng Khách hàng**:
  * Tra cứu lưới lịch sân trực quan theo thời gian thực.
  * Đặt sân trực tuyến, xem trước giá theo khung giờ linh hoạt.
  * Quản lý thông tin cá nhân và lịch sử đặt sân.
* **Cổng Vận hành & Quản trị**:
  * **Bảng điều khiển (Dashboard)**: Theo dõi doanh thu hôm nay, tỷ lệ lấp đầy, các đơn chờ xác nhận.
  * **Báo cáo & Thống kê**: Biểu đồ doanh thu linh hoạt theo ngày/tháng, báo cáo tần suất sử dụng sân.
  * **Tra cứu nhanh (Quick Lookup)**: Modal tra cứu ngay trên Header cho phép nhân viên tìm kiếm đơn nhanh bằng mã đơn, số điện thoại hoặc tên khách.
  * **Quản lý sân & Lịch vận hành**: Cấu hình bảng giá theo khung giờ, khung ngày trong tuần.
* **Bảo mật & Phân quyền**:
  * Bảo vệ trang bằng `RoleGuard` phân định chặt chẽ quyền truy cập giữa `Admin`, `Employee` và `Customer`.
  * Cơ chế tự động điều hướng và xóa session khi hết hạn token (401).