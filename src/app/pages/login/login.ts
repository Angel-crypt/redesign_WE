import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { MaestroAuthService } from '../../services/maestro/auth/s-auth';
import { MaestroLoginRequest } from '../../interfaces/maestro-iauth';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.html',
  styleUrl: './login.less'
})
export class Login {
  constructor(
    private authService: MaestroAuthService,
    private router: Router
  ) { }

  Credentials: MaestroLoginRequest = {
      id_usuario: '',
      contrasena: '',
  };
  
  login() {
    this.authService.loginMaestro(this.Credentials).subscribe({
      next: (res) => {
        if (res.success) {
          this.router.navigate(['/landing']);
        } else {
          console.error('Error:', res.message);
        }
      },
      error: (err) => {
        if (err.status === 401) {
          console.error('Error:', err.error.error || 'Credenciales inválidas');
        } else {
          console.error('Error en la solicitud HTTP:', err);
        }
      }
    });

  }
}
