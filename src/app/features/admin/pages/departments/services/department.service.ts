import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse, PageResponse } from '../../../../../core/models/api-response.model';
import { DepartmentResponse } from '../models/department-response.model';
import { CreateDepartmentRequest } from '../models/create-department-request.model';

@Injectable({
  providedIn: 'root',
})
export class DepartmentService {
  private baseUrl = `${environment.baseUrl}/departments`;

  private http = inject(HttpClient);

  createDepartment(request: CreateDepartmentRequest): Observable<ApiResponse<DepartmentResponse>> {
    return this.http.post<ApiResponse<DepartmentResponse>>(this.baseUrl, request);
  }

  findAllDepartments(
    page: number,
    size: number,
    name?: string,
  ): Observable<ApiResponse<PageResponse<DepartmentResponse>>> {
    let params = new HttpParams().set('page', page.toString()).set('size', size.toString());

    if (name) {
      params = params.set('name', name);
    }
    return this.http.get<ApiResponse<PageResponse<DepartmentResponse>>>(this.baseUrl, { params });
  }

  deleteDepartement(id: number): Observable<ApiResponse<void>> {
    return this.http.delete<ApiResponse<void>>(`${this.baseUrl}/${id}`);
  }
}
