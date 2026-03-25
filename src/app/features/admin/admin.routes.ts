import { MainLayoutComponent } from '../../layout/main-layout/main-layout.component';
import { StudentsComponent } from './pages/students/students.component';
import { DepartmentsComponent } from './pages/departments/departments.component';
import { ActiveTeachersComponent } from './pages/teachers/pages/active-teachers/active-teachers.component';
import { DeletedTeachersComponent } from './pages/teachers/pages/deleted-teachers/deleted-teachers.component';
import { Routes } from '@angular/router';

export const adminRoutes: Routes = [
  {
    path: 'enseignants',
    children: [
      {
        path: 'actifs',
        component: ActiveTeachersComponent,
      },
      {
        path: 'supprimes',
        component: DeletedTeachersComponent,
      },
      {
        path: '',
        redirectTo: 'actifs',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: 'etudiants',
    component: StudentsComponent,
  },
  {
    path: 'departements',
    component: DepartmentsComponent,
  },
];
