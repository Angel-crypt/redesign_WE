import { Component, Input, OnInit } from '@angular/core';
import { Disponibilidad } from '../../../../../interfaces/entities';

@Component({
  selector: 'app-availability',
  standalone: false,
  templateUrl: './availability.html',
  styleUrls: ['./availability.less'],
})
export class Availability {
  @Input() disponibilidad: Disponibilidad[] = [];
  @Input() total: number = 0;
}
