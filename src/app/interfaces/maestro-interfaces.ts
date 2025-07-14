import { ApiResponse } from './base';
import {
  Maestro,
  Asignacion,
  Disponibilidad,
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
