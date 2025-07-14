import { Component, Input, OnInit, forwardRef } from '@angular/core';
import {
  ControlValueAccessor,
  NG_VALUE_ACCESSOR,
  FormControl,
} from '@angular/forms';

@Component({
  selector: 'app-select-especialidad',
  standalone: false,
  templateUrl: './select-especialidad.html',
  styleUrls: ['./select-especialidad.less'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => SelectEspecialidadComponent),
      multi: true,
    },
  ],
})
export class SelectEspecialidadComponent
  implements ControlValueAccessor, OnInit
{
  @Input() especialidades: string[] = [];
  @Input() label: string = 'Especialidad';
  @Input() control!: FormControl;

  onChange = (_: any) => {};
  onTouched = () => {};

  listaEspecialidades: string[] = [
    'Matemáticas',
    'Física',
    'Química',
    'Biología',
    'Historia',
    'Literatura',
    'Programación',
    'Educación Física',
  ];

  ngOnInit(): void {
    if (!this.especialidades || this.especialidades.length === 0) {
      this.especialidades = this.listaEspecialidades;
    }
  }

  writeValue(value: string): void {
    // No necesitas asignar directamente, ya que usas [ngModel]="control.value"
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }
}
