import { Component, inject, signal } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ClassroomFormComponent } from './components/classroom-form/classroom-form.component';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzModalModule, NzModalService } from 'ng-zorro-antd/modal';
import { NzDrawerModule, NzDrawerService } from 'ng-zorro-antd/drawer';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { FormsModule } from '@angular/forms';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzTooltipDirective, NzTooltipModule } from 'ng-zorro-antd/tooltip';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { ClassroomResponse } from './models/classroom-response.model';
import { ClassroomService } from './services/classroom.service';

@Component({
  selector: 'app-classrooms',
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
    NzTooltipDirective,
    NzBadgeModule,
  ],
  templateUrl: './classrooms.component.html',
  styleUrl: './classrooms.component.css',
})
export class ClassroomsComponent {
  private modalService = inject(NzModalService);
  private messageService = inject(NzMessageService);

  private classroomService = inject(ClassroomService);

  classrooms = signal<ClassroomResponse[]>([]);
  totalElements = signal(0);
  pageIndex = 1;
  pageSize = 12;
  name: string = '';
  loading = signal(false);

  ngOnInit() {
    this.loadClassrooms();
  }

  loadClassrooms() {
    this.loading.set(true);
    this.classroomService
      .getAllClassrooms(this.pageIndex - 1, this.pageSize, this.name)
      .subscribe({
        next: (response) => {
          this.classrooms.set(response.data.content);
          this.totalElements.set(response.data.totalElements);
          this.loading.set(false);
        },
        error: () => this.loading.set(false),
      });
  }

  onPageIndexChange(index: number) {
    this.pageIndex = index;
    this.loadClassrooms();
  }

  onPageSizeChange(size: number): void {
    this.pageSize = size;
    this.pageIndex = 1;
    this.loadClassrooms();
  }

  onSearch(): void {
    this.pageIndex = 1;
    this.loadClassrooms();
  }

  // réinitialiser les filtres
  resetFilters(): void {
    this.name = '';
    this.pageIndex = 1;
    this.loadClassrooms();
  }

  showCreateModal(): void {
    const modal = this.modalService.create({
      nzTitle: 'Ajouter une classe',
      nzContent: ClassroomFormComponent,
      nzFooter: null,
      nzBodyStyle: { padding: '0' },
    });

    modal.afterClose.subscribe((result) => {
      if (result === true) {
        this.loadClassrooms();
      }
    });
  }

  deleteClassroom(classroomId: number): void {
     this.modalService.confirm({
      nzTitle: 'voulez vous supprimer cette classe?',
      nzOkText: 'Oui',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () =>
        this.classroomService.deleteClassroom(classroomId).subscribe({
          next: (response) => {
            this.messageService.success(response.message);
            this.loadClassrooms();
          },
          error: (err) => {
            this.messageService.error('erreur lors de suppression');
          },
        }),
      nzCancelText: 'Non',
      nzOnCancel: () => this.messageService.info('Cancel'),
    });
  }
}
