import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {
  MaestroLoginRequest,
  MaestroLoginResponseSuccess,
  MaestroLoginResponseError
} from '../../../interfaces/maestro-iauth';


@Injectable({
  providedIn: 'root'
})
export class MaestroAuthService {
  private baseUrl = 'http://localhost:5000';
  private apiVersion = 'v1';

  constructor(private http: HttpClient) {}

  loginMaestro(data: MaestroLoginRequest): Observable<MaestroLoginResponseSuccess | MaestroLoginResponseError> {
    const url = `${this.baseUrl}/${this.apiVersion}/maestro/login`;
    return this.http.post<MaestroLoginResponseSuccess | MaestroLoginResponseError>(url, data);
  }
}
