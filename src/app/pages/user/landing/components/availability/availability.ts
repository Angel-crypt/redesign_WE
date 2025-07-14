import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common'; // necesario para *ngFor
import { Availability } from './availability.model';

@Component({
  selector: 'app-availability',
  standalone: false,
  templateUrl: './availability.html',
  styleUrls: ['./availability.less']
})
export class AvailabilityComponent {
  @Input() disponibilidad: Availability[] = [];
  @Input() total: number = 0;
}
