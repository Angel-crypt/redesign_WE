import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { AdminMaestroResponse } from '../../../interfaces/admin-interfaces';

@Injectable({
  providedIn: 'root'
})
export class SMaestros {
  private baseUrl = 'http://localhost:5000';
  private apiVersion = 'v1';

  constructor(private http: HttpClient) { }

  getAllMaestros(): Observable<AdminMaestroResponse> {
    const url = `${this.baseUrl}/${this.apiVersion}/admin/maestros`;
    return this.http.get<AdminMaestroResponse>(url, { withCredentials: true }).pipe(
      catchError(error => {
        console.error('Error fetching maestros:', error);
        return of({} as AdminMaestroResponse);
      })
    );
  }
}