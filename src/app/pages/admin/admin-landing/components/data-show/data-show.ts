import { Component, Input } from '@angular/core';

export interface StatItem {
  key: string;
  value: number;
  label: string;
  color?: string;
}

@Component({
  selector: 'app-data-show',
  standalone: false,
  templateUrl: './data-show.html',
  styleUrl: './data-show.less',
})
export class DataShow {
  @Input() stats: any = {};
  @Input() title: string = 'Estadísticas del Sistema';

  get statItems(): StatItem[] {
    const statsMapping: {
      [key: string]: { label: string; color: string;  };
    } = {
      total_alumnos: {
        label: 'Total Alumnos',
        color: '#4B0082',
      },
      total_cursos: {
        label: 'Total Cursos',
        color: '#0066CC',
      },
      total_grupos: {
        label: 'Total Grupos',
        color: '#28A745',
      },
      total_maestros: {
        label: 'Total Maestros',
        color: '#FD7E14',
      },
      total_asignaciones: {
        label: 'Total Asignaciones',
        color: '#DC3545',
      },
      parciales_activos: {
        label: 'Parciales Activos',
        color: '#17A2B8',
      },
    };

    return Object.keys(this.stats).map((key) => ({
      key,
      value: this.stats[key],
      label: statsMapping[key]?.label || key,
      color: statsMapping[key]?.color || '#4B0082',
    }));
  }
}
