export interface ApiResponse<T = any> {
  success?: boolean;
  message?: string;
  total?: number;
  data?: T;
}

export interface PaginatedResponse<T = any> extends ApiResponse<T[]> {
  totalItems?: number;
  currentPage?: number;
  limit?: number;
}

export type ID = string | number;

export enum dia_semana{
  LUNES = 'lunes',
  MARTES = 'martes',
  MIERCOLES = 'miercoles',
  JUEVES = 'jueves',
  VIERNES = 'viernes',
  SABADO = 'sabado',
  DOMINGO = 'domingo',
}

export enum Gender {
  MASCULINO = 'M',
  FEMENINO = 'F',
}
export type ISODateString = string & { readonly __brand: unique symbol };
export type EmailAddress = string & { readonly __brand: unique symbol };
export type CourseCode = string & { readonly __brand: unique symbol };
