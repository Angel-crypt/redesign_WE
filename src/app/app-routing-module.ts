import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Login } from './pages/login/login'
import { authGuard } from './services/general/guard';

// Rutas de maestro
import { Landing } from './pages/user/landing/landing';
import { ProfilePage } from './pages/user/profile/profile-page/profile-page';
import { AssignedGroups } from './pages/user/assigned-groups/assigned-groups';

// Rutas de administrador
import { AdminLanding } from './pages/admin/admin-landing/admin-landing';

const routes: Routes = [
  { path: "login", component: Login },
  { path: "landing", component: Landing, canActivate: [authGuard] },
  { path: "profile", component: ProfilePage, canActivate: [authGuard] },
  { path: "groups", component: AssignedGroups, canActivate: [authGuard] },
  { path: "admin/landing", component: AdminLanding, canActivate: [authGuard] },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
