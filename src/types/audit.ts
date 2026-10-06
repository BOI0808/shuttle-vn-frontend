import type { components, paths } from "@/components/api/schema";

export type ActorType = components["schemas"]["ActorType"];
export type Audit = components["schemas"]["AuditDto"];
export type AuditQuery = NonNullable<paths["/api/audits"]["get"]["parameters"]["query"]>;
export type AuditListResponse = paths["/api/audits"]["get"]["responses"][200]["content"]["application/json"];
export type AuditPage = NonNullable<AuditListResponse["data"]>;

// FE-only key/value configuration.
export interface Parameter {
  key: string; // unique
  value: string;
}
