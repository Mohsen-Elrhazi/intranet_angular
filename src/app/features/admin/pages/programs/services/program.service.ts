import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../../../environments/environment';
import { HttpClient, HttpParams } from '@angular/common/http';
import { CreateProgramRequest } from '../models/create-program-request.model';
import { Observable } from 'rxjs';
import { ApiResponse, PageResponse } from '../../../../../core/models/api-response.model';
import { ProgramResponse } from '../models/program-response.model';

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
}
