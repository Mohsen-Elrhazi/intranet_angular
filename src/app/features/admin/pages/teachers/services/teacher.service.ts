import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../../../environments/environment';
import { Observable } from 'rxjs';
import {  TeacherResponse } from '../models/teacher-response.model';
import { ApiResponse } from '../../../../../core/models/api-response.model';
import { CreateTeacherRequest } from '../models/create-teacher-request.model';

@Injectable({
  providedIn: 'root',
})
export class TeacherService {
  private baseUrl = `${environment.baseUrl}/teachers`;
  private http = inject(HttpClient);

  // getAllTeachers(): Observable<ApiResponse<Teacher[]>> {
  //   return this.http.get<ApiResponse<Teacher[]>>(this.baseUrl);
  // }

  // createTeacher(teacher: CreateTeacherRequest): Observable<ApiResponse<Teacher>> {
  //   return this.http.post<ApiResponse<Teacher>>(this.baseUrl, teacher);
  // }

  // teacher.service.ts
  createTeacher(formData: FormData): Observable<ApiResponse<TeacherResponse>> {
    return this.http.post<ApiResponse<TeacherResponse>>(this.baseUrl, formData);
  }
}
