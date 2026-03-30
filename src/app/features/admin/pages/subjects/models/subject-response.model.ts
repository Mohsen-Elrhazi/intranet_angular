import { ProgramResponse } from "../../programs/models/program-response.model";

export interface SubjectResponse {
    id: number;
    name: string;
    program: ProgramResponse;
}
