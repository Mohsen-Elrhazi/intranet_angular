import { ClassroomResponse } from "../../../../admin/pages/classrooms/models/classroom-response.model";

export interface CourseResponse {
    id: number;
    title: string;
    description: string;
    fileUrl: string;
    createdAt: string;
    classroom: ClassroomResponse;
}
