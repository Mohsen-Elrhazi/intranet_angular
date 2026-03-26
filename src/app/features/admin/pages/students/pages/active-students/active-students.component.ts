import { Component, inject, signal } from '@angular/core';
import { StudentFormComponent } from '../../components/student-form/student-form.component';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzModalModule, NzModalService } from 'ng-zorro-antd/modal';
import { NzIconModule } from 'ng-zorro-antd/icon';
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
import { NzDrawerModule, NzDrawerService } from 'ng-zorro-antd/drawer';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzTooltipDirective } from 'ng-zorro-antd/tooltip';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { StudentService } from '../../services/student.service';
import { TeacherResponse } from '../../../teachers/models/teacher-response.model';
import { StudentResponse } from '../../models/student-response.model';
import { StudentDetailsComponent } from '../../components/student-details/student-details.component';

@Component({
  selector: 'app-active-students',
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
    NzPaginationModule,
    NzEmptyModule,
    NzDrawerModule,
    NzSpinModule,
    NzTooltipDirective  ,
    NzBadgeModule
  ],
  templateUrl: './active-students.component.html',
  styleUrl: './active-students.component.css',
})
export class ActiveStudentsComponent {
 private studentService = inject(StudentService);
  private modalService = inject(NzModalService);
  private messageService = inject(NzMessageService);
  private drawerService = inject(NzDrawerService);

  students = signal<StudentResponse[]>([]);
  totalElements = signal(0);
  pageIndex = 1; 
  pageSize = 12;
  searchText: string = '';
  cne: string = '';
  loading = signal(false);


  ngOnInit() {
    this.loadStudents();
  }

  loadStudents() {
    this.loading.set(true);
    this.studentService
      .findAllStudents(this.pageIndex - 1, this.pageSize, this.searchText, this.cne)
      .subscribe({
        next: (response) => {
          this.students.set(response.data.content);
          this.totalElements.set(response.data.totalElements);
          this.loading.set(false);
        },
        error: () => this.loading.set(false),
      });
  }

  onPageIndexChange(index: number) {
    this.pageIndex = index;
    this.loadStudents();
  }

  onPageSizeChange(size: number): void {
    this.pageSize = size;
    this.pageIndex = 1;
    this.loadStudents();
  }

  onSearch(): void {
    this.pageIndex = 1;
    this.loadStudents();
  }

  // réinitialiser les filtres
  resetFilters(): void {
    this.searchText = '';
    this.cne = '';
    this.pageIndex = 1;
    this.loadStudents();
  }

  showCreateModal(): void {
    const modal = this.modalService.create({
      nzTitle: 'Ajouter un étudiant',
      nzContent: StudentFormComponent,
      nzFooter: null,
      nzWidth: 750, //en px
      nzBodyStyle: { padding: '0' },
    });

    modal.afterClose.subscribe((result) => {
      if (result === true) {
        this.loadStudents();
      }
    });
  }

  deleteStudent(id: number): void {
    this.modalService.confirm({
      nzTitle: 'voulez vous supprimer cet étudiant?',
      nzOkText: 'Oui',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () =>
        this.studentService.deleteStudent(id).subscribe({
          next: (response) => {
            this.messageService.success(response.message);
            this.loadStudents();
          },
          error: (err) => {
            this.messageService.error('erreur lors de suppression');
          },
        }),
      nzCancelText: 'Non',
      nzOnCancel: () => this.messageService.info('Cancel'),
    });
  }

  showEditModal(student: StudentResponse): void {
    const modal = this.modalService.create({
      nzTitle: 'Modifier un étudiant',
      nzContent: StudentFormComponent,
      nzFooter: null,
      nzWidth: 750,
      nzBodyStyle: { padding: '0' },
      nzData: { student: student },
    });

    modal.afterClose.subscribe((result) => {
      if (result === true) {
        this.loadStudents();
      }
    });
  }

  viewDetails(id: number): void {
    const drawer = this.drawerService.create({
      nzTitle: "Détails de l'étudiant",
      nzContent: StudentDetailsComponent,
      nzWidth: 600,
      nzBodyStyle: { padding: '0' },
      nzData: { studentId: id },
    });

    drawer.afterClose.subscribe((studentToEdit) => {
      if (studentToEdit) {
        this.showEditModal(studentToEdit);
      }
    });
  }
}
