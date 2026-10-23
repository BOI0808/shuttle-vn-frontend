# UI Screens — ShuttleVN

| Mục | Nội dung |
|---|---|
| Phiên bản | 3.1 (thay thế 2.0; đã chốt toàn bộ điểm mở, xem §8) |
| Cập nhật | 23/10/2026 |
| Mục đích | Đối chiếu từng màn hình giữa **codebase hiện tại** và **chuẩn mục tiêu** (nghiệp vụ SRS/UseCase + Wireframes), làm căn cứ để triển khai UI tiếp theo |
| Nguồn nghiệp vụ | `ShuttleVNBackend/docs/product/SRS.md`, `UseCase.md` |
| Nguồn giao diện | `docs/design/Wireframes.md`, `User-Flows.md`, `Design-System.md` |
| Hiện trạng | Đọc trực tiếp mã `shuttle-vn-frontend` (`src/`) và controller/DTO của `ShuttleVNBackend` |

## 0. Cách đọc tài liệu

**Ký hiệu trạng thái:** ✅ đã đúng chuẩn · ⚠ có nhưng lệch chuẩn · ❌ chưa có.

**Thứ tự ưu tiên khi nguồn mâu thuẫn:** SRS/UseCase (nghiệp vụ) → bảng quy tắc và khung ASCII chi tiết trong Wireframes (giao diện mục tiêu) → User-Flows → code hiện tại. Những chỗ chính tài liệu nguồn tự mâu thuẫn đã được xử lý và ghi lại ở **§8** dưới dạng quyết định `QĐ-xx`.

**Mã tham chiếu:** `UC-xx`, `BR-xx`, `NV-xx`, `KH-xx` (SRS/UseCase); `X-xx`, `O-xx` (quyết định/điểm mở trong User-Flows); `G-xx`, `D-xx`, `M-xx` (quyết định và modal trong Wireframes). Mã modal giữ **đúng như Wireframes**; bản 2.0 đánh lại M-01…M-19 gây trùng mã (ví dụ M-08) nên đã bỏ.

**Lưu ý nguồn:** các ghi chú "Hiện trạng Codebase" trong `Wireframes.md` (ví dụ `WalkInBookingForm.tsx`, popup chỉ đóng, `/booking` rỗng) đã **lỗi thời** so với mã. Bản 2.0 của file này sao chép các ghi chú đó nên sai theo. Bản 3.0 lấy hiện trạng trực tiếp từ mã, chỉ lấy **chuẩn mục tiêu** từ Wireframes.

**Route:** "hiện tại" là URL thực tế; "mục tiêu" theo Wireframes (khu quản trị dùng tiền tố `/admin/*`). Thư mục `(customer)`, `(admin)`, `(auth)` là route group nên **không sinh tiền tố URL**; cách chuyển sang `/admin/*` đã chốt ở `QĐ-01` và bảng §2.6.

---

## 1. Bản đồ 19 màn hình

| Mã | Màn hình | Đối tượng | Route hiện tại | Route mục tiêu | UI | API backend |
|---|---|---|---|---|---|---|
| WF-01 | Đăng ký | Khách | `/register` | `/register` | ⚠ | ✅ `auth/issue-code`, `auth/register` |
| WF-02 | Đăng nhập | Tất cả | `/login` | `/login` | ⚠ | ✅ `auth/login` |
| WF-03 | Quên mật khẩu | Khách | — | `/forgot-password` | ❌ | ✅ `auth/issue-code`, `auth/reset-password` |
| WF-04 | Đặt sân & lưới sân | Khách, vãng lai | `/courts`, `/booking`, `/booking/guest` | `/booking` hoặc `/courts` (giữ `/courts`) | ⚠ | ✅ `courts/grid`, `bookings/price-preview`, `bookings`, `bookings/quick` |
| WF-05 | Lịch sử đặt sân | Thành viên | `/my-bookings` | `/my-bookings` | ⚠ | ⚠ có `bookings/me`, `PATCH cancel`; ❌ đổi lịch |
| WF-06 | Tra cứu đơn | Tất cả | `/lookup` | `/lookup` | ⚠ | ❌ FE gọi `bookings/code/{code}`, backend chưa có |
| WF-07 | Hồ sơ cá nhân | Thành viên | `/profile` | `/profile` | ⚠ | ✅ `profile`, `profile/change-password` |
| WF-08 | Widget Trợ lý AI | Tất cả | — | widget toàn site | ❌ | route FE `api/chat` có; không có tool |
| WF-09 | Bảng điều khiển | Admin | `/dashboard` | `/admin/dashboard` | ⚠ | ❌ FE gọi `admin/dashboard/summary`, backend chưa có |
| WF-10 | Yêu cầu đặt sân | NV, Admin | — | `/admin/booking-requests` | ❌ | ✅ `booking-requests` (list, confirm, reject) |
| WF-11 | Chi tiết đặt sân & xử lý | NV, Admin | — | `/admin/bookings/[id]` | ❌ | ⚠ có detail, confirm, reject, complete; ❌ đổi lịch, hoàn tiền |
| WF-12 | Lịch sân & đặt tại quầy | NV, Admin | `/schedule` | `/admin/court-schedule` | ⚠ | ⚠ có `courts/grid`, status; ❌ đặt thay khách |
| WF-13 | Thanh toán & hóa đơn | NV, Admin | `/payments` (rỗng) | `/admin/payments` | ❌ | ❌ danh sách hóa đơn, thu tiền |
| WF-14 | Quản lý khách hàng | NV, Admin | `/customers` | `/admin/customers` | ⚠ | ✅ `accounts/customers`, lock/unlock |
| WF-15 | Quản lý sân & bảng giá | Admin | `/manage-courts` | `/admin/courts` | ⚠ | ⚠ có CRUD, status, schedule, pricing; ❌ xóa mềm |
| WF-16 | Nhân viên & Phân quyền | Admin | `/employees` | `/admin/staff`, `/admin/accounts` | ⚠ | ⚠ có CRUD, lock; ❌ đổi vai trò |
| WF-17 | Đặt sân toàn hệ thống | Admin | — | `/admin/bookings`, hiển thị là tab "Tất cả đặt sân" trong WF-10 (G-23) | ❌ | ✅ `admin/bookings` |
| WF-18 | Báo cáo & Thống kê | Admin | `/statistics` (placeholder) | `/admin/reports` | ❌ | ⚠ chỉ có `statistics/court-usage`; ❌ doanh thu |
| WF-19 | Nhật ký hoạt động | Admin | `/audits` (placeholder) | `/admin/audit-log` | ❌ | ✅ `audits` |

---

## 2. Layout, điều hướng và phân quyền

### 2.1 Phân luồng truy cập (đã đối chiếu `proxy.ts`, `useAuth`, layouts)

| Hạng mục | Hiện trạng | Chuẩn mục tiêu |
|---|---|---|
| `proxy.ts` | Chỉ kiểm tra có cookie. Route công khai: `/login`, `/register`, `/courts`, `/lookup`, `/booking/guest`. Chưa đăng nhập vào route khác bị chuyển về `/courts`. Không kiểm tra vai trò | Thêm `/forgot-password` vào route công khai. Phân quyền theo vai trò ở layout/`RoleGuard` |
| Sau đăng nhập | Customer → `/courts`; Employee, Admin → `/dashboard` (`useAuth`) | Admin → bảng điều khiển; **Nhân viên → Yêu cầu đặt sân** (X-02, G-15). Người đã đăng nhập vào `/login` được chuyển theo vai trò |
| `RoleGuard` | Sai quyền thì chuyển im lặng về `/courts` | Hiện trang 403 "Bạn không có quyền truy cập" (X-02) |
| `(admin)/layout` | Cho Employee và Admin; Customer bị chuyển về `/courts` | Giữ nguyên |
| Phân quyền theo trang | `/dashboard`, `/statistics`, `/audits`, `/employees`: chỉ Admin. `/schedule`, `/payments`, `/customers`: Admin + Employee. **`/manage-courts`: Admin + Employee** | **`/manage-courts` chỉ Admin** (SRS: nhân viên chỉ đổi trạng thái sân qua WF-12). Sửa `allowedRoles` |

### 2.2 Thanh điều hướng khách (`CustomerNav`)

| Hạng mục | Hiện trạng | Chuẩn mục tiêu |
|---|---|---|
| Menu | Logo, "Đặt sân", "Lịch sử đặt sân" (chỉ khi đăng nhập, G-03), "Tra cứu đơn"; chưa đăng nhập chỉ có nút "Đăng Nhập" (`LoginButton`) | Giữ menu. Chưa đăng nhập có **cả "Đăng nhập" và "Đăng ký"** (wireframe 4.1) — thiếu nút Đăng ký |
| Chân trang | ❌ không có | Footer: `© ShuttleVN` và **Hotline** lấy từ cấu hình (G-06) |
| Hotline | Hard-code `1900 1234` ở `BookingLookupResult` | Dùng một hằng cấu hình duy nhất, dùng chung nav, footer, banner khóa, tra cứu, chat |
| Mã thừa | State `menuOpen` và lớp phủ không dùng | Xóa |

### 2.3 Sidebar khu quản trị (`AdminSidebar`)

Hiện có **8 mục / 3 nhóm** (Tổng quan: Bảng điều khiển, Thống kê · Vận hành: Lịch sân, Thanh toán, Quản lý sân · Quản trị: Khách hàng, Nhân viên, Nhật ký hoạt động). `AdminSidebar` hiển thị chung cho mọi vai trò, **chưa lọc theo vai trò**. Nhãn cần đổi: "Thống kê" → "Báo cáo & Thống kê", "Nhân viên" → "Quản lý nhân viên".

**Chuẩn mục tiêu (User-Flows 2.3, Wireframes G-22, G-23):**

| Vai trò | Mục menu |
|---|---|
| Nhân viên (4) | Lịch sân · Yêu cầu đặt sân · Thanh toán · Khách hàng |
| Quản trị viên (10) | Bảng điều khiển · Lịch sân · Yêu cầu đặt sân · Thanh toán · Quản lý sân · Khách hàng · Quản lý nhân viên · Báo cáo & Thống kê · Nhật ký hoạt động · Tài khoản & Phân quyền |

- "Đặt sân toàn hệ thống" **không phải mục menu riêng**: là tab thứ hai trong "Yêu cầu đặt sân", chỉ Admin thấy (G-23).
- Sidebar phải lọc theo `user.role`; mục đang mở được tô sáng.

### 2.4 Thanh tiêu đề quản trị (`AdminHeader`)

| Hạng mục | Hiện trạng | Chuẩn mục tiêu |
|---|---|---|
| Tiêu đề | Map theo pathname; `/payments` → "Xác nhận thanh toán"; `/statistics`, `/audits` rơi về "Admin Panel" | Mỗi trang có tiêu đề đúng tên menu |
| Người dùng | Hiện tên và vai trò | Giữ |
| **Đăng xuất** | ❌ không có | Nút **Đăng xuất** ở góc phải thanh tiêu đề (G-15) |
| Vùng thao tác | `#admin-header-actions` (portal, dùng ở `/manage-courts`); `/employees` dùng sự kiện `open-add-employee` | Thống nhất một cơ chế |

### 2.5 Quy tắc giao diện chung (áp dụng mọi màn hình)

| Nhóm | Quy tắc |
|---|---|
| Nhãn đơn | Chờ xác nhận · Đã xác nhận · Hoàn thành · Đã hủy (không hiện enum tiếng Anh) |
| Nhãn hóa đơn | Chưa lập hóa đơn (đơn chưa có hóa đơn) · Chưa thanh toán · Đã thanh toán · Đã hủy |
| Nhãn sân | Hoạt động · Bảo trì · Đóng |
| Nhãn tài khoản | `Active` → "Hoạt động"; `Disabled` → **"Bị khóa"** (code `ACCOUNT_STATUS_LABEL` đang ghi "Vô hiệu hoá"; `/employees` ghi "Đã khoá" — thống nhất một nhãn) |
| Thời gian | Giờ Việt Nam (UTC+7), định dạng `HH:mm`, ngày `dd/MM/yyyy`; tiền `#.### ₫` |
| Trạng thái tải | Skeleton/spinner khi tải; trạng thái rỗng có câu mô tả; lỗi tải có banner + **Thử lại** |
| Phân trang | Máy chủ phân trang, mặc định 20/trang (`Pagination` dùng chung) |
| Lỗi nghiệp vụ | Hiện thông báo thân thiện, không lộ mã lỗi hay trace |
| Không thể hiện | Tỷ lệ lấp đầy, ca làm việc, đặt cọc, thanh toán một phần, nút lập hóa đơn thủ công (đã loại khỏi phạm vi) |

### 2.6 Chuyển route khu quản trị sang `/admin/*` (`QĐ-01`)

| Route hiện tại | Route mục tiêu | Thư mục sau khi chuyển |
|---|---|---|
| `/dashboard` | `/admin/dashboard` | `src/app/(admin)/admin/dashboard/` |
| `/schedule` | `/admin/court-schedule` | `src/app/(admin)/admin/court-schedule/` |
| `/payments` | `/admin/payments` | `src/app/(admin)/admin/payments/` |
| `/customers` | `/admin/customers` | `src/app/(admin)/admin/customers/` |
| `/manage-courts` | `/admin/courts` | `src/app/(admin)/admin/courts/` |
| `/employees` | `/admin/staff` | `src/app/(admin)/admin/staff/` |
| `/statistics` | `/admin/reports` | `src/app/(admin)/admin/reports/` |
| `/audits` | `/admin/audit-log` | `src/app/(admin)/admin/audit-log/` |
| — (mới) | `/admin/booking-requests`, `/admin/bookings`, `/admin/bookings/[id]`, `/admin/accounts` | tạo trực tiếp tại đường dẫn mới |

Quy tắc thực hiện: giữ `(admin)/layout.tsx` (route group vẫn cấp layout, URL có thêm `/admin`); thêm redirect vĩnh viễn từ route cũ sang route mới trong `next.config`; cập nhật đồng bộ `AdminSidebar`, `AdminHeader` (bảng tiêu đề), `useAuth` (Admin → `/admin/dashboard`, Nhân viên → `/admin/booking-requests`) và `RoleGuard`. Thực hiện **một lần, trước khi tạo trang mới** để không phải di dời lần hai. Route khách hàng giữ nguyên.

---

## 3. Màn hình khách hàng

### WF-01 Đăng ký

`/register` · `app/(auth)/register/page.tsx`, `components/auth/RegisterForm.tsx` · UC-01, UC-02

| Hạng mục | Trạng thái | Hiện trạng → Chuẩn mục tiêu |
|---|---|---|
| Trường | ⚠ | Hiện: Họ tên, Email + nút "Lấy mã", Mã xác thực, SĐT, Mật khẩu, Xác nhận. → Chuẩn: Họ tên, SĐT, Email, Mật khẩu, Xác nhận; **mã OTP nhập trong modal** |
| Xác minh email | ⚠ | Hiện: gửi mã trước khi đăng ký, ô mã nằm trong form. → Chuẩn: bấm **ĐĂNG KÝ** → gửi mã → **modal OTP `M-01`** (6 ô, hiệu lực 10 phút, gửi lại sau 60 giây, sai 5 lần vô hiệu mã) |
| SĐT | ⚠ | Hiện: regex đầu số di động 10 số. → Chuẩn: 8–15 chữ số, cho phép `+` ở đầu |
| Mật khẩu | ⚠ | Hiện: tối thiểu 6, **không giới hạn trên**. → Chuẩn: **8–128 ký tự** (đồng bộ với đổi mật khẩu và nhân viên) |
| Hiện/Ẩn mật khẩu | ✅ | `Input` có nút mắt |
| Thành công | ⚠ | Hiện: toast rồi chuyển `/login`. → Chuẩn: modal "Đăng ký thành công" kèm nút **Đăng nhập ngay** |
| Lỗi | ⚠ | Hiện: chỉ toast. → Chuẩn: lỗi từng trường hiển thị dưới ô, con trỏ nhảy tới ô lỗi đầu tiên; email đã có tài khoản → **banner** dẫn tới Đăng nhập / Quên mật khẩu (G-08); gửi mã thất bại → banner "Không gửi được email xác minh. Vui lòng thử lại.", giữ nguyên dữ liệu |
| Chuẩn hóa dữ liệu | ❌ | Họ tên, Email cắt khoảng trắng; Email đổi chữ thường; SĐT bỏ khoảng trắng/dấu gạch; mật khẩu **không** cắt khoảng trắng |

### WF-02 Đăng nhập

`/login` · `app/(auth)/login/page.tsx`, `components/auth/LoginForm.tsx` · UC-03, BR-12

| Hạng mục | Trạng thái | Hiện trạng → Chuẩn mục tiêu |
|---|---|---|
| Trường | ✅ | Email, Mật khẩu (có Hiện/Ẩn) |
| Kiểm tra mật khẩu | ⚠ | Hiện: tối thiểu 6 ký tự. → Chuẩn: chỉ bắt buộc nhập (không chặn tài khoản cũ ngắn hơn) |
| Quên mật khẩu | ⚠ | Hiện: link `#`. → Chuẩn: link tới `/forgot-password` |
| Sai thông tin | ⚠ | Hiện: toast. → Chuẩn: **banner trong form** "Email hoặc mật khẩu không đúng." (không nói sai ở trường nào, không báo số lần còn lại) |
| Tài khoản bị khóa | ❌ | Chuẩn: **banner khóa** — "Tài khoản đã bị khóa (nhập sai mật khẩu 5 lần liên tiếp hoặc do nhân viên khóa). Vui lòng liên hệ nhân viên qua hotline để được mở khóa. Đặt lại mật khẩu không mở khóa tài khoản." + Hotline. Backend khóa khi sai 5 lần (đã có) |
| Chuyển hướng | ⚠ | Xem §2.1 |

### WF-03 Quên mật khẩu

`/forgot-password` · **chưa có route** · UC-04, UC-02

Luồng 3 bước, tất cả trên một trang: **(1) Nhập email → (2) modal OTP `M-01` → (3) Đặt mật khẩu mới → (4) Thành công.**

| Hạng mục | Quy tắc |
|---|---|
| Bước 1 | Email hợp lệ. Bấm "Gửi mã xác minh" luôn trả thông báo **trung tính** (không tiết lộ email có tồn tại), rồi mở modal OTP |
| Bước 2 | Cùng quy tắc OTP như WF-01 |
| Bước 3 | Mật khẩu mới 8–128 ký tự, xác nhận khớp (chỉ kiểm tra ở giao diện, G-07). Phiên hết hạn → quay lại bước 1 kèm thông báo |
| Bước 4 | Thông báo thành công, nhắc "đặt lại mật khẩu **không mở khóa** tài khoản đang bị khóa", nút **Đăng nhập** |

### WF-04 Đặt sân & lưới sân

`/courts` (lưới), `/booking` (thành viên), `/booking/guest` (vãng lai) · UC-05, UC-06, UC-07, UC-08, BR-03 (bảng giá), BR-04 (báo giá), BR-05, BR-20, BR-28

**Hiện trạng đã xác nhận (khác bản 2.0):**
- `/booking` và `/booking/guest` **không còn là placeholder**; cả hai render `components/booking/ReservationForm.tsx` (trang xác nhận có báo giá).
- Nút đặt trong popup đã điều hướng (hàm `handleReserve` của `CourtGrid`): đã đăng nhập → `/booking`, chưa đăng nhập → `/booking/guest`, kèm `?courtId&date&startTime&endTime`. **Không tồn tại `WalkInBookingForm.tsx`.**
- Giá do máy chủ tính (`usePricePreview`); gửi kèm `totalCost` + `quoteFingerprint`; gặp lỗi 409 hiển thị **báo giá mới** để xác nhận lại; có `Idempotency-Key`.
- Ô đã qua giờ trong ngày hôm nay bị coi là đóng (tooltip "Đã qua"); `handleReserve` chặn thêm lần nữa (toast "Khung giờ này đã qua…") nhưng dựa trên **giờ trình duyệt** — chuẩn là giờ máy chủ.

| Hạng mục | Trạng thái | Hiện trạng → Chuẩn mục tiêu |
|---|---|---|
| Chọn ngày | ⚠ | Hiện: `CustomDatePicker`. → Chuẩn: thêm `[<]` `[>]` và **Hôm nay**; không chọn ngày quá khứ |
| Lưới sân (`CourtGrid`, `CourtSlotCell`) | ⚠ | Hiện: mỗi sân một hàng, **cố định 05:00–22:00**, ô 30 phút (backend cũng cố định 34 ô từ 05:00). → Chuẩn (G-04): giờ hiển thị theo **giờ mở cửa từng sân/ngày**. Phụ thuộc backend |
| Tự tải lại | ✅ | Lưới tự tải lại mỗi 30 giây (`refetchInterval`) — đúng chuẩn |
| Trạng thái ô | ⚠ | Hiện: Trống / Đã đặt / Đóng (`CLOSED` gộp cả "đã qua", bảo trì, đóng). → Chuẩn: Trống · Đã đặt (tooltip "Đã có người đặt") · **Đặt của bạn** · **Đã qua giờ** (vô hiệu) · Đóng cửa (ngoài giờ/lịch không khả dụng/sân không Hoạt động); mỗi trạng thái có ký hiệu + chữ |
| Ô "Đặt của bạn" | ❌ | Chuẩn (G-12): **chỉ khách thành viên** thấy đơn của chính mình; không bấm được, tooltip "Đơn của bạn". Hiện: chú giải luôn hiện mục này cho mọi người, nhưng backend **không trả trạng thái này** và type `SlotDisplayStatus` chỉ có `AVAILABLE/BOOKED/CLOSED` → nhánh `slot-mine` không bao giờ chạy. Cần API trả cờ "đơn của tôi"; trước đó ẩn mục này khỏi chú giải |
| Trạng thái sân trên lưới | ❌ | Chuẩn (G-13): sân Bảo trì/Đóng hiện **badge** trên tiêu đề hàng, cả hàng không đặt được |
| Thông tin sân | ❌ | Chuẩn (UC-05): tên, mô tả, trạng thái. Kích thước/mặt sân (G-01) **chưa có trong API** → chưa vẽ |
| Bảng đơn giá | ❌ | Chuẩn (UC-06, KH-07): bảng **đơn giá theo khung giờ** dưới lưới, **tab theo sân**, cột Từ giờ · Đến giờ · Đơn giá/giờ cho thứ của ngày đang chọn |
| Thẻ "Đặt sân nhanh" trên lưới | — | **Không triển khai** (`QĐ-02`): khách vãng lai nhập Họ tên/SĐT/Email ở trang xác nhận `/booking/guest` sau khi chọn ô — thỏa X-07 ("điền sau khi bấm ô"). Trang lưới không có thẻ này |
| Tải / rỗng | ⚠ | Chuẩn: skeleton lưới + bảng giá, chọn ngày bị vô hiệu khi đang tải; "Hiện chưa có sân nào để hiển thị."; "Tất cả sân đóng cửa trong ngày này."; lỗi → banner + Thử lại |
| Popup chọn thời lượng (`SlotPopup`) | ⚠ | Hiện: **60 / 90 / 120 / 150 / 180 phút** (không có 30 phút). → Chuẩn: bước 30 phút, **tối thiểu 30 phút**; mức trùng lịch, quá giờ đóng cửa, qua nửa đêm bị vô hiệu kèm lý do. Hiển thị tổng tiền máy chủ tính, skeleton khi đang tính |
| Giá thay đổi | ✅ | Đã có luồng báo giá mới khi 409 (`ReservationForm`) |
| Trang xác nhận (`/booking`, `/booking/guest`) | ⚠ | **Giữ làm bước xác nhận chính thức** (`QĐ-02`). Chuẩn nội dung: tóm tắt Sân · Ngày · Giờ · Thời lượng · Tổng tiền (máy chủ tính) + dòng "Đơn sẽ ở trạng thái Chờ xác nhận, chưa thanh toán"; nút **Quay lại** (về `/courts`, giữ ngày đang chọn) và **Xác nhận đặt sân**. Tham số URL thiếu/sai hoặc giờ đã qua → "Khung giờ không hợp lệ" + nút về lưới. Thành viên bấm Xác nhận → gửi ngay; vãng lai → gửi mã rồi mở **modal OTP `M-01`** |
| Trang vãng lai | ⚠ | Hiện: Họ tên, SĐT, Email (bắt buộc) + nút "Nhận mã" + **ô mã nhập ngay trong form**, không validate định dạng SĐT/email. → Chuẩn: Họ tên (không rỗng), SĐT 8–15 số (cho phép `+`), Email hợp lệ; xác minh bằng **modal OTP `M-01`**; dùng chung `Input`/`Label` |
| Thành công (`M-05`) | ⚠ | Hiện: màn "Đặt sân thành công" + mã đơn. → Chuẩn: **modal `M-05`** ngay trên trang xác nhận, hiện **mã `DS-XXXXX` + nút Sao chép**, sân · ngày · giờ · tiền, **"Chờ xác nhận (chưa lập hóa đơn)"**; vãng lai: nhắc lưu mã để tra cứu + nút **Tra cứu đơn**; thành viên: nút **Xem lịch sử đặt sân** |
| Lỗi khi gửi | ⚠ | Chuẩn: slot bị người khác đặt / giờ không còn hợp lệ / sân không hoạt động → thông báo rõ rồi **quay lại lưới và tải lại**; tài khoản bị khóa → về Đăng nhập kèm banner khóa; lỗi mạng giữ nguyên form |
| Người nội bộ | ⚠ | Hiện: Employee/Admin bấm ô vẫn đi `/booking` (API `CustomerOnly` sẽ từ chối). Chuẩn (BR-10, `QĐ-02`): bấm ô trống bằng tài khoản nội bộ **không điều hướng**, hiện thông báo "Tài khoản nội bộ không đặt sân trực tiếp. Hãy dùng Tạo lịch đặt ở Lịch sân."; truy cập `/booking*` bằng tài khoản nội bộ → chuyển về trang đích của vai trò |

### WF-05 Lịch sử đặt sân

`/my-bookings` · `app/(customer)/my-bookings/page.tsx`, `components/booking/BookingHistoryList.tsx`, `BookingCard.tsx`, `BookingListToolBar.tsx` · UC-11, UC-09, UC-10, BR-05, BR-06

**Hiện trạng đã xác nhận (khác bản 2.0):** các nút **Chi tiết, Hủy, Hóa đơn đã hoạt động** (không còn là `console.log`); **Đổi lịch chưa có nút**.

| Hạng mục | Trạng thái | Hiện trạng → Chuẩn mục tiêu |
|---|---|---|
| Danh sách | ⚠ | Hiện: tải toàn bộ (`useAllMyBookings`) rồi phân trang phía client, 10/trang. → Chuẩn: **phân trang máy chủ**, 20/trang, sắp xếp mới nhất trước |
| Thanh công cụ | ✅ | Tab Tất cả · Chờ xác nhận · Đã xác nhận · Hoàn thành · Đã hủy + ô tìm theo mã (`BookingListToolBar`) — đúng 5.2. Đổi tab về trang 1; hiển thị "Hiển thị x–y / tổng" |
| Thẻ đơn | ⚠ | Hiện: mã, sân, ngày giờ, trạng thái đơn, tổng tiền. → Chuẩn: thêm **nhãn thanh toán** — Chờ xác nhận: "Chưa lập hóa đơn"; Đã xác nhận/Hoàn thành: "Chưa thanh toán" hoặc "Đã thanh toán"; **Đã hủy: "—"** (G-05); hiển thị cả thời lượng. Sân đã xóa mềm vẫn hiện tên |
| Chi tiết (G-09) | ⚠ | Hiện: dialog hiển thị **trạng thái và thanh toán dạng enum tiếng Anh** (`Pending`, `Unpaid`…). → Chuẩn: nhãn tiếng Việt (§2.5); thêm lịch sử trạng thái nếu API cung cấp |
| Hủy (`M-06`) | ⚠ | Hiện: `window.confirm`, lý do gửi cố định "Khách yêu cầu hủy trên website". → Chuẩn: **modal `M-06`** có thông tin đơn, cảnh báo "slot được giải phóng; hóa đơn chưa thanh toán bị hủy theo; không thể hoàn tác", nút **Giữ đặt sân / Xác nhận hủy**. Wireframes **không có ô nhập lý do**; backend bắt buộc có `Reason` nên FE tiếp tục gửi lý do hệ thống |
| Điều kiện hủy | ⚠ | `canCancel` tính ở FE: chưa thanh toán và còn ≥ 1 giờ (UTC+7) — đúng BR-05, nhưng khi không đủ điều kiện nút **bị ẩn im lặng**. → Chuẩn: đơn quá hạn hiện ghi chú "Đã quá thời hạn hủy/đổi lịch"; đơn đã thanh toán hiện ghi chú liên hệ nhân viên. Khi gửi mà đã quá hạn: modal "Đã quá thời hạn hủy (cần trước giờ bắt đầu 1 giờ)… liên hệ nhân viên qua hotline"; đơn đã thanh toán: "Đơn đã thanh toán, vui lòng liên hệ nhân viên."; thành công: toast "Đã hủy đặt sân {mã}" và tải lại danh sách |
| Đổi lịch | ❌ | Chuẩn (UC-10): nút **Đổi lịch** + modal chọn ngày/giờ, báo giá mới, điều kiện như hủy. **Backend chưa có API đổi lịch** |
| Hóa đơn (khách) | ⚠ | Hiện: modal hóa đơn khi đơn đã có hóa đơn, trạng thái và phương thức hiển thị **enum thô**. → **Bỏ nút và modal Hóa đơn phía khách** (`QĐ-03`): SRS không có use-case khách xem hóa đơn; thanh toán thể hiện bằng nhãn trên thẻ và chi tiết. Xóa `showInvoice`, `useBookingInvoice` khỏi `BookingHistoryList` |
| Rỗng / lỗi | ⚠ | Rỗng: "Bạn chưa có đặt sân nào" + nút **Đặt sân**. Lỗi: banner + Thử lại |

### WF-06 Tra cứu đơn đặt sân

`/lookup` · `app/(customer)/lookup/LookupClient.tsx`, `components/booking/BookingLookupForm.tsx`, `BookingLookupResult.tsx` · X-03

| Hạng mục | Trạng thái | Hiện trạng → Chuẩn mục tiêu |
|---|---|---|
| Điều kiện tra cứu | ⚠ | Hiện: SĐT/Email **không bắt buộc**; chỉ so khớp **SĐT** khi có nhập. → Chuẩn (X-03): **bắt buộc cặp** Mã đơn + (SĐT **hoặc** Email) |
| Nút DEMO điền sẵn mã | ⚠ | Hiện còn trong `BookingLookupForm`. → Xóa |
| Kết quả | ⚠ | Hiện: hiển thị mã, sân, ngày giờ, trạng thái đơn, tổng tiền; **không có nhãn thanh toán**. → Chuẩn: Tên khách, Mã, Sân, Khung giờ, Số tiền, **Trạng thái đơn**, **Thanh toán** |
| Tên khách | ✅ | **Hiển thị đủ tên** (`QĐ-04`): kết quả chỉ trả khi khớp cặp Mã đơn + SĐT/Email nên người xem đã chứng minh biết đơn; X-03 và wireframe 6.1 đều hiển thị tên. **Không** hiển thị SĐT/email trong kết quả. Mọi trường hợp sai (mã, liên hệ, không khớp) dùng **một** thông báo chung |
| Hủy/Đổi lịch | ⚠ | Khách vãng lai **không tự hủy/đổi** được → hiển thị "Cần hủy hoặc đổi lịch? Liên hệ nhân viên: Hotline {cấu hình}" |
| Không tìm thấy | ✅ | Thông báo trung tính, không nói sai ở mã hay liên hệ |
| API | ❌ | `bookingService` gọi `GET bookings/code/{code}`; backend **chưa có endpoint** tương ứng |

### WF-07 Hồ sơ cá nhân

`/profile` · `app/(customer)/profile/ProfileClient.tsx`, `components/profile/ProfileInfoForm.tsx`, `ProfileSidebar.tsx`, `ChangePasswordForm.tsx` · UC-12

| Hạng mục | Trạng thái | Hiện trạng → Chuẩn mục tiêu |
|---|---|---|
| Tab Thông tin | ✅ | Họ tên, SĐT chỉnh sửa; Email **khóa** (nhãn "Dùng để đăng nhập"). SĐT regex `^0\d{9}$` → Chuẩn: 8–15 số, cho phép `+` |
| Tab Bảo mật / Đổi mật khẩu | ⚠ | **Giữ hiển thị** (`QĐ-12`): backend đã có `profile/change-password`; Wireframes G-02 chỉ để "tạm ẩn" vì chưa có backend/UC. Bổ sung chức năng này vào UC-12 (§8). Quy tắc: Mật khẩu hiện tại bắt buộc (sai → "Mật khẩu hiện tại không đúng") · Mật khẩu mới **8–128** (hiện chỉ có cận dưới 8) · Xác nhận khớp; giữ thanh độ mạnh |
| Cột avatar + thống kê | ⚠ | **Bỏ upload avatar và các thẻ thống kê** (`QĐ-05`): ngoài UC-12, không có API lưu ảnh, số liệu hiện tính từ trang 1 nên sai khi quá 1 trang. Giữ khối nhận diện tĩnh: chữ cái đầu + họ tên + email + nhãn "Thành viên" |
| Mã thừa | ⚠ | `ProfileClient` còn state/hàm `showDeactivateModal`, `handleConfirmDeactivate` (không có giao diện kích hoạt; SRS không có tự vô hiệu hóa) → **xóa** |
| Tự khóa/xóa tài khoản | — | Không thuộc phạm vi khách (UC-27, UC-39 chỉ nhân viên/Admin) |

### WF-08 Widget Trợ lý AI

Widget nổi toàn site (góc dưới phải) · UC-13 · **chưa có UI**

| Hạng mục | Trạng thái | Hiện trạng → Chuẩn mục tiêu |
|---|---|---|
| Giao diện | ❌ | Chưa có component |
| Route FE `app/api/chat/route.ts` | ⚠ | Hiện: gọi Anthropic với system prompt cố định, **không có tool/function** để đọc lịch hay giá. Hợp đồng không khớp type `ChatRequest/ChatResponse` (route nhận `{messages}` trả `{message}`) |
| Phạm vi hiển thị | — | Hiện trên **mọi trang Cổng Khách hàng**, **ẩn ở Cổng Quản trị** (G-11, giả định) |
| Chuẩn | — | Banner cố định: "AI chỉ tư vấn thông tin công khai; KHÔNG thể đặt, hủy, đổi sân, thu tiền hay xem dữ liệu cá nhân." Gợi ý nhanh: Hướng dẫn đặt sân · Giá theo giờ · Gợi ý giờ còn trống · Hotline. Không có thông tin → "Vui lòng liên hệ nhân viên: {Hotline}". Giá nêu là **tham khảo**, kiểm tra lại khi đặt |

---

## 4. Màn hình quản trị

### WF-09 Bảng điều khiển

`/dashboard` → `/admin/dashboard` (chỉ Admin) · `app/(admin)/dashboard/DashboardClient.tsx`, `components/admin/DashboardStats.tsx`, `RevenueChart.tsx` · X-02, G-14

| Hạng mục | Trạng thái | Hiện trạng → Chuẩn mục tiêu |
|---|---|---|
| Thẻ chỉ số | ⚠ | Hiện **4 thẻ**: Doanh thu hôm nay · Đặt sân hôm nay · Chờ xác nhận · **Tỷ lệ lấp đầy**. → Chuẩn: **3 thẻ** — **Doanh thu hôm nay** (hóa đơn Đã thanh toán, tính theo thời điểm thu) · **Đơn chờ duyệt** · **Lượt sân đặt trong ngày** (ngày sử dụng = hôm nay, **không tính Đã hủy**). **Bỏ "Tỷ lệ lấp đầy"**. Theo bảng 9.2 và khung 9.1 (`QĐ-09`); đoạn chú thích đầu mục WF-09 trong Wireframes ghi "Đơn hoàn thành hôm nay" là sai lệch nội bộ của Wireframes |
| Danh sách cần xử lý | ⚠ | Hiện: danh sách "Chờ xác nhận" chỉ có tên, sân, giờ; nút "Xem tất cả →" **chưa có sự kiện**; mỗi dòng ghi cố định "Hôm nay". → Chuẩn: "Đơn cần xử lý gấp" — đơn Chờ xác nhận, **giờ chơi gần nhất trước** (tiêu chí "gấp" là đề xuất, G-14); nút **Chi tiết** → WF-11; bấm thẻ "Đơn chờ duyệt" → WF-10. Rỗng: "Không có yêu cầu nào đang chờ xác nhận."; mỗi thẻ có thể lỗi độc lập |
| Biểu đồ 7 ngày, bảng "Đặt sân gần đây" | ⚠ | **Gỡ khỏi dashboard** (`QĐ-06`): Wireframes G-14 không vẽ; doanh thu theo kỳ thuộc WF-18 (tái dùng `RevenueChart` tại đó); danh sách đặt sân thuộc WF-10/WF-17; API tương ứng cũng chưa có |
| Nhãn trạng thái | ⚠ | `STATUS_LABELS` khai báo lại cục bộ → dùng `BOOKING_STATUS_LABEL` trong `config/app.ts` |
| API | ❌ | `dashboardService` gọi `admin/dashboard/summary`; backend chưa có (hiện chạy bằng mock) |

### WF-10 Yêu cầu đặt sân (chờ xác nhận)

Route mục tiêu `/admin/booking-requests` · **chưa có route** · UC-14, UC-15, UC-16

| Hạng mục | Quy tắc |
|---|---|
| Danh sách | Chỉ đơn **Chờ xác nhận**, **cũ nhất trước**, phân trang máy chủ 20/trang |
| Cột | Mã đơn · Gửi lúc · Khách · SĐT · Sân · Khung giờ · Tổng tiền |
| Thao tác mỗi dòng | **Xem chi tiết** (→ WF-11) · **Xác nhận** (modal `D-06`) · **Từ chối** (modal `D-05`) |
| Bộ lọc | Wireframes **không có** bộ lọc sân/ngày/loại khách (bản 2.0 tự thêm — đã bỏ) |
| Tab (chỉ Admin) | "Yêu cầu chờ xác nhận" · "Tất cả đặt sân" (WF-17) |
| Rỗng / lỗi | "Không có yêu cầu nào đang chờ." / banner + Thử lại |
| Nhân viên | Là **trang đích sau đăng nhập** của nhân viên (X-02, G-15) |

### WF-11 Chi tiết đặt sân & xử lý đơn

Route mục tiêu `/admin/bookings/[id]` · **chưa có route** · UC-15, UC-16, UC-18, UC-21, UC-09/UC-10 thay khách

| Khối | Nội dung |
|---|---|
| Tiêu đề | Mã đơn, badge trạng thái, thời điểm tạo; breadcrumb về WF-10 |
| Thông tin đặt sân | Sân, ngày, khung giờ, thời lượng, tổng tiền, **các mốc giá đã lưu** (không tính lại theo bảng giá hiện tại) |
| Khách | Họ tên, loại (Thành viên/Vãng lai), SĐT, email |
| Hóa đơn | Mã `HD-yyyyMMdd-seq`, trạng thái, tổng tiền, phương thức, thời điểm thu, nhân viên xác nhận. Đơn Chờ xác nhận: "Chưa lập hóa đơn". **Không có nút lập hóa đơn thủ công** |
| Lịch sử trạng thái | Thời điểm · cũ → mới · tác nhân (Khách/Nhân viên/Hệ thống) · người thực hiện · lý do (BR-13) |

**Nút theo trạng thái đơn** (nút không áp dụng thì ẩn; bị chặn do thời gian thì vô hiệu kèm tooltip):

| Trạng thái | Nút |
|---|---|
| Chờ xác nhận | Xác nhận, Từ chối (chưa đến giờ bắt đầu) · Đổi lịch, Hủy theo yêu cầu khách (còn ≥ 1 giờ) · Ghi nhận hoàn thành (lượt đã kết thúc) · Hủy do sự cố |
| Đã xác nhận | Đổi lịch, Hủy theo yêu cầu khách (còn ≥ 1 giờ) · Ghi nhận hoàn thành · Hủy do sự cố · thẻ Hóa đơn có **Xác nhận đã thu** nếu Chưa thanh toán |
| Hoàn thành | Không đổi trạng thái; thẻ Hóa đơn vẫn có **Xác nhận đã thu** nếu còn Chưa thanh toán |
| Đã hủy | Chỉ xem |

**Modal của màn hình này:**

| Modal | Quy tắc chính |
|---|---|
| Xác nhận đặt sân `D-06` | Chọn **bắt buộc** "Chưa thu tiền" hoặc "Đã thu tiền" (không chọn sẵn). Đã thu → thêm **Phương thức** (Tiền mặt/Chuyển khoản) và **Thời điểm thu** (mặc định hiện tại, không sau hiện tại). Kết quả: đơn → Đã xác nhận + lập đúng một hóa đơn. Lỗi khi đã đến giờ bắt đầu: "Không thể xác nhận đơn đã đến giờ bắt đầu…" |
| Từ chối yêu cầu `D-05` | **Lý do bắt buộc**. Đơn → Đã hủy, giải phóng slot, **không lập hóa đơn**. Chỉ dùng cho đơn Chờ xác nhận |
| Ghi nhận hoàn thành `M-08` | Checkbox "khách đã sử dụng sân" **bắt buộc**; chỉ khi lượt đã kết thúc. Hiện phần thu tiền **chỉ khi đơn Chờ xác nhận**. Hoàn thành **không** đồng nghĩa đã thanh toán |
| Hủy do sự cố `M-10` | **Lý do bắt buộc** + tích "khách chưa sử dụng sân". Cho phép cả khi quá mốc 1 giờ. Hóa đơn đã thanh toán → mở **Hoàn tiền `M-11`** trước |
| Hủy / Đổi lịch thay khách (G-16) | Điều kiện như khách thành viên (≥ 1 giờ). Đổi lịch có báo giá mới; đơn đã có hóa đơn phải nhập **lý do điều chỉnh hóa đơn**; hóa đơn đã thanh toán mà tổng tiền đổi → bắt buộc hoàn tiền `M-11` |

> API backend hiện có: detail, confirm, reject, complete (`booking-requests`) và `PATCH bookings/{id}/cancel`. **Chưa có:** đổi lịch, hủy do sự cố (tách riêng), hoàn tiền.

### WF-12 Lịch sân & đặt tại quầy

`/schedule` → `/admin/court-schedule` (Admin + Nhân viên) · `app/(admin)/schedule/ScheduleClient.tsx` · UC-19, UC-23, UC-20, BR-10, X-05

| Hạng mục | Trạng thái | Hiện trạng → Chuẩn mục tiêu |
|---|---|---|
| Bố cục | ⚠ | Hiện: **timeline ngang**, mỗi sân một hàng, 05:00–22:00, khối đặt tính theo %. Wireframes vẽ lưới dọc (mỗi sân một cột). Hướng bố cục không phải ràng buộc nghiệp vụ; giữ timeline ngang nếu đủ nội dung bên dưới |
| Chọn ngày | ⚠ | Hiện: `CustomDatePicker`. → Chuẩn: `[<]` `[>]`, ô ngày, **Hôm nay** |
| Lọc theo sân | ❌ | Chuẩn: chọn một sân hoặc Tất cả |
| Chú giải | ❌ | Chuẩn: Chờ xác nhận `[CXN]`, Đã xác nhận `[ĐXN]`, Hoàn thành `[HT]` (vẫn giữ chỗ), Trống, Bảo trì/Đóng — **có chữ, không chỉ màu** |
| Ô đã đặt | ⚠ | Hiện: chỉ ghi "Đã đặt" + giờ, mỗi ô 30 phút là một khối riêng, **không click được**. → Chuẩn: hiện **tên khách, mã đơn, nhãn trạng thái**; đơn nhiều slot gộp một khối; **bấm mở WF-11** (BR-28). Dữ liệu `courts/grid` chỉ trả `bookingId` → cần API lịch cho nhân viên |
| Sân Bảo trì/Đóng | ⚠ | Hiện: nhãn nhỏ dưới tên sân. → Chuẩn: cả hàng hiển thị "Bảo trì"/"Đóng" |
| Trạng thái sân | ❌ | Chuẩn: mỗi sân có ô chọn Hoạt động/Bảo trì/Đóng → **Modal đổi trạng thái sân** (UC-23) |
| Nút **+ Tạo lịch đặt** | ❌ | Chuẩn: mở **`M-09`**; bấm ô trống cũng mở với sân/ngày/giờ điền sẵn |
| Rỗng / tải / lỗi | ⚠ | Có text; chuẩn dùng skeleton + banner Thử lại |

**`M-09` Tạo lịch đặt thay khách (UC-20, X-05):**

| Trường | Quy tắc |
|---|---|
| Họ tên | Bắt buộc |
| SĐT | Bắt buộc, 8–15 số, cho phép `+` |
| Email | **Bắt buộc**, hợp lệ. Có hồ sơ theo email thì dùng lại, chưa có thì tạo hồ sơ mới |
| Sân, Ngày, Bắt đầu, Kết thúc | Chỉ sân Hoạt động; slot 30 phút, tối thiểu 30 phút, cùng ngày, trong giờ mở cửa; giờ bắt đầu sau hiện tại |
| Báo giá | Máy chủ tính; nút tạo vô hiệu tới khi có báo giá; giá đổi → báo giá mới |
| Xác minh | **Không OTP** (nhân viên đã xác thực với khách). Đơn tạo ở **Chờ xác nhận**; xác nhận làm riêng ở WF-10/WF-11 (G-18) |
| Thành công | Modal mã đặt sân; gửi email cho khách |

**Modal đổi trạng thái sân (UC-23)** — hiện đã có `components/admin/CourtStatusModal.tsx` (dùng ở WF-15):

| Hạng mục | Trạng thái | Ghi chú |
|---|---|---|
| Giá trị | ✅ | Hoạt động / Bảo trì / Đóng (không có "Đã xóa") |
| Trường lý do | ⚠ | **Bỏ** (`QĐ-07`): nhật ký không có cột lý do (BR-14, SRS 1.7). Thay bằng dòng thông báo cố định nêu hệ quả của trạng thái mới (Bảo trì/Đóng: sân không nhận đặt) |
| Chuyển sang Bảo trì/Đóng khi còn đơn | ⚠ | Hiện: cảnh báo "đơn được giữ nguyên, không bị hủy tự động"; backend chỉ **đếm** đơn ảnh hưởng, không chặn. Chuẩn (BR-16, UC-23): **từ chối** khi còn đơn Chờ xác nhận/Đã xác nhận; phải từ chối/hủy/đổi lịch đơn trước. Cần sửa cả backend |

### WF-13 Thanh toán & hóa đơn

`/payments` → `/admin/payments` · `app/(admin)/payments/page.tsx` hiện **chỉ có `RoleGuard` + `<div>` rỗng** · UC-28, UC-29, UC-22, UC-17

| Hạng mục | Quy tắc |
|---|---|
| Tìm kiếm / lọc | Theo mã hóa đơn hoặc mã đặt sân; lọc: Tất cả · Chưa thanh toán · Đã thanh toán · Đã hủy |
| Cột | Mã hóa đơn · Mã đơn · Khách · Tổng tiền · Trạng thái · Thao tác |
| Thao tác | **Chi tiết** (mọi hóa đơn) · **Thu tiền** (chỉ hóa đơn Chưa thanh toán của đơn Đã xác nhận/Hoàn thành). Hóa đơn Đã hủy chỉ tra cứu |
| Modal **Thu tiền** (UC-29) | Số tiền = tổng hóa đơn (chỉ đọc, không thu một phần) · Phương thức (bắt buộc) · Thời điểm thu (bắt buộc, mặc định hiện tại, không sau hiện tại) · Checkbox "đã thu đủ" (bắt buộc). Kết quả: hóa đơn → Đã thanh toán, **trạng thái đặt sân không đổi** |
| **Hoàn tiền `M-11`** | **Không** là nút độc lập ở danh sách; chỉ mở ở bước tiếp theo của hủy/đổi lịch trong WF-11. Số tiền hoàn = tổng hóa đơn cũ; phương thức, thời điểm, **lý do** bắt buộc; checkbox "đã hoàn ngoài hệ thống". Hệ thống chỉ ghi nhận |
| Chi tiết hóa đơn (UC-28) | Hiển thị cả chuỗi hóa đơn bị hủy/thay thế, lý do, người và thời điểm thao tác |
| Không có | Lập hóa đơn thủ công, thanh toán một phần, đặt cọc |
| API | ❌ Backend chưa có danh sách hóa đơn và thu tiền (FE `bookingService` còn gọi `admin/payments/confirm` không tồn tại) |

### WF-14 Quản lý khách hàng

`/customers` → `/admin/customers` (Admin + Nhân viên) · `app/(admin)/customers/CustomersClient.tsx` · UC-24, UC-26 (hoãn), UC-27, UC-30, X-06

| Hạng mục | Trạng thái | Hiện trạng → Chuẩn mục tiêu |
|---|---|---|
| Tìm kiếm | ❌ | Chuẩn: ô tìm theo họ tên/SĐT/email + nút Tìm (backend hỗ trợ `keyword`). SĐT không dùng để gộp hồ sơ. Tìm theo mã đặt sân (UC-30) chưa vẽ (G-26) |
| Cột | ⚠ | Hiện: Khách hàng (tên + id) · Liên hệ · **Loại (Thành viên/Vãng lai)** · Ngày đăng ký · Thao tác. → Chuẩn: Mã KH · Họ tên · SĐT · Email · **Trạng thái tài khoản** (Hoạt động / Bị khóa / "—" nếu chưa có tài khoản). Backend trả sẵn `hasAccount`, `accountStatus`. Bỏ cột "Loại" và "Ngày đăng ký" (không có trong wireframe); "—" thay cho nhãn Vãng lai |
| Thao tác | ❌ | Hiện: nút **Chi tiết không có sự kiện**. → Chuẩn: **Xem lịch sử đặt sân** (modal, API `customers/{id}/bookings`; mã đơn → WF-11) · **Khóa tài khoản** (khách `Active`) · **Mở khóa tài khoản** (khách `Disabled`, đưa bộ đếm sai về 0, áp dụng cả khóa tự động lần sai thứ 5), có modal xác nhận. Khách chưa có tài khoản: cột trạng thái "—", **không có** nút Khóa/Mở khóa (G-20) |
| Phạm vi khóa/mở khóa | — | Màn hình này **chỉ thao tác tài khoản khách hàng**; không khóa được tài khoản nhân viên/quản trị (việc đó ở WF-16B). Không có: xóa hồ sơ khách đã giao dịch, sửa email |
| Sửa họ tên/SĐT khách | ❌ | UC-24 cho phép nhưng Wireframes **chưa vẽ** (G-19) → chưa triển khai cho tới khi chốt |
| Nút "Thêm khách hàng" | ⚠ | **Gỡ nút** (`QĐ-11`): hồ sơ khách được tạo tự động khi đăng ký hoặc khi đặt sân theo email (BR-10, UC-20); UC-26 (tạo tài khoản khách) đang hoãn (X-06); khung 14.1 không vẽ nút này |
| Phân trang | ❌ | Chỉ lấy trang mặc định, chưa có điều khiển trang. Chuẩn: "Hiển thị x–y / tổng", mỗi trang 20 |
| Rỗng | ❌ | "Không tìm thấy khách hàng nào." |

### WF-15 Quản lý sân & bảng giá

`/manage-courts` → `/admin/courts` · `app/(admin)/manage-courts/ManageCourtsClient.tsx`, `components/admin/CourtStats`, `CourtCardGrid`, `CourtTable`, `CourtFormModal`, `CourtStatusModal`, `CourtOperationsModal`, `PricingTimeline` · UC-31…UC-35, BR-14…BR-19

| Hạng mục | Trạng thái | Hiện trạng → Chuẩn mục tiêu |
|---|---|---|
| Phân quyền | ⚠ | `allowedRoles: ['Admin','Employee']` → **chỉ Admin** |
| Chế độ xem | ✅ | Thẻ / Danh sách (nút ở header qua portal) |
| Chỉ số | ✅ | Tổng số sân · Đang hoạt động · Đang bảo trì. **Không có "Tỷ lệ lấp đầy"** (đúng chuẩn) |
| Cột/nội dung | ⚠ | Hiện: tên (kèm `ID-001`), mô tả, trạng thái, badge "Đang sử dụng". → Chuẩn: thêm **Kích thước · Mặt sân** (G-01, chưa có API) |
| Mô tả giả | ⚠ | Thẻ sân tự điền câu mô tả mặc định ("Sân tiêu chuẩn… sàn gỗ composite") khi mô tả trống → **bỏ**, hiện "—" |
| Form Thêm/Sửa (`CourtFormModal`) | ⚠ | Hiện: Thêm = Tên, Mô tả, Giờ mở/đóng, Giá mặc định; Sửa = Tên, Mô tả. → Chuẩn: **bắt buộc bấm Xem trước** cấu hình (7 lịch + 7 mốc giá) rồi mới **Lưu sân**; kiểm tra tên không trùng; phút 00/30; chọn trạng thái ban đầu |
| Giờ mở cửa + Bảng giá (`CourtOperationsModal`, `M-13`) | ✅/⚠ | Đã có: tab T2–CN, bật/tắt "Mở cửa", giờ theo bước 30 phút, timeline mốc giá kéo/nhập, kiểm tra hợp lệ, cảnh báo "bảng giá sẽ được điều chỉnh". Lệch: **lưu lịch và lưu bảng giá là hai nút riêng**, không có bước **Xem trước** rõ ràng (Wireframes 15.4/15.5) |
| Đổi trạng thái | ⚠ | Xem WF-12 |
| **Xóa mềm sân** | ❌ | Chuẩn (UC-33): nút **Xóa** + modal xác nhận; chỉ khi không còn đơn Chờ xác nhận/Đã xác nhận; **không xóa vật lý**; sân đã xóa không hiện ở danh sách và lưới. Backend chưa có xóa mềm; enum `CourtStatus` chỉ `Active/Maintenance/Closed` |
| Rỗng | ⚠ | Hiện "Chưa có sân nào." → thêm "Bấm Thêm sân mới để bắt đầu." |

### WF-16 Quản lý nhân viên & Phân quyền

Admin · UC-36…UC-39, UC-27, BR-15, BR-17. Chuẩn tách **hai màn hình** (G-22).

**WF-16A Quản lý nhân viên** — `/employees` (mục tiêu `/admin/staff`) · `app/(admin)/employees/EmployeesClient.tsx`, `components/admin/EmployeeFormModal.tsx`

| Hạng mục | Trạng thái | Hiện trạng → Chuẩn mục tiêu |
|---|---|---|
| Chỉ số | ⚠ | Hiện 3 thẻ (Tổng, Đang hoạt động, Quản trị viên). **Bỏ** (`QĐ-08`): Wireframes G-21 nêu rõ không vẽ thẻ số liệu vì SRS/UC chưa có |
| Tìm kiếm / lọc | ⚠ | Hiện: tìm + lọc vai trò + lọc trạng thái, **lọc phía client**, tải 100 bản ghi. → Chuẩn: tìm theo họ tên/SĐT/email, phân trang máy chủ |
| Cột | ✅ | Nhân viên · Vai trò · Liên hệ · Trạng thái |
| Thêm | ⚠ | Hiện (qua sự kiện `open-add-employee`): Họ tên, SĐT, Email, Mật khẩu (≥ 8). **Form không có lựa chọn vai trò** dù schema có `isAdmin` (luôn tạo Nhân viên). → Chuẩn (UC-36): thêm trường **Vai trò**; mật khẩu 8–128 |
| Sửa hồ sơ | ✅ | Chỉ Họ tên, SĐT; Email **khóa** |
| Khóa/Mở khóa, Xóa | ⚠ | Hiện còn nằm ở trang này: khóa **không có xác nhận**; xóa dùng `ConfirmDialog`, nút xóa ẩn với Admin. Backend **không cho khóa/xóa bất kỳ Admin nào**. → Chuẩn: chuyển các thao tác này sang **WF-16B** (trang nhân viên chỉ còn Sửa hồ sơ + ghi chú trỏ sang "Tài khoản & Phân quyền") |

**WF-16B Tài khoản & Phân quyền** — `/admin/accounts` · **chưa có route** · UC-38, UC-27, UC-39

| Hạng mục | Quy tắc |
|---|---|
| Tab | "Nhân viên & Quản trị viên" · "Khách hàng có tài khoản" (khách: chỉ khóa/mở khóa/xóa; **không có nút thêm tài khoản khách**, UC-26 hoãn) |
| Cột | Họ tên · Email · Vai trò · Trạng thái |
| **Đổi vai trò** | Modal: Nhân viên ↔ Quản trị viên (không đổi loại hồ sơ Khách ↔ Nhân viên). Backend **chưa có API đổi vai trò** |
| Khóa / Mở khóa | Admin thao tác mọi loại tài khoản; chỉ Admin mở khóa tài khoản nội bộ |
| Xóa tài khoản `M-14` | Hard-delete **tài khoản**, giữ hồ sơ, đặt sân, hóa đơn, nhật ký; không hủy đặt sân/hóa đơn; không có thao tác khôi phục |
| Bảo vệ Admin cuối | Không khóa, xóa hoặc hạ quyền Quản trị viên `Active` cuối cùng: giao diện hiện cảnh báo "Không thể khóa, xóa hoặc hạ quyền Quản trị viên đang hoạt động cuối cùng.", máy chủ từ chối. Lưu ý: backend hiện **chặn mọi tài khoản Admin** (chặt hơn chuẩn) — cần chỉnh khi làm đổi vai trò/khóa Admin |

### WF-17 Theo dõi đặt sân toàn hệ thống

Route `/admin/bookings`, hiển thị là tab "Tất cả đặt sân" cạnh tab "Yêu cầu chờ xác nhận" của WF-10 (chỉ Admin) · **chưa có UI** · UC-40, BR-27

| Hạng mục | Quy tắc |
|---|---|
| Bộ lọc | Từ ngày – Đến ngày (giờ VN) · Sân · Trạng thái đơn · Thanh toán · Khách (họ tên/SĐT/email) · **Lọc / Xóa lọc** |
| Cột | Mã đơn · Khách · Sân · Ngày giờ · Tổng tiền · Trạng thái · Thanh toán |
| Chi tiết | Chọn một dòng → khung **Lịch sử trạng thái** (thời điểm, chuyển trạng thái, tác nhân, lý do) |
| Tính chất | **Chỉ xem**; xử lý phát sinh ở WF-11 |

### WF-18 Báo cáo & Thống kê

`/statistics` → `/admin/reports` · hiện **placeholder** ("Chức năng thống kê báo cáo đang được phát triển.") · UC-41, UC-42

| Hạng mục | Quy tắc |
|---|---|
| Bộ lọc | Từ ngày – Đến ngày · Nhóm theo **Ngày / Tháng** · **Xem báo cáo** |
| Doanh thu (UC-41) | Chỉ hóa đơn **Đã thanh toán hợp lệ**, tính theo **thời điểm thu**. Bảng: Kỳ · Số hóa đơn đã thu · Doanh thu; có dòng **Tổng** và biểu đồ cột. Ghi chú: hoàn tiền sau đó có thể làm đổi doanh thu kỳ cũ |
| Đặt sân (UC-42) | Theo **ngày sử dụng**, **không tính Đã hủy**. Bảng: Kỳ · Lượt đặt · Giờ đặt · Lượt hoàn thành · Giờ hoàn thành; có dòng Tổng |
| Không có | **Tỷ lệ lấp đầy**, xuất báo cáo (backend `court-usage` còn trả `occupancyRate` — không hiển thị) |
| API | ⚠ Chỉ có `statistics/court-usage`; **chưa có** thống kê doanh thu theo kỳ |

### WF-19 Nhật ký hoạt động

`/audits` → `/admin/audit-log` · hiện **placeholder** (tiêu đề "Lịch sử hệ thống", lệch tên menu "Nhật ký hoạt động") · UC-43, BR-14

| Hạng mục | Quy tắc |
|---|---|
| Bộ lọc | Từ ngày – Đến ngày · Tác nhân · Đối tượng · Thao tác · **Lọc / Xóa lọc** (backend `SearchAuditDto` hỗ trợ) |
| Cột | Thời điểm (UTC+7) · Tác nhân · Thao tác · Đối tượng; mỗi dòng có **Trước → Sau** |
| Tính chất | Chỉ đọc, bất biến; **không có cột lý do**, không thêm/sửa/xóa |
| Tiêu đề trang | Đổi thành "Nhật ký hoạt động" |

---

## 5. Danh mục modal / hộp thoại

Mã giữ đúng Wireframes; "—" là hộp thoại chưa có mã riêng. Phụ thuộc API backend xem §8.2 (`QĐ-10`).

| Mã | Hộp thoại | Màn hình | Hiện trạng |
|---|---|---|---|
| `M-01` | Xác minh OTP (6 ô) | WF-01, 03, 04 | ❌ đang là ô nhập inline |
| — | Đăng ký / đặt lại mật khẩu thành công | WF-01, 03 | ⚠ toast / ❌ |
| — | Chọn thời lượng (popup) | WF-04 | ⚠ `SlotPopup`, thiếu 30 phút |
| `M-04` | Bảng đơn giá theo khung giờ | WF-04 | ❌ |
| `M-05` | Đặt sân thành công | WF-04 | ⚠ màn thành công trong `ReservationForm` |
| — | Báo giá mới (giá đổi) | WF-04, 05, 12 | ✅ ở WF-04; ❌ nơi khác |
| `G-09` | Chi tiết đặt sân (khách) | WF-05 | ⚠ dialog hiện enum thô |
| `M-06` | Hủy đặt sân | WF-05 | ⚠ `window.confirm` |
| — | Đổi lịch (khách) | WF-05 | ❌ |
| — | Hóa đơn (khách) | WF-05 | ⚠ có; **bỏ** (`QĐ-03`) |
| `D-06` | Xác nhận đặt sân | WF-10, 11 | ❌ |
| `D-05` | Từ chối yêu cầu | WF-10, 11 | ❌ |
| `M-08` | Ghi nhận hoàn thành | WF-11 | ❌ |
| `M-10` | Hủy do sự cố | WF-11 | ❌ |
| `G-16` | Hủy / Đổi lịch thay khách | WF-11 | ❌ |
| `M-09` | Tạo lịch đặt thay khách | WF-12 | ❌ |
| — | Đổi trạng thái sân | WF-12, 15 | ⚠ `CourtStatusModal` |
| — | Thu tiền hóa đơn | WF-13 | ❌ |
| `M-11` | Ghi nhận hoàn tiền | WF-11 → 13 | ❌ |
| — | Chi tiết hóa đơn | WF-13 | ❌ |
| — | Lịch sử đặt sân của khách | WF-14 | ❌ |
| — | Khóa / Mở khóa tài khoản | WF-14, 16B | ❌ (nhân viên: khóa không xác nhận) |
| — | Thêm / Sửa sân (+ Xem trước) | WF-15 | ⚠ `CourtFormModal`, chưa có Xem trước |
| — | Xóa mềm sân | WF-15 | ❌ |
| `M-13` | Giờ mở cửa & Bảng giá | WF-15 | ✅/⚠ `CourtOperationsModal` |
| — | Thêm / Sửa nhân viên | WF-16A | ⚠ `EmployeeFormModal`, thiếu vai trò |
| — | Đổi vai trò | WF-16B | ❌ |
| `M-14` | Xóa tài khoản | WF-16B | ⚠ có xóa nhân viên qua `ConfirmDialog` |

**Quy tắc chung cho modal:** nền mờ, đóng bằng X/Hủy không thay đổi dữ liệu; nút gửi vô hiệu khi đang xử lý; kiểm tra lại phía máy chủ khi gửi; lỗi hiển thị ngay trong modal.

---

## 6. Các điểm tài liệu 2.0 đã sai và được sửa trong 3.0

| # | Nội dung bản 2.0 | Thực tế / Chuẩn |
|---|---|---|
| 1 | `/booking`, `/booking/guest` là placeholder; `SlotPopup` chỉ đóng popup | Đã render `ReservationForm`; popup đã điều hướng theo đăng nhập |
| 2 | Tồn tại `WalkInBookingForm.tsx` (email tùy chọn) | Không có file này; đặt nhanh dùng `/booking/guest`, **email bắt buộc** (KH-11, BR-10) |
| 3 | Chi tiết/Hủy/Đổi lịch là `console.log` | Chi tiết, Hủy, Hóa đơn đã chạy; chỉ **Đổi lịch** chưa có |
| 4 | Hủy bắt buộc nhập lý do | Wireframes `M-06` không có ô lý do; FE gửi lý do hệ thống |
| 5 | Dashboard 3 thẻ gồm "Đơn hoàn thành hôm nay" | Chuẩn: Doanh thu hôm nay · Đơn chờ duyệt · Lượt sân đặt trong ngày; code hiện 4 thẻ có "Tỷ lệ lấp đầy" |
| 6 | Admin 9 mục / "4 nhóm", có "Đặt sân toàn hệ thống" | Admin **10 mục**; không có mục "Đặt sân toàn hệ thống" (là tab); thêm "Tài khoản & Phân quyền" |
| 7 | WF-10 có bộ lọc sân/ngày/loại khách | Không có trong Wireframes |
| 7b | WF-14 nhân viên chỉ mở khóa tài khoản | Khóa **và** mở khóa, nhưng chỉ tài khoản **khách hàng** |
| 8 | Form nhân viên có switch `isAdmin` | Form **không có** lựa chọn vai trò |
| 9 | Khóa nhân viên có `ConfirmDialog` | Khóa/mở khóa **không có xác nhận**; chỉ xóa dùng `ConfirmDialog` |
| 10 | Modal đổi trạng thái sân gắn UC-33; ràng buộc xóa sân gắn BR-15 | UC-23 là đổi trạng thái (BR-16 bảo vệ lịch/trạng thái sân); UC-33 là xóa mềm (BR-19); BR-15 là xóa tài khoản |
| 11 | Tra cứu hiển thị trạng thái thanh toán | Code **chưa hiển thị**; chuẩn bắt buộc có |
| 12 | Tab Đổi mật khẩu "tạm ẩn nếu chưa có backend" | Wireframes G-02 vẽ tạm ẩn vì thiếu UC (O-06); backend nay **đã có** `profile/change-password` → **giữ hiển thị** (`QĐ-12`) |
| 13 | `DashboardStats` ở `components/dashboard/` | Thực tế `components/admin/DashboardStats.tsx` |
| 14 | Chat dùng function-calling server-side | Route chỉ gọi Anthropic với system prompt cố định, không có tool |
| 15 | URL admin ghi `/admin/...` nhưng đường dẫn file `(admin)/...` | Route group không sinh `/admin`; đã chốt chuyển sang `/admin/*` (`QĐ-01`, §2.6) |
| 16 | Đánh lại mã modal M-01…M-19 | Trùng mã với Wireframes → dùng đúng mã Wireframes |

---

## 7. Việc cần làm theo thứ tự ưu tiên

| Ưu tiên | Việc | Màn hình |
|---|---|---|
| P0 — Nền tảng | Chuyển route admin sang `/admin/*` (§2.6) và lọc sidebar theo vai trò | §2 |
| P0 — Sai nghiệp vụ | Chặn `/manage-courts` với Nhân viên | WF-15 |
| P0 | Tra cứu đơn bắt buộc cặp Mã + (SĐT/Email), bỏ nút DEMO | WF-06 |
| P0 | Popup chọn thời lượng có bước 30 phút | WF-04 |
| P0 | Trang đăng nhập/AdminHeader: banner khóa tài khoản, nút Đăng xuất, chuyển hướng Nhân viên | WF-02, §2 |
| P1 — Luồng chính còn thiếu | WF-10 Yêu cầu đặt sân + `D-06`/`D-05`; WF-11 Chi tiết + `M-08`/`M-10` | WF-10, 11 |
| P1 | Quên mật khẩu + `M-01` OTP dùng chung | WF-01, 03, 04 |
| P1 | Việt hóa nhãn trong chi tiết đơn; thay `window.confirm` bằng `M-06`; nhãn thanh toán ở thẻ đơn | WF-05 |
| P1 | WF-12: click ô đã đặt, chú giải, lọc sân, `M-09` | WF-12 |
| P1 | WF-14: tìm kiếm, cột trạng thái tài khoản, lịch sử đặt sân, khóa/mở khóa | WF-14 |
| P2 | WF-13 Thanh toán (chờ API) · WF-18 · WF-19 · WF-17 | |
| P2 | Dashboard: 3 thẻ + danh sách cần xử lý; gỡ biểu đồ và bảng đặt sân gần đây | WF-09 |
| P2 | Form sân có Xem trước, xóa mềm sân, đổi vai trò, tách WF-16B | WF-15, 16 |
| P2 | Footer Hotline cấu hình, widget AI | §2.2, WF-08 |
| Dọn mã | Xóa `menuOpen`, `showDeactivateModal`, mô tả sân giả, mục "Đặt của bạn" chết (cho tới khi backend trả `isMine`) | — |
| Dọn giao diện | Gỡ nút/modal Hóa đơn phía khách, upload avatar + thẻ thống kê hồ sơ, nút "Thêm khách hàng", thẻ thống kê trang nhân viên, trường "Lý do" ở modal đổi trạng thái sân | WF-05, 07, 14, 16A, 12 |

---

## 8. Quyết định thiết kế đã chốt

Nguyên tắc chốt: (1) SRS/UseCase thắng mọi tài liệu khác; (2) nếu SRS/UC không nêu thì theo quyết định tường minh trong Wireframes; (3) giữ phương án đang chạy đúng trong codebase nếu không vi phạm (1)–(2); (4) bỏ phần ngoài phạm vi SRS/UC, không có API hoặc cho số liệu sai.

### 8.1 Quyết định

| Mã | Vấn đề | Quyết định | Lý do |
|---|---|---|---|
| QĐ-01 | Route khu quản trị | Chuyển sang `/admin/*` theo §2.6, kèm redirect route cũ | Wireframes, User-Flows (X-02) và AGENTS đều dùng `/admin/*`; tách rõ khu quản trị; làm một lần trước khi thêm trang |
| QĐ-02 | Popup gửi thẳng hay có trang xác nhận | Giữ trang xác nhận `/booking`, `/booking/guest` (§WF-04); bỏ thẻ "Đặt sân nhanh" trên lưới | BR-04: giá chốt tại máy chủ, phải cho khách xem và xác nhận giá (đã có luồng 409 báo giá mới); khách vãng lai cần form nhập liên hệ + OTP; X-07 cho phép điền sau khi bấm ô |
| QĐ-03 | Hóa đơn phía khách | Bỏ nút và modal Hóa đơn | SRS không có use-case khách xem hóa đơn (D-13); thanh toán thể hiện bằng nhãn |
| QĐ-04 | Che tên khách ở tra cứu | Hiển thị đủ tên, không hiển thị SĐT/email; một thông báo chung khi không khớp | Chỉ trả khi khớp cặp mã + liên hệ (X-03); tránh dò mã/liên hệ |
| QĐ-05 | Avatar và thống kê ở hồ sơ | Bỏ upload avatar và thẻ thống kê; giữ khối nhận diện tĩnh | Ngoài UC-12; không có API lưu ảnh; số liệu tính từ trang 1 là sai |
| QĐ-06 | Biểu đồ và bảng "Đặt sân gần đây" ở dashboard | Gỡ khỏi dashboard | G-14 không vẽ; doanh thu theo kỳ thuộc WF-18, danh sách đặt sân thuộc WF-10/WF-17; tránh trùng chức năng |
| QĐ-07 | Trường "Lý do" ở modal đổi trạng thái sân | Bỏ | Nhật ký không có cột lý do (BR-14) |
| QĐ-08 | Thẻ thống kê ở trang nhân viên | Bỏ | G-21: SRS/UC chưa có thẻ số liệu |
| QĐ-09 | Thẻ chỉ số thứ hai của dashboard | "Đơn chờ duyệt" (thẻ 2) và "Lượt sân đặt trong ngày" (thẻ 3), theo bảng 9.2 và khung 9.1 | Bảng chi tiết và wireframe nhất quán nhau; "Đơn hoàn thành hôm nay" chỉ xuất hiện ở đoạn chú thích |
| QĐ-10 | Chức năng chưa có API backend | UI làm theo hợp đồng ở §8.2; chức năng chưa có API thì ẩn nút hoặc hiện "Chưa khả dụng", **không dùng dữ liệu mock trong môi trường chạy thật** | Tránh hiển thị số liệu giả như đang hoạt động |
| QĐ-11 | Nút "Thêm khách hàng" | Gỡ nút | Hồ sơ khách tạo tự động khi đăng ký/đặt sân (BR-10, UC-20); UC-26 hoãn (X-06) |
| QĐ-12 | Tab Đổi mật khẩu | Giữ hiển thị; bổ sung vào UC-12 | Backend đã có API; chức năng bảo mật cần thiết; Wireframes chỉ tạm ẩn vì chưa có backend |

Các điểm Wireframes tự mâu thuẫn đã được xử lý theo bảng trên: chú thích "che tên khách" (QĐ-04), chú thích dashboard "Đơn hoàn thành hôm nay" (QĐ-09), ghi chú "Hiện trạng Codebase" lỗi thời (§0).

### 8.2 Phụ thuộc backend và hợp đồng đề xuất

Tên endpoint là đề xuất; backend có thể đặt tên khác, miễn giữ đúng hợp đồng dữ liệu.

| Hạng mục UI | API cần có | Ghi chú hợp đồng |
|---|---|---|
| Tra cứu đơn (WF-06) | `GET /api/bookings/lookup?code=&contact=` | Trả bản rút gọn: tên khách, mã, sân, ngày giờ, tổng tiền, trạng thái đơn, nhãn thanh toán. Không khớp → 404 thông báo chung; giới hạn tần suất. Thay `bookings/code/{code}` mà FE đang gọi |
| Lưới sân (WF-04) | Mở rộng `GET /api/courts/grid` | Thêm `openTime`/`closeTime` từng sân theo ngày; thêm cờ `isMine` cho ô của khách đã đăng nhập |
| Lịch sân nhân viên (WF-12) | `GET /api/admin/schedule?date=` (StaffOnly) | Mỗi đơn: `bookingId`, mã, tên khách, trạng thái, khung giờ (BR-28) |
| Đặt thay khách `M-09` | `POST /api/booking-requests/on-behalf` (StaffOnly) | Họ tên, SĐT, email, sân, ngày, giờ, `quoteFingerprint`; dùng lại hồ sơ theo email; không OTP; đơn ở Chờ xác nhận |
| Đổi lịch (WF-05, WF-11) | `PATCH /api/bookings/{id}/reschedule` | Kiểm tra mốc 1 giờ (BR-05); trả báo giá mới khi giá đổi |
| Hủy do sự cố `M-10` | `POST /api/booking-requests/{id}/incident-cancel` | Lý do bắt buộc, xác nhận khách chưa sử dụng sân (BR-24) |
| Hóa đơn, thu tiền, hoàn tiền (WF-13) | `GET /api/invoices`, `GET /api/invoices/{id}`, `POST /api/invoices/{id}/collect`, `POST /api/invoices/{id}/refund` | Thu: phương thức, thời điểm; hoàn: phương thức, thời điểm, lý do |
| Xóa mềm sân (WF-15) | `DELETE /api/courts/{id}` + thêm `Deleted` vào `CourtStatus` | BR-19: đặt trạng thái `DELETED`, tên `NULL`; từ chối khi còn đơn hiệu lực |
| Đổi trạng thái sân (WF-12/15) | Sửa `PATCH /api/courts/{id}/status` | BR-16: trả 409 khi còn đơn Chờ xác nhận/Đã xác nhận (hiện chỉ đếm `affectedUpcomingBookingsCount`) |
| Đổi vai trò (WF-16B) | `PATCH /api/employees/{id}/role` (AdminOnly) | Bảo vệ Admin `Active` cuối cùng; cho phép khóa/xóa Admin khác (hiện chặn mọi Admin) |
| Xóa tài khoản khách (WF-16B) | `DELETE /api/accounts/{id}` (AdminOnly) | BR-15: hard-delete tài khoản, giữ hồ sơ, đơn, hóa đơn, nhật ký |
| Dashboard (WF-09) | `GET /api/admin/dashboard` | 3 chỉ số + danh sách đơn Chờ xác nhận, giờ chơi gần nhất trước |
| Báo cáo (WF-18) | `GET /api/statistics/revenue?from=&to=&groupBy=day hoặc month`, `GET /api/statistics/bookings?...` | Doanh thu theo thời điểm thu; đặt sân theo ngày sử dụng, loại Đã hủy; không trả tỷ lệ lấp đầy |
| Đổi mật khẩu (WF-07) | Đã có `PUT /api/profile/change-password` | Bổ sung giới hạn 8–128 ở máy chủ nếu chưa có |
