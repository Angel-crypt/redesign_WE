import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { MaestroAuthService } from '../maestro/auth/s-auth';
import { AdminAuthService } from '../admin/s-aauth';
import { map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

// Guard para maestros
export const maestroAuthGuard: CanActivateFn = (route, state) => {
  const authService = inject(MaestroAuthService);
  const router = inject(Router);

  return authService.checkSession().pipe(
    map((authenticated) => {
      if (authenticated) return true;
      router.navigate(['/login']);
      return false;
    }),
    catchError(() => {
      router.navigate(['/login']);
      return of(false);
    })
  );
};

// Guard para administradores
export const adminAuthGuard: CanActivateFn = (route, state) => {
  const adminAuthService = inject(AdminAuthService);
  const router = inject(Router);

  return adminAuthService.checkSession().pipe(
    map((authenticated) => {
      if (authenticated) return true;
      router.navigate(['/login']);
      return false;
    }),
    catchError(() => {
      router.navigate(['/login']);
      return of(false);
    })
  );
};
