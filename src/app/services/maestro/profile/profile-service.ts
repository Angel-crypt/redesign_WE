import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { map, catchError } from 'rxjs/operators';

import { MaestroProfileResponse } from '../../../interfaces/maestro-interfaces';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private baseUrl = 'http://localhost:5000';
  private apiVersion = 'v1';
  constructor(private http: HttpClient) { }

  getPerfilData(): Observable<MaestroProfileResponse> {
    const url = `${this.baseUrl}/${this.apiVersion}/maestro/profile`;
    return this.http.get<MaestroProfileResponse>(url, { withCredentials: true }).pipe(
      catchError((error) => {
        console.error('Error fetching profile data:', error);
        return of({} as MaestroProfileResponse);
      })
    );
  }
}
