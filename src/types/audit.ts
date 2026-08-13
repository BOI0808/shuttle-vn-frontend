export interface Audit {
  id: number;
  userId: string; // FK → UserAccount.accountId
  action: string; // CREATE | UPDATE | DELETE
  entityName: string; // tên bảng, VD: "Court", "Booking"
  entityId: string;
  oldValue: string | null; // JSON snapshot trước khi thay đổi
  newValue: string | null; // JSON snapshot sau khi thay đổi
  createdAt: string;
}

export interface Parameter {
  key: string; // unique
  value: string;
}
