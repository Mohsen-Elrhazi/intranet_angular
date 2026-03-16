import { Component, computed, inject, signal } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { MENU_ITEMS } from '../../core/constants/menu-items.constants';
import { CommonModule } from '@angular/common';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { NzMenuModule } from 'ng-zorro-antd/menu';
import { NzIconModule } from 'ng-zorro-antd/icon';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';


import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { NzLayoutModule } from 'ng-zorro-antd/layout';
import { NzDropdownModule } from 'ng-zorro-antd/dropdown';
import { LayoutService } from '../../core/services/layout.service';


//
@Component({
  selector: 'app-sidebar',
  imports: [NzMenuModule, NzIconModule, CommonModule, RouterLink, RouterLinkActive, NzAvatarModule, NzDropdownModule], 
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.css',
})
export class SidebarComponent {
  isCollapsed = false;
  private authService = inject(AuthService);

  layoutService = inject(LayoutService);

  userRole = signal(this.authService.getUserRole());

  filteredMenu = computed(() => {
    const role = this.userRole();
    return MENU_ITEMS.filter((item) => item.roles.includes(role!));
  });
}
