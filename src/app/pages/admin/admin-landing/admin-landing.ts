import { Component, OnInit } from '@angular/core';
import { SSidebar } from '../../../services/general/s-sidebar';
import { DashboardAdminService } from '../../../services/admin/landing';
import { AdminDashboardStats } from '../../../interfaces/admin-interfaces';

@Component({
  selector: 'app-admin-landing',
  standalone: false,
  templateUrl: './admin-landing.html',
  styleUrl: './admin-landing.less'
})
export class AdminLanding implements OnInit {
  adminStats: AdminDashboardStats | null = null;
  loading: boolean = true;
  error: string | null = null;

  constructor(private sidebarService: SSidebar, private dashboardService: DashboardAdminService) {
  }

  ngOnInit(): void {
    this.sidebarService.setAdminMenu();
    this.dashboardService.getDashboardData().subscribe({
      next: (res) => {
        if (res.success && res.data) {
          this.adminStats = res.data.estadisticas;
          console.log('Admin Stats:', this.adminStats);
        } else {
          this.error = 'No se pudieron cargar las estadísticas';
        }
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Ocurrió un error al consultar el dashboard';
        this.loading = false;
        console.error(err);
      },
    });
  }
}
