import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MaestroAuthService } from '../../services/maestro/auth/s-auth';
import { LoginRequest } from '../../interfaces/auth';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.html',
  styleUrls: ['./login.less'],
})
export class Login {
  form: FormGroup;

  constructor(
    private authService: MaestroAuthService,
    private router: Router,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      id_usuario: [
        '',
        [
          Validators.required,
          Validators.minLength(4),
          Validators.maxLength(6),
          Validators.pattern(/^[A-Za-z0-9]+$/),
        ],
      ],
      contrasena: ['', [Validators.required, Validators.minLength(6)]],
    });
  }

  onUppercaseInput(event: any) {
    const value = event.target.value.toUpperCase();
    this.form.get('id_usuario')?.setValue(value);
  }

  login() {
    if (this.form.valid) {
      const credentials: LoginRequest = this.form.value;

      this.authService.loginMaestro(credentials).subscribe({
        next: (res) => {
          if (res.success) {
            this.router.navigate(['/landing']);
          } else {
            Swal.fire({
              icon: 'error',
              title: 'Inicio de sesión fallido',
              text: res.message || 'Credenciales incorrectas',
              customClass: {
                popup: 'custom-swal',
                title: 'custom-title',
                htmlContainer: 'custom-text',
                confirmButton: 'custom-error',
              },
              confirmButtonText: 'Reintentar',
            });
            this.form.reset();
          }
        },
        error: (err) => {
          let mensaje = 'Error en la solicitud';
          if (err.status === 401) {
            mensaje = err.error?.error || 'Credenciales inválidas';
          }

          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: mensaje,
            customClass: {
              popup: 'custom-swal',
              title: 'custom-title',
              htmlContainer: 'custom-text',
              confirmButton: 'custom-error',
            },
            confirmButtonText: 'Reintentar',
          });

          this.form.reset();
        },
      });
    }
  }
}
