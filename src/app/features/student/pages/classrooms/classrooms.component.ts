import { Component, inject, signal } from '@angular/core';
import { ClassroomService } from '../../../admin/pages/classrooms/services/classroom.service';
import { ClassroomResponse } from '../../../admin/pages/classrooms/models/classroom-response.model';
import { ClassroomDetailsComponent } from '../../../admin/pages/classrooms/components/classroom-details/classroom-details.component';

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
import { NzEmptyModule } from 'ng-zorro-antd/empty';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzBadgeModule } from 'ng-zorro-antd/badge';

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
  private classroomService = inject(ClassroomService);

      private drawerService = inject(NzDrawerService);


  classrooms = signal<ClassroomResponse[]>([]);

  loadClassrooms() {
    this.classroomService.getStudentClassrooms().subscribe({
      next: (response) => {
        this.classrooms.set(response.data);
        console.log("classrooms", this.classrooms());
      },
      error: () => {
        console.log('Failed to load classrooms');
      },
    });
  }

  ngOnInit() {
    this.loadClassrooms();
  }

   viewDetails(classroom: ClassroomResponse){
       const drawer = this.drawerService.create({
            nzTitle: "Détails de la class",
            nzContent: ClassroomDetailsComponent,
            nzWidth: 600,
            nzBodyStyle: { padding: '0' },
            nzData: { classroom : classroom },
          });
    }
}
