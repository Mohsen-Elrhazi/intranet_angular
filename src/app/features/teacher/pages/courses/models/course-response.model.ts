import { ClassroomResponse } from "../../../../admin/pages/classrooms/models/classroom-response.model";
import { TeacherResponse } from "../../../../admin/pages/teachers/models/teacher-response.model";

export interface CourseResponse {
    id: number;
    title: string;
    description: string;
    fileUrl: string;
    createdAt: string;
    teacher: TeacherResponse;
    classroom: ClassroomResponse;
}
