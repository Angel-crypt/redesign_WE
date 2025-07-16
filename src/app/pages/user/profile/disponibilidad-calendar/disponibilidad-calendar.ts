import {
  Component,
  OnInit,
  OnDestroy,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from '@angular/core';
import { DisponibilidadService } from '../../../../services/maestro/profile/disponibilidad-service';
import { Disponibilidad } from '../../../../interfaces/entities';
import { ID, dia_semana } from '../../../../interfaces/base';
import { MaestroDisponibilidadResponse } from '../../../../interfaces/maestro-interfaces';
import moment from 'moment';
import Swal from 'sweetalert2';
import { catchError, takeUntil, finalize } from 'rxjs/operators';
import { of, Subject } from 'rxjs';

interface CalendarEvent {
  title: string;
  start: string;
  end: string;
  color: string;
  id_disponibilidad?: ID;
}

interface SlotInfo {
  day: number;
  hour: string;
  dayName: string;
  hasEvent: boolean;
  event?: CalendarEvent;
}

@Component({
  selector: 'app-disponibilidad-calendar',
  standalone: false,
  templateUrl: './disponibilidad-calendar.html',
  styleUrl: './disponibilidad-calendar.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DisponibilidadCalendar implements OnInit, OnDestroy {
  events: CalendarEvent[] = [];
  loading: boolean = true;
  error: string | null = null;
  hours: string[] = Array.from({ length: 14 }, (_, i) => `${i + 7}:00`);
  isSubmitting = false;

  private destroy$ = new Subject<void>();

  private readonly dayNumbers = [
    '',
    'lunes',
    'martes',
    'miércoles',
    'jueves',
    'viernes',
    'sábado',
  ];

  private readonly dayNames = [
    '',
    'Lunes',
    'Martes',
    'Miércoles',
    'Jueves',
    'Viernes',
    'Sábado',
  ];

  constructor(
    private disponibilidadService: DisponibilidadService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.fetchDisponibilidad();
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  fetchDisponibilidad(): void {
    this.disponibilidadService.getDisponibilidad().subscribe({
      next: (response: MaestroDisponibilidadResponse) => {
        if (response.success && response.data) {
          this.mapDisponibilidadToEvents(response.data);
        } else {
          this.error = 'No se pudieron cargar los datos de disponibilidad';
        }
        this.loading = false;
        this.cdr.markForCheck();
      },
      error: (err) => {
        this.error = 'Ocurrió un error al consultar la disponibilidad';
        this.loading = false;
        console.error('Error fetching disponibilidad:', err);
        this.cdr.markForCheck();
      },
    });
  }

  mapDisponibilidadToEvents(disponibilidades: Disponibilidad[]): void {
    const startOfWeek = moment().startOf('week');

    this.events = disponibilidades
      .filter((disp) => this.dayNumbers.includes(disp.dia_semana.toLowerCase()))
      .map((disp: Disponibilidad) => {
        const dayOfWeek = this.dayNumbers.indexOf(
          disp.dia_semana.toLowerCase()
        );
        const eventDate = startOfWeek.clone().add(dayOfWeek, 'days');

        const [startHour, startMinute] = disp.hora_inicio
          .split(':')
          .map(Number);
        const [endHour, endMinute] = disp.hora_fin.split(':').map(Number);

        const startDateTime = eventDate
          .clone()
          .set({ hour: startHour, minute: startMinute, second: 0 });
        const endDateTime = eventDate
          .clone()
          .set({ hour: endHour, minute: endMinute, second: 0 });

        return {
          title: 'Disponible',
          start: startDateTime.toISOString(),
          end: endDateTime.toISOString(),
          color: 'green',
          id_disponibilidad:
            typeof disp.id_disponibilidad === 'string'
              ? parseInt(disp.id_disponibilidad, 10)
              : disp.id_disponibilidad,
        };
      });

    this.cdr.markForCheck();
  }

  getEventsForSlot(day: number, hour: string): CalendarEvent[] {
    const slotHour = parseInt(hour.split(':')[0], 10);
    return this.events.filter((event) => {
      const eventStart = moment(event.start);
      const eventEnd = moment(event.end);
      return (
        eventStart.day() === day &&
        slotHour >= eventStart.hour() &&
        slotHour < eventEnd.hour()
      );
    });
  }

  onSlotClick(day: number, hour: string): void {
    const events = this.getEventsForSlot(day, hour);
    const slotInfo: SlotInfo = {
      day,
      hour,
      dayName: this.dayNames[day],
      hasEvent: events.length > 0,
      event: events[0],
    };

    if (slotInfo.hasEvent) {
      this.showEventModal(slotInfo);
    } else {
      this.showEmptySlotModal(slotInfo);
    }
  }

  private showEventModal(slotInfo: SlotInfo): void {
    const endHour = parseInt(slotInfo.hour.split(':')[0]) + 1;

    Swal.fire({
      title: 'Horario Ocupado',
      html: `
        <div class="slot-info">
          <p><strong>Día:</strong> ${slotInfo.dayName}</p>
          <p><strong>Horario:</strong> ${slotInfo.hour} - ${endHour}:00</p>
          <p><strong>Estado:</strong> ${slotInfo.event?.title}</p>
          <p><strong>ID:</strong> ${slotInfo.event?.id_disponibilidad}</p>
        </div>
      `,
      icon: 'info',
      showCancelButton: true,
      confirmButtonText: 'Eliminar',
      cancelButtonText: 'Cerrar',
      confirmButtonColor: '#d33',
    }).then((result) => {
      if (result.isConfirmed) {
        this.deleteDisponibilidad(slotInfo.event?.id_disponibilidad);
      }
    });
  }

  private showEmptySlotModal(slotInfo: SlotInfo): void {
    const endHour = parseInt(slotInfo.hour.split(':')[0]) + 1;

    Swal.fire({
      title: 'Horario Libre',
      html: `
        <div class="slot-info">
          <p><strong>Día:</strong> ${slotInfo.dayName}</p>
          <p><strong>Horario:</strong> ${slotInfo.hour} - ${endHour}:00</p>
          <p><strong>Estado:</strong> Disponible para agendar</p>
        </div>
      `,
      icon: 'success',
      showCancelButton: true,
      confirmButtonText: 'Crear Disponibilidad',
      cancelButtonText: 'Cerrar',
      confirmButtonColor: '#28a745',
    }).then((result) => {
      if (result.isConfirmed) {
        this.createDisponibilidad(slotInfo);
      }
    });
  }

  private deleteDisponibilidad(id: ID | undefined): void {
    if (!id) return;

    const idNumber = typeof id === 'string' ? parseInt(id, 10) : id;

    Swal.fire({
      title: '¿Estás seguro?',
      text: 'Esta acción no se puede deshacer',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Sí, eliminar',
      cancelButtonText: 'Cancelar',
      confirmButtonColor: '#d33',
    }).then((result) => {
      if (result.isConfirmed) {
        this.disponibilidadService.deleteDisponibilidad(idNumber).subscribe({
          next: () => {
            Swal.fire('Eliminado', 'El horario ha sido eliminado', 'success');
            this.fetchDisponibilidad();
          },
          error: (err) => {
            console.error('Error deleting disponibilidad:', err);
            Swal.fire('Error', 'No se pudo eliminar el horario', 'error');
          },
        });
      }
    });
  }

  private createDisponibilidad(slotInfo: SlotInfo): void {
    if (this.isSubmitting) return;
    this.isSubmitting = true;

    // Extraer la hora y convertir a número
    const startHour = parseInt(slotInfo.hour.split(':')[0]);
    const endHour = startHour + 1;

    // Mapeo de días - usando strings en minúsculas como espera el servidor
    const dayMap: { [key: number]: string } = {
      0: 'lunes',
      1: 'martes',
      2: 'miércoles',
      3: 'jueves',
      4: 'viernes',
      5: 'sábado',
      6: 'domingo',
    };

    const disponibilidad: Disponibilidad = {
      dia_semana: dayMap[slotInfo.day - 1] as dia_semana,
      hora_inicio: startHour.toString().padStart(2, '0') + ':00', // Formato HH:00
      hora_fin: endHour.toString().padStart(2, '0') + ':00', // Formato HH:00
    };

    console.log('Payload:', disponibilidad.dia_semana);

    console.log('Payload:', disponibilidad);

    const validationError = this.validateDisponibilidad(disponibilidad);
    if (validationError) {
      this.isSubmitting = false;
      Swal.fire('Error de validación', validationError, 'error');
      return;
    }

    this.disponibilidadService
      .createDisponibilidad(disponibilidad)
      .pipe(
        takeUntil(this.destroy$),
        catchError((error: { status?: number }) => {
          console.error('Error creating disponibilidad:', error);
          const errorMessages: { [key in 400 | 409 | 500]: string } = {
            409: 'Este horario ya está ocupado. Por favor elige otro.',
            400: 'Los datos enviados no son válidos. Revisa la información.',
            500: 'Error interno del servidor. Intenta más tarde.',
          };
          const status = error?.status as 400 | 409 | 500 | undefined;
          const errorMsg =
            (status && errorMessages[status]) ||
            'Ocurrió un error al crear la disponibilidad. Intenta más tarde.';
          Swal.fire('No se pudo crear la disponibilidad', errorMsg, 'error');
          return of(null);
        }),
        finalize(() => (this.isSubmitting = false))
      )
      .subscribe({
        next: (response) => {
          if (response) {
            Swal.fire({
              icon: 'success',
              title: 'Disponibilidad creada',
              text: 'Tu horario se ha registrado exitosamente.',
              confirmButtonText: 'Aceptar',
            }).then(() => {
              this.fetchDisponibilidad();
              this.cdr.markForCheck();
            });
          }
        },
        error: (error) => {
          console.error('Unhandled error:', error);
          Swal.fire(
            'Error inesperado',
            'Ha ocurrido un error inesperado',
            'error'
          );
        },
      });
  }

  private validateDisponibilidad(
    disponibilidad: Disponibilidad
  ): string | null {
    const hour = parseInt(disponibilidad.hora_inicio.split(':')[0], 10);

    if (hour < 7 || hour >= 20) {
      return 'La disponibilidad debe estar entre 7:00 y 20:00';
    }

    const existingEvent = this.events.find((event) => {
      const eventStart = moment(event.start);
      const eventDayName = this.dayNumbers[eventStart.day()];
      const eventHour = `${eventStart.hour().toString().padStart(2, '0')}:00`;

      return (
        eventDayName === disponibilidad.dia_semana &&
        eventHour === disponibilidad.hora_inicio
      );
    });

    if (existingEvent) {
      return 'Este horario ya está ocupado';
    }

    return null;
  }
}
