import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { CreateClassroomRequest } from '../models/create-classroom-request.model';
import { Observable } from 'rxjs';
import { ApiResponse } from '../../../../../core/models/api-response.model';
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
}
