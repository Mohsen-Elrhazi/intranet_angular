import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse } from '../../../../../core/models/api-response.model';
import { DepartmentResponse } from '../models/department-response.model';
import { CreateDepartmentRequest } from '../models/create-department-request.model';

@Injectable({
  providedIn: 'root',
})
export class DepartmentService {
  private baseUrl = `${environment.baseUrl}/departments`;

  private http = inject(HttpClient);

  createDepartment(request: CreateDepartmentRequest): Observable<ApiResponse<DepartmentResponse>>{
    return this.http.post<ApiResponse<DepartmentResponse>>(this.baseUrl, request);
  }
  
}
