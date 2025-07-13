import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap, map, catchError } from 'rxjs/operators';

import {
  MaestroLoginRequest,
  MaestroSessionResponseMesasage
} from '../../../interfaces/maestro-iauth';

@Injectable({
  providedIn: 'root'
})

export class MaestroAuthService {
  private isLoggedIn = false;
  private baseUrl = 'http://localhost:5000';
  private apiVersion = 'v1';

  constructor(private http: HttpClient) {}

  loginMaestro(data: MaestroLoginRequest): Observable<MaestroSessionResponseMesasage | MaestroSessionResponseMesasage> {
    const url = `${this.baseUrl}/${this.apiVersion}/maestro/login`;
    return this.http.post<MaestroSessionResponseMesasage | MaestroSessionResponseMesasage>(url, data, { withCredentials: true }).pipe(
      tap((response: MaestroSessionResponseMesasage) => {
        if (response.success) {
          this.isLoggedIn = true;
        }
      })
    );
  }

  logoutMaestro(): Observable<MaestroSessionResponseMesasage> {
    const url = `${this.baseUrl}/${this.apiVersion}/maestro/logout`;
    return this.http.post<MaestroSessionResponseMesasage>(url, {}, { withCredentials: true }).pipe(
      tap((response: MaestroSessionResponseMesasage) => {
        if (response.success) {
          this.isLoggedIn = false;
        }
      })
    );
  }

  checkSession(): Observable<boolean> {
    const url = `${this.baseUrl}/${this.apiVersion}/maestro/session`;
    return this.http.get<any>(url, { withCredentials: true }).pipe(
      tap((res) => {
        this.isLoggedIn = res.success && res.authenticated;
      }),
      map(() => this.isLoggedIn),
      catchError(() => {
        this.isLoggedIn = false;
        return of(false);
      })
    );
  }
}