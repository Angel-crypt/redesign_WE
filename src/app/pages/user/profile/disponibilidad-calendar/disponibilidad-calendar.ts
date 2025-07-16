import {
  Component,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef,
} from '@angular/core';
import { DisponibilidadService } from '../../../../services/maestro/profile/disponibilidad-service';
import { Disponibilidad } from '../../../../interfaces/entities';
import { ID } from '../../../../interfaces/base';
import { MaestroDisponibilidadResponse } from '../../../../interfaces/maestro-interfaces';
import moment from 'moment';

interface CalendarEvent {
  title: string;
  start: string;
  end: string;
  color: string;
  id_disponibilidad?: ID;
}

@Component({
  selector: 'app-disponibilidad-calendar',
  standalone: false,
  templateUrl: './disponibilidad-calendar.html',
  styleUrl: './disponibilidad-calendar.less',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DisponibilidadCalendar implements OnInit {
  events: CalendarEvent[] = [];
  loading: boolean = true;
  error: string | null = null;
  hours: string[] = Array.from({ length: 14 }, (_, i) => `${i + 7}:00`);

  private readonly dayNumbers = [
    '',
    'lunes',
    'martes',
    'miércoles',
    'jueves',
    'viernes',
    'sábado',
  ];

  constructor(
    private disponibilidadService: DisponibilidadService,
    private cdr: ChangeDetectorRef
  ) {}

  ngOnInit(): void {
    this.fetchDisponibilidad();
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
}