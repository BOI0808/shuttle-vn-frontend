# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

1. **Khách hàng (Customer & Guest):**
   - **Tình huống:** Người chơi cầu lông tìm kiếm sân trống, đặt lịch chơi định kỳ hoặc đột xuất, tra cứu thông tin giá, quản lý đặt chỗ và kiểm tra trạng thái đơn.
   - **Nhiệm vụ chính:** Xem lưới sân 34 slot theo thời gian thực (05:00 – 22:00); đặt sân trực tuyến với báo giá tức thì (`quoteFingerprint`); nhận mã đơn `DS-XXXXX`; nhận hỗ trợ tư vấn từ Trợ lý AI; tự đổi lịch hoặc hủy đơn trước giờ bắt đầu tối thiểu 1 tiếng (chỉ với đơn chưa thanh toán). Khách vãng lai xác thực nhanh qua OTP email; khách thành viên đăng nhập để quản lý lịch sử đặt sân.

2. **Nhân viên lễ tân / vận hành (Employee):**
   - **Tình huống:** Trực quầy tại cơ sở cầu lông, tiếp đón khách, xử lý dòng khách check-in và thanh toán, tiếp nhận các cuộc gọi hỏi sân hoặc yêu cầu đặt chỗ.
   - **Nhiệm vụ chính:** Theo dõi danh sách yêu cầu đặt sân chờ duyệt (`Pending`); xác nhận đơn và thu tiền (Tiền mặt / Chuyển khoản); tạo lịch đặt tại quầy thay khách vãng lai; đổi trạng thái sân (Hoạt động / Bảo trì / Đóng); tra cứu nhanh đơn bằng số điện thoại/mã đơn qua Quick Lookup; ghi nhận hoàn thành lượt chơi.

3. **Quản trị viên (Admin):**
   - **Tình huống:** Chủ sân hoặc quản lý cấp cao điều hành toàn bộ cơ sở kinh doanh, kiểm soát tài chính, giá cả, nhân sự và rủi ro vận hành.
   - **Nhiệm vụ chính:** Toàn quyền của Nhân viên; cấu hình lịch vận hành và bảng giá 7 ngày trong tuần theo từng mốc 30 phút qua slider trực quan; quản trị tài khoản khách hàng và nhân viên (khóa/mở khóa/thêm mới); theo dõi báo cáo doanh thu thực tế (theo thời điểm thu tiền) và tần suất sử dụng sân; kiểm toán toàn bộ hoạt động qua nhật ký hệ thống bất biến (`Audits`).

## Product Purpose

ShuttleVN là nền tảng quản trị và đặt sân cầu lông trực tuyến chuyên dụng cho cơ sở cầu lông đơn (single-facility), kết hợp Trợ lý AI tư vấn thông tin công khai. Sản phẩm giải quyết bài toán đặt trùng lịch (double-booking), minh bạch hóa giá thuê sân theo khung giờ/ngày, và loại bỏ thao tác thủ công rườm rà tại quầy lễ tân. Thành công của sản phẩm được đo lường bằng:
- Trải nghiệm đặt sân của khách: Nhanh chóng, trực quan, không giật lag, hoàn tất đặt chỗ dưới 1 phút.
- Hiệu suất vận hành tại quầy: Tiếp nhận, duyệt đơn và thu tiền chính xác 100%, không xảy ra thất thoát hay sai lệch giá snapshot.

## Positioning

Khác với các hệ thống đặt chỗ đa ngành hoặc phần mềm quản lý phòng tập chung chung:
- ShuttleVN chuyên sâu vào **đặc thù sân cầu lông**: Lưới ma trận 34 khung giờ 30 phút liên tục, cơ chế cuộn mượt và khóa lịch tức thời chống tranh chấp (PostgreSQL exclusion constraints + concurrency conflict resolution).
- **Cơ chế báo giá chống gian lận (Anti-tamper Price Engine):** Toàn bộ giá thuê tính toán theo phút trên server và được xác thực bằng chữ ký `quoteFingerprint`. Mọi xung đột giá thời gian thực (409 Conflict) đều kích hoạt báo giá cập nhật để người dùng xác nhận lại trước khi tạo đơn.
- **Trợ lý AI bám sát dữ liệu thời gian thực:** Stream SSE trực tiếp từ backend, tra cứu danh sách sân và lịch trống theo công cụ chuẩn hóa, tuân thủ nghiêm ngặt ranh giới tư vấn (không can thiệp sửa đổi giao dịch hay dữ liệu cá nhân).

## Operating Context

- **Thiết bị & Môi trường:** Web responsive hoạt động trên máy tính để bàn (quản trị, nhân viên lễ tân với màn hình ngang lớn) và điện thoại di động / máy tính bảng (khách hàng đặt sân khi đang di chuyển).
- **Múi giờ nghiệp vụ:** Giờ Việt Nam (UTC+7). Mọi mốc thời gian bắt đầu, kết thúc, ngày chơi và hạn chót hủy/đổi lịch đều neo theo múi giờ địa phương cơ sở.
- **Quy trình phối hợp:** Khách đặt online (đơn ở trạng thái Chờ xác nhận `Pending`) -> Nhân viên tiếp nhận duyệt tại quầy (`Confirmed`, hệ thống tự sinh Hóa đơn) -> Khách đến sân chơi hoặc thanh toán trước -> Thu đủ tiền và ghi nhận Hoàn thành (`Completed`).

## Capabilities and Constraints

### Chức năng & Ràng buộc nghiệp vụ bất biến:
- **Lưới sân 34 slots (05:00 - 22:00):** Bước nhảy 30 phút. Ô đã qua giờ trong ngày hôm nay bị vô hiệu hóa. Tự động refetch mỗi 30 giây.
- **Không có nút tạo hóa đơn thủ công:** Hóa đơn `HD-{yyyyMMdd}-{seq}` chỉ được sinh tự động duy nhất 1 lần khi đơn chuyển sang `Confirmed` hoặc `Completed`. Đơn `Pending` luôn mang nhãn "Chưa lập hóa đơn".
- **Quy tắc Hủy & Đổi lịch (1-Hour Rule):** Chỉ cho phép khách hàng tự thao tác khi đơn chưa thanh toán VÀ cách giờ bắt đầu ít nhất 1 tiếng. Đơn đã thanh toán bắt buộc liên hệ nhân viên xử lý hoàn tiền ngoài hệ thống.
- **Thu tiền hóa đơn:** Thu đúng và đủ 100% số tiền (không hỗ trợ đặt cọc, thanh toán một phần hay trả góp).
- **Idempotency:** Mọi thao tác ghi dữ liệu (đặt sân, đổi lịch, hủy, duyệt đơn, thu tiền) bắt buộc gửi UUID qua header `Idempotency-Key` chống trùng lặp.
- **Bảo mật & RBAC:** Xác thực bằng HttpOnly Cookie (`shuttlevn.auth`), gắn header `X-CSRF-TOKEN` tự động. Khóa tài khoản sau 5 lần sai mật khẩu liên tiếp (`BR-12`). Bảo vệ tài khoản Quản trị viên `Active` cuối cùng không thể bị khóa, xóa hoặc hạ quyền (`BR-27`).

### Trọng tâm Redesign Frontend:
- Tinh chỉnh và hiện đại hóa toàn diện giao diện trên nền tảng **Next.js 16 (App Router)** và **Tailwind CSS v4**.
- Quy trình triển khai kết hợp: Thiết kế Figma (Comp-first) trước cho 3 màn hình cốt lõi có độ phức tạp cao (Dashboard, Lưới đặt sân, Giao diện xác nhận booking); triển khai Code-first cho các màn hình quản trị và danh sách còn lại bám sát Design System.
- Chuẩn hóa ngôn ngữ thiết kế, thống nhất bảng màu thương hiệu (xanh ngọc `emerald-*`), nâng cao khả năng tiếp cận (WCAG AA), tính khả dụng và audit chất lượng sau khi hoàn tất.

## Brand Commitments

- **Tên thương hiệu:** ShuttleVN.
- **Biểu tượng nhận diện:** Vợt cầu lông / quả cầu lông (`sports_tennis` Material Symbols).
- **Bảng màu chủ đạo:** Tinh gọn, hiện đại và thể thao:
  - Màu nhấn thương hiệu: Xanh ngọc / Xanh rừng (`emerald-500` `#10b981`, `emerald-600` `#059669`).
  - Màu nền: Nền sáng sạch sẽ (`#f0f2f5` cho cổng khách, `bg-gray-100` cho cổng quản trị).
  - Màu trạng thái: Xanh lá (Hoàn thành / Đã thanh toán / Hoạt động), Xanh dương (Đã xác nhận / Thành viên), Vàng amber (Chờ xác nhận / Chưa thanh toán / Bảo trì), Đỏ (Đã hủy / Bị khóa / Đóng cửa).
- **Typography:**
  - Font nội dung & bảng biểu: `Inter` (`font-sans`).
  - Font tiêu đề & thương hiệu: `Hanken Grotesk` (`font-display`).
  - Font dữ liệu kỹ thuật, mã đơn, giờ, giá, badge: `JetBrains Mono` (`font-mono`).
- **Hotline liên hệ chính thức:** 1900 1234 (`APP_CONFIG.hotline`).

## Evidence on Hand

- Toàn bộ hồ sơ đặc tả nghiệp vụ: `ShuttleVNBackend/docs/product/SRS.md` v1.7, `UseCase.md` v1.5, `ShuttleVNBackend/AGENTS.md`.
- Hồ sơ thiết kế & quy ước hiện tại: `shuttle-vn-frontend/docs/design/` (`UI-screens.md`, `Wireframes.md`, `Design-System.md`, `User-Flows.md`), `Frontend-Architecture.md`, `Frontend-Conventions.md`.
- Báo cáo khảo sát toàn diện hiện trạng mã nguồn: `FRONTEND_DISCOVERY.md` (đã đối chiếu 22 routes, 10 services, và test baseline thực tế).

## Product Principles

1. **Hiệu suất & Độ tin cậy là Danh dự (Operate with Absolute Precision):** Một hệ thống đặt sân không được phép sai lệch giờ chơi hay giá tiền. Trải nghiệm tại quầy phải nhanh, nhạy, không gây nghẽn hàng chờ.
2. **Minh bạch & Trung thực với Khách hàng (Zero Ambiguity):** Báo giá rõ ràng từng mốc thời gian, trạng thái ô slot hiển thị tức thì, thông điệp lỗi luôn diễn đạt bằng tiếng Việt dễ hiểu, không bao giờ để lộ lỗi kỹ thuật hay mã HTTP thô.
3. **Thẩm mỹ Thể thao Hiện đại, Tinh tế (Clean Athletic Craft):** Giao diện năng động nhưng không ồn ào; ưu tiên độ tương phản cao, typography rõ nét, tối ưu khả năng quét mắt để người dùng tìm thấy sân và giờ chơi trong chớp mắt.
4. **Bảo toàn Tính toàn vẹn Nghiệp vụ (Immutable Core Integrity):** Giao diện mới tôn trọng 100% các ràng buộc kiến trúc sạch (Clean Architecture), tính toán giá server-side, chữ ký báo giá và cơ chế xác thực an toàn.

## Accessibility & Inclusion

- Tuân thủ tiêu chuẩn WCAG AA: Độ tương phản văn bản tối thiểu 4.5:1 (hạn chế các sắc độ xám mờ nhạt khó đọc).
- Hỗ trợ đầy đủ điều hướng bàn phím: Phím `Tab` tuần tự, `Enter` để kích hoạt form, `Esc` để đóng modal/dialog/popover.
- Screen Reader: Các nút bấm icon thuần túy bắt buộc có thuộc tính `aria-label`; bảng dữ liệu có `scope="col"`; modal có `role="dialog"` và `aria-modal="true"`.
- Không chỉ dựa vào màu sắc: Mọi trạng thái ô slot và nhãn đơn đều đi kèm chữ hoặc ký hiệu nhận biết trực quan.

