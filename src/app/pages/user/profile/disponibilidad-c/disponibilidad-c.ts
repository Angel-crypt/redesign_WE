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

  constructor(
    private disponibilidadService: DisponibilidadService,
    private fb: FormBuilder
  ) {
    this.disponibilidadForm = this.fb.group({
      dia_semana: ['', Validators.required],
      hora_inicio: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.loadExistingDisponibilidades();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  get endTime(): string {
    const startTime = this.disponibilidadForm.get('hora_inicio')?.value;
    if (!startTime) return '';

    const hour = parseInt(startTime.split(':')[0], 10);
    return `${(hour + 1).toString().padStart(2, '0')}:00`;
  }

  get f() {
    return this.disponibilidadForm.controls;
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
          this.showAlert(
            'error',
            'Error de carga',
            'No se pudieron cargar las disponibilidades existentes'
          );
        },
      });
  }

  private validateForm(formValue: any): string | null {
    const hour = parseInt(formValue.hora_inicio.split(':')[0], 10);

    if (hour < 7 || hour >= 20) {
      return 'La disponibilidad debe estar entre 7:00 y 20:00';
    }

    if (
      this.existingDisponibilidades.some(
        (d) =>
          d.dia_semana === formValue.dia_semana &&
          d.hora_inicio === formValue.hora_inicio
      )
    ) {
      return 'Este horario ya está ocupado';
    }

    return null;
  }

  private showAlert(
    icon: 'success' | 'error',
    title: string,
    text: string,
    callback?: () => void
  ): void {
    Swal.fire({
      icon,
      title,
      text,
      confirmButtonText: icon === 'success' ? 'Aceptar' : 'Entendido',
    }).then(() => {
      if (callback) callback();
    });
  }

  private resetForm(): void {
    this.disponibilidadForm.reset();
    this.errorMessage = null;
  }

  onSubmit(event: Event): void {
    event.preventDefault();
    event.stopPropagation();

    if (!this.disponibilidadForm.valid || this.isSubmitting) {
      return;
    }

    this.isSubmitting = true;
    this.errorMessage = null;

    const formValue = this.disponibilidadForm.value;
    const validationError = this.validateForm(formValue);

    if (validationError) {
      this.errorMessage = validationError;
      this.isSubmitting = false;
      return;
    }

    const disponibilidad: Disponibilidad = {
      dia_semana: formValue.dia_semana,
      hora_inicio: formValue.hora_inicio,
      hora_fin: this.endTime,
    };

    this.disponibilidadService
      .createDisponibilidad(disponibilidad)
      .pipe(
        takeUntil(this.destroy$),
        catchError((error) => {
          console.error('Error creating disponibilidad:', error);

          const errorMessages = {
            409: 'Este horario ya está ocupado. Por favor elige otro.',
            400: 'Los datos enviados no son válidos. Revisa la información.',
            500: 'Error interno del servidor. Intenta más tarde.',
          };

          const errorMsg =
            errorMessages[(error?.status as 400 | 409 | 500)] ||
            'Ocurrió un error al crear la disponibilidad. Intenta más tarde.';
          this.showAlert(
            'error',
            'No se pudo crear la disponibilidad',
            errorMsg
          );
          return of(null);
        }),
        finalize(() => (this.isSubmitting = false))
      )
      .subscribe({
        next: (response) => {
          if (response) {
            this.showAlert(
              'success',
              'Disponibilidad creada',
              'Tu horario se ha registrado exitosamente.',
              () => {
                this.resetForm();
                this.loadExistingDisponibilidades();
                setTimeout(() => {
                  window.location.reload();
                }, 1000);
              }
            );
          }
        },
      });
  }

  onReset(): void {
    this.resetForm();
  }
}
