import { Component, inject, OnInit, signal } from '@angular/core';
import { NZ_DRAWER_DATA, NzDrawerRef } from 'ng-zorro-antd/drawer';
import { TeacherService } from '../../services/teacher.service';
import { TeacherResponse } from '../../models/teacher-response.model';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzButtonModule } from 'ng-zorro-antd/button';

@Component({
  selector: 'app-teacher-details',
  imports: [
    NzAvatarModule,
    NzTagModule,
    NzDescriptionsModule,
    NzDividerModule,
    NzBadgeModule,
    NzSpinModule,
    NzIconModule,
    NzButtonModule,
  ],
  templateUrl: './teacher-details.component.html',
  styleUrl: './teacher-details.component.css',
})
export class TeacherDetailsComponent implements OnInit {
  readonly nzData = inject(NZ_DRAWER_DATA);
  private teacherService = inject(TeacherService);

  teacher = signal<TeacherResponse | null>(null);

  loading = signal(true);

  ngOnInit(): void {
    const id = this.nzData.teacherId;

    this.teacherService.getTeacherById(id).subscribe({
      next: (response) => {
        this.teacher.set(response.data);
        this.loading.set(false);
      },
      error: () => this.loading.set(false),
    });
  }

  private drawerRef = inject(NzDrawerRef);

  onEdit(teacher: TeacherResponse): void {
    this.drawerRef.close(teacher);
  }

  close(): void {
    this.drawerRef.close();
  }
}
