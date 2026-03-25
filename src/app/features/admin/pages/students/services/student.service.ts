import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse } from '../../../../../core/models/api-response.model';
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

}
