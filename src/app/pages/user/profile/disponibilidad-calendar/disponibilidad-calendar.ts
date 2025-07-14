import { Component, OnInit } from '@angular/core';
import { DisponibilidadService } from '../../../../services/maestro/profile/disponibilidad-service';
import { Disponibilidad } from '../../../../interfaces/entities';
import { MaestroDisponibilidadResponse } from '../../../../interfaces/maestro-interfaces';
import moment from 'moment';

interface CalendarEvent {
  title: string;
  start: string; 
  end: string;
  color: string;
}

@Component({
  selector: 'app-disponibilidad-calendar',
  standalone: false,
  templateUrl: './disponibilidad-calendar.html',
  styleUrl: './disponibilidad-calendar.less'
})
export class DisponibilidadCalendar implements OnInit {
  events: CalendarEvent[] = [];
  loading: boolean = true;
  error: string | null = null;
  hours: string[] = [];
  constructor(private disponibilidadService: DisponibilidadService) {
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
      },
      error: (err) => {
        this.error = 'Ocurrió un error al consultar la disponibilidad';
        this.loading = false;
        console.error(err);
      }
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
      sábado: 6
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
        second: startTime.second()
      });

      const endDateTime = eventDate.clone().set({
        hour: endTime.hour(),
        minute: endTime.minute(),
        second: endTime.second()
      });

      return {
        title: `Disponible (${disp.hora_inicio} - ${disp.hora_fin})`,
        start: startDateTime.toISOString(),
        end: endDateTime.toISOString(),
        color: 'green'
      };
    });
  }

  isEventInSlot(event: CalendarEvent, day: number, hour: string): boolean {
    const eventStart = moment(event.start);
    const eventEnd = moment(event.end);
    const eventDay = eventStart.day(); // 0 = Sunday, 1 = Monday, etc.
    const slotHour = parseInt(hour.split(':')[0], 10);

    if (eventDay !== day) {
      return false;
    }

    const eventStartHour = eventStart.hour();
    const eventEndHour = eventEnd.hour();

    // Check if the slot hour is within the event's start and end hours
    return slotHour >= eventStartHour && slotHour < eventEndHour;
  }
}