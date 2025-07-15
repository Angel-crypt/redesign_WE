import { ApiResponse } from './base';
import {
  Maestro,
  Asignacion,
  Disponibilidad,
  Grupo,
  Curso,
} from './entities';

export interface MaestroEstadisticas {
  total_disponibilidad: number;
  total_asignaciones: number;
  disponibilidad: Disponibilidad[];
  asignaciones: Asignacion[];
  maestro: Maestro;
}

export interface MaestroDashboardResponse
  extends ApiResponse<MaestroEstadisticas> {}

export interface MaestroProfileResponse
  extends ApiResponse<Maestro> { }

export interface MaestroDisponibilidadResponse
  extends ApiResponse<Disponibilidad[]> { }

export interface MaestroAsignacionesResponse
  extends ApiResponse<Asignacion[]> { }