import { ApiResponse } from './base';
import { Maestro } from './entities';

export interface UserInfo {
  role: string;
  user_id: string;
}

export interface AdminDashboardStats {
  parciales_activos: number;
  total_alumnos: number;
  total_asignaciones: number;
  total_cursos: number;
  total_grupos: number;
  total_maestros: number;
}

export interface AdminDashboardData {
  estadisticas: AdminDashboardStats;
  user_info: UserInfo;
}

export interface AdminDashboardResponse
  extends ApiResponse<AdminDashboardData> { }

export interface AdminMaestroResponse extends ApiResponse<Maestro> {
  maestros: Maestro[];
}