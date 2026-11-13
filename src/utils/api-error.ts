import { isAxiosError } from "axios";

import { BOOKING_STATUS_LABEL } from "@/config/app";

export interface ApiErrorBody {
  message?: string | null;
  errors?: Record<string, string[]> | null;
}

/**
 * Lỗi do backend trả về kèm HTTP 200 (success = false) hoặc lỗi nghiệp vụ
 * được service ném ra. Giữ nguyên body để getErrorMessage dịch sang tiếng Việt.
 */
export class ApiBusinessError extends Error {
  readonly body: ApiErrorBody | null;
  readonly status?: number;

  constructor(
    message: string | null | undefined,
    body: ApiErrorBody | null,
    status?: number
  ) {
    super(message ?? "");
    this.name = "ApiBusinessError";
    this.body = body;
    this.status = status;
  }
}

const GENERIC_MESSAGE = "Đã có lỗi xảy ra. Vui lòng thử lại sau ít phút.";

const STATUS_MESSAGES: Record<number, string> = {
  400: "Dữ liệu gửi lên không hợp lệ. Vui lòng kiểm tra lại thông tin đã nhập.",
  401: "Bạn chưa đăng nhập hoặc phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.",
  403: "Bạn không có quyền thực hiện thao tác này.",
  404: "Không tìm thấy dữ liệu bạn yêu cầu. Dữ liệu có thể đã bị xóa.",
  405: "Thao tác này không được hỗ trợ.",
  409: "Thao tác không thực hiện được vì dữ liệu đang ở trạng thái khác. Vui lòng tải lại rồi thử lại.",
  413: "Dữ liệu gửi lên quá lớn.",
  422: "Dữ liệu gửi lên không hợp lệ. Vui lòng kiểm tra lại thông tin đã nhập.",
  429: "Bạn thao tác quá nhanh. Vui lòng chờ một chút rồi thử lại.",
  500: "Hệ thống đang gặp sự cố. Vui lòng thử lại sau ít phút.",
  502: "Máy chủ đang tạm thời không phản hồi. Vui lòng thử lại sau.",
  503: "Dịch vụ đang tạm thời không khả dụng. Vui lòng thử lại sau.",
  504: "Yêu cầu mất quá nhiều thời gian. Vui lòng thử lại.",
};

const NETWORK_MESSAGE =
  "Không thể kết nối đến máy chủ. Vui lòng kiểm tra kết nối mạng rồi thử lại.";
const TIMEOUT_MESSAGE =
  "Yêu cầu quá thời gian chờ. Vui lòng kiểm tra kết nối mạng rồi thử lại.";

/** Chữ có dấu riêng của tiếng Việt: text không dấu/không phải tiếng Việt sẽ được tra từ điển. */
const VIETNAMESE_CHARS =
  /[àáảãạăằắẳẵặâầấẩẫậèéẻẽẹêềếểễệìíỉĩịòóỏõọôồốổỗộơờớởỡợùúủũụưừứửữựỳýỷỹỵđ]/i;

/**
 * Từ điển message của backend (tiếng Anh) -> tiếng Việt.
 * Key = message chuẩn hóa (bỏ khoảng trắng thừa, bỏ dấu chấm cuối, lowercase).
 */
const MESSAGE_TRANSLATIONS: Record<string, string> = {
  // Tài khoản / đăng nhập
  "invalid email or password": "Email hoặc mật khẩu không đúng.",
  "unauthorized":
    "Bạn chưa đăng nhập hoặc phiên đăng nhập đã hết hạn. Vui lòng đăng nhập lại.",
  "forbidden": "Bạn không có quyền thực hiện thao tác này.",
  "this account is disabled. please contact support":
    "Tài khoản này đã bị vô hiệu hóa. Vui lòng liên hệ quản trị viên để được hỗ trợ.",
  "this account has not been activated. please set your password using the link sent to your email":
    "Tài khoản chưa được kích hoạt. Vui lòng đặt mật khẩu bằng liên kết đã gửi tới email của bạn.",
  "invalid account profile": "Thông tin tài khoản không hợp lệ.",
  "invalid email": "Email không hợp lệ.",
  "invalid or expired verification code": "Mã xác thực không hợp lệ hoặc đã hết hạn.",
  "verification code is invalid or expired": "Mã xác thực không hợp lệ hoặc đã hết hạn.",
  "already having an active code":
    "Mã xác thực trước vẫn còn hiệu lực. Vui lòng dùng mã đó hoặc thử lại sau ít phút.",
  "email is already registered":
    "Email này đã được đăng ký. Vui lòng đăng nhập hoặc đặt lại mật khẩu.",
  "customer already has an account": "Khách hàng này đã có tài khoản.",
  "current password is incorrect": "Mật khẩu hiện tại không đúng.",
  "link is invalid or has expired": "Liên kết không hợp lệ hoặc đã hết hạn.",
  "account is not active": "Tài khoản chưa kích hoạt.",
  "account role or profile changed; sign in again":
    "Quyền hoặc thông tin tài khoản đã thay đổi. Vui lòng đăng nhập lại.",
  "employee access is required": "Cần quyền nhân viên để thực hiện thao tác này.",
  "staff can only manage customer accounts":
    "Nhân viên chỉ có thể quản lý tài khoản khách hàng.",
  "account is awaiting activation and cannot be locked or unlocked":
    "Tài khoản đang chờ kích hoạt nên không thể khóa hoặc mở khóa.",
  "profile not found": "Không tìm thấy hồ sơ.",
  "account not found": "Không tìm thấy tài khoản.",
  "customer not found": "Không tìm thấy khách hàng.",
  "employee not found": "Không tìm thấy nhân viên.",
  "employee profile is missing for this account":
    "Tài khoản này thiếu hồ sơ nhân viên.",
  "cannot change the status of an administrator account":
    "Không thể thay đổi trạng thái của tài khoản quản trị viên.",
  "cannot delete an administrator account":
    "Không thể xóa tài khoản quản trị viên.",

  // Lỗi dữ liệu theo trường
  "email is required": "Email là bắt buộc.",
  "password is required": "Mật khẩu là bắt buộc.",
  "full name is required": "Họ và tên là bắt buộc.",
  "phone number is required": "Số điện thoại là bắt buộc.",
  "email is not valid": "Email không hợp lệ.",
  "a valid email address is required": "Email không hợp lệ.",
  "a valid email is required": "Email không hợp lệ.",
  "passwords do not match": "Mật khẩu xác nhận không khớp.",
  "verification code is required": "Mã xác thực là bắt buộc.",
  "new password must be at least 8 characters":
    "Mật khẩu mới phải có ít nhất 8 ký tự.",
  "current password is required": "Mật khẩu hiện tại là bắt buộc.",
  "phone number must have 8-15 digits and may start with +":
    "Số điện thoại phải có 8-15 chữ số và có thể bắt đầu bằng dấu +.",
  "phone must be 8–12 digits (leading + allowed)":
    "Số điện thoại phải có 8-12 chữ số (có thể bắt đầu bằng dấu +).",
  "court name is required": "Tên sân là bắt buộc.",
  "invalid court status": "Trạng thái sân không hợp lệ.",
  "defaultpriceperhour must be greater than 0":
    "Giá mặc định mỗi giờ phải lớn hơn 0.",
  "priceperhour must be greater than 0": "Đơn giá mỗi giờ phải lớn hơn 0.",
  "dayofweek must be between 1 and 7": "Thứ trong tuần phải từ 1 đến 7.",
  "at least one pricing rule is required": "Cần ít nhất một khung giá.",
  "pricing rule start times must be unique":
    "Giờ bắt đầu của các khung giá phải khác nhau.",
  "start time must be at :00 or :30 with no seconds":
    "Giờ bắt đầu phải là :00 hoặc :30.",
  "end time must be at :00 or :30 with no seconds":
    "Giờ kết thúc phải là :00 hoặc :30.",
  "end time must be after start time": "Giờ kết thúc phải sau giờ bắt đầu.",
  "minimum booking duration is 30 minutes":
    "Thời lượng đặt sân tối thiểu là 30 phút.",
  "reason is required": "Vui lòng nhập lý do.",
  "invalid time slot": "Khung giờ không hợp lệ.",
  "invalid contact information": "Thông tin liên hệ không hợp lệ.",
  "invalid invoice status": "Trạng thái hóa đơn không hợp lệ.",
  "invalid or expired code": "Mã xác thực không hợp lệ hoặc đã hết hạn.",
  "incorrect code": "Mã xác thực không đúng.",
  "price confirmation is required":
    "Thiếu xác nhận giá. Vui lòng lấy lại báo giá trước khi đặt sân.",
  "validation failed": "Dữ liệu gửi lên không hợp lệ.",
  "payment amount, method and actual utc payment time are required":
    "Thiếu số tiền, phương thức hoặc thời điểm thanh toán.",
  "payment amount, method and time must be empty when the booking is unpaid":
    "Đơn chưa thanh toán thì không được nhập số tiền, phương thức hay thời điểm thanh toán.",
  "from date must not be after to date": "Từ ngày không được sau đến ngày.",
  "messages is required": "Cần có nội dung tin nhắn.",
  "the last message must be from the user":
    "Tin nhắn cuối cùng phải do người dùng gửi.",
  "keyword is required":
    "Vui lòng nhập số điện thoại, email hoặc mã đặt sân cần tra cứu.",
  "enter a phone number (8-15 digits), an email or a booking code (ds-...)":
    "Vui lòng nhập số điện thoại (8-15 chữ số), email hoặc mã đặt sân (DS-...).",
  "a reason containing 1–1000 characters is required":
    "Lý do phải có từ 1 đến 1000 ký tự.",
  "payment or refund amount must equal the full invoice total in whole vnd":
    "Số tiền thanh toán hoặc hoàn tiền phải bằng đúng tổng hóa đơn (VND).",
  "a valid method and actual utc payment/refund time no later than server time are required":
    "Phương thức và thời điểm thanh toán/hoàn tiền không hợp lệ.",
  "confirm the full external refund before cancelling a paid invoice":
    "Vui lòng xác nhận đã hoàn tiền đầy đủ trước khi hủy hóa đơn đã thanh toán.",
  "refund time must not precede payment time":
    "Thời điểm hoàn tiền không được trước thời điểm thanh toán.",
  "only a valid paid invoice can receive a refund":
    "Chỉ hóa đơn đã thanh toán hợp lệ mới được hoàn tiền.",
  "an unchanged booking cannot receive a refund":
    "Đơn không thay đổi thì không thể hoàn tiền.",
  "same-total paid reschedules retain their paid invoice; no refund is allowed":
    "Đổi lịch giữ nguyên tổng tiền sẽ giữ hóa đơn cũ, không thể hoàn tiền.",
  "request a price preview first to establish the guest booking scope":
    "Vui lòng xem báo giá trước khi đặt sân.",
  "request a price preview first and retain its cookie":
    "Vui lòng xem báo giá trước khi đặt sân.",
  "a single idempotency-key header containing 1–200 visible ascii characters is required":
    "Thiếu mã định danh yêu cầu (Idempotency-Key). Vui lòng tải lại trang rồi thử lại.",
  "idempotency-key was already used for a different request":
    "Mã định danh yêu cầu đã được dùng cho một yêu cầu khác. Vui lòng tải lại trang rồi thử lại.",
  "invalid verification code type": "Loại mã xác thực không hợp lệ.",
  "the data was changed by another operation. please reload and try again":
    "Dữ liệu vừa được thay đổi bởi thao tác khác. Vui lòng tải lại và thử lại.",

  // Nghiệp vụ đặt sân / hóa đơn
  "resource not found": "Không tìm thấy dữ liệu bạn yêu cầu.",
  "resource already exists": "Dữ liệu đã tồn tại.",
  "too many requests. please try again later":
    "Bạn thao tác quá nhanh. Vui lòng chờ một chút rồi thử lại.",
  "price has changed. please confirm the new quote":
    "Giá sân đã thay đổi. Vui lòng xác nhận giá mới.",
  "booking not found": "Không tìm thấy đơn đặt sân.",
  "invoice not found": "Không tìm thấy hóa đơn.",
  "court not found": "Không tìm thấy sân.",
  "only pending or confirmed bookings can be cancelled":
    "Chỉ đơn đang chờ hoặc đã xác nhận mới có thể hủy.",
  "paid bookings must be cancelled through an employee":
    "Đơn đã thanh toán phải được nhân viên hủy.",
  "booking can only be cancelled at least 1 hour before start time":
    "Chỉ có thể hủy đơn trước giờ bắt đầu ít nhất 1 giờ.",
  "booking has no valid invoice to refund":
    "Đơn không có hóa đơn hợp lệ để hoàn tiền.",
  "booking start time must be in the future":
    "Giờ bắt đầu đặt sân phải nằm trong tương lai.",
  "no pricing rules configured for this court and day":
    "Chưa cấu hình khung giá cho sân này vào ngày đó.",
  "pricing rules do not cover the entire booking interval":
    "Khung giá không bao phủ trọn khoảng thời gian bạn chọn.",
  "court is not available on this day": "Sân không mở cửa vào ngày này.",
  "cancelled bookings or invalid invoices cannot receive payment":
    "Đơn đã hủy hoặc hóa đơn không hợp lệ không thể thanh toán.",
  "invoice already paid with different payment details. do not transfer money again":
    "Hóa đơn đã được thanh toán với thông tin khác. Vui lòng không chuyển tiền thêm lần nữa.",
  "invoice does not match a confirmed or completed booking":
    "Hóa đơn không khớp với đơn đã xác nhận hoặc hoàn thành.",
  "booking or invoice changed; reload before retrying. do not repeat an external money transfer":
    "Đơn hoặc hóa đơn đã thay đổi. Vui lòng tải lại trước khi thử lại và không chuyển tiền lần nữa.",
  "paid bookings must be handled by an employee":
    "Đơn đã thanh toán phải do nhân viên xử lý.",
  "only pending or confirmed bookings can be rescheduled":
    "Chỉ đơn đang chờ hoặc đã xác nhận mới có thể đổi lịch.",
  "original and new start times must be at least one hour after server time":
    "Giờ bắt đầu cũ và mới phải cách thời điểm hiện tại ít nhất 1 giờ.",
  "paid bookings must be rescheduled through an employee":
    "Đơn đã thanh toán phải được nhân viên đổi lịch.",
  "target court is not active": "Sân được chọn không hoạt động.",
  "target slot is outside available opening hours":
    "Khung giờ chọn nằm ngoài giờ mở cửa của sân.",
  "target slot overlaps another booking":
    "Khung giờ chọn bị trùng với đơn đặt sân khác.",
  "pending bookings must not have a valid invoice or refund":
    "Đơn đang chờ không được có hóa đơn hoặc khoản hoàn tiền.",
  "booking has no matching valid invoice": "Đơn không có hóa đơn hợp lệ tương ứng.",
  "the booking has not ended yet; manual completion cannot bypass automatic settlement":
    "Đơn chưa kết thúc nên không thể hoàn thành thủ công.",
  "employee identity is required": "Cần thông tin nhân viên để thực hiện.",
  "the court no longer exists": "Sân không còn tồn tại.",
  "the court is not active": "Sân không hoạt động.",
  "the court is not available at the requested time":
    "Sân không trốn trong khung giờ bạn chọn.",
  "the time slot overlaps with another booking":
    "Khung giờ bị trùng với đơn đặt sân khác.",
  "booking court changed; reload and retry":
    "Sân của đơn đã thay đổi. Vui lòng tải lại và thử lại.",
  "only authenticated customers can create bookings":
    "Chỉ khách hàng đã đăng nhập mới có thể đặt sân.",
  "only authenticated customers can view booking history":
    "Chỉ khách hàng đã đăng nhập mới xem được lịch sử đặt sân.",
  "customer profile not found": "Không tìm thấy hồ sơ khách hàng.",
  "the booking has already started; confirmation is no longer allowed":
    "Đơn đã bắt đầu nên không thể xác nhận nữa.",
  "confirmed bookings cannot be rejected; use the cancellation flow instead":
    "Đơn đã xác nhận không thể từ chối. Vui lòng dùng chức năng hủy đơn.",
  "booking end time passed; booking was settled automatically. reload its current state":
    "Đơn đã kết thúc và được hệ thống tự động chốt. Vui lòng tải lại trạng thái hiện tại.",

  // Gửi email
  "email delivery failed. smtp rejected the request or is unavailable":
    "Không gửi được email. Máy chủ email đang không sẵn sàng.",
  "email delivery failed. resend rejected the request":
    "Không gửi được email mã xác thực. Vui lòng thử lại sau.",
  "email delivery failed. resend is unavailable or timed out":
    "Dịch vụ gửi email đang không sẵn sàng. Vui lòng thử lại sau.",
};

/** Message có biến động -> dịch theo mẫu. Khớp trên message đã chuẩn hóa. */
type PatternTranslation = [RegExp, string | ((match: RegExpExecArray) => string)];

const PATTERN_TRANSLATIONS: PatternTranslation[] = [
  [/^court with name '.+' already exists$/, "Tên sân đã tồn tại. Vui lòng chọn tên khác."],
  [/^court with id .+ not found$/, "Không tìm thấy sân."],
  [/^court .+ has no schedule for day .+$/, "Sân chưa có lịch mở cửa cho ngày này."],
  [/^schedule for day .+ of court .+ not found$/, "Không tìm thấy lịch mở cửa của sân."],
  [
    /^the booking is already (.+)$/,
    (match) => `Đơn đặt sân đang ở trạng thái ${bookingStatusLabel(match[1])}.`,
  ],
  [/^password must be between (\d+) and (\d+) characters$/, "Mật khẩu phải có độ dài từ {0} đến {1} ký tự."],
  [/^the first pricing rule must start at (.+)$/, "Khung giá đầu tiên phải bắt đầu lúc {0}."],
  [/^pricing rule start times must be within (.+)$/, "Giờ bắt đầu khung giá phải nằm trong {0}."],
  [/^fromdate must be <= todate and the range at most (\d+) days$/, "Từ ngày phải không sau đến ngày và khoảng thời gian tối đa {0} ngày."],
  [/^at most (\d+) messages are allowed$/, "Chỉ được gửi tối đa {0} tin nhắn."],
];

const FIELD_LABELS: Record<string, string> = {
  email: "Email",
  password: "Mật khẩu",
  confirmpassword: "Mật khẩu xác nhận",
  currentpassword: "Mật khẩu hiện tại",
  newpassword: "Mật khẩu mới",
  confirmnewpassword: "Xác nhận mật khẩu mới",
  fullname: "Họ và tên",
  phone: "Số điện thoại",
  code: "Mã xác thực",
  verificationcode: "Mã xác thực",
  token: "Liên kết đặt mật khẩu",
  name: "Tên sân",
  defaultpriceperhour: "Giá mặc định mỗi giờ",
  priceperhour: "Đơn giá mỗi giờ",
  pricingrules: "Khung giá",
  dayofweek: "Thứ trong tuần",
  starttime: "Giờ bắt đầu",
  endtime: "Giờ kết thúc",
  reason: "Lý do",
  status: "Trạng thái",
  type: "Loại mã xác thực",
  ispaid: "Thanh toán",
  fromdate: "Từ ngày",
  todate: "Đến ngày",
  daterange: "Khoảng thời gian",
  keyword: "Từ khóa tra cứu",
  messages: "Nội dung tin nhắn",
  guestscope: "Phạm vi đặt sân",
  role: "Quyền",
};

function normalize(text: string): string {
  return text.trim().replace(/\s+/g, " ").replace(/[.\s]+$/, "").toLowerCase();
}

function fieldLabel(field: string): string {
  return FIELD_LABELS[field.trim().toLowerCase()] ?? "Thông tin";
}

function bookingStatusLabel(status: string): string {
  const entry = Object.entries(BOOKING_STATUS_LABEL).find(
    ([key]) => key.toLowerCase() === status.trim().toLowerCase()
  );
  return entry ? entry[1].toLowerCase() : "khác";
}

/**
 * Dịch một message của backend sang tiếng Việt.
 * Trả về null nếu message không nằm trong từ điển (message lạ hoặc rỗng).
 */
export function translateApiMessage(text: string | null | undefined): string | null {
  if (!text) return null;
  const trimmed = text.trim();
  if (!trimmed) return null;
  if (VIETNAMESE_CHARS.test(trimmed)) return trimmed;

  const key = normalize(trimmed);
  const exact = MESSAGE_TRANSLATIONS[key];
  if (exact) return exact;

  for (const [pattern, template] of PATTERN_TRANSLATIONS) {
    const match = pattern.exec(key);
    if (!match) continue;
    if (typeof template === "function") return template(match);
    return template.replace(/\{(\d+)\}/g, (_, index: string) => match[Number(index)] ?? "");
  }

  return null;
}

function toBody(data: unknown): ApiErrorBody | null {
  if (!data || typeof data !== "object") return null;
  const body = data as ApiErrorBody;
  const hasMessage = typeof body.message === "string" && body.message.length > 0;
  const hasErrors = !!body.errors && typeof body.errors === "object";
  return hasMessage || hasErrors ? body : null;
}

function extractBody(error: unknown): ApiErrorBody | null {
  if (isAxiosError<ApiErrorBody>(error)) return toBody(error.response?.data);
  if (error instanceof ApiBusinessError) return error.body;
  return null;
}

function extractStatus(error: unknown): number | undefined {
  if (isAxiosError(error)) return error.response?.status;
  if (error instanceof ApiBusinessError) return error.status;
  return undefined;
}

function statusMessage(status?: number): string {
  if (status && STATUS_MESSAGES[status]) return STATUS_MESSAGES[status];
  return GENERIC_MESSAGE;
}

/** Thông điệp tiếng Việt theo mã lỗi HTTP. */
export function getStatusMessage(status?: number): string {
  return statusMessage(status);
}

function networkMessage(error: { code?: string; message?: string }): string {
  const code = error.code ?? "";
  if (code === "ECONNABORTED" || code === "ETIMEDOUT" || /timeout/i.test(error.message ?? "")) {
    return TIMEOUT_MESSAGE;
  }
  return NETWORK_MESSAGE;
}

function buildApiMessage(status: number | undefined, body: ApiErrorBody | null): string {
  const parts: string[] = [];

  const main = translateApiMessage(body?.message);
  if (main) parts.push(main);

  for (const [field, values] of Object.entries(body?.errors ?? {})) {
    for (const value of values ?? []) {
      const translated =
        translateApiMessage(value) ?? `${fieldLabel(field)}: giá trị không hợp lệ.`;
      parts.push(translated);
    }
  }

  const unique = Array.from(new Set(parts.map((part) => part.trim()).filter(Boolean)));
  return unique.length > 0 ? unique.join(" ") : statusMessage(status);
}

/**
 * Thông điệp lỗi tiếng Việt, dùng chung cho mọi lời gọi API.
 * - Lỗi HTTP: dùng message của backend nếu dịch được, nếu không thì dùng giải thích theo mã lỗi.
 * - Lỗi mạng / timeout: thông báo tiếng Việt, không lộ message của axios.
 */
export function getErrorMessage(error: unknown): string {
  if (isAxiosError(error)) {
    if (!error.response) return networkMessage(error);
    return buildApiMessage(error.response.status, toBody(error.response.data));
  }

  if (error instanceof ApiBusinessError) {
    return buildApiMessage(error.status, error.body);
  }

  if (error instanceof Error) return error.message || GENERIC_MESSAGE;
  if (typeof error === "string") return error || GENERIC_MESSAGE;
  return GENERIC_MESSAGE;
}

/** Lỗi theo từng trường, key = tên trường lowercase, value = thông điệp tiếng Việt. */
export function getApiFieldErrors(error: unknown): Record<string, string> {
  const body = extractBody(error);
  const result: Record<string, string> = {};

  for (const [field, values] of Object.entries(body?.errors ?? {})) {
    for (const value of values ?? []) {
      const translated =
        translateApiMessage(value) ?? `${fieldLabel(field)}: giá trị không hợp lệ.`;
      result[field.trim().toLowerCase()] = translated;
      break;
    }
  }

  return result;
}

export function hasApiFieldError(error: unknown, field: string): boolean {
  const body = extractBody(error);
  if (!body?.errors || typeof body.errors !== "object") return false;
  return Object.keys(body.errors).some(
    (key) => key.toLowerCase() === field.toLowerCase()
  );
}

export function getRetryAfterSeconds(error: unknown): number | null {
  if (!isAxiosError(error) || error.response?.status !== 429) return null;
  const seconds = Number(error.response.headers?.["retry-after"]);
  return Number.isFinite(seconds) && seconds > 0 ? Math.ceil(seconds) : null;
}

export function isUnauthorizedError(error: unknown): boolean {
  return extractStatus(error) === 401;
}

export function isNotFoundError(error: unknown): boolean {
  return extractStatus(error) === 404;
}
