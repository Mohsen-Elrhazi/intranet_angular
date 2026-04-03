import { Component, OnInit, computed, inject, signal } from '@angular/core';
import { CommonModule, Location } from '@angular/common';
import { ActivatedRoute } from '@angular/router';

import { CourseService } from '../../../services/course.service';
import { CourseResponse } from '../../models/course-response.model';

import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzPageHeaderModule } from 'ng-zorro-antd/page-header';
import { NzButtonModule } from 'ng-zorro-antd/button';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzTagModule } from 'ng-zorro-antd/tag';
import { NzCardModule } from 'ng-zorro-antd/card';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzBadgeModule } from 'ng-zorro-antd/badge';
import { NzGridModule } from 'ng-zorro-antd/grid';
import { NzSpinModule } from 'ng-zorro-antd/spin';
import { NzAlertModule } from 'ng-zorro-antd/alert';
import { NzTimelineModule } from 'ng-zorro-antd/timeline';
import { NzStatisticModule } from 'ng-zorro-antd/statistic';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-course-details',
  imports: [
    CommonModule,
    NzLayoutModule,
    NzPageHeaderModule,
    NzButtonModule,
    NzIconModule,
    NzTagModule,
    NzCardModule,
    NzDescriptionsModule,
    NzAvatarModule,
    NzDividerModule,
    NzBadgeModule,
    NzGridModule,
    NzSpinModule,
    NzAlertModule,
    NzTimelineModule,
    NzStatisticModule,
    NzCollapseModule,
  ],
  templateUrl: './course-details.component.html',
  styleUrl: './course-details.component.css',
})
export class CourseDetailsComponent {
  private route = inject(ActivatedRoute);
  private courseService = inject(CourseService);
  isLoading = signal(false);
  course= signal<CourseResponse | null>(null);

  ngOnInit(): void {
  const id = this.route.snapshot.paramMap.get('id');
  if (id) {
    this.isLoading.set(true);
    this.courseService.getCourseById(+id).subscribe({
      next: (res) => {
        this.course.set(res.data);
        this.isLoading.set(false);
        // console.log('Détails du cours :', res.data);
      },
      error: () => this.isLoading.set(false)
    });
  }
}

onBack(){
  window.history.back();
  }

  private sanitizer = inject(DomSanitizer);
  
  safeFileUrl = computed(() => {
    const url = this.course()?.fileUrl;
    return url ? this.sanitizer.bypassSecurityTrustResourceUrl(url) : null;
  });

}
 