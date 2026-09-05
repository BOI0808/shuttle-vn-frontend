interface Session {
  id: string;
  device: string;
  location: string;
  lastActive: string;
  isCurrent: boolean;
}

// TODO: thay bằng dữ liệu thật từ useSessions() khi BE có endpoint /auth/sessions
const MOCK_SESSIONS: Session[] = [
  {
    id: "1",
    device: "Chrome · Windows",
    location: "Hà Nội, Việt Nam · Hiện tại",
    lastActive: "Đang hoạt động",
    isCurrent: true,
  },
];

export function SessionList() {
  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-[0_1px_3px_rgba(0,0,0,0.04)] px-5 py-5 mt-3.5">
      <h2 className="text-sm font-semibold text-gray-900 mb-3.5">
        Phiên đăng nhập
      </h2>
      <div className="flex flex-col gap-2.5">
        {MOCK_SESSIONS.map((session) => (
          <div
            key={session.id}
            className="flex items-center justify-between px-3.5 py-3 bg-gray-50 rounded-lg border border-gray-100"
          >
            <div className="flex items-center gap-2.5">
              <span className="material-symbols-outlined text-[18px] text-emerald-500">
                laptop_mac
              </span>
              <div>
                <p className="text-[13px] font-medium text-gray-900 mb-0.5">
                  {session.device}
                </p>
                <p className="text-xs text-gray-400">{session.location}</p>
              </div>
            </div>
            {session.isCurrent && (
              <span className="font-mono text-[10px] text-green-600 bg-green-50 border border-green-200 rounded-full px-2 py-0.5">
                Phiên hiện tại
              </span>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
