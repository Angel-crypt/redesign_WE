import { ID, ISODateString, Gender, dia_semana} from './base';

export interface BaseEntity {
  createdAt?: ISODateString;
  updatedAt?: ISODateString;
}

export interface Usuario extends BaseEntity {
  nombre: string;
  apellido_paterno: string;
  apellido_materno: string;
  fecha_nacimiento?: ISODateString;
}

export interface Maestro extends Usuario {
  id_maestro?: ID;
  especialidad: string;
}

export interface Estudiante extends Usuario {
  id_alumno: ID;
  sexo: Gender;
}

export interface Curso extends BaseEntity {
  id_curso: ID;
  codigo: string;
  nombre: string;
  descripcion?: string;
}

export interface Grupo extends BaseEntity {
  id_grupo: ID;
  nombre: string;
  facultad?: string;
  generacion?: string;
}

export interface Horario {
  dia_semana: dia_semana;
  hora_inicio: string;
  hora_fin: string;
  id?: ID;
}

export interface Disponibilidad extends Horario {
  id_disponibilidad?: ID;
  maestroId?: ID;
}

export interface Asignacion extends BaseEntity {
  id_asignacion: ID;
  curso: Curso;
  grupo: Grupo;
  horarios?: Horario[];
  planeacionPdfUrl?: string;
  tienePlaneacion: boolean;
  totalEstudiantes: number;
}