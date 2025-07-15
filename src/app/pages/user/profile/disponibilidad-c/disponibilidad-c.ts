import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DisponibilidadService } from '../../../../services/maestro/profile/disponibilidad-service';
import { Disponibilidad } from '../../../../interfaces/entities';
import Swal from 'sweetalert2';
import { catchError, takeUntil, finalize } from 'rxjs/operators';
import { of, Subject } from 'rxjs';

interface ApiResponse<T> {
  data: T;
  status?: string;
  message?: string;
}

@Component({
  selector: 'app-disponibilidad-c',
  standalone: false,
  templateUrl: './disponibilidad-c.html',
  styleUrl: './disponibilidad-c.less',
})
export class DisponibilidadC implements OnInit, OnDestroy {
  disponibilidadForm: FormGroup;
  existingDisponibilidades: Disponibilidad[] = [];
  errorMessage: string | null = null;
  isLoading = false;
  isSubmitting = false;

  private destroy$ = new Subject<void>();

  readonly availableDays: string[] = [
    'lunes',
    'martes',
    'miércoles',
    'jueves',
    'viernes',
    'sábado',
  ];

  readonly availableHours: string[] = Array.from(
    { length: 14 },
    (_, i) => `${(i + 7).toString().padStart(2, '0')}:00`
  );

  // Constantes para validación
  private readonly MIN_HOUR = 7;
  private readonly MAX_HOUR = 20;

  constructor(
    private disponibilidadService: DisponibilidadService,
    private fb: FormBuilder
  ) {
    this.disponibilidadForm = this.createForm();
  }

  ngOnInit(): void {
    this.loadExistingDisponibilidades();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  private createForm(): FormGroup {
    return this.fb.group({
      dia_semana: ['', Validators.required],
      hora_inicio: ['', Validators.required],
    });
  }

  get endTime(): string {
    const startTime = this.disponibilidadForm.get('hora_inicio')?.value;
    if (!startTime) return '';

    const hour = parseInt(startTime.split(':')[0], 10);
    return `${(hour + 1).toString().padStart(2, '0')}:00`;
  }

  get isFormValid(): boolean {
    return this.disponibilidadForm.valid && !this.isSubmitting;
  }

  private loadExistingDisponibilidades(): void {
    this.isLoading = true;
    this.errorMessage = null;

    this.disponibilidadService
      .getDisponibilidad()
      .pipe(
        takeUntil(this.destroy$),
        finalize(() => (this.isLoading = false))
      )
      .subscribe({
        next: (response) => {
          this.existingDisponibilidades = response?.data ?? [];
        },
        error: (error) => {
          this.errorMessage = 'Error al cargar las disponibilidades existentes';
          console.error('Error loading availabilities:', error);
          this.showErrorAlert(
            'Error de carga',
            'No se pudieron cargar las disponibilidades existentes'
          );
        },
      });
  }

  private isValidHour(hour: number): boolean {
    return hour >= this.MIN_HOUR && hour < this.MAX_HOUR;
  }

  private hasTimeConflict(diaSemana: string, horaInicio: string): boolean {
    return this.existingDisponibilidades.some(
      (d) => d.dia_semana === diaSemana && d.hora_inicio === horaInicio
    );
  }

  private validateFormData(formValue: any): string | null {
    const [hours] = formValue.hora_inicio.split(':');
    const hourNumber = parseInt(hours, 10);

    if (!this.isValidHour(hourNumber)) {
      return `La disponibilidad debe estar entre ${this.MIN_HOUR}:00 y ${this.MAX_HOUR}:00`;
    }

    if (this.hasTimeConflict(formValue.dia_semana, formValue.hora_inicio)) {
      return 'Este horario ya está ocupado';
    }

    return null;
  }

  private showErrorAlert(title: string, text: string): void {
    Swal.fire({
      icon: 'error',
      title,
      text,
      confirmButtonText: 'Entendido',
    });
  }

  private showSuccessAlert(): void {
    Swal.fire({
      icon: 'success',
      title: 'Disponibilidad creada',
      text: 'Tu horario se ha registrado exitosamente.',
      confirmButtonText: 'Aceptar',
    }).then(() => {
      this.resetForm();
      this.loadExistingDisponibilidades();
      setTimeout(() => {
        window.location.reload();
      }, 300);
    });
  }

  private resetForm(): void {
    this.disponibilidadForm.reset();
    this.errorMessage = null;
  }

  onSubmit(event: Event): void {
    event.preventDefault();
    event.stopPropagation();

    if (!this.isFormValid) {
      return;
    }

    this.isSubmitting = true;
    this.errorMessage = null;

    const formValue = this.disponibilidadForm.value;

    // Validación de datos
    const validationError = this.validateFormData(formValue);
    if (validationError) {
      this.errorMessage = validationError;
      this.isSubmitting = false;
      return;
    }

    // Crear disponibilidad
    const disponibilidad: Disponibilidad = {
      dia_semana: formValue.dia_semana,
      hora_inicio: formValue.hora_inicio,
      hora_fin: this.endTime,
    };

    // Llamada al servicio
    this.disponibilidadService
      .createDisponibilidad(disponibilidad)
      .pipe(
        takeUntil(this.destroy$),
        catchError((error) => {
          console.error('Error creating disponibilidad:', error);

          let errorMsg =
            'Ocurrió un error al crear la disponibilidad. Intenta más tarde.';

          if (error?.status === 409) {
            errorMsg = 'Este horario ya está ocupado. Por favor elige otro.';
          } else if (error?.status === 400) {
            errorMsg =
              'Los datos enviados no son válidos. Revisa la información.';
          } else if (error?.status === 500) {
            errorMsg = 'Error interno del servidor. Intenta más tarde.';
          }

          this.showErrorAlert('No se pudo crear la disponibilidad', errorMsg);
          return of(null);
        }),
        finalize(() => (this.isSubmitting = false))
      )
      .subscribe({
        next: (response) => {
          if (response !== null && response !== undefined) {
            this.showSuccessAlert();
          }
        },
        error: (error) => {
          console.error('Unhandled error:', error);
          this.showErrorAlert(
            'Error inesperado',
            'Ha ocurrido un error inesperado'
          );
        },
      });
  }

  onReset(): void {
    this.resetForm();
  }

  get f() {
    return this.disponibilidadForm.controls;
  }
}
