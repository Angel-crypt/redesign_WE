import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ProfileService } from '../../../services/maestro/profile/profile-service';
import { edadMinMaxValidator } from '../../../shared/validators/edad-min-max';

import { SSidebar } from '../../../services/general/s-sidebar';
import { Maestro } from '../../../interfaces/entities';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-profile',
  standalone: false,
  templateUrl: './profile.html',
  styleUrl: './profile.less',
})
export class Profile implements OnInit {
  maestroData: Maestro | null = null;
  loading: boolean = true;
  error: string | null = null;
  dataProfileUpdate: FormGroup;

  constructor(
    private profileService: ProfileService,
    private sidebarService: SSidebar,
    private fb: FormBuilder
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
    this.sidebarService.setMaestroMenu();
    this.profileService.getPerfilData().subscribe({
      next: (res) => {
        if (res.success) {
          this.maestroData = res.data!;
        } else {
          this.error = 'No se pudieron cargar los datos del perfil';
        }
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Ocurrió un error al consultar el perfil';
        this.loading = false;
        console.error(err);
      },
    });
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
        }
      })
    }
  }
}
