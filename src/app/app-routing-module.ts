import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Login } from './pages/login/login'
import { authGuard } from './services/maestro/auth/guard';

// Rutas de maestro
import { Landing } from './pages/user/landing/landing';

const routes: Routes = [
  { path: "login", component: Login },
  { path: "landing", component: Landing, canActivate: [authGuard] },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
