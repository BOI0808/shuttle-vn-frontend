# WIREFRAMES HỆ THỐNG ĐẶT SÂN CẦU LÔNG (SHUTTLEVN)
### Đặc tả Wireframe Mục tiêu & Đối chiếu Hiện trạng Codebase

**Khu vực 1: Cổng Khách hàng (WF-01 đến WF-08) và Khu vực 2: Cổng Quản trị & Nhân viên (WF-09 đến WF-19)**

| Mục | Nội dung |
|---|---|
| Căn cứ nghiệp vụ | SRS 1.7 và UseCase 1.5 (nguồn chuẩn duy nhất), User-Flows.md v1.1 |
| Căn cứ kỹ thuật | Mã nguồn thực tế trong `shuttle-vn-frontend/src` (Next.js 15 App Router, React 19, Tailwind CSS) |
| Phạm vi tài liệu | 19 màn hình WF-01 đến WF-19 |
| Định dạng | ASCII wireframe + bảng đối chiếu Hiện trạng Codebase & Chuẩn mục tiêu |
| Nhãn đối chiếu | `[G-xx]` là điểm đối chiếu/giả định được tổng hợp ở mục cuối tài liệu |

### Danh sách 19 màn hình & Đối chiếu Codebase

| Mã | Màn hình | Đối tượng | Route Codebase hiện tại | Route Wireframe mục tiêu | Tình trạng Codebase hiện tại |
|---|---|---|---|---|---|
| WF-01 | Đăng ký tài khoản | Khách vãng lai | `/register` (`/(auth)/register`) | `/register` | Đang chạy (`RegisterForm.tsx`, mã xác thực inline, mk min 6) |
| WF-02 | Đăng nhập | Mọi tài khoản | `/login` (`/(auth)/login`) | `/login` | Đang chạy (`LoginForm.tsx`, `useAuth.ts` chuyển cả Staff vào `/dashboard`) |
| WF-03 | Quên mật khẩu | Khách thành viên | *Chưa có route* | `/forgot-password` | Chưa triển khai (link tại login đang trỏ `#`) |
| WF-04 | Đặt sân & Lưới sân | Khách vãng lai, thành viên | `/courts` (`/(customer)/courts`) & `/booking` (placeholder) | `/booking` | Đang chạy lưới sân (`CourtsClient.tsx`); `/booking` là placeholder rỗng |
| WF-05 | Lịch sử đặt sân | Khách thành viên | `/my-bookings` (`/(customer)/my-bookings`) | `/my-bookings` | Đang chạy (`BookingHistoryList.tsx`, còn nút Hóa đơn, nút action là `TODO`) |
| WF-06 | Tra cứu đơn đặt sân | Khách vãng lai, thành viên | `/lookup` (`/(customer)/lookup`) | `/lookup` | Đang chạy (`BookingLookupForm.tsx`, có nút DEMO, ô liên hệ chưa bắt buộc) |
| WF-07 | Hồ sơ cá nhân | Khách thành viên | `/profile` (`/(customer)/profile`) | `/profile` | Đang chạy (`ProfileInfoForm.tsx`, email disabled; `ProfileSidebar` có avatar/thống kê) |
| WF-08 | Widget Trợ lý AI | Khách vãng lai, thành viên | *Chưa có UI widget* | (widget nổi) | Backend API route `/api/chat` đã có; Chưa có component giao diện `ChatWidget` |
| WF-09 | Bảng điều khiển | Quản trị viên | `/dashboard` (`/(admin)/dashboard`) | `/admin/dashboard` | Đang chạy (`DashboardStats.tsx` còn thẻ Tỷ lệ lấp đầy, `RevenueChart`) |
| WF-10 | Tiếp nhận yêu cầu đặt sân | Nhân viên, Quản trị viên | *Chưa có route* | `/admin/booking-requests` | Chưa triển khai (thuộc US-11 đang phát triển) |
| WF-11 | Chi tiết đặt sân & Xử lý đơn | Nhân viên, Quản trị viên | *Chưa có route* | `/admin/bookings/[id]` | Chưa triển khai (thuộc US-12 đang phát triển) |
| WF-12 | Quản lý lịch sân & Đặt tại quầy | Nhân viên, Quản trị viên | `/schedule` (`/(admin)/schedule`) | `/admin/court-schedule` | Đang chạy (`ScheduleClient.tsx` timeline; chưa có modal Đặt tại quầy) |
| WF-13 | Quản lý thanh toán & Hóa đơn | Nhân viên, Quản trị viên | `/payments` (`/(admin)/payments`) | `/admin/payments` | 100% Placeholder (`payments/page.tsx` chỉ bọc RoleGuard) |
| WF-14 | Quản lý khách hàng | Nhân viên, Quản trị viên | `/customers` (`/(admin)/customers`) | `/admin/customers` | Đang chạy bảng (`CustomersClient.tsx`; chưa có handler thêm/khóa khách) |
| WF-15 | Quản lý sân & Bảng giá | Quản trị viên | `/manage-courts` (`/(admin)/manage-courts`) | `/admin/courts` | Đang chạy (`ManageCourtsClient.tsx`, `PricingTimeline.tsx`) |
| WF-16 | Quản lý nhân viên & Phân quyền | Quản trị viên | `/employees` (`/(admin)/employees`) | `/admin/staff` | Đang chạy (`EmployeesClient.tsx`, `EmployeeFormModal.tsx` QTV nhập mk min 8) |
| WF-17 | Theo dõi đặt sân toàn hệ thống | Quản trị viên | *Chưa có route* | `/admin/bookings` | Chưa triển khai (thuộc US-23 đang phát triển) |
| WF-18 | Báo cáo & Thống kê | Quản trị viên | `/statistics` (`/(admin)/statistics`) | `/admin/reports` | 100% Placeholder (`statistics/page.tsx` thông báo đang phát triển) |
| WF-19 | Nhật ký hoạt động | Quản trị viên | `/audits` (`/(admin)/audits`) | `/admin/audit-log` | 100% Placeholder (`audits/page.tsx` thông báo đang phát triển) |

---

## 0. Quy ước đọc wireframe

| Ký hiệu | Ý nghĩa |
|---|---|
| `[ Nút ]` | Nút bấm. `[*Tab*]` hoặc `*Mục*` là tab/mục đang chọn |
| `[ text____ ]` | Ô nhập liệu. `*` sau nhãn là bắt buộc |
| `(o)` / `( )` | Radio đã chọn / chưa chọn |
| `[v]` | Dropdown. `(lịch)` là bộ chọn ngày |
| `(!)` | Thông báo lỗi. `(i)` là thông tin/gợi ý |
| `[Nhãn]` | Badge trạng thái (luôn có chữ, không chỉ dựa vào màu) |
| `{Hotline}` | Số hotline hiển thị theo cấu hình. SRS/UC chưa quy định số cụ thể `[G-06]` |
| `[  ]` `[##]` `[**]` `[//]` `[..]` | Ô lưới sân: Còn trống / Đã đặt / Đặt của bạn / Đóng cửa / Đã qua giờ |

Dữ liệu trong wireframe (tên, mã đơn, giá, giờ) chỉ là **dữ liệu mẫu**.

### 0.1. Nguyên tắc áp dụng cho mọi màn hình khách hàng

1. **Tổng tiền và báo giá luôn do máy chủ tính.** Giao diện chỉ hiển thị, không tự cộng giá.
2. **Giờ và ngày hiển thị theo giờ Việt Nam (UTC+7).** Slot 30 phút. Giờ bắt đầu phải sau thời điểm hiện tại của máy chủ.
3. **Mọi điều kiện nghiệp vụ được kiểm tra lại ở máy chủ khi gửi.** Giao diện ẩn/vô hiệu nút chỉ để hướng dẫn người dùng.
4. **Đơn `Chờ xác nhận` hiển thị nhãn thanh toán "Chưa lập hóa đơn".** Hóa đơn chỉ sinh khi nhân viên xác nhận đơn.
5. **Không vẽ** các mục đã loại khỏi phạm vi: tỷ lệ lấp đầy, quản lý thiết bị/phiên đăng nhập, khách tự vô hiệu hóa tài khoản, ca làm việc/chấm công/ngày nghỉ nhân viên, nút lập hóa đơn thủ công.

### 0.2. Thành phần chung của Cổng Khách hàng

**Header + Footer (khách chưa đăng nhập).** Header chỉ có Đặt sân, Tra cứu đơn, Đăng nhập, Đăng ký. Mục "Lịch sử đặt sân" chỉ dành cho khách thành viên nên được ẩn với khách vãng lai `[G-03]`.

```text
+--------------------------------------------------------------------------------------------------+
| [ShuttleVN]   *Đặt sân*   Tra cứu đơn                                      [Đăng nhập] [Đăng ký] |
+--------------------------------------------------------------------------------------------------+
| (nội dung trang)                                                                                 |
+--------------------------------------------------------------------------------------------------+
| © 2026 ShuttleVN                                                              Hotline: {Hotline} |
+--------------------------------------------------------------------------------------------------+
```

**Header (khách thành viên đã đăng nhập).** Có đủ Đặt sân, Lịch sử đặt sân, Tra cứu đơn và Avatar menu.

```text
+--------------------------------------------------------------------------------------------------+
| [ShuttleVN]   Đặt sân   *Lịch sử đặt sân*   Tra cứu đơn                    (NA) Nguyễn Văn A [v] |
+--------------------------------------------------------------------------------------------------+
| (nội dung trang)                                                                                 |
+--------------------------------------------------------------------------------------------------+
| © 2026 ShuttleVN                                                              Hotline: {Hotline} |
+--------------------------------------------------------------------------------------------------+
```

**Avatar menu** (mở khi bấm tên/avatar):

```text
                                                                      +------------------------+
                                                                      | Hồ sơ cá nhân          |
                                                                      | Lịch sử đặt sân        |
                                                                      +------------------------+
                                                                      | Đăng xuất              |
                                                                      +------------------------+
```

| Thành phần chung | Quy ước giao diện (đề xuất) |
|---|---|
| Header | Cố định trên cùng. Mục đang xem được đánh dấu. Trên màn hình hẹp, các mục gộp vào nút menu |
| Footer | Bản quyền + hotline hỗ trợ |
| Toast | Thành công (xanh), lỗi (đỏ). Tự đóng sau vài giây, có nút đóng. Lỗi nghiệp vụ nghiêm trọng dùng banner trong trang hoặc modal, không dùng toast |
| Loading | Skeleton cho danh sách/lưới. Nút gửi đổi sang trạng thái "Đang xử lý..." và bị vô hiệu để tránh gửi 2 lần |
| Lỗi mạng / máy chủ | Banner "Không thể kết nối. Vui lòng thử lại." + nút Thử lại. Dữ liệu người dùng đã nhập được giữ nguyên |
| Phiên hết hạn | Chuyển về Đăng nhập kèm thông báo, sau đó quay lại trang đang xem |
| Tài khoản bị khóa giữa phiên | Đăng xuất bắt buộc và hiển thị thông báo tài khoản bị khóa (xem WF-02) |
| Trợ lý AI | Nút chat nổi góc dưới phải trên mọi trang của Cổng Khách hàng (WF-08) |

### 0.3. Thành phần chung của Cổng Quản trị & Vận hành

**Thanh bên điều hướng (AdminSidebar - w=220px, nền `#FBFBFA`):**
- **Hiện trạng Codebase (`AdminSidebar.tsx`):** Đang fix cứng 8 liên kết cho mọi vai trò đăng nhập:
  - *Tổng quan:* Bảng điều khiển (`/dashboard`), Thống kê (`/statistics`).
  - *Vận hành:* Lịch sân (`/schedule`), Thanh toán (`/payments`), Quản lý sân (`/manage-courts`).
  - *Quản trị:* Khách hàng (`/customers`), Nhân viên (`/employees`), Nhật ký hoạt động (`/audits`).
- **Chuẩn Wireframe tương lai (Quyết định X-02 & SRS 2.2):** Phân quyền hiển thị theo Role:
  - *Nhân viên (Employee):* Chỉ thấy 4 mục vận hành nghiệp vụ: Lịch sân, Yêu cầu đặt sân, Thanh toán, Khách hàng.
  - *Quản trị viên (Admin):* Thấy đầy đủ 9 mục (thêm Bảng điều khiển, Quản lý sân, Nhân viên, Thống kê, Nhật ký, Đặt sân toàn hệ thống).

```text
+----------------------+------------------------------------------------------------------------------------------------+
| ShuttleVN · Admin    | [Tiêu đề trang hiện tại]                                          Nguyễn Văn B · Nhân viên [v] |
+----------------------+------------------------------------------------------------------------------------------------+
| MENU                 | (Nội dung màn hình quản trị / vận hành)                                                        |
|   Lịch sân           |                                                                                                |
|   Yêu cầu đặt sân    |                                                                                                |
|   Thanh toán         |                                                                                                |
|   Khách hàng         |                                                                                                |
+----------------------+------------------------------------------------------------------------------------------------+
```

---

# KHU VỰC 1: CỔNG KHÁCH HÀNG (WF-01 đến WF-08)


## WF-01: Đăng ký tài khoản

| Mục | Nội dung |
|---|---|
| Mã màn hình | WF-01 Đăng ký tài khoản |
| Use-case | UC-01 Đăng ký tài khoản; UC-02 Xác minh email bằng mã OTP |
| Đối tượng | Khách vãng lai chưa có tài khoản |
| Route Codebase hiện tại | `/register` (`src/app/(auth)/register/page.tsx`) |
| Route Wireframe mục tiêu | `/register` |
| Component Codebase | `src/components/auth/RegisterForm.tsx` |
| Tình trạng Codebase | Đang chạy (UI form cơ bản) |
| Điều hướng ra | Thành công → `/login`. Link "Đăng nhập" → `/login` |

> **Hiện trạng Codebase & Định hướng hoàn thiện tương lai:**
> - *Codebase hiện tại:* Form `RegisterForm.tsx` đang có ô "Mã xác thực" dạng input thông thường nằm inline trong form kèm nút "Lấy mã"; mật khẩu validate `min(6)`.
> - *Chuẩn Wireframe tương lai:* Nâng mật khẩu lên `8–128 ký tự` (BR-11). Bỏ ô nhập inline; sau khi điền form và bấm `[ ĐĂNG KÝ ]`, hệ thống mở **Modal OTP M-01 (6 ô số rời)** để xác thực email trước khi tạo tài khoản. Bổ sung Modal thành công với nút "Đăng nhập ngay".

### 1.1. Wireframe

```text
+--------------------------------------------------------------------------------------------------+
| [ShuttleVN]   Đặt sân   Tra cứu đơn                                        [Đăng nhập] [Đăng ký] |
+--------------------------------------------------------------------------------------------------+
|                                                                                                  |
|                   +----------------------------------------------------------+                   |
|                   |                    ĐĂNG KÝ TÀI KHOẢN                     |                   |
|                   |     Tạo tài khoản để đặt sân và xem lịch sử đặt sân      |                   |
|                   |                                                          |                   |
|                   | Họ và tên *                                              |                   |
|                   | [ Nguyễn Văn A________________________________________ ] |                   |
|                   |                                                          |                   |
|                   | Số điện thoại *                                          |                   |
|                   | [ 0901234567__________________________________________ ] |                   |
|                   |     8–15 chữ số, có thể bắt đầu bằng +                   |                   |
|                   |                                                          |                   |
|                   | Email *                                                  |                   |
|                   | [ ten@email.com_______________________________________ ] |                   |
|                   |     Dùng làm tên đăng nhập, không thể đổi sau này        |                   |
|                   |                                                          |                   |
|                   | Mật khẩu *                                               |                   |
|                   | [ ********_____________________________________ ] [Hiện] |                   |
|                   |     8–128 ký tự                                          |                   |
|                   |                                                          |                   |
|                   | Xác nhận mật khẩu *                                      |                   |
|                   | [ ********_____________________________________ ] [Hiện] |                   |
|                   |                                                          |                   |
|                   |                       [ ĐĂNG KÝ ]                        |                   |
|                   |                                                          |                   |
|                   |                Đã có tài khoản? Đăng nhập                |                   |
|                   +----------------------------------------------------------+                   |
|                                                                                                  |
+--------------------------------------------------------------------------------------------------+
| © 2026 ShuttleVN                                                              Hotline: {Hotline} |
+--------------------------------------------------------------------------------------------------+
```

### 1.2. Chi tiết thành phần và validation

| Trường | Bắt buộc | Quy tắc | Thông báo lỗi (đề xuất) |
|---|---|---|---|
| Họ và tên | Có | Cắt khoảng trắng đầu/cuối. Không được rỗng | Vui lòng nhập họ và tên |
| Số điện thoại | Có | Bỏ khoảng trắng/dấu gạch. Cho phép `+` ở đầu. Sau đó phải có 8–15 chữ số. Lưu và hiển thị dạng chuỗi (giữ số 0 đầu) | Số điện thoại phải có 8–15 chữ số |
| Email | Có | Cắt khoảng trắng, đổi sang chữ thường. Đúng định dạng email. Là tên đăng nhập, không đổi được sau này | Vui lòng nhập đúng định dạng email |
| Mật khẩu | Có | 8–128 ký tự. Không cắt khoảng trắng. Có nút Hiện/Ẩn | Mật khẩu phải từ 8 đến 128 ký tự |
| Xác nhận mật khẩu | Có | Phải khớp Mật khẩu. Chỉ kiểm tra ở giao diện, máy chủ chỉ nhận một trường mật khẩu | Mật khẩu xác nhận không khớp |

Hành vi của nút **ĐĂNG KÝ**:

1. Kiểm tra toàn bộ trường. Lỗi hiển thị ngay dưới từng ô, con trỏ nhảy tới ô lỗi đầu tiên.
2. Hợp lệ → gửi yêu cầu. Nút đổi thành "Đang gửi mã..." và bị vô hiệu.
3. Thành công → mở **modal OTP** (mã 6 chữ số gửi tới email vừa nhập).
4. Xác minh đúng → tài khoản được tạo, hiển thị modal thành công.

### 1.3. Các trạng thái

| Trạng thái | Hiển thị |
|---|---|
| Ban đầu | Form rỗng, nút ĐĂNG KÝ bật |
| Lỗi từng trường | Xem khung "Trạng thái lỗi" bên dưới |
| Email đã có tài khoản | Banner dẫn tới Đăng nhập / Quên mật khẩu, không tạo tài khoản thứ hai `[G-08]` |
| Gửi mã thất bại (lỗi gửi email) | Banner "Không gửi được email xác minh. Vui lòng thử lại." Dữ liệu nhập được giữ nguyên |
| Đang tải | Nút bị vô hiệu, hiện "Đang gửi mã..." |

Trạng thái lỗi từng trường:

```text
+----------------------------------------------------------+
| Họ và tên *                                              |
| [ ____________________________________________________ ] |
| (!) Vui lòng nhập họ và tên                              |
|                                                          |
| Số điện thoại *                                          |
| [ 12345_______________________________________________ ] |
| (!) Số điện thoại phải có 8–15 chữ số                    |
|                                                          |
| Email *                                                  |
| [ ten@email___________________________________________ ] |
| (!) Vui lòng nhập đúng định dạng email                   |
|                                                          |
| Mật khẩu *                                               |
| [ ****_________________________________________ ] [Hiện] |
| (!) Mật khẩu phải từ 8 đến 128 ký tự                     |
|                                                          |
| Xác nhận mật khẩu *                                      |
| [ ********_____________________________________ ] [Hiện] |
| (!) Mật khẩu xác nhận không khớp                         |
+----------------------------------------------------------+
```

Email đã có tài khoản:

```text
+----------------------------------------------------------+
| (!) Email này đã được dùng cho một tài khoản. Vui lòng   |
|     Đăng nhập hoặc dùng Quên mật khẩu.                   |
|     [Đăng nhập]   [Quên mật khẩu?]                       |
+----------------------------------------------------------+
```

### 1.4. Modal M-01: Nhập mã OTP xác minh email

```text
+----------------------------------------------------------------+
| XÁC MINH EMAIL ĐĂNG KÝ                                     [X] |
+----------------------------------------------------------------+
| Mã xác minh gồm 6 chữ số đã được gửi tới email:                |
| ten@email.com                                                  |
|                                                                |
|              [ _ ] [ _ ] [ _ ] [ _ ] [ _ ] [ _ ]               |
|                                                                |
| Mã có hiệu lực 10 phút, chỉ dùng một lần.                      |
| Chưa nhận được mã?  [Gửi lại mã (còn 45s)]                     |
+----------------------------------------------------------------+
|                 [ Hủy ]          [ XÁC MINH ]                  |
+----------------------------------------------------------------+
```

| Thành phần | Quy tắc |
|---|---|
| 6 ô nhập mã | Chỉ nhận chữ số. Tự chuyển ô khi nhập, hỗ trợ dán cả mã. Khi đủ 6 số có thể tự gửi |
| Hiệu lực | Mã có hiệu lực 10 phút, chỉ dùng một lần |
| Gửi lại mã | Nút bị vô hiệu và đếm ngược 60 giây giữa hai lần gửi. Mã mới làm mã cũ hết hiệu lực |
| Nhập sai | Báo "Mã không đúng". Sai 5 lần thì mã bị vô hiệu, buộc bấm Gửi lại mã |
| Mã hết hạn/đã dùng | "Mã đã hết hạn hoặc đã được sử dụng. Vui lòng gửi lại mã." |
| Gửi quá nhiều lần | "Bạn đã yêu cầu gửi mã quá nhiều lần. Vui lòng thử lại sau." |
| Đóng modal | Hủy việc đăng ký, dữ liệu form vẫn còn để sửa |

Lỗi nhập sai mã:

```text
+----------------------------------------------------------------+
| XÁC MINH EMAIL ĐĂNG KÝ                                     [X] |
+----------------------------------------------------------------+
| Mã xác minh gồm 6 chữ số đã được gửi tới email:                |
| ten@email.com                                                  |
|                                                                |
|              [ _ ] [ _ ] [ _ ] [ _ ] [ _ ] [ _ ]               |
| (!) Mã không đúng. Vui lòng kiểm tra và nhập lại.              |
|                                                                |
| Mã có hiệu lực 10 phút, chỉ dùng một lần.                      |
| Chưa nhận được mã?  [Gửi lại mã (còn 45s)]                     |
+----------------------------------------------------------------+
|                 [ Hủy ]          [ XÁC MINH ]                  |
+----------------------------------------------------------------+
```

### 1.5. Modal thành công

```text
+----------------------------------------------------+
|                 ĐĂNG KÝ THÀNH CÔNG                 |
|                                                    |
|           Tài khoản của bạn đã được tạo.           |
|          Vui lòng đăng nhập để tiếp tục.           |
|                                                    |
|                 [ Đăng nhập ngay ]                 |
+----------------------------------------------------+
```

---

## WF-02: Đăng nhập

| Mục | Nội dung |
|---|---|
| Mã màn hình | WF-02 Đăng nhập |
| Use-case | UC-03 Đăng nhập |
| Đối tượng | Khách thành viên, Nhân viên, Quản trị viên (dùng chung một màn hình) |
| Route Codebase hiện tại | `/login` (`src/app/(auth)/login/page.tsx`) |
| Route Wireframe mục tiêu | `/login` |
| Component Codebase | `src/components/auth/LoginForm.tsx` |
| Tình trạng Codebase | Đang chạy |
| Điều hướng ra | Khách thành viên → `/courts` (hoặc `/booking`). Nhân viên → Yêu cầu đặt sân (`/admin/booking-requests`) hoặc Lịch sân. Quản trị viên → Bảng điều khiển (`/admin/dashboard`). Link "Quên mật khẩu?" → `/forgot-password`. Link "Đăng ký ngay" → `/register` |

> **Hiện trạng Codebase & Định hướng hoàn thiện tương lai:**
> - *Codebase hiện tại:* `LoginForm.tsx` mật khẩu validate `min(6)`, link Quên MK trỏ `#`. `useAuth.ts` dòng 28–33 đang redirect cả Employee lẫn Admin vào `/dashboard`.
> - *Chuẩn Wireframe tương lai:* Nâng mật khẩu lên `8–128 ký tự`. Gắn link Quên MK trỏ `/forgot-password`. Phân luồng chuyển hướng sau login theo vai trò (X-02): Employee vào trang vận hành (không vào dashboard). Hiển thị banner khóa sau 5 lần sai (BR-12).

### 2.1. Wireframe

```text
+--------------------------------------------------------------------------------------------------+
| [ShuttleVN]   Đặt sân   Tra cứu đơn                                        [Đăng nhập] [Đăng ký] |
+--------------------------------------------------------------------------------------------------+
|                                                                                                  |
|                   +----------------------------------------------------------+                   |
|                   |                        ĐĂNG NHẬP                         |                   |
|                   |                                                          |                   |
|                   | Email *                                                  |                   |
|                   | [ ten@email.com_______________________________________ ] |                   |
|                   |                                                          |                   |
|                   | Mật khẩu *                                               |                   |
|                   | [ ********_____________________________________ ] [Hiện] |                   |
|                   |                                           Quên mật khẩu? |                   |
|                   |                                                          |                   |
|                   |                      [ ĐĂNG NHẬP ]                       |                   |
|                   |                                                          |                   |
|                   |             Chưa có tài khoản? Đăng ký ngay              |                   |
|                   +----------------------------------------------------------+                   |
|                                                                                                  |
+--------------------------------------------------------------------------------------------------+
| © 2026 ShuttleVN                                                              Hotline: {Hotline} |
+--------------------------------------------------------------------------------------------------+
```

### 2.2. Chi tiết thành phần và validation

| Trường | Bắt buộc | Quy tắc | Thông báo lỗi (đề xuất) |
|---|---|---|---|
| Email | Có | Cắt khoảng trắng, không phân biệt hoa thường | Vui lòng nhập email |
| Mật khẩu | Có | Có nút Hiện/Ẩn | Vui lòng nhập mật khẩu |
| Quên mật khẩu? | – | Link sang WF-03 | – |
| ĐĂNG NHẬP | – | Đang gửi thì bị vô hiệu, hiện "Đang đăng nhập..." | – |

### 2.3. Các trạng thái

| Trạng thái | Hiển thị |
|---|---|
| Sai email hoặc mật khẩu | Banner chung "Email hoặc mật khẩu không đúng." Không cho biết email có tồn tại hay không. Không hiển thị số lần còn lại |
| Tài khoản bị khóa (`DISABLED`) | Banner khóa (xem khung bên dưới). Áp dụng khi sai mật khẩu 5 lần liên tiếp hoặc do nhân viên/quản trị khóa |
| Truy cập khu quản trị khi không có quyền | Trang "Bạn không có quyền truy cập khu vực này" (403), không lộ nội dung quản trị |
| Đã đăng nhập mà vào `/login` | Chuyển về trang đích theo vai trò |

Khóa tài khoản: sau **5 lần** đăng nhập sai liên tiếp tài khoản tự chuyển sang `DISABLED`. Đặt lại mật khẩu **không** mở khóa. Chỉ nhân viên hoặc quản trị viên mở khóa được.

Banner tài khoản bị khóa:

```text
+----------------------------------------------------------+
|                        ĐĂNG NHẬP                         |
|                                                          |
| (!) Tài khoản đã bị khóa (nhập sai mật khẩu 5 lần liên   |
|     tiếp hoặc do nhân viên khóa). Vui lòng liên hệ nhân  |
|     viên qua hotline để được mở khóa. Đặt lại mật khẩu   |
|     không mở khóa tài khoản.                             |
|     Hotline: {Hotline}                                   |
|                                                          |
| Email *                                                  |
| [ ten@email.com_______________________________________ ] |
|                                                          |
| Mật khẩu *                                               |
| [ ********_____________________________________ ] [Hiện] |
|                                                          |
|                      [ ĐĂNG NHẬP ]                       |
+----------------------------------------------------------+
```

Sai email hoặc mật khẩu:

```text
+----------------------------------------------------------+
|                        ĐĂNG NHẬP                         |
|                                                          |
| (!) Email hoặc mật khẩu không đúng.                      |
|                                                          |
| Email *                                                  |
| [ ten@email.com_______________________________________ ] |
|                                                          |
| Mật khẩu *                                               |
| [ ********_____________________________________ ] [Hiện] |
|                                                          |
|                      [ ĐĂNG NHẬP ]                       |
+----------------------------------------------------------+
```

---

## WF-03: Quên mật khẩu

| Mục | Nội dung |
|---|---|
| Mã màn hình | WF-03 Quên mật khẩu |
| Use-case | UC-04 Quên mật khẩu; UC-02 Xác minh OTP |
| Đối tượng | Khách thành viên chưa đăng nhập |
| Route Codebase hiện tại | *Chưa có route trong codebase* |
| Route Wireframe mục tiêu | `/forgot-password` |
| Component Codebase | *Chưa tạo file* |
| Tình trạng Codebase | Chưa triển khai (M-02) |
| Điều hướng ra | Hoàn tất → `/login`. Link "Quay lại đăng nhập" → `/login` |

> **Hiện trạng Codebase & Định hướng hoàn thiện tương lai:**
> - *Codebase hiện tại:* Chưa có page trong `src/app/(auth)/`, link tại form đăng nhập đang để trống (`#`).
> - *Chuẩn Wireframe tương lai:* Xây dựng trang `/forgot-password` theo quy trình 3 bước chuẩn: Nhập email -> Nhận mã OTP 6 số (Modal M-01) -> Thiết lập mật khẩu mới (8–128 ký tự).

Bố cục trang (header, footer, căn giữa) giống WF-02. Dưới đây chỉ vẽ phần thẻ ở từng bước.

### 3.1. Bước 1: Nhập email

```text
+----------------------------------------------------------+
|   (1) Email  ->  ( ) Mã xác minh  ->  ( ) Mật khẩu mới   |
|                                                          |
|                      QUÊN MẬT KHẨU                       |
| Nhập email của tài khoản. Hệ thống sẽ gửi mã xác minh 6  |
| chữ số đến email này.                                    |
|                                                          |
| Email *                                                  |
| [ ten@email.com_______________________________________ ] |
|                                                          |
|                   [ GỬI MÃ XÁC MINH ]                    |
|                                                          |
|                   < Quay lại đăng nhập                   |
+----------------------------------------------------------+
```

| Trường | Quy tắc |
|---|---|
| Email | Bắt buộc, đúng định dạng email. Lỗi: "Vui lòng nhập đúng định dạng email" |
| GỬI MÃ XÁC MINH | Luôn trả thông báo trung tính, không cho biết email có tồn tại hay không. Sau đó mở modal OTP |

### 3.2. Bước 2: Modal OTP

```text
+----------------------------------------------------------------+
| XÁC MINH EMAIL ĐẶT LẠI MẬT KHẨU                            [X] |
+----------------------------------------------------------------+
| Nếu email hợp lệ, mã xác minh gồm 6 chữ số đã được gửi tới:    |
| ten@email.com                                                  |
|                                                                |
|              [ _ ] [ _ ] [ _ ] [ _ ] [ _ ] [ _ ]               |
|                                                                |
| Mã có hiệu lực 10 phút, chỉ dùng một lần.                      |
| Chưa nhận được mã?  [Gửi lại mã (còn 45s)]                     |
+----------------------------------------------------------------+
|                 [ Hủy ]          [ XÁC MINH ]                  |
+----------------------------------------------------------------+
```

Quy tắc OTP giống mục 1.4 (6 chữ số, hiệu lực 10 phút, gửi lại sau 60 giây, sai 5 lần thì vô hiệu).

### 3.3. Bước 3: Nhập mật khẩu mới

```text
+----------------------------------------------------------+
|   ( ) Email  ->  ( ) Mã xác minh  ->  (3) Mật khẩu mới   |
|                                                          |
|                     ĐẶT MẬT KHẨU MỚI                     |
|                                                          |
| Mật khẩu mới *                                           |
| [ ********_____________________________________ ] [Hiện] |
|     8–128 ký tự                                          |
|                                                          |
| Xác nhận mật khẩu mới *                                  |
| [ ********_____________________________________ ] [Hiện] |
|                                                          |
|                   [ ĐẶT LẠI MẬT KHẨU ]                   |
+----------------------------------------------------------+
```

| Trường | Quy tắc |
|---|---|
| Mật khẩu mới | Bắt buộc, 8–128 ký tự, có nút Hiện/Ẩn |
| Xác nhận mật khẩu mới | Phải khớp. Chỉ kiểm tra ở giao diện `[G-07]` |
| Lỗi máy chủ | Phiên đặt lại hết hạn → quay lại bước 1 kèm thông báo |

### 3.4. Hoàn tất

```text
+----------------------------------------------------------+
|               ĐẶT LẠI MẬT KHẨU THÀNH CÔNG                |
|                                                          |
| Bạn có thể đăng nhập bằng mật khẩu mới. Lưu ý: đặt lại   |
| mật khẩu không mở khóa tài khoản đang bị khóa.           |
|                                                          |
|                      [ Đăng nhập ]                       |
+----------------------------------------------------------+
```

---

## WF-04: Đặt sân & Lưới sân

| Mục | Nội dung |
|---|---|
| Mã màn hình | WF-04 Đặt sân & Lưới sân |
| Use-case | UC-05 Xem danh sách sân; UC-06 Xem lưới lịch và giá; UC-07 Đặt sân (thành viên); UC-08 Đặt sân nhanh (vãng lai); UC-02 OTP |
| Đối tượng | Khách vãng lai, Khách thành viên |
| Route Codebase hiện tại | `/courts` (`src/app/(customer)/courts/page.tsx`); `/booking` là placeholder rỗng |
| Route Wireframe mục tiêu | `/booking` (hoặc `/courts`) |
| Component Codebase | `CourtsClient.tsx`, `CourtGrid.tsx`, `SlotPopup.tsx`, `WalkInBookingForm.tsx` |
| Tình trạng Codebase | Đang chạy lưới sân (`/courts`) / Placeholder rỗng (`/booking`) |
| Điều hướng ra | Thành công → modal M-05. Từ M-05: Tra cứu đơn (vãng lai) hoặc Lịch sử đặt sân (thành viên) |

> **Hiện trạng Codebase & Định hướng hoàn thiện tương lai:**
> - *Codebase hiện tại:* Lưới sân chạy trên `/courts`. `SlotPopup.tsx` chỉ có các mốc 60–180 phút, bấm nút đặt sân chỉ đóng popup (`setPopup(null)`). Form `WalkInBookingForm.tsx` đang để `guestEmail` là optional và chưa có OTP.
> - *Chuẩn Wireframe tương lai:* Thêm mốc **30 phút** vào popup (BR-20). Form đặt nhanh: Bắt buộc email (KH-11, BR-10), bấm đặt sân thì kích hoạt **Modal OTP M-01** trước khi tạo đơn (X-07). Kết nối popup sang luồng xác nhận đặt sân (M-05) thay vì chỉ đóng popup.

### 4.1. Wireframe trang

```text
+--------------------------------------------------------------------------------------------------+
| [ShuttleVN]   *Đặt sân*   Tra cứu đơn                                      [Đăng nhập] [Đăng ký] |
+--------------------------------------------------------------------------------------------------+
| ĐẶT SÂN                                                                     Cập nhật mỗi 30 giây |
| [<]  [ Thứ 6, 14/08/2026 (lịch) ]  [>]   [Hôm nay]                                               |
+--------------------------------------------------------------------------------------------------+
| [  ] Còn trống   [##] Đã đặt   [**] Đặt của bạn   [//] Đóng cửa   [..] Đã qua giờ (vô hiệu)      |
+--------------------------------------------------------------------------------------------------+
| Sân                   05:00   06:00   07:00   08:00   09:00   10:00   11:00   12:00   13:00   >> |
| Sân A1                [..][..][..][..][..][..][  ][  ][##][##][  ][  ][**][**][  ][  ][  ][  ]   |
| 6.1x13.4m · Thảm PU                                                                              |
| Sân A2                [..][..][..][..][..][..][  ][  ][  ][  ][##][##][##][##][  ][  ][  ][  ]   |
| 6.1x13.4m · Thảm PU                                                                              |
| Sân A3 [Bảo trì]      [//][//][//][//][//][//][//][//][//][//][//][//][//][//][//][//][//][//]   |
| 6.1x13.4m · Gỗ                                                                                   |
+--------------------------------------------------------------------------------------------------+
| +------------------------------------------------------+  +------------------------------------+ |
| | BẢNG ĐƠN GIÁ THEO KHUNG GIỜ (Thứ 6)                  |  | ĐẶT SÂN NHANH (Khách vãng lai)     | |
| | [*Sân A1*] [Sân A2] [Sân A3]                         |  +------------------------------------+ |
| +------------------------------------------------------+  | Họ và tên *                        | |
| | Từ giờ     Đến giờ     Đơn giá / giờ                 |  | [ ______________________________ ] | |
| | 05:00      17:00       60.000 ₫                      |  | Số điện thoại *                    | |
| | 17:00      22:00       100.000 ₫                     |  | [ ______________________________ ] | |
| |                                                      |  | Email *                            | |
| | Đơn giá áp dụng đến mốc kế tiếp hoặc giờ đóng cửa.   |  | [ ______________________________ ] | |
| +------------------------------------------------------+  | Mã đặt sân DS-XXXXX sẽ được gửi về | |
|                                                           | email sau khi xác minh mã OTP.     | |
|                                                           +------------------------------------+ |
|                                                                                      ( Chat AI ) |
+--------------------------------------------------------------------------------------------------+
| © 2026 ShuttleVN                                                              Hotline: {Hotline} |
+--------------------------------------------------------------------------------------------------+
```

Lưới trên minh họa **thời điểm hiện tại là 07:45**: các slot đến 07:30 đã qua nên bị vô hiệu. Phần lưới cuộn ngang tới giờ đóng cửa (cột đầu giữ cố định). Khung giờ 05:00–22:00 chỉ là dữ liệu mẫu, thực tế theo giờ mở cửa từng sân từng ngày `[G-04]`.

### 4.2. Chi tiết thành phần

**a) Bộ chọn ngày**

| Thành phần | Quy tắc |
|---|---|
| `[<]` `[>]` | Lùi/tiến một ngày. Không cho lùi quá ngày hôm nay |
| Ô ngày (lịch) | Không chọn được ngày quá khứ |
| Hôm nay | Quay về ngày hiện tại |
| Cập nhật | Lưới tự tải lại định kỳ (30 giây) và khi đổi ngày |

**b) Lưới sân**

| Thành phần | Quy tắc |
|---|---|
| Hàng | Mỗi hàng là một sân: tên, kích thước, mặt sân và nhãn trạng thái sân `[G-01]` `[G-13]` |
| Cột | Slot 30 phút theo giờ mở cửa của sân trong ngày. Nhãn giờ ghi ở đầu mỗi giờ |
| `[  ]` Còn trống | Bấm được → mở popup chọn thời lượng |
| `[##]` Đã đặt | Không bấm được. Có tooltip "Đã có người đặt" |
| `[**]` Đặt của bạn | Chỉ khách thành viên thấy (đơn của chính mình). Không bấm được, tooltip "Đơn của bạn" `[G-12]` |
| `[//]` Đóng cửa | Ngoài giờ mở cửa, lịch không khả dụng, hoặc sân không ở trạng thái Hoạt động. Sân Bảo trì/Đóng hiện thêm badge trên nhãn hàng |
| `[..]` Đã qua giờ | Slot có giờ bắt đầu không sau thời điểm hiện tại của máy chủ. Vô hiệu hóa |
| Chú giải | Luôn hiển thị phía trên lưới, mỗi trạng thái có ký hiệu + chữ |

**c) Bảng đơn giá theo khung giờ**

| Thành phần | Quy tắc |
|---|---|
| Tab theo sân | Chọn sân để xem bảng giá của sân đó cho thứ của ngày đang chọn |
| Cột | Từ giờ, Đến giờ, Đơn giá/giờ. "Đến giờ" là mốc kế tiếp hoặc giờ đóng cửa |

**d) Thẻ "Đặt sân nhanh (Khách vãng lai)"**

Chỉ hiển thị với khách chưa đăng nhập. Khách thành viên dùng thông tin tài khoản nên không thấy thẻ này.

| Trường | Bắt buộc | Quy tắc |
|---|---|---|
| Họ và tên | Có | Không rỗng |
| Số điện thoại | Có | 8–15 chữ số, cho phép `+` ở đầu |
| Email | Có | Đúng định dạng. Email nhận mã OTP và mã đặt sân |

Có thể bấm ô trống trước hoặc điền thẻ trước đều được. Thông tin chỉ được kiểm tra khi bấm **Đặt sân** trong popup; thiếu thì hiện lỗi tại thẻ và đưa con trỏ tới ô thiếu.

### 4.3. Các trạng thái của trang

| Trạng thái | Hiển thị |
|---|---|
| Đang tải | Skeleton lưới và bảng giá. Chọn ngày bị vô hiệu cho tới khi tải xong |
| Chưa có sân nào | "Hiện chưa có sân nào để hiển thị." |
| Tất cả sân đóng cửa ngày đó | Toàn bộ ô `[//]` + dòng "Tất cả sân đóng cửa trong ngày này." |
| Lỗi tải lưới | Banner lỗi + nút Thử lại, giữ ngày đang chọn |
| Sân đã đổi trạng thái khi đang xem | Lưới tự cập nhật ở lần tải lại kế tiếp |

### 4.4. Popup chọn thời lượng (khi bấm ô trống)

```text
+--------------------------------------------------------------------+
| ĐẶT SÂN                                                        [X] |
+--------------------------------------------------------------------+
| Sân A2 · Thứ 6, 14/08/2026                                         |
| Giờ bắt đầu: 08:00                                                 |
|                                                                    |
| Chọn thời lượng (bước 30 phút, tối thiểu 30 phút):                 |
| ( ) 30 phút     08:00 – 08:30                       30.000 ₫       |
| (o) 1 giờ       08:00 – 09:00                       60.000 ₫       |
| ( ) 1 giờ 30    08:00 – 09:30                       90.000 ₫       |
| ( ) 2 giờ       08:00 – 10:00                      120.000 ₫       |
| ( ) 2 giờ 30    08:00 – 10:30       (không chọn được: trùng lịch)  |
|                                                                    |
+--------------------------------------------------------------------+
| Tổng tiền (máy chủ tính, chưa giữ chỗ):               60.000 ₫     |
|   08:00–09:00 × 60.000 ₫/giờ                                       |
|                                                                    |
| (!) Chưa đủ thông tin liên hệ. Vui lòng điền thẻ "Đặt sân nhanh".  |
+--------------------------------------------------------------------+
| [ Hủy ]                                     [ Đặt sân · 60.000 ₫ ] |
+--------------------------------------------------------------------+
```

| Thành phần | Quy tắc |
|---|---|
| Giờ bắt đầu | Lấy từ ô vừa bấm, không sửa trong popup |
| Danh sách thời lượng | Bước 30 phút, tối thiểu 30 phút. Chỉ chọn được mức không trùng lịch, không vượt giờ đóng cửa, không qua nửa đêm. Mức không hợp lệ bị vô hiệu kèm lý do |
| Giá từng mức | Do máy chủ tính (áp theo mốc giờ của sân/ngày) |
| Tổng tiền | Cập nhật theo mức đang chọn. Khi đang chờ máy chủ: hiện skeleton, nút Đặt sân bị vô hiệu |
| Nút **Đặt sân · {Tổng tiền}** | Khách thành viên: gửi đặt ngay. Khách vãng lai: nếu thông tin liên hệ chưa đủ thì báo lỗi, đủ thì gửi mã OTP và mở modal OTP |
| Đóng (X)/Hủy | Không tạo đơn, không giữ chỗ |

**Giá thay đổi trước khi gửi.** Nếu bảng giá đổi giữa lúc xem trước và lúc gửi, hệ thống không tự đặt với giá mới mà hiển thị khối cảnh báo để khách xác nhận lại:

```text
+--------------------------------------------------------------------+
| (!) Giá đã thay đổi trước khi gửi.                                 |
|     Tổng tiền mới: 70.000 ₫ (trước đó: 60.000 ₫).                  |
|     Vui lòng kiểm tra và xác nhận lại.                             |
+--------------------------------------------------------------------+
| [ Hủy ]                            [ Xác nhận giá mới · 70.000 ₫ ] |
+--------------------------------------------------------------------+
```

**Lỗi khi gửi:**

| Tình huống | Thông báo (đề xuất) | Hành vi |
|---|---|---|
| Khung giờ vừa bị người khác đặt | "Khung giờ vừa được người khác đặt. Vui lòng chọn lại." | Đóng popup, tải lại lưới |
| Giờ đã qua / ngoài giờ mở cửa / qua nửa đêm | "Khung giờ này không còn hợp lệ." | Đóng popup, tải lại lưới |
| Sân không còn ở trạng thái Hoạt động | "Sân hiện không nhận đặt." | Đóng popup, tải lại lưới |
| Tài khoản thành viên bị khóa | Chuyển về Đăng nhập, hiện banner khóa | – |
| Lỗi máy chủ/mạng | "Không thể đặt sân lúc này. Vui lòng thử lại." | Giữ popup |

### 4.5. Modal M-01: OTP đặt nhanh (khách vãng lai)

Hiển thị tóm tắt yêu cầu đặt để khách biết mã gắn với nội dung nào. Quy tắc OTP giống mục 1.4. Khi lưu đơn thất bại (ví dụ trùng lịch), mã **không bị tiêu thụ** và khách được báo để chọn lại.

```text
+----------------------------------------------------------------+
| XÁC MINH EMAIL ĐẶT NHANH                                   [X] |
+----------------------------------------------------------------+
| Mã xác minh gồm 6 chữ số đã được gửi tới email:                |
| ten@email.com                                                  |
|                                                                |
| Đặt sân: Sân A2 · 14/08/2026 · 08:00–09:00 · 60.000 ₫          |
| (mã chỉ dùng cho yêu cầu đặt sân này)                          |
|                                                                |
|              [ _ ] [ _ ] [ _ ] [ _ ] [ _ ] [ _ ]               |
|                                                                |
| Mã có hiệu lực 10 phút, chỉ dùng một lần.                      |
| Chưa nhận được mã?  [Gửi lại mã (còn 45s)]                     |
+----------------------------------------------------------------+
|                 [ Hủy ]          [ XÁC MINH ]                  |
+----------------------------------------------------------------+
```

### 4.6. Thông báo đặt thành công `M-05`

Khách vãng lai:

```text
+--------------------------------------------------------------------+
| ĐẶT SÂN THÀNH CÔNG                                             [X] |
+--------------------------------------------------------------------+
|                                                                    |
|                         Mã đặt sân của bạn                         |
|                       DS-4D9QT   [Sao chép]                        |
|                                                                    |
| Sân A2 · 14/08/2026 · 08:00 – 09:00 · 60.000 ₫                     |
| Trạng thái: Chờ xác nhận (chưa lập hóa đơn)                        |
|                                                                    |
| Nhân viên sẽ xác nhận yêu cầu của bạn. Vui lòng lưu mã để tra cứu  |
| đơn.                                                               |
+--------------------------------------------------------------------+
| [ Tra cứu đơn ]                                           [ Đóng ] |
+--------------------------------------------------------------------+
```

Khách thành viên (nút thứ hai đổi thành Xem lịch sử đặt sân):

```text
+--------------------------------------------------------------------+
| ĐẶT SÂN THÀNH CÔNG                                             [X] |
+--------------------------------------------------------------------+
|                                                                    |
|                         Mã đặt sân của bạn                         |
|                       DS-4D9QT   [Sao chép]                        |
|                                                                    |
| Sân A2 · 14/08/2026 · 08:00 – 09:00 · 60.000 ₫                     |
| Trạng thái: Chờ xác nhận (chưa lập hóa đơn)                        |
|                                                                    |
+--------------------------------------------------------------------+
| [ Xem lịch sử đặt sân ]                                   [ Đóng ] |
+--------------------------------------------------------------------+
```

| Thành phần | Quy tắc |
|---|---|
| Mã đặt sân `DS-XXXXX` | Hiển thị nổi bật, có nút Sao chép |
| Trạng thái | Luôn là `Chờ xác nhận`, nhãn thanh toán "Chưa lập hóa đơn" |
| Lưu ý | Vui lòng lưu mã đặt sân để tra cứu đơn (WF-06) |

---

## WF-05: Lịch sử đặt sân

| Mục | Nội dung |
|---|---|
| Mã màn hình | WF-05 Lịch sử đặt sân |
| Use-case | UC-11 Xem lịch sử đặt sân; UC-09 Hủy đặt sân; UC-10 Đổi lịch đặt sân |
| Đối tượng | Khách thành viên đã đăng nhập |
| Route Codebase hiện tại | `/my-bookings` (`src/app/(customer)/my-bookings/page.tsx`) |
| Route Wireframe mục tiêu | `/my-bookings` |
| Component Codebase | `src/components/booking/BookingHistoryList.tsx`, `BookingCard.tsx` |
| Tình trạng Codebase | Đang chạy |
| Điều hướng ra | Nút "Đặt sân ngay" (khi rỗng) → `/courts` (hoặc `/booking`) |

> **Hiện trạng Codebase & Định hướng hoàn thiện tương lai:**
> - *Codebase hiện tại:* `BookingCard.tsx` vẫn còn nút "Hóa đơn" cho đơn Completed; các nút Chi tiết, Đổi lịch, Hủy đặt trong `BookingHistoryList.tsx` mới chỉ là `console.log` dạng `TODO`.
> - *Chuẩn Wireframe tương lai:* Xóa nút Hóa đơn của khách (D-13). Tách độc lập nhãn đặt sân và thanh toán: đơn Pending hiển thị nhãn thanh toán "Chưa lập hóa đơn" (D-12). Thay handler TODO bằng Modal Chi tiết (`G-09`), Modal Hủy đặt sân (`M-06`, bắt buộc lý do), Modal Đổi lịch (`M-06`).

### 5.1. Wireframe

```text
+--------------------------------------------------------------------------------------------------+
| [ShuttleVN]   Đặt sân   *Lịch sử đặt sân*   Tra cứu đơn                    (NA) Nguyễn Văn A [v] |
+--------------------------------------------------------------------------------------------------+
| LỊCH SỬ ĐẶT SÂN                                                 [ Tìm theo mã đặt sân...       ] |
| [*Tất cả*] [Chờ xác nhận] [Đã xác nhận] [Hoàn thành] [Đã hủy]                                    |
|                                                                                                  |
| (i) Hủy hoặc đổi lịch đơn chưa thanh toán: thực hiện trước giờ bắt đầu ít nhất 1 giờ.            |
|     Cần hỗ trợ thêm: liên hệ nhân viên qua hotline.                                              |
|                                                                                                  |
| +----------------------------------------------------------------------------------------------+ |
| | [Chờ xác nhận]  DS-3F7GH                                      Thanh toán: [Chưa lập hóa đơn] | |
| | Sân A2 · Thứ 7, 15/08/2026 · 18:00 – 19:30 (1 giờ 30)                                        | |
| | Tổng tiền: 150.000 ₫                                                                         | |
| | [Chi tiết]  [Đổi lịch]  [Hủy đặt]                                                            | |
| +----------------------------------------------------------------------------------------------+ |
| +----------------------------------------------------------------------------------------------+ |
| | [Đã xác nhận]  DS-6D2WM                                        Thanh toán: [Chưa thanh toán] | |
| | Sân A1 · Chủ nhật, 16/08/2026 · 08:00 – 09:00 (1 giờ)                                        | |
| | Tổng tiền: 60.000 ₫                                                                          | |
| | [Chi tiết]  [Đổi lịch]  [Hủy đặt]                                                            | |
| +----------------------------------------------------------------------------------------------+ |
| +----------------------------------------------------------------------------------------------+ |
| | [Đã xác nhận]  DS-9K4ZX                                          Thanh toán: [Đã thanh toán] | |
| | Sân A2 · Thứ 7, 15/08/2026 · 17:00 – 18:00 (1 giờ)                                           | |
| | Tổng tiền: 100.000 ₫                                                                         | |
| | (i) Đơn đã thanh toán: vui lòng liên hệ nhân viên để hủy hoặc đổi lịch.                      | |
| | [Chi tiết]                                                                                   | |
| +----------------------------------------------------------------------------------------------+ |
| +----------------------------------------------------------------------------------------------+ |
| | [Hoàn thành]  DS-4T8RN                                           Thanh toán: [Đã thanh toán] | |
| | Sân A1 · Thứ 3, 11/08/2026 · 19:00 – 20:00 (1 giờ)                                           | |
| | Tổng tiền: 100.000 ₫                                                                         | |
| | [Chi tiết]                                                                                   | |
| +----------------------------------------------------------------------------------------------+ |
| +----------------------------------------------------------------------------------------------+ |
| | [Đã hủy]  DS-8P1CE                                                           Thanh toán: [—] | |
| | Sân đã xóa #7 · Chủ nhật, 09/08/2026 · 08:00 – 09:00 (1 giờ)                                 | |
| | Tổng tiền: 60.000 ₫                                                                          | |
| | [Chi tiết]                                                                                   | |
| +----------------------------------------------------------------------------------------------+ |
|                                                                                                  |
| Hiển thị 1–20 / 36                                           [<]  1  2  [>]    Mỗi trang: [20 v] |
+--------------------------------------------------------------------------------------------------+
| © 2026 ShuttleVN                                                              Hotline: {Hotline} |
+--------------------------------------------------------------------------------------------------+
```

Năm thẻ trên minh họa năm tình huống: (1) Chờ xác nhận, được hủy/đổi; (2) Đã xác nhận chưa thanh toán, được hủy/đổi; (3) Đã xác nhận đã thanh toán, không được hủy/đổi; (4) Hoàn thành; (5) Đã hủy.

### 5.2. Chi tiết thành phần

| Thành phần | Quy tắc |
|---|---|
| Tabs lọc | Tất cả, Chờ xác nhận, Đã xác nhận, Hoàn thành, Đã hủy. Đổi tab thì về trang 1 |
| Ô tìm kiếm | Tìm theo mã đặt sân (có trong luồng người dùng, theo mockup) |
| Sắp xếp | Đơn mới nhất trước |
| Phân trang | Mặc định 20 đơn/trang. Hiển thị "Hiển thị x–y / tổng" |
| Mã đơn | Dạng `DS-XXXXX` |
| Tên sân | Sân đã xóa mềm vẫn hiện tên/mã sân đã xóa, đơn lịch sử không bị mất |
| Ngày/giờ | Ngày, giờ bắt đầu – kết thúc, thời lượng |
| Tổng tiền | Do hệ thống lưu khi đặt hoặc đổi lịch |
| Trạng thái đơn | Badge: Chờ xác nhận / Đã xác nhận / Hoàn thành / Đã hủy |
| Trạng thái thanh toán | Chờ xác nhận → **"Chưa lập hóa đơn"**. Đã xác nhận/Hoàn thành → Chưa thanh toán hoặc Đã thanh toán. Đã hủy → "—" `[G-05]` |
| Nút Chi tiết | Mở khung chi tiết đơn (mục 5.3) `[G-09]` |
| Nút Đổi lịch / Hủy đặt | Chỉ hiển thị khi **đơn chưa thanh toán** và **còn ít nhất 1 giờ trước giờ bắt đầu** (đơn Chờ xác nhận hoặc Đã xác nhận chưa thanh toán) |
| Đơn đã thanh toán | Không có nút hủy/đổi, hiện ghi chú liên hệ nhân viên |
| Đơn quá hạn 1 giờ | Không có nút hủy/đổi, hiện ghi chú "Đã quá thời hạn hủy/đổi lịch" |

Điều kiện hiển thị nút chỉ để hướng dẫn. Máy chủ kiểm tra lại khi gửi.

| Trạng thái trang | Hiển thị |
|---|---|
| Đang tải | Skeleton các thẻ đơn |
| Rỗng (chưa có đơn hoặc lọc không ra kết quả) | Khung bên dưới |
| Lỗi tải | Banner lỗi + nút Thử lại |

```text
+--------------------------------------------------------------+
|                                                              |
|                Không tìm thấy đơn đặt sân nào                |
|                                                              |
|                       [ Đặt sân ngay ]                       |
|                                                              |
+--------------------------------------------------------------+
```

### 5.3. Chi tiết đơn

Hiển thị đúng các thông tin đã có trên thẻ (mã, sân, ngày/giờ, tổng tiền, trạng thái đơn, trạng thái thanh toán) và, khi đủ điều kiện, các nút Đổi lịch / Hủy đặt.

```text
+--------------------------------------------------------------+
| CHI TIẾT ĐẶT SÂN · DS-3F7GH                              [X] |
+--------------------------------------------------------------+
| Mã đặt sân:        DS-3F7GH                                  |
| Sân:               Sân A2                                    |
| Ngày / giờ:        Thứ 7, 15/08/2026 · 18:00 – 19:30         |
| Tổng tiền:         150.000 ₫                                 |
| Trạng thái đơn:    [Chờ xác nhận]                            |
| Thanh toán:        [Chưa lập hóa đơn]                        |
+--------------------------------------------------------------+
| [ Đổi lịch ]  [ Hủy đặt ]                           [ Đóng ] |
+--------------------------------------------------------------+
```

### 5.4. Modal Xác nhận Hủy đặt sân `M-06`

Chỉ mở được khi đơn chưa thanh toán và còn ít nhất 1 giờ trước giờ bắt đầu.

```text
+--------------------------------------------------------------+
| HỦY ĐẶT SÂN?                                             [X] |
+--------------------------------------------------------------+
| Bạn sắp hủy đơn:                                             |
| DS-6D2WM · Sân A1 · 16/08/2026 · 08:00 – 09:00 · 60.000 ₫    |
|                                                              |
| Slot sẽ được giải phóng cho người khác đặt. Đơn Đã xác nhận: |
| hóa đơn Chưa thanh toán sẽ bị hủy theo. Thao tác này không   |
| thể hoàn tác.                                                |
+--------------------------------------------------------------+
| [ Giữ đặt sân ]                             [ Xác nhận hủy ] |
+--------------------------------------------------------------+
```

| Tình huống | Hành vi |
|---|---|
| Xác nhận hủy thành công | Đơn chuyển `Đã hủy`, slot được giải phóng, hóa đơn Chưa thanh toán (nếu có) bị hủy. Toast "Đã hủy đặt sân {mã đơn}" và danh sách tải lại |
| Quá hạn 1 giờ khi gửi | Modal lỗi (khung dưới) |
| Đơn đã thanh toán khi gửi | "Đơn đã thanh toán, vui lòng liên hệ nhân viên." |
| Đơn đã ở trạng thái Đã hủy | Hiển thị kết quả Đã hủy, không xử lý thêm |
| Đơn Hoàn thành | Không cho phép hủy |
| Dữ liệu đơn đã thay đổi trước khi gửi | "Đơn đã thay đổi. Vui lòng tải lại danh sách." |
| Đang xử lý | Nút Xác nhận hủy bị vô hiệu |

```text
+--------------------------------------------------------------+
| HỦY ĐẶT SÂN                                              [X] |
+--------------------------------------------------------------+
| (!) Đã quá thời hạn hủy (cần trước giờ bắt đầu 1 giờ).       |
|     Nếu có sự cố, vui lòng liên hệ nhân viên qua hotline.    |
+--------------------------------------------------------------+
|                           [ Đóng ]                           |
+--------------------------------------------------------------+
```

### 5.5. Modal Đổi lịch đặt sân

Cho chọn lại **Sân, Ngày, Giờ bắt đầu và kết thúc** mới. Hệ thống tính báo giá chênh lệch trước khi khách xác nhận.

```text
+----------------------------------------------------------------------+
| ĐỔI LỊCH ĐẶT SÂN · DS-6D2WM                                      [X] |
+----------------------------------------------------------------------+
| LỊCH HIỆN TẠI                                                        |
| Sân A1 · 16/08/2026 · 08:00 – 09:00 · 60.000 ₫                       |
+----------------------------------------------------------------------+
| LỊCH MỚI                                                             |
| Sân         [ Sân A2                      v ]                        |
| Ngày        [ 17/08/2026            (lịch)  ]                        |
| Bắt đầu     [ 18:00 v ]      Kết thúc   [ 19:30 v ]                  |
| (i) Giờ bắt đầu mới phải cách hiện tại ít nhất 1 giờ.                |
|     Giờ đã qua, ngoài giờ mở cửa, trùng lịch: bị vô hiệu.            |
+----------------------------------------------------------------------+
| BÁO GIÁ (máy chủ tính, chưa giữ chỗ)                                 |
| Tổng tiền hiện tại:                                      60.000 ₫    |
| Tổng tiền mới:                                          150.000 ₫    |
|    18:00–19:30 × 100.000 ₫/giờ                                       |
| Chênh lệch:                                             +90.000 ₫    |
|                                                                      |
| Đơn Đã xác nhận: hóa đơn Chưa thanh toán cũ sẽ bị hủy và lập hóa đơn |
| Chưa thanh toán mới theo tổng tiền mới. Đơn Chờ xác nhận vẫn Chờ xác |
| nhận, chưa lập hóa đơn.                                              |
+----------------------------------------------------------------------+
| [ Hủy ]                            [ Xác nhận đổi lịch · 150.000 ₫ ] |
+----------------------------------------------------------------------+
```

| Thành phần | Quy tắc |
|---|---|
| Sân | Chỉ liệt kê sân đang Hoạt động |
| Ngày | Không chọn ngày quá khứ |
| Bắt đầu / Kết thúc | Bước 30 phút, thời lượng tối thiểu 30 phút, trong cùng một ngày, trong giờ mở cửa, cách hiện tại ít nhất 1 giờ. Lịch của chính đơn đang đổi không bị tính là trùng |
| Báo giá | Máy chủ tính cho lịch mới. Hiển thị tổng tiền hiện tại, tổng tiền mới, chênh lệch. Nút xác nhận bị vô hiệu cho tới khi có báo giá |
| Xác nhận đổi lịch | Gửi kèm tổng tiền đã xem. Nếu giá đổi khác lúc xem thì hiện khối cảnh báo yêu cầu xác nhận lại |
| Đơn Chờ xác nhận | Vẫn Chờ xác nhận, chưa lập hóa đơn |
| Đơn Đã xác nhận chưa thanh toán | Hóa đơn cũ bị hủy, lập hóa đơn Chưa thanh toán mới theo tổng tiền mới. Không có thu/hoàn tiền một phần |
| Trùng lịch khi gửi | "Khung giờ vừa được người khác đặt. Vui lòng chọn lại." |
| Quá hạn / đã thanh toán / đơn đã đổi trạng thái | Thông báo tương tự modal Hủy |

Khối cảnh báo giá thay đổi:

```text
+----------------------------------------------------------------------+
| (!) Giá đã thay đổi trước khi lưu.                                   |
|     Tổng tiền mới: 160.000 ₫ (trước đó: 150.000 ₫).                  |
|     Vui lòng xác nhận lại.                                           |
+----------------------------------------------------------------------+
| [ Hủy ]                             [ Xác nhận giá mới · 160.000 ₫ ] |
+----------------------------------------------------------------------+
```

---

## WF-06: Tra cứu đơn đặt sân

| Mục | Nội dung |
|---|---|
| Mã màn hình | WF-06 Tra cứu đơn đặt sân |
| Use-case | Thuộc phạm vi hệ thống theo Quyết định X-03 (luồng F-KH-14) |
| Đối tượng | Khách vãng lai và khách thành viên |
| Route Codebase hiện tại | `/lookup` (`src/app/(customer)/lookup/page.tsx`) |
| Route Wireframe mục tiêu | `/lookup` |
| Component Codebase | `LookupClient.tsx`, `BookingLookupForm.tsx`, `BookingLookupResult.tsx` |
| Tình trạng Codebase | Đang chạy |
| Điều hướng ra | Đơn đã hủy → "Đặt sân mới" → `/courts` (hoặc `/booking`) |

> **Hiện trạng Codebase & Định hướng hoàn thiện tương lai:**
> - *Codebase hiện tại:* `BookingLookupForm.tsx` có các nút DEMO điền sẵn mã, ô SĐT/Email không bắt buộc.
> - *Chuẩn Wireframe tương lai:* Bắt buộc nhập CẶP Mã đơn + SĐT/Email để bảo mật thông tin (Quyết định X-03). Xóa các nút DEMO. Che bớt ký tự tên khách hàng trong kết quả tra cứu.

### 6.1. Wireframe

```text
+--------------------------------------------------------------------------------------------------+
| [ShuttleVN]   Đặt sân   *Tra cứu đơn*                                      [Đăng nhập] [Đăng ký] |
+--------------------------------------------------------------------------------------------------+
|                                                                                                  |
|              +--------------------------------------------------------------------+              |
|              |                        TRA CỨU ĐƠN ĐẶT SÂN                         |              |
|              | Nhập mã đặt sân và số điện thoại hoặc email đã dùng khi đặt sân.   |              |
|              |                                                                    |              |
|              | Mã đặt sân *                                                       |              |
|              | [ DS-12AB5______________________________________________________ ] |              |
|              |                                                                    |              |
|              | Số điện thoại hoặc Email *                                         |              |
|              | [ 0901234567____________________________________________________ ] |              |
|              |                                                                    |              |
|              |                          [ TRA CỨU ĐƠN ]                           |              |
|              +--------------------------------------------------------------------+              |
|                                                                                                  |
|              +--------------------------------------------------------------------+              |
|              | KẾT QUẢ TRA CỨU                                                    |              |
|              +--------------------------------------------------------------------+              |
|              | Tên khách:          Trần Thị B                                     |              |
|              | Mã đặt sân:         DS-12AB5                                       |              |
|              | Sân:                Sân A2                                         |              |
|              | Khung giờ:          14/08/2026 · 18:00 – 19:30                     |              |
|              | Số tiền:            150.000 ₫                                      |              |
|              | Trạng thái đơn:     [Chờ xác nhận]                                 |              |
|              | Thanh toán:         [Chưa lập hóa đơn]                             |              |
|              +--------------------------------------------------------------------+              |
|              | Cần hủy hoặc đổi lịch? Liên hệ nhân viên: Hotline {Hotline}        |              |
|              +--------------------------------------------------------------------+              |
|                                                                                                  |
+--------------------------------------------------------------------------------------------------+
| © 2026 ShuttleVN                                                              Hotline: {Hotline} |
+--------------------------------------------------------------------------------------------------+
```

### 6.2. Chi tiết thành phần và validation

| Trường | Bắt buộc | Quy tắc | Thông báo lỗi (đề xuất) |
|---|---|---|---|
| Mã đặt sân | Có | Dạng `DS-XXXXX`, không phân biệt hoa thường | Vui lòng nhập mã đặt sân |
| Số điện thoại hoặc Email | Có | Phải nhập, và phải khớp với đơn | Vui lòng nhập số điện thoại hoặc email |

**Bắt buộc nhập đủ cả hai** (mã đặt sân và SĐT/email) để bảo mật. Không tra cứu chỉ bằng mã.

| Trạng thái | Hiển thị |
|---|---|
| Tìm thấy | Thẻ kết quả: Tên khách, Mã đặt sân, Sân, Khung giờ, Số tiền, Trạng thái đơn, Trạng thái thanh toán (đơn Chờ xác nhận là "Chưa lập hóa đơn") |
| Không khớp hoặc không có đơn | Cùng một thông báo cho mọi trường hợp sai, không tiết lộ thông tin đơn khác (khung dưới) |
| Đang tra cứu | Nút bị vô hiệu, "Đang tra cứu..." |
| Đơn đã hủy | Thẻ kết quả kèm nút "Đặt sân mới" |
| Lỗi mạng | Banner lỗi + Thử lại |

Trang tra cứu **chỉ xem**, không có nút hủy/đổi lịch/thanh toán. Cần thay đổi thì liên hệ nhân viên.

```text
+--------------------------------------------------------------------+
| (!) Không tìm thấy đơn đặt sân phù hợp.                            |
|     Vui lòng kiểm tra lại mã đặt sân và số điện thoại/email.       |
+--------------------------------------------------------------------+
```

```text
+--------------------------------------------------------------------+
| KẾT QUẢ TRA CỨU                                                    |
+--------------------------------------------------------------------+
| Mã đặt sân: DS-2B6NV    Trạng thái đơn: [Đã hủy]                   |
| (các dòng tóm tắt như trên)                                        |
|                                                                    |
| Đơn này đã hủy.  [ Đặt sân mới ]                                   |
+--------------------------------------------------------------------+
```

---

## WF-07: Hồ sơ cá nhân

| Mục | Nội dung |
|---|---|
| Mã màn hình | WF-07 Hồ sơ cá nhân |
| Use-case | UC-12 Xem và cập nhật hồ sơ cá nhân |
| Đối tượng | Khách thành viên đã đăng nhập |
| Route Codebase hiện tại | `/profile` (`src/app/(customer)/profile/page.tsx`) |
| Route Wireframe mục tiêu | `/profile` |
| Component Codebase | `ProfileClient.tsx`, `ProfileInfoForm.tsx`, `ProfileSidebar.tsx`, `ChangePasswordForm.tsx` |
| Tình trạng Codebase | Đang chạy |
| Điều hướng ra | Avatar menu |

> **Hiện trạng Codebase & Định hướng hoàn thiện tương lai:**
> - *Codebase hiện tại:* `ProfileSidebar.tsx` đang có chức năng đổi avatar và 4 thẻ thống kê cá nhân (ngoài SRS/UC); `ProfileInfoForm.tsx` email đã disable, phone regex đang là 10 số (`^0\d{9}$`).
> - *Chuẩn Wireframe tương lai:* Chuẩn hóa regex SĐT thành 8–15 chữ số (BR-26). Giữ email disabled (BR-18). Giữ UI avatar và thẻ thống kê ở client nếu cần; tuyệt đối không đưa quản lý phiên/thiết bị vào giao diện (X-04).

### 7.1. Wireframe: tab Thông tin (chế độ xem)

```text
+--------------------------------------------------------------------------------------------------+
| [ShuttleVN]   Đặt sân   Lịch sử đặt sân   Tra cứu đơn                      (NA) Nguyễn Văn A [v] |
+--------------------------------------------------------------------------------------------------+
| HỒ SƠ CÁ NHÂN                                                                                    |
|                                                                                                  |
|             +----------------------------------------------------------------------+             |
|             | [*Thông tin*]  [Đổi mật khẩu]                                        |             |
|             +----------------------------------------------------------------------+             |
|             | Họ và tên          Nguyễn Văn A                                      |             |
|             | Số điện thoại      0901234567                                        |             |
|             | Email              ten@email.com   (khóa) Dùng để đăng nhập          |             |
|             |                                                                      |             |
|             |                                                        [ Chỉnh sửa ] |             |
|             +----------------------------------------------------------------------+             |
|                                                                                                  |
+--------------------------------------------------------------------------------------------------+
| © 2026 ShuttleVN                                                              Hotline: {Hotline} |
+--------------------------------------------------------------------------------------------------+
```

### 7.2. Chế độ chỉnh sửa

```text
+----------------------------------------------------------------------+
| [*Thông tin*]  [Đổi mật khẩu]                                        |
+----------------------------------------------------------------------+
| Họ và tên *                                                          |
| [ Nguyễn Văn A____________________________________________________ ] |
|                                                                      |
| Số điện thoại *                                                      |
| [ 0901234567______________________________________________________ ] |
|     8–15 chữ số, có thể bắt đầu bằng +                               |
|                                                                      |
| Email                                                                |
| [ ten@email.com_______________________________ ] (khóa, chỉ đọc)     |
|     Dùng để đăng nhập, không thể thay đổi                            |
|                                                                      |
| [ Hủy ]                                             [ Lưu thay đổi ] |
+----------------------------------------------------------------------+
```

| Trường | Sửa được | Quy tắc | Thông báo lỗi (đề xuất) |
|---|---|---|---|
| Họ và tên | Có | Không rỗng, cắt khoảng trắng | Họ tên không được để trống |
| Số điện thoại | Có | 8–15 chữ số, cho phép `+` ở đầu | Số điện thoại không hợp lệ |
| Email | **Không** | Chỉ đọc, nhãn "Dùng để đăng nhập". Không có đường đổi email trực tiếp | – |

| Trạng thái | Hiển thị |
|---|---|
| Đang tải | Skeleton các dòng thông tin |
| Lưu thành công | Toast "Đã cập nhật hồ sơ", quay về chế độ xem |
| Lỗi từng trường | Khung dưới. Thông tin cũ vẫn được giữ cho tới khi lưu thành công |
| Bấm Hủy | Bỏ thay đổi, quay về chế độ xem |

```text
+----------------------------------------------------------------------+
| [*Thông tin*]  [Đổi mật khẩu]                                        |
+----------------------------------------------------------------------+
| Họ và tên *                                                          |
| [ ________________________________________________________________ ] |
| (!) Họ tên không được để trống                                       |
|                                                                      |
| Số điện thoại *                                                      |
| [ 123_____________________________________________________________ ] |
| (!) Số điện thoại không hợp lệ                                       |
|                                                                      |
| [ Hủy ]                                             [ Lưu thay đổi ] |
+----------------------------------------------------------------------+
```

### 7.3. Tab Đổi mật khẩu

SRS 1.7 và UC 1.5 chưa có use-case riêng cho chức năng này. Theo quyết định đã chốt (O-06), tab được giữ trong thiết kế và **tạm ẩn** cho tới khi có backend `[G-02]`. Trong thời gian đó khách dùng Quên mật khẩu (WF-03).

```text
+----------------------------------------------------------------------+
| [Thông tin]  [*Đổi mật khẩu*]    <<< TẠM ẨN (xem ghi chú O-06) >>>   |
+----------------------------------------------------------------------+
| Mật khẩu hiện tại *                                                  |
| [ ********_________________________________________________ ] [Hiện] |
|                                                                      |
| Mật khẩu mới *                                                       |
| [ ********_________________________________________________ ] [Hiện] |
|     8–128 ký tự                                                      |
|                                                                      |
| Xác nhận mật khẩu mới *                                              |
| [ ********_________________________________________________ ] [Hiện] |
|                                                                      |
| [ Hủy ]                                             [ Đổi mật khẩu ] |
+----------------------------------------------------------------------+
```

| Trường | Quy tắc |
|---|---|
| Mật khẩu hiện tại | Bắt buộc. Sai thì báo "Mật khẩu hiện tại không đúng" |
| Mật khẩu mới | Bắt buộc, 8–128 ký tự |
| Xác nhận mật khẩu mới | Phải khớp mật khẩu mới (chỉ kiểm tra ở giao diện) |

Theo phạm vi đã loại bỏ, hồ sơ **không** có tab quản lý thiết bị/phiên đăng nhập và **không** có nút tự vô hiệu hóa tài khoản.

---

## WF-08: Widget Trợ lý AI

| Mục | Nội dung |
|---|---|
| Mã màn hình | WF-08 Widget Trợ lý AI |
| Use-case | UC-13 Trò chuyện với trợ lý AI |
| Đối tượng | Khách vãng lai và khách thành viên (không cần đăng nhập) |
| Route Codebase hiện tại | API backend: `src/app/api/chat/route.ts` |
| Route Wireframe mục tiêu | *(Widget nổi trên các trang Cổng Khách hàng)* |
| Component Codebase | `src/components/chatbot/ChatWidget.tsx` (cần tạo mới) |
| Tình trạng Codebase | Backend API đã có / Chưa có UI Widget |
| Điều hướng ra | – |

> **Hiện trạng Codebase & Định hướng hoàn thiện tương lai:**
> - *Codebase hiện tại:* Backend API route `/api/chat` đã hoàn thiện tích hợp Anthropic Claude SDK; giao diện frontend chưa có widget nổi.
> - *Chuẩn Wireframe tương lai:* Xây dựng component `ChatWidget.tsx` hiển thị nút tròn nổi góc dưới phải trên các trang Cổng Khách hàng (ẩn ở Cổng Quản trị theo G-11).

### 8.1. Wireframe (khung chat mở ở góc dưới phải)

```text
                                                  +--------------------------------------------+
                                                  | Trợ lý AI ShuttleVN                [_] [X] |
                                                  +--------------------------------------------+
                                                  | (i) AI chỉ tư vấn thông tin công khai.     |
                                                  |     AI KHÔNG thể đặt, hủy, đổi sân,        |
                                                  |     thu tiền hay xem dữ liệu cá nhân.      |
                                                  +--------------------------------------------+
                                                  | AI: Xin chào! Tôi có thể hướng dẫn đặt     |
                                                  |     sân, tư vấn giá và gợi ý giờ trống.    |
                                                  |                                            |
                                                  |           Bạn: Giá sân buổi tối bao nhiêu? |
                                                  |                                            |
                                                  | AI: Sau 17:00 giá là 100.000 ₫/giờ.        |
                                                  |     (Giá tham khảo, kiểm tra lại khi đặt)  |
                                                  |                                            |
                                                  | AI: Tôi chưa có thông tin phù hợp. Vui     |
                                                  |     lòng liên hệ nhân viên: {Hotline}      |
                                                  |                                            |
                                                  | [Hướng dẫn đặt sân] [Giá theo giờ]         |
                                                  | [Gợi ý giờ còn trống] [Hotline]            |
                                                  +--------------------------------------------+
                                                  | [ Nhập câu hỏi...               ] [Gửi >]  |
                                                  +--------------------------------------------+
                                                                                     ( Chat AI )
```

### 8.2. Chi tiết thành phần

| Thành phần | Quy tắc |
|---|---|
| Nút chat nổi | Góc dưới phải. Bấm để mở/đóng khung chat |
| Khung chat | Tiêu đề, nút thu nhỏ, nút đóng, vùng tin nhắn, ô nhập, nút Gửi |
| Cảnh báo cố định | Luôn hiện đầu khung: AI chỉ tư vấn thông tin công khai, **không có quyền** đặt, hủy, đổi sân, thu tiền hoặc xem dữ liệu cá nhân |
| Gợi ý nhanh | Hướng dẫn đặt sân, Giá theo giờ, Gợi ý giờ còn trống, Hotline |
| Nội dung trả lời | Giải đáp câu hỏi thường gặp, hướng dẫn đặt sân, gợi ý giờ/giá công khai. Giá và chỗ trống chỉ mang tính tham khảo, được kiểm tra lại khi đặt |
| Ô nhập | Không gửi tin rỗng. Giới hạn độ dài chưa được quy định `[G-11]` |

| Trạng thái | Hiển thị |
|---|---|
| AI đang trả lời | Hiệu ứng "đang soạn" và Gửi bị vô hiệu |
| Không có thông tin phù hợp | AI báo chưa có thông tin và hướng dẫn liên hệ nhân viên qua hotline |
| Yêu cầu thao tác nghiệp vụ (hủy đơn, thu tiền...) | AI từ chối, chỉ hướng dẫn cách tự làm trên hệ thống hoặc liên hệ nhân viên |
| Lỗi/hết thời gian chờ | Tin nhắn lỗi "Trợ lý tạm thời không phản hồi. Vui lòng thử lại." + nút Thử lại |
| Thu nhỏ | Khung thu gọn lại thành nút chat nổi |

---

---


# KHU VỰC 2: CỔNG QUẢN TRỊ & NHÂN VIÊN (WF-09 đến WF-19)

## Thành phần chung của Cổng Quản trị & Nhân viên

Bố cục chung: **Sidebar cố định bên trái + Topbar (tên người dùng, vai trò, nút Đăng xuất) + Vùng làm việc chính.** Ở các wireframe bên dưới, cột trái là Sidebar, phần bên phải là vùng làm việc.

Khung của **Quản trị viên** (đủ 10 mục menu):

```text
+----------------------------------------------------------------------------------------------------------------------+
| ShuttleVN · Khu quản trị                                                   Nguyễn Thị C · Quản trị viên  [Đăng xuất] |
+----------------------------------------------------------------------------------------------------------------------+
| MENU                     | (vùng làm việc chính)                                                                     |
|                          |                                                                                           |
| > Bảng điều khiển        | Tiêu đề trang + bộ lọc                                                                    |
|   Lịch sân               | Bảng / lưới dữ liệu                                                                       |
|   Yêu cầu đặt sân        | Nút hành động và badge trạng thái                                                         |
|   Thanh toán             |                                                                                           |
|   Quản lý sân            |                                                                                           |
|   Khách hàng             |                                                                                           |
|   Quản lý nhân viên      |                                                                                           |
|   Báo cáo & Thống kê     |                                                                                           |
|   Nhật ký hoạt động      |                                                                                           |
|   Tài khoản & Phân quyền |                                                                                           |
+----------------------------------------------------------------------------------------------------------------------+
```

Khung của **Nhân viên** (chỉ 4 mục menu):

```text
+----------------------------------------------------------------------------------------------------------------------+
| ShuttleVN · Khu quản trị                                                         Trần Văn B · Nhân viên  [Đăng xuất] |
+----------------------------------------------------------------------------------------------------------------------+
| MENU                     | (vùng làm việc chính)                                                                     |
|                          |                                                                                           |
|   Lịch sân               | Tiêu đề trang + bộ lọc                                                                    |
| > Yêu cầu đặt sân        | Bảng / lưới dữ liệu                                                                       |
|   Thanh toán             | Nút hành động và badge trạng thái                                                         |
|   Khách hàng             |                                                                                           |
+----------------------------------------------------------------------------------------------------------------------+
```

| Vai trò | Menu hiển thị |
|---|---|
| Nhân viên | Lịch sân, Yêu cầu đặt sân, Thanh toán, Khách hàng |
| Quản trị viên | Bảng điều khiển, Lịch sân, Yêu cầu đặt sân, Thanh toán, Quản lý sân, Khách hàng, Quản lý nhân viên, Báo cáo & Thống kê, Nhật ký hoạt động, Tài khoản & Phân quyền |

Quản trị viên **kế thừa toàn bộ quyền của Nhân viên**: mọi màn hình WF-10 đến WF-14 dùng chung, vai trò Quản trị viên chỉ thêm các màn hình WF-09 và WF-15 đến WF-19.

### Quy tắc chung

Các dòng về chống gửi lặp, toast, loading và lỗi mạng là quy ước giao diện đề xuất. Các dòng còn lại bám SRS/UC.

| Chủ đề | Quy tắc |
|---|---|
| Phân quyền | Ẩn menu theo vai trò chỉ để hướng dẫn. Máy chủ kiểm tra quyền ở mọi thao tác. Nhân viên mở trực tiếp URL của màn hình Quản trị viên sẽ thấy trang "Bạn không có quyền truy cập khu vực này" |
| Trang đích sau đăng nhập | Quản trị viên → Bảng điều khiển. Nhân viên → Yêu cầu đặt sân (đã chốt) |
| Topbar | Tên người dùng, vai trò, nút Đăng xuất `[G-15]` |
| Giờ | Hiển thị theo giờ Việt Nam. Ngày sử dụng và mốc chuyển ngày theo UTC+7 |
| Nhãn trạng thái đặt sân | Chờ xác nhận / Đã xác nhận / Hoàn thành / Đã hủy. Mọi trường hợp hủy (từ chối, khách hủy, sự cố, chốt ngày) đều hiển thị **Đã hủy**, không dùng "Đã từ chối" |
| Nhãn hóa đơn | Chưa thanh toán / Đã thanh toán / Đã hủy. Đơn Chờ xác nhận hiển thị "Chưa lập hóa đơn" |
| Nhãn tài khoản | `ACTIVE` (Hoạt động) / `DISABLED` (Bị khóa). Khóa và vô hiệu hóa là cùng một trạng thái |
| Nhãn sân | Hoạt động / Bảo trì / Đóng |
| Phân trang | Mặc định 20 dòng/trang, tối đa 100/trang |
| Bộ lọc ngày | "Từ ngày" và "Đến ngày" tính gồm cả hai ngày. Từ ngày lớn hơn Đến ngày: báo lỗi, không tải dữ liệu |
| Chống gửi lặp | Khi bấm gửi, nút bị vô hiệu và hiện "Đang xử lý...". Gửi lặp cùng nội dung trả kết quả đã có, không tạo thêm bản ghi |
| Dữ liệu đã thay đổi | Banner "Dữ liệu đã thay đổi. Vui lòng tải lại." + nút Tải lại. Giao diện không báo thành công một phần |
| Đơn quá ngày sử dụng chưa chốt | Máy chủ chốt đơn trước khi xử lý thao tác. Giao diện hiển thị trạng thái mới và báo "Đơn đã được hệ thống chốt theo ngày sử dụng" |
| Email cho khách | Sau khi tạo/xác nhận/từ chối/hủy/đổi lịch/hoàn thành thành công, hệ thống gửi email cho khách. Lỗi gửi email không làm mất kết quả, hệ thống ghi lỗi và gửi lại |
| Toast, loading, lỗi mạng | Giống Cổng Khách hàng (mục 0.2) |

---

## WF-09: Bảng điều khiển

| Mục | Nội dung |
|---|---|
| Mã màn hình | WF-09 Bảng điều khiển (Dashboard) |
| Use-case | Màn hình đích của Quản trị viên (Quyết định X-02, G-14) |
| Đối tượng | Quản trị viên |
| Route Codebase hiện tại | `/dashboard` (`src/app/(admin)/dashboard/page.tsx`) |
| Route Wireframe mục tiêu | `/admin/dashboard` |
| Component Codebase | `DashboardClient.tsx`, `DashboardStats.tsx`, `RevenueChart.tsx` |
| Tình trạng Codebase | Đang chạy |
| Điều hướng ra | "Chi tiết" → WF-11. "Xem yêu cầu đặt sân" → WF-10 |

> **Hiện trạng Codebase & Định hướng hoàn thiện tương lai:**
> - *Codebase hiện tại:* `DashboardStats.tsx` đang hiển thị 4 thẻ (gồm Tỷ lệ lấp đầy); `DashboardClient.tsx` có `RevenueChart` và bảng gần đây.
> - *Chuẩn Wireframe tương lai:* Loại bỏ thẻ "Tỷ lệ lấp đầy" theo Quyết định X-04. Giữ 3 chỉ số chính: Doanh thu hôm nay, Đơn hoàn thành hôm nay, Đơn chờ xác nhận, và danh sách đơn cần xử lý gấp (Chờ xác nhận có giờ chơi gần nhất).

### 9.1. Wireframe

```text
+----------------------------------------------------------------------------------------------------------------------+
| ShuttleVN · Khu quản trị                                                   Nguyễn Thị C · Quản trị viên  [Đăng xuất] |
+----------------------------------------------------------------------------------------------------------------------+
| MENU                     | BẢNG ĐIỀU KHIỂN                                                Hôm nay: Thứ 6, 14/08/2026 |
|                          |                                                                                           |
| > Bảng điều khiển        | +---------------------------+ +---------------------------+ +---------------------------+ |
|   Lịch sân               | | Doanh thu hôm nay         | | Đơn chờ duyệt             | | Lượt sân đặt trong ngày   | |
|   Yêu cầu đặt sân        | | 1.250.000 ₫               | | 3                         | | 18                        | |
|   Thanh toán             | | HĐ Đã thanh toán có thời  | | [Xem yêu cầu đặt sân >]   | | Ngày sử dụng hôm nay,     | |
|   Quản lý sân            | | điểm thu là hôm nay       | |                           | | không tính đơn Đã hủy     | |
|   Khách hàng             | +---------------------------+ +---------------------------+ +---------------------------+ |
|   Quản lý nhân viên      |                                                                                           |
|   Báo cáo & Thống kê     | ĐƠN CẦN XỬ LÝ GẤP (Chờ xác nhận, giờ chơi gần nhất trước)                                 |
|   Nhật ký hoạt động      |                                                                                           |
|   Tài khoản & Phân quyền | Mã đơn    Khách           Sân    Giờ chơi           Tổng tiền    Thao tác                 |
|                          | --------  --------------  -----  -----------------  -----------  -----------              |
|                          | DS-5N7XA  Hoàng Văn E     A1     14/08 17:00-18:00  100.000 ₫    [Chi tiết]               |
|                          | DS-12AB5  Trần Thị B      A2     14/08 18:00-19:30  150.000 ₫    [Chi tiết]               |
|                          | DS-8H4KM  Lê Văn C        A1     14/08 19:30-20:30  100.000 ₫    [Chi tiết]               |
|                          |                                                                                           |
|                          | [Xem tất cả yêu cầu chờ xác nhận >]                                                       |
+----------------------------------------------------------------------------------------------------------------------+
```

### 9.2. Chi tiết thành phần

| Thành phần | Quy tắc |
|---|---|
| Doanh thu hôm nay | Tổng tiền các hóa đơn hợp lệ **Đã thanh toán** có thời điểm thu trong ngày hôm nay. Không cộng hóa đơn Đã hủy |
| Đơn chờ duyệt | Số đơn đang Chờ xác nhận. Bấm để sang WF-10 |
| Lượt sân đặt trong ngày | Số lượt đặt có ngày sử dụng là hôm nay, không tính Đã hủy |
| Đơn cần xử lý gấp | Danh sách đơn Chờ xác nhận, giờ chơi gần nhất xếp trước. Tiêu chí "gấp" là đề xuất `[G-14]` |
| Nút Chi tiết | Mở WF-11 |

Không có biểu đồ, chỉ số "Tỷ lệ lấp đầy", chuông thông báo hay nút xuất báo cáo (đã loại hoặc chưa quyết định).

| Trạng thái | Hiển thị |
|---|---|
| Đang tải | Skeleton ba thẻ số liệu và bảng |
| Không có đơn cần xử lý | "Không có yêu cầu nào đang chờ xác nhận." |
| Lỗi tải | Banner lỗi + Thử lại. Mỗi thẻ có thể lỗi độc lập |

---

## WF-10: Tiếp nhận Yêu cầu đặt sân

| Mục | Nội dung |
|---|---|
| Mã màn hình | WF-10 Tiếp nhận yêu cầu đặt sân |
| Use-case | UC-14 Xem yêu cầu chờ xác nhận; UC-15 Xác nhận đặt sân (include UC-17); UC-16 Từ chối đặt sân |
| Đối tượng | Nhân viên, Quản trị viên |
| Route Codebase hiện tại | *Chưa có route trong codebase* (US-11) |
| Route Wireframe mục tiêu | `/admin/booking-requests` |
| Component Codebase | *Chưa tạo file* |
| Tình trạng Codebase | Chưa triển khai (thuộc US-11 đang phát triển) |
| Điều hướng ra | Chi tiết → WF-11 (`/admin/bookings/[id]`) |

> **Hiện trạng Codebase & Định hướng hoàn thiện tương lai:**
> - *Codebase hiện tại:* Chưa có route độc lập trong `src/app/(admin)/`.
> - *Chuẩn Wireframe tương lai:* Xây dựng trang `/admin/booking-requests` với bảng danh sách đơn Chờ xác nhận (`Pending`) sắp xếp cũ nhất trước (NV-03), hiển thị tổng tiền, thời điểm tạo, kèm nút Chi tiết, Xác nhận, Từ chối.

### 10.1. Wireframe

```text
+----------------------------------------------------------------------------------------------------------------------+
| ShuttleVN · Khu quản trị                                                         Trần Văn B · Nhân viên  [Đăng xuất] |
+----------------------------------------------------------------------------------------------------------------------+
| MENU                     | YÊU CẦU ĐẶT SÂN (CHỜ XÁC NHẬN)                                              Cũ nhất trước |
|                          |                                                                                           |
|   Lịch sân               | Mã đơn    Gửi lúc      Khách         SĐT         Sân   Khung giờ          Tổng tiền       |
| > Yêu cầu đặt sân        | --------  -----------  ------------  ----------  ----  -----------------  ----------      |
|   Thanh toán             | DS-5N7XA  14/08 06:10  Hoàng Văn E   0912345678  A1    14/08 17:00-18:00  100.000 ₫       |
|   Khách hàng             |      [Xem chi tiết]  [Xác nhận]  [Từ chối]                                                |
|                          | DS-12AB5  14/08 06:42  Trần Thị B    0901234567  A2    14/08 18:00-19:30  150.000 ₫       |
|                          |      [Xem chi tiết]  [Xác nhận]  [Từ chối]                                                |
|                          | DS-8H4KM  14/08 07:15  Lê Văn C      0987654321  A1    14/08 19:30-20:30  100.000 ₫       |
|                          |      [Xem chi tiết]  [Xác nhận]  [Từ chối]                                                |
|                          |                                                                                           |
|                          | Hiển thị 1–3 / 3 yêu cầu                                 [<]  1  [>]    Mỗi trang: [20 v] |
+----------------------------------------------------------------------------------------------------------------------+
```

### 10.2. Chi tiết thành phần

| Thành phần | Quy tắc |
|---|---|
| Phạm vi danh sách | Chỉ đơn **Chờ xác nhận** |
| Sắp xếp | Yêu cầu cũ nhất (gửi sớm nhất) xếp trước |
| Cột | Mã đơn, Gửi lúc, Khách, SĐT, Sân, Khung giờ, Tổng tiền |
| Phân trang | Mặc định 20 dòng/trang |
| Quản trị viên | Thấy thêm tab "Tất cả đặt sân" (WF-17). Nhân viên không thấy tab này |
| **Xem chi tiết** | Mở WF-11 |
| **Xác nhận** | Mở modal Xác nhận (D-06, mục 11.3) |
| **Từ chối** | Mở modal Từ chối (D-05, mục 11.4) |

| Trạng thái | Hiển thị |
|---|---|
| Đang tải | Skeleton các dòng |
| Rỗng | "Không có yêu cầu nào đang chờ xác nhận." |
| Đơn vừa được người khác xử lý | Khi bấm Xác nhận/Từ chối trên đơn đã đổi trạng thái: báo "Đơn đã thay đổi" và tải lại. Xác nhận lặp trên đơn đã xác nhận trả kết quả hiện có, không tạo thêm hóa đơn |

Modal Xác nhận và Từ chối dùng chung với WF-11, xem mục 11.3 và 11.4.

---

## WF-11: Chi tiết đặt sân & Xử lý đơn

| Mục | Nội dung |
|---|---|
| Mã màn hình | WF-11 Chi tiết đặt sân & Xử lý đơn |
| Use-case | UC-15, UC-16, UC-18 Ghi nhận lượt sử dụng, UC-21 Hủy do sự cố, UC-09/UC-10 hủy/đổi lịch thay khách |
| Đối tượng | Nhân viên, Quản trị viên |
| Route Codebase hiện tại | *Chưa có route trong codebase* (US-12) |
| Route Wireframe mục tiêu | `/admin/bookings/[id]` |
| Component Codebase | *Chưa tạo file* |
| Tình trạng Codebase | Chưa triển khai (thuộc US-12 đang phát triển) |
| Điều hướng ra | Breadcrumb "Yêu cầu đặt sân" quay lại WF-10 |

> **Hiện trạng Codebase & Định hướng hoàn thiện tương lai:**
> - *Codebase hiện tại:* Chưa có trang chi tiết admin độc lập trong `src/app/(admin)/`.
> - *Chuẩn Wireframe tương lai:* Xây dựng trang `/admin/bookings/[id]` hiển thị thông tin đơn, thông tin hóa đơn ("Chưa lập hóa đơn" nếu đơn Pending), timeline lịch sử trạng thái kèm lý do (BR-13), và các modal nghiệp vụ (Xác nhận đơn, Từ chối, Hoàn thành, Hủy sự cố, Đổi lịch).

### 11.1. Wireframe trang

Minh họa đơn `Đã xác nhận`, hóa đơn `Chưa thanh toán`.

```text
+----------------------------------------------------------------------------------------------------------------------+
| ShuttleVN · Khu quản trị                                                         Trần Văn B · Nhân viên  [Đăng xuất] |
+----------------------------------------------------------------------------------------------------------------------+
| MENU                     | < Yêu cầu đặt sân  /  DS-7K3QP                                                            |
|                          | DS-7K3QP  [Đã xác nhận]                                          Tạo lúc 13/08/2026 20:10 |
|   Lịch sân               | [Đổi lịch]  [Hủy theo yêu cầu khách]  [Ghi nhận hoàn thành]  [Hủy do sự cố]               |
| > Yêu cầu đặt sân        | (i) "Ghi nhận hoàn thành" vô hiệu cho tới khi lượt chơi kết thúc (19:00).                 |
|   Thanh toán             |                                                                                           |
|   Khách hàng             | +------------------------------------------+  +-----------------------------------------+ |
|                          | | THÔNG TIN ĐẶT SÂN                        |  | KHÁCH HÀNG                              | |
|                          | | Sân:         Sân A1                      |  | Họ tên:  Lê Văn C                       | |
|                          | | Ngày:        14/08/2026                  |  | Loại:    Thành viên                     | |
|                          | | Khung giờ:   18:00 – 19:00               |  | SĐT:     0987654321                     | |
|                          | | Thời lượng:  1 giờ                       |  | Email:   le.c@email.com                 | |
|                          | | Tổng tiền:   100.000 ₫                   |  |                                         | |
|                          | | Mốc giá:     18:00–19:00 × 100.000 ₫/giờ |  |                                         | |
|                          | +------------------------------------------+  +-----------------------------------------+ |
|                          |                                                                                           |
|                          | +---------------------------------------------------------------------------------------+ |
|                          | | HÓA ĐƠN                                                                               | |
|                          | | Mã HĐ: HD-20260814-002      Trạng thái: [Chưa thanh toán]      Tổng tiền: 100.000 ₫   | |
|                          | | Phương thức: —      Thời điểm thu: —      Nhân viên xác nhận: —                       | |
|                          | | [Xác nhận đã thu]                                                                     | |
|                          | +---------------------------------------------------------------------------------------+ |
|                          |                                                                                           |
|                          | +---------------------------------------------------------------------------------------+ |
|                          | | LỊCH SỬ TRẠNG THÁI                                                                    | |
|                          | | Thời điểm     Chuyển trạng thái               Tác nhân                  Lý do         | |
|                          | | ------------  ------------------------------  ------------------------  ------------- | |
|                          | | 13/08 20:10   (mới) -> Chờ xác nhận           Khách hàng                —             | |
|                          | | 14/08 07:20   Chờ xác nhận -> Đã xác nhận     Nhân viên · Trần Văn B    —             | |
|                          | +---------------------------------------------------------------------------------------+ |
+----------------------------------------------------------------------------------------------------------------------+
```

### 11.2. Chi tiết thành phần

| Khối | Nội dung |
|---|---|
| Tiêu đề | Mã đặt sân, badge trạng thái, thời điểm tạo |
| Thông tin đặt sân | Sân, ngày, khung giờ, thời lượng, tổng tiền, các mốc giá đã áp dụng (giá lưu lúc đặt, không tính lại theo bảng giá hiện tại) |
| Khách hàng | Họ tên, loại (Thành viên/Vãng lai), SĐT, email |
| Hóa đơn | Mã `HD-yyyyMMdd-seq`, trạng thái, tổng tiền, phương thức, thời điểm thu, nhân viên xác nhận. Đơn Chờ xác nhận hiện "Chưa lập hóa đơn". Hóa đơn Chưa thanh toán: để trống phương thức và thời điểm thu. **Không có nút Lập hóa đơn thủ công** |
| Lịch sử trạng thái | Dòng thời gian: thời điểm, trạng thái cũ → mới, tác nhân (Khách hàng / Nhân viên / Hệ thống), người thực hiện, lý do |

**Nút thao tác theo trạng thái đơn.** Nút không áp dụng cho trạng thái hiện tại thì ẩn. Nút bị chặn bởi điều kiện thời gian thì vô hiệu kèm tooltip giải thích. Máy chủ kiểm tra lại khi gửi.

| Trạng thái đơn | Nút hiển thị |
|---|---|
| Chờ xác nhận | **Xác nhận**, **Từ chối** (khi chưa đến giờ bắt đầu); **Đổi lịch**, **Hủy theo yêu cầu khách** (khi còn ít nhất 1 giờ trước giờ bắt đầu); **Ghi nhận hoàn thành** (khi lượt chơi đã kết thúc); **Hủy do sự cố** |
| Đã xác nhận | **Đổi lịch**, **Hủy theo yêu cầu khách** (còn ít nhất 1 giờ); **Ghi nhận hoàn thành** (khi lượt chơi đã kết thúc); **Hủy do sự cố**. Thẻ Hóa đơn có **Xác nhận đã thu** khi hóa đơn Chưa thanh toán `[G-28]` |
| Hoàn thành | Không có nút đổi trạng thái. Thẻ Hóa đơn vẫn có **Xác nhận đã thu** nếu còn Chưa thanh toán |
| Đã hủy | Chỉ xem, không có nút thao tác |

"Từ chối" chỉ dùng cho đơn Chờ xác nhận. Đơn Đã xác nhận muốn hủy thì dùng Hủy theo yêu cầu khách hoặc Hủy do sự cố.

### 11.3. Modal Xác nhận đặt sân `D-06`

Mở từ WF-10 hoặc WF-11, chỉ khi đơn Chờ xác nhận và chưa đến giờ bắt đầu.

```text
+--------------------------------------------------------------------------+
| XÁC NHẬN ĐẶT SÂN                                                     [X] |
+--------------------------------------------------------------------------+
| DS-12AB5 · Trần Thị B · 0901234567                                       |
| Sân A2 · 14/08/2026 · 18:00 – 19:30 · 150.000 ₫                          |
+--------------------------------------------------------------------------+
| Tình trạng thu tiền *                                                    |
| ( ) Chưa thu tiền      -> hóa đơn Chưa thanh toán                        |
| (o) Đã thu tiền        -> hóa đơn Đã thanh toán (thu đủ)                 |
|                                                                          |
|     Phương thức *      (o) Tiền mặt    ( ) Chuyển khoản                  |
|     Thời điểm thu *    [ 14/08/2026 07:45 ]  (không ở tương lai)         |
|                                                                          |
| (i) Hệ thống tự lập đúng 1 hóa đơn (HD-yyyyMMdd-số thứ tự).              |
|     Không hỗ trợ đặt cọc hoặc thu một phần.                              |
+--------------------------------------------------------------------------+
| [ Hủy ]                                             [ Xác nhận đặt sân ] |
+--------------------------------------------------------------------------+
```

| Thành phần | Quy tắc |
|---|---|
| Thông tin đơn | Mã, khách · SĐT, sân · ngày · giờ, tổng tiền (chỉ đọc) |
| Tình trạng thu tiền | **Bắt buộc chọn** một trong hai. Mặc định không chọn sẵn để nhân viên chủ động |
| Chưa thu tiền | Hóa đơn tạo ở trạng thái Chưa thanh toán, phương thức và thời điểm thu để trống |
| Đã thu tiền | Hiện thêm **Phương thức** (Tiền mặt/Chuyển khoản, bắt buộc) và **Thời điểm thu** (bắt buộc, mặc định thời điểm hiện tại, sửa được, không được sau thời điểm hiện tại `[G-27]`). Hóa đơn tạo ở trạng thái Đã thanh toán |
| Kết quả | Một giao dịch: đơn → Đã xác nhận, lập đúng một hóa đơn, ghi lịch sử và nhật ký. Toast "Đã xác nhận đơn {mã}" |
| Lỗi | Đã đến/qua giờ bắt đầu: "Không thể xác nhận đơn đã đến giờ bắt đầu. Hãy ghi nhận hoàn thành hoặc hủy do sự cố." Sân không Hoạt động/lịch không khả dụng/trùng lịch: từ chối, nêu lý do. Đơn đã Hoàn thành/Đã hủy: từ chối. Dữ liệu đã thay đổi: tải lại |

### 11.4. Modal Từ chối yêu cầu `D-05`

```text
+--------------------------------------------------------------------------+
| TỪ CHỐI YÊU CẦU ĐẶT SÂN                                              [X] |
+--------------------------------------------------------------------------+
| DS-12AB5 · Trần Thị B · 0901234567                                       |
| Sân A2 · 14/08/2026 · 18:00 – 19:30 · 150.000 ₫                          |
+--------------------------------------------------------------------------+
| Lý do từ chối *                                                          |
| [ ______________________________________________________ ]               |
| [ ______________________________________________________ ]               |
| (!) Vui lòng nhập lý do từ chối                                          |
|                                                                          |
| (i) Đơn chuyển sang Đã hủy, slot được giải phóng, không lập hóa đơn.     |
+--------------------------------------------------------------------------+
| [ Hủy ]                                             [ Xác nhận từ chối ] |
+--------------------------------------------------------------------------+
```

| Thành phần | Quy tắc |
|---|---|
| Lý do từ chối | **Bắt buộc**, không rỗng. Lưu vào lịch sử trạng thái |
| Kết quả | Một giao dịch: đơn → **Đã hủy**, giải phóng slot, **không lập hóa đơn**, ghi lịch sử (có lý do) và nhật ký. Toast "Đã từ chối yêu cầu {mã}" |
| Lỗi | Không nhập lý do: chặn gửi và hiện thông báo dưới ô. Đơn đã Đã xác nhận: không dùng được Từ chối |

### 11.5. Modal Ghi nhận hoàn thành lượt chơi `M-08` (NV-07)

Dành cho đơn đã qua giờ kết thúc, đang Chờ xác nhận hoặc Đã xác nhận.

```text
+--------------------------------------------------------------------------+
| GHI NHẬN HOÀN THÀNH LƯỢT CHƠI                                        [X] |
+--------------------------------------------------------------------------+
| DS-4C8RT · Phạm Thị D · 0933445566                                       |
| Sân A1 · 14/08/2026 · 06:00 – 07:00 · 60.000 ₫                           |
| Lượt chơi đã kết thúc lúc 07:00.                                         |
+--------------------------------------------------------------------------+
| [x] Xác nhận khách đã sử dụng sân *                                      |
|                                                                          |
| Chỉ hiện khi đơn đang Chờ xác nhận (chưa có hóa đơn):                    |
| Tình trạng thu tiền *   (o) Chưa thu    ( ) Đã thu                       |
|     Nếu Đã thu: chọn Phương thức và nhập Thời điểm thu                   |
|                                                                          |
| (i) Đơn Đã xác nhận: giữ hóa đơn, không tự đổi trạng thái thanh toán.    |
|     Hoàn thành không đồng nghĩa đã thanh toán.                           |
+--------------------------------------------------------------------------+
| [ Hủy ]                                          [ Ghi nhận hoàn thành ] |
+--------------------------------------------------------------------------+
```

| Thành phần | Quy tắc |
|---|---|
| Điều kiện mở | Giờ kết thúc không sau thời điểm xử lý. Lượt chưa kết thúc: nút bị vô hiệu |
| Xác nhận khách đã sử dụng sân | Checkbox **bắt buộc** |
| Tình trạng thu tiền | Chỉ hiện khi đơn đang **Chờ xác nhận** (chưa có hóa đơn). Cách chọn và quy tắc thời điểm thu giống modal Xác nhận |
| Đơn Đã xác nhận | Hóa đơn hiện có giữ nguyên, không tự đổi trạng thái thanh toán |
| Giá | Dùng giá đã lưu trên đơn, không tính lại |
| Kết quả | Đơn → Hoàn thành. Hoàn thành **không** đồng nghĩa đã thanh toán, hóa đơn Chưa thanh toán vẫn thu sau được |
| Lỗi | Lượt chưa kết thúc: từ chối. Đơn Đã hủy: từ chối. Không có đơn nào được tạo mới từ modal này |

### 11.6. Modal Hủy do sự cố vận hành `M-10` (BR-24)

```text
+--------------------------------------------------------------------------+
| HỦY ĐẶT SÂN DO SỰ CỐ VẬN HÀNH                                        [X] |
+--------------------------------------------------------------------------+
| DS-7K3QP · Lê Văn C · 0987654321                                         |
| Sân A1 · 14/08/2026 · 18:00 – 19:00 · 100.000 ₫                          |
+--------------------------------------------------------------------------+
| Lý do sự cố *                                                            |
| [ ______________________________________________________ ]               |
| [ ______________________________________________________ ]               |
| [ ] Xác nhận khách chưa sử dụng sân *                                    |
| (!) Vui lòng nhập lý do sự cố và xác nhận khách chưa sử dụng sân         |
|                                                                          |
| (i) Được hủy cả khi đã quá mốc 1 giờ trước giờ chơi.                     |
|     Hóa đơn Đã thanh toán: phải ghi nhận hoàn tiền (M-11) trước khi hủy. |
+--------------------------------------------------------------------------+
| [ Đóng ]                                       [ Xác nhận hủy do sự cố ] |
+--------------------------------------------------------------------------+
```

| Thành phần | Quy tắc |
|---|---|
| Lý do sự cố | **Bắt buộc** |
| Checkbox "Xác nhận khách chưa sử dụng sân" | **Bắt buộc** tích. Khách đã sử dụng thì dùng Ghi nhận hoàn thành |
| Thời điểm | Được phép cả khi đã quá mốc 1 giờ trước giờ chơi |
| Hóa đơn | Chưa thanh toán: bị hủy theo. Đã thanh toán: mở bước **Ghi nhận hoàn tiền** (WF-13, M-11) trước khi hủy hóa đơn |
| Kết quả | Đơn → Đã hủy, ghi lịch sử kèm lý do, nhật ký, thông báo cho khách |

### 11.7. Hủy và đổi lịch thay khách `[G-16]`

Khách vãng lai không tự hủy hay đổi lịch được, nên nhân viên làm thay khi khách yêu cầu qua hotline/quầy. Điều kiện giống khách thành viên: đơn Chờ xác nhận hoặc Đã xác nhận, còn ít nhất 1 giờ trước giờ bắt đầu (đúng mốc vẫn xử lý).

**Hủy theo yêu cầu khách:**

```text
+--------------------------------------------------------------------------+
| HỦY ĐẶT SÂN THEO YÊU CẦU KHÁCH                                       [X] |
+--------------------------------------------------------------------------+
| DS-7K3QP · Lê Văn C · 0987654321                                         |
| Sân A1 · 14/08/2026 · 18:00 – 19:00 · 100.000 ₫                          |
| Hóa đơn: HD-20260814-002 [Chưa thanh toán]                               |
+--------------------------------------------------------------------------+
| Lý do (tùy chọn)                                                         |
| [ ______________________________________________________ ]               |
|                                                                          |
| (i) Chỉ hủy được khi còn ít nhất 1 giờ trước giờ bắt đầu.                |
|     Hóa đơn Chưa thanh toán sẽ bị hủy theo. Không thể hoàn tác.          |
|     Hóa đơn Đã thanh toán: sau khi bấm Xác nhận hủy sẽ sang bước         |
|     ghi nhận hoàn tiền (M-11); đơn chỉ hủy khi bước đó hoàn tất.         |
+--------------------------------------------------------------------------+
| [ Đóng ]                                                [ Xác nhận hủy ] |
+--------------------------------------------------------------------------+
```

**Đổi lịch:**

```text
+--------------------------------------------------------------------------+
| ĐỔI LỊCH ĐẶT SÂN · DS-7K3QP                                          [X] |
+--------------------------------------------------------------------------+
| LỊCH HIỆN TẠI                                                            |
| Sân A1 · 14/08/2026 · 18:00 – 19:00 · 100.000 ₫                          |
+--------------------------------------------------------------------------+
| LỊCH MỚI                                                                 |
| Sân       [ Sân A1                  v ]                                  |
| Ngày      [ 15/08/2026        (lịch)  ]                                  |
| Bắt đầu   [ 08:00 v ]     Kết thúc  [ 09:00 v ]                          |
| Lý do điều chỉnh hóa đơn *  [ ____________________ ]                     |
|    (bắt buộc khi đơn đã có hóa đơn, tức đơn Đã xác nhận)                 |
+--------------------------------------------------------------------------+
| BÁO GIÁ (máy chủ tính)                                                   |
| Tổng tiền hiện tại:                         100.000 ₫                    |
| Tổng tiền mới:                                60.000 ₫                   |
|   08:00–09:00 × 60.000 ₫/giờ                                             |
| Chênh lệch:                                 -40.000 ₫                    |
|                                                                          |
| Xử lý hóa đơn khi lưu (theo tình trạng hiện tại):                        |
|   Chờ xác nhận ........ giữ Chờ xác nhận, chưa lập hóa đơn               |
|   Chưa thanh toán ..... hủy hóa đơn cũ, lập hóa đơn Chưa thanh toán mới  |
|   Đã thanh toán, tổng không đổi ... giữ nguyên hóa đơn                   |
|   Đã thanh toán, tổng khác ........ phải ghi nhận hoàn tiền (M-11) trước |
|   Hóa đơn thay thế: mã do hệ thống cấp, hiển thị sau khi lưu             |
+--------------------------------------------------------------------------+
| [ Hủy ]                                 [ Xác nhận đổi lịch · 60.000 ₫ ] |
+--------------------------------------------------------------------------+
```

| Tình huống hóa đơn | Xử lý khi đổi lịch |
|---|---|
| Đơn Chờ xác nhận | Vẫn Chờ xác nhận, chưa lập hóa đơn |
| Đã xác nhận, hóa đơn Chưa thanh toán | Hủy hóa đơn cũ, lập hóa đơn Chưa thanh toán mới theo tổng tiền mới |
| Đã thanh toán, tổng tiền không đổi | Giữ hóa đơn, không hoàn/thu lại |
| Đã thanh toán, tổng tiền khác | Phải ghi nhận hoàn toàn bộ khoản đã thu (M-11) trước. Sau đó hủy hóa đơn cũ và lập hóa đơn mới: Chưa thanh toán, hoặc Đã thanh toán nếu đã thu đủ khoản mới (nhập phương thức và thời điểm thu mới) |

Khi đơn đã có hóa đơn (Đã xác nhận), nhân viên **phải nhập lý do điều chỉnh hóa đơn**; hệ thống cấp mã hóa đơn thay thế và hiển thị sau khi lưu. Nhân viên không tự nhập tổng tiền khác giá máy chủ đã tính. Đơn Chờ xác nhận chưa có hóa đơn nên không cần lý do này.

Giá thay đổi giữa lúc xem báo giá và lúc lưu: hiện khối cảnh báo giá mới để nhân viên xác nhận lại (giống mục 5.5). Thất bại thì giữ nguyên lịch, giá và hóa đơn cũ. Quá mốc 1 giờ: từ chối, hướng dẫn dùng Hủy do sự cố nếu có sự cố vận hành.

---

## WF-12: Quản lý lịch sân & Đặt tại quầy

| Mục | Nội dung |
|---|---|
| Mã màn hình | WF-12 Quản lý lịch sân & Đặt tại quầy |
| Use-case | UC-19 Xem lịch đặt sân theo ngày; UC-23 Cập nhật trạng thái sân; UC-20 Tạo đặt sân thay khách |
| Đối tượng | Nhân viên, Quản trị viên |
| Route Codebase hiện tại | `/schedule` (`src/app/(admin)/schedule/page.tsx`) |
| Route Wireframe mục tiêu | `/admin/court-schedule` |
| Component Codebase | `ScheduleClient.tsx` |
| Tình trạng Codebase | Đang chạy (Timeline lịch sân) |
| Điều hướng ra | Bấm ô đã đặt → WF-11 |

> **Hiện trạng Codebase & Định hướng hoàn thiện tương lai:**
> - *Codebase hiện tại:* `ScheduleClient.tsx` đã có timeline lưới sân 05:00–22:00; chưa có nút và modal Đặt tại quầy.
> - *Chuẩn Wireframe tương lai:* Bổ sung nút và Modal "Đặt sân tại quầy / Tạo đặt sân thay khách" (`M-09`, UC-20) không cần OTP (X-05) và thao tác click nhanh đổi trạng thái sân sang Bảo trì/Đóng cửa khi có sự cố.

### 12.1. Wireframe

Lưới theo mockup: mỗi sân một cột, mỗi dòng một slot 30 phút. Đơn dài nhiều slot hiện tên khách ở slot đầu, mã đơn ở slot thứ hai, các slot sau ghi "(tiếp tục)".

```text
+----------------------------------------------------------------------------------------------------------------------+
| ShuttleVN · Khu quản trị                                                         Trần Văn B · Nhân viên  [Đăng xuất] |
+----------------------------------------------------------------------------------------------------------------------+
| MENU                     | LỊCH SÂN                                                               [ + Tạo lịch đặt ] |
|                          | [<] [ Thứ 6, 14/08/2026 (lịch) ] [>] [Hôm nay]          Lọc theo sân: [ Tất cả v ]        |
| > Lịch sân               |                                                                                           |
|   Yêu cầu đặt sân        | Chú giải: [CXN] Chờ xác nhận  [ĐXN] Đã xác nhận  [HT] Hoàn thành  Trống  Bảo trì/Đóng     |
|   Thanh toán             | Trạng thái sân: A1 [Hoạt động v] A2 [Hoạt động v] A3 [Bảo trì v] A4 [Đóng v]              |
|   Khách hàng             |                                                                                           |
|                          | Giờ   | Sân A1            | Sân A2            | Sân A3 [Bảo trì]  | Sân A4 [Đóng]         |
|                          | ------+-------------------+-------------------+-------------------+-------------------    |
|                          | 17:00 | Hoàng Văn E [CXN] | Trống             | Bảo trì           | Đóng                  |
|                          | 17:30 | DS-5N7XA          | Trống             | Bảo trì           | Đóng                  |
|                          | 18:00 | Lê Văn C [ĐXN]    | Trần Thị B [CXN]  | Bảo trì           | Đóng                  |
|                          | 18:30 | DS-7K3QP          | DS-12AB5          | Bảo trì           | Đóng                  |
|                          | 19:00 | Trống             | (tiếp tục)        | Bảo trì           | Đóng                  |
|                          | 19:30 | Lê Văn C [CXN]    | Trống             | Bảo trì           | Đóng                  |
|                          | 20:00 | DS-8H4KM          | Trống             | Bảo trì           | Đóng                  |
|                          | 20:30 | Trống             | Trống             | Bảo trì           | Đóng                  |
|                          |                                                                                           |
|                          | (i) Bấm một ô đã đặt để mở chi tiết đặt sân. Lưới cuộn dọc đến hết giờ mở cửa.            |
+----------------------------------------------------------------------------------------------------------------------+
```

### 12.2. Chi tiết thành phần

| Thành phần | Quy tắc |
|---|---|
| Chọn ngày | `[<]` `[>]`, ô ngày, **Hôm nay** |
| Lọc theo sân | Chọn một sân hoặc Tất cả |
| Chú giải | Chờ xác nhận `[CXN]`, Đã xác nhận `[ĐXN]`, Hoàn thành `[HT]` (vẫn giữ chỗ), Trống, Bảo trì/Đóng. Mỗi trạng thái có chữ, không chỉ màu |
| Ô đã đặt | Tên khách, mã đặt sân, nhãn trạng thái. Bấm để mở WF-11 |
| Ô trống | "Trống". Bấm để mở modal Tạo lịch đặt với sân/ngày/giờ điền sẵn (đề xuất) |
| Sân Bảo trì/Đóng | Cả cột hiện "Bảo trì" hoặc "Đóng" |
| Dải "Trạng thái sân" | Mỗi sân một ô chọn Hoạt động / Bảo trì / Đóng. Đổi trạng thái mở modal bên dưới |
| Nút **+ Tạo lịch đặt** | Mở modal M-09 |

| Trạng thái | Hiển thị |
|---|---|
| Đang tải | Skeleton lưới |
| Không có sân | "Chưa có sân nào." |
| Lỗi tải | Banner lỗi + Thử lại |

### 12.3. Modal Đổi trạng thái sân (UC-23)

```text
+----------------------------------------------------------------------+
| ĐỔI TRẠNG THÁI SÂN · Sân A2                                      [X] |
+----------------------------------------------------------------------+
| Trạng thái hiện tại: Hoạt động                                       |
|                                                                      |
| Trạng thái mới *                                                     |
| ( ) Hoạt động     (o) Bảo trì     ( ) Đóng                           |
|                                                                      |
| (i) Sân Bảo trì/Đóng không nhận đặt mới, không nhận đổi lịch         |
|     vào sân và không xác nhận yêu cầu thông thường.                  |
|                                                                      |
| (!) Không thể chuyển sang Bảo trì/Đóng vì sân còn đơn Chờ xác nhận   |
|     hoặc Đã xác nhận. Hãy từ chối, hủy hoặc đổi lịch đơn đó trước.   |
+----------------------------------------------------------------------+
| [ Hủy ]                                           [ Lưu trạng thái ] |
+----------------------------------------------------------------------+
```

| Quy tắc | Nội dung |
|---|---|
| Giá trị chọn | Hoạt động, Bảo trì, Đóng. **Không có "Đã xóa"** (xóa mềm chỉ ở WF-15) |
| Chuyển sang Bảo trì/Đóng | Bị từ chối khi sân còn đơn Chờ xác nhận hoặc Đã xác nhận. Phải từ chối/hủy/đổi lịch các đơn đó trước |
| Sân không Hoạt động | Không nhận đặt mới, đổi lịch vào sân hay xác nhận yêu cầu thông thường |
| Kết quả | Lưu trạng thái, ghi nhật ký, lưới cập nhật |

### 12.4. Modal "Tạo lịch đặt thay khách tại quầy" `M-09` (UC-20)

```text
+--------------------------------------------------------------------------+
| TẠO LỊCH ĐẶT THAY KHÁCH TẠI QUẦY                                     [X] |
+--------------------------------------------------------------------------+
| THÔNG TIN KHÁCH                                                          |
| Họ và tên *        [ Trần Thị B_______________________ ]                 |
| Số điện thoại *    [ 0901234567_______________________ ]                 |
| Email *            [ tran.b@email.com_________________ ]                 |
| (i) Không gửi mã OTP: nhân viên đã xác thực thông tin liên hệ            |
|     trực tiếp với khách. Email đã có hồ sơ thì dùng lại hồ sơ đó.        |
+--------------------------------------------------------------------------+
| LỊCH ĐẶT                                                                 |
| Sân *        [ Sân A2 v ]          Ngày *   [ 14/08/2026 (lịch) ]        |
| Bắt đầu *    [ 19:30 v ]           Kết thúc * [ 20:30 v ]                |
| (i) Chỉ tạo được khi giờ bắt đầu còn ở phía sau thời điểm hiện tại.      |
+--------------------------------------------------------------------------+
| BÁO GIÁ (máy chủ tính, chưa giữ chỗ)                                     |
| Tổng tiền:                                          100.000 ₫            |
|   19:30–20:30 × 100.000 ₫/giờ                                            |
|                                                                          |
| (i) Đơn mới ở trạng thái Chờ xác nhận. Xác nhận đơn ở màn hình           |
|     chi tiết sau khi tạo.                                                |
+--------------------------------------------------------------------------+
| [ Hủy ]                              [ Tạo yêu cầu đặt sân · 100.000 ₫ ] |
+--------------------------------------------------------------------------+
```

| Trường | Bắt buộc | Quy tắc |
|---|---|---|
| Họ và tên | Có | Không rỗng |
| Số điện thoại | Có | 8–15 chữ số, cho phép `+` ở đầu |
| Email | Có | Đúng định dạng. Hệ thống tìm hồ sơ theo email: có thì dùng lại, chưa có thì tạo hồ sơ mới |
| Sân | Có | Chỉ sân Hoạt động |
| Ngày, Bắt đầu, Kết thúc | Có | Slot 30 phút, tối thiểu 30 phút, cùng một ngày, trong giờ mở cửa. Giờ bắt đầu phải sau thời điểm hiện tại |
| Báo giá | – | Máy chủ tính. Nút tạo bị vô hiệu cho tới khi có báo giá |

**Không cần OTP email.** Nhân viên đã tự xác thực thông tin liên hệ với khách tại quầy hoặc qua điện thoại. Đơn được tạo ở trạng thái **Chờ xác nhận**, ghi lịch sử với tác nhân là nhân viên. Việc xác nhận đơn thực hiện riêng bằng WF-10/WF-11 `[G-18]`.

| Tình huống | Hành vi |
|---|---|
| Giá/tổng tiền đã đổi trước khi lưu | Hiện báo giá mới để xác nhận lại |
| Ngoài giờ mở cửa, giờ không hợp lệ, trùng lịch, sân không Hoạt động | Từ chối, không tạo đơn một phần |
| Giờ bắt đầu đã qua | Từ chối: chỉ tạo đơn trước giờ bắt đầu lượt chơi |
| Dữ liệu khách không hợp lệ | Nêu trường lỗi tại ô tương ứng |
| Thành công | Modal thông báo mã đặt sân (khung dưới), gửi email cho khách |

```text
+--------------------------------------------------------------------------+
| ĐÃ TẠO YÊU CẦU ĐẶT SÂN                                               [X] |
+--------------------------------------------------------------------------+
|                                                                          |
|                           Mã đặt sân: DS-6P2YD                           |
|               Trạng thái: Chờ xác nhận (chưa lập hóa đơn)                |
|                                                                          |
| (i) Hệ thống gửi email thông báo cho khách.                              |
+--------------------------------------------------------------------------+
| [ Đóng ]                                     [ Mở chi tiết để xác nhận ] |
+--------------------------------------------------------------------------+
```

---

## WF-13: Quản lý thanh toán & Hóa đơn

| Mục | Nội dung |
|---|---|
| Mã màn hình | WF-13 Quản lý thanh toán & Hóa đơn |
| Use-case | UC-28 Xem hóa đơn; UC-29 Thu tiền hóa đơn; UC-22 Ghi nhận hoàn tiền; UC-17 Lập hóa đơn (tự động) |
| Đối tượng | Nhân viên, Quản trị viên |
| Route Codebase hiện tại | `/payments` (`src/app/(admin)/payments/page.tsx`) |
| Route Wireframe mục tiêu | `/admin/payments` |
| Component Codebase | `payments/page.tsx` |
| Tình trạng Codebase | 100% Placeholder (chỉ bọc RoleGuard) |
| Điều hướng ra | Mã đơn → WF-11 |

> **Hiện trạng Codebase & Định hướng hoàn thiện tương lai:**
> - *Codebase hiện tại:* File `payments/page.tsx` hiện chỉ là placeholder trống.
> - *Chuẩn Wireframe tương lai:* Xây dựng bảng hóa đơn (`Unpaid`, `Paid`, `Cancelled`), Modal Thu tiền (UC-29), Modal Hoàn tiền (UC-22); tuyệt đối không có nút lập hóa đơn thủ công (D-07).

### 13.1. Wireframe

```text
+----------------------------------------------------------------------------------------------------------------------+
| ShuttleVN · Khu quản trị                                                         Trần Văn B · Nhân viên  [Đăng xuất] |
+----------------------------------------------------------------------------------------------------------------------+
| MENU                     | THANH TOÁN & HÓA ĐƠN                                                                      |
|                          | [ Tìm theo mã hóa đơn hoặc mã đặt sân...    ]   Trạng thái: [ Tất cả v ]                  |
|   Lịch sân               |                                                                                           |
|   Yêu cầu đặt sân        | Mã hóa đơn       Mã đơn    Khách        Tổng tiền   Trạng thái       Thao tác             |
| > Thanh toán             | ---------------  --------  -----------  ----------  ---------------  -------------------- |
|   Khách hàng             | HD-20260814-002  DS-7K3QP  Lê Văn C     100.000 ₫   Chưa thanh toán  [Chi tiết][Thu tiền] |
|                          | HD-20260814-001  DS-7K3QP  Lê Văn C     100.000 ₫   Đã hủy           [Chi tiết]           |
|                          | HD-20260813-009  DS-9M2ZX  Hoàng Văn E  100.000 ₫   Đã thanh toán    [Chi tiết]           |
|                          | HD-20260811-004  DS-3E5PL  Trần Thị B   100.000 ₫   Đã thanh toán    [Chi tiết]           |
|                          | HD-20260809-003  DS-2B6NV  Trần Thị B   60.000 ₫    Đã hủy           [Chi tiết]           |
|                          |                                                                                           |
|                          | Hiển thị 1–5 / 5                                         [<]  1  [>]    Mỗi trang: [20 v] |
|                          |                                                                                           |
|                          | (i) Hóa đơn do hệ thống tự lập khi xác nhận đơn. Hóa đơn Đã hủy chỉ để tra cứu.           |
+----------------------------------------------------------------------------------------------------------------------+
```

### 13.2. Chi tiết thành phần

| Thành phần | Quy tắc |
|---|---|
| Ô tìm kiếm | Tìm theo mã (mã hóa đơn hoặc mã đặt sân) |
| Bộ lọc trạng thái | Tất cả, Chưa thanh toán, Đã thanh toán, Đã hủy |
| Cột | Mã hóa đơn (`HD-yyyyMMdd-seq`), Mã đơn, Khách, Tổng tiền, Trạng thái, Thao tác |
| **Chi tiết** | Mở khung chi tiết hóa đơn (mục 13.5) |
| **Thu tiền** | Chỉ ở hóa đơn **Chưa thanh toán** của đơn Đã xác nhận hoặc Hoàn thành |
| Hóa đơn Đã hủy | Chỉ tra cứu, không có thao tác. Hóa đơn bị thay thế (do đổi lịch) hiển thị Đã hủy |
| Không có | Nút Lập hóa đơn thủ công; thanh toán một phần; đặt cọc |

| Trạng thái | Hiển thị |
|---|---|
| Đang tải | Skeleton các dòng |
| Rỗng | "Không tìm thấy hóa đơn nào." |
| Lỗi tải | Banner lỗi + Thử lại |

### 13.3. Modal Thu tiền hóa đơn (UC-29)

```text
+----------------------------------------------------------------------+
| XÁC NHẬN ĐÃ THU TIỀN                                             [X] |
+----------------------------------------------------------------------+
| Hóa đơn HD-20260814-002 · DS-7K3QP · Lê Văn C                        |
|                                                                      |
| Số tiền cần thu:    100.000 ₫  (thu đủ, không thu một phần)          |
|                                                                      |
| Phương thức *       (o) Tiền mặt     ( ) Chuyển khoản                |
| Thời điểm thu *     [ 14/08/2026 07:45 ]  (không ở tương lai)        |
|                                                                      |
| [x] Tôi xác nhận đã thu đủ số tiền trên *                            |
| (!) Thao tác không thể hoàn tác. Trạng thái đặt sân không tự đổi.    |
+----------------------------------------------------------------------+
| [ Hủy ]                                          [ Xác nhận đã thu ] |
+----------------------------------------------------------------------+
```

| Thành phần | Quy tắc |
|---|---|
| Số tiền cần thu | Bằng tổng hóa đơn, chỉ đọc. Không thu một phần |
| Phương thức | **Bắt buộc**: Tiền mặt hoặc Chuyển khoản |
| Thời điểm thu | **Bắt buộc**, ghi nhận thời điểm thu thực tế. Mặc định thời điểm hiện tại, nhân viên sửa được, không được sau thời điểm hiện tại của máy chủ `[G-27]` |
| Checkbox xác nhận đã thu đủ | **Bắt buộc** |
| Kết quả | Hóa đơn → Đã thanh toán, lưu phương thức, thời điểm thu, nhân viên xác nhận, ghi nhật ký. **Trạng thái đặt sân không tự đổi** |
| Lỗi | Hóa đơn/đơn đã hủy: từ chối. Xác nhận lặp cùng nội dung: trả kết quả hiện có, không đổi thời điểm thu. Lặp khác nội dung: từ chối. Đơn quá ngày chưa chốt: chốt trước, đơn bị chốt hủy thì không nhận thanh toán |

### 13.4. Modal Ghi nhận hoàn tiền `M-11` (UC-22)

Dành cho đơn có hóa đơn **Đã thanh toán** bị hủy (theo yêu cầu khách hoặc do sự cố) hoặc đổi lịch làm tổng tiền khác. Modal này **không phải nút độc lập trên danh sách hóa đơn**: nó mở ở bước tiếp theo của WF-11 (mục 11.6, 11.7) và hoàn tất trong cùng giao dịch với việc hủy/đổi `[G-17]`.

```text
+------------------------------------------------------------------------------------+
| GHI NHẬN HOÀN TIỀN                                                             [X] |
+------------------------------------------------------------------------------------+
| Đơn DS-9M2ZX · Hóa đơn HD-20260813-009 (Đã thanh toán)                             |
| Lý do kích hoạt: Hủy đơn theo yêu cầu khách                                        |
+------------------------------------------------------------------------------------+
| Số tiền hoàn:        100.000 ₫  (bằng tổng hóa đơn, không hoàn một phần)           |
| Phương thức hoàn *   (o) Tiền mặt     ( ) Chuyển khoản                             |
| Thời điểm hoàn *     [ 14/08/2026 07:50 ]                                          |
| Lý do *              [ Khách hủy trước giờ chơi__________ ]                        |
|                                                                                    |
| [ ] Tôi đã hoàn toàn bộ số tiền cho khách NGOÀI hệ thống *                         |
| (i) Hệ thống chỉ ghi nhận, không tự chuyển tiền. Khi ghi nhận xong, hóa đơn        |
|     cũ bị hủy (giữ thông tin thu cũ) và đơn được hủy/đổi lịch cùng giao dịch.      |
| (i) Chưa hoàn tất bước này: đơn và hóa đơn giữ nguyên.                             |
| (i) Thời điểm hoàn không ở tương lai và không trước thời điểm thu.                 |
+------------------------------------------------------------------------------------+
| [ Quay lại ]                                                [ Ghi nhận hoàn tiền ] |
+------------------------------------------------------------------------------------+
```

| Thành phần | Quy tắc |
|---|---|
| Số tiền hoàn | Bằng tổng hóa đơn cũ, chỉ đọc. Không hoàn một phần |
| Phương thức hoàn | **Bắt buộc**: Tiền mặt hoặc Chuyển khoản |
| Thời điểm hoàn | **Bắt buộc**, thời điểm thực tế. Không được sau thời điểm hiện tại và không được trước thời điểm thu của hóa đơn gốc `[G-27]` |
| Lý do | **Bắt buộc** |
| Checkbox đã hoàn tiền ngoài hệ thống | **Bắt buộc** |
| Hệ thống | Chỉ ghi nhận, không tự chuyển tiền |
| Kết quả | Lưu thông tin hoàn (số tiền, phương thức, thời điểm, người thực hiện, lý do), hủy hóa đơn cũ (giữ thông tin thu cũ), thực hiện hủy/đổi lịch, ghi nhật ký |
| Chưa hoàn tất | Đơn và hóa đơn giữ nguyên |
| Ghi nhận lỗi sau khi tiền đã chuyển | Chỉ thử lại bước ghi nhận với chứng cứ giao dịch cũ. Không yêu cầu chuyển tiền lần nữa |

### 13.5. Chi tiết hóa đơn (UC-28)

```text
+--------------------------------------------------------------------------+
| CHI TIẾT HÓA ĐƠN · HD-20260814-002                                   [X] |
+--------------------------------------------------------------------------+
| Mã đặt sân:      DS-7K3QP · Sân A1 · 14/08/2026 · 18:00 – 19:00          |
| Khách:           Lê Văn C · 0987654321                                   |
| Tổng tiền:       100.000 ₫                                               |
| Trạng thái:      [Chưa thanh toán]                                       |
| Phương thức:     —                                                       |
| Thời điểm thu:   —                                                       |
+--------------------------------------------------------------------------+
| CHUỖI HÓA ĐƠN CỦA ĐƠN NÀY                                                |
| HD-20260814-001  Đã hủy     Thay thế bởi HD-20260814-002                 |
|                  Lý do: đổi lịch · Người hủy: Trần Văn B · 14/08 07:30   |
| HD-20260814-002  Chưa thanh toán (hóa đơn hợp lệ hiện tại)               |
+--------------------------------------------------------------------------+
|                                                                 [ Đóng ] |
+--------------------------------------------------------------------------+
```

Chi tiết hiển thị cả chuỗi hóa đơn bị hủy và hóa đơn thay thế, lý do, người và thời điểm thao tác.

---

## WF-14: Quản lý khách hàng

| Mục | Nội dung |
|---|---|
| Mã màn hình | WF-14 Quản lý khách hàng |
| Use-case | UC-24 Quản lý hồ sơ khách hàng; UC-27 Khóa/mở khóa tài khoản; UC-30 Tra cứu nhanh |
| Đối tượng | Nhân viên, Quản trị viên |
| Route Codebase hiện tại | `/customers` (`src/app/(admin)/customers/page.tsx`) |
| Route Wireframe mục tiêu | `/admin/customers` |
| Component Codebase | `CustomersClient.tsx` |
| Tình trạng Codebase | Đang chạy (Bảng danh sách) |
| Điều hướng ra | Mã đơn trong lịch sử → WF-11 |

> **Hiện trạng Codebase & Định hướng hoàn thiện tương lai:**
> - *Codebase hiện tại:* `CustomersClient.tsx` đã có bảng khách hàng; các nút Thêm khách và Chi tiết chưa gắn handler.
> - *Chuẩn Wireframe tương lai:* Bổ sung thanh tìm kiếm nhanh (UC-30) và thao tác Khóa/Mở khóa tài khoản khách (UC-27, BR-27) reset bộ đếm sai về 0 (BR-12). Modal tạo hồ sơ khách hàng mới (UC-26).

### 14.1. Wireframe

```text
+----------------------------------------------------------------------------------------------------------------------+
| ShuttleVN · Khu quản trị                                                         Trần Văn B · Nhân viên  [Đăng xuất] |
+----------------------------------------------------------------------------------------------------------------------+
| MENU                     | QUẢN LÝ KHÁCH HÀNG                                                                        |
|                          | [ Tìm theo họ tên, số điện thoại, email...             ]  [Tìm]                           |
|   Lịch sân               |                                                                                           |
|   Yêu cầu đặt sân        | Mã KH     Họ tên          SĐT          Email                     Trạng thái TK            |
|   Thanh toán             | --------  --------------  -----------  ------------------------  -------------            |
| > Khách hàng             | KH-0012   Trần Thị B      0901234567   tran.b@email.com          ACTIVE                   |
|                          |      [Xem lịch sử đặt sân]  [Khóa tài khoản]                                              |
|                          | KH-0015   Lê Văn C        0987654321   le.c@email.com            DISABLED                 |
|                          |      [Xem lịch sử đặt sân]  [Mở khóa tài khoản]                                           |
|                          | KH-0020   Phạm Thị D      0933445566   pham.d@email.com          —                        |
|                          |      [Xem lịch sử đặt sân]            (chưa có tài khoản)                                 |
|                          |                                                                                           |
|                          | Hiển thị 1–3 / 3                                         [<]  1  [>]    Mỗi trang: [20 v] |
|                          |                                                                                           |
|                          | (i) "—" = khách chưa có tài khoản. Chỉ khóa/mở khóa được tài khoản khách hàng.            |
+----------------------------------------------------------------------------------------------------------------------+
```

### 14.2. Chi tiết thành phần

| Thành phần | Quy tắc |
|---|---|
| Thanh tìm kiếm | Tìm theo họ tên, SĐT, email. Số điện thoại không dùng để gộp hồ sơ |
| Cột | Mã KH, Họ tên, SĐT, Email, Trạng thái tài khoản (`ACTIVE` / `DISABLED`). Mã KH trong wireframe là dữ liệu mẫu |
| Khách chưa có tài khoản (vãng lai) | Cột trạng thái hiện "—" và **không có** nút Khóa/Mở khóa `[G-20]` |
| **Xem lịch sử đặt sân** | Mở modal lịch sử (mục 14.3) |
| **Khóa tài khoản** | Chỉ ở khách có tài khoản `ACTIVE`. Mở modal mục 14.4 |
| **Mở khóa tài khoản** | Chỉ ở khách có tài khoản `DISABLED`. Đưa bộ đếm đăng nhập sai về 0, áp dụng cả với khóa tự động ở lần sai thứ 5 |
| Phạm vi quyền | Chỉ khóa/mở khóa **tài khoản khách hàng**. Không khóa được tài khoản Nhân viên/Quản trị. Thao tác trên tài khoản nội bộ hoặc hard-delete bị từ chối |
| Không có | Xóa hồ sơ khách đã giao dịch; sửa email; giá trị trạng thái thứ ba ("Vô hiệu hóa") |

Quản trị viên còn xóa được tài khoản khách theo QT-10 bằng modal xóa tài khoản ở WF-16 (mục 16.4), không vẽ lại ở đây. Nhân viên sửa họ tên/SĐT khách (UC-24) chưa được vẽ `[G-19]`.

| Trạng thái | Hiển thị |
|---|---|
| Đang tải | Skeleton các dòng |
| Rỗng | "Không tìm thấy khách hàng nào." |
| Lỗi tải | Banner lỗi + Thử lại |

### 14.3. Modal Xem lịch sử đặt sân của khách

```text
+----------------------------------------------------------------------------------+
| LỊCH SỬ ĐẶT SÂN · Trần Thị B (KH-0012)                                       [X] |
+----------------------------------------------------------------------------------+
| Mã đơn    Sân     Ngày giờ           Tổng tiền   Trạng thái    Thanh toán        |
| --------  ------  -----------------  ----------  ------------  ----------------  |
| DS-12AB5  A2      14/08 18:00-19:30  150.000 ₫   Chờ xác nhận  Chưa lập hóa đơn  |
| DS-3E5PL  A1      11/08 19:00-20:00  100.000 ₫   Hoàn thành    Đã thanh toán     |
| DS-2B6NV  A1      09/08 08:00-09:00  60.000 ₫    Đã hủy        —                 |
|                                                                                  |
| Hiển thị 1–3 / 3                                                     [<]  1  [>] |
+----------------------------------------------------------------------------------+
|                                                                         [ Đóng ] |
+----------------------------------------------------------------------------------+
```

Danh sách có phân trang. Trạng thái thanh toán của đơn Chờ xác nhận là "Chưa lập hóa đơn". Sân đã xóa hiện "Sân đã xóa #<mã>".

### 14.4. Modal Khóa / Mở khóa tài khoản khách

```text
+----------------------------------------------------------------------+
| KHÓA TÀI KHOẢN KHÁCH                                             [X] |
+----------------------------------------------------------------------+
| Trần Thị B (KH-0012) · tran.b@email.com                              |
|                                                                      |
| Tài khoản chuyển sang DISABLED, khách không đăng nhập được.          |
| Không hủy đặt sân hoặc hóa đơn hiện có.                              |
| Khách vẫn đặt nhanh được sau khi xác minh email.                     |
|                                                                      |
| (i) Nhật ký ghi nhận tác nhân, thao tác và giá trị trước/sau.        |
+----------------------------------------------------------------------+
| [ Hủy ]                                           [ Khóa tài khoản ] |
+----------------------------------------------------------------------+
```

| Thành phần | Quy tắc |
|---|---|
| Khóa | Tài khoản chuyển `DISABLED`. Không hủy đặt sân/hóa đơn. Khách bị khóa vẫn đặt nhanh được sau khi xác minh email |
| Mở khóa | Tài khoản chuyển `ACTIVE`, bộ đếm sai về 0. Văn bản modal đổi tương ứng, nút là "Mở khóa tài khoản" |
| Không có ô lý do | Nhật ký không có trường lý do (BR-14), nên modal không có ô nhập lý do |
| Kết quả | Toast "Đã khóa/mở khóa tài khoản", dòng cập nhật trạng thái, ghi nhật ký |

---

## WF-15: Quản lý sân & Bảng giá

| Mục | Nội dung |
|---|---|
| Mã màn hình | WF-15 Quản lý sân & Bảng giá |
| Use-case | UC-31 Thêm sân; UC-32 Sửa thông tin sân; UC-33 Xóa mềm sân; UC-23 Đổi trạng thái sân; UC-34 Giờ mở cửa; UC-35 Bảng giá |
| Đối tượng | Quản trị viên |
| Route Codebase hiện tại | `/manage-courts` (`src/app/(admin)/manage-courts/page.tsx`) |
| Route Wireframe mục tiêu | `/admin/courts` |
| Component Codebase | `ManageCourtsClient.tsx`, `CourtCardGrid.tsx`, `CourtTable.tsx`, `CourtStats.tsx`, `CourtFormModal.tsx`, `PricingTimeline.tsx` |
| Tình trạng Codebase | Đang chạy |
| Điều hướng ra | – |

> **Hiện trạng Codebase & Định hướng hoàn thiện tương lai:**
> - *Codebase hiện tại:* Đã có UI chuyển đổi thẻ/bảng và thanh `PricingTimeline.tsx` chia mốc 30 phút theo thứ trong tuần.
> - *Chuẩn Wireframe tương lai:* Bổ sung bước xem trước cấu hình sân trước khi lưu (BR-25, UC-31) và ràng buộc xóa mềm khi hết đơn Pending/Confirmed (BR-15).

### 15.1. Wireframe danh sách sân

```text
+----------------------------------------------------------------------------------------------------------------------+
| ShuttleVN · Khu quản trị                                                   Nguyễn Thị C · Quản trị viên  [Đăng xuất] |
+----------------------------------------------------------------------------------------------------------------------+
| MENU                     | QUẢN LÝ SÂN                                                            [ + Thêm sân mới ] |
|                          |                                                                                           |
|   Bảng điều khiển        | Sân         Kích thước · Mặt sân      Mô tả                         Trạng thái            |
|   Lịch sân               | ----------  ------------------------  ----------------------------  ------------          |
|   Yêu cầu đặt sân        | Sân A1      6.1x13.4m · Thảm PU       Sân tiêu chuẩn                Hoạt động             |
|   Thanh toán             |      [Đổi trạng thái] [Sửa] [Giờ mở cửa] [Bảng giá] [Xóa]                                 |
| > Quản lý sân            | Sân A2      6.1x13.4m · Thảm PU       Gần quầy lễ tân               Hoạt động             |
|   Khách hàng             |      [Đổi trạng thái] [Sửa] [Giờ mở cửa] [Bảng giá] [Xóa]                                 |
|   Quản lý nhân viên      | Sân A3      6.1x13.4m · Gỗ            Đang sửa sàn                  Bảo trì               |
|   Báo cáo & Thống kê     |      [Đổi trạng thái] [Sửa] [Giờ mở cửa] [Bảng giá] [Xóa]                                 |
|   Nhật ký hoạt động      |                                                                                           |
|   Tài khoản & Phân quyền | (i) Sân đã xóa mềm không hiện ở danh sách này và không hiện ở lưới đặt sân.               |
+----------------------------------------------------------------------------------------------------------------------+
```

| Thành phần | Quy tắc |
|---|---|
| Cột | Tên sân, Kích thước · Mặt sân `[G-01]`, Mô tả, Trạng thái |
| Đổi trạng thái | Dùng lại modal ở mục 12.3 (Hoạt động / Bảo trì / Đóng). Còn đơn Chờ xác nhận/Đã xác nhận thì không chuyển sang Bảo trì/Đóng được |
| Sửa | Mở form (mục 15.2) ở chế độ sửa |
| Giờ mở cửa / Bảng giá | Mở modal cấu hình theo ngày (mục 15.4, 15.5) |
| Xóa | Mở modal xóa mềm (mục 15.3) |
| Không có | Chỉ số "Tỉ lệ lấp đầy" |
| Rỗng | "Chưa có sân nào. Bấm Thêm sân mới để bắt đầu." |

### 15.2. Form Thêm / Sửa sân

```text
+--------------------------------------------------------------------------+
| THÊM SÂN MỚI                                                         [X] |
+--------------------------------------------------------------------------+
| Tên sân *                 [ Sân A4________________________ ]             |
| Mô tả                     [ Sân góc, gần cửa sổ___________ ]             |
| Kích thước                [ 6.1x13.4m_____________________ ]             |
| Mặt sân                   [ Thảm PU_______________________ ]             |
| Trạng thái *              (o) Hoạt động  ( ) Bảo trì  ( ) Đóng           |
| Giờ mở cửa mặc định *     [ 05:00 v ]                                    |
| Giờ đóng cửa mặc định *   [ 22:00 v ]                                    |
| Đơn giá mặc định *        [ 60.000 ] ₫/giờ                               |
|                                                                          |
| (!) Tên sân không được trống hoặc trùng sân đang có                      |
| (!) Giờ mở phải nhỏ hơn giờ đóng; đơn giá phải là số nguyên lớn hơn 0    |
+--------------------------------------------------------------------------+
| XEM TRƯỚC CẤU HÌNH (bấm Xem trước trước khi lưu)                         |
|   7 lịch mở cửa T2–CN: 05:00–22:00, khả dụng                             |
|   7 mốc giá, mỗi ngày bắt đầu tại 05:00: 60.000 ₫/giờ                    |
|                                                                          |
| (i) Khi sửa sân: chỉ đổi Tên, Mô tả và thông tin sân. Trạng thái,        |
|     giờ mở cửa và bảng giá chỉnh ở thao tác riêng.                       |
+--------------------------------------------------------------------------+
| [ Hủy ]                                      [ Xem trước ]   [ Lưu sân ] |
+--------------------------------------------------------------------------+
```

| Trường | Bắt buộc | Quy tắc |
|---|---|---|
| Tên sân | Có | Cắt khoảng trắng đầu/cuối. Không rỗng. Không trùng tên sân chưa xóa khác (không phân biệt hoa/thường) |
| Mô tả | Không | – |
| Kích thước, Mặt sân | Không | Chỉ để hiển thị `[G-01]` |
| Trạng thái | Có (khi thêm) | Hoạt động, Bảo trì hoặc Đóng |
| Giờ mở/đóng cửa mặc định | Có (khi thêm) | Giờ mở nhỏ hơn giờ đóng, ở phút 00 hoặc 30 |
| Đơn giá mặc định | Có (khi thêm) | Số nguyên VND lớn hơn 0 |

- **Thêm sân:** bắt buộc bấm **Xem trước** để thấy cấu hình kết quả rồi mới **Lưu sân**. Một giao dịch lưu sân, **7 lịch mở cửa** (mỗi ngày trong tuần một lịch) và **7 mốc giá** (tại giờ mở cửa), ghi nhật ký. Lỗi ở bước nào thì hoàn tác, không để sân thiếu giá.
- **Sửa sân:** chỉ sửa Tên, Mô tả (và thông tin sân). Sân Đã xóa không sửa được. Nhật ký ghi giá trị trước/sau.

### 15.3. Modal Xóa mềm sân

```text
+--------------------------------------------------------------------------+
| XÓA SÂN? · Sân A3                                                    [X] |
+--------------------------------------------------------------------------+
| Sân sẽ được XÓA MỀM:                                                     |
|   - Không còn hiện ở lưới/danh sách đặt sân mới.                         |
|   - Giữ mã sân, lịch, giá, giao dịch cũ; lịch sử ghi "Sân đã xóa #<mã>". |
|   - Tên sân dùng lại được cho sân mới. Không khôi phục, không sửa.       |
|                                                                          |
| (!) Không thể xóa: sân còn đơn Chờ xác nhận hoặc Đã xác nhận.            |
|     Hãy từ chối, hủy hoặc đổi lịch các đơn đó trước.                     |
+--------------------------------------------------------------------------+
| [ Hủy ]                                                 [ Xác nhận xóa ] |
+--------------------------------------------------------------------------+
```

Chỉ xóa được khi sân không còn đơn Chờ xác nhận/Đã xác nhận. Nếu xung đột với việc tạo/đổi/xác nhận đơn đồng thời: hoàn tác và tải lại. Sân đã xóa rồi: trả kết quả Đã xóa, không ghi thêm nhật ký. **Không xóa vật lý.**

### 15.4. Cấu hình giờ mở cửa `M-13` (UC-34)

```text
+--------------------------------------------------------------------------+
| CẤU HÌNH GIỜ MỞ CỬA · Sân A1                                         [X] |
+--------------------------------------------------------------------------+
| [T2] [T3] [T4] [T5] [*T6*] [T7] [CN]       (mỗi ngày một lịch riêng)     |
|                                                                          |
| [x] Ngày này nhận đặt (bỏ chọn = ngày nghỉ, lịch không bị xóa)           |
| Giờ mở cửa *    [ 06:00 v ]       Giờ đóng cửa *   [ 22:00 v ]           |
|                                                                          |
| (!) Không lưu được nếu làm đơn Chờ xác nhận/Đã xác nhận của ngày         |
|     này nằm ngoài giờ mở hoặc không khả dụng.                            |
+--------------------------------------------------------------------------+
| XEM TRƯỚC ĐIỀU CHỈNH BẢNG GIÁ (Thứ 6)                                    |
|   Trước:  05:00 -> 60.000 ₫   |   17:00 -> 100.000 ₫                     |
|   Sau:    06:00 -> 60.000 ₫   |   17:00 -> 100.000 ₫                     |
|   Mốc nằm ngoài khoảng mới bị bỏ; thêm mốc tại giờ mở mới với đơn giá    |
|   đang có hiệu lực tại đó (mở sớm hơn: lấy đơn giá mốc đầu tiên cũ).     |
|                                                                          |
| (i) Lịch có hiệu lực từ ngày hiện tại. Giờ mở/đóng ở phút 00 hoặc 30.    |
+--------------------------------------------------------------------------+
| [ Hủy ]                               [ Xem trước ]   [ Xác nhận & lưu ] |
+--------------------------------------------------------------------------+
```

| Thành phần | Quy tắc |
|---|---|
| Tab T2 đến CN | Mỗi sân đúng một lịch cho mỗi ngày trong tuần, cấu hình từng ngày |
| Khả dụng | Bỏ chọn là ngày nghỉ: đánh dấu không khả dụng, không xóa lịch |
| Giờ mở/đóng | Phút 00 hoặc 30, giờ mở nhỏ hơn giờ đóng, không qua nửa đêm |
| Xem trước | Hiển thị điều chỉnh bảng giá đi kèm trước khi lưu |
| Lỗi | Làm đơn Chờ xác nhận/Đã xác nhận nằm ngoài giờ mở hoặc không khả dụng: từ chối. Thay đổi trong ngày hiện tại loại khỏi giờ mở các lượt đã ghi nhận Hoàn thành: từ chối. Giờ không hợp lệ: từ chối |
| Mở rộng giờ | Được phép nếu không ảnh hưởng các đơn hiện có |

### 15.5. Cấu hình bảng giá `M-13` (UC-35)

```text
+--------------------------------------------------------------------------+
| CẤU HÌNH BẢNG GIÁ · Sân A1                                           [X] |
+--------------------------------------------------------------------------+
| [T2] [T3] [T4] [T5] [*T6*] [T7] [CN]     Giờ mở/đóng: 05:00–22:00        |
|                                                                          |
|  #   Từ giờ (mốc bắt đầu)    Đến giờ (tự tính)    Đơn giá (₫/giờ)        |
|  1   [ 05:00 ] (= giờ mở)    17:00                [ 60.000  ]            |
|  2   [ 17:00 v ]             22:00                [ 100.000 ] [Xóa]      |
| [ + Thêm mốc giá ]                                                       |
|                                                                          |
| (!) Mốc giờ phải tăng dần, không trùng, mốc đầu bằng giờ mở cửa.         |
| (!) Đơn giá là số nguyên VND lớn hơn 0; bảng giá không được rỗng.        |
+--------------------------------------------------------------------------+
| XEM TRƯỚC                                                                |
|   05:00–17:00: 60.000 ₫/giờ     17:00–22:00: 100.000 ₫/giờ               |
| (i) Lưu sẽ thay TOÀN BỘ bảng giá hiện hành của ngày này. Giá đã lưu trên |
|     các đặt sân cũ không thay đổi.                                       |
+--------------------------------------------------------------------------+
| [ Hủy ]                                 [ Xem trước ]   [ Lưu bảng giá ] |
+--------------------------------------------------------------------------+
```

| Thành phần | Quy tắc |
|---|---|
| Danh sách mốc | Mỗi dòng gồm **giờ bắt đầu** và **đơn giá theo giờ**. Không lưu giờ kết thúc; cột "Đến giờ" tự tính (mốc kế tiếp hoặc giờ đóng cửa) |
| Mốc đầu | Bằng giờ mở cửa của ngày đó, không sửa được |
| Mốc giờ | Tăng dần, không trùng, nằm trong [giờ mở, giờ đóng) |
| Đơn giá | Số nguyên VND lớn hơn 0 |
| **Xem trước** | Bắt buộc trước khi lưu |
| Lưu | Thay **toàn bộ** bảng giá hiện hành của ngày đó, ghi nhật ký |
| Lỗi | Bảng giá rỗng hoặc không hợp lệ: từ chối, hệ thống không tự sửa |
| Đơn cũ | Tổng tiền và đơn giá đã lưu trên đặt sân cũ **không đổi** |

---

## WF-16: Quản lý nhân viên & Phân quyền

| Mục | Nội dung |
|---|---|
| Mã màn hình | WF-16 Quản lý nhân viên & Phân quyền |
| Use-case | UC-36 Thêm nhân viên; UC-37 Sửa nhân viên; UC-38 Đổi vai trò; UC-27 Khóa/mở khóa; UC-39 Xóa tài khoản |
| Đối tượng | Quản trị viên |
| Route Codebase hiện tại | `/employees` (`src/app/(admin)/employees/page.tsx`) |
| Route Wireframe mục tiêu | `/admin/staff`, `/admin/accounts` |
| Component Codebase | `EmployeesClient.tsx`, `EmployeeFormModal.tsx` |
| Tình trạng Codebase | Đang chạy |
| Điều hướng ra | – |

> **Hiện trạng Codebase & Định hướng hoàn thiện tương lai:**
> - *Codebase hiện tại:* `EmployeeFormModal.tsx` đã cho QTV nhập mật khẩu trực tiếp min 8 ký tự (đã khớp X-06).
> - *Chuẩn Wireframe tương lai:* Nới lỏng regex SĐT 8–15 chữ số (BR-26). Bổ sung ràng buộc bảo vệ không cho khóa, hạ quyền hoặc xóa Quản trị viên Hoạt động duy nhất (BR-27, UC-38). Đã loại bỏ ca làm việc/chấm công (X-04).

### 16.1. Màn hình Quản lý nhân viên

```text
+----------------------------------------------------------------------------------------------------------------------+
| ShuttleVN · Khu quản trị                                                   Nguyễn Thị C · Quản trị viên  [Đăng xuất] |
+----------------------------------------------------------------------------------------------------------------------+
| MENU                     | QUẢN LÝ NHÂN VIÊN                                                    [ + Thêm nhân viên ] |
|                          | [ Tìm theo họ tên, SĐT, email...        ]                                                 |
|   Bảng điều khiển        |                                                                                           |
|   Lịch sân               | Họ tên            SĐT          Email                     Vai trò        Trạng thái        |
|   Yêu cầu đặt sân        | ----------------  -----------  ------------------------  -------------  ----------        |
|   Thanh toán             | Trần Văn B        0911111111   tran.vb@shuttlevn.vn      Nhân viên      ACTIVE            |
|   Quản lý sân            |      [Sửa hồ sơ]                                                                          |
|   Khách hàng             | Nguyễn Thị C      0922222222   nguyen.c@shuttlevn.vn     Quản trị viên  ACTIVE            |
| > Quản lý nhân viên      |      [Sửa hồ sơ]                                                                          |
|   Báo cáo & Thống kê     | Lê Văn F          0933333333   le.f@shuttlevn.vn         Nhân viên      DISABLED          |
|   Nhật ký hoạt động      |      [Sửa hồ sơ]                                                                          |
|   Tài khoản & Phân quyền |                                                                                           |
|                          | (i) Đổi vai trò, khóa/mở khóa và xóa tài khoản ở mục "Tài khoản & Phân quyền".            |
+----------------------------------------------------------------------------------------------------------------------+
```

| Thành phần | Quy tắc |
|---|---|
| Cột | Họ tên, SĐT, Email, Vai trò (Nhân viên / Quản trị viên), Trạng thái tài khoản |
| Chỉ giữ | Họ tên, số điện thoại, email, quyền |
| Không vẽ | Ca làm việc, ngày nghỉ, giờ vào làm, phòng ban, thẻ "Ca làm hôm nay" (đã loại khỏi phạm vi) |
| Sửa hồ sơ | Chỉ sửa họ tên và số điện thoại. Email khóa, không đổi được |
| Rỗng | "Chưa có nhân viên nào." |

### 16.2. Form Thêm nhân viên (UC-36)

```text
+--------------------------------------------------------------------------+
| THÊM NHÂN VIÊN                                                       [X] |
+--------------------------------------------------------------------------+
| Họ và tên *            [ Lê Văn F_____________________ ]                 |
| Số điện thoại *        [ 0933333333___________________ ]                 |
| Email *                [ le.f@shuttlevn.vn_____________ ]                |
|                        Là tên đăng nhập, không đổi được sau khi tạo      |
| Vai trò *              (o) Nhân viên    ( ) Quản trị viên                |
| Mật khẩu ban đầu *     [ ********_____________ ] [Hiện]                  |
|                        8–128 ký tự                                       |
| (!) Email đã là email đăng nhập của tài khoản khác                       |
+--------------------------------------------------------------------------+
| [ Hủy ]                                                [ Tạo tài khoản ] |
+--------------------------------------------------------------------------+
```

| Trường | Bắt buộc | Quy tắc |
|---|---|---|
| Họ và tên | Có | Không rỗng |
| Số điện thoại | Có | 8–15 chữ số, cho phép `+` ở đầu. Không là khóa duy nhất |
| Email | Có | Đúng định dạng, không trùng email đăng nhập của tài khoản khác. Đồng bộ làm email đăng nhập, không đổi sau khi tạo |
| Vai trò | Có | Nhân viên hoặc Quản trị viên |
| Mật khẩu ban đầu | Có | Quản trị viên nhập trực tiếp, 8–128 ký tự |

Một giao dịch tạo hồ sơ nhân viên và tài khoản liên kết một-một, ghi nhật ký. Xung đột đồng thời: hoàn tác, không để lại tài khoản hoặc hồ sơ mồ côi. Tài khoản nội bộ chỉ do Quản trị viên tạo, không có tự đăng ký.

### 16.3. Màn hình Tài khoản & Phân quyền

```text
+----------------------------------------------------------------------------------------------------------------------+
| ShuttleVN · Khu quản trị                                                   Nguyễn Thị C · Quản trị viên  [Đăng xuất] |
+----------------------------------------------------------------------------------------------------------------------+
| MENU                     | TÀI KHOẢN & PHÂN QUYỀN                                                                    |
|                          | [*Nhân viên & Quản trị viên*]  [Khách hàng có tài khoản]                                  |
|   Bảng điều khiển        |                                                                                           |
|   Lịch sân               | Họ tên            Email                   Vai trò          Trạng thái                     |
|   Yêu cầu đặt sân        | ----------------  ----------------------  ---------------  ----------                     |
|   Thanh toán             | Trần Văn B        tran.vb@shuttlevn.vn    Nhân viên        ACTIVE                         |
|   Quản lý sân            |      [Đổi vai trò]  [Khóa]  [Xóa tài khoản]                                               |
|   Khách hàng             | Nguyễn Thị C      nguyen.c@shuttlevn.vn   Quản trị viên    ACTIVE                         |
|   Quản lý nhân viên      |      [Đổi vai trò]  [Khóa]  [Xóa tài khoản]                                               |
|   Báo cáo & Thống kê     | Lê Văn F          le.f@shuttlevn.vn       Nhân viên        DISABLED                       |
|   Nhật ký hoạt động      |      [Đổi vai trò]  [Mở khóa]  [Xóa tài khoản]                                            |
| > Tài khoản & Phân quyền |                                                                                           |
|                          | (!) Không thể khóa, xóa hoặc hạ quyền Quản trị viên đang hoạt động cuối cùng.             |
+----------------------------------------------------------------------------------------------------------------------+
```

| Thành phần | Quy tắc |
|---|---|
| Tab | Nhân viên & Quản trị viên; Khách hàng có tài khoản (khóa/mở khóa/xóa. Không có nút Thêm tài khoản khách, UC-26 hoãn) |
| **Đổi vai trò** | Nhân viên ↔ Quản trị viên. Không chuyển loại hồ sơ Khách ↔ Nhân viên |
| **Khóa / Mở khóa** | Quản trị viên thao tác được mọi loại tài khoản. Chỉ Quản trị viên mở khóa tài khoản nội bộ. Hành vi giống mục 14.4 |
| **Xóa tài khoản** | Mở modal mục 16.4 |
| Bảo vệ Quản trị viên cuối | Không khóa, xóa hoặc hạ quyền Quản trị viên `ACTIVE` cuối cùng. Giao diện hiện cảnh báo và máy chủ từ chối |

```text
+----------------------------------------------------------------------+
| ĐỔI VAI TRÒ · Trần Văn B                                         [X] |
+----------------------------------------------------------------------+
| Vai trò hiện tại: Nhân viên                                          |
|                                                                      |
| Vai trò mới *      ( ) Nhân viên    (o) Quản trị viên                |
|                                                                      |
| (i) Quyền mới có hiệu lực ở các yêu cầu tiếp theo.                   |
| (!) Không hạ quyền được Quản trị viên Hoạt động cuối cùng.           |
+----------------------------------------------------------------------+
| [ Hủy ]                                              [ Lưu vai trò ] |
+----------------------------------------------------------------------+
```

### 16.4. Modal Xóa tài khoản (hard-delete) `M-14` (UC-39)

```text
+--------------------------------------------------------------------------+
| XÓA TÀI KHOẢN (không thể hoàn tác) · Lê Văn F                        [X] |
+--------------------------------------------------------------------------+
| Tài khoản sẽ bị XÓA VĨNH VIỄN và không thể khôi phục hay mở khóa lại.    |
|   - Giữ hồ sơ nhân viên, đặt sân, hóa đơn và nhật ký liên quan.          |
|   - Mã xác minh liên quan bị vô hiệu. Không hủy đặt sân/hóa đơn.         |
|                                                                          |
| (!) Không thể xóa Quản trị viên Hoạt động cuối cùng.                     |
+--------------------------------------------------------------------------+
| [ Hủy ]                                                [ Xóa tài khoản ] |
+--------------------------------------------------------------------------+
```

| Quy tắc | Nội dung |
|---|---|
| Phạm vi | Tài khoản nhân viên, và tài khoản khách theo QT-10 |
| Kết quả | Một giao dịch: vô hiệu mã xác minh liên quan, hard-delete bản ghi tài khoản, hồ sơ giữ lại với liên kết tài khoản để trống, ghi nhật ký |
| Giữ lại | Hồ sơ, mã khách/nhân viên, đặt sân, hóa đơn, nhật ký. Không hủy đặt sân/hóa đơn |
| Khác với khóa | Xóa không có thao tác mở khóa để khôi phục |
| Chặn | Quản trị viên `ACTIVE` cuối cùng: từ chối |

---

## WF-17: Theo dõi đặt sân toàn hệ thống

| Mục | Nội dung |
|---|---|
| Mã màn hình | WF-17 Theo dõi đặt sân toàn hệ thống |
| Use-case | UC-40 Xem đặt sân toàn hệ thống |
| Đối tượng | Quản trị viên |
| Route Codebase hiện tại | *Chưa có route trong codebase* (US-23) |
| Route Wireframe mục tiêu | `/admin/bookings` |
| Component Codebase | *Chưa tạo file* |
| Tình trạng Codebase | Chưa triển khai (thuộc US-23 đang phát triển) |
| Điều hướng ra | Chọn đơn → xem lịch sử trạng thái; xử lý phát sinh ở WF-11 |

> **Hiện trạng Codebase & Định hướng hoàn thiện tương lai:**
> - *Codebase hiện tại:* Chưa có route độc lập trong `src/app/(admin)/`.
> - *Chuẩn Wireframe tương lai:* Xây dựng `/admin/bookings` lọc đa tiêu chí cho QTV: ngày chơi giờ VN (D8), sân, trạng thái đơn, trạng thái thanh toán, xem timeline từng đơn.

### 17.1. Wireframe

```text
+----------------------------------------------------------------------------------------------------------------------+
| ShuttleVN · Khu quản trị                                                   Nguyễn Thị C · Quản trị viên  [Đăng xuất] |
+----------------------------------------------------------------------------------------------------------------------+
| MENU                     | TẤT CẢ ĐẶT SÂN (TOÀN HỆ THỐNG)                                                            |
|                          | [Yêu cầu chờ xác nhận]  [*Tất cả đặt sân*]                                                |
|   Bảng điều khiển        |                                                                                           |
|   Lịch sân               | Từ ngày [ 09/08/2026 ]  Đến ngày [ 14/08/2026 ]  (giờ Việt Nam)                           |
| > Yêu cầu đặt sân        | Sân [ Tất cả v ]  Trạng thái đơn [ Tất cả v ]  Thanh toán [ Tất cả v ]                    |
|   Thanh toán             | Khách hàng [ họ tên / SĐT / email ]                      [Lọc] [Xóa lọc]                  |
|   Quản lý sân            |                                                                                           |
|   Khách hàng             | Mã đơn    Khách       Sân  Ngày giờ           Tổng tiền   Trạng thái    Thanh toán        |
|   Quản lý nhân viên      | --------  ----------  ---  -----------------  ----------  ------------  ----------------  |
|   Báo cáo & Thống kê     | DS-12AB5  Trần Thị B  A2   14/08 18:00-19:30  150.000 ₫   Chờ xác nhận  Chưa lập hóa đơn  |
|   Nhật ký hoạt động      | DS-7K3QP  Lê Văn C    A1   14/08 18:00-19:00  100.000 ₫   Đã xác nhận   Chưa thanh toán   |
|   Tài khoản & Phân quyền | DS-3E5PL  Trần Thị B  A1   11/08 19:00-20:00  100.000 ₫   Hoàn thành    Đã thanh toán     |
|                          | DS-2B6NV  Trần Thị B  A1   09/08 08:00-09:00  60.000 ₫    Đã hủy        —                 |
|                          |                                                                                           |
|                          | Hiển thị 1–4 / 4                                         [<]  1  [>]    Mỗi trang: [20 v] |
|                          |                                                                                           |
|                          | +---------------------------------------------------------------------------------------+ |
|                          | | CHI TIẾT DS-7K3QP · LỊCH SỬ TRẠNG THÁI                                                | |
|                          | | Thời điểm     Chuyển trạng thái               Tác nhân                  Lý do         | |
|                          | | ------------  ------------------------------  ------------------------  ------------- | |
|                          | | 13/08 20:10   (mới) -> Chờ xác nhận           Khách hàng                —             | |
|                          | | 14/08 07:20   Chờ xác nhận -> Đã xác nhận     Nhân viên · Trần Văn B    —             | |
|                          | +---------------------------------------------------------------------------------------+ |
|                          | (i) Chỉ xem. Xử lý phát sinh bằng thao tác ở màn hình chi tiết đặt sân.                   |
+----------------------------------------------------------------------------------------------------------------------+
```

### 17.2. Chi tiết thành phần

| Bộ lọc | Quy tắc |
|---|---|
| Từ ngày – Đến ngày | Theo ngày sử dụng, giờ Việt Nam, gồm cả hai ngày. Từ ngày lớn hơn Đến ngày: báo lỗi, không tải |
| Sân | Danh sách sân, gồm cả sân đã xóa với nhãn "Sân đã xóa #<mã>" |
| Trạng thái đơn | Tất cả, Chờ xác nhận, Đã xác nhận, Hoàn thành, Đã hủy |
| Trạng thái thanh toán | Tất cả, Chưa lập hóa đơn, Chưa thanh toán, Đã thanh toán `[G-23]` |
| Khách hàng | Tìm theo họ tên, SĐT, email |

| Thành phần | Quy tắc |
|---|---|
| Bảng | Mọi đơn trên toàn hệ thống, có phân trang. Cột: Mã đơn, Khách, Sân, Ngày giờ, Tổng tiền, Trạng thái, Thanh toán |
| Chi tiết | Bấm một dòng để mở khung chi tiết kèm **lịch sử trạng thái** (thời điểm, trạng thái cũ → mới, tác nhân, lý do) |
| Phạm vi | Chỉ xem. Xử lý phát sinh bằng thao tác của nhân viên ở WF-11 |
| Rỗng | "Không có đơn đặt sân nào khớp bộ lọc." |
| Đang tải / lỗi | Skeleton / banner lỗi + Thử lại |

---

## WF-18: Báo cáo & Thống kê

| Mục | Nội dung |
|---|---|
| Mã màn hình | WF-18 Báo cáo & Thống kê |
| Use-case | UC-41 Thống kê doanh thu; UC-42 Thống kê đặt sân |
| Đối tượng | Quản trị viên |
| Route Codebase hiện tại | `/statistics` (`src/app/(admin)/statistics/page.tsx`) |
| Route Wireframe mục tiêu | `/admin/reports` |
| Component Codebase | `statistics/page.tsx` |
| Tình trạng Codebase | 100% Placeholder |
| Điều hướng ra | – |

> **Hiện trạng Codebase & Định hướng hoàn thiện tương lai:**
> - *Codebase hiện tại:* File `statistics/page.tsx` hiện chỉ là placeholder thông báo đang phát triển.
> - *Chuẩn Wireframe tương lai:* Xây dựng báo cáo Doanh thu (chỉ cộng hóa đơn Paid, nhóm Ngày/Tháng theo QT-17) và Báo cáo Đặt sân (tách lượt Hoàn thành). Tuyệt đối không có chỉ số "Tỷ lệ lấp đầy" (X-04).

### 18.1. Wireframe

```text
+----------------------------------------------------------------------------------------------------------------------+
| ShuttleVN · Khu quản trị                                                   Nguyễn Thị C · Quản trị viên  [Đăng xuất] |
+----------------------------------------------------------------------------------------------------------------------+
| MENU                     | BÁO CÁO & THỐNG KÊ                                                                        |
|                          | Từ ngày [ 10/08/2026 ]  Đến ngày [ 14/08/2026 ]                                           |
|   Bảng điều khiển        | Nhóm theo [*Ngày*] [Tháng]                                [ Xem báo cáo ]                 |
|   Lịch sân               |                                                                                           |
|   Yêu cầu đặt sân        | DOANH THU (hóa đơn hợp lệ Đã thanh toán, theo thời điểm thu)                              |
|   Thanh toán             | Tổng doanh thu:  5.210.000 ₫                                                              |
|   Quản lý sân            |                                                                                           |
|   Khách hàng             | Ngày      Số HĐ đã thu    Doanh thu                                                       |
|   Quản lý nhân viên      | --------  --------------  --------------                                                  |
| > Báo cáo & Thống kê     | 10/08     6               720.000 ₫                                                       |
|   Nhật ký hoạt động      | 11/08     9               1.080.000 ₫                                                     |
|   Tài khoản & Phân quyền | 12/08     7               840.000 ₫                                                       |
|                          | 13/08     11              1.320.000 ₫                                                     |
|                          | 14/08     10              1.250.000 ₫                                                     |
|                          | Tổng      43              5.210.000 ₫                                                     |
|                          |                                                                                           |
|                          | 10/08 |############## 720.000 ₫                                                           |
|                          | 11/08 |##################### 1.080.000 ₫                                                  |
|                          | 12/08 |################ 840.000 ₫                                                         |
|                          | 13/08 |########################## 1.320.000 ₫                                             |
|                          | 14/08 |######################### 1.250.000 ₫                                              |
|                          |                                                                                           |
|                          | ĐẶT SÂN (theo ngày sử dụng, không tính Đã hủy)                                            |
|                          |                                                                                           |
|                          | Ngày      Lượt đặt    Giờ đặt     Lượt hoàn thành  Giờ hoàn thành                         |
|                          | --------  ----------  ----------  ---------------  ---------------                        |
|                          | 10/08     8           9,5         8                9,5                                    |
|                          | 11/08     12          14,0        12               14,0                                   |
|                          | 12/08     9           10,5        9                10,5                                   |
|                          | 13/08     14          16,5        14               16,5                                   |
|                          | 14/08     13          15,0        6                7,0                                    |
|                          | Tổng      56          65,5        49               57,5                                   |
|                          |                                                                                           |
|                          | (i) Doanh thu kỳ cũ có thể đổi nếu sau đó có hoàn tiền (hóa đơn đã hoàn bị loại).         |
+----------------------------------------------------------------------------------------------------------------------+
```

### 18.2. Chi tiết thành phần

| Thành phần | Quy tắc |
|---|---|
| Từ ngày – Đến ngày | Gồm cả hai ngày theo giờ Việt Nam. Từ ngày lớn hơn Đến ngày: báo lỗi |
| Nhóm theo | **Ngày** hoặc **Tháng** (không có nhóm theo tuần) `[G-24]` |
| **Xem báo cáo** | Tải dữ liệu. Không tự tải lại khi đổi từng ô lọc |
| Doanh thu | Tổng tiền các hóa đơn hợp lệ **Đã thanh toán** có thời điểm thu nằm trong khoảng. Không cộng hóa đơn Đã hủy hoặc bản thay thế chưa thu. Hóa đơn đã hoàn/hủy bị loại kể cả khi thời điểm thu thuộc kỳ cũ, nên số liệu kỳ cũ có thể đổi sau hoàn tiền. Đây không phải báo cáo dòng tiền thu/hoàn |
| Biểu đồ/bảng doanh thu | Theo từng ngày hoặc từng tháng |
| Đặt sân | Đếm lượt và giờ đã đặt theo **ngày sử dụng** (mọi trạng thái trừ Đã hủy), tách riêng lượt/giờ **Hoàn thành**. Hoàn thành gồm cả chốt tự động của hệ thống, không là bằng chứng khách có mặt |
| Sân đã xóa | Giao dịch cũ vẫn được tính, hiển thị nhãn lịch sử |
| Không vẽ | Tỉ lệ lấp đầy, tab "Tình trạng sân", so sánh kỳ trước, lọc theo sân, xuất PDF/Excel |

| Trạng thái | Hiển thị |
|---|---|
| Chưa bấm Xem báo cáo | Gợi ý "Chọn khoảng thời gian rồi bấm Xem báo cáo." |
| Đang tải | Skeleton biểu đồ và bảng |
| Không có dữ liệu | "Không có dữ liệu trong khoảng đã chọn." Tổng bằng 0 |
| Lỗi | Banner lỗi (ví dụ từ ngày lớn hơn đến ngày) |

---

## WF-19: Nhật ký hoạt động

| Mục | Nội dung |
|---|---|
| Mã màn hình | WF-19 Nhật ký hoạt động |
| Use-case | UC-43 Xem nhật ký hoạt động |
| Đối tượng | Quản trị viên |
| Route Codebase hiện tại | `/audits` (`src/app/(admin)/audits/page.tsx`) |
| Route Wireframe mục tiêu | `/admin/audit-log` |
| Component Codebase | `audits/page.tsx` |
| Tình trạng Codebase | 100% Placeholder |
| Điều hướng ra | – |

> **Hiện trạng Codebase & Định hướng hoàn thiện tương lai:**
> - *Codebase hiện tại:* File `audits/page.tsx` hiện chỉ là placeholder thông báo đang phát triển.
> - *Chuẩn Wireframe tương lai:* Xây dựng bảng audit bất biến, chỉ đọc, không cột lý do (BR-14), hiển thị giá trị Trước/Sau. Loại bỏ hoàn toàn cảnh báo phần cứng/CPU/sao lưu (X-04).

### 19.1. Wireframe

```text
+----------------------------------------------------------------------------------------------------------------------+
| ShuttleVN · Khu quản trị                                                   Nguyễn Thị C · Quản trị viên  [Đăng xuất] |
+----------------------------------------------------------------------------------------------------------------------+
| MENU                     | NHẬT KÝ HOẠT ĐỘNG                                                                         |
|                          |                                                                                           |
|   Bảng điều khiển        | Từ ngày [ 14/08/2026 ]  Đến ngày [ 14/08/2026 ]  Tác nhân [ Tất cả v ]                    |
|   Lịch sân               | Đối tượng [ Tất cả v ]  Thao tác [ Tất cả v ]                     [Lọc] [Xóa lọc]         |
|   Yêu cầu đặt sân        |                                                                                           |
|   Thanh toán             | Thời điểm UTC+7   Tác nhân                Thao tác            Đối tượng                   |
|   Quản lý sân            | ----------------  ----------------------  ------------------  ------------------------    |
|   Khách hàng             | 14/08/2026 07:40  Quản trị · Nguyễn C     Sửa bảng giá        Sân A1 · Thứ 6              |
|   Quản lý nhân viên      |     Trước: 17:00 -> 90.000 ₫/giờ        Sau: 17:00 -> 100.000 ₫/giờ                       |
|   Báo cáo & Thống kê     | 14/08/2026 07:30  Nhân viên · Trần Văn B  Đổi lịch đặt sân    Đặt sân DS-7K3QP            |
| > Nhật ký hoạt động      |     Trước: A1 · 17:00–18:00             Sau: A1 · 18:00–19:00                             |
|   Tài khoản & Phân quyền | 14/08/2026 07:20  Nhân viên · Trần Văn B  Lập hóa đơn         Hóa đơn HD-20260814-001     |
|                          |     Trước: (chưa có)                    Sau: Chưa thanh toán · 100.000 ₫                  |
|                          | 14/08/2026 07:20  Nhân viên · Trần Văn B  Xác nhận đặt sân    Đặt sân DS-7K3QP            |
|                          |     Trước: Chờ xác nhận                 Sau: Đã xác nhận                                  |
|                          | 14/08/2026 00:00  Hệ thống                Chốt đơn qua ngày   Đặt sân DS-9X1AB            |
|                          |     Trước: Đã xác nhận                  Sau: Hoàn thành                                   |
|                          |                                                                                           |
|                          | Hiển thị 1–5 / 38                                        [<]  1  [>]    Mỗi trang: [20 v] |
|                          |                                                                                           |
|                          | (i) Bảng chỉ đọc, bất biến. Không có thao tác thêm/sửa/xóa và không có cột lý do.         |
+----------------------------------------------------------------------------------------------------------------------+
```

### 19.2. Chi tiết thành phần

| Thành phần | Quy tắc |
|---|---|
| Cột | Thời điểm (UTC+7), Tác nhân (Hệ thống / Nhân viên / Khách hàng), Thao tác, Đối tượng |
| Dữ liệu Trước/Sau | Hiển thị ngay trong bảng, ở dòng phụ bên dưới mỗi bản ghi: giá trị trước và sau thay đổi |
| Bộ lọc | Thời gian (từ – đến), Tác nhân, Đối tượng, Thao tác. Từ ngày lớn hơn Đến ngày: báo lỗi |
| Phân trang | Mặc định 20 dòng/trang |
| **Chỉ đọc, bất biến** | Không có nút tạo, sửa, xóa. **Không có cột lý do** |
| Nội dung | Không hiển thị mật khẩu, mã xác minh, mã phiên hay giá trị băm của chúng |
| Không vẽ | Cột IP, sự kiện đăng nhập thường, cảnh báo phần cứng/CPU/sao lưu, xuất CSV `[G-25]` |

| Trạng thái | Hiển thị |
|---|---|
| Đang tải | Skeleton các dòng |
| Rỗng | "Không có bản ghi nào khớp bộ lọc." |
| Lỗi tải | Banner lỗi + Thử lại |

---

## Ghi chú đối chiếu và giả định

Nguyên tắc: SRS 1.7 và UC 1.5 là nguồn chuẩn. Khi yêu cầu thiết kế có điểm chưa khớp hoặc chưa có trong SRS/UC, wireframe vẫn vẽ theo yêu cầu và **gắn nhãn** để bạn quyết định.

| Mã | Nội dung | Cách xử lý trong wireframe |
|---|---|---|
| G-01 | Kích thước và mặt sân ở lưới sân (dữ liệu loại sân/mặt sân đang là mục chưa chốt O-01 trong User-Flows) | Vẽ theo yêu cầu. Nếu bỏ: chỉ hiển thị tên sân + badge trạng thái |
| G-02 | Tab Đổi mật khẩu chưa có use-case (O-06) | Vẽ và đánh dấu TẠM ẨN |
| G-03 | Header của khách chưa đăng nhập có hiện "Lịch sử đặt sân" hay không | Ẩn, vì lịch sử chỉ dành cho khách thành viên. Dễ đổi thành hiện và dẫn tới Đăng nhập nếu bạn muốn |
| G-04 | "05:00–22:00" là khung mẫu. Quy tắc thật là giờ mở cửa cấu hình theo từng sân, từng ngày trong tuần | Lưới lấy cột theo giờ mở cửa thực tế |
| G-05 | Nhãn thanh toán cho đơn Đã hủy chưa được SRS nêu | Hiển thị "—" |
| G-06 | Số hotline chưa có trong SRS/UC | Dùng placeholder `{Hotline}` |
| G-07 | Trường Xác nhận mật khẩu mới ở Quên mật khẩu chưa có trong UC-04 | Thêm theo cách đã làm ở Đăng ký (chỉ kiểm tra ở giao diện). Bỏ được nếu muốn bám sát UC |
| G-08 | Báo "email đã có tài khoản" lúc đăng ký (BR-11) với yêu cầu không tiết lộ tài khoản tồn tại ở luồng gửi mã công khai (BR-26) | Vẽ banner dẫn tới Đăng nhập/Quên mật khẩu theo BR-11. Cần xác nhận thời điểm báo (trước hay sau khi xác minh OTP) |
| G-09 | Khung "Chi tiết đơn" ở Lịch sử chưa có trong mockup HTML | Thêm khung chi tiết gọn, chỉ gồm thông tin đã có trên thẻ |
| G-10 | Thay thế mockup HTML cũ bằng mã nguồn Next.js thực tế | 17 file HTML mockup cũ (UI-MockUp) là bản phác thảo ban đầu; tài liệu wireframe đã được đồng bộ chuẩn hóa trực tiếp với mã nguồn React/Next.js trong `shuttle-vn-frontend/src` và SRS 1.7 |
| G-11 | Widget AI hiện trên các trang Cổng Khách hàng, ẩn ở Cổng Quản trị; giới hạn độ dài câu hỏi chưa quy định | Giả định: widget hiện ở mọi trang Cổng Khách hàng và ẩn ở Cổng Quản trị |
| G-12 | Ô "Đặt của bạn" trên lưới có bấm được không | Không bấm được, chỉ tooltip |
| G-13 | Sân Bảo trì/Đóng hiển thị thế nào trên lưới khi chú giải chỉ có 4 trạng thái | Cả hàng hiện ô Đóng cửa + badge trạng thái sân trên nhãn hàng |
| G-14 | Bảng điều khiển không có use-case trong SRS/UC (O-05). Tiêu chí "đơn cần xử lý gấp" chưa được định nghĩa | Vẽ đúng 3 chỉ số và danh sách theo yêu cầu. "Gấp" = đơn Chờ xác nhận có giờ chơi gần nhất (đề xuất). Không vẽ biểu đồ, chuông, xuất báo cáo, tỷ lệ lấp đầy |
| G-15 | Nút Đăng xuất ở Topbar chưa có use-case (D-21). Trang đích của nhân viên sau đăng nhập đã được bạn chốt là Yêu cầu đặt sân (đóng O-03 i) | Vẽ nút Đăng xuất theo yêu cầu. Nhân viên vào `/admin/booking-requests` |
| G-16 | Yêu cầu WF-11 chỉ liệt kê 4 modal. Hủy theo yêu cầu khách và Đổi lịch thay khách (NV-11, UC-09, UC-10, F-NV-04) không nằm trong danh sách đó | Vẽ thêm, vì khách vãng lai chỉ hủy/đổi được qua nhân viên. Nếu muốn giữ đúng 4 modal thì bỏ mục 11.7 |
| G-17 | Hoàn tiền M-11 được yêu cầu đặt ở WF-13, nhưng theo luồng F-NV-07 phần D nó là bước trong giao dịch hủy/đổi lịch đơn đã thanh toán, không phải nút độc lập trên danh sách hóa đơn | Vẽ modal ở WF-13 như yêu cầu, ghi rõ mở từ WF-11 |
| G-18 | "Xác nhận tạo đơn ngay" ở modal Tạo lịch đặt thay khách | Hiểu là gửi tạo đơn ngay không qua OTP. Đơn tạo ra ở Chờ xác nhận (BR-20, F-NV-09), không tự xác nhận. Chỉ tạo trước giờ bắt đầu |
| G-19 | Nhân viên có sửa họ tên/SĐT khách hay chỉ tra cứu và khóa/mở khóa (O-03 ii: UC-24 cho sửa, mô tả menu X-02 thì không) | Chỉ vẽ tra cứu, xem lịch sử, khóa/mở khóa như yêu cầu. Modal sửa khách chưa vẽ (không đổi email, BR-18) |
| G-20 | Khách vãng lai không có tài khoản | Cột trạng thái "—", không có nút Khóa/Mở khóa |
| G-21 | Mockup có thẻ số liệu, xuất Excel/PDF/CSV, ghi chú nội bộ của khách, đặt lại mật khẩu bởi quản trị (O-01 b) | Không vẽ, vì yêu cầu thiết kế không liệt kê và SRS/UC chưa có |
| G-22 | Hai mục menu "Quản lý nhân viên" và "Tài khoản & Phân quyền" | Tách hai màn hình: hồ sơ nhân viên (thêm/sửa) và tài khoản (vai trò, khóa/mở khóa, xóa) |
| G-23 | Menu quản trị viên không có mục riêng cho đặt sân toàn hệ thống. UC-40 lọc theo ngày, sân, trạng thái, khách hàng, còn yêu cầu có thêm "trạng thái thanh toán" | WF-17 đặt thành tab "Tất cả đặt sân" trong Yêu cầu đặt sân (chỉ Quản trị viên). Giữ bộ lọc thanh toán theo yêu cầu |
| G-24 | Mockup thống kê có nhóm theo tuần, so sánh kỳ trước, lọc theo sân, tab Tình trạng sân (O-01 b) | Chỉ vẽ nhóm theo Ngày/Tháng (QT-17) |
| G-25 | Nhật ký ở mockup có cột IP, sự kiện đăng nhập, cảnh báo hệ thống | Không vẽ (X-04, O-01 b) |
| G-26 | Tra cứu nhanh theo mã đặt sân/SĐT/email (UC-30, M-12) chưa có màn hình riêng | Thanh tìm kiếm WF-14 phủ tìm khách. Tìm theo mã đặt sân chưa vẽ |
| G-27 | SRS chưa nêu giới hạn cho thời điểm thu và thời điểm hoàn tiền | Đề xuất đã áp dụng: thời điểm thu (Xác nhận đặt sân, Ghi nhận hoàn thành, Thu tiền) không sau thời điểm hiện tại của máy chủ. Thời điểm hoàn không sau thời điểm hiện tại và không trước thời điểm thu của hóa đơn gốc. Máy chủ kiểm tra, nên bổ sung vào SRS |
| G-28 | Nút "Xác nhận đã thu" ở thẻ Hóa đơn của WF-11 có trong mockup nhưng chưa có xử lý (D-09) | Vẽ nút mở cùng modal Thu tiền của WF-13 |


---

## Bảng tổng hợp đối chiếu Hiện trạng Codebase (Codebase Reality)

| Mã WF | Màn hình | File Codebase (`src/app/` & `components/`) | Hiện trạng đang chạy | Khoảng cách cần refactor lên Chuẩn Wireframe |
|---|---|---|---|---|
| WF-01 | Đăng ký | `register/page.tsx`, `RegisterForm.tsx` | Form chạy được | Tách Modal OTP 6 ô rời (M-01); nâng mật khẩu lên 8–128 ký tự (BR-11) |
| WF-02 | Đăng nhập | `login/page.tsx`, `LoginForm.tsx`, `useAuth.ts` | Form chạy được | Nâng mật khẩu lên 8-128; sửa redirect sau login cho Employee (X-02); link Quên MK trỏ `/forgot-password` |
| WF-03 | Quên MK | *Chưa có file* | Chưa có trang | Xây dựng trang `/forgot-password` luồng 3 bước (Email -> OTP -> Mật khẩu mới) |
| WF-04 | Đặt sân | `courts/page.tsx`, `CourtGrid.tsx`, `SlotPopup.tsx` | Chạy lưới sân | Thêm mốc 30p (BR-20); bắt buộc email + OTP cho khách đặt nhanh (X-01, X-07); kết nối popup sang xác nhận đơn |
| WF-05 | Lịch sử | `my-bookings/page.tsx`, `BookingHistoryList.tsx` | Chạy danh sách | Bỏ nút Hóa đơn (D-13); nhãn thanh toán đơn Pending là "Chưa lập hóa đơn" (D-12); gắn modal Chi tiết, Hủy, Đổi lịch |
| WF-06 | Tra cứu | `lookup/page.tsx`, `BookingLookupForm.tsx` | Chạy tra cứu | Bắt buộc nhập CẶP Mã đơn + SĐT/Email (X-03); xóa nút DEMO; che bớt tên khách |
| WF-07 | Hồ sơ | `profile/page.tsx`, `ProfileInfoForm.tsx` | Chạy hồ sơ | Nới lỏng regex SĐT 8–15 số (BR-26); giữ email disabled; không đưa quản lý phiên/thiết bị vào UI (X-04) |
| WF-08 | Trợ lý AI | `api/chat/route.ts` (backend) | Có backend API | Xây dựng component giao diện `ChatWidget.tsx` ở góc phải Cổng Khách hàng |
| WF-09 | Dashboard | `dashboard/page.tsx`, `DashboardStats.tsx` | Chạy dashboard | Xóa thẻ "Tỷ lệ lấp đầy" (X-04); giữ 3 chỉ số cốt lõi và danh sách đơn cần xử lý gấp |
| WF-10 | Yêu cầu đặt | *Chưa có file* (US-11) | Chưa có trang | Xây dựng `/admin/booking-requests` sắp xếp đơn Pending cũ nhất trước (NV-03) |
| WF-11 | Xử lý đơn | *Chưa có file* (US-12) | Chưa có trang | Xây dựng `/admin/bookings/[id]` timeline trạng thái có lý do (BR-13) và các modal xử lý |
| WF-12 | Lịch sân | `schedule/page.tsx`, `ScheduleClient.tsx` | Chạy timeline | Thêm nút và modal Đặt tại quầy không cần OTP (X-05) và thao tác nhanh đổi trạng thái sân |
| WF-13 | Thanh toán | `payments/page.tsx` | Placeholder | Xây dựng bảng hóa đơn, modal thu tiền, modal hoàn tiền; không có nút lập hóa đơn thủ công (D-07) |
| WF-14 | Khách hàng | `customers/page.tsx`, `CustomersClient.tsx` | Chạy bảng | Thêm tìm kiếm nhanh (UC-30); gắn handler khóa/mở khóa reset counter sai về 0 (BR-12) |
| WF-15 | Quản lý sân| `manage-courts/page.tsx`, `PricingTimeline.tsx` | Chạy thẻ & timeline | Bổ sung xem trước cấu hình sân (BR-25); ràng buộc xóa mềm khi hết đơn (BR-15) |
| WF-16 | Nhân viên | `employees/page.tsx`, `EmployeeFormModal.tsx` | Chạy form & bảng | Nới lỏng regex SĐT 8-15 số; bảo vệ QTV Hoạt động cuối cùng (BR-27); bỏ ca làm việc/chấm công (X-04) |
| WF-17 | Toàn HT | *Chưa có file* (US-23) | Chưa có trang | Xây dựng `/admin/bookings` lọc đa tiêu chí cho QTV (UC-40) |
| WF-18 | Thống kê | `statistics/page.tsx` | Placeholder | Xây dựng báo cáo Doanh thu (hóa đơn Paid, nhóm Ngày/Tháng theo QT-17) và Đặt sân; bỏ Tỷ lệ lấp đầy (X-04) |
| WF-19 | Nhật ký | `audits/page.tsx` | Placeholder | Xây dựng bảng audit bất biến, chỉ đọc, không cột lý do (BR-14), hiển thị giá trị Trước/Sau |
