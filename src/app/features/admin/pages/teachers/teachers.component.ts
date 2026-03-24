import { Component, inject, model, OnInit, signal } from '@angular/core';
import { TeacherService } from './services/teacher.service';
import { TeacherFormComponent } from './components/teacher-form/teacher-form.component';
import { NzModalService } from 'ng-zorro-antd/modal';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { TeacherResponse } from './models/teacher-response.model';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { FormsModule } from '@angular/forms';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzTooltipModule } from 'ng-zorro-antd/tooltip';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzEmptyModule } from 'ng-zorro-antd/empty';

@Component({
  selector: 'app-teachers',
  imports: [
    TeacherFormComponent,
    NzButtonModule,
    NzModalModule,
    NzIconModule,
    NzTableModule,
    NzDividerModule,
    NzAvatarModule,
    FormsModule,
    NzInputModule,
    NzSelectModule,
    NzCardModule,
    NzTagModule,
    NzTooltipModule,
    NzPaginationModule,
    NzEmptyModule,
  ],
  templateUrl: './teachers.component.html',
  styleUrl: './teachers.component.css',
})
export class TeachersComponent implements OnInit {
  private teacherService = inject(TeacherService);
  private modalService = inject(NzModalService);
  private messageService = inject(NzMessageService);

  teachers = signal<TeacherResponse[]>([]);
  totalElements = signal(0);
  pageIndex = 1; // Ng-Zorro commence à 1, Spring à 0
  pageSize = 12;
  searchText: string = '';
  specialization: string = '';
  loading = signal(false);

  // specializations = ['Informatique', 'Mathématiques', 'Physique', 'Économie'];

  ngOnInit() {
    this.loadTeachers();
  }

  loadTeachers() {
    this.loading.set(true);
    this.teacherService
      .getAllTeachers(this.pageIndex - 1, this.pageSize, this.searchText, this.specialization)
      .subscribe({
        next: (response) => {
          this.teachers.set(response.data.content);
          this.totalElements.set(response.data.totalElements);
          this.loading.set(false);
        },
        error: () => this.loading.set(false),
      });
  }

  onPageIndexChange(index: number) {
    this.pageIndex = index;
    this.loadTeachers();
  }

  onPageSizeChange(size: number): void {
    this.pageSize = size;
    this.pageIndex = 1;
    this.loadTeachers();
  }

  onSearch(): void {
    this.pageIndex = 1;
    this.loadTeachers();
  }

  // réinitialiser les filtres
  resetFilters(): void {
    this.searchText = '';
    this.specialization = '';
    this.pageIndex = 1;
    this.loadTeachers();
  }

  showCreateModal(): void {
    const modal = this.modalService.create({
      nzTitle: 'Ajouter un enseignant',
      nzContent: TeacherFormComponent,
      nzFooter: null,
      nzWidth: 750, //en px
      nzBodyStyle: { padding: '0' },
    });

    modal.afterClose.subscribe((result) => {
      if (result === true) {
        this.loadTeachers();
      }
    });
  }

  deleteTeacher(id: number): void {
    this.modalService.confirm({
      nzTitle: 'voulez vous supprimer cet enseignant?',
      nzOkText: 'Oui',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () =>
        this.teacherService.deleteTeacher(id).subscribe({
          next: (response) => {
            this.messageService.success(response.message);
            this.loadTeachers();
          },
          error: (err) => {
            this.messageService.error('erreur lors de suppression');
          },
        }),
      nzCancelText: 'Non',
      nzOnCancel: () => this.messageService.info('Cancel'),
    });
  }

  showEditModal(teacher: TeacherResponse): void {
    const modal = this.modalService.create({
      nzTitle: 'Modifier un enseignant',
      nzContent: TeacherFormComponent,
      nzFooter: null,
      nzWidth: 750,
      nzBodyStyle: { padding: '0' },
      nzData: { teacher: teacher },
    });

    modal.afterClose.subscribe((result) => {
      if (result === true) {
        this.loadTeachers();
      }
    });
  }
}
