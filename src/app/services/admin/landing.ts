import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { AdminDashboardResponse } from '../../interfaces/admin-interfaces';

@Injectable({
  providedIn: 'root'
})
export class DashboardAdminService {
  private baseUrl = 'http://localhost:5000';
  private apiVersion = 'v1';

  constructor(private http: HttpClient) { }

  getDashboardData(): Observable<AdminDashboardResponse> {
    const url = `${this.baseUrl}/${this.apiVersion}/admin/dashboard`;
    return this.http.get<AdminDashboardResponse>(url, { withCredentials: true }).pipe(
      catchError(error => {
        console.error('Error fetching dashboard data:', error);
        return of({} as AdminDashboardResponse);
      })
    );
  }
}
