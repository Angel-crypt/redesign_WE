import { Component, OnInit } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators,
} from '@angular/forms';
import { ProfileService } from '../../../../services/maestro/profile/profile-service';
import { edadMinMaxValidator } from '../../../../shared/validators/edad-min-max';
import { Maestro } from '../../../../interfaces/entities';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-datos-perfil',
  standalone: false,
  templateUrl: './datos-perfil.html',
  styleUrl: './datos-perfil.less',
})
export class DatosPerfil implements OnInit {
  maestroData: Maestro | null = null;
  loading: boolean = true;
  error: string | null = null;
  dataProfileUpdate: FormGroup;
  isEditing: boolean = false;

  constructor(
    private profileService: ProfileService,
    private fb: FormBuilder,
    private cdr: ChangeDetectorRef
  ) {
    this.dataProfileUpdate = this.fb.group({
      nombre: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(30),
          Validators.pattern(/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/),
        ],
      ],
      apellido_paterno: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(30),
          Validators.pattern(/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/),
        ],
      ],
      apellido_materno: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(30),
          Validators.pattern(/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/),
        ],
      ],
      fecha_nacimiento: [
        '',
        [
          Validators.required,
          Validators.pattern(/^\d{4}-\d{2}-\d{2}$/),
          edadMinMaxValidator(23, 65),
        ],
      ],
      especialidad: [
        '',
        [
          Validators.required,
          Validators.minLength(2),
          Validators.maxLength(100),
          Validators.pattern(/^[A-Za-zÁÉÍÓÚáéíóúÑñ\s]+$/),
        ],
      ],
    });
  }

  ngOnInit(): void {
    this.profileService.getPerfilData().subscribe({
      next: (res) => {
        if (res.success && res.data) {
          this.maestroData = res.data;
          this.dataProfileUpdate.patchValue({
            nombre: this.maestroData.nombre,
            apellido_paterno: this.maestroData.apellido_paterno,
            apellido_materno: this.maestroData.apellido_materno,
            fecha_nacimiento: this.maestroData.fecha_nacimiento,
            especialidad: this.maestroData.especialidad,
          });
        } else {
          this.error = 'No se pudieron cargar los datos del perfil';
        }
        this.loading = false;
        this.cdr.detectChanges();
      },
      error: (err) => {
        this.error = 'Ocurrió un error al consultar el perfil';
        this.loading = false;
        this.cdr.detectChanges();
        console.error(err);
      },
    });
    this.dataProfileUpdate.disable();
  }

  get especialidadControl(): FormControl {
    return this.dataProfileUpdate.get('especialidad') as FormControl;
  }

  setEditingMode(isEditing: boolean): void {
    this.isEditing = isEditing;

    if (isEditing) {
      this.dataProfileUpdate.enable();
    } else {
      this.dataProfileUpdate.disable();
      if (this.maestroData) {
        this.dataProfileUpdate.patchValue({
          nombre: this.maestroData.nombre,
          apellido_paterno: this.maestroData.apellido_paterno,
          apellido_materno: this.maestroData.apellido_materno,
          fecha_nacimiento: this.maestroData.fecha_nacimiento,
          especialidad: this.maestroData.especialidad,
        });
      }
    }
  }

  updatePerfilData() {
    if (this.dataProfileUpdate.valid) {
      const updatedData: Maestro = this.dataProfileUpdate.value;
      this.profileService.updatePerfilData(updatedData).subscribe({
        next: (res) => {
          if (res.success) {
            Swal.fire({
              icon: 'success',
              title: 'Perfil actualizado',
              text: 'Los datos del perfil se han actualizado correctamente.',
              customClass: {
                popup: 'custom-swal',
                title: 'custom-title',
                htmlContainer: 'custom-text',
                confirmButton: 'custom-success',
              },
              confirmButtonText: 'Aceptar',
            });
            this.maestroData = res.data!;
            this.setEditingMode(false);
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Error al actualizar el perfil',
              text: res.message || 'Ocurrió un error al actualizar los datos.',
              customClass: {
                popup: 'custom-swal',
                title: 'custom-title',
                htmlContainer: 'custom-text',
                confirmButton: 'custom-error',
              },
              confirmButtonText: 'Reintentar',
            });
          }
        },
        error: (err) => {
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'Ocurrió un error al intentar actualizar el perfil. Por favor, intenta de nuevo.',
            customClass: {
              popup: 'custom-swal',
              title: 'custom-title',
              htmlContainer: 'custom-text',
              confirmButton: 'custom-error',
            },
            confirmButtonText: 'Aceptar',
          });
          console.error(err);
        },
      });
    }
  }
}