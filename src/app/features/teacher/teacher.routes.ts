import { MainLayoutComponent } from '../../layout/main-layout/main-layout.component';
import { ClassroomsComponent } from './pages/classrooms/classrooms.component';
import { CourseDetailsComponent } from './pages/courses/components/course-details/course-details.component';
import { CoursesComponent } from './pages/courses/courses.component';

export const teacherRoutes = [
  {
    path: 'courses',
    component: CoursesComponent,
  },
  {
    path: 'courses/:id',
    component: CourseDetailsComponent,
  },
  {
    path: 'classrooms',
    component: ClassroomsComponent,
  },
];
