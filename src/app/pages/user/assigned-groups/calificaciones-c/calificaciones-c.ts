import { Component, OnInit } from '@angular/core';
import { CalificacionesS } from '../../../../services/maestro/calificaciones/calificaciones-s';

@Component({
  selector: 'app-calificaciones-c',
  standalone: false,
  templateUrl: './calificaciones-c.html',
  styleUrl: './calificaciones-c.less',
})
export class CalificacionesC implements OnInit {
  canUploadGrades = false;
  statusMessage = '';
  isLoading = false;

  // Datos de ejemplo
  id_asignacion = '7';
  numero_parcial = '1';
  calificaciones = [
    { id_alumno: 'GU23IA001', calificacion: 8.5 },
    { id_alumno: 'GU23IA002', calificacion: 9.0 },
  ];

  constructor(private calificacionesService: CalificacionesS) {}

  ngOnInit() {
    this.checkAvailability();
  }

  checkAvailability() {
    this.isLoading = true;

    this.calificacionesService
      .checkGradesAvailability(this.id_asignacion, this.numero_parcial)
      .subscribe({
        next: (response) => {
          this.canUploadGrades = response.can_upload;
          this.statusMessage = response.message;
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Error al verificar disponibilidad:', error);
          this.statusMessage =
            error.error?.error || 'Error al verificar disponibilidad';
          this.canUploadGrades = false;
          this.isLoading = false;
        },
      });
  }

  uploadGrades() {
    if (!this.canUploadGrades) {
      alert(
        'No se pueden subir calificaciones en este momento: ' +
          this.statusMessage
      );
      return;
    }

    this.isLoading = true;
    console.log('Subiendo calificaciones:', {
      id_asignacion: this.id_asignacion,
      numero_parcial: this.numero_parcial,
      calificaciones: this.calificaciones,
    });

    this.calificacionesService
      .uploadCalificaciones(
        this.id_asignacion,
        this.numero_parcial,
        this.calificaciones
      )
      .subscribe({
        next: (response) => {
          console.log('Calificaciones subidas exitosamente:', response);
          this.statusMessage = 'Calificaciones subidas exitosamente';
          this.isLoading = false;
        },
        error: (error) => {
          console.error('Error al subir calificaciones:', error);
          this.statusMessage =
            error.error?.error || 'Error al subir calificaciones';
          this.isLoading = false;
        },
      });
  }

  refreshStatus() {
    this.checkAvailability();
  }
}