import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { Login } from './pages/login/login'
import { maestroAuthGuard, adminAuthGuard } from './services/general/guard';

// Rutas de maestro
import { Landing } from './pages/user/landing/landing';
import { ProfilePage } from './pages/user/profile/profile-page/profile-page';
import { AssignedGroups } from './pages/user/assigned-groups/assigned-groups';

// Rutas de administrador
import { AdminLanding } from './pages/admin/admin-landing/admin-landing';
import { AdminMaestros } from './pages/admin/admin-maestros/admin-maestros';

const routes: Routes = [
  { path: 'login', component: Login },
  // Rutas de maestro
  {
    path: 'landing',
    component: Landing,
    canActivate: [maestroAuthGuard]
  },
  {
    path: 'profile',
    component: ProfilePage,
    canActivate: [maestroAuthGuard]
  },
  {
    path: 'groups',
    component: AssignedGroups,
    canActivate: [maestroAuthGuard],
  },
  // Rutas de administrador
  {
    path: 'admin/landing',
    component: AdminLanding,
    canActivate: [adminAuthGuard],
  },
  {
    path: 'admin/maestros',
    component: AdminMaestros,
    canActivate: [adminAuthGuard]
  },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
