import { HttpHandler, HttpHandlerFn, HttpInterceptorFn, HttpRequest } from '@angular/common/http';
import { catchError, switchMap, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';
import { inject } from '@angular/core';
import { Router } from '@angular/router';

export const authInterceptor: HttpInterceptorFn = (req, next) => {
  const authService = inject(AuthService);
  const router = inject(Router);

  const token = localStorage.getItem('accessToken');

  // if (token) {
    const authReq = req.clone({
      setHeaders: {
        Authorization: `Bearer ${token}`,
      },
    });

    return next(authReq).pipe(
      catchError((error) => {
        if (error.status === 401) {
          return handleRefresh(authReq, next, authService, router);
        }
        return throwError(() => error);
      }),
    );
  // } else {
  //   return next(req);
  // }
};

const handleRefresh = (
  req: HttpRequest<any>,
  next: HttpHandlerFn,
  authService: AuthService,
  router: Router,
) => {
  return authService.refreshToken().pipe(
    switchMap((response) => {
      const newToken = response.data.accessToken;

      const finalReq = req.clone({
        setHeaders: { Authorization: `Bearer ${newToken}` },
      });
      return next(finalReq);
    }),
    catchError((err) => {
      authService.logout();
      router.navigate(['/login']);
      return throwError(() => err);
    }),
  );
};
