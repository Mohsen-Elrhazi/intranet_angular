export interface CreateTeacherRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phoneNumber: string;
  specialization: string;
  profileImage: File | null;
}
