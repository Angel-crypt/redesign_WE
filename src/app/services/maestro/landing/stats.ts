import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { MaestroDashboardResponse } from '../../../interfaces/maestro-interfaces';

@Injectable({
  providedIn: 'root',
})
export class Stats {
  private baseUrl = 'http://localhost:5000';
  private apiVersion = 'v1';

  constructor(private http: HttpClient) {}

  getLandingData(): Observable<MaestroDashboardResponse> {
    const url = `${this.baseUrl}/${this.apiVersion}/maestro/dashboard`;
    return this.http
      .get<MaestroDashboardResponse>(url, { withCredentials: true })
      .pipe(
        catchError((error) => {
          console.error('Error fetching landing data:', error);
          return of({} as MaestroDashboardResponse);
        })
      );
  }
}
