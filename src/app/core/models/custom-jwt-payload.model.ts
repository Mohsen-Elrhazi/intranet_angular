export interface CustomJwtPayload {
    sub: string;
    role: 'ADMIN' | 'Teacher' | 'Student';
    iat: number;
    exp: number;
}
