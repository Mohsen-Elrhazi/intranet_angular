import { Routes } from '@angular/router';
import { LoginComponent } from './features/auth/login/login.component';
import { MainLayoutComponent } from './layout/main-layout/main-layout.component';
import { authGuard } from './core/guards/auth.guard';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  {
    path: '',
    component: MainLayoutComponent, 
    children: [
      {
        path: 'admin',
        canActivate: [authGuard],
        data: { role: 'ADMIN' },
        loadChildren: () => import('./features/admin/admin.routes').then((m) => m.adminRoutes),
      },
      {
        path: 'teacher',
        canActivate: [authGuard],
        data: { role: 'TEACHER' },
        loadChildren: () =>
          import('./features/teacher/teacher.routes').then((m) => m.teacherRoutes),
      },
      {
        path: 'student',
        canActivate: [authGuard],
        data: { role: 'STUDENT' },
        loadChildren: () =>
          import('./features/student/student.routes').then((m) => m.studentRoutes),
      },
    ],
  },
];
