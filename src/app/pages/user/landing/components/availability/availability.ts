import { Component, Input } from '@angular/core';
import { Availability } from './availability.model';

@Component({
  selector: 'app-availability',
  templateUrl: './availability.html',
  styleUrls: ['./availability.less']
})
export class AvailabilityComponent {
  @Input() disponibilidad: Availability[] = [];
  @Input() total: number = 0;
}
