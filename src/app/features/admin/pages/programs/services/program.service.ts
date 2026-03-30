import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { CreateProgramRequest } from '../models/create-program-request.model';
import { Observable } from 'rxjs';
import { ApiResponse, PageResponse } from '../../../../../core/models/api-response.model';
import { ProgramResponse } from '../models/program-response.model';
import { UpdateProgramRequest } from '../models/update-program-request.model';

@Injectable({
  providedIn: 'root',
})
export class ProgramService {
   private baseUrl = `${environment.baseUrl}/programs`;

  private http = inject(HttpClient);

   createProgram(request: CreateProgramRequest): Observable<ApiResponse<ProgramResponse>> {
    return this.http.post<ApiResponse<ProgramResponse>>(this.baseUrl, request);
  }

   getAllPrograms(
    page: number,
    size: number,
    name?: string,
  ): Observable<ApiResponse<PageResponse<ProgramResponse>>> {
    let params = new HttpParams().set('page', page.toString()).set('size', size.toString());

    if (name) {
      params = params.set('name', name);
    }
    return this.http.get<ApiResponse<PageResponse<ProgramResponse>>>(this.baseUrl, { params });
  }

  deleteProgram(id: number): Observable<ApiResponse<void>> {
    return this.http.delete<ApiResponse<void>>(`${this.baseUrl}/${id}`);
  }

  updateProgram(id: number, request: UpdateProgramRequest): Observable<ApiResponse<ProgramResponse>> {
    return this.http.patch<ApiResponse<ProgramResponse>>(`${this.baseUrl}/${id}`, request);
  }

  getAllProgramList(): Observable<ApiResponse<ProgramResponse[]>> {
    return this.http.get<ApiResponse<ProgramResponse[]>>(`${this.baseUrl}/list`);
  }
}
