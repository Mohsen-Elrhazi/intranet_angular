import { Component, inject, signal } from '@angular/core';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NZ_DRAWER_DATA, NzDrawerRef } from 'ng-zorro-antd/drawer';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { StudentService } from '../../services/student.service';
import { StudentResponse } from '../../models/student-response.model';

@Component({
  selector: 'app-student-details',
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
  templateUrl: './student-details.component.html',
  styleUrl: './student-details.component.css',
})
export class StudentDetailsComponent {
  readonly nzData = inject(NZ_DRAWER_DATA);
  private studentService = inject(StudentService);
  private drawerRef = inject(NzDrawerRef);
  student = signal<StudentResponse | null>(null);

  loading = signal(true);

  ngOnInit(): void {
    const id = this.nzData.studentId;

    this.studentService.getStudentById(id).subscribe({
      next: (response) => {
        this.student.set(response.data);
        this.loading.set(false);
      },
      error: () => this.loading.set(false),
    });
  }


  onEdit(student: StudentResponse): void {
    this.drawerRef.close(student);
  }

  close(): void {
    this.drawerRef.close();
  }
}
