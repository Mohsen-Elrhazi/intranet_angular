import { Component, inject } from '@angular/core';
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


  showCreateModal(): void {
      const modal = this.modalService.create({
        nzTitle: 'Ajouter un programme',
        nzContent: ClassroomFormComponent,
        nzFooter: null,
        nzBodyStyle: { padding: '0' },
      });
  
        // modal.afterClose.subscribe((result) => {
        //   if (result === true) {
        //     this.loadPrograms();
        //   }
        // });
    }

}
