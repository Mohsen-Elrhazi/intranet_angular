import { inject, Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { LoginRequest } from '../models/login-request.model';
import { Observable, of, tap } from 'rxjs';
import { ApiResponse } from '../models/api-response.model';
import { AuthResponse } from '../models/auth-response.model';
import { jwtDecode } from 'jwt-decode';
import { CustomJwtPayload } from '../models/custom-jwt-payload.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = `${environment.baseUrl}/auth`;

  private http = inject(HttpClient);

  login(request: LoginRequest): Observable<ApiResponse<AuthResponse>> {
    return this.http.post<ApiResponse<AuthResponse>>(`${this.baseUrl}/login`, request);
  }

  saveTokens(accessToken: string, refreshToken: string): void {
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);
  }

  getUserRole(): string | null {
    const accessToken = localStorage.getItem('accessToken');
    if (!accessToken) return null;

    const decoded = jwtDecode<CustomJwtPayload>(accessToken);
    return decoded.role;
  }

  logout(): Observable<ApiResponse<void>> {
    const refreshToken = localStorage.getItem('refreshToken');

    if (!refreshToken) {
      this.cleanLocalStorage();
    }

    return this.http
      .post<ApiResponse<void>>(`${this.baseUrl}/logout`, { refreshToken })
      .pipe(tap(() => this.cleanLocalStorage()));
  }

  private cleanLocalStorage() {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
  }
}
