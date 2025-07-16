import { Component, Input } from '@angular/core';
import { Asignacion } from '../../../../interfaces/entities';

@Component({
  selector: 'app-assignment-card',
  standalone: false,
  templateUrl: './assignment-card.html',
  styleUrl: './assignment-card.less',
})
export class AssignmentCard {
  @Input() assignment!: Asignacion;
}
