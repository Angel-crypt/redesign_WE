import { AbstractControl, ValidationErrors } from '@angular/forms';

export function edadMinMaxValidator(min: number, max: number) {
  return (control: AbstractControl): ValidationErrors | null => {
    const value = control.value;
    if (!value) return null;

    const fechaNacimiento = new Date(value);
    const hoy = new Date();

    let edad = hoy.getFullYear() - fechaNacimiento.getFullYear();
    const mes = hoy.getMonth() - fechaNacimiento.getMonth();
    if (mes < 0 || (mes === 0 && hoy.getDate() < fechaNacimiento.getDate())) {
      edad--;
    }

    if (edad < min || edad > max) {
      return { edadInvalida: true };
    }

    return null;
  };
}