import { Component, Input } from '@angular/core';
import { Maestro } from '../../../../../interfaces/entities';

@Component({
  selector: 'app-data-maestro',
  standalone: false,
  templateUrl: './data-maestro.html',
  styleUrl: './data-maestro.less'
})
export class DataMaestro {
  @Input() maestro!: Maestro;

  edadMaestro = 0;
  get edad(): number {
    if (this.maestro.fecha_nacimiento) {
      const fechaNacimiento = new Date(this.maestro.fecha_nacimiento);
      const hoy = new Date();
      this.edadMaestro = hoy.getFullYear() - fechaNacimiento.getFullYear();
      const mes = hoy.getMonth() - fechaNacimiento.getMonth();
      if (mes < 0 || (mes === 0 && hoy.getDate() < fechaNacimiento.getDate())) {
        this.edadMaestro--;
      }
    }
    return this.edadMaestro;
  }
}
