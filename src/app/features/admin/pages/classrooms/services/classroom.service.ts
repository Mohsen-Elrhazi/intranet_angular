import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { CreateClassroomRequest } from '../models/create-classroom-request.model';
import { Observable } from 'rxjs';
import { ApiResponse, PageResponse } from '../../../../../core/models/api-response.model';
import { ClassroomResponse } from '../models/classroom-response.model';

@Injectable({
  providedIn: 'root',
})
export class ClassroomService {
  private baseUrl = `${environment.baseUrl}/classrooms`;

  private http = inject(HttpClient);

  createClassroom(request: CreateClassroomRequest): Observable<ApiResponse<ClassroomResponse>> {
    return this.http.post<ApiResponse<ClassroomResponse>>(this.baseUrl, request);
  }

  getAllClassrooms(
    page: number,
    size: number,
    name?: string,
  ): Observable<ApiResponse<PageResponse<ClassroomResponse>>> {
    let params = new HttpParams().set('page', page.toString()).set('size', size.toString());

    if (name) {
      params = params.set('name', name);
    }
    return this.http.get<ApiResponse<PageResponse<ClassroomResponse>>>(this.baseUrl, { params });
  }

  deleteClassroom(id: number): Observable<ApiResponse<void>> {
    return this.http.delete<ApiResponse<void>>(`${this.baseUrl}/${id}`);
  }
}
