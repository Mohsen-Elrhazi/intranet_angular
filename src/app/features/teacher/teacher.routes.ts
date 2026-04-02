import { MainLayoutComponent } from '../../layout/main-layout/main-layout.component';
import { ClassroomsComponent } from './pages/classrooms/classrooms.component';
import { CoursesComponent } from './pages/courses/courses.component';

export const teacherRoutes = [
  {
    path: 'courses',
    component: CoursesComponent,
  },
  {
    path: 'classrooms',
    component: ClassroomsComponent,
  },
];
