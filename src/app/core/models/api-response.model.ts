export interface ApiResponse<T> {
    status: string;
    message: string;
    data: T;
}


export interface PageResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
}