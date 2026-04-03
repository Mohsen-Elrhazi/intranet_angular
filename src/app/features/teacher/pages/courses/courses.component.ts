import { Component, inject, signal } from '@angular/core';
import { CourseService } from '../services/course.service';
import { CourseResponse } from './models/course-response.model';
import { DatePipe } from '@angular/common';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzModalModule, NzModalService } from 'ng-zorro-antd/modal';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { FormsModule } from '@angular/forms';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzTooltipDirective, NzTooltipModule } from 'ng-zorro-antd/tooltip';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { Router } from '@angular/router';

@Component({
  selector: 'app-courses',
  imports: [
    NzButtonModule,
    NzModalModule,
    NzIconModule,
    NzDividerModule,
    NzTableModule,
    NzAvatarModule,
    FormsModule,
    NzInputModule,
    NzSelectModule,
    NzCardModule,
    NzTagModule,
    NzTooltipModule,
    NzEmptyModule,
    NzSpinModule,
    NzTooltipDirective,
    NzBadgeModule,
    DatePipe,
  ],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.css',
})
export class CoursesComponent {
  private courseService = inject(CourseService);
  private router = inject(Router);

  courses = signal<CourseResponse[]>([]);

  ngOnInit() {
    this.loadCourses();
  }

  loadCourses() {
    this.courseService.getMyCourses().subscribe({
      next: (response) => {
        this.courses.set(response.data);
        // console.log('Cours chargés :', response.data);
      },
      error: (err) => {
        console.error('Erreur lors du chargement des cours :', err);
      },
    });
  }

  viewDetails(course: CourseResponse) {
    // console.log('Détails du cours :', course);
    this.router.navigate(['/teacher/courses', course.id], {
      state: { data: course },
    });
  }
}
