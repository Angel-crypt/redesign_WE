import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { Login } from './pages/login/login';
import { EditProfile } from './pages/user/edit-profile/edit-profile';
import { AssignedGroups } from './pages/user/assigned-groups/assigned-groups';
import { AdminLanding } from './pages/admin/admin-landing/admin-landing';
import { AdminUsers } from './pages/admin/admin-users/admin-users';
import { Navbar } from './shared/navbar/navbar';
import { Buttons } from './shared/buttons/buttons';
import { Inputs } from './shared/inputs/inputs';

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
  
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [
    provideBrowserGlobalErrorListeners()
  ],
  bootstrap: [App]
})
export class AppModule { }
