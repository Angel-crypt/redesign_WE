// Interfaz para el objeto "curso"
export interface Curso {
  codigo: string;
  nombre: string;
}

// Interfaz para el objeto "grupo"
export interface Grupo {
  nombre_grupo: string;
}

// Interfaz para cada asignación
export interface Asignacion {
  curso: Curso;
  grupo: Grupo;
  id_asignacion: number;
}

// Interfaz para cada disponibilidad
export interface Disponibilidad {
  dia_semana: string;
  hora_fin: string;
  hora_inicio: string;
  id_disponibilidad: number;
  id_maestro: string;
}

// Interfaz para el objeto "maestro"
export interface Maestro {
  apellido_materno: string;
  apellido_paterno: string;
  especialidad: string;
  fecha_nacimiento: string;
  id_usuario: string;
  nombre: string;
}

// Interfaz para el objeto "data"
export interface MaestroDashboardData {
  asignaciones: Asignacion[];
  disponibilidad: Disponibilidad[];
  maestro: Maestro;
  total_asignaciones: number;
  total_disponibilidad: number;
}

// Interfaz para la respuesta completa de la API
export interface MaestroDashboardResponse {
  data: MaestroDashboardData;
  success: boolean;
}