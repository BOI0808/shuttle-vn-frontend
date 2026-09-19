import type {Metadata} from "next";
import EmployeesClient from "@/app/(admin)/employees/EmployeesClient";

export const metadata: Metadata = { title: 'Quản lý nhân viên '};

export default function EmployeesPage() {
    return <EmployeesClient />;
}
