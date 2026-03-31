import { Component, computed, inject, signal } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';

import { LayoutService } from '../../core/services/layout.service';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { AuthService } from '../../core/services/auth.service';
import { MENU_ITEMS, MenuItem } from '../../core/constants/menu-items.constants';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NzDropdownModule } from 'ng-zorro-antd/dropdown';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzModalModule, NzModalService } from 'ng-zorro-antd/modal';
import { UserResponse } from '../../core/models/user-response.model';

@Component({
  selector: 'app-main-layout',
  // imports: [RouterOutlet, HeaderComponent, SidebarComponent, NzLayoutModule, NzBreadCrumbModule, NzIconModule, NzMenuModule],
  imports: [
    NzBreadCrumbModule,
    NzIconModule,
    NzMenuModule,
    NzLayoutModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive,
    NzDropdownModule,
    NzAvatarModule,
    NzModalModule
  ],

  templateUrl: './main-layout.component.html',
  styleUrl: './main-layout.component.css',
})
export class MainLayoutComponent {
  private authService = inject(AuthService);
  private message = inject(NzMessageService);
  private modal = inject(NzModalService);
  private router = inject(Router);

  // userRole = signal(this.authService.getUserRole());

  filteredMenuItems = computed(() => {
    const role = this.authService.getUserRole();
    if (!role) return [];

    return MENU_ITEMS.filter((item) => item.roles.includes(role));
  });

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

  user = signal<UserResponse | null>(null);
  ngOnInit() {
    this.authService.getAuthenticateUser().subscribe({
      next: (response) => {
        this.user.set(response.data);
        console.log('Authenticated user data:', response.data);
      },
      error: (err) => {
        console.error('Failed to fetch user data:', err);
      },
    });
  }
        
}
