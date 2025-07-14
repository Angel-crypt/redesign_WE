import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap, map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {
  private baseUrl = 'http://localhost:5000';
  private apiVersion = 'v1';
  constructor(private http: HttpClient) { }

  getPerfilData() {
    const url = `${this.baseUrl}/${this.apiVersion}/maestro/profile`;
    return this.http.get(url, { withCredentials: true }).pipe(
      map((response: any) => response.data),
      catchError((error) => {
        console.error('Error fetching profile data:', error);
        return of(null);
      })
    );
  }
}
