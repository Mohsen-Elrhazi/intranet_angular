import { MainLayoutComponent } from '../../layout/main-layout/main-layout.component';
import { StudentsComponent } from './pages/students/students.component';
import { DepartmentsComponent } from './pages/departments/departments.component';
import { ActiveTeachersComponent } from './pages/teachers/pages/active-teachers/active-teachers.component';
import { DeletedTeachersComponent } from './pages/teachers/pages/deleted-teachers/deleted-teachers.component';
import { Routes } from '@angular/router';
import { ActiveStudentsComponent } from './pages/students/pages/active-students/active-students.component';
import { DeletedStudentsComponent } from './pages/students/pages/deleted-students/deleted-students.component';
import { ProgramsComponent } from './pages/programs/programs.component';

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
   children: [
      {
        path: 'actifs',
        component: ActiveStudentsComponent,
      },
      {
        path: 'supprimes',
        component: DeletedStudentsComponent,
      },
      {
        path: '',
        redirectTo: 'actifs',
        pathMatch: 'full',
      },
    ],
  },
  {
    path: 'departements',
    component: DepartmentsComponent,
  },
  {
    path: 'filieres',
    component: ProgramsComponent,
  },
];
