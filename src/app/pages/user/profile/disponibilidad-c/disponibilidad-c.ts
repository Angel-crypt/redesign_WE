import { Component, OnInit } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { DisponibilidadService } from '../../../../services/maestro/profile/disponibilidad-service';
import { Disponibilidad } from '../../../../interfaces/entities';

@Component({
  selector: 'app-disponibilidad-c',
  standalone: false,
  templateUrl: './disponibilidad-c.html',
  styleUrl: './disponibilidad-c.less'
})
export class DisponibilidadC {

}
