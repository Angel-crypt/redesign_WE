import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  MaestroLoginRequest,
  MaestroSessionResponseMesasage
} from '../../../interfaces/maestro-iauth';


@Injectable({
  providedIn: 'root'
})
export class MaestroAuthService {
  private baseUrl = 'http://localhost:5000';
  private apiVersion = 'v1';

  constructor(private http: HttpClient) {}

  loginMaestro(data: MaestroLoginRequest): Observable<MaestroSessionResponseMesasage | MaestroSessionResponseMesasage> {
    const url = `${this.baseUrl}/${this.apiVersion}/maestro/login`;
    return this.http.post<MaestroSessionResponseMesasage | MaestroSessionResponseMesasage>(url, data);
  }

  logoutMaestro(): Observable<MaestroSessionResponseMesasage> {
    const url = `${this.baseUrl}/${this.apiVersion}/maestro/logout`;
    return this.http.post<MaestroSessionResponseMesasage>(url, {});
  }
}