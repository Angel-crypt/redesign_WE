import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { MaestroAsignacionesResponse } from '../../../interfaces/maestro-interfaces';

@Injectable({
  providedIn: 'root'
})
export class GruposService {
  private baseUrl = 'http://localhost:5000';
  private apiVersion = 'v1';

  constructor(private http: HttpClient) { }

  getAllAsignaciones(): Observable<MaestroAsignacionesResponse> {
    const url = `${this.baseUrl}/${this.apiVersion}/maestro/assignments`;
    return this.http.get<MaestroAsignacionesResponse>(url, { withCredentials: true })
      .pipe(
        catchError((error) => {
          console.error('Error fetching grupos:', error);
          throw error;
        })
      );
  }

  getDetallesGrupo(idGrupo: string): Observable<any> {
    const url = `${this.baseUrl}/${this.apiVersion}/maestro/groups/${idGrupo}/details`;
    return this.http.get<any>(url, { withCredentials: true })
      .pipe(
        catchError((error) => {
          console.error('Error fetching group details:', error);
          throw error;
        })
      );
  }
}
