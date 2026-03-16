import { MainLayoutComponent } from '../../layout/main-layout/main-layout.component';
import { TeachersComponent } from './pages/teachers/teachers.component';
import { StudentsComponent } from './pages/students/students.component';

export const adminRoutes = [
//   {
    // path: '',
    // component: MainLayoutComponent,
    // children: [
      {
        path: 'enseignants',
        component: TeachersComponent,
      },
      {
        path: 'etudiants',
        component: StudentsComponent,
      },
    // ],
//   },
];
