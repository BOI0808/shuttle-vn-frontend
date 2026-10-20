# ĐẶC TẢ MÀN HÌNH GIAO DIỆN (UI-SCREENS) – SHUTTLEVN
### Đối chiếu Hiện trạng Codebase & Thiết kế Chuẩn Mục tiêu

**Hệ thống Quản lý và Đặt sân Cầu lông Trực tuyến**  
**Phiên bản tài liệu:** 2.0 (Đồng bộ Hiện trạng Codebase & Chuẩn nghiệp vụ) · **Ngày cập nhật:** 20/10/2026  
**Căn cứ biên soạn:**
- `SRS.md` v1.7 và `UseCase.md` v1.5 (nguồn chuẩn nghiệp vụ duy nhất).
- `User-Flows.md` v1.1 (19/10/2026, các quyết định thống nhất X-01 đến X-07).
- `Wireframes.md` (20/10/2026, đặc tả 19 màn hình WF-01 đến WF-19).
- Hiện trạng mã nguồn đang chạy thực tế trong `shuttle-vn-frontend/src` (Next.js 15 App Router, TypeScript, Tailwind CSS, TanStack Query, Zustand).

> **NGUYÊN TẮC BIÊN SOẠN:**
> 1. **Tuyệt đối trung thực với mã nguồn:** Phản ánh chính xác những gì UI đang chạy trong `src/` (bao gồm các component đã có, các form schema đang dùng, các nút bấm đang là `TODO`/`console.log`, và các trang còn là placeholder).
> 2. **Bám sát nghiệp vụ chuẩn:** Đặt song song giữa "Hiện trạng đang chạy trong Codebase" và "Đặc tả UI Chuẩn mục tiêu trong Tương lai" để làm cơ sở cho đội ngũ lập trình refactor và hoàn thiện hệ thống mà không có sự nhầm lẫn.
> 3. **Không sử dụng dữ liệu cũ lỗi thời từ `UI-MockUp`:** Đã loại bỏ chỉ số Tỷ lệ lấp đầy, không có quản lý phiên/thiết bị, không có chấm công/ca làm việc, email khách đặt nhanh là bắt buộc và phải có OTP, hóa đơn tự động sinh khi xác nhận chứ không có nút lập thủ công.

---

## MỤC LỤC

1. [Bản đồ 19 Màn hình: Đối chiếu Codebase Hiện tại vs Thiết kế Mục tiêu](#1-bản-đồ-19-màn-hình-đối-chiếu-codebase-hiện-tại-vs-thiết-kế-mục-tiêu)
2. [Cấu trúc Layouts & Điều hướng Chung](#2-cấu-trúc-layouts--điều-hướng-chung)
3. [Khu vực 1: Cổng Khách hàng (WF-01 đến WF-08)](#3-khu-vực-1-cổng-khách-hàng-wf-01-đến-wf-08)
   - [WF-01: Đăng ký tài khoản](#wf-01-đăng-ký-tài-khoản)
   - [WF-02: Đăng nhập](#wf-02-đăng-nhập)
   - [WF-03: Quên mật khẩu](#wf-03-quên-mật-khẩu)
   - [WF-04: Đặt sân & Lưới sân](#wf-04-đặt-sân--lưới-sân)
   - [WF-05: Lịch sử đặt sân](#wf-05-lịch-sử-đặt-sân)
   - [WF-06: Tra cứu đơn đặt sân](#wf-06-tra-cứu-đơn-đặt-sân)
   - [WF-07: Hồ sơ cá nhân](#wf-07-hồ-sơ-cá-nhân)
   - [WF-08: Widget Trợ lý AI](#wf-08-widget-trợ-lý-ai)
4. [Khu vực 2: Cổng Quản trị & Vận hành (WF-09 đến WF-19)](#4-khu-vực-2-cổng-quản-trị--vận-hành-wf-09-đến-wf-19)
   - [WF-09: Bảng điều khiển (Dashboard)](#wf-09-bảng-điều-khiển-dashboard)
   - [WF-10: Tiếp nhận yêu cầu đặt sân](#wf-10-tiếp-nhận-yêu-cầu-đặt-sân)
   - [WF-11: Chi tiết đặt sân & Xử lý đơn](#wf-11-chi-tiết-đặt-sân--xử-lý-đơn)
   - [WF-12: Quản lý lịch sân & Đặt tại quầy](#wf-12-quản-lý-lịch-sân--đặt-tại-quầy)
   - [WF-13: Quản lý thanh toán & Hóa đơn](#wf-13-quản-lý-thanh-toán--hóa-đơn)
   - [WF-14: Quản lý khách hàng](#wf-14-quản-lý-khách-hàng)
   - [WF-15: Quản lý sân & Bảng giá](#wf-15-quản-lý-sân--bảng-giá)
   - [WF-16: Quản lý nhân viên & Phân quyền](#wf-16-quản-lý-nhân-viên--phân-quyền)
   - [WF-17: Theo dõi đặt sân toàn hệ thống](#wf-17-theo-dõi-đặt-sân-toàn-hệ-thống)
   - [WF-18: Báo cáo & Thống kê](#wf-18-báo-cáo--thống-kê)
   - [WF-19: Nhật ký hoạt động (Audit Log)](#wf-19-nhật-ký-hoạt-động-audit-log)
5. [Hệ thống Modal / Dialog Toàn Hệ thống](#5-hệ-thống-modal--dialog-toàn-hệ-thống)
6. [Checklist Refactor & Lộ trình Hoàn thiện](#6-checklist-refactor--lộ-trình-hoàn-thiện)

---

## 1. BẢN ĐỒ 19 MÀN HÌNH: ĐỐI CHIẾU CODEBASE HIỆN TẠI VS THIẾT KẾ MỤC TIÊU

| Mã WF | Tên màn hình | Đối tượng | Route đang chạy trong Codebase | Route mục tiêu (Wireframes) | Tình trạng thực tế trong Codebase (`src/`) |
|---|---|---|---|---|---|
| **WF-01** | Đăng ký tài khoản | Khách vãng lai | `/register` (`/(auth)/register`) | `/register` | **Đã có UI running**: `RegisterForm.tsx` (nhập mã xác thực inline trong form, mật khẩu min 6; chưa có modal OTP 6 ô rời). |
| **WF-02** | Đăng nhập | Mọi vai trò | `/login` (`/(auth)/login`) | `/login` | **Đã có UI running**: `LoginForm.tsx` (link Quên MK trỏ `#`; `useAuth.ts` đang chuyển cả Employee vào `/dashboard`). |
| **WF-03** | Quên mật khẩu | Khách thành viên | *Chưa có route* | `/forgot-password` | **Chưa có page**: Cần tạo mới theo luồng 3 bước (Email -> OTP -> Mật khẩu mới). |
| **WF-04** | Đặt sân & Lưới sân | Khách vãng lai, Thành viên | `/courts` (`/(customer)/courts`) & `/booking` (placeholder) | `/booking` | **Đã có UI lưới sân**: `CourtsClient.tsx`, `CourtGrid.tsx`, `SlotPopup.tsx` (60-180p), `WalkInBookingForm.tsx` (email optional). Trang `/booking` và `/booking/guest` là **placeholder trống**. |
| **WF-05** | Lịch sử đặt sân | Khách thành viên | `/my-bookings` (`/(customer)/my-bookings`) | `/my-bookings` | **Đã có UI running**: `BookingHistoryList.tsx`, `BookingCard.tsx` (vẫn còn nút Hóa đơn; các nút Chi tiết, Hủy, Đổi lịch là `console.log` dạng TODO). |
| **WF-06** | Tra cứu đơn | Khách vãng lai, Thành viên | `/lookup` (`/(customer)/lookup`) | `/lookup` | **Đã có UI running**: `LookupClient.tsx`, `BookingLookupForm.tsx` (vẫn có nút DEMO, ô liên hệ chưa bắt buộc), `BookingLookupResult.tsx`. |
| **WF-07** | Hồ sơ cá nhân | Khách thành viên | `/profile` (`/(customer)/profile`) | `/profile` | **Đã có UI running**: `ProfileInfoForm.tsx` (email disabled, phone regex 10 số), `ProfileSidebar.tsx` (có upload avatar và thẻ thống kê chi tiêu), `ChangePasswordForm.tsx`. |
| **WF-08** | Widget Trợ lý AI | Khách vãng lai, Thành viên | *Chưa có widget UI* | *(Widget nổi)* | **Đã có Backend API**: `src/app/api/chat/route.ts` (Anthropic SDK); **Chưa có** component giao diện nổi `ChatWidget.tsx`. |
| **WF-09** | Bảng điều khiển | Quản trị viên | `/dashboard` (`/(admin)/dashboard`) | `/admin/dashboard` | **Đã có UI running**: `DashboardClient.tsx`, `DashboardStats.tsx` (vẫn còn thẻ Tỷ lệ lấp đầy), `RevenueChart.tsx`, bảng đặt sân gần đây. |
| **WF-10** | Tiếp nhận yêu cầu đặt sân | Nhân viên, Quản trị viên | *Chưa có route* | `/admin/booking-requests` | **Chưa có trang**: Thuộc phạm vi US-11 đang phát triển trong tuần. |
| **WF-11** | Chi tiết đặt sân & Xử lý đơn | Nhân viên, Quản trị viên | *Chưa có route* | `/admin/bookings/[id]` | **Chưa có trang**: Thuộc phạm vi US-12 đang phát triển trong tuần. |
| **WF-12** | Quản lý lịch sân & Đặt tại quầy | Nhân viên, Quản trị viên | `/schedule` (`/(admin)/schedule`) | `/admin/court-schedule` | **Đã có UI running**: `ScheduleClient.tsx` (timeline 05:00-22:00); **Chưa có** nút/modal "Đặt tại quầy" (`M-11`, quy chiếu UF: `M-09`). |
| **WF-13** | Quản lý thanh toán | Nhân viên, Quản trị viên | `/payments` (`/(admin)/payments`) | `/admin/payments` | **100% Placeholder**: `payments/page.tsx` chỉ bọc `RoleGuard` + div trống. |
| **WF-14** | Quản lý khách hàng | Nhân viên, Quản trị viên | `/customers` (`/(admin)/customers`) | `/admin/customers` | **Đã có UI bảng**: `CustomersClient.tsx` (danh sách khách); **Chưa có** handler Thêm khách, Khóa/Mở khóa tài khoản. |
| **WF-15** | Quản lý sân & Bảng giá | Quản trị viên | `/manage-courts` (`/(admin)/manage-courts`) | `/admin/courts` | **Đã có UI running**: `ManageCourtsClient.tsx`, `CourtCardGrid.tsx`, `CourtTable.tsx`, `CourtStats.tsx`, `CourtFormModal.tsx`, `PricingTimeline.tsx`. |
| **WF-16** | Quản lý nhân viên & Phân quyền | Quản trị viên | `/employees` (`/(admin)/employees`) | `/admin/staff` | **Đã có UI running**: `EmployeesClient.tsx`, `EmployeeFormModal.tsx` (QTV nhập mật khẩu trực tiếp min 8 ký tự theo X-06). |
| **WF-17** | Theo dõi đặt sân toàn hệ thống | Quản trị viên | *Chưa có route* | `/admin/bookings` | **Chưa có trang**: Thuộc phạm vi US-23 đang phát triển. |
| **WF-18** | Báo cáo & Thống kê | Quản trị viên | `/statistics` (`/(admin)/statistics`) | `/admin/reports` | **100% Placeholder**: `statistics/page.tsx` chỉ hiển thị dòng chữ "Chức năng đang phát triển". |
| **WF-19** | Nhật ký hoạt động | Quản trị viên | `/audits` (`/(admin)/audits`) | `/admin/audit-log` | **100% Placeholder**: `audits/page.tsx` chỉ hiển thị dòng chữ "Chức năng đang phát triển". |

---

## 2. CẤU TRÚC LAYOUTS & ĐIỀU HƯỚNG CHUNG

### 2.1 Cổng Khách hàng (Customer Layout)
- **Mã nguồn hiện tại:** `src/app/(customer)/layout.tsx` + `src/components/layout/CustomerNav.tsx`.
- **Hiện trạng đang chạy:**
  - Header cố định trên cùng (height 56px, nền `#1a1f2e`).
  - Danh sách liên kết:
    - `/courts` (Nhãn "Đặt sân")
    - `/my-bookings` (Nhãn "Lịch sử đặt sân", ẩn khi chưa đăng nhập nhờ điều kiện `requiresAuth: true`)
    - `/lookup` (Nhãn "Tra cứu đơn")
  - Khu vực bên phải:
    - Chưa đăng nhập: `LoginButton.tsx` dẫn tới `/login`.
    - Đã đăng nhập: `UserMenu.tsx` hiển thị avatar chữ cái đầu, họ tên, menu thả xuống gồm "Hồ sơ cá nhân" (`/profile`), "Lịch sử đặt sân" (`/my-bookings`) và nút "Đăng xuất".
- **Định hướng Chuẩn hóa trong Tương lai:**
  - Thống nhất route đặt sân giữa `/courts` và `/booking` để tránh xung đột.
  - Tích hợp Widget Trợ lý AI nổi (`ChatWidget`) ở góc dưới bên phải màn hình.

### 2.2 Cổng Quản trị & Vận hành (Admin Layout)
- **Mã nguồn hiện tại:** `src/app/(admin)/layout.tsx` + `src/components/layout/AdminSidebar.tsx` + `src/components/layout/AdminHeader.tsx`.
- **Hiện trạng đang chạy:**
  - **Sidebar w=220px (`AdminSidebar.tsx`):** Đang hiển thị cố định **8 liên kết** chia làm 3 nhóm cho mọi người dùng đăng nhập khu vực admin, **chưa có logic phân quyền theo vai trò**:
    - *Tổng quan:* Bảng điều khiển (`/dashboard`), Thống kê (`/statistics`).
    - *Vận hành:* Lịch sân (`/schedule`), Thanh toán (`/payments`), Quản lý sân (`/manage-courts`).
    - *Quản trị:* Khách hàng (`/customers`), Nhân viên (`/employees`), Nhật ký hoạt động (`/audits`).
  - **Top Header h=52px (`AdminHeader.tsx`):** Đổi tiêu đề trang theo URL, có portal chứa nút "Thêm nhân viên" khi ở trang employees.
- **Định hướng Chuẩn hóa trong Tương lai (Quyết định X-02 & SRS 2.2):**
  - Cần bổ sung logic phân quyền ẩn/hiện menu trong `AdminSidebar.tsx`:
    - **Nhân viên (`Employee`):** Chỉ hiển thị 4 mục: *Lịch sân* (`/schedule`), *Yêu cầu đặt sân* (`/booking-requests`), *Thanh toán* (`/payments`), *Khách hàng* (`/customers`).
    - **Quản trị viên (`Admin`):** Hiển thị đầy đủ 9 mục thuộc 4 nhóm (thêm Bảng điều khiển, Quản lý sân, Nhân viên, Thống kê, Nhật ký, Đặt sân toàn hệ thống).
  - Bổ sung hiển thị thông tin nhân viên đang trực và nút "Đăng xuất" rõ ràng trên Topbar.

### 2.3 Điều hướng sau Đăng nhập (Authentication Redirection)
- **Hiện trạng đang chạy trong `useAuth.ts` (dòng 28–33):**
  ```typescript
  if (authUser.role === "Customer") {
    router.push("/courts");
  } else {
    router.push("/dashboard"); // Đang chuyển cả Employee lẫn Admin vào /dashboard!
  }
  ```
- **Định hướng Chuẩn hóa trong Tương lai (Quyết định X-02):**
  - `Customer` → chuyển về `/courts` (hoặc `/booking`).
  - `Employee` → chuyển về trang vận hành: `/admin/booking-requests` hoặc `/schedule` (tránh đưa nhân viên vào trang dashboard vốn chỉ dành cho Admin).
  - `Admin` → chuyển về `/admin/dashboard`.

---

## 3. KHU VỰC 1: CỔNG KHÁCH HÀNG (WF-01 ĐẾN WF-08)

### WF-01: ĐĂNG KÝ TÀI KHOẢN

#### A. Hiện trạng UI đang chạy trong Codebase
- **File:** `src/app/(auth)/register/page.tsx` sử dụng component `src/components/auth/RegisterForm.tsx`.
- **Form schema (`zod`):**
  - `fullName`: `min(2, "Họ tên tối thiểu 2 ký tự")`.
  - `email`: `email("Vui lòng nhập đúng định dạng email")`. Kèm nút `[ Lấy mã ]` kích hoạt `handleGetCode()` gọi API `sendVerificationCode(email, "VerifyEmail")`.
  - `code`: `min(1, "Vui lòng nhập mã xác thực")` – **đang là một ô input text thông thường nằm ngay trong form**.
  - `phone`: regex `^(0[3|5|7|8|9])+([0-9]{8})$` ("Số điện thoại không hợp lệ").
  - `password`: `min(6, "Mật khẩu tối thiểu 6 ký tự")`.
  - `confirmPassword`: refine kiểm tra trùng khớp với password.
- **Hành vi submit:** Gọi `authService.register`, hiển thị toast thành công rồi chuyển về `/login` sau 1 giây.

#### B. Đặc tả UI Chuẩn & Hướng cập nhật trong Tương lai
- **Căn cứ:** UC-01, UC-02, BR-11, Wireframes WF-01.
- **Điểm cần refactor từ hiện trạng:**
  1. Nâng độ dài mật khẩu từ `min(6)` lên `8–128 ký tự` theo chuẩn bảo mật BR-11.
  2. Bỏ ô input mã xác thực inline trong form. Thay vào đó, sau khi người dùng điền đủ thông tin và bấm `[ ĐĂNG KÝ ]`, hệ thống mới mở **Modal M-01 (Xác minh Email OTP 6 ô rời)**.
  3. Bổ sung Modal thông báo "Đăng ký thành công" kèm nút "Đăng nhập ngay".
- **Form fields chuẩn:**
  - Họ và tên * (Text, cắt khoảng trắng, min 2)
  - Số điện thoại * (Tel, 8–15 chữ số, cho phép dấu `+` đầu)
  - Email * (Email, tự động lowercase)
  - Mật khẩu * (Password, 8–128 ký tự, có toggle Hiện/Ẩn)
  - Xác nhận mật khẩu * (Password, khớp mật khẩu)
- **Modal OTP M-01 chuẩn:**
  - 6 ô nhập số riêng biệt `[ _ ] [ _ ] [ _ ] [ _ ] [ _ ] [ _ ]`.
  - Tự động nhảy ô, hỗ trợ paste cả chuỗi 6 số.
  - Hiệu lực 10 phút, nút "Gửi lại mã" có bộ đếm ngược 60 giây. Sai quá 5 lần thì hủy mã.

---

### WF-02: ĐĂNG NHẬP

#### A. Hiện trạng UI đang chạy trong Codebase
- **File:** `src/app/(auth)/login/page.tsx` sử dụng component `src/components/auth/LoginForm.tsx`.
- **Form schema (`zod`):**
  - `email`: email chuẩn.
  - `password`: `min(6, "Mật khẩu tối thiểu 6 ký tự")`.
- **Thành phần phụ:**
  - Dòng link `<a href="#">Quên mật khẩu?</a>` (đang trỏ `#`).
  - Dưới cùng có link chuyển sang trang `/register`.
- **Hành vi:** Gọi `authService.login`, lưu thông tin vào `useAuthStore`.

#### B. Đặc tả UI Chuẩn & Hướng cập nhật trong Tương lai
- **Căn cứ:** UC-03, BR-12, Wireframes WF-02, Quyết định X-02.
- **Điểm cần refactor từ hiện trạng:**
  1. Gắn link `Quên mật khẩu?` trỏ tới `/forgot-password`.
  2. Nâng độ dài mật khẩu lên `8–128 ký tự`.
  3. Cập nhật điều hướng sau đăng nhập trong `useAuth.ts`: Phân luồng Employee sang `/admin/booking-requests` hoặc `/schedule`, chỉ Admin mới vào `/dashboard`.
  4. Hiển thị thông báo tài khoản bị khóa tự động khi nhập sai 5 lần liên tiếp: *"Tài khoản của bạn đã bị khóa do nhập sai mật khẩu quá 5 lần. Vui lòng liên hệ nhân viên để được hỗ trợ."* (BR-12).

---

### WF-03: QUÊN MẬT KHẨU

#### A. Hiện trạng UI đang chạy trong Codebase
- **File:** **Chưa tạo page trong `src/app/(auth)/`** (tương ứng use-case UC-04, mục màn hình thiếu `M-02` trong User-Flows). Liên kết "Quên mật khẩu?" tại form đăng nhập đang trỏ `#`.

#### B. Đặc tả UI Chuẩn & Hướng cập nhật trong Tương lai
- **Căn cứ:** UC-04, Wireframes WF-03.
- **Route cần tạo:** `/forgot-password` (tại `src/app/(auth)/forgot-password/page.tsx`).
- **Giao diện 3 bước chuẩn hóa:**
  1. *Bước 1 (Nhập Email):* Form nhập Email đã đăng ký. Bấm "Gửi mã xác minh" → Kiểm tra định dạng email và gửi yêu cầu cấp mã.
  2. *Bước 2 (Xác thực OTP - Modal M-01):* Nhập mã xác minh 6 số gửi về email. Mã đúng thì mở khóa bước 3.
  3. *Bước 3 (Mật khẩu mới):* Nhập "Mật khẩu mới" (8–128 ký tự) và "Xác nhận mật khẩu mới". Bấm "Đặt lại mật khẩu".
  4. *Kết thúc:* Hiển thị thông báo đặt lại mật khẩu thành công (Modal M-02) và tự động chuyển hướng về `/login`.

---

### WF-04: ĐẶT SÂN & LƯỚI SÂN (CUSTOMER BOOKING)

#### A. Hiện trạng UI đang chạy trong Codebase
- **File:** `src/app/(customer)/courts/CourtsClient.tsx` kết hợp `CourtGrid.tsx`, `SlotPopup.tsx`, `WalkInBookingForm.tsx`. Trang `/booking` và `/booking/guest` hiện là placeholder rỗng.
- **Các thành phần đang chạy:**
  - Hero Header: Nền gradient tối, tiêu đề "Đặt Sân Cầu Lông", bộ chọn ngày `CustomDatePicker`.
  - Lưới sân `CourtGrid.tsx`: Trục ngang 05:00–22:00 (slot 30p), trục dọc danh sách sân.
  - Ô slot hiển thị theo `displayStatus`: `AVAILABLE` (trắng), `BOOKED` (xám), `MINE` (xanh ngọc), `CLOSED` (sọc chéo).
  - Popup `SlotPopup.tsx`: Bật lên khi bấm ô trống. Đang fix cứng các mức thời lượng `[60, 90, 120, 150, 180]` phút. Khi bấm nút "Đặt sân · giá" thì **chỉ đóng popup (`setPopup(null)`) chứ chưa chuyển trang**.
  - Form đặt nhanh `WalkInBookingForm.tsx`: Hiển thị bên dưới lưới khi chưa đăng nhập. Schema gồm `guestFullName`, `guestPhone` (10 số), `guestEmail` (**đang để optional**).

#### B. Đặc tả UI Chuẩn & Hướng cập nhật trong Tương lai
- **Căn cứ:** UC-06, UC-07, UC-08, BR-07, BR-20, Wireframes WF-04, Quyết định X-01, X-07.
- **Điểm cần refactor từ hiện trạng:**
  1. **Popup thời lượng (`SlotPopup.tsx` - M-03):** Bổ sung mốc **30 phút** (BR-20 quy định tối thiểu 30 phút, sửa điểm lệch D-02).
  2. **Form đặt nhanh (`WalkInBookingForm.tsx`):**
     - Sửa trường Email thành **BẮT BUỘC** (`X-01`, `KH-11`, `BR-10`).
     - Khi bấm Đặt sân: Bắt buộc mở **Modal OTP M-01** để xác minh email trước khi gọi API tạo đơn (`X-07`).
  3. **Kết nối luồng đặt sân:** Khi chọn thời lượng và bấm Đặt sân, chuyển thông tin vào giỏ hàng/state và điều hướng sang trang xác nhận đơn thay vì chỉ đóng popup.
  4. **Thông báo đặt sân thành công (Modal M-02, tương ứng màn hình thiếu M-05 trong User-Flows):** Hiển thị mã đơn `DS-XXXXX`, khung giờ, sân, tổng tiền, nhãn trạng thái `Chờ xác nhận`, nhãn thanh toán `Chưa lập hóa đơn`.

---

### WF-05: LỊCH SỬ ĐẶT SÂN (MY BOOKINGS)

#### A. Hiện trạng UI đang chạy trong Codebase
- **File:** `src/app/(customer)/my-bookings/page.tsx`, `BookingHistoryList.tsx`, `BookingCard.tsx`.
- **Các thành phần đang chạy:**
  - Thanh công cụ `BookingListToolBar`: Tabs lọc trạng thái (All, Pending, Confirmed, Completed, Cancelled) và ô tìm kiếm mã đơn.
  - Thẻ đơn `BookingCard.tsx`: Hiển thị thông tin sân, ngày, giờ, tổng tiền, badge trạng thái.
  - Các nút hành động trên thẻ:
    - Nút `[ Chi tiết ]`, `[ Đổi lịch ]`, `[ Hủy đặt ]`: Trong `BookingHistoryList.tsx` mới chỉ gắn hàm `console.log("...")` dạng `TODO`.
    - Nút `[ Hóa đơn ]`: Vẫn đang hiển thị khi đơn có trạng thái `Completed`.

#### B. Đặc tả UI Chuẩn & Hướng cập nhật trong Tương lai
- **Căn cứ:** UC-09, UC-10, UC-11, BR-05, BR-09, SRS 3.3, Wireframes WF-05, D-12, D-13.
- **Điểm cần refactor từ hiện trạng:**
  1. **Loại bỏ nút [ Hóa đơn ] trên thẻ của khách:** Khách hàng chỉ xem lịch sử đặt sân của mình; xem và quản lý hóa đơn là nghiệp vụ nội bộ của nhân viên (NV-19, KH-20, D-13).
  2. **Tách biệt nhãn trạng thái đặt sân và nhãn thanh toán (SRS 3.3):**
     - Đơn `Chờ xác nhận`: Nhãn thanh toán luôn hiển thị là **"Chưa lập hóa đơn"** (không hiển thị "Chưa thanh toán").
     - Đơn `Đã xác nhận`: Hiển thị nhãn thanh toán riêng (`Chưa thanh toán` hoặc `Đã thanh toán`).
  3. **Triển khai các Modal nghiệp vụ thực tế:**
     - **Modal Chi tiết đơn (M-04 / G-09):** Hiển thị đầy đủ thông tin đơn, sân, khung giờ, tổng tiền và trạng thái thanh toán.
     - **Modal Khách hủy đặt sân (M-05, UC-09):** Bắt buộc nhập lý do hủy. Chỉ cho phép tự hủy khi đơn chưa thanh toán; đã thanh toán thì hiển thị hotline liên hệ nhân viên.
     - **Modal Đổi lịch đặt sân (M-06, UC-10):** Chọn khung giờ/sân mới, hiển thị báo giá mới và chênh lệch.
     *(Ghi chú: Trong User-Flows, nhóm tính năng hủy và đổi lịch này được tổng hợp tại mã màn hình thiếu M-06).*

---

### WF-06: TRA CỨU ĐƠN ĐẶT SÂN (BOOKING LOOKUP)

#### A. Hiện trạng UI đang chạy trong Codebase
- **File:** `src/app/(customer)/lookup/page.tsx`, `LookupClient.tsx`, `BookingLookupForm.tsx`, `BookingLookupResult.tsx`.
- **Các thành phần đang chạy:**
  - Form tra cứu: Ô nhập Mã đặt sân `DS-XXXXX` *, ô nhập Số điện thoại hoặc Email (**đang là tùy chọn không bắt buộc**).
  - Có sẵn 4 nút bấm `DEMO_CODES` (`DS-10294`, `DS-10312`, `DS-10218`, `DS-99999`) để điền nhanh dữ liệu mẫu.
  - Kết quả tra cứu: Hiển thị thẻ tóm tắt gồm Mã đơn, Tên khách, Sân, Ngày, Giờ, Tổng tiền, Trạng thái đơn, Trạng thái thanh toán.

#### B. Đặc tả UI Chuẩn & Hướng cập nhật trong Tương lai
- **Căn cứ:** Quyết định X-03, Wireframes WF-06, D-14.
- **Điểm cần refactor từ hiện trạng:**
  1. **Bắt buộc nhập CẶP thông tin:** Người dùng bắt buộc phải điền cả **Mã đặt sân** VÀ **Số điện thoại/Email** khớp với đơn mới được hiển thị kết quả (Quyết định X-03 nhằm bảo mật thông tin khách hàng).
  2. **Loại bỏ các nút DEMO:** Xóa bỏ khối `DEMO_CODES` trong giao diện sản xuất.
  3. **Bảo mật tên khách hàng:** Che một phần tên khách (ví dụ: `Nguyễn *** A`) trong thẻ kết quả để chống lộ danh tính.

---

### WF-07: HỒ SƠ CÁ NHÂN (CUSTOMER PROFILE)

#### A. Hiện trạng UI đang chạy trong Codebase
- **File:** `src/app/(customer)/profile/page.tsx`, `ProfileClient.tsx`, `ProfileInfoForm.tsx`, `ProfileSidebar.tsx`, `ChangePasswordForm.tsx`.
- **Các thành phần đang chạy:**
  - `ProfileInfoForm.tsx`: Họ tên (cho sửa), SĐT (cho sửa, validate regex `^0\d{9}$`), Email (đã khóa `disabled` và `readOnly`).
  - `ProfileSidebar.tsx`: Chức năng chọn ảnh đại diện (avatar upload) và 4 thẻ thống kê cá nhân (Tổng đặt sân, Hoàn thành, Đã hủy, Tổng chi tiêu).
  - `ChangePasswordForm.tsx`: Mật khẩu hiện tại, Mật khẩu mới, Xác nhận mật khẩu mới.

#### B. Đặc tả UI Chuẩn & Hướng cập nhật trong Tương lai
- **Căn cứ:** UC-12, KH-21, BR-18, BR-26, Wireframes WF-07, Quyết định X-04, D-15, D-16, D-17.
- **Điểm cần lưu ý và refactor:**
  1. Giữ nguyên việc **khóa không cho sửa Email** (đã làm đúng theo BR-18).
  2. Nới lỏng regex kiểm tra SĐT từ 10 số cố định sang **8–15 chữ số**, cho phép dấu `+` ở đầu theo chuẩn BR-26.
  3. Chức năng upload Avatar và 4 thẻ Thống kê cá nhân trong `ProfileSidebar.tsx` là các mục ngoài phạm vi SRS 1.7 (D-17); hiện tại giữ nguyên ở client, nếu backend không có endpoint thì không gọi API.
  4. Tuyệt đối **không đưa vào giao diện** danh sách thiết bị/phiên đăng nhập và nút "Tự vô hiệu hóa tài khoản" (tuân thủ nghiêm ngặt Quyết định X-04 & D-18, D-19).

---

### WF-08: WIDGET TRỢ LÝ AI (AI CHATBOT)

#### A. Hiện trạng UI đang chạy trong Codebase
- **Backend API:** Đã có `src/app/api/chat/route.ts` tích hợp Anthropic SDK với Claude model và function calling server-side.
- **Giao diện Frontend:** **Chưa tạo component widget giao diện** (`src/components/chatbot/ChatWidget.tsx` chưa có trong thư mục components).

#### B. Đặc tả UI Chuẩn & Hướng cập nhật trong Tương lai
- **Căn cứ:** UC-13, Wireframes WF-08, G-11.
- **Component cần tạo:** `src/components/chatbot/ChatWidget.tsx`.
- **Vị trí hiển thị:** Nút tròn nổi ở góc dưới bên phải trên tất cả các trang Cổng Khách hàng (ẩn hoàn toàn ở Cổng Quản trị theo `G-11`).
- **Giao diện khung chat:**
  - Header: Tiêu đề "Trợ lý ảo ShuttleVN", nút thu nhỏ/đóng.
  - Body: Danh sách tin nhắn (User tin nhắn xanh lá căn phải, Bot tin nhắn xám căn trái), hiệu ứng loading/typing khi chờ phản hồi.
  - Quick chips: Các câu hỏi gợi ý nhanh (ví dụ: *"Giá sân cuối tuần?", "Cách đặt sân nhanh?", "Chính sách hủy sân?"*).
  - Input footer: Ô nhập câu hỏi và nút gửi tin nhắn.

---

## 4. KHU VỰC 2: CỔNG QUẢN TRỊ & VẬN HÀNH (WF-09 ĐẾN WF-19)

### WF-09: BẢNG ĐIỀU KHIỂN (ADMIN DASHBOARD)

#### A. Hiện trạng UI đang chạy trong Codebase
- **File:** `src/app/(admin)/dashboard/page.tsx`, `DashboardClient.tsx`, `DashboardStats.tsx`, `RevenueChart.tsx`.
- **Các thành phần đang chạy:**
  - `DashboardStats.tsx`: Hiển thị 4 thẻ số liệu gồm: Doanh thu hôm nay, Đặt sân hôm nay, Chờ xác nhận, và **Tỷ lệ lấp đầy** (`summary.occupancyRateToday%`).
  - `DashboardClient.tsx`: Biểu đồ cột doanh thu `RevenueChart`, danh sách đơn "Chờ xác nhận", và bảng dữ liệu "Đặt sân gần đây".

#### B. Đặc tả UI Chuẩn & Hướng cập nhật trong Tương lai
- **Căn cứ:** Màn hình đích QTV (Quyết định X-02), Wireframes WF-09, Quyết định X-04, D-20.
- **Điểm cần refactor từ hiện trạng:**
  1. **Loại bỏ chỉ số "Tỷ lệ lấp đầy":** SRS 1.5 và Quyết định X-04 đã chính thức loại bỏ chỉ số này. Cần xóa thẻ này trong `DashboardStats.tsx`, chỉ giữ 3 chỉ số chính: Doanh thu hôm nay, Đơn hoàn thành hôm nay, Đơn chờ xác nhận.
  2. **Danh sách đơn cần xử lý gấp:** Ưu tiên hiển thị danh sách các đơn `Chờ xác nhận` có khung giờ bắt đầu gần nhất trong ngày kèm nút xem chi tiết/xác nhận nhanh (`G-14`).

---

### WF-10: TIẾP NHẬN YÊU CẦU ĐẶT SÂN (BOOKING REQUESTS)

#### A. Hiện trạng UI đang chạy trong Codebase
- **File:** **Chưa tạo page độc lập trong `src/app/(admin)/`**. Nằm trong phạm vi story US-11 (kế hoạch tuần của Khôi).

#### B. Đặc tả UI Chuẩn & Hướng cập nhật trong Tương lai
- **Căn cứ:** UC-14, NV-03, NV-04, Wireframes WF-10.
- **Route cần tạo:** `/admin/booking-requests` (tại `src/app/(admin)/booking-requests/page.tsx`).
- **Quyền truy cập:** Nhân viên và Quản trị viên (`StaffOnly`).
- **Giao diện chuẩn hóa:**
  - Bộ lọc: Lọc theo Sân, Lọc theo Ngày chơi, Lọc theo Loại khách (Vãng lai / Thành viên).
  - Bảng danh sách đơn Chờ xác nhận (`Pending`):
    - **Sắp xếp bắt buộc:** Đơn cũ nhất xếp trước (theo thời điểm tạo tăng dần - NV-03).
    - Cột: Mã đơn, Thời điểm tạo (UTC+7), Khách hàng (Tên, SĐT, loại khách), Sân & Giờ chơi, Tổng tiền, Thao tác (`[ Chi tiết ]`, `[ Xác nhận ]`, `[ Từ chối ]`).
    - Phân trang: Mặc định 20 dòng/trang.

---

### WF-11: CHI TIẾT ĐẶT SÂN & XỬ LÝ ĐƠN

#### A. Hiện trạng UI đang chạy trong Codebase
- **File:** **Chưa tạo trang chi tiết admin độc lập trong `src/app/(admin)/`**. Nằm trong phạm vi story US-12 (kế hoạch tuần của Khôi).

#### B. Đặc tả UI Chuẩn & Hướng cập nhật trong Tương lai
- **Căn cứ:** UC-15, UC-16, UC-17, UC-18, UC-20, UC-21, UC-22, BR-13, Wireframes WF-11.
- **Route cần tạo:** `/admin/bookings/[id]` (tại `src/app/(admin)/bookings/[id]/page.tsx`).
- **Nội dung hiển thị chuẩn:**
  1. *Khối thông tin đơn:* Mã đơn, Ngày tạo, Khách hàng, Sân, Khung giờ, Tổng tiền.
  2. *Khối thông tin hóa đơn:* Hiển thị "Chưa lập hóa đơn" (đơn Pending); Mã HD, trạng thái `Unpaid`/`Paid`, phương thức, giờ thu (đơn Confirmed/Completed).
  3. *Dòng thời gian trạng thái (Status Timeline):* Trạng thái cũ → mới, Thời điểm UTC+7, Tác nhân (Employee/Customer/System), **Lý do** (bắt buộc khi hủy/từ chối theo BR-13).
  4. *Các modal thao tác tích hợp:*
     - **Modal Xác nhận đặt sân (M-07, UC-15):** Chọn trạng thái thu tiền (Chưa thu / Đã thu đủ), phương thức, thời điểm thu; tự động sinh hóa đơn tương ứng (D-07).
     - **Modal Từ chối đặt sân (M-08, UC-16):** Ô nhập lý do từ chối (bắt buộc, min 5 ký tự), chuyển đơn sang `Cancelled`.
     - **Modal Ghi nhận hoàn thành (M-09, UC-18):** Xác nhận khách đã sử dụng sân, chuyển trạng thái sang `Completed`, tự động sinh hóa đơn nếu đơn chưa có hóa đơn (tương ứng mục thiếu M-08 trong User-Flows).
     - **Modal Hủy do sự cố vận hành (M-10, UC-21, BR-24):** Chọn lý do sự cố vận hành, kích hoạt quy trình hoàn tiền (M-14) nếu đơn đã thanh toán (tương ứng mục thiếu M-10 trong User-Flows).
     - **Modal Đổi lịch thay khách (M-06, UC-20):** Chọn ngày/giờ/sân mới, tính giá chênh lệch và cập nhật hóa đơn.

---

### WF-12: QUẢN LÝ LỊCH SÂN & ĐẶT TẠI QUẦY (COURT SCHEDULE)

#### A. Hiện trạng UI đang chạy trong Codebase
- **File:** `src/app/(admin)/schedule/page.tsx` sử dụng component `src/app/(admin)/schedule/ScheduleClient.tsx`.
- **Các thành phần đang chạy:**
  - Bộ chọn ngày `CustomDatePicker`.
  - Timeline lưới sân 05:00–22:00 (17 tiếng) hiển thị vị trí và độ dài khối đặt sân theo tỷ lệ phần trăm (`getTimelineStyle`).
  - **Chưa có nút/modal "Đặt tại quầy" và chưa có modal cập nhật trạng thái sân.**

#### B. Đặc tả UI Chuẩn & Hướng cập nhật trong Tương lai
- **Căn cứ:** UC-19, UC-20, UC-23, Wireframes WF-12, Quyết định X-05.
- **Điểm cần bổ sung từ hiện trạng:**
  1. **Nút và Modal "Đặt sân tại quầy / Tạo đặt sân thay khách" (M-11, UC-20):**
     - Form nhập: Họ tên khách *, Số điện thoại *, Email (không bắt buộc OTP theo X-05), Sân, Ngày chơi, Giờ bắt đầu, Giờ kết thúc.
     - Nhân viên tạo đơn ở trạng thái `Pending` hoặc chọn xác nhận ngay không qua OTP (tương ứng mục thiếu M-09 trong User-Flows).
  2. **Thao tác nhanh trên sân (Modal M-12, UC-23):** Cho phép nhân viên bấm vào tên sân để đổi nhanh trạng thái sang Bảo trì (`Maintenance`) hoặc Đóng cửa (`Closed`) khi có sự cố khẩn cấp.

---

### WF-13: QUẢN LÝ THANH TOÁN & HÓA ĐƠN (PAYMENTS & INVOICES)

#### A. Hiện trạng UI đang chạy trong Codebase
- **File:** `src/app/(admin)/payments/page.tsx`.
- **Tình trạng thực tế:** **100% Placeholder** – File hiện chỉ có bọc `RoleGuard allowedRoles={['Admin', 'Employee']}` và một thẻ `div` trống ghi chú component sẽ implement sau.

#### B. Đặc tả UI Chuẩn & Hướng cập nhật trong Tương lai
- **Căn cứ:** UC-28, UC-29, UC-22, BR-08, BR-09, Wireframes WF-13, Quyết định X-01, D-07, D-08.
- **Giao diện chuẩn hóa cần xây dựng:**
  - Bộ lọc: Lọc theo Trạng thái hóa đơn (`Chưa thanh toán`, `Đã thanh toán`, `Đã hủy`), Phương thức (Tiền mặt, Chuyển khoản), Khoảng ngày thu.
  - Bảng danh sách hóa đơn: Mã HD (`HD-{yyyyMMdd}-{001}`), Mã đơn đặt, Khách hàng, Số tiền, Trạng thái, Phương thức, Thời điểm thu, Người thu, Thao tác.
  - **Quy tắc bất biến:** **Tuyệt đối KHÔNG có nút "Lập hóa đơn thủ công"** (Hóa đơn chỉ được tạo tự động duy nhất 1 lần trong giao dịch xác nhận đơn, D-07).
  - **Modal Thu tiền (M-13, UC-29):** Chọn Tiền mặt/Chuyển khoản, nhập thời điểm thực thu không sau hiện tại.
  - **Modal Ghi nhận hoàn tiền (M-14, UC-22):** Ghi nhận hoàn tiền cho đơn đã hủy do sự cố hoặc đổi lịch giảm giá (tương ứng mục thiếu M-11 trong User-Flows).

---

### WF-14: QUẢN LÝ KHÁCH HÀNG (CUSTOMERS MANAGEMENT)

#### A. Hiện trạng UI đang chạy trong Codebase
- **File:** `src/app/(admin)/customers/page.tsx` sử dụng component `src/app/(admin)/customers/CustomersClient.tsx`.
- **Các thành phần đang chạy:**
  - Bảng hiển thị danh sách khách hàng từ `customerService.getCustomers()`: Cột Khách hàng, Liên hệ, Loại, Ngày đăng ký, Thao tác.
  - Nút "Thêm khách hàng" và nút "Chi tiết" trong bảng **chưa được gắn handler thao tác**.

#### B. Đặc tả UI Chuẩn & Hướng cập nhật trong Tương lai
- **Căn cứ:** UC-24, UC-26, UC-27, UC-30, BR-12, BR-27, Wireframes WF-14, D-30, D-31.
- **Điểm cần bổ sung từ hiện trạng:**
  1. **Thanh tìm kiếm & Lọc nhanh (UC-30):** Tìm kiếm theo Tên, SĐT, Email hoặc Mã đặt sân gần nhất. Lọc theo Loại khách (Vãng lai / Thành viên) và Trạng thái (`Active` / `Disabled`).
  2. **Thao tác Khóa / Mở khóa tài khoản khách (Modal M-18, UC-27, BR-27):** Gắn handler mở ConfirmDialog; khi mở khóa tài khoản bị khóa do đăng nhập sai, hệ thống tự động reset `FailedLoginAttempts = 0` (BR-12).
  3. **Modal Thêm khách hàng mới (UC-26):** Mở form tạo hồ sơ khách hàng mới (Họ tên, SĐT, Email).

---

### WF-15: QUẢN LÝ SÂN & BẢNG GIÁ (COURTS & PRICING)

#### A. Hiện trạng UI đang chạy trong Codebase
- **File:** `src/app/(admin)/manage-courts/page.tsx` kết hợp `ManageCourtsClient.tsx`, `CourtCardGrid.tsx`, `CourtTable.tsx`, `CourtStats.tsx`, `CourtFormModal.tsx`, `CourtStatusModal.tsx`, `PricingTimeline.tsx`.
- **Các thành phần đang chạy:**
  - Chuyển đổi xem dạng Thẻ hoặc Bảng.
  - `CourtStats.tsx`: Thống kê Tổng số sân, Đang hoạt động, Đang bảo trì.
  - `CourtFormModal.tsx`: Thêm/sửa sân (Tên sân, mô tả).
  - `PricingTimeline.tsx`: Đã dựng giao diện kéo thanh mốc giờ 30 phút và chia đoạn giá theo thứ trong tuần.

#### B. Đặc tả UI Chuẩn & Hướng cập nhật trong Tương lai
- **Căn cứ:** UC-31, UC-32, UC-33, UC-34, UC-35, BR-03, BR-15, BR-25, Wireframes WF-15.
- **Điểm cần hoàn thiện:**
  1. **Modal Thêm / Sửa sân (M-15, UC-31, UC-32):** Thêm bước **Xem trước cấu hình sân** trước khi xác nhận lưu theo yêu cầu BR-25 và UC-31 bước 3.
  2. Ràng buộc Xóa sân (Xóa mềm - BR-15): Chỉ cho phép xóa khi sân không còn bất kỳ đơn nào ở trạng thái `Pending` hoặc `Confirmed`.
  3. **Cấu hình bảng giá & giờ mở cửa (M-16, UC-34, UC-35):** Kết nối API lưu bảng giá theo từng ngày trong tuần từ `PricingTimeline` (tương ứng mục thiếu M-13 trong User-Flows).
  4. **Modal Đổi trạng thái sân (M-12, UC-33):** Cho phép đổi nhanh trạng thái sân sang Hoạt động, Bảo trì hoặc Đóng cửa.

---

### WF-16: QUẢN LÝ NHÂN VIÊN & PHÂN QUYỀN (STAFF & ACCOUNTS)

#### A. Hiện trạng UI đang chạy trong Codebase
- **File:** `src/app/(admin)/employees/page.tsx` sử dụng `EmployeesClient.tsx` và `EmployeeFormModal.tsx`.
- **Các thành phần đang chạy:**
  - Bảng danh sách nhân viên: Họ tên, Email, Số điện thoại, Vai trò (Admin / Employee), Thao tác sửa.
  - `EmployeeFormModal.tsx`: Form thêm/sửa nhân viên gồm: `fullName`, `phone` (10 số), `email`, `password` (min 8 ký tự), switch `isAdmin`. QTV nhập trực tiếp mật khẩu ban đầu (đã khớp Quyết định X-06).

#### B. Đặc tả UI Chuẩn & Hướng cập nhật trong Tương lai
- **Căn cứ:** UC-36, UC-37, UC-38, UC-39, BR-27, Wireframes WF-16, Quyết định X-04, X-06.
- **Điểm cần bổ sung từ hiện trạng:**
  1. **Modal Thêm / Sửa nhân viên (M-17, UC-36, UC-37):** Nới lỏng regex SĐT từ 10 số sang 8–15 chữ số (`BR-26`). QTV tiếp tục nhập trực tiếp mật khẩu ban đầu (`X-06`).
  2. **Modal Khóa / Mở khóa nhân viên (M-18, UC-38):** Ràng buộc cốt lõi bảo vệ QTV cuối cùng (`BR-27`, `UC-38 E1`): Chặn không cho phép khóa hoặc hạ quyền nếu đó là Quản trị viên Hoạt động (`ACTIVE`) duy nhất còn lại trong hệ thống.
  3. **Modal Xóa tài khoản nhân viên hard-delete (M-19, UC-39):** Chỉ hiển thị cho Admin, không thể xóa QTV cuối cùng (tương ứng mục thiếu M-14 trong User-Flows).
  4. Đã loại bỏ hoàn toàn ca làm việc/chấm công/ngày nghỉ theo Quyết định X-04.

---

### WF-17: THEO DÕI ĐẶT SÂN TOÀN HỆ THỐNG (SYSTEM ALL BOOKINGS)

#### A. Hiện trạng UI đang chạy trong Codebase
- **File:** **Chưa tạo page độc lập trong `src/app/(admin)/`**. Nằm trong phạm vi story US-23 (kế hoạch của Khôi).

#### B. Đặc tả UI Chuẩn & Hướng cập nhật trong Tương lai
- **Căn cứ:** UC-40, QT-15, QT-16, Wireframes WF-17.
- **Route cần tạo:** `/admin/bookings` (tại `src/app/(admin)/all-bookings/page.tsx` hoặc tab trong quản lý đặt sân).
- **Quyền truy cập:** Chỉ dành riêng cho Quản trị viên (`AdminOnly`).
- **Giao diện chuẩn hóa:**
  - Bộ lọc đa tiêu chí: Lọc theo khoảng ngày sử dụng (`Booking.Date`, giờ VN theo D8), Lọc theo Sân, Lọc theo Trạng thái đặt sân, Lọc theo Trạng thái hóa đơn, Tìm kiếm khách hàng.
  - Bảng dữ liệu: Hiển thị toàn bộ đơn đặt sân trong hệ thống, bấm vào từng đơn để xem chi tiết và toàn bộ Dòng thời gian lịch sử trạng thái của đơn đó.

---

### WF-18: BÁO CÁO & THỐNG KÊ (REPORTS & STATISTICS)

#### A. Hiện trạng UI đang chạy trong Codebase
- **File:** `src/app/(admin)/statistics/page.tsx`.
- **Tình trạng thực tế:** **100% Placeholder** – File hiện chỉ bọc `RoleGuard allowedRoles={['Admin']}` và hiển thị dòng chữ thông báo *"Chức năng thống kê báo cáo đang được phát triển."*

#### B. Đặc tả UI Chuẩn & Hướng cập nhật trong Tương lai
- **Căn cứ:** UC-41, UC-42, QT-17, QT-18, QT-19, Wireframes WF-18, Quyết định X-04, D-34.
- **Giao diện chuẩn hóa cần xây dựng:**
  - Bộ chọn khoảng thời gian: Hôm nay, 7 ngày qua, Tháng này, Năm nay, Tùy chọn khoảng ngày (Từ ngày – Đến ngày).
  - Chọn nhóm dữ liệu theo: **Ngày** hoặc **Tháng** (QT-17).
  - **Khối Thống kê Doanh thu (UC-41):** Chỉ cộng tổng tiền các hóa đơn hợp lệ có trạng thái **Đã thanh toán (`Paid`)** có thời điểm thu nằm trong kỳ. Biểu đồ doanh thu và bảng chi tiết theo ngày/tháng.
  - **Khối Thống kê Đặt sân (UC-42):** Tổng số lượt đặt và tổng giờ đặt sân (mọi trạng thái trừ Đã hủy), tách riêng lượt Hoàn thành (`Completed`).
  - **Tuyệt đối không có chỉ số "Tỷ lệ lấp đầy"** theo Quyết định X-04.

---

### WF-19: NHẬT KÝ HOẠT ĐỘNG (AUDIT LOG)

#### A. Hiện trạng UI đang chạy trong Codebase
- **File:** `src/app/(admin)/audits/page.tsx`.
- **Tình trạng thực tế:** **100% Placeholder** – File hiện chỉ bọc `RoleGuard allowedRoles={['Admin']}` và hiển thị dòng chữ thông báo *"Chức năng lịch sử hệ thống đang được phát triển."*

#### B. Đặc tả UI Chuẩn & Hướng cập nhật trong Tương lai
- **Căn cứ:** UC-43, BR-14, QT-20, QT-21, Wireframes WF-19, Quyết định X-04, D-35.
- **Giao diện chuẩn hóa cần xây dựng:**
  - **Tính chất bất biến (Read-only):** Không có nút Thêm, Sửa, Xóa bản ghi audit. Không có cột Lý do trong bảng audit chung (BR-14).
  - Bộ lọc: Khoảng thời gian, Tác nhân (`Hệ thống`, `Nhân viên`, `Khách hàng`), Thao tác, Đối tượng.
  - Bảng dữ liệu: Cột Thời điểm (UTC+7), Tác nhân (kèm tên người thực hiện), Thao tác, Đối tượng tác động, và **Giá trị Trước / Sau thay đổi** hiển thị chi tiết bên dưới mỗi dòng (hoặc popup xem chi tiết).
  - Loại bỏ hoàn toàn cảnh báo phần cứng/CPU/sao lưu (X-04). Không hiển thị mật khẩu hay mã OTP.

---

## 5. HỆ THỐNG MODAL / DIALOG TOÀN HỆ THỐNG

Bảng đối chiếu toàn diện 19 Modal/Dialog giữa Hiện trạng Codebase và Thiết kế Chuẩn mục tiêu (kèm mã quy chiếu màn hình thiếu trong `User-Flows.md`):

| Mã Modal | Tên Modal / Dialog | Màn hình liên kết | Quy chiếu User-Flows | Tình trạng trong Codebase hiện tại | Thiết kế Chuẩn mục tiêu |
|---|---|---|---|---|---|
| **M-01** | Xác minh Email OTP 6 số | WF-01, WF-03, WF-04 | UF: `M-01` | **Chưa có component modal** (mã xác minh đang để inline trong form đăng ký) | Modal 6 ô rời, đếm ngược 60s, hiệu lực 10p, sai 5 lần hủy mã (BR-11, BR-10). |
| **M-02** | Thông báo thành công / Kết quả đặt sân | WF-01, WF-03, WF-04 | UF: `M-05` (đặt sân) | Sử dụng Sonner `toast.success` | Modal/Card thông báo thành công kèm nút điều hướng, hiển thị mã đơn `DS-XXXXX` và hướng dẫn tra cứu. |
| **M-03** | Popup chọn thời lượng | WF-04 (Lưới sân) | — | **Đã có** `SlotPopup.tsx` (mức 60–180p) | Thêm mức **30 phút** (BR-20), kết nối luồng tạo đơn thay vì chỉ đóng popup. |
| **M-04** | Chi tiết đơn đặt sân | WF-05, WF-10, WF-17 | UF: `G-09` | `TODO` / `console.log` | Modal hiển thị chi tiết thông tin đơn, sân, giờ, tiền, trạng thái đơn, trạng thái hóa đơn và timeline. |
| **M-05** | Khách hủy đặt sân | WF-05 (Khách) | UF: `M-06` (nhánh hủy) | `TODO` / `console.log` | Bắt buộc nhập lý do hủy. Chỉ tự hủy khi đơn Chưa thanh toán (UC-09, BR-05); nếu đã thanh toán thì hiện hotline. |
| **M-06** | Đổi lịch đặt sân | WF-05 (Khách), WF-11 (NV) | UF: `M-06` (nhánh đổi) | `TODO` / `console.log` | Chọn ngày/giờ/sân mới, tính giá chênh lệch, cập nhật hóa đơn tương ứng (UC-10, UC-20). |
| **M-07** | Nhân viên Xác nhận đặt sân | WF-10, WF-11 (Nhân viên) | — | **Chưa có modal** | Chọn trạng thái thu tiền (Chưa thu / Đã thu đủ), phương thức, thời điểm thu; tự động sinh hóa đơn (UC-15, D-07). |
| **M-08** | Nhân viên Từ chối đặt sân | WF-10, WF-11 (Nhân viên) | — | **Chưa có modal** | Bắt buộc nhập lý do từ chối (min 5 ký tự), chuyển đơn sang `Cancelled` (UC-16, BR-13). |
| **M-09** | Ghi nhận hoàn thành lượt chơi | WF-11 (Nhân viên) | UF: `M-08` | **Chưa có modal** | Chuyển đơn sang `Completed`, tự động sinh hóa đơn nếu đơn chưa có hóa đơn (UC-18). |
| **M-10** | Hủy do sự cố vận hành | WF-11 (Nhân viên) | UF: `M-10` | **Chưa có modal** | Nhập lý do sự cố (BR-24), kích hoạt luồng hoàn tiền M-14 nếu đơn đã thanh toán (UC-21). |
| **M-11** | Đặt sân tại quầy thay khách | WF-12 (Lịch sân admin) | UF: `M-09` | **Chưa có modal** | Biểu mẫu đặt sân trực tiếp không cần gửi OTP xác minh email theo Quyết định X-05 (UC-20). |
| **M-12** | Đổi trạng thái sân khẩn cấp | WF-12, WF-15 (NV, QTV) | — | Đã có `CourtStatusModal.tsx` ở WF-15; chưa có ở WF-12 | Đổi nhanh trạng thái sân sang Hoạt động, Bảo trì hoặc Đóng cửa khi có sự cố khẩn cấp (UC-23, UC-33). |
| **M-13** | Thu tiền hóa đơn | WF-13, WF-11 (NV) | — | **Chưa có modal** | Chọn Tiền mặt/Chuyển khoản, thời điểm thực thu không sau hiện tại (UC-29). |
| **M-14** | Ghi nhận hoàn tiền | WF-13, WF-11 (NV) | UF: `M-11` | **Chưa có modal** | Nhập số tiền hoàn, phương thức, thời điểm, lý do hoàn tiền (UC-22). |
| **M-15** | Thêm / Sửa sân | WF-15 (Quản lý sân) | — | **Đã có** `CourtFormModal.tsx` | Bổ sung bước xem trước cấu hình sân trước khi xác nhận lưu (UC-31, UC-32, BR-25). |
| **M-16** | Cấu hình bảng giá & Giờ mở cửa | WF-15 (Quản lý sân) | UF: `M-13` | **Đã có** `PricingTimeline.tsx` | Hoàn thiện luồng lưu cấu hình giá và giờ mở cửa theo từng thứ trong tuần từ timeline (UC-34, UC-35). |
| **M-17** | Thêm / Sửa nhân viên | WF-16 (Nhân viên) | — | **Đã có** `EmployeeFormModal.tsx` | Nới lỏng regex SĐT 8-15 số; QTV nhập trực tiếp mật khẩu ban đầu min 8 ký tự (UC-36, UC-37, X-06). |
| **M-18** | Xác nhận Khóa / Mở khóa tài khoản | WF-14 (Khách), WF-16 (NV) | — | **Đã có** `ConfirmDialog.tsx` | Gắn handler thực tế; reset `FailedLoginAttempts = 0` khi mở khóa (BR-12); bảo vệ QTV cuối cùng (BR-27). |
| **M-19** | Xác nhận Xóa tài khoản (hard-delete) | WF-16 (Quản lý nhân viên) | UF: `M-14` | **Đã có** `ConfirmDialog.tsx` | Kiểm tra ràng buộc nghiêm ngặt: Tuyệt đối không xóa tài khoản Quản trị viên Hoạt động duy nhất còn lại (UC-39, BR-27). |

---

## 6. CHECKLIST REFACTOR & LỘ TRÌNH HOÀN THIỆN

Dưới đây là các đầu việc cụ thể để đưa giao diện codebase hiện tại đạt 100% chuẩn thiết kế `UI-screens`:

### Ưu tiên 1 (Sửa lỗi logic & luồng nghiệp vụ hiện có)
- [ ] **Auth Redirection (`src/hooks/useAuth.ts`):** Sửa luồng redirect sau login; chỉ Admin vào `/dashboard`, Employee chuyển về `/admin/booking-requests` hoặc `/schedule` (`X-02`).
- [ ] **Admin Sidebar (`src/components/layout/AdminSidebar.tsx`):** Thêm điều kiện ẩn/hiện menu theo vai trò (Employee thấy 4 mục, Admin thấy đủ 9 mục) (`X-02`).
- [ ] **Đặt sân nhanh (`src/components/booking/WalkInBookingForm.tsx`):** Chuyển trường Email sang bắt buộc; thêm bước xác thực OTP qua email trước khi tạo đơn (`X-01`, `X-07`).
- [ ] **Popup thời lượng (`src/components/booking/SlotPopup.tsx`):** Bổ sung mốc thời lượng 30 phút (`BR-20`); kết nối action nút bấm sang bước tạo đơn.
- [ ] **Dashboard Stats (`src/components/dashboard/DashboardStats.tsx`):** Xóa thẻ "Tỷ lệ lấp đầy" (`X-04`).
- [ ] **Lịch sử đặt sân (`src/components/booking/BookingCard.tsx`):** Xóa nút "Hóa đơn" trên thẻ của khách (`D-13`); sửa nhãn thanh toán của đơn Pending thành "Chưa lập hóa đơn" (`D-12`).
- [ ] **Tra cứu đơn (`src/components/booking/BookingLookupForm.tsx`):** Bắt buộc nhập cả mã đơn và SĐT/Email (`X-03`); xóa các nút DEMO.
- [ ] **Hồ sơ cá nhân & Nhân viên (`ProfileInfoForm.tsx`, `EmployeeFormModal.tsx`):** Nới lỏng regex SĐT từ 10 số cố định sang 8–15 chữ số (`BR-26`).

### Ưu tiên 2 (Triển khai các màn hình còn thiếu & Placeholder)
- [ ] **WF-03 (`/forgot-password`):** Xây dựng trang Quên mật khẩu tại `src/app/(auth)/forgot-password/page.tsx` theo quy trình 3 bước (Email -> OTP Modal M-01 -> Mật khẩu mới).
- [ ] **WF-10 (`/admin/booking-requests`):** Xây dựng trang tiếp nhận yêu cầu đặt sân cho nhân viên tại `src/app/(admin)/booking-requests/page.tsx` (US-11, sắp xếp đơn cũ nhất trước theo NV-03).
- [ ] **WF-11 (`/admin/bookings/[id]`):** Xây dựng trang chi tiết đơn và các modal xử lý trạng thái tại `src/app/(admin)/bookings/[id]/page.tsx` (US-12, Timeline có Lý do theo BR-13).
- [ ] **WF-13 (`/admin/payments`):** Xây dựng trang quản lý thanh toán & hóa đơn từ placeholder `src/app/(admin)/payments/page.tsx` (tuyệt đối không có nút tạo hóa đơn thủ công theo D-07).
- [ ] **WF-17 (`/admin/bookings`):** Xây dựng trang theo dõi đặt sân toàn hệ thống cho QTV tại `src/app/(admin)/bookings/page.tsx` (US-23).
- [ ] **WF-18 (`/admin/reports` / `/statistics`):** Xây dựng trang thống kê doanh thu và đặt sân từ placeholder `src/app/(admin)/statistics/page.tsx` (không có tỷ lệ lấp đầy).
- [ ] **WF-19 (`/admin/audit-log` / `/audits`):** Xây dựng trang nhật ký hoạt động từ placeholder `src/app/(admin)/audits/page.tsx` (bảng bất biến chỉ đọc theo BR-14).
- [ ] **WF-08 (`ChatWidget.tsx`):** Tạo component widget AI Chatbot nổi tại `src/components/chatbot/ChatWidget.tsx` kết nối API `src/app/api/chat/route.ts` cho cổng khách hàng.

---

*Tài liệu được cập nhật và kiểm duyệt nghiêm ngặt dựa trên mã nguồn thực tế và hồ sơ nghiệp vụ chuẩn của ShuttleVN.*
