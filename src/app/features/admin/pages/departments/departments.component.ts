import { Component, inject } from '@angular/core';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzModalModule, NzModalService } from 'ng-zorro-antd/modal';
import { DepartmentFormComponent } from './components/department-form/department-form.component';

@Component({
  selector: 'app-departments',
  imports: [DepartmentFormComponent,NzButtonModule, NzModalModule, NzIconModule],
  templateUrl: './departments.component.html',
  styleUrl: './departments.component.css',
})
export class DepartmentsComponent {
  private modalService = inject(NzModalService);

  showModal(): void {
    this.modalService.create({
      nzTitle: 'Ajouter un departement',
      nzContent: DepartmentFormComponent,
      nzFooter: null,
      nzBodyStyle: { padding: '0' },
    });
  }
}
