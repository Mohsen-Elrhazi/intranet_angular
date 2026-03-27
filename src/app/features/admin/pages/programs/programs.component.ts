import { Component, inject, signal } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzModalModule, NzModalService } from 'ng-zorro-antd/modal';
import { NzMessageService } from 'ng-zorro-antd/message';
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
import { ProgramFormComponent } from './components/program-form/program-form.component';
import { ProgramResponse } from './models/program-response.model';
import { ProgramService } from './services/program.service';

@Component({
  selector: 'app-programs',
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
  templateUrl: './programs.component.html',
  styleUrl: './programs.component.css',
})
export class ProgramsComponent {
  private modalService = inject(NzModalService);
  private messageService = inject(NzMessageService);
  private drawerService = inject(NzDrawerService);
  private programService = inject(ProgramService);

  programs = signal<ProgramResponse[]>([]);
  totalElements = signal(0);
  pageIndex = 1;
  pageSize = 12;
  name: string = '';
  loading = signal(false);

  ngOnInit() {
    this.loadPrograms();
  }

  loadPrograms() {
    this.loading.set(true);
    this.programService.getAllPrograms(this.pageIndex - 1, this.pageSize, this.name).subscribe({
      next: (response) => {
        this.programs.set(response.data.content);
        this.totalElements.set(response.data.totalElements);
        this.loading.set(false);
        // console.log(response.data.content);
      },
      error: () => this.loading.set(false),
    });
  }

  onPageIndexChange(index: number) {
    this.pageIndex = index;
    this.loadPrograms();
  }

  onPageSizeChange(size: number): void {
    this.pageSize = size;
    this.pageIndex = 1;
    this.loadPrograms();
  }

  onSearch(): void {
    this.pageIndex = 1;
    this.loadPrograms();
  }

  // réinitialiser les filtres
  resetFilters(): void {
    this.name = '';
    this.pageIndex = 1;
    this.loadPrograms();
  }

  deleteProgram(id: number): void {
    this.modalService.confirm({
      nzTitle: 'voulez vous supprimer ce programme?',
      nzOkText: 'Oui',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () =>
        this.programService.deleteProgram(id).subscribe({
          next: (response) => {
            this.messageService.success(response.message);
            this.loadPrograms();
          },
          error: (err) => {
            this.messageService.error('erreur lors de suppression');
          },
        }),
      nzCancelText: 'Non',
      nzOnCancel: () => this.messageService.info('Cancel'),
    });
  }

  showCreateModal(): void {
    const modal = this.modalService.create({
      nzTitle: 'Ajouter un programme',
      nzContent: ProgramFormComponent,
      nzFooter: null,
      nzBodyStyle: { padding: '0' },
    });

    modal.afterClose.subscribe((result) => {
      if (result === true) {
        this.loadPrograms();
      }
    });
  }

  showEditModal(program: ProgramResponse): void {
    const modal = this.modalService.create({
      nzTitle: 'Modifier programme',
      nzContent: ProgramFormComponent,
      nzFooter: null,
      nzBodyStyle: { padding: '0' },
      nzData: { program: program },
    });

    modal.afterClose.subscribe((result) => {
      if (result === true) {
        this.loadPrograms();
      }
    });
  }
}
