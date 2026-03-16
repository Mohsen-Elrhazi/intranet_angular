import { Component, inject } from '@angular/core';
import { LayoutService } from '../../core/services/layout.service';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalModule, NzModalService } from 'ng-zorro-antd/modal';

import { AuthService } from '../../core/services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-header',
  imports: [NzIconModule, NzDropDownModule, NzMenuModule, NzAvatarModule, NzModalModule],
  templateUrl: './header.component.html',
  styleUrl: './header.component.css',
})
export class HeaderComponent {
  private authService = inject(AuthService);

  layoutService = inject(LayoutService);
  private message = inject(NzMessageService);
  private modal = inject(NzModalService);
  private router = inject(Router);

  logout() {
    this.modal.confirm({
      nzTitle: 'Are you sure you want to logout?',
      nzOkText: 'Yes',
      nzOkType: 'primary',
      nzOkDanger: true,
      nzOnOk: () =>
        this.authService.logout().subscribe({
          next: (response) => {
            this.message.success(response.message || 'Logout successful');
            this.router.navigate(['/login']);
          },
          error: (err) => {
            console.error('Logout failed:', err);
            this.message.error('Logout failed');
          },
        }),
      nzCancelText: 'No',
      nzOnCancel: () => this.message.info('Cancel'),
    });
  }
}
