// src/app/components/sidebar/sidebar.ts
import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { SSidebar, MenuItem } from '../../services/general/s-sidebar';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { MaestroAuthService } from '../../services/maestro/auth/s-auth';

@Component({
  selector: 'app-sidebar',
  standalone: false,
  templateUrl: './sidebar.html',
  styleUrls: ['./sidebar.less'],
})
export class Sidebar implements OnInit, OnDestroy {
  @Input() customMenu?: MenuItem[];
  menuItems: MenuItem[] = [];
  logoutItem: MenuItem = {
    title: 'Cerrar Sesión',
    icon: 'logout',
    action: 'logout',
  };
  private menuSubscription?: Subscription;

  constructor(
    private sidebarService: SSidebar,
    private router: Router,
    private authService: MaestroAuthService
  ) {}

  ngOnInit(): void {
    if (this.customMenu) {
      this.menuItems = this.customMenu;
    } else {
      this.menuSubscription = this.sidebarService
        .getMenu()
        .subscribe((menu) => {
          this.menuItems = menu;
          console.log('Sidebar initialized with menu items:', this.menuItems);
        });
    }
  }

  ngOnDestroy(): void {
    this.menuSubscription?.unsubscribe();
  }

  handleMenuItem(item: MenuItem): void {
    if (item.action === 'logout') {
      this.authService.logoutMaestro().subscribe({
        next: () => {
          this.router.navigate(['/login']);
        },
        error: (err) => {
          console.error('Logout failed:', err);
        },
      });
    } else if (item.route) {
      this.router.navigate([item.route]);
    }
  }
}
