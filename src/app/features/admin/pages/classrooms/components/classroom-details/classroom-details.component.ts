import { Component, inject, OnInit, signal } from '@angular/core';
import { NZ_DRAWER_DATA } from 'ng-zorro-antd/drawer';
import { ClassroomResponse } from '../../models/classroom-response.model';

@Component({
  selector: 'app-classroom-details',
  imports: [],
  templateUrl: './classroom-details.component.html',
  styleUrl: './classroom-details.component.css',
})
export class ClassroomDetailsComponent {
  readonly nzData = inject(NZ_DRAWER_DATA);

  classroom = this.nzData.classroom;


}
