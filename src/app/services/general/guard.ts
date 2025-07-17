import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { MaestroAuthService } from '../maestro/auth/s-auth';
import { AdminAuthService } from '../admin/s-aauth';
import { map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

export const authGuard: CanActivateFn = (isAdmin) => {
  const authService = inject(MaestroAuthService);
  const adminAuthService = inject(AdminAuthService);
  const router = inject(Router);

  const service = isAdmin ? adminAuthService : authService;

  return service.checkSession().pipe(
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
