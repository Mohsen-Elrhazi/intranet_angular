// export interface ApiResponse<T> {
//     status: string;
//     message: string;
//     data: T;
// }

export interface ApiResponse<T> {
    status: string;
    message: string;
    data: T;
    errors?: any;
}



export interface PageResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
}