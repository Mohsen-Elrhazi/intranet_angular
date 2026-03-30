import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { CreateSubjectRequest } from '../models/create-subject-request.model';
import { Observable } from 'rxjs';
import { ApiResponse } from '../../../../../core/models/api-response.model';
import { SubjectResponse } from '../models/subject-response.model';

@Injectable({
  providedIn: 'root',
})
export class SubjectService {
  private baseUrl = `${environment.baseUrl}/subjects`;

  private http = inject(HttpClient);

  createSubject(request: CreateSubjectRequest): Observable<ApiResponse<SubjectResponse>> {
    return this.http.post<ApiResponse<SubjectResponse>>(`${this.baseUrl}`, request);
  }

  getAllSubjectList(): Observable<ApiResponse<SubjectResponse[]>> {
    return this.http.get<ApiResponse<SubjectResponse[]>>(`${this.baseUrl}/list`); 
  }

  deleteSubject(id: number): Observable<ApiResponse<void>> {
    return this.http.delete<ApiResponse<void>>(`${this.baseUrl}/${id}`);
  }

  
}
