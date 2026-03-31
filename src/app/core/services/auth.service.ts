import { inject, Injectable, signal } from '@angular/core';
import { environment } from '../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { LoginRequest } from '../models/login-request.model';
import { Observable, of, tap } from 'rxjs';
import { ApiResponse } from '../models/api-response.model';
import { AuthResponse } from '../models/auth-response.model';
import { jwtDecode } from 'jwt-decode';
import { CustomJwtPayload } from '../models/custom-jwt-payload.model';
import { UserResponse } from '../models/user-response.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = `${environment.baseUrl}/auth`;

  private http = inject(HttpClient);

  currentUser = signal<CustomJwtPayload | null>(this.decodeToken());

  private decodeToken(): CustomJwtPayload | null {
    const accessToken = localStorage.getItem('accessToken');

    if (!accessToken) return null;

    return jwtDecode<CustomJwtPayload>(accessToken);
  }

  login(request: LoginRequest): Observable<ApiResponse<AuthResponse>> {
    return this.http.post<ApiResponse<AuthResponse>>(`${this.baseUrl}/login`, request);
  }

  saveTokens(accessToken: string, refreshToken: string): void {
    localStorage.setItem('accessToken', accessToken);
    localStorage.setItem('refreshToken', refreshToken);

    this.currentUser.set(this.decodeToken());
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
    this.currentUser.set(null);
  }

  refreshToken(): Observable<ApiResponse<AuthResponse>> {
    const refreshToken = localStorage.getItem('refreshToken');
    return this.http.post<ApiResponse<AuthResponse>>(`${this.baseUrl}/refresh-token`, { refreshToken }).pipe(
      tap((response) => {
        this.saveTokens(response.data.accessToken, response.data.refreshToken);
      })
    );
  }

  getAuthenticateUser(): Observable<ApiResponse<UserResponse>> {
    return this.http.get<ApiResponse<UserResponse>>(`${this.baseUrl}/me`);
  }
}
