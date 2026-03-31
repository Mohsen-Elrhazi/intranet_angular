import { ProgramResponse } from "../../programs/models/program-response.model";
import { StudentResponse } from "../../students/models/student-response.model";

export interface ClassroomResponse {
    id: number;
    name: string;
    level: string;
    promotion: string;
    program: ProgramResponse;
    students: StudentResponse[];
    teachers: StudentResponse[];
}
