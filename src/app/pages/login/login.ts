import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { MaestroAuthService } from '../../services/maestro/auth/s-auth';
import { AdminAuthService } from '../../services/admin/s-aauth';
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
  isAdminLogin = false;

  constructor(
    private maestroAuthService: MaestroAuthService,
    private adminAuthService: AdminAuthService,
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

  toggleLoginType() {
    this.isAdminLogin = !this.isAdminLogin;
    this.form.reset();
  }

  get loginButtonText(): string {
    return this.isAdminLogin
      ? 'Iniciar sesión como Admin'
      : 'Iniciar sesión como Maestro';
  }

  get toggleButtonText(): string {
    return this.isAdminLogin ? 'Cambiar a Maestro' : 'Cambiar a Admin';
  }

  get formTitle(): string {
    return this.isAdminLogin ? 'Login de Administrador' : 'Login de Maestro';
  }

  login() {
    if (this.form.valid) {
      const credentials: LoginRequest = this.form.value;

      if (this.isAdminLogin) {
        this.adminAuthService.loginAdmin(credentials).subscribe({
          next: (res) => {
            if (res.success) {
              this.router.navigate(['/admin/landing']);
            } else {
              this.showErrorAlert(
                'Inicio de sesión fallido',
                res.message || 'Credenciales incorrectas'
              );
            }
          },
          error: (err) => {
            let mensaje = 'Error en la solicitud';
            if (err.status === 401) {
              mensaje = err.error?.error || 'Credenciales inválidas';
            }
            this.showErrorAlert('Error', mensaje);
          },
        });
      } else {
        this.maestroAuthService.loginMaestro(credentials).subscribe({
          next: (res) => {
            if (res.success) {
              this.router.navigate(['/landing']);
            } else {
              this.showErrorAlert(
                'Inicio de sesión fallido',
                res.message || 'Credenciales incorrectas'
              );
            }
          },
          error: (err) => {
            let mensaje = 'Error en la solicitud';
            if (err.status === 401) {
              mensaje = err.error?.error || 'Credenciales inválidas';
            }
            this.showErrorAlert('Error', mensaje);
          },
        });
      }
    }
  }

  private showErrorAlert(title: string, text: string) {
    Swal.fire({
      icon: 'error',
      title: title,
      text: text,
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
}
