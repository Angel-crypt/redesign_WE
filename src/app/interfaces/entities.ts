import { ID, ISODateString, Gender, dia_semana} from './base';

export interface BaseEntity {
  id_usuario: ID;
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
  especialidad: string;
}

export interface Estudiante extends Usuario {
  sexo: Gender;
}

export interface Curso extends BaseEntity {
  codigo: string;
  nombre: string;
  descripcion?: string;
}

export interface Grupo extends BaseEntity {
  nombre: string;
  facultad?: string;
  generacion?: string;
}

export interface Horario {
  dia_semana: dia_semana;
  hora_inicio: string; // Podría ser Time type
  hora_fin: string;
  id?: ID;
}

export interface Disponibilidad extends Horario {
  id: ID;
  maestroId: ID;
}

export interface Asignacion extends BaseEntity {
  curso: Curso;
  grupo: Grupo;
  horarios: Horario[];
  planeacionPdfUrl?: string;
  tienePlaneacion: boolean;
  totalEstudiantes: number;
}