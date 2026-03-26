export interface CreateStudentRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phoneNumber: string;
  cne: string;
  profileImage: File | null;
}
