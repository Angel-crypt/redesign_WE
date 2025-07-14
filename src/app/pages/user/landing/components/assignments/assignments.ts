import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Assignment } from './assignment.model';

@Component({
  selector: 'app-assignments',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './assignments.html',
  styleUrls: ['./assignments.less']
})
export class Assignments {
  @Input() asignaciones: Assignment[] = [];
  @Input() total: number = 0;
}
