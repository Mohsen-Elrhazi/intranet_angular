import { MainLayoutComponent } from '../../layout/main-layout/main-layout.component';
import { AssignmentsComponent } from './pages/assignments/assignments.component';
import { CoursesComponent } from './pages/courses/courses.component';

export const teacherRoutes = [
  {
    path: 'dashboard',
    Component: MainLayoutComponent,
    children: [
      {
        path: 'courses',
        Component: CoursesComponent,
      },
      {
        path: 'assignments',
        Component: AssignmentsComponent,
      },
    ],
  },
];
