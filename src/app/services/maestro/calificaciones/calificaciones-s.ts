import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CalificacionesS {
  private baseUrl = 'http://localhost:5000';
  private apiVersion = 'v1';

  constructor(private http: HttpClient) {}

  checkGradesAvailability(
    id_asignacion: string,
    numero_parcial: string
  ): Observable<any> {
    const url = `${this.baseUrl}/${this.apiVersion}/maestro/grades/${id_asignacion}/${numero_parcial}/check`;
    return this.http
      .get(url, { withCredentials: true })
      .pipe(catchError(this.handleError));
  }

  getCalificaciones(
    id_asignacion: string,
    numero_parcial: string
  ): Observable<any> {
    const url = `${this.baseUrl}/${this.apiVersion}/maestro/grades/${id_asignacion}/${numero_parcial}`;
    return this.http
      .get(url, { withCredentials: true })
      .pipe(catchError(this.handleError));
  }

  uploadCalificaciones(
    id_asignacion: string,
    numero_parcial: string,
    calificaciones: any[]
  ): Observable<any> {
    const url = `${this.baseUrl}/${this.apiVersion}/maestro/grades/${id_asignacion}/${numero_parcial}`;

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
    });

    return this.http
      .post(url, calificaciones, {
        headers: headers,
        withCredentials: true,
      })
      .pipe(catchError(this.handleError));
  }

  private handleError(error: any): Observable<never> {
    console.error('Error en el servicio de calificaciones:', error);
    throw error;
  }
}
