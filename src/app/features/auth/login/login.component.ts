import { Component, inject, signal } from '@angular/core';
import { NonNullableFormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzCheckboxModule } from 'ng-zorro-antd/checkbox';
import { NzFormModule } from 'ng-zorro-antd/form';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzCardModule } from 'ng-zorro-antd/card';
import { AuthService } from '../../../core/services/auth.service';
import { LoginRequest } from '../../../core/models/login-request.model';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { Router } from '@angular/router';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';


@Component({
  selector: 'app-login',
  imports: [
    ReactiveFormsModule,
    NzButtonModule,
    NzCheckboxModule,
    NzFormModule,
    NzInputModule,
    NzIconModule,
    NzCardModule,
    NzDividerModule,
    NzAvatarModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  private fb = inject(NonNullableFormBuilder);
  private authService = inject(AuthService);
  private router = inject(Router);
  private message = inject(NzMessageService);

  validateForm = this.fb.group({
    email: this.fb.control('', [Validators.required, Validators.email]),
    password: this.fb.control('', [Validators.required]),
  });

  isLoading = signal(false);

  login(): void {
    if (this.validateForm.valid) {
      this.isLoading.set(true);
      const loginData = this.validateForm.getRawValue();

      const request: LoginRequest = {
        email: loginData.email,
        password: loginData.password,
      };

      this.authService.login(request).subscribe({
        next: (response) => {
          this.isLoading.set(false);
          // console.log('Login successful:', response);
          this.message.success(response.message);
          this.authService.saveTokens(response.data.accessToken, response.data.refreshToken);

          switch (this.authService.getUserRole()) {
            case 'ADMIN':
              this.router.navigate(['/admin/enseignants/actifs']);
              break;
            case 'TEACHER':
              this.router.navigate(['/teacher/classrooms']);
              break;
            case 'STUDENT':
              this.router.navigate(['/student/classrooms']);
              break;
            default:
              this.router.navigate(['/login']);
          }
        },
        error: (err) => {
          this.isLoading.set(false);
          // console.log('Login failed:', err);
          this.message.error(err.error?.message || 'Une erreur est survenue');
        },
      });
    } else {
      Object.values(this.validateForm.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
    }
  }
}
