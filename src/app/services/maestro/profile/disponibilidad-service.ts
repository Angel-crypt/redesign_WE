import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Disponibilidad } from '../../../interfaces/entities';
import { MaestroDisponibilidadResponse } from '../../../interfaces/maestro-interfaces';

@Injectable({
  providedIn: 'root',
})
export class DisponibilidadService {
  private baseUrl = 'http://localhost:5000';
  private apiVersion = 'v1';

  constructor(private http: HttpClient) {}

  getDisponibilidad(): Observable<MaestroDisponibilidadResponse> {
    const url = `${this.baseUrl}/${this.apiVersion}/maestro/availability`;
    return this.http
      .get<MaestroDisponibilidadResponse>(url, { withCredentials: true })
      .pipe(
        catchError((error) => {
          console.error('Error fetching disponibilidad:', error);
          return of({} as MaestroDisponibilidadResponse);
        })
      );
  }

  updateDisponibilidad(
    data: Disponibilidad
  ): Observable<MaestroDisponibilidadResponse> {
    const url = `${this.baseUrl}/${this.apiVersion}/maestro/availability`;
    return this.http
      .put<MaestroDisponibilidadResponse>(url, data, { withCredentials: true })
      .pipe(
        catchError((error) => {
          return throwError(() => error);
        })
      );
  }

  createDisponibilidad(
    data: Disponibilidad
  ): Observable<MaestroDisponibilidadResponse> {
    const url = `${this.baseUrl}/${this.apiVersion}/maestro/availability`;
    return this.http
      .post<MaestroDisponibilidadResponse>(url, data, { withCredentials: true })
      .pipe(
        catchError((error) => {
          return throwError(() => error);
        })
      );
  }

  deleteDisponibilidad(id: number): Observable<MaestroDisponibilidadResponse> {
    const url = `${this.baseUrl}/${this.apiVersion}/maestro/availability`;
    const body = { id_disponibilidad: id };

    return this.http
      .delete<MaestroDisponibilidadResponse>(url, {
        body,
        withCredentials: true,
      })
      .pipe(
        catchError((error) => {
          return throwError(() => error);
        })
      );
  }
}
