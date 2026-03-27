import { Component, inject, OnInit, signal } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzModalModule, NzModalService } from 'ng-zorro-antd/modal';
import { DepartmentFormComponent } from './components/department-form/department-form.component';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzDrawerModule, NzDrawerService } from 'ng-zorro-antd/drawer';
import { DepartmentResponse } from './models/department-response.model';
import { DepartmentService } from './services/department.service';
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

@Component({
  selector: 'app-departments',
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
  templateUrl: './departments.component.html',
  styleUrl: './departments.component.css',
})
export class DepartmentsComponent implements OnInit {
  private departmentService = inject(DepartmentService);

  private modalService = inject(NzModalService);
  private messageService = inject(NzMessageService);
  private drawerService = inject(NzDrawerService);

  showCreateModal(): void {
    const modal = this.modalService.create({
      nzTitle: 'Ajouter un departement',
      nzContent: DepartmentFormComponent,
      nzFooter: null,
      nzBodyStyle: { padding: '0' },
    });

    modal.afterClose.subscribe((result) => {
      if (result === true) {
        this.loadDepartments();
      }
    });
  }

  departments = signal<DepartmentResponse[]>([]);
  totalElements = signal(0);
  pageIndex = 1;
  pageSize = 12;
  name: string = '';
  loading = signal(false);

  ngOnInit() {
    this.loadDepartments();
  }

  loadDepartments() {
    this.loading.set(true);
    this.departmentService
      .findAllDepartments(this.pageIndex - 1, this.pageSize, this.name)
      .subscribe({
        next: (response) => {
          this.departments.set(response.data.content);
          this.totalElements.set(response.data.totalElements);
          this.loading.set(false);
        },
        error: () => this.loading.set(false),
      });
  }

  onPageIndexChange(index: number) {
    this.pageIndex = index;
    this.loadDepartments();
  }

  onPageSizeChange(size: number): void {
    this.pageSize = size;
    this.pageIndex = 1;
    this.loadDepartments();
  }

  onSearch(): void {
    this.pageIndex = 1;
    this.loadDepartments();
  }

  // réinitialiser les filtres
  resetFilters(): void {
    this.name = '';
    this.pageIndex = 1;
    this.loadDepartments();
  }

  showEditModal(department: DepartmentResponse): void {}

  deleteDepartment(id: number): void {
    this.modalService.confirm({
      nzTitle: 'voulez vous supprimer ce département?',
      nzOkText: 'Oui',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () =>
        this.departmentService.deleteDepartement(id).subscribe({
          next: (response) => {
            this.messageService.success(response.message);
            this.loadDepartments();
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
