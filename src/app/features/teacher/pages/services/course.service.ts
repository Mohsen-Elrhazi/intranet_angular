import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { ApiResponse } from '../../../../core/models/api-response.model';
import { CourseResponse } from '../courses/models/course-response.model';

@Injectable({
  providedIn: 'root',
})
export class CourseService {
   private baseUrl = `${environment.baseUrl}/courses`;
  
    private http = inject(HttpClient);

    createCourse(formData: FormData): Observable<ApiResponse<CourseResponse>> {
        return this.http.post<ApiResponse<CourseResponse>>(this.baseUrl, formData);
    }

    getMyCourses(): Observable<ApiResponse<CourseResponse[]>> {
        return this.http.get<ApiResponse<CourseResponse[]>>(`${this.baseUrl}/my-courses`);
    }
  
}
