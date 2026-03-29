export interface CreateStudentRequest {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phoneNumber: string;
  cne: string;
  profileImage: File | null;
  gender: string;
  level: string;
  city: string;
  cin: string;
  promotion: number;
  birthDate: Date;
}
