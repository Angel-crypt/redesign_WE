import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { MaestroAuthService } from './s-auth';
import { map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

export const authGuard: CanActivateFn = () => {
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
