import { Component, inject, OnInit, signal } from '@angular/core';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalModule, NzModalService } from 'ng-zorro-antd/modal';
import { SubjectFormComponent } from './components/subject-form/subject-form.component';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzTableModule } from 'ng-zorro-antd/table';
import { FormsModule } from '@angular/forms';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzTooltipDirective, NzTooltipModule } from 'ng-zorro-antd/tooltip';
import { NzPaginationModule } from 'ng-zorro-antd/pagination';
import { NzDrawerModule } from 'ng-zorro-antd/drawer';
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { SubjectService } from './services/subject.service';
import { SubjectResponse } from './models/subject-response.model';

@Component({
  selector: 'app-subjects',
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
  templateUrl: './subjects.component.html',
  styleUrl: './subjects.component.css',
})
export class SubjectsComponent implements OnInit {

  private modalService = inject(NzModalService);
  private messageService = inject(NzMessageService);
  private subjectService = inject(SubjectService);

  loading = signal(false);

    ngOnInit(): void {
    this.loadSubjects();
  }

  showCreateModal(): void {
    const modal = this.modalService.create({
      nzTitle: 'Ajouter un matiere',
      nzContent: SubjectFormComponent,
      nzFooter: null,
      nzBodyStyle: { padding: '0' },
    });

    modal.afterClose.subscribe((result) => {
      if (result === true) {
        this.loadSubjects();
      }
    });
  }

  subjects = signal<SubjectResponse[]>([]);

  loadSubjects() {
    this.loading.set(true);
    this.subjectService.getAllSubjectList().subscribe({
      next: (response) => {
        this.subjects.set(response.data);
        this.loading.set(false);
      },
      error: () => this.loading.set(false),
    });
  }

  deleteSubject(id: number): void {
    this.modalService.confirm({
      nzTitle: 'voulez vous supprimer cette matière?',
      nzOkText: 'Oui',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () =>
        this.subjectService.deleteSubject(id).subscribe({
          next: (response) => {
            this.messageService.success(response.message);
            this.loadSubjects();
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
