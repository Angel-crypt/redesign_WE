import { Component, OnInit, OnDestroy, ChangeDetectorRef } from '@angular/core';
import { SSidebar, MenuItem } from '../../services/general/s-sidebar';
import { Subscription } from 'rxjs';
import { Router } from '@angular/router';
import { MaestroAuthService } from '../../services/maestro/auth/s-auth';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.html',
  standalone: false,
  styleUrls: ['./sidebar.less'],
})
export class Sidebar implements OnInit, OnDestroy {
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
    private authService: MaestroAuthService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.sidebarService.initializeMaestroMenuIfNeeded();

    this.menuSubscription = this.sidebarService.getMenu().subscribe((menu) => {
      this.menuItems = menu;
      this.cdr.detectChanges();
    });
  }

  ngOnDestroy(): void {
    this.menuSubscription?.unsubscribe();
  }

  handleMenuItem(item: MenuItem): void {
    if (item.action === 'logout') {
      this.authService.logoutMaestro().subscribe({
        next: () => this.router.navigate(['/login']),
        error: (err) => console.error('Logout failed:', err),
      });
    } else if (item.route) {
      this.router.navigate([item.route]);
    }
  }
}
