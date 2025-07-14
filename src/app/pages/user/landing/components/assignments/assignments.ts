import { Component, Input } from '@angular/core';
import { Assignment } from './assignment.model';

@Component({
  selector: 'app-assignments',
  templateUrl: './assignments.html',
  styleUrls: ['./assignments.less']
})
export class Assignments {
  @Input() asignaciones: Assignment[] = [];
  @Input() total: number = 0;
}
