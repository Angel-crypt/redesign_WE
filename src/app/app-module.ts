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

import { EditProfile } from './pages/user/edit-profile/edit-profile';
import { AssignedGroups } from './pages/user/assigned-groups/assigned-groups';
import { AdminLanding } from './pages/admin/admin-landing/admin-landing';
import { AdminUsers } from './pages/admin/admin-users/admin-users';
import { Navbar } from './shared/navbar/navbar';
import { Buttons } from './shared/buttons/buttons';
import { Inputs } from './shared/inputs/inputs';
import { Sidebar } from './shared/sidebar/sidebar';
import { ButtonAction } from './shared/button-action/button-action';
import { InputForm } from './shared/input-form/input-form';


@NgModule({
  declarations: [
    App,
    Login,
    EditProfile,
    AssignedGroups,
    AdminLanding,
    AdminUsers,
    Navbar,
    Buttons,
    Inputs,
    Landing,
    Sidebar,
    ButtonAction,
    InputForm
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
