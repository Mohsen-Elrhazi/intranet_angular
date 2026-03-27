import { DepartmentResponse } from "../../departments/models/department-response.model";

export interface ProgramResponse {
    id: number;
    name: string;
    description: string;
    department: DepartmentResponse;
}
