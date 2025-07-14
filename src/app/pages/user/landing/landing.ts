import { Component, OnInit } from '@angular/core';
import { Stats } from '../../../services/maestro/landing/stats';
import { SSidebar } from '../../../services/general/s-sidebar';
import { MaestroEstadisticas } from '../../../interfaces/maestro-interfaces';

@Component({
  selector: 'app-landing',
  standalone: false,
  templateUrl: './landing.html',
  styleUrls: ['./landing.less'],
})
export class Landing implements OnInit {
  maestroData: MaestroEstadisticas | null = null;
  loading: boolean = true;
  error: string | null = null;

  constructor(private statsService: Stats, private sidebarService: SSidebar) {}

  ngOnInit(): void {
    this.sidebarService.setMaestroMenu();
    this.statsService.getLandingData().subscribe({
      next: (res) => {
        if (res.success) {
          this.maestroData = res.data!;
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