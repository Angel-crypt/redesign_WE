import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { Login } from './pages/login/login';
import { Landing } from './pages/user/landing/landing';

import { AssignedGroups } from './pages/user/assigned-groups/assigned-groups';
import { AdminLanding } from './pages/admin/admin-landing/admin-landing';
import { AdminMaestros } from './pages/admin/admin-maestros/admin-maestros';
import { Navbar } from './shared/navbar/navbar';
import { Buttons } from './shared/buttons/buttons';
import { Inputs } from './shared/inputs/inputs';
import { Sidebar } from './shared/sidebar/sidebar';
import { ButtonAction } from './shared/button-action/button-action';
import { InputForm } from './shared/input-form/input-form';
import { Assignments } from './pages/user/landing/components/assignments/assignments';
import { Availability } from './pages/user/landing/components/availability/availability';
import { SelectEspecialidadComponent } from './shared/select-especialidad/select-especialidad';
import { DatosPerfil } from './pages/user/profile/datos-perfil/datos-perfil';
import { ProfilePage } from './pages/user/profile/profile-page/profile-page';
import { DisponibilidadCalendar } from './pages/user/profile/disponibilidad-calendar/disponibilidad-calendar';
import { AssignmentCard } from './pages/user/assigned-groups/assignment-card/assignment-card';
import { StudentsSection } from './pages/user/assigned-groups/students-list/students-list';
import { DataShow } from './pages/admin/admin-landing/components/data-show/data-show';
import { DataMaestro } from './pages/admin/admin-maestros/components/data-maestro/data-maestro';
@NgModule({
  declarations: [
    App,
    Login,
    AssignedGroups,
    AdminLanding,
    AdminMaestros,
    Navbar,
    Buttons,
    Inputs,
    Landing,
    Sidebar,
    ButtonAction,
    InputForm,
    Assignments,
    Availability,
    SelectEspecialidadComponent,
    DatosPerfil,
    ProfilePage,
    DisponibilidadCalendar,
    AssignmentCard,
    StudentsSection,
    DataShow,
    DataMaestro,
  ],
  imports: [
    BrowserModule,
    CommonModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [provideBrowserGlobalErrorListeners()],
  bootstrap: [App],
})
export class AppModule {}
