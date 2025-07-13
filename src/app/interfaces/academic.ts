// maestro-dashboard.ts

import { ApiResponse, PaginatedResponse, ID } from './base';
import {
  Curso,
  Grupo,
  Horario,
  Estudiante,
  Maestro,
  Asignacion,
  Disponibilidad,
} from './entities';

export interface GrupoDetalle {
  asignacion: Asignacion;
  estudiantes: Estudiante[];
  horarios: Horario[];
  totalEstudiantes: number;
  totalHorarios: number;
}

export interface MaestroEstadisticas {
  total_disponibilidad: number;
  total_asignaciones: number;
  disponibilidad: Disponibilidad[];
  asignaciones: Asignacion[];
  maestro: Maestro;
}

export interface MaestroDashboardResponse
  extends ApiResponse<MaestroEstadisticas> {}

export type AsignacionesResponse = PaginatedResponse<Asignacion>;
export type GrupoDetalleResponse = ApiResponse<GrupoDetalle>;
export type GruposAsignadosResponse = PaginatedResponse<Asignacion>;