import { Component, OnInit } from '@angular/core';
import { Stats } from '../../../services/maestro/landing/stats';
import { SSidebar, MenuItem } from '../../../services/general/s-sidebar';
import { MaestroDashboardData } from '../../../interfaces/maestro-dashboard';

@Component({
  selector: 'app-landing',
  standalone: false,
  templateUrl: './landing.html',
  styleUrls: ['./landing.less'],
})
export class Landing implements OnInit {
  maestroData: MaestroDashboardData | null = null;
  loading: boolean = true;
  error: string | null = null;

  constructor(private statsService: Stats, private sidebarService: SSidebar) {}

  ngOnInit(): void {
    const customMenu: MenuItem[] = [
      { title: 'Inicio', icon: 'home', route: '/principal' },
      { title: 'Mi Perfil', icon: 'person', route: '/perfil' },
      { title: 'Mis Grupos', icon: 'group', route: '/groups' },
    ];
    this.sidebarService.setMenu(customMenu);

    this.statsService.getLandingData().subscribe({
      next: (res) => {
        if (res.success) {
          this.maestroData = res.data;
        } else {
          this.error = 'No se pudieron cargar los datos';
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
