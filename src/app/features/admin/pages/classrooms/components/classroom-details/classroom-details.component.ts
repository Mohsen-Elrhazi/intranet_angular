import { Component, inject, OnInit, signal } from '@angular/core';
import { NZ_DRAWER_DATA } from 'ng-zorro-antd/drawer';
import { ClassroomResponse } from '../../models/classroom-response.model';
import { CommonModule } from '@angular/common';

import { NzTabsModule } from 'ng-zorro-antd/tabs';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';
import { NzListModule } from 'ng-zorro-antd/list';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzDividerModule } from 'ng-zorro-antd/divider';

@Component({
  selector: 'app-classroom-details',
  imports: [
    CommonModule,
    NzTabsModule,
    NzDescriptionsModule,
    NzListModule,
    NzAvatarModule,
    NzTagModule,
    NzIconModule,
    NzDividerModule
  ],
  templateUrl: './classroom-details.component.html',
  styleUrl: './classroom-details.component.css',
})
export class ClassroomDetailsComponent {
  readonly nzData = inject(NZ_DRAWER_DATA);

  classroom = this.nzData.classroom;


}
