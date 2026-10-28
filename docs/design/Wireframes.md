# WIREFRAMES HỆ THỐNG ĐẶT SÂN CẦU LÔNG (SHUTTLEVN)
### Đặc tả Wireframe đã đối chiếu với SRS/UseCase và mã nguồn hiện tại

**Khu vực 1: Cổng Khách hàng (WF-01 đến WF-08) và Khu vực 2: Cổng Quản trị & Nhân viên (WF-09 đến WF-19)**

| Mục | Nội dung |
|---|---|
| Căn cứ nghiệp vụ | SRS 1.7 và UseCase 1.5 (nguồn chuẩn duy nhất), User-Flows.md |
| Căn cứ giao diện | Mã nguồn `shuttle-vn-frontend/src` (Next.js App Router, React, Tailwind CSS) và `docs/design/Design-System.md` |
| Căn cứ API | Các controller của `ShuttleVNBackend` (kiểm tra khả năng đáp ứng của từng màn hình) |
| Phạm vi tài liệu | 19 màn hình WF-01 đến WF-19 |
| Định dạng | ASCII wireframe + bảng đối chiếu Hiện trạng Codebase & Chuẩn mục tiêu |
| Quy ước route | Thư mục `(auth)`, `(customer)`, `(admin)` là route group, **không tạo tiền tố URL**. Route mục tiêu của Cổng Quản trị vì vậy không có `/admin/...` (ví dụ `/booking-requests`, không phải `/booking-requests`) |
| Nhãn đối chiếu | `[G-xx]` là điểm đối chiếu/giả định được tổng hợp ở mục cuối tài liệu |

### Danh sách 19 màn hình & Đối chiếu Codebase

| Mã | Màn hình | Đối tượng | Route (hiện có / sẽ tạo) | Tình trạng Codebase hiện tại |
|---|---|---|---|---|
| WF-01 | Đăng ký tài khoản | Khách vãng lai | `/register` | Đang chạy (`RegisterForm.tsx`): mã xác thực nhập inline + nút lấy mã, mật khẩu tối thiểu 6 ký tự. Trang auth là thẻ giữa màn hình, không có header/footer |
| WF-02 | Đăng nhập | Mọi tài khoản | `/login` | Đang chạy (`LoginForm.tsx`, `useAuth.ts`): khách → `/courts`, Nhân viên và Quản trị viên đều → `/dashboard`. Link "Quên mật khẩu?" trỏ `#` |
| WF-03 | Quên mật khẩu | Khách thành viên | `/forgot-password` (sẽ tạo) | Chưa có route. API `POST /auth/issue-code` và `POST /auth/reset-password` đã có |
| WF-04 | Đặt sân & Lưới sân | Khách vãng lai, thành viên | `/courts` (lưới) → `/booking` (thành viên) hoặc `/booking/guest` (vãng lai) | Đang chạy: `CourtsClient.tsx`, `CourtGrid.tsx`, `SlotPopup.tsx` (mốc 60–180 phút, giá xem trước từ máy chủ), `ReservationForm.tsx`. Chưa có bảng đơn giá; khách vãng lai nhập mã xác thực inline |
| WF-05 | Lịch sử đặt sân | Khách thành viên | `/my-bookings` | Đang chạy: `BookingHistoryList.tsx`, `BookingCard.tsx`, `BookingListToolBar.tsx`, 10 đơn/trang. Có Chi tiết (modal), Hóa đơn, Hủy đặt (xác nhận bằng hộp thoại trình duyệt). Chưa có Đổi lịch |
| WF-06 | Tra cứu đơn đặt sân | Khách vãng lai, thành viên | `/lookup` | Đang chạy (`LookupClient.tsx`, `BookingLookupForm.tsx`, `BookingLookupResult.tsx`): có nút DEMO, ô liên hệ chưa bắt buộc, hotline `1900 1234` gắn cứng |
| WF-07 | Hồ sơ cá nhân | Khách thành viên | `/profile` | Đang chạy (`ProfileClient.tsx`): cột trái `ProfileSidebar` (avatar, thống kê), cột phải 2 tab "Thông tin" và "Bảo mật" (đổi mật khẩu, `PUT /profile/change-password`). Email khóa; SĐT validate 10 số |
| WF-08 | Widget Trợ lý AI | Khách vãng lai, thành viên | Widget nổi | Có API route `/api/chat`; chưa có component giao diện |
| WF-09 | Bảng điều khiển | Quản trị viên | `/dashboard` | Đang chạy (`DashboardClient.tsx`): 4 thẻ số liệu (còn "Tỷ lệ lấp đầy"), `RevenueChart`, danh sách Chờ xác nhận, bảng Đặt sân gần đây |
| WF-10 | Tiếp nhận yêu cầu đặt sân | Nhân viên, Quản trị viên | `/booking-requests` (sẽ tạo) | Chưa có route FE. API `GET /booking-requests`, `POST /booking-requests/{id}/confirm|reject|complete` đã có |
| WF-11 | Chi tiết đặt sân & Xử lý đơn | Nhân viên, Quản trị viên | `/bookings/[id]` (sẽ tạo) | Chưa có route FE. API `GET /booking-requests/{id}`, `GET /bookings/{id}`, `PATCH /bookings/{id}/cancel` đã có; chưa có API đổi lịch |
| WF-12 | Quản lý lịch sân & Đặt tại quầy | Nhân viên, Quản trị viên | `/schedule` | Đang chạy (`ScheduleClient.tsx`): timeline ngang 05:00–22:00, mỗi sân một hàng, chỉ có chọn ngày. Ô đã đặt chỉ đọc; chưa có Đặt tại quầy |
| WF-13 | Quản lý thanh toán & Hóa đơn | Nhân viên, Quản trị viên | `/payments` | Placeholder (`payments/page.tsx` chỉ bọc RoleGuard). Chỉ có `GET /bookings/{id}/invoice`; chưa có API thu tiền/hoàn tiền |
| WF-14 | Quản lý khách hàng | Nhân viên, Quản trị viên | `/customers` | Đang chạy bảng (`CustomersClient.tsx`: Khách hàng, Liên hệ, Loại, Ngày đăng ký, Chi tiết). Chưa có ô tìm kiếm; nút Thêm khách/Chi tiết chưa gắn handler. API `/accounts/customers` và `/accounts/{id}/lock|unlock` đã có |
| WF-15 | Quản lý sân & Bảng giá | Quản trị viên | `/manage-courts` | Đang chạy: `CourtStats`, chuyển Thẻ/Danh sách, `CourtFormModal`, `CourtStatusModal`, `CourtOperationsModal` (lịch tuần + `PricingTimeline`) |
| WF-16 | Quản lý nhân viên & Phân quyền | Quản trị viên | `/employees` | Đang chạy (`EmployeesClient.tsx`, `EmployeeFormModal.tsx`): 3 thẻ số liệu, lọc, bảng, Sửa, Khóa/Mở khóa, Xóa. API `/employees` đầy đủ |
| WF-17 | Theo dõi đặt sân toàn hệ thống | Quản trị viên | `/bookings` (sẽ tạo) | Chưa có route FE. API `GET /bookings` đã có |
| WF-18 | Báo cáo & Thống kê | Quản trị viên | `/statistics` | Placeholder. API mới có `GET /admin/statistics/court-usage` |
| WF-19 | Nhật ký hoạt động | Quản trị viên | `/audits` | Placeholder. API `GET /audits` đã có |

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
6. **Wireframe vẽ cấu trúc và luồng, không vẽ màu.** Màu, font, khoảng cách theo `Design-System.md` (mục 0.4). Màn hình đã có trong codebase giữ nguyên bố cục hiện tại; phần khác biệt so với code được ghi ở khung "Hiện trạng Codebase & Định hướng" của từng màn hình.

### 0.2. Thành phần chung của Cổng Khách hàng

**Header (`CustomerNav.tsx`).** CổngCổng Khách hàng có footer `© ShuttleVN` kèm hotline lấy từ cấu hình `[G-06]`; hotline cũng hiển thị ở WF-06. Trang đăng ký/đăng nhập/quên mật khẩu (nhóm `(auth)`) không có header, chỉ có thẻ ở giữa nền xám nhạt.

Khách chưa đăng nhập: Đặt sân (`/courts`), Tra cứu đơn (`/lookup`), Đăng nhập, Đăng ký. Mục "Lịch sử đặt sân" chỉ dành cho khách thành viên nên được ẩn với khách vãng lai `[G-03]`.

```text
+--------------------------------------------------------------------------------------------------+
| [ShuttleVN]   *Đặt sân*   Tra cứu đơn                                      [Đăng nhập] [Đăng ký] |
+--------------------------------------------------------------------------------------------------+
| (nội dung trang)                                                                                 |
+--------------------------------------------------------------------------------------------------+
```

Khách thành viên đã đăng nhập: Đặt sân, Lịch sử đặt sân (`/my-bookings`), Tra cứu đơn và Avatar menu.

```text
+--------------------------------------------------------------------------------------------------+
| [ShuttleVN]   Đặt sân   *Lịch sử đặt sân*   Tra cứu đơn                    (NA) Nguyễn Văn A [v] |
+--------------------------------------------------------------------------------------------------+
| (nội dung trang)                                                                                 |
+--------------------------------------------------------------------------------------------------+
```

**Avatar menu** (`UserMenu.tsx`, mở khi bấm tên/avatar):

```text
                                                                      +------------------------+
                                                                      | Hồ sơ cá nhân          |
                                                                      | Lịch sử đặt sân        |
                                                                      +------------------------+
                                                                      | Đăng xuất              |
                                                                      +------------------------+
```

| Thành phần chung | Quy ước giao diện |
|---|---|
| Header | Cố định trên cùng. Mục đang xem được đánh dấu. Trên màn hình hẹp, các mục gộp vào nút menu |
| Toast | Thư viện `sonner`. Thành công (xanh), lỗi (đỏ). Lỗi nghiệp vụ nghiêm trọng dùng banner trong trang hoặc modal, không dùng toast |
| Loading | Skeleton cho danh sách/lưới. Nút gửi đổi sang trạng thái "Đang xử lý..." và bị vô hiệu để tránh gửi 2 lần |
| Lỗi mạng / máy chủ | Banner "Không thể kết nối. Vui lòng thử lại." + nút Thử lại. Dữ liệu người dùng đã nhập được giữ nguyên |
| Phiên hết hạn | Phản hồi 401 → xóa phiên và chuyển về Đăng nhập (`axios.ts`) |
| Tài khoản bị khóa giữa phiên | Đăng xuất bắt buộc và hiển thị thông báo tài khoản bị khóa (xem WF-02) |
| Trợ lý AI | Nút chat nổi góc dưới phải trên mọi trang của Cổng Khách hàng (WF-08) |

### 0.3. Thành phần chung của Cổng Quản trị & Vận hành

Bố cục hiện có (`(admin)/layout.tsx`): **Sidebar cố định bên trái (`AdminSidebar.tsx`, rộng 220px, nền `#FBFBFA`, logo `ShuttleVN` + nhãn `Admin`)** và bên phải là **Topbar 52px (`AdminHeader.tsx`)** gồm tiêu đề trang ở bên trái và vùng nút hành động của trang. Menu chia 3 nhóm có nhãn, mục đang xem tô nền xanh nhạt.

- **Hiện trạng Codebase:** Sidebar đang cố định 8 liên kết cho mọi vai trò: *Tổng quan* (Bảng điều khiển `/dashboard`, Thống kê `/statistics`), *Vận hành* (Lịch sân `/schedule`, Thanh toán `/payments`, Quản lý sân `/manage-courts`), *Quản trị* (Khách hàng `/customers`, Nhân viên `/employees`, Nhật ký hoạt động `/audits`). Topbar chưa có tên người dùng và nút Đăng xuất.
- **Chuẩn mục tiêu (X-02, SRS 2.2):** Giữ nguyên bố cục, nhóm và icon Material Symbols; hiển thị menu theo vai trò; thêm vào bên phải Topbar tên người dùng, vai trò và nút Đăng xuất `[G-15]`.

| Nhóm | Mục menu (route) | Nhân viên | Quản trị viên |
|---|---|---|---|
| Tổng quan | Bảng điều khiển (`/dashboard`) | – | Có |
| Tổng quan | Thống kê (`/statistics`) | – | Có |
| Vận hành | Lịch sân (`/schedule`) | Có | Có |
| Vận hành | Yêu cầu đặt sân (`/booking-requests`) | Có | Có |
| Vận hành | Thanh toán (`/payments`) | Có | Có |
| Vận hành | Quản lý sân (`/manage-courts`) | – | Có |
| Quản trị | Khách hàng (`/customers`) | Có | Có |
| Quản trị | Nhân viên (`/employees`) | – | Có |
| Quản trị | Đặt sân toàn hệ thống (`/bookings`) | – | Có |
| Quản trị | Nhật ký hoạt động (`/audits`) | – | Có |

Nhân viên thấy 4 mục, Quản trị viên thấy 10 mục. Nút hành động của trang (ví dụ `+ Thêm nhân viên`, `+ Thêm sân mới`) nằm ở vùng hành động bên phải Topbar trong code; các wireframe vẽ nút này ở dòng đầu vùng làm việc cho gọn. Chi tiết đơn (`/bookings/[id]`) mở từ Yêu cầu đặt sân, Lịch sân hoặc Đặt sân toàn hệ thống nên không có mục menu riêng.

```text
+--------------------------+----------------------------------------------------------------------------------------+
| ShuttleVN         [Admin]| [Tiêu đề trang hiện tại]                         Trần Văn B · Nhân viên  [Đăng xuất]   |
+--------------------------+----------------------------------------------------------------------------------------+
| VẬN HÀNH                 | (Nội dung màn hình quản trị / vận hành)                                                |
|   Lịch sân               |                                                                                        |
| > Yêu cầu đặt sân        |                                                                                        |
|   Thanh toán             |                                                                                        |
| QUẢN TRỊ                 |                                                                                        |
|   Khách hàng             |                                                                                        |
+--------------------------+----------------------------------------------------------------------------------------+
```

Khung trên là của Nhân viên: nhóm không còn mục nào (Tổng quan) thì ẩn cả nhãn nhóm.

### 0.4. Quy ước giao diện áp dụng cho mọi màn hình (theo Design-System)

| Hạng mục | Quy ước |
|---|---|
| Phong cách | Chuẩn hướng tới (Design-System), tối giản kiểu Notion: nền `#FBFBFA`, viền `#EAEAEA`, chữ chính `#2F3437`, chữ phụ `#787774`, màu nhấn xanh lá `#346538` / nền nhạt `#EDF3EC` |
| Nút chính | Nền `#111111`, chữ trắng (Cổng Quản trị mới, ví dụ `CourtOperationsModal`); form khách hiện có đang dùng nút xanh emerald. Thống nhất theo Design-System khi refactor. Nút phụ viền xám, nút nguy hiểm màu đỏ |
| Icon | Material Symbols |
| Thẻ/Bảng | Thẻ nền trắng viền `#EAEAEA`, bo `rounded-xl`; bảng tiêu đề cột chữ mono viết hoa cỡ nhỏ |
| Badge trạng thái | Luôn có chữ. Đơn: Chờ xác nhận / Đã xác nhận / Hoàn thành / Đã hủy. Sân: Hoạt động / Bảo trì / Đóng |
| Modal | Lớp phủ tối mờ, đóng bằng nút X hoặc Hủy; hành động xóa/hủy dùng hộp xác nhận (`ConfirmDialog`) |
| Lưới thời gian | Mỗi sân một hàng, cột là giờ (cuộn ngang), dùng chung cho `/courts` và `/schedule` |

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
|                                                                                                  |
|                                       (icon) ShuttleVN                                           |
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
| Điều hướng ra | Khách thành viên → `/courts` . Nhân viên → Yêu cầu đặt sân (`/booking-requests`) hoặc Lịch sân. Quản trị viên → Bảng điều khiển (`/dashboard`). Link "Quên mật khẩu?" → `/forgot-password`. Link "Đăng ký ngay" → `/register` |

> **Hiện trạng Codebase & Định hướng hoàn thiện tương lai:**
> - *Codebase hiện tại:* `LoginForm.tsx` mật khẩu validate `min(6)`, link Quên MK trỏ `#`. `useAuth.ts` đang chuyển khách → `/courts`, còn cả Nhân viên lẫn Quản trị viên → `/dashboard`.
> - *Chuẩn Wireframe tương lai:* Nâng mật khẩu lên `8–128 ký tự`. Gắn link Quên MK trỏ `/forgot-password`. Phân luồng chuyển hướng sau login theo vai trò (X-02): Employee vào trang vận hành (không vào dashboard). Hiển thị banner khóa sau 5 lần sai (BR-12).

### 2.1. Wireframe

```text
+--------------------------------------------------------------------------------------------------+
|                                                                                                  |
|                                       (icon) ShuttleVN                                           |
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

Bố cục trang (nền xám nhạt, logo, thẻ căn giữa, không có header/footer) giống WF-02. Dưới đây chỉ vẽ phần thẻ ở từng bước.

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
| Route Codebase hiện tại | `/courts` (lưới), `/booking` (xác nhận, thành viên), `/booking/guest` (xác nhận, vãng lai) |
| Route Wireframe mục tiêu | Giữ nguyên 3 route |
| Component Codebase | `CourtsClient.tsx`, `CourtGrid.tsx`, `SlotPopup.tsx`, `member-booking-client.tsx`, `guest-booking-client.tsx`, `ReservationForm.tsx`, `booking-cart.store.ts` |
| Tình trạng Codebase | Đang chạy |
| Điều hướng ra | Bấm Đặt sân trong popover → trang xác nhận `[G-29]`. Thành công → khối thành công M-05. Từ M-05: Tra cứu đơn (vãng lai) hoặc Xem lịch sử đặt sân (thành viên) |

> **Hiện trạng Codebase & Định hướng hoàn thiện tương lai:**
> - *Codebase hiện tại:* Luồng gồm 2 bước. Bước 1 tại `/courts`: banner chọn ngày, thẻ lưới (tự làm mới 30 giây) và chú giải 4 trạng thái; bấm ô trống mở popover tối neo trên ô, có mốc 60–180 phút và giá xem trước từ máy chủ. Nút đặt sân lưu lựa chọn vào `booking-cart.store` rồi chuyển sang trang xác nhận. Bước 2 tại `/booking` hoặc `/booking/guest`: `ReservationForm` hiển thị Ngày, Khung giờ, Tổng tiền; khách vãng lai nhập Họ tên, SĐT, Email và mã xác thực inline (nút "Nhận mã"). Giá đổi giữa chừng (HTTP 409) hiện khối cảnh báo xác nhận lại. Chưa có bảng đơn giá theo khung giờ.
> - *Chuẩn Wireframe tương lai:* Giữ luồng 2 bước. Thêm mốc **30 phút** vào popover (BR-20). Thêm bảng đơn giá theo khung giờ dưới lưới (KH-07). Khách vãng lai bắt buộc email (KH-11, BR-10); khi bấm Xác nhận đặt sân thì mở **Modal OTP M-01** (6 ô rời) thay cho ô mã inline (X-07). Khối thành công thêm nút Tra cứu đơn / Xem lịch sử đặt sân.

### 4.1. Wireframe trang lưới `/courts`

```text
+--------------------------------------------------------------------------------------------------+
| [ShuttleVN]   *Đặt sân*   Tra cứu đơn                                      [Đăng nhập] [Đăng ký] |
+--------------------------------------------------------------------------------------------------+
| ĐẶT SÂN CẦU LÔNG                                                                                 |
| Chọn ngày và khung giờ còn trống                                                                 |
| [ Thứ 6, 14/08/2026 (lịch) ]                                                                     |
+--------------------------------------------------------------------------------------------------+
| Thứ 6 · 14/08/2026                                                    (*) Cập nhật mỗi 30 giây   |
| Sân                   05:00   06:00   07:00   08:00   09:00   10:00   11:00   12:00   13:00   >> |
| Sân A1                [..][..][..][..][..][..][  ][  ][##][##][  ][  ][**][**][  ][  ][  ][  ]   |
| Sân tiêu chuẩn                                                                                   |
| Sân A2                [..][..][..][..][..][..][  ][  ][  ][  ][##][##][##][##][  ][  ][  ][  ]   |
| Sân tiêu chuẩn                                                                                   |
| Sân A3 [Bảo trì]      [//][//][//][//][//][//][//][//][//][//][//][//][//][//][//][//][//][//]   |
| Đang sửa sàn                                                                                     |
|                                                                                                  |
|               [  ] Còn trống   [##] Đã đặt   [**] Đặt của bạn   [//] Đóng cửa    [..] Đã qua giờ |
+--------------------------------------------------------------------------------------------------+
| BẢNG ĐƠN GIÁ THEO KHUNG GIỜ (Thứ 6)                                                              |
| [*Sân A1*] [Sân A2] [Sân A3]                                                                     |
| Từ giờ     Đến giờ     Đơn giá / giờ                                                             |
| 05:00      17:00       60.000 ₫                                                                  |
| 17:00      22:00       100.000 ₫                                                                 |
+--------------------------------------------------------------------------------------------------+
|                                                                                      ( Chat AI ) |
+--------------------------------------------------------------------------------------------------+
```

Lưới trên minh họa **thời điểm hiện tại là 07:45**: các slot đến 07:30 đã qua nên bị vô hiệu. Phần lưới cuộn ngang tới giờ đóng cửa (cột đầu giữ cố định). Khung giờ 05:00–22:00 chỉ là dữ liệu mẫu, thực tế theo giờ mở cửa từng sân từng ngày `[G-04]`. Chú giải nằm dưới lưới, căn phải, đúng như `CourtGrid.tsx`.

### 4.2. Chi tiết thành phần

**a) Bộ chọn ngày**

| Thành phần | Quy tắc |
|---|---|
| Ô ngày (lịch) | `CustomDatePicker`. Không chọn được ngày quá khứ |
| Cập nhật | Lưới tự tải lại định kỳ (30 giây) và khi đổi ngày |

**b) Lưới sân**

| Thành phần | Quy tắc |
|---|---|
| Hàng | Mỗi hàng là một sân: tên, mô tả (`description`) và nhãn trạng thái sân `[G-13]` |
| Cột | Slot 30 phút theo giờ mở cửa của sân trong ngày. Nhãn giờ ghi ở đầu mỗi giờ |
| `[  ]` Còn trống | Bấm được → mở popover chọn thời lượng |
| `[##]` Đã đặt | Không bấm được. Có tooltip "Đã có người đặt" |
| `[**]` Đặt của bạn | Chỉ khách thành viên thấy (đơn của chính mình). Không bấm được, tooltip "Đơn của bạn" `[G-12]` |
| `[//]` Đóng cửa | Ngoài giờ mở cửa, lịch không khả dụng, hoặc sân không ở trạng thái Hoạt động. Sân Bảo trì/Đóng hiện thêm badge trên nhãn hàng |
| `[..]` Đã qua giờ | Slot có giờ bắt đầu không sau thời điểm hiện tại của máy chủ. Vô hiệu hóa |
| Chú giải | Luôn hiển thị, mỗi trạng thái có ký hiệu + chữ |

**c) Bảng đơn giá theo khung giờ** (mục bổ sung, KH-07)

| Thành phần | Quy tắc |
|---|---|
| Tab theo sân | Chọn sân để xem bảng giá của sân đó cho thứ của ngày đang chọn |
| Cột | Từ giờ, Đến giờ, Đơn giá/giờ. "Đến giờ" là mốc kế tiếp hoặc giờ đóng cửa |

Khách vãng lai và khách thành viên dùng chung trang lưới; **không có thẻ "Đặt sân nhanh" trên trang lưới**. Thông tin liên hệ của khách vãng lai được nhập ở bước xác nhận (mục 4.5).

### 4.3. Các trạng thái của trang

| Trạng thái | Hiển thị |
|---|---|
| Đang tải | Skeleton lưới và bảng giá. Chọn ngày bị vô hiệu cho tới khi tải xong |
| Chưa có sân nào | "Hiện chưa có sân nào để hiển thị." |
| Tất cả sân đóng cửa ngày đó | Toàn bộ ô `[//]` + dòng "Tất cả sân đóng cửa trong ngày này." |
| Lỗi tải lưới | Banner lỗi + nút Thử lại, giữ ngày đang chọn |
| Sân đã đổi trạng thái khi đang xem | Lưới tự cập nhật ở lần tải lại kế tiếp |

### 4.4. Popover chọn thời lượng (khi bấm ô trống)

Popover tối (`SlotPopup.tsx`) neo phía trên ô vừa bấm, đóng khi bấm ra ngoài. Ví dụ bấm ô 08:00 của Sân A2:

```text
              +-----------------------------------------+
              | Sân A2 · Thứ 6, 14/08/2026 · 08:00      |
              |                                         |
              | Thời lượng                              |
              | [ 30 phút ] [*1 giờ*] [ 1 giờ 30 ]      |
              | [ 2 giờ ]   [ 2 giờ 30 ] [ 3 giờ ]      |
              |   (mức trùng lịch bị vô hiệu)           |
              |                                         |
              | 08:00 – 09:00           60.000 ₫        |
              | [        Đặt sân · 60.000 ₫        ]    |
              +--------------------v--------------------+
```

| Thành phần | Quy tắc |
|---|---|
| Giờ bắt đầu | Lấy từ ô vừa bấm, không sửa trong popover |
| Mốc thời lượng | Bước 30 phút, tối thiểu 30 phút. Chỉ chọn được mức không trùng lịch, không vượt giờ đóng cửa, không qua nửa đêm; mức không hợp lệ bị vô hiệu. Giao diện hiện tại chỉ liệt kê đến 3 giờ; SRS không đặt mức tối đa `[G-31]` |
| Giá | Do máy chủ tính (`usePricePreview`, áp theo mốc giờ của sân/ngày). Khi đang chờ máy chủ: nút Đặt sân bị vô hiệu |
| Nút **Đặt sân · {Tổng tiền}** | Lưu sân/ngày/giờ/thời lượng vào `booking-cart.store`, rồi chuyển khách thành viên sang `/booking`, khách vãng lai sang `/booking/guest`. Chưa tạo đơn, chưa giữ chỗ |
| Đóng popover | Không tạo đơn, không giữ chỗ |

### 4.5. Trang xác nhận đặt sân (`/booking`, `/booking/guest`)

Trang xác nhận là thẻ căn giữa, rộng vừa phải, dưới header. Khách thành viên không nhập thông tin liên hệ; khách vãng lai nhập 3 trường.

```text
+--------------------------------------------------------------------------------------------------+
| [ShuttleVN]   *Đặt sân*   Tra cứu đơn                                      [Đăng nhập] [Đăng ký] |
+--------------------------------------------------------------------------------------------------+
|                                                                                                  |
|                   +----------------------------------------------------------+                   |
|                   | XÁC NHẬN ĐẶT SÂN                                         |                   |
|                   | Sân A2                                                   |                   |
|                   |                                                          |                   |
|                   | Ngày            Thứ 6, 14/08/2026                        |                   |
|                   | Khung giờ       08:00 – 09:00                            |                   |
|                   | Tổng tiền       60.000 ₫                                 |                   |
|                   |-----------------------------------------------------------|                  |
|                   | Họ và tên *                                              |                   |
|                   | [ Nguyễn Văn A________________________________________ ] |                   |
|                   | Số điện thoại *                                          |                   |
|                   | [ 0901234567__________________________________________ ] |                   |
|                   | Email *                                                  |                   |
|                   | [ ten@email.com_______________________________________ ] |                   |
|                   | (i) Mã đặt sân DS-XXXXX sẽ gửi về email sau khi xác minh |                   |
|                   |     mã OTP.                                              |                   |
|                   |                                                          |                   |
|                   | [ Quay lại ]                     [ XÁC NHẬN ĐẶT SÂN ]    |                   |
|                   +----------------------------------------------------------+                   |
|                                                                                                  |
+--------------------------------------------------------------------------------------------------+
```

Với khách thành viên (`/booking`), ba ô nhập được thay bằng dòng "Đặt bằng tài khoản: Nguyễn Văn A · ten@email.com" và không có bước OTP.

| Thành phần | Quy tắc |
|---|---|
| Tóm tắt | Ngày, Khung giờ, Tổng tiền do máy chủ tính. Giao diện không tự cộng giá |
| Họ và tên / SĐT / Email | Chỉ khách vãng lai. Cùng quy tắc validation mục 1.2 (SĐT 8–15 chữ số, email đúng định dạng) |
| **XÁC NHẬN ĐẶT SÂN** | Thành viên: gửi đặt ngay. Vãng lai: kiểm tra 3 ô, gửi mã OTP và mở Modal M-01 (mục 4.6). Nút đổi thành "Đang xử lý..." và bị vô hiệu khi đang gửi |
| Quay lại | Về `/courts`, giữ ngày đang chọn |
| Không có lựa chọn trong store | Chuyển về `/courts` |

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
| Khung giờ vừa bị người khác đặt | "Khung giờ vừa được người khác đặt. Vui lòng chọn lại." | Quay về `/courts`, tải lại lưới |
| Giờ đã qua / ngoài giờ mở cửa / qua nửa đêm | "Khung giờ này không còn hợp lệ." | Quay về `/courts`, tải lại lưới |
| Sân không còn ở trạng thái Hoạt động | "Sân hiện không nhận đặt." | Quay về `/courts`, tải lại lưới |
| Tài khoản thành viên bị khóa | Chuyển về Đăng nhập, hiện banner khóa | – |
| Lỗi máy chủ/mạng | "Không thể đặt sân lúc này. Vui lòng thử lại." | Giữ nguyên trang và dữ liệu đã nhập |


### 4.6. Modal M-01: OTP đặt nhanh (khách vãng lai)

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

### 4.7. Khối đặt sân thành công `M-05`

Khối này `[G-30]` thay thế thẻ xác nhận ngay trên trang `/booking` hoặc `/booking/guest` (code hiện tại hiển thị mã đặt sân và nút "Xem đặt sân" tại chỗ).

Khách vãng lai:

```text
+--------------------------------------------------------------------+
| ĐẶT SÂN THÀNH CÔNG                                                 |
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
| ĐẶT SÂN THÀNH CÔNG                                                 |
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
| Component Codebase | `BookingHistoryList.tsx`, `BookingCard.tsx`, `BookingListToolBar.tsx` |
| Tình trạng Codebase | Đang chạy |
| Điều hướng ra | Nút "Đặt sân ngay" (khi rỗng) → `/courts`  |

> **Hiện trạng Codebase & Định hướng hoàn thiện tương lai:**
> - *Codebase hiện tại:* Đã có tab lọc trạng thái, ô tìm theo mã đặt sân, 10 đơn/trang với nút Trang trước/Trang sau. `BookingCard.tsx` có nút Chi tiết (mở modal), Hóa đơn (mở modal hóa đơn) và Hủy đặt (xác nhận bằng hộp thoại trình duyệt, gọi API hủy). Chưa có nút Đổi lịch.
> - *Chuẩn Wireframe tương lai:* Xóa nút Hóa đơn của khách (D-13). Tách độc lập nhãn đặt sân và thanh toán: đơn Pending hiển thị nhãn thanh toán "Chưa lập hóa đơn" (D-12). Giữ modal Chi tiết (`G-09`). Thay hộp thoại trình duyệt khi hủy bằng Modal Hủy đặt sân (`M-06`, bắt buộc lý do) và thêm Modal Đổi lịch (UC-10).

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
|                                      [ Trang trước ]   Trang 1 / 4   [ Trang sau ]               |
+--------------------------------------------------------------------------------------------------+
```

Năm thẻ trên minh họa năm tình huống: (1) Chờ xác nhận, được hủy/đổi; (2) Đã xác nhận chưa thanh toán, được hủy/đổi; (3) Đã xác nhận đã thanh toán, không được hủy/đổi; (4) Hoàn thành; (5) Đã hủy.

### 5.2. Chi tiết thành phần

| Thành phần | Quy tắc |
|---|---|
| Tabs lọc | Tất cả, Chờ xác nhận, Đã xác nhận, Hoàn thành, Đã hủy. Đổi tab thì về trang 1 |
| Ô tìm kiếm | Tìm theo mã đặt sân (đã có trong `BookingListToolBar.tsx`). Đổi nội dung tìm thì về trang 1 |
| Sắp xếp | Đơn mới nhất trước |
| Phân trang | 10 đơn/trang (như `BookingHistoryList.tsx`), nút Trang trước / Trang sau và "Trang x / y". Chỉ hiện khi có từ 2 trang |
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
| Điều hướng ra | Đơn đã hủy → "Đặt sân mới" → `/courts`  |

> **Hiện trạng Codebase & Định hướng hoàn thiện tương lai:**
> - *Codebase hiện tại:* `BookingLookupForm.tsx` có các nút DEMO điền sẵn mã, ô SĐT/Email không bắt buộc. `BookingLookupResult.tsx` hiển thị hotline `1900 1234` (gắn cứng) cho khách cần hỗ trợ.
> - *Chuẩn Wireframe tương lai:* Bắt buộc nhập CẶP Mã đơn + SĐT/Email để bảo mật thông tin (Quyết định X-03, BR-26). Xóa các nút DEMO. Hotline lấy từ cấu hình thay cho số gắn cứng `1900 1234` `[G-06]`.

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

Trang tra cứu **chỉ xem**, không có nút hủy/đổi lịch/thanh toán. Cần thay đổi thì liên hệ nhân viên qua hotline `{Hotline}` hiển thị cuối thẻ kết quả (KH-14).

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
> - *Codebase hiện tại:* Bố cục 2 cột (cột trái 280px). `ProfileSidebar.tsx` có avatar (nút máy ảnh, chưa lưu lên máy chủ), tên, vai trò và thẻ "Thống kê" gồm Tổng đặt sân, Hoàn thành, Đã hủy, Tổng chi tiêu (ngoài SRS/UC). Cột phải có 2 tab "Thông tin" và "Bảo mật". `ProfileInfoForm.tsx` mở khóa ô nhập khi bấm Chỉnh sửa, email khóa, SĐT validate `^0\d{9}$`. Tab "Bảo mật" (`ChangePasswordForm.tsx`) đã chạy với `PUT /profile/change-password`, có thanh đo độ mạnh mật khẩu.
> - *Chuẩn Wireframe tương lai:* Chuẩn hóa SĐT thành 8–15 chữ số (BR-26). Giữ email khóa (BR-18). Giữ avatar và thẻ thống kê ở client; không đưa quản lý phiên/thiết bị hoặc nút tự vô hiệu hóa tài khoản vào giao diện (X-04). Mật khẩu mới 8–128 ký tự (BR-26).

### 7.1. Wireframe: tab Thông tin (chế độ xem)

```text
+--------------------------------------------------------------------------------------------------+
| [ShuttleVN]   Đặt sân   Lịch sử đặt sân   Tra cứu đơn                      (NA) Nguyễn Văn A [v] |
+--------------------------------------------------------------------------------------------------+
|                                                                                                  |
|     +--------------------+   +------------------------------------------------------------+      |
|     |       (NA) [cam]   |   | [*Thông tin*]  [Bảo mật]                                   |      |
|     |    Nguyễn Văn A    |   +------------------------------------------------------------+      |
|     |     Khách hàng     |   | THÔNG TIN CÁ NHÂN                            [ Chỉnh sửa ] |      |
|     +--------------------+   |                                                            |      |
|     | THỐNG KÊ           |   | Họ và tên          [ Nguyễn Văn A_______________ ] (khóa)  |      |
|     | Tổng đặt sân    12 |   | Số điện thoại      [ 0901234567_________________ ] (khóa)  |      |
|     | Hoàn thành       9 |   | Email              [ ten@email.com______________ ] (khóa)  |      |
|     | Đã hủy           2 |   |                    Dùng để đăng nhập                       |      |
|     |--------------------|   |                                                            |      |
|     | Tổng chi tiêu      |   +------------------------------------------------------------+      |
|     |        900.000 ₫   |                                                                       |
|     +--------------------+                                                                       |
+--------------------------------------------------------------------------------------------------+
```

Ở chế độ xem, các ô họ tên và SĐT bị khóa; bấm **Chỉnh sửa** để mở khóa hai ô này (email luôn khóa).

### 7.2. Chế độ chỉnh sửa

```text
+------------------------------------------------------------+
| [*Thông tin*]  [Bảo mật]                                   |
+------------------------------------------------------------+
| Họ và tên *                                                |
| [ Nguyễn Văn A__________________________________________ ] |
|                                                            |
| Số điện thoại *                                            |
| [ 0901234567____________________________________________ ] |
|     8–15 chữ số, có thể bắt đầu bằng +                     |
|                                                            |
| Email                                                      |
| [ ten@email.com____________________ ] (khóa, chỉ đọc)      |
|     Dùng để đăng nhập, không thể thay đổi                  |
|                                                            |
| [ Hủy ]                                   [ Lưu thay đổi ] |
+------------------------------------------------------------+
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
+------------------------------------------------------------+
| [*Thông tin*]  [Bảo mật]                                   |
+------------------------------------------------------------+
| Họ và tên *                                                |
| [ ______________________________________________________ ] |
| (!) Họ tên không được để trống                             |
|                                                            |
| Số điện thoại *                                            |
| [ 123___________________________________________________ ] |
| (!) Số điện thoại không hợp lệ                             |
|                                                            |
| [ Hủy ]                                   [ Lưu thay đổi ] |
+------------------------------------------------------------+
```

### 7.3. Tab Bảo mật (Đổi mật khẩu)

SRS 1.7 và UC 1.5 chưa có use-case riêng cho chức năng này, nhưng backend (`PUT /profile/change-password`) và giao diện đã được cài đặt nên tab được **giữ và hiển thị** `[G-02]`. Quên mật khẩu (WF-03) vẫn là đường khôi phục khi khách không nhớ mật khẩu hiện tại.

```text
+------------------------------------------------------------+
| [Thông tin]  [*Bảo mật*]                                   |
+------------------------------------------------------------+
| ĐỔI MẬT KHẨU                                               |
|                                                            |
| Mật khẩu hiện tại *                                        |
| [ ********_______________________________________ ] [Hiện] |
|                                                            |
| Mật khẩu mới *                                             |
| [ ********_______________________________________ ] [Hiện] |
| [####------]  Trung bình        8–128 ký tự                |
|                                                            |
| Xác nhận mật khẩu mới *                                    |
| [ ********_______________________________________ ] [Hiện] |
|                                                            |
|                                  [ Cập nhật mật khẩu ]     |
+------------------------------------------------------------+
```

| Trường | Quy tắc |
|---|---|
| Mật khẩu hiện tại | Bắt buộc. Sai thì báo "Mật khẩu hiện tại không đúng" |
| Mật khẩu mới | Bắt buộc, 8–128 ký tự. Thanh độ mạnh chỉ mang tính gợi ý, không chặn lưu |
| Xác nhận mật khẩu mới | Phải khớp mật khẩu mới (chỉ kiểm tra ở giao diện) |
| Thành công | Toast "Mật khẩu đã được cập nhật" |

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

Bố cục, menu theo vai trò và quy ước giao diện xem mục 0.3 và 0.4. Trong WF-09 đến WF-19: cột trái là Sidebar (liệt kê mục theo thứ tự nhóm, không vẽ nhãn nhóm), hàng trên bên phải là Topbar (tiêu đề trang, người dùng, nút Đăng xuất), phần còn lại là vùng làm việc.

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
| Route Wireframe mục tiêu | `/dashboard` |
| Component Codebase | `DashboardClient.tsx`, `DashboardStats.tsx`, `RevenueChart.tsx` |
| Tình trạng Codebase | Đang chạy |
| Điều hướng ra | "Chi tiết" → WF-11. "Xem yêu cầu đặt sân" → WF-10 |

> **Hiện trạng Codebase & Định hướng hoàn thiện tương lai:**
> - *Codebase hiện tại:* `DashboardStats.tsx` hiển thị 4 thẻ (Doanh thu hôm nay, Đặt sân hôm nay, Chờ xác nhận, Tỷ lệ lấp đầy). `DashboardClient.tsx` có `RevenueChart` ("Doanh thu 7 ngày gần nhất"), thẻ danh sách "Chờ xác nhận" và bảng "Đặt sân gần đây" (Mã đơn, Khách hàng, Sân, Thời gian, Trạng thái, Tổng tiền).
> - *Chuẩn Wireframe tương lai:* Giữ nguyên bố cục hiện có; chỉ bỏ thẻ "Tỷ lệ lấp đầy" (X-04). Còn 3 thẻ: Doanh thu hôm nay, Đặt sân hôm nay, Chờ xác nhận. Số liệu doanh thu chỉ cộng hóa đơn Đã thanh toán. Mỗi dòng trong thẻ "Chờ xác nhận" bấm được để mở WF-11; "Xem tất cả" mở WF-10 `[G-14]`.

### 9.1. Wireframe

```text
+--------------------------+----------------------------------------------------------------------------------------+
| ShuttleVN         [Admin]| BẢNG ĐIỀU KHIỂN                              Nguyễn Thị C · Quản trị viên  [Đăng xuất] |
+--------------------------+----------------------------------------------------------------------------------------+
|                          |                                                                                        |
| > Bảng điều khiển        | +--------------------------+ +--------------------------+ +--------------------------+ |
|   Thống kê               | | Doanh thu hôm nay        | | Đặt sân hôm nay          | | Chờ xác nhận             | |
|   Lịch sân               | | 1.250.000 ₫              | | 18                       | | 3                        | |
|   Yêu cầu đặt sân        | | Chỉ cộng HĐ đã thu       | | Không tính Đã hủy        | | [Xem yêu cầu >]          | |
|   Thanh toán             | +--------------------------+ +--------------------------+ +--------------------------+ |
|   Quản lý sân            |                                                                                        |
|   Khách hàng             | +--------------------------------------------------+ +-------------------------------+ |
|   Nhân viên              | | Doanh thu 7 ngày gần nhất                        | | Chờ xác nhận            [3]   | |
|   Đặt sân toàn hệ thống  | |                                                  | | Hoàng Văn E        [Chờ]      | |
|   Nhật ký hoạt động      | |   1.2M       ##                                  | | A1 · 17:00–18:00 · Hôm nay    | |
|                          | |   0.9M  ##   ##        ##                        | | ----------------------------- | |
|                          | |   0.6M  ## ####  ##    ##                        | | Trần Thị B         [Chờ]      | |
|                          | |   0.3M  ## ####  ####  ##                        | | A2 · 18:00–19:30 · Hôm nay    | |
|                          | |         T7 CN T2 T3 T4 T5 T6                     | | ----------------------------- | |
|                          | | (i) Chỉ cộng HĐ Đã thanh toán                    | | Lê Văn C           [Chờ]      | |
|                          | +--------------------------------------------------+ | A1 · 19:30–20:30 · Hôm nay    | |
|                          |                                                      | [ Xem tất cả → ]              | |
|                          |                                                      +-------------------------------+ |
|                          |                                                                                        |
|                          | +------------------------------------------------------------------------------------+ |
|                          | | ĐẶT SÂN GẦN ĐÂY                                                                    | |
|                          | |                                                                                    | |
|                          | | Mã đơn    Khách hàng      Sân   Thời gian          Trạng thái     Tổng tiền        | |
|                          | | --------  --------------  ----  -----------------  -------------  ----------       | |
|                          | | DS-5N7XA  Hoàng Văn E     A1    14/08 17:00-18:00  [Chờ xác nhận] 100.000 ₫        | |
|                          | | DS-7K3QP  Lê Văn C        A1    14/08 18:00-19:00  [Đã xác nhận]  100.000 ₫        | |
|                          | | DS-4T8RN  Phạm Thị D      A2    14/08 08:00-09:00  [Hoàn thành]    60.000 ₫        | |
|                          | +------------------------------------------------------------------------------------+ |
+--------------------------+----------------------------------------------------------------------------------------+
```

### 9.2. Chi tiết thành phần

| Thành phần | Quy tắc |
|---|---|
| Doanh thu hôm nay | Tổng tiền các hóa đơn hợp lệ **Đã thanh toán** có thời điểm thu trong ngày hôm nay. Không cộng hóa đơn Đã hủy |
| Đặt sân hôm nay | Số lượt đặt có ngày sử dụng là hôm nay, không tính Đã hủy |
| Chờ xác nhận | Số đơn đang Chờ xác nhận. Bấm để sang WF-10 |
| Biểu đồ doanh thu 7 ngày | Cột theo ngày, chỉ cộng hóa đơn Đã thanh toán. Số liệu chi tiết theo kỳ xem ở WF-18 |
| Thẻ Chờ xác nhận | Đơn Chờ xác nhận, giờ chơi gần nhất xếp trước. Bấm một dòng để mở WF-11. "Xem tất cả" mở WF-10 `[G-14]` |
| Đặt sân gần đây | Bảng đơn mới nhất, cột: Mã đơn, Khách hàng, Sân, Thời gian, Trạng thái, Tổng tiền |

Không có chỉ số "Tỷ lệ lấp đầy", chuông thông báo hay nút xuất báo cáo.

| Trạng thái | Hiển thị |
|---|---|
| Đang tải | Skeleton ba thẻ số liệu, biểu đồ và bảng |
| Không có đơn chờ | "Không có đơn chờ" trong thẻ Chờ xác nhận |
| Lỗi tải | Banner lỗi + Thử lại. Mỗi thẻ có thể lỗi độc lập |

---

## WF-10: Tiếp nhận Yêu cầu đặt sân

| Mục | Nội dung |
|---|---|
| Mã màn hình | WF-10 Tiếp nhận yêu cầu đặt sân |
| Use-case | UC-14 Xem yêu cầu chờ xác nhận; UC-15 Xác nhận đặt sân (include UC-17); UC-16 Từ chối đặt sân |
| Đối tượng | Nhân viên, Quản trị viên |
| Route Codebase hiện tại | *Chưa có route trong codebase* (US-11) |
| Route Wireframe mục tiêu | `/booking-requests` |
| Component Codebase | *Chưa tạo file* |
| Tình trạng Codebase | Chưa triển khai (thuộc US-11 đang phát triển) |
| Điều hướng ra | Chi tiết → WF-11 (`/bookings/[id]`) |

> **Hiện trạng Codebase & Định hướng hoàn thiện tương lai:**
> - *Codebase hiện tại:* Chưa có route độc lập trong `src/app/(admin)/`.
> - *Chuẩn Wireframe tương lai:* Xây dựng trang `/booking-requests` với bảng danh sách đơn Chờ xác nhận (`Pending`) sắp xếp cũ nhất trước (NV-03), hiển thị tổng tiền, thời điểm tạo, kèm nút Chi tiết, Xác nhận, Từ chối.

### 10.1. Wireframe

```text
+--------------------------+-------------------------------------------------------------------------------------------+
| ShuttleVN         [Admin]| YÊU CẦU ĐẶT SÂN (CHỜ XÁC NHẬN)                        Trần Văn B · Nhân viên  [Đăng xuất] |
+--------------------------+-------------------------------------------------------------------------------------------+
|                          |                                                                             Cũ nhất trước |
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
+--------------------------+-------------------------------------------------------------------------------------------+
```

### 10.2. Chi tiết thành phần

| Thành phần | Quy tắc |
|---|---|
| Phạm vi danh sách | Chỉ đơn **Chờ xác nhận** |
| Sắp xếp | Yêu cầu cũ nhất (gửi sớm nhất) xếp trước |
| Cột | Mã đơn, Gửi lúc, Khách, SĐT, Sân, Khung giờ, Tổng tiền |
| Phân trang | Mặc định 20 dòng/trang |
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
| Route Wireframe mục tiêu | `/bookings/[id]` |
| Component Codebase | *Chưa tạo file* |
| Tình trạng Codebase | Chưa triển khai (thuộc US-12 đang phát triển) |
| Điều hướng ra | Breadcrumb "Yêu cầu đặt sân" quay lại WF-10 |

> **Hiện trạng Codebase & Định hướng hoàn thiện tương lai:**
> - *Codebase hiện tại:* Chưa có trang chi tiết admin độc lập trong `src/app/(admin)/`.
> - *Chuẩn Wireframe tương lai:* Xây dựng trang `/bookings/[id]` hiển thị thông tin đơn, thông tin hóa đơn ("Chưa lập hóa đơn" nếu đơn Pending), timeline lịch sử trạng thái kèm lý do (BR-13), và các modal nghiệp vụ (Xác nhận đơn, Từ chối, Hoàn thành, Hủy sự cố, Đổi lịch).

### 11.1. Wireframe trang

Minh họa đơn `Đã xác nhận`, hóa đơn `Chưa thanh toán`.

```text
+--------------------------+-------------------------------------------------------------------------------------------+
| ShuttleVN         [Admin]| CHI TIẾT ĐẶT SÂN                                      Trần Văn B · Nhân viên  [Đăng xuất] |
+--------------------------+-------------------------------------------------------------------------------------------+
|                          | < Yêu cầu đặt sân  /  DS-7K3QP                                                            |
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
+--------------------------+-------------------------------------------------------------------------------------------+
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
| Route Wireframe mục tiêu | `/schedule` |
| Component Codebase | `ScheduleClient.tsx` |
| Tình trạng Codebase | Đang chạy (Timeline lịch sân) |
| Điều hướng ra | Bấm ô đã đặt → WF-11 |

> **Hiện trạng Codebase & Định hướng hoàn thiện tương lai:**
> - *Codebase hiện tại:* `ScheduleClient.tsx` là timeline ngang 05:00–22:00 (mỗi sân một hàng) dùng chung dữ liệu lưới sân; chỉ có bộ chọn ngày, chưa có lọc theo sân. Thanh đã đặt hiện "Đã đặt" + khung giờ, chưa bấm được, chưa phân biệt trạng thái đơn, chưa có tên khách/mã đơn. Trạng thái sân chỉ đọc. Chưa có nút và modal Đặt tại quầy.
> - *Chuẩn Wireframe tương lai:* Giữ timeline ngang. Thanh đặt sân ghi tên khách + nhãn trạng thái (CXN/ĐXN/HT) và bấm được để mở WF-11. Thêm nút và Modal "Đặt sân tại quầy / Tạo đặt sân thay khách" (`M-09`, UC-20) không cần OTP (X-05). Nhãn trạng thái sân ở cột trái trở thành ô chọn để mở modal Đổi trạng thái (UC-23).

### 12.1. Wireframe

Timeline ngang như `ScheduleClient.tsx`: mỗi sân một hàng, cột là giờ (code hiển thị 05:00–22:00, wireframe chỉ vẽ khung 16:00–22:00 để vừa khổ). Thanh đặt sân nằm theo đúng khoảng giờ; dòng trên ghi nhãn trạng thái và tên khách, dòng dưới ghi khung giờ. Cột sân ghi tên sân và trạng thái sân.

```text
+--------------------------+----------------------------------------------------------------------------------------+
| ShuttleVN         [Admin]| LỊCH SÂN                                           Trần Văn B · Nhân viên  [Đăng xuất] |
+--------------------------+----------------------------------------------------------------------------------------+
|                          | [ Thứ 6, 14/08/2026 (lịch) ]  [ Hôm nay ]  Sân: [ Tất cả v ]        [ + Tạo lịch đặt ] |
| > Lịch sân               |                                                                                        |
|   Yêu cầu đặt sân        | Chú giải: [CXN] Chờ xác nhận  [ĐXN] Đã xác nhận  [HT] Hoàn thành  [//] Bảo trì/Đóng    |
|   Thanh toán             |                                                                                        |
|   Khách hàng             | Sân / Giờ     16:00       17:00       18:00       19:00       20:00       21:00        |
|                          | -------------------------------------------------------------------------------------- |
|                          | Sân A1                    [CXN] Hoàng Văn E|      [ĐXN] Lê Vă…|                        |
|                          | [Hoạt động v]             17:00–18:30      |      19:00–20:00|                         |
|                          |                                                                                        |
|                          | Sân A2                                [CXN] Trần Thị B |                               |
|                          | [Hoạt động v]                         18:00–19:30      |                               |
|                          |                                                                                        |
|                          | Sân A3        //////////////////////////////////////////////////////////////////////// |
|                          | [Bảo trì v]   //////////////////////////////////////////////////////////////////////// |
|                          |                                                                                        |
|                          | Sân A4        //////////////////////////////////////////////////////////////////////// |
|                          | [Đóng v]      //////////////////////////////////////////////////////////////////////// |
|                          |                                                                                        |
|                          | (i) Lưới cuộn ngang theo giờ mở cửa. Bấm thanh đã đặt để mở chi tiết đơn (WF-11).      |
|                          | (i) Bấm vùng trống để mở modal Tạo lịch đặt (sân/ngày/giờ điền sẵn).                   |
+--------------------------+----------------------------------------------------------------------------------------+
```

### 12.2. Chi tiết thành phần

| Thành phần | Quy tắc |
|---|---|
| Chọn ngày | Ô ngày (`CustomDatePicker`) và nút **Hôm nay** |
| Lọc theo sân | Chọn một sân hoặc Tất cả (NV-09). Code hiện tại chưa có |
| Chú giải | Chờ xác nhận `[CXN]`, Đã xác nhận `[ĐXN]`, Hoàn thành `[HT]` (vẫn giữ chỗ), Trống, Bảo trì/Đóng. Mỗi trạng thái có chữ, không chỉ màu |
| Thanh đã đặt | Dài đúng khoảng giờ đặt. Ghi nhãn trạng thái, tên khách (cắt bớt nếu hẹp) và khung giờ; mã đặt sân xem ở chi tiết. Bấm để mở WF-11 |
| Vùng trống | Bấm để mở modal Tạo lịch đặt với sân/ngày/giờ điền sẵn (đề xuất) |
| Sân Bảo trì/Đóng | Cả hàng gạch chéo `[//]` |
| Trạng thái sân (cột trái) | Mỗi sân một ô chọn Hoạt động / Bảo trì / Đóng. Đổi trạng thái mở modal mục 12.3 |
| Nút **+ Tạo lịch đặt** | Mở modal M-09 |

| Trạng thái | Hiển thị |
|---|---|
| Đang tải | "Đang tải lịch sân..." |
| Không có sân | "Không có dữ liệu sân trong ngày này." |
| Lỗi tải | "Không thể tải lịch sân." + Thử lại |

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
| Route Wireframe mục tiêu | `/payments` |
| Component Codebase | `payments/page.tsx` |
| Tình trạng Codebase | 100% Placeholder (chỉ bọc RoleGuard) |
| Điều hướng ra | Mã đơn → WF-11 |

> **Hiện trạng Codebase & Định hướng hoàn thiện tương lai:**
> - *Codebase hiện tại:* File `payments/page.tsx` hiện chỉ là placeholder trống.
> - *Chuẩn Wireframe tương lai:* Xây dựng bảng hóa đơn (`Unpaid`, `Paid`, `Cancelled`), Modal Thu tiền (UC-29), Modal Hoàn tiền (UC-22); tuyệt đối không có nút lập hóa đơn thủ công (D-07).

### 13.1. Wireframe

```text
+--------------------------+-------------------------------------------------------------------------------------------+
| ShuttleVN         [Admin]| THANH TOÁN & HÓA ĐƠN                                  Trần Văn B · Nhân viên  [Đăng xuất] |
+--------------------------+-------------------------------------------------------------------------------------------+
|                          |                                                                                           |
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
+--------------------------+-------------------------------------------------------------------------------------------+
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
| Route Wireframe mục tiêu | `/customers` |
| Component Codebase | `CustomersClient.tsx` |
| Tình trạng Codebase | Đang chạy (Bảng danh sách) |
| Điều hướng ra | Mã đơn trong lịch sử → WF-11 |

> **Hiện trạng Codebase & Định hướng hoàn thiện tương lai:**
> - *Codebase hiện tại:* `CustomersClient.tsx` có bảng 5 cột (Khách hàng kèm mã, Liên hệ, Loại Thành viên/Vãng lai, Ngày đăng ký, Chi tiết) và nút Thêm khách hàng; chưa có ô tìm kiếm, phân trang; hai nút chưa gắn handler.
> - *Chuẩn Wireframe tương lai:* Bổ sung thanh tìm kiếm nhanh (UC-30) và thao tác Khóa/Mở khóa tài khoản khách (UC-27, BR-27) reset bộ đếm sai về 0 (BR-12). Modal tạo hồ sơ khách hàng mới (UC-26).

### 14.1. Wireframe

Bảng theo `CustomersClient.tsx`. Thanh tìm kiếm (UC-30) và phân trang là phần bổ sung, vẽ ở mục 14.2.

```text
+--------------------------+----------------------------------------------------------------------------------------+
| ShuttleVN         [Admin]| QUẢN LÝ KHÁCH HÀNG                                 Trần Văn B · Nhân viên  [Đăng xuất] |
+--------------------------+----------------------------------------------------------------------------------------+
|                          | [ + Thêm khách hàng ]                                                                  |
|   Lịch sân               |                                                                                        |
|   Yêu cầu đặt sân        | Khách hàng         Liên hệ                     Loại         Ngày đăng ký   Thao tác    |
|   Thanh toán             | -----------------  --------------------------  -----------  -------------  ---------   |
| > Khách hàng             | Trần Thị B         0901234567                  [Thành viên] 02/08/2026     [Chi tiết]  |
|                          | KH-0012            tran.b@email.com                                                    |
|                          | Lê Văn C           0987654321                  [Thành viên] 05/08/2026     [Chi tiết]  |
|                          | KH-0015            le.c@email.com                                                      |
|                          | Phạm Thị D         0933445566                  [Vãng lai]   10/08/2026     [Chi tiết]  |
|                          | KH-0020            pham.d@email.com                                                    |
|                          |                                                                                        |
|                          | (i) Chi tiết: lịch sử đặt sân, Khóa/Mở khóa tài khoản (nếu khách có tài khoản).        |
+--------------------------+----------------------------------------------------------------------------------------+
```

### 14.2. Chi tiết thành phần

| Thành phần | Quy tắc |
|---|---|
| Thanh tìm kiếm (bổ sung) | Đặt phía trên bảng, tìm theo họ tên, SĐT, email. Số điện thoại không dùng để gộp hồ sơ |
| Phân trang (bổ sung) | Mặc định 20 dòng/trang, tối đa 100 (quy tắc chung) |
| Cột | Khách hàng (họ tên + mã KH), Liên hệ (SĐT + email), Loại (Thành viên / Vãng lai), Ngày đăng ký, Thao tác. Trạng thái tài khoản (`ACTIVE` / `DISABLED`) hiển thị trong khung Chi tiết. Mã KH trong wireframe là dữ liệu mẫu |
| Khách vãng lai (chưa có tài khoản) | Nhãn Loại "Vãng lai"; khung Chi tiết **không có** nút Khóa/Mở khóa `[G-20]` |
| **Chi tiết** | Mở khung thông tin khách gồm lịch sử đặt sân (mục 14.3) và thao tác tài khoản |
| **Khóa tài khoản** | Trong Chi tiết, chỉ ở khách có tài khoản `ACTIVE`. Mở modal mục 14.4 |
| **Mở khóa tài khoản** | Trong Chi tiết, chỉ ở khách có tài khoản `DISABLED`. Đưa bộ đếm đăng nhập sai về 0, áp dụng cả với khóa tự động ở lần sai thứ 5 |
| Phạm vi quyền | Chỉ khóa/mở khóa **tài khoản khách hàng**. Không khóa được tài khoản Nhân viên/Quản trị. Thao tác trên tài khoản nội bộ hoặc hard-delete bị từ chối |
| Không có | Xóa hồ sơ khách đã giao dịch; sửa email; giá trị trạng thái thứ ba ("Vô hiệu hóa") |

Quản trị viên còn xóa được tài khoản khách theo QT-10: nút **Xóa tài khoản** chỉ hiện trong Chi tiết khi đăng nhập bằng Quản trị viên, mở modal ở mục 16.4. Nhân viên sửa họ tên/SĐT khách (UC-24) chưa được vẽ `[G-19]`.

| Trạng thái | Hiển thị |
|---|---|
| Đang tải | Skeleton các dòng |
| Rỗng | "Không tìm thấy khách hàng nào." (hiện tại code hiển thị dòng thông báo trong bảng) |
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
| Route Wireframe mục tiêu | `/manage-courts` |
| Component Codebase | `ManageCourtsClient.tsx`, `CourtCardGrid.tsx`, `CourtTable.tsx`, `CourtStats.tsx`, `CourtFormModal.tsx`, `CourtStatusModal.tsx`, `CourtOperationsModal.tsx`, `PricingTimeline.tsx` |
| Tình trạng Codebase | Đang chạy |
| Điều hướng ra | – |

> **Hiện trạng Codebase & Định hướng hoàn thiện tương lai:**
> - *Codebase hiện tại:* Có thẻ số liệu, chuyển Thẻ/Danh sách, `CourtFormModal` (Tên sân, Mô tả, Giá mặc định/giờ, Giờ mở/đóng), `CourtStatusModal` (Hoạt động / Bảo trì / Đóng và ô Lý do tùy chọn) và `CourtOperationsModal` gộp giờ hoạt động + bảng giá theo từng ngày trong tuần (kèm `PricingTimeline` chia mốc 30 phút, cảnh báo "Bảng giá sẽ được điều chỉnh"). Chưa có nút Xóa sân, chưa có bước xem trước khi thêm sân, form chưa có chọn trạng thái ban đầu.
> - *Chuẩn Wireframe tương lai:* Bổ sung bước xem trước cấu hình sân trước khi lưu (BR-25, UC-31), chọn trạng thái ban đầu, và Xóa mềm sân khi hết đơn Chờ xác nhận/Đã xác nhận (UC-33, BR-19). Bỏ ô Lý do ở modal Đổi trạng thái (UC-23 không có lý do, nhật ký không có cột lý do — BR-14). Không có trường Kích thước/Mặt sân vì SRS, UC và dữ liệu sân không có `[G-01]`.

### 15.1. Wireframe danh sách sân

Chế độ **Thẻ** (mặc định, `CourtCardGrid.tsx`). Nút chuyển Thẻ/Danh sách và nút Thêm sân mới nằm ở Topbar (`createPortal` vào `admin-header-actions`).

```text
+--------------------------+----------------------------------------------------------------------------------------+
| ShuttleVN         [Admin]| QUẢN LÝ SÂN                                  Nguyễn Thị C · Quản trị viên  [Đăng xuất] |
+--------------------------+----------------------------------------------------------------------------------------+
|                          | [ Thẻ ]  [ Danh sách ]                                               [ + Thêm sân mới ]|
|   Bảng điều khiển        |                                                                                        |
|   Thống kê               | +--------------------------+ +--------------------------+ +--------------------------+ |
|   Lịch sân               | | Tổng số sân              | | Đang hoạt động           | | Đang bảo trì             | |
|   Yêu cầu đặt sân        | | 4                        | | 2                        | | 1                        | |
|   Thanh toán             | +--------------------------+ +--------------------------+ +--------------------------+ |
| > Quản lý sân            |                                                                                        |
|   Khách hàng             | +----------------------------------------+ +----------------------------------------+  |
|   Nhân viên              | | Sân A1  [Đang hoạt động]               | | Sân A2  [Đang hoạt động]               |  |
|   Đặt sân toàn hệ thống  | | Sân tiêu chuẩn                         | | Gần quầy lễ tân                        |  |
|   Nhật ký hoạt động      | |                                        | |                                        |  |
|                          | | [ Lịch & giá ] [ Đổi trạng thái ]      | | [ Lịch & giá ] [ Đổi trạng thái ]      |  |
|                          | | [ Chỉnh sửa ]                          | | [ Chỉnh sửa ]                          |  |
|                          | +----------------------------------------+ +----------------------------------------+  |
|                          |                                                                                        |
|                          | +----------------------------------------+ +----------------------------------------+  |
|                          | | Sân A3  [Bảo trì]                      | | Sân A4  [Đóng cửa]                     |  |
|                          | | Đang sửa sàn                           | | Sân dự phòng                           |  |
|                          | |                                        | |                                        |  |
|                          | | [ Lịch & giá ] [ Đổi trạng thái ]      | | [ Lịch & giá ] [ Đổi trạng thái ]      |  |
|                          | | [ Chỉnh sửa ]                          | | [ Chỉnh sửa ]                          |  |
|                          | +----------------------------------------+ +----------------------------------------+  |
|                          |                                                                                        |
|                          | (i) Chế độ Danh sách: bảng Sân / Mô tả / Trạng thái / Thao tác.                        |
|                          | (i) Sân đã xóa mềm không hiện ở đây và không hiện ở lưới đặt sân.                      |
+--------------------------+----------------------------------------------------------------------------------------+
```

| Thành phần | Quy tắc |
|---|---|
| Thẻ số liệu | `CourtStats.tsx`: Tổng số sân, Đang hoạt động, Đang bảo trì. Không có "Tỷ lệ lấp đầy" |
| Chuyển Thẻ / Danh sách | `CourtCardGrid.tsx` / `CourtTable.tsx`. Cùng dữ liệu, cùng thao tác |
| Thẻ sân | Tên, nhãn trạng thái, Mô tả và 3 thao tác: **Lịch & giá**, đổi trạng thái, **Chỉnh sửa** |
| Chế độ Danh sách | Cột Sân, Mô tả, Trạng thái, Thao tác. Thêm nút Xóa (mở modal mục 15.3) |
| Đổi trạng thái | Dùng modal ở mục 12.3 (Hoạt động / Bảo trì / Đóng). Còn đơn Chờ xác nhận/Đã xác nhận thì không chuyển sang Bảo trì/Đóng được |
| Chỉnh sửa | Mở form (mục 15.2) ở chế độ sửa |
| Lịch & giá | Mở một modal cấu hình theo ngày trong tuần (mục 15.4) |
| Rỗng | "Chưa có sân nào. Bấm Thêm sân mới để bắt đầu." |

### 15.2. Form Thêm / Sửa sân

```text
+--------------------------------------------------------------------------+
| THÊM SÂN MỚI                                                         [X] |
+--------------------------------------------------------------------------+
| Tên sân *                 [ Sân A4________________________ ]             |
| Mô tả                     [ Sân góc, gần cửa sổ___________ ]             |
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
| Trạng thái | Có (khi thêm) | Hoạt động, Bảo trì hoặc Đóng |
| Giờ mở/đóng cửa mặc định | Có (khi thêm) | Giờ mở nhỏ hơn giờ đóng, ở phút 00 hoặc 30 |
| Đơn giá mặc định | Có (khi thêm) | Số nguyên VND lớn hơn 0 |

- **Thêm sân:** (code hiện tại lưu ngay, chưa có xem trước) bắt buộc bấm **Xem trước** để thấy cấu hình kết quả rồi mới **Lưu sân**. Một giao dịch lưu sân, **7 lịch mở cửa** (mỗi ngày trong tuần một lịch) và **7 mốc giá** (tại giờ mở cửa), ghi nhật ký. Lỗi ở bước nào thì hoàn tác, không để sân thiếu giá.
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

### 15.4. Modal Lịch & giá `M-13` (UC-34, UC-35)

Một modal rộng (`CourtOperationsModal.tsx`) cấu hình **hằng tuần**: cột trái chọn ngày (Thứ 2 đến Chủ nhật), cột phải có 2 khối **Giờ hoạt động** (UC-34) và **Khung giá** (UC-35), mỗi khối có nút lưu riêng.

```text
+--------------------------------------------------------------------------------------------------+
| THIẾT LẬP HẰNG TUẦN                                                                          [X] |
| Lịch và bảng giá · Sân A1                                                                        |
| Áp dụng cố định cho mọi tuần.                                                                    |
+-----------------+--------------------------------------------------------------------------------+
| 01 Thứ 2        | GIỜ HOẠT ĐỘNG                                                       [x] Mở cửa |
| 02 Thứ 3        | 00:00     06:00     12:00     18:00     24:00                                  |
| 03 Thứ 4        | [//////|=== 06:00–22:00 ===================|///////]                           |
| 04 Thứ 5        | Giờ mở [ 06:00 v ]     Giờ đóng [ 22:00 v ]                      [ Lưu lịch ]  |
| > 05 Thứ 6      | (i) Bảng giá sẽ được điều chỉnh: tự loại 1 khung giá nằm ngoài giờ hoạt động.  |
| 06 Thứ 7        |                                                                                |
| 07 Chủ nhật     | KHUNG GIÁ                                                     [ Lưu bảng giá ] |
|                 | 06:00 |=========== 60.000 ₫/giờ ===========|== 100.000 ₫/giờ ==| 22:00         |
|                 | (kéo điểm chia / thêm, xóa mốc; bước 30 phút)                                  |
|                 | (v) Đã bao phủ đủ 06:00–22:00. Các điểm chia được khóa theo bước 30 phút.      |
+-----------------+--------------------------------------------------------------------------------+
```

| Thành phần | Quy tắc |
|---|---|
| Cột ngày | Mỗi sân đúng một lịch và một bảng giá cho mỗi ngày trong tuần; cấu hình từng ngày. Ngày theo chuẩn ISO-8601 (Thứ 2 = 01) |
| Mở cửa | Bỏ chọn là ngày nghỉ: đánh dấu không khả dụng, không xóa lịch. Ngày nghỉ không cần cấu hình giá |
| Giờ mở/đóng | Phút 00 hoặc 30, giờ mở nhỏ hơn giờ đóng, không qua nửa đêm. Mở rộng giờ được phép nếu không ảnh hưởng đơn hiện có |
| Thay giờ hoạt động | Giao diện tự co/dãn mốc giá cho khớp; khối cảnh báo vàng cho biết số khung giá sẽ bị loại **trước khi lưu** (xem trước điều chỉnh, UC-34) |
| Khung giá | Thanh timeline `PricingTimeline`: các đoạn nối liền, mốc đầu bằng giờ mở cửa, các mốc cách nhau tối thiểu 30 phút, đơn giá là số nguyên VND lớn hơn 0 |
| Nút Lưu lịch / Lưu bảng giá | Hai nút độc lập. Lưu bảng giá **thay toàn bộ** bảng giá hiện hành của ngày đó, ghi nhật ký. Lỗi thì khôi phục bảng giá từ máy chủ và báo lỗi |
| Lỗi lưu lịch | Làm đơn Chờ xác nhận/Đã xác nhận nằm ngoài giờ mở hoặc không khả dụng: từ chối. Thay đổi trong ngày hiện tại loại khỏi giờ mở các lượt đã ghi nhận Hoàn thành: từ chối |
| Đơn cũ | Tổng tiền và đơn giá đã lưu trên đặt sân cũ **không đổi** |

---

## WF-16: Quản lý nhân viên & Phân quyền

| Mục | Nội dung |
|---|---|
| Mã màn hình | WF-16 Quản lý nhân viên & Phân quyền (một màn hình, như `/employees`) |
| Use-case | UC-36 Thêm nhân viên; UC-37 Sửa nhân viên; UC-38 Đổi vai trò; UC-27 Khóa/mở khóa; UC-39 Xóa tài khoản |
| Đối tượng | Quản trị viên |
| Route Codebase hiện tại | `/employees` (`src/app/(admin)/employees/page.tsx`) |
| Route Wireframe mục tiêu | `/employees` |
| Component Codebase | `EmployeesClient.tsx`, `EmployeeFormModal.tsx` |
| Tình trạng Codebase | Đang chạy |
| Điều hướng ra | – |

> **Hiện trạng Codebase & Định hướng hoàn thiện tương lai:**
> - *Codebase hiện tại:* `EmployeesClient.tsx` là một màn hình duy nhất: 3 thẻ số liệu (Tổng nhân viên, Đang hoạt động, Quản trị viên), ô tìm kiếm, lọc theo vai trò và trạng thái, bảng (Nhân viên kèm mã, Vai trò, Liên hệ, Trạng thái, Thao tác) với 3 nút Sửa, Khóa/Mở khóa, Xóa; tải tối đa 100 nhân viên, chưa phân trang. `EmployeeFormModal.tsx`: Họ và tên, SĐT (`^0\d{9}`), Email, Mật khẩu tối thiểu 8 ký tự (chỉ khi thêm); chưa có lựa chọn Vai trò. Khóa/Mở khóa chạy ngay không hỏi lại; Xóa dùng hộp xác nhận.
> - *Chuẩn Wireframe tương lai:* Giữ một màn hình và một mục menu "Nhân viên" `[G-22]` (không tách "Tài khoản & Phân quyền"). Nới SĐT 8–15 chữ số, mật khẩu 8–128 (BR-26). Thêm lựa chọn Vai trò trong form Thêm/Sửa (UC-36, UC-38). Bảo vệ Quản trị viên Hoạt động cuối cùng khi khóa, xóa, hạ quyền (BR-27). Không có ca làm việc/chấm công (X-04).

### 16.1. Màn hình Quản lý nhân viên

```text
+--------------------------+----------------------------------------------------------------------------------------+
| ShuttleVN         [Admin]| QUẢN LÝ NHÂN VIÊN                            Nguyễn Thị C · Quản trị viên  [Đăng xuất] |
+--------------------------+----------------------------------------------------------------------------------------+
|                          |                                                                   [ + Thêm nhân viên ] |
|   Bảng điều khiển        |                                                                                        |
|   Thống kê               | +--------------------------+ +--------------------------+ +--------------------------+ |
|   Lịch sân               | | Tổng nhân viên           | | Đang hoạt động           | | Quản trị viên            | |
|   Yêu cầu đặt sân        | | 3                        | | 2                        | | 1                        | |
|   Thanh toán             | +--------------------------+ +--------------------------+ +--------------------------+ |
|   Quản lý sân            |                                                                                        |
|   Khách hàng             | [ Tìm tên, email, SĐT...  ] [Tất cả vai trò v] [Tất cả trạng thái v]   3 nhân viên     |
| > Nhân viên              |                                                                                        |
|   Đặt sân toàn hệ thống  | Nhân viên      Vai trò         Liên hệ               Trạng thái  Thao tác              |
|   Nhật ký hoạt động      | -------------- --------------- --------------------- ----------- -------------------   |
|                          | Trần Văn B     [Nhân viên]     0911111111            [Hoạt động] [Sửa][Khóa][Xóa]      |
|                          | NV-0001                        tran.vb@shuttlevn.vn                                    |
|                          | Nguyễn Thị C   [Quản trị viên] 0922222222            [Hoạt động] [Sửa][Khóa][Xóa]      |
|                          | NV-0002                        nguyen.c@shuttlevn.vn                                   |
|                          | Lê Văn F       [Nhân viên]     0933333333            [Bị khóa]   [Sửa][Mở khóa][Xóa]   |
|                          | NV-0003                        le.f@shuttlevn.vn                                       |
|                          |                                                                                        |
|                          | (!) Không thể khóa, xóa hoặc hạ quyền Quản trị viên đang hoạt động cuối cùng.          |
+--------------------------+----------------------------------------------------------------------------------------+
```

| Thành phần | Quy tắc |
|---|---|
| Thẻ số liệu | Tổng nhân viên, Đang hoạt động, Quản trị viên. Không có "Ca làm hôm nay" |
| Tìm kiếm và lọc | Tìm theo họ tên, email, SĐT; lọc Vai trò (Quản trị viên / Nhân viên) và Trạng thái (Hoạt động / Bị khóa) |
| Cột | Nhân viên (họ tên + mã), Vai trò, Liên hệ (SĐT + email), Trạng thái tài khoản, Thao tác |
| Không vẽ | Ca làm việc, ngày nghỉ, giờ vào làm, phòng ban (đã loại khỏi phạm vi) |
| Rỗng | "Không tìm thấy nhân viên" |
| Thêm nhân viên | Nút ở vùng hành động của Topbar, mở form mục 16.2 |

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
| [ Hủy ]                                               [ Thêm nhân viên ] |
+--------------------------------------------------------------------------+
```

| Trường | Bắt buộc | Quy tắc |
|---|---|---|
| Họ và tên | Có | Không rỗng |
| Số điện thoại | Có | 8–15 chữ số, cho phép `+` ở đầu. Không là khóa duy nhất |
| Email | Có | Đúng định dạng, không trùng email đăng nhập của tài khoản khác. Đồng bộ làm email đăng nhập, không đổi sau khi tạo |
| Vai trò | Có | Nhân viên hoặc Quản trị viên |
| Mật khẩu ban đầu | Có | Quản trị viên nhập trực tiếp, 8–128 ký tự |

Form Sửa dùng cùng bố cục: không có ô Mật khẩu, Email khóa, được đổi Họ tên, SĐT và Vai trò (UC-37, UC-38; quyền mới có hiệu lực ở yêu cầu tiếp theo). Một giao dịch tạo hồ sơ nhân viên và tài khoản liên kết một-một, ghi nhật ký. Xung đột đồng thời: hoàn tác, không để lại tài khoản hoặc hồ sơ mồ côi. Tài khoản nội bộ chỉ do Quản trị viên tạo, không có tự đăng ký.

### 16.3. Thao tác trên dòng nhân viên

| Nút | Quy tắc |
|---|---|
| **Sửa** | Mở form mục 16.2 ở chế độ sửa (Họ tên, SĐT, Vai trò; Email khóa) |
| **Khóa / Mở khóa** | Quản trị viên khóa/mở khóa được mọi loại tài khoản; chỉ Quản trị viên mở khóa tài khoản nội bộ. Hành vi giống mục 14.4 (mở khóa đưa bộ đếm sai về 0) |
| **Xóa** | Mở modal mục 16.4 (hard-delete tài khoản, giữ hồ sơ nhân viên) |
| Đổi vai trò | Nhân viên ↔ Quản trị viên qua ô Vai trò trong form Sửa. Không chuyển loại hồ sơ Khách ↔ Nhân viên |
| Bảo vệ Quản trị viên cuối | Không khóa, xóa hoặc hạ quyền Quản trị viên `ACTIVE` cuối cùng. Giao diện hiện cảnh báo và máy chủ từ chối |
| Tài khoản khách | Khóa/mở khóa ở WF-14; Quản trị viên xóa tài khoản khách bằng cùng modal 16.4. Không có nút Thêm tài khoản khách ở đây |

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
| Route Wireframe mục tiêu | `/bookings` |
| Component Codebase | *Chưa tạo file* |
| Tình trạng Codebase | Chưa triển khai (thuộc US-23 đang phát triển) |
| Điều hướng ra | Chọn đơn → xem lịch sử trạng thái; xử lý phát sinh ở WF-11 |

> **Hiện trạng Codebase & Định hướng hoàn thiện tương lai:**
> - *Codebase hiện tại:* Chưa có route độc lập trong `src/app/(admin)/`.
> - *Chuẩn Wireframe tương lai:* Xây dựng `/bookings` lọc đa tiêu chí cho QTV: ngày chơi giờ VN (D8), sân, trạng thái đơn, trạng thái thanh toán, xem timeline từng đơn.

### 17.1. Wireframe

```text
+--------------------------+-------------------------------------------------------------------------------------------+
| ShuttleVN         [Admin]| TẤT CẢ ĐẶT SÂN (TOÀN HỆ THỐNG)                  Nguyễn Thị C · Quản trị viên  [Đăng xuất] |
+--------------------------+-------------------------------------------------------------------------------------------+
|                          |                                                                                           |
|   Bảng điều khiển        |                                                                                           |
|   Thống kê               |                                                                                           |
|   Lịch sân               | Từ ngày [ 09/08/2026 ]  Đến ngày [ 14/08/2026 ]  (giờ Việt Nam)                           |
|   Yêu cầu đặt sân        | Sân [ Tất cả v ]  Trạng thái đơn [ Tất cả v ]  Thanh toán [ Tất cả v ]                    |
|   Thanh toán             | Khách hàng [ họ tên / SĐT / email ]                      [Lọc] [Xóa lọc]                  |
|   Quản lý sân            |                                                                                           |
|   Khách hàng             | Mã đơn    Khách       Sân  Ngày giờ           Tổng tiền   Trạng thái    Thanh toán        |
|   Nhân viên              | --------  ----------  ---  -----------------  ----------  ------------  ----------------  |
| > Đặt sân toàn hệ thống  | DS-12AB5  Trần Thị B  A2   14/08 18:00-19:30  150.000 ₫   Chờ xác nhận  Chưa lập hóa đơn  |
|   Nhật ký hoạt động      | DS-7K3QP  Lê Văn C    A1   14/08 18:00-19:00  100.000 ₫   Đã xác nhận   Chưa thanh toán   |
|                          | DS-3E5PL  Trần Thị B  A1   11/08 19:00-20:00  100.000 ₫   Hoàn thành    Đã thanh toán     |
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
+--------------------------+-------------------------------------------------------------------------------------------+
```

### 17.2. Chi tiết thành phần

| Bộ lọc | Quy tắc |
|---|---|
| Từ ngày – Đến ngày | Theo ngày sử dụng, giờ Việt Nam, gồm cả hai ngày. Từ ngày lớn hơn Đến ngày: báo lỗi, không tải |
| Sân | Danh sách sân, gồm cả sân đã xóa với nhãn "Sân đã xóa #<mã>" |
| Trạng thái đơn | Tất cả, Chờ xác nhận, Đã xác nhận, Hoàn thành, Đã hủy |
| Trạng thái thanh toán | Tất cả, Chưa lập hóa đơn, Chưa thanh toán, Đã thanh toán `[G-23]` |
| Truy cập | Mục menu riêng "Đặt sân toàn hệ thống" (`/bookings`), chỉ Quản trị viên. API `GET /admin/bookings` |
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
| Route Wireframe mục tiêu | `/statistics` |
| Component Codebase | `statistics/page.tsx` |
| Tình trạng Codebase | 100% Placeholder |
| Điều hướng ra | – |

> **Hiện trạng Codebase & Định hướng hoàn thiện tương lai:**
> - *Codebase hiện tại:* File `statistics/page.tsx` hiện chỉ là placeholder thông báo đang phát triển.
> - *Chuẩn Wireframe tương lai:* Xây dựng báo cáo Doanh thu (chỉ cộng hóa đơn Paid, nhóm Ngày/Tháng theo QT-17) và Báo cáo Đặt sân (tách lượt Hoàn thành). Tuyệt đối không có chỉ số "Tỷ lệ lấp đầy" (X-04).

### 18.1. Wireframe

```text
+--------------------------+-------------------------------------------------------------------------------------------+
| ShuttleVN         [Admin]| BÁO CÁO & THỐNG KÊ                              Nguyễn Thị C · Quản trị viên  [Đăng xuất] |
+--------------------------+-------------------------------------------------------------------------------------------+
|                          |                                                                                           |
|   Bảng điều khiển        | Từ ngày [ 10/08/2026 ]  Đến ngày [ 14/08/2026 ]                                           |
| > Thống kê               | Nhóm theo [*Ngày*] [Tháng]                                [ Xem báo cáo ]                 |
|   Lịch sân               |                                                                                           |
|   Yêu cầu đặt sân        | DOANH THU (hóa đơn hợp lệ Đã thanh toán, theo thời điểm thu)                              |
|   Thanh toán             | Tổng doanh thu:  5.210.000 ₫                                                              |
|   Quản lý sân            |                                                                                           |
|   Khách hàng             | Ngày      Số HĐ đã thu    Doanh thu                                                       |
|   Nhân viên              | --------  --------------  --------------                                                  |
|   Đặt sân toàn hệ thống  | 10/08     6               720.000 ₫                                                       |
|   Nhật ký hoạt động      | 11/08     9               1.080.000 ₫                                                     |
|                          | 12/08     7               840.000 ₫                                                       |
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
+--------------------------+-------------------------------------------------------------------------------------------+
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
| Route Wireframe mục tiêu | `/audits` |
| Component Codebase | `audits/page.tsx` |
| Tình trạng Codebase | 100% Placeholder |
| Điều hướng ra | – |

> **Hiện trạng Codebase & Định hướng hoàn thiện tương lai:**
> - *Codebase hiện tại:* File `audits/page.tsx` hiện chỉ là placeholder thông báo đang phát triển.
> - *Chuẩn Wireframe tương lai:* Xây dựng bảng audit bất biến, chỉ đọc, không cột lý do (BR-14), hiển thị giá trị Trước/Sau. Loại bỏ hoàn toàn cảnh báo phần cứng/CPU/sao lưu (X-04).

### 19.1. Wireframe

```text
+--------------------------+-------------------------------------------------------------------------------------------+
| ShuttleVN         [Admin]| NHẬT KÝ HOẠT ĐỘNG                               Nguyễn Thị C · Quản trị viên  [Đăng xuất] |
+--------------------------+-------------------------------------------------------------------------------------------+
|                          |                                                                                           |
|   Bảng điều khiển        |                                                                                           |
|   Thống kê               | Từ ngày [ 14/08/2026 ]  Đến ngày [ 14/08/2026 ]  Tác nhân [ Tất cả v ]                    |
|   Lịch sân               | Đối tượng [ Tất cả v ]  Thao tác [ Tất cả v ]                     [Lọc] [Xóa lọc]         |
|   Yêu cầu đặt sân        |                                                                                           |
|   Thanh toán             | Thời điểm UTC+7   Tác nhân                Thao tác            Đối tượng                   |
|   Quản lý sân            | ----------------  ----------------------  ------------------  ------------------------    |
|   Khách hàng             | 14/08/2026 07:40  Quản trị · Nguyễn C     Sửa bảng giá        Sân A1 · Thứ 6              |
|   Nhân viên              |     Trước: 17:00 -> 90.000 ₫/giờ        Sau: 17:00 -> 100.000 ₫/giờ                       |
|   Đặt sân toàn hệ thống  | 14/08/2026 07:30  Nhân viên · Trần Văn B  Đổi lịch đặt sân    Đặt sân DS-7K3QP            |
| > Nhật ký hoạt động      |     Trước: A1 · 17:00–18:00             Sau: A1 · 18:00–19:00                             |
|                          | 14/08/2026 07:20  Nhân viên · Trần Văn B  Lập hóa đơn         Hóa đơn HD-20260814-001     |
|                          |     Trước: (chưa có)                    Sau: Chưa thanh toán · 100.000 ₫                  |
|                          | 14/08/2026 07:20  Nhân viên · Trần Văn B  Xác nhận đặt sân    Đặt sân DS-7K3QP            |
|                          |     Trước: Chờ xác nhận                 Sau: Đã xác nhận                                  |
|                          | 14/08/2026 00:00  Hệ thống                Chốt đơn qua ngày   Đặt sân DS-9X1AB            |
|                          |     Trước: Đã xác nhận                  Sau: Hoàn thành                                   |
|                          |                                                                                           |
|                          | Hiển thị 1–5 / 38                                        [<]  1  [>]    Mỗi trang: [20 v] |
|                          |                                                                                           |
|                          | (i) Bảng chỉ đọc, bất biến. Không có thao tác thêm/sửa/xóa và không có cột lý do.         |
+--------------------------+-------------------------------------------------------------------------------------------+
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

Nguyên tắc: SRS 1.7 và UC 1.5 là nguồn chuẩn về nghiệp vụ; mã nguồn hiện tại là chuẩn về bố cục và luồng giao diện. Điểm chưa khớp hoặc chưa có trong SRS/UC được **gắn nhãn** để bạn quyết định.

| Mã | Nội dung | Cách xử lý trong wireframe |
|---|---|---|
| G-01 | Kích thước và mặt sân ở lưới sân: SRS, UC, dữ liệu sân (`Court`) và form thêm sân không có hai trường này; lưới sân hiện hiển thị `description` | Đã bỏ khỏi wireframe, thay bằng Mô tả. Muốn giữ phải bổ sung vào SRS/UC và dữ liệu sân |
| G-02 | Tab Đổi mật khẩu chưa có use-case trong SRS/UC (O-06), nhưng backend `PUT /profile/change-password` và tab "Bảo mật" đã chạy | Vẽ tab như code, không còn đánh dấu tạm ẩn. Nên bổ sung use-case vào SRS/UC |
| G-03 | Header của khách chưa đăng nhập có hiện "Lịch sử đặt sân" hay không | Ẩn, vì lịch sử chỉ dành cho khách thành viên. Dễ đổi thành hiện và dẫn tới Đăng nhập nếu bạn muốn |
| G-04 | "05:00–22:00" là khung mẫu. Quy tắc thật là giờ mở cửa cấu hình theo từng sân, từng ngày trong tuần | Lưới lấy cột theo giờ mở cửa thực tế |
| G-05 | Nhãn thanh toán cho đơn Đã hủy chưa được SRS nêu | Hiển thị "—" |
| G-06 | Số hotline chưa có trong SRS/UC | Đã giải quyết: nhóm chốt số `1900 1234`, lưu ở một hằng cấu hình `APP_CONFIG.hotline`; `{Hotline}` lấy từ hằng này |
| G-07 | Trường Xác nhận mật khẩu mới ở Quên mật khẩu chưa có trong UC-04 | Thêm theo cách đã làm ở Đăng ký (chỉ kiểm tra ở giao diện). Bỏ được nếu muốn bám sát UC |
| G-08 | Báo "email đã có tài khoản" lúc đăng ký (BR-11) với yêu cầu không tiết lộ tài khoản tồn tại ở luồng gửi mã công khai (BR-26) | Vẽ banner dẫn tới Đăng nhập/Quên mật khẩu theo BR-11. Cần xác nhận thời điểm báo (trước hay sau khi xác minh OTP) |
| G-09 | Khung "Chi tiết đơn" ở Lịch sử chưa có trong mockup HTML | Thêm khung chi tiết gọn, chỉ gồm thông tin đã có trên thẻ |
| G-10 | Mockup HTML cũ (UI-MockUp) chỉ là bản phác thảo ban đầu | Wireframe lấy mã nguồn Next.js hiện tại và Design-System làm căn cứ giao diện, SRS 1.7/UC 1.5 làm căn cứ nghiệp vụ |
| G-11 | Widget AI hiện trên các trang Cổng Khách hàng, ẩn ở Cổng Quản trị; giới hạn độ dài câu hỏi chưa quy định | Giả định: widget hiện ở mọi trang Cổng Khách hàng và ẩn ở Cổng Quản trị |
| G-12 | Ô "Đặt của bạn" trên lưới có bấm được không | Không bấm được, chỉ tooltip |
| G-13 | Sân Bảo trì/Đóng hiển thị thế nào trên lưới khi chú giải chỉ có 4 trạng thái | Cả hàng hiện ô Đóng cửa + badge trạng thái sân trên nhãn hàng |
| G-14 | Bảng điều khiển không có use-case trong SRS/UC (O-05). Tiêu chí "đơn cần xử lý gấp" chưa được định nghĩa | Giữ bố cục đang chạy (3 thẻ, biểu đồ doanh thu 7 ngày, thẻ Chờ xác nhận, Đặt sân gần đây); bỏ Tỷ lệ lấp đầy. Chờ xác nhận xếp giờ chơi gần nhất trước (đề xuất). Không có chuông, xuất báo cáo. Cần xác nhận giữ biểu đồ |
| G-15 | Nút Đăng xuất ở Topbar chưa có use-case (D-21). Trang đích của nhân viên sau đăng nhập đã được bạn chốt là Yêu cầu đặt sân (đóng O-03 i) | Vẽ nút Đăng xuất theo yêu cầu. Nhân viên vào `/booking-requests` |
| G-16 | Yêu cầu WF-11 chỉ liệt kê 4 modal. Hủy theo yêu cầu khách và Đổi lịch thay khách (NV-11, UC-09, UC-10, F-NV-04) không nằm trong danh sách đó | Vẽ thêm, vì khách vãng lai chỉ hủy/đổi được qua nhân viên. Nếu muốn giữ đúng 4 modal thì bỏ mục 11.7 |
| G-17 | Hoàn tiền M-11 được yêu cầu đặt ở WF-13, nhưng theo luồng F-NV-07 phần D nó là bước trong giao dịch hủy/đổi lịch đơn đã thanh toán, không phải nút độc lập trên danh sách hóa đơn | Vẽ modal ở WF-13 như yêu cầu, ghi rõ mở từ WF-11 |
| G-18 | "Xác nhận tạo đơn ngay" ở modal Tạo lịch đặt thay khách | Hiểu là gửi tạo đơn ngay không qua OTP. Đơn tạo ra ở Chờ xác nhận (BR-20, F-NV-09), không tự xác nhận. Chỉ tạo trước giờ bắt đầu |
| G-19 | Nhân viên có sửa họ tên/SĐT khách hay chỉ tra cứu và khóa/mở khóa (O-03 ii: UC-24 cho sửa, mô tả menu X-02 thì không) | Chỉ vẽ tra cứu, xem lịch sử, khóa/mở khóa như yêu cầu. Modal sửa khách chưa vẽ (không đổi email, BR-18) |
| G-20 | Khách vãng lai không có tài khoản | Cột trạng thái "—", không có nút Khóa/Mở khóa |
| G-21 | Mockup có thẻ số liệu, xuất Excel/PDF/CSV, ghi chú nội bộ của khách, đặt lại mật khẩu bởi quản trị (O-01 b) | Không vẽ, vì yêu cầu thiết kế không liệt kê và SRS/UC chưa có |
| G-22 | Menu "Quản lý nhân viên" và "Tài khoản & Phân quyền" | Gộp thành một mục "Nhân viên" (`/employees`) đúng như code; đổi vai trò nằm trong form Sửa |
| G-23 | UC-40 lọc theo ngày, sân, trạng thái, khách hàng; yêu cầu thiết kế có thêm "trạng thái thanh toán" | WF-17 là mục menu riêng "Đặt sân toàn hệ thống" (`/bookings`) như Design-System. Giữ bộ lọc thanh toán |
| G-24 | Mockup thống kê có nhóm theo tuần, so sánh kỳ trước, lọc theo sân, tab Tình trạng sân (O-01 b) | Chỉ vẽ nhóm theo Ngày/Tháng (QT-17) |
| G-25 | Nhật ký ở mockup có cột IP, sự kiện đăng nhập, cảnh báo hệ thống | Không vẽ (X-04, O-01 b) |
| G-26 | Tra cứu nhanh theo mã đặt sân/SĐT/email (UC-30, M-12) chưa có màn hình riêng | Thanh tìm kiếm WF-14 phủ tìm khách. Tìm theo mã đặt sân chưa vẽ |
| G-27 | SRS chưa nêu giới hạn cho thời điểm thu và thời điểm hoàn tiền | Đề xuất đã áp dụng: thời điểm thu (Xác nhận đặt sân, Ghi nhận hoàn thành, Thu tiền) không sau thời điểm hiện tại của máy chủ. Thời điểm hoàn không sau thời điểm hiện tại và không trước thời điểm thu của hóa đơn gốc. Máy chủ kiểm tra, nên bổ sung vào SRS |
| G-28 | Nút "Xác nhận đã thu" ở thẻ Hóa đơn của WF-11 có trong mockup nhưng chưa có xử lý (D-09) | Vẽ nút mở cùng modal Thu tiền của WF-13 |

| G-29 | Luồng đặt sân của khách là 2 bước (lưới → trang xác nhận `/booking`, `/booking/guest`) thay vì popup/thẻ đặt nhanh trong trang lưới | Wireframe theo luồng code, vẫn bám KH-08, KH-09, KH-11 |
| G-30 | Trang xác nhận đặt sân thay vì modal thành công; code hiện tại hiển thị mã tại chỗ | Giữ khối thành công trong trang, thêm nút Tra cứu đơn / Xem lịch sử |
| G-31 | Popover chọn thời lượng của code chỉ liệt kê đến 3 giờ, SRS (BR-20) không đặt mức tối đa | Giữ danh sách đến 3 giờ như code; cần xác nhận có giới hạn nghiệp vụ hay chỉ là giới hạn giao diện |

---

## Bảng tổng hợp đối chiếu Hiện trạng Codebase (Codebase Reality)

| Mã WF | Màn hình | File Codebase | Hiện trạng đang chạy | Khoảng cách cần bổ sung lên Chuẩn Wireframe |
|---|---|---|---|---|
| WF-01 | Đăng ký | `register/page.tsx`, `RegisterForm.tsx` | Form + mã xác thực inline, mật khẩu min 6 | Modal OTP 6 ô rời (M-01); mật khẩu 8–128 (BR-11, BR-26) |
| WF-02 | Đăng nhập | `login/page.tsx`, `LoginForm.tsx`, `useAuth.ts` | Form chạy; Nhân viên vào `/dashboard` | Mật khẩu 8–128; Nhân viên vào `/booking-requests` (X-02); link Quên MK → `/forgot-password` |
| WF-03 | Quên MK | *Chưa có file* | Chưa có trang | Trang `/forgot-password` 3 bước (Email → OTP → Mật khẩu mới); API đã có |
| WF-04 | Đặt sân | `courts/CourtsClient.tsx`, `CourtGrid.tsx`, `SlotPopup.tsx`, `booking/*`, `ReservationForm.tsx` | Lưới + popover + trang xác nhận chạy | Mốc 30 phút (BR-20); bảng đơn giá (KH-07); Modal OTP thay mã inline (X-07) |
| WF-05 | Lịch sử | `my-bookings/page.tsx`, `BookingHistoryList.tsx`, `BookingCard.tsx` | Tab, tìm kiếm, phân trang 10, Chi tiết, Hóa đơn, Hủy | Bỏ nút Hóa đơn (D-13); nhãn "Chưa lập hóa đơn" (D-12); Modal Hủy có lý do (M-06) thay hộp thoại trình duyệt; thêm Đổi lịch |
| WF-06 | Tra cứu | `lookup/LookupClient.tsx`, `BookingLookupForm.tsx` | Tra cứu chạy, có nút DEMO | Bắt buộc cặp Mã đơn + SĐT/Email (X-03); xóa DEMO; hotline từ cấu hình |
| WF-07 | Hồ sơ | `profile/ProfileClient.tsx`, `ProfileInfoForm.tsx`, `ChangePasswordForm.tsx` | Hồ sơ + tab Bảo mật chạy | SĐT 8–15 số (BR-26); mật khẩu mới 8–128; không có quản lý phiên/thiết bị (X-04) |
| WF-08 | Trợ lý AI | `app/api/chat` | Có API | Component `ChatWidget.tsx` nổi ở Cổng Khách hàng |
| WF-09 | Dashboard | `dashboard/DashboardClient.tsx`, `DashboardStats.tsx`, `RevenueChart.tsx` | Chạy đủ 4 thẻ + biểu đồ + 2 danh sách | Bỏ thẻ Tỷ lệ lấp đầy (X-04); dòng Chờ xác nhận mở WF-11 |
| WF-10 | Yêu cầu đặt | *Chưa có file*; API `booking-requests` | Chưa có trang | Trang `/booking-requests`, cũ nhất trước (NV-03) |
| WF-11 | Xử lý đơn | *Chưa có file*; API confirm/reject/complete/cancel | Chưa có trang | Trang `/bookings/[id]` có timeline lý do (BR-13) và các modal xử lý; cần API đổi lịch |
| WF-12 | Lịch sân | `schedule/ScheduleClient.tsx` | Timeline ngang chỉ đọc | Thanh ghi tên khách + trạng thái, bấm mở WF-11; modal Đặt tại quầy (X-05); đổi trạng thái sân |
| WF-13 | Thanh toán | `payments/page.tsx` | Placeholder | Bảng hóa đơn, modal Thu tiền, Hoàn tiền; không có nút lập hóa đơn thủ công (D-07); cần API |
| WF-14 | Khách hàng | `customers/CustomersClient.tsx` | Bảng chạy, nút chưa có handler | Tìm kiếm (UC-30), phân trang, Chi tiết + lịch sử, Khóa/Mở khóa (BR-12), Thêm khách (UC-26) |
| WF-15 | Quản lý sân | `manage-courts/*`, `CourtFormModal.tsx`, `CourtStatusModal.tsx`, `CourtOperationsModal.tsx`, `PricingTimeline.tsx` | Thẻ/Danh sách, form, đổi trạng thái, Lịch & giá chạy | Xem trước khi thêm sân (BR-25); chọn trạng thái ban đầu; xóa mềm sân (UC-33); bỏ ô Lý do ở đổi trạng thái |
| WF-16 | Nhân viên | `employees/EmployeesClient.tsx`, `EmployeeFormModal.tsx` | Bảng + form + Khóa/Xóa chạy | Ô Vai trò trong form (UC-38); SĐT 8–15; bảo vệ QTV cuối (BR-27); không ca làm việc (X-04) |
| WF-17 | Toàn HT | *Chưa có file*; API `admin/bookings` | Chưa có trang | Trang `/bookings` lọc đa tiêu chí cho QTV (UC-40) |
| WF-18 | Thống kê | `statistics/page.tsx` | Placeholder | Báo cáo Doanh thu (HĐ Đã thanh toán, Ngày/Tháng, QT-17) và Đặt sân; không Tỷ lệ lấp đầy (X-04) |
| WF-19 | Nhật ký | `audits/page.tsx`; API `audits` | Placeholder | Bảng audit bất biến, chỉ đọc, không cột lý do (BR-14), giá trị Trước/Sau |
