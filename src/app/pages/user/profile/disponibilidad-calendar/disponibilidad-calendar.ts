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
  hours: string[] = [];
  private eventSlotCache = new Map<string, boolean>();
  occupiedSlots: { [day: number]: { [hour: string]: CalendarEvent[] } } = {};

  constructor(
    private disponibilidadService: DisponibilidadService,
    private cdr: ChangeDetectorRef
  ) {
    for (let hour = 7; hour <= 20; hour++) {
      this.hours.push(`${hour}:00`);
    }
  }

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
    const dayMap: { [key: string]: number } = {
      domingo: 0,
      lunes: 1,
      martes: 2,
      miércoles: 3,
      jueves: 4,
      viernes: 5,
      sábado: 6,
    };

    this.events = disponibilidades.map((disp: Disponibilidad) => {
      const dayOfWeek = dayMap[disp.dia_semana.toLowerCase()];
      const startOfWeek = moment().startOf('week');
      const eventDate = startOfWeek.clone().add(dayOfWeek, 'days');

      const startTime = moment(disp.hora_inicio, 'HH:mm:ss');
      const endTime = moment(disp.hora_fin, 'HH:mm:ss');

      const startDateTime = eventDate.clone().set({
        hour: startTime.hour(),
        minute: startTime.minute(),
        second: startTime.second(),
      });

      const endDateTime = eventDate.clone().set({
        hour: endTime.hour(),
        minute: endTime.minute(),
        second: endTime.second(),
      });

      const event: CalendarEvent = {
        title: `Disponible`,
        start: startDateTime.toISOString(),
        end: endDateTime.toISOString(),
        color: 'green',
        id_disponibilidad:
          typeof disp.id_disponibilidad === 'string'
            ? parseInt(disp.id_disponibilidad, 10)
            : disp.id_disponibilidad,
      };

      // Precompute occupied slots
      this.populateOccupiedSlots(event, dayOfWeek);

      return event;
    });

    this.cdr.markForCheck();
  }

  private populateOccupiedSlots(event: CalendarEvent, day: number): void {
    const eventStart = moment(event.start);
    const eventEnd = moment(event.end);
    const eventStartHour = eventStart.hour();
    const eventEndHour = eventEnd.hour();

    for (let hour = eventStartHour; hour < eventEndHour; hour++) {
      const hourKey = `${hour}:00`;
      if (!this.occupiedSlots[day]) {
        this.occupiedSlots[day] = {};
      }
      if (!this.occupiedSlots[day][hourKey]) {
        this.occupiedSlots[day][hourKey] = [];
      }
      this.occupiedSlots[day][hourKey].push(event);
    }
  }

  isEventInSlot(event: CalendarEvent, day: number, hour: string): boolean {
    const cacheKey = `${event.start}-${day}-${hour}`;
    if (this.eventSlotCache.has(cacheKey)) {
      return this.eventSlotCache.get(cacheKey)!;
    }

    const eventStart = moment(event.start);
    const eventEnd = moment(event.end);
    const eventDay = eventStart.day();
    const slotHour = parseInt(hour.split(':')[0], 10);

    if (eventDay !== day) {
      this.eventSlotCache.set(cacheKey, false);
      return false;
    }

    const eventStartHour = eventStart.hour();
    const eventEndHour = eventEnd.hour();
    const result = slotHour >= eventStartHour && slotHour < eventEndHour;
    this.eventSlotCache.set(cacheKey, result);
    return result;
  }

  // Helper method for template to check occupied slots
  getEventsForSlot(day: number, hour: string): CalendarEvent[] {
    return (this.occupiedSlots[day] && this.occupiedSlots[day][hour]) || [];
  }
}
