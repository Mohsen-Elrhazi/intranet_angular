import { HttpClient, HttpParams } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../../../environments/environment';
import { Observable } from 'rxjs';
import { TeacherResponse } from '../models/teacher-response.model';
import { ApiResponse, PageResponse } from '../../../../../core/models/api-response.model';
import { CreateTeacherRequest } from '../models/create-teacher-request.model';

@Injectable({
  providedIn: 'root',
})
export class TeacherService {
  private baseUrl = `${environment.baseUrl}/teachers`;
  private http = inject(HttpClient);

  createTeacher(formData: FormData): Observable<ApiResponse<TeacherResponse>> {
    return this.http.post<ApiResponse<TeacherResponse>>(this.baseUrl, formData);
  }

  deleteTeacher(id: number): Observable<ApiResponse<void>> {
    return this.http.delete<ApiResponse<void>>(`${this.baseUrl}/${id}`);
  }

  updateTeacher(id: number, formData: FormData): Observable<ApiResponse<TeacherResponse>> {
    return this.http.patch<ApiResponse<TeacherResponse>>(`${this.baseUrl}/${id}`, formData);
  }

  getTeacherById(id: number): Observable<ApiResponse<TeacherResponse>> {
    return this.http.get<ApiResponse<TeacherResponse>>(`${this.baseUrl}/${id}`);
  }

  findAllTeachers(
    page: number,
    size: number,
    search?: string,
    specialization?: string,
  ): Observable<ApiResponse<PageResponse<TeacherResponse>>> {
    let params = new HttpParams().set('page', page.toString()).set('size', size.toString());

    if (search) params = params.set('search', search);
    if (specialization) params = params.set('specialization', specialization);

    return this.http.get<ApiResponse<PageResponse<TeacherResponse>>>(this.baseUrl, { params });
  }

  findAllDeletedTeachers(
    page: number,
    size: number,
    search?: string,
    specialization?: string,
  ): Observable<ApiResponse<PageResponse<TeacherResponse>>> {
    let params = new HttpParams().set('page', page.toString()).set('size', size.toString());

    if (search) params = params.set('search', search);
    if (specialization) params = params.set('specialization', specialization);

    return this.http.get<ApiResponse<PageResponse<TeacherResponse>>>(`${this.baseUrl}/deleted`, {
      params,
    });
  }

  restoreTeacher(id: number): Observable<ApiResponse<void>> {
    return this.http.patch<ApiResponse<void>>(`${this.baseUrl}/${id}/restore`, {});
  }

  getAllTeacherList(): Observable<ApiResponse<TeacherResponse[]>> {
    return this.http.get<ApiResponse<TeacherResponse[]>>(`${this.baseUrl}/active`);
  }
}
