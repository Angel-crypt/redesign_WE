import { ApiResponse, ISODateString } from './base';

export interface LoginRequest {
  usuario: string;
  contrasena: string;
}

export interface SessionResponse extends ApiResponse {
  token?: string;
  expiresAt?: ISODateString;
}
