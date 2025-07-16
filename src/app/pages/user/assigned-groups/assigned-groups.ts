import { Component, OnInit } from '@angular/core';
import { GruposService } from '../../../services/maestro/asignaciones/grupos';
import { Asignacion, Grupo } from '../../../interfaces/entities';
import { SSidebar } from '../../../services/general/s-sidebar';

@Component({
  selector: 'app-assigned-groups',
  standalone: false,
  templateUrl: './assigned-groups.html',
  styleUrl: './assigned-groups.less'
})
export class AssignedGroups implements OnInit {
  assignedGroups: Asignacion[] = [];
  loading: boolean = true;
  constructor(private gruposService: GruposService, private sidebarService: SSidebar) {}

  ngOnInit(): void {
    this.sidebarService.setMaestroMenu();
    this.gruposService.getAllAsignaciones().subscribe({
      next: (response) => {
        if (response.success) {
          this.assignedGroups = response.data ?? [];
          this.loading = false;
        }
      },
      error: (err) => {
        console.error('Error fetching assigned groups:', err);
        this.loading = false;
      },
    });
  }
}