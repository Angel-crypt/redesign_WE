import { ApiResponse, PaginatedResponse, ID } from './base';
import {
  Horario,
  Estudiante,
  Asignacion,
} from './entities';

export interface GrupoDetalle {
  asignacion: Asignacion;
  estudiantes: Estudiante[];
  horarios: Horario[];
  totalEstudiantes: number;
  totalHorarios: number;
}

export type AsignacionesResponse = PaginatedResponse<Asignacion>;
export type GrupoDetalleResponse = ApiResponse<GrupoDetalle>;
export type GruposAsignadosResponse = PaginatedResponse<Asignacion>;