import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class PlaneacionS {
  private baseUrl = 'http://localhost:5000';
  private apiVersion = 'v1';

  constructor(private http: HttpClient) {}

  uploadPdfFile(id: number, file: File): Observable<any> {
    const url = `${this.baseUrl}/${this.apiVersion}/maestro/planning/${id}`;

    const formData = new FormData();
    formData.append('file', file);

    return this.http
      .post(url, formData, {
        withCredentials: true,
      })
      .pipe(
        catchError((error) => {
          console.error('Error uploading PDF:', error);
          return throwError(() => error);
        })
      );
  }
}