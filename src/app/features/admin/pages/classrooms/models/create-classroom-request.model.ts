export interface CreateClassroomRequest {
    name: string;
    level: string;
    promotion: string;
    programId: number;
    studentIds: number[];
    teacherIds: number[];
}
