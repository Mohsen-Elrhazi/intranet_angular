import { Component, inject, model, OnInit, signal } from '@angular/core';
import { TeacherService } from './services/teacher.service';
import { TeacherFormComponent } from './components/teacher-form/teacher-form.component';
import { NzModalService } from 'ng-zorro-antd/modal';

import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzModalModule } from 'ng-zorro-antd/modal';
import { NzIconModule } from 'ng-zorro-antd/icon';

@Component({
  selector: 'app-teachers',
  imports: [TeacherFormComponent, NzButtonModule, NzModalModule, NzIconModule],
  templateUrl: './teachers.component.html',
  styleUrl: './teachers.component.css',
})
export class TeachersComponent implements OnInit {
  private teacherService = inject(TeacherService);
  private modalService = inject(NzModalService);

  // teachers = signal<Teacher[]>([]);

  ngOnInit(): void {
    this.getAllTeachers();
  }

  getAllTeachers() {
    // this.teacherService.getAllTeachers().subscribe({
    //   next: (response) => {
    //     this.teachers.set(response.data);
    //     console.log('Teachers fetched successfully:', response.data);
    //   },
    //   error: (err) => {
    //     console.error('Error fetching teachers:', err);
    //   },
    // });
  }

  showModal(): void {
    this.modalService.create({
      nzTitle: 'Ajouter un enseignant',
      nzContent: TeacherFormComponent,
      nzFooter: null, // Utilise les boutons du composant de formulaire
      nzBodyStyle: { padding: '0' }, // C'est ici le secret ! On met le padding de la modale à 0
    });
  }
}
