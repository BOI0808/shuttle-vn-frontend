/**
 * Self-check cho src/utils/api-error.ts.
 * Chạy: node scripts/check-api-error.mjs
 *
 * Không dùng framework test: script tự assert và exit code khác 0 nếu sai.
 */
import assert from "node:assert/strict";
import { existsSync } from "node:fs";
import { registerHooks } from "node:module";
import path from "node:path";
import { pathToFileURL } from "node:url";

const repoRoot = path.resolve(import.meta.dirname, "..");

// Cho phép import "@/..." trong mã nguồn khi chạy bằng Node.
registerHooks({
  resolve(specifier, context, nextResolve) {
    if (specifier.startsWith("@/")) {
      const base = path.join(repoRoot, "src", specifier.slice(2));
      const candidates = [`${base}.ts`, path.join(base, "index.ts")];
      const found = candidates.find((candidate) => existsSync(candidate));
      if (found) {
        return { url: pathToFileURL(found).href, shortCircuit: true };
      }
    }
    return nextResolve(specifier, context);
  },
});

const { getErrorMessage, getApiFieldErrors, ApiBusinessError } = await import(
  pathToFileURL(path.join(repoRoot, "src", "utils", "api-error.ts")).href
);

function axiosError(status, data, extra = {}) {
  return {
    isAxiosError: true,
    message: `Request failed with status code ${status}`,
    response: { status, data, headers: {} },
    ...extra,
  };
}

const cases = [
  [
    "401 sai mật khẩu -> tiếng Việt",
    axiosError(401, { success: false, message: "Invalid email or password" }),
    "Email hoặc mật khẩu không đúng.",
  ],
  [
    "403 tài khoản chưa kích hoạt -> tiếng Việt",
    axiosError(403, {
      success: false,
      message:
        "This account has not been activated. Please set your password using the link sent to your email.",
    }),
    "Tài khoản chưa được kích hoạt. Vui lòng đặt mật khẩu bằng liên kết đã gửi tới email của bạn.",
  ],
  [
    "409 email đã đăng ký -> tiếng Việt",
    axiosError(409, { success: false, message: "Email is already registered" }),
    "Email này đã được đăng ký. Vui lòng đăng nhập hoặc đặt lại mật khẩu.",
  ],
  [
    "500 internal server error -> không lộ tiếng Anh",
    axiosError(500, { success: false, message: "Internal server error" }),
    "Hệ thống đang gặp sự cố. Vui lòng thử lại sau ít phút.",
  ],
  [
    "message lạ bằng tiếng Anh -> dùng giải thích theo mã lỗi",
    axiosError(409, { success: false, message: "Some brand new english failure" }),
    "Thao tác không thực hiện được vì dữ liệu đang ở trạng thái khác. Vui lòng tải lại rồi thử lại.",
  ],
  [
    "400 lỗi theo trường -> tiếng Việt",
    axiosError(400, {
      success: false,
      message: null,
      errors: { Email: ["Email is required"], Password: ["Password is required"] },
    }),
    "Email là bắt buộc. Mật khẩu là bắt buộc.",
  ],
  [
    "message tiếng Việt từ backend -> giữ nguyên",
    axiosError(400, { success: false, message: "Email không thể thay đổi" }),
    "Email không thể thay đổi",
  ],
  [
    "404 -> tiếng Việt",
    axiosError(404, { success: false, message: "Booking not found." }),
    "Không tìm thấy đơn đặt sân.",
  ],
  [
    "429 -> tiếng Việt",
    axiosError(429, { success: false, message: null }),
    "Bạn thao tác quá nhanh. Vui lòng chờ một chút rồi thử lại.",
  ],
  [
    "429 quá nhiều request -> tiếng Việt",
    axiosError(429, { success: false, message: "Too many requests. Please try again later." }),
    "Bạn thao tác quá nhanh. Vui lòng chờ một chút rồi thử lại.",
  ],
  [
    "409 giá đổi -> tiếng Việt",
    axiosError(409, {
      success: false,
      message: "Price has changed. Please confirm the new quote.",
    }),
    "Giá sân đã thay đổi. Vui lòng xác nhận giá mới.",
  ],
  [
    "trạng thái đơn động -> tiếng Việt",
    axiosError(409, { success: false, message: "The booking is already Cancelled." }),
    "Đơn đặt sân đang ở trạng thái đã huỷ.",
  ],
  [
    "mất mạng -> tiếng Việt",
    {
      isAxiosError: true,
      message: "Network Error",
      code: "ERR_NETWORK",
    },
    "Không thể kết nối đến máy chủ. Vui lòng kiểm tra kết nối mạng rồi thử lại.",
  ],
  [
    "timeout -> tiếng Việt",
    {
      isAxiosError: true,
      message: "timeout of 15000ms exceeded",
      code: "ECONNABORTED",
    },
    "Yêu cầu quá thời gian chờ. Vui lòng kiểm tra kết nối mạng rồi thử lại.",
  ],
  [
    "lỗi do frontend ném ra -> giữ nguyên tiếng Việt",
    new Error("Hóa đơn không thể thu tiền. Vui lòng tải lại dữ liệu."),
    "Hóa đơn không thể thu tiền. Vui lòng tải lại dữ liệu.",
  ],
  [
    "lỗi nghiệp vụ HTTP 200 -> dịch theo message",
    new ApiBusinessError("Email is already registered", {
      message: "Email is already registered",
    }),
    "Email này đã được đăng ký. Vui lòng đăng nhập hoặc đặt lại mật khẩu.",
  ],
];

let failed = 0;
for (const [name, error, expected] of cases) {
  const actual = getErrorMessage(error);
  try {
    assert.equal(actual, expected);
    console.log(`ok   - ${name}`);
  } catch {
    failed += 1;
    console.log(`FAIL - ${name}\n       mong doi: ${expected}\n       thuc te : ${actual}`);
  }
}

const fieldErrors = getApiFieldErrors(
  axiosError(400, { errors: { Token: ["Link is invalid or has expired"] } })
);
try {
  assert.equal(fieldErrors.token, "Liên kết không hợp lệ hoặc đã hết hạn.");
  console.log("ok   - lỗi theo trường -> tiếng Việt");
} catch {
  failed += 1;
  console.log(`FAIL - lỗi theo trường: ${JSON.stringify(fieldErrors)}`);
}

if (failed > 0) {
  console.error(`\n${failed} trường hợp sai.`);
  process.exit(1);
}
console.log("\nTất cả trường hợp đều đúng.");
