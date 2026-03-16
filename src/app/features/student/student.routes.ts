import { MainLayoutComponent } from "../../layout/main-layout/main-layout.component";
import { AssignmentsComponent } from "./pages/assignments/assignments.component";
import { CoursesComponent } from "./pages/courses/courses.component";

export const studentRoutes = [
  // {
  //   path: 'dashboard',
  //   Component: MainLayoutComponent,
  //   children: [
      {
        path: 'assignments',
        component: AssignmentsComponent,
      },
      {
        path: 'courses',
        component: CoursesComponent,
      }
  //   ],
  // },
];