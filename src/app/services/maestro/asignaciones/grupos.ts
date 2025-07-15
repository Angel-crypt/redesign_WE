import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { Asignacion, Grupo, Curso, Horario } from '../../../interfaces/entities';
import { MaestroAsignacionesResponse } from '../../../interfaces/maestro-interfaces';

@Injectable({
  providedIn: 'root'
})
export class Grupos {
  private baseUrl = 'http://localhost:5000';
  private apiVersion = 'v1';

  constructor( private http: HttpClient ) { }
}
