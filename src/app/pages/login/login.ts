import { Component } from '@angular/core';
import { MaestroAuthService } from '../../services/maestro/auth/s-auth';
import { MaestroLoginRequest } from '../../interfaces/maestro-iauth';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.html',
  styleUrl: './login.less'
})
export class Login {
  constructor(private authService: MaestroAuthService) { }
  login() {
    const nCredentials: MaestroLoginRequest = {
      id_usuario: '',
      contrasena: '',
    };

    this.authService.loginMaestro(nCredentials).subscribe({
      next: (res) => {
        if (res.success) {
          console.log('Login correcto:', res.message);
        } else {
          console.error('Error:', res.message);
        }
      },
      error: (err) => {
        if (err.status === 401) {
          // Aquí capturamos el error 401 y mostramos el mensaje del backend
          console.error('Error:', err.error.error || 'Credenciales inválidas');
        } else {
          console.error('Error en la solicitud HTTP:', err);
        }
      }
    });

  }
}
