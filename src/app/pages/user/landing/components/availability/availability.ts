import { Component, Input } from '@angular/core';
import { Availability as AvailabilityModel } from './availability.model';

@Component({
  selector: 'app-availability',
  standalone: false,
  templateUrl: './availability.html',
  styleUrls: ['./availability.less']
})
export class Availability {
  @Input() disponibilidad: AvailabilityModel[] = [];
  @Input() total: number = 0;
}
