import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap, map, catchError } from 'rxjs/operators';

import { LoginRequest, SessionResponse } from '../../interfaces/auth';

@Injectable({
  providedIn: 'root',
})
export class AdminAuthService {
  private isLoggedIn = false;
  private baseUrl = 'http://localhost:5000';
  private apiVersion = 'v1';

  constructor(private http: HttpClient) { }
  
  loginAdmin(data: LoginRequest): Observable<SessionResponse> {
    const url = `${this.baseUrl}/${this.apiVersion}/admin/login`;
    return this.http.post<SessionResponse>(url, data, { withCredentials: true }).pipe(
      tap((response: SessionResponse) => {
        if (response.success) {
          this.isLoggedIn = true;
        }
      })
    );
  }

  logoutAdmin(): Observable<any> {
    const url = `${this.baseUrl}/${this.apiVersion}/admin/logout`;
    return this.http.post(url, {}, { withCredentials: true }).pipe(
      tap(() => {
        this.isLoggedIn = false;
      })
    );
  }

  checkSession(): Observable<boolean> {
    const url = `${this.baseUrl}/${this.apiVersion}/admin/session`;
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
