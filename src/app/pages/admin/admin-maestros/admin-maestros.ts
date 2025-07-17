import { Component, OnInit } from '@angular/core';
import { SSidebar } from '../../../services/general/s-sidebar';
import { AdminMaestrosService } from '../../../services/admin/maestros/s-maestros';
import { Maestro } from '../../../interfaces/entities';

@Component({
  selector: 'app-admin-maestros',
  standalone: false,
  templateUrl: './admin-maestros.html',
  styleUrl: './admin-maestros.less',
})
export class AdminMaestros implements OnInit {
  maestros: Maestro[] = [];
  loading: boolean = true;
  error: string | null = null;

  constructor(
    private sidebarService: SSidebar,
    private maestrosService: AdminMaestrosService
  ) {}

  ngOnInit(): void {
    this.sidebarService.setAdminMenu();
    this.loadMaestros();
  }

  loadMaestros(): void {
    this.maestrosService.getAllMaestros().subscribe({
      next: (res) => {
        if (res.success && res.data) {
          this.maestros = res.data;
          console.log('Maestros loaded:', this.maestros);
        } else {
          this.error = 'No se pudieron cargar los maestros';
        }
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Ocurrió un error al consultar los maestros';
        this.loading = false;
        console.error(err);
      },
    });
  }
}