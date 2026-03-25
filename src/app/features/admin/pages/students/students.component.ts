import { Component, inject } from '@angular/core';
import { NzModalModule, NzModalService } from 'ng-zorro-antd/modal';
import { StudentFormComponent } from './components/student-form/student-form.component';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzButtonModule } from 'ng-zorro-antd/button';

@Component({
  selector: 'app-students',
  imports: [StudentFormComponent, NzButtonModule, NzModalModule, NzIconModule],
  templateUrl: './students.component.html',
  styleUrl: './students.component.css',
})
export class StudentsComponent {
  private modalService = inject(NzModalService);

  showModal(): void {
    this.modalService.create({
      nzTitle: 'Ajouter un étudiant',
      nzContent: StudentFormComponent,
      nzFooter: null, 
      nzWidth: 750, //en px
      nzBodyStyle: { padding: '0' }, 
    });
  }
}
