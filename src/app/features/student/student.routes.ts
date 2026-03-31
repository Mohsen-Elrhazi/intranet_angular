import { MainLayoutComponent } from "../../layout/main-layout/main-layout.component";
import { AssignmentsComponent } from "./pages/assignments/assignments.component";
import { ClassroomsComponent } from "./pages/classrooms/classrooms.component";
import { CoursesComponent } from "./pages/courses/courses.component";

export const studentRoutes = [

      {
        path: 'classrooms',
        component: ClassroomsComponent,
      },
      {
        path: 'courses',
        component: CoursesComponent,
      }

];