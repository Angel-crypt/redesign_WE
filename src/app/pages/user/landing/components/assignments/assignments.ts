import { Component, Input } from '@angular/core';
import { Asignacion } from '../../../../../interfaces/entities';

@Component({
  selector: 'app-assignments',
  standalone: false,
  templateUrl: './assignments.html',
  styleUrls: ['./assignments.less'],
})
export class Assignments {
  @Input() asignaciones: Asignacion[] = [];
  @Input() total: number = 0;

}