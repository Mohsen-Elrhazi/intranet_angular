import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse, PageResponse } from '../../../../../core/models/api-response.model';
import { StudentResponse } from '../models/student-response.model';

@Injectable({
  providedIn: 'root',
})
export class StudentService {
  private baseUrl = `${environment.baseUrl}/students`;

  private http = inject(HttpClient);

  createStudent(formData: FormData): Observable<ApiResponse<StudentResponse>> {
    return this.http.post<ApiResponse<StudentResponse>>(this.baseUrl, formData);
  }

  getStudentById(id: number): Observable<ApiResponse<StudentResponse>> {
    return this.http.get<ApiResponse<StudentResponse>>(`${this.baseUrl}/${id}`);
  }

  findAllStudents(
    page: number,
    size: number,
    search?: string,
    cne?: string,
  ): Observable<ApiResponse<PageResponse<StudentResponse>>> {
    let params = new HttpParams().set('page', page.toString()).set('size', size.toString());

    if (search) params = params.set('search', search);
    if (cne) params = params.set('cne', cne);
    return this.http.get<ApiResponse<PageResponse<StudentResponse>>>(this.baseUrl, { params });
  }

  deleteStudent(id: number): Observable<ApiResponse<void>> {
    return this.http.delete<ApiResponse<void>>(`${this.baseUrl}/${id}`);
  }

  updateStudent(id: number, formData: FormData): Observable<ApiResponse<StudentResponse>> {
    return this.http.patch<ApiResponse<StudentResponse>>(`${this.baseUrl}/${id}`, formData);
  }

  restoreStudent(id: number): Observable<ApiResponse<void>> {
    return this.http.patch<ApiResponse<void>>(`${this.baseUrl}/${id}/restore`, {});
  }

  findAllDeletedStudents(
    page: number,
    size: number,
    search?: string,
    cne?: string,
  ): Observable<ApiResponse<PageResponse<StudentResponse>>> {
    let params = new HttpParams().set('page', page.toString()).set('size', size.toString());
    if (search) params = params.set('search', search);
    if (cne) params = params.set('cne', cne);
    return this.http.get<ApiResponse<PageResponse<StudentResponse>>>(`${this.baseUrl}/deleted`, { params });
  }

  getAllStudentList(): Observable<ApiResponse<StudentResponse[]>> {
    return this.http.get<ApiResponse<StudentResponse[]>>(`${this.baseUrl}/active`);
  }
}
