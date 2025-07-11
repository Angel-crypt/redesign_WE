import { NgModule, provideBrowserGlobalErrorListeners } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing-module';
import { App } from './app';
import { Login } from './pages/login/login';
import { Landing } from './pages/landing/landing';
import { EditarPerfil } from './pages/editar-perfil/editar-perfil';
import { GruposAsignados } from './pages/grupos-asignados/grupos-asignados';

@NgModule({
  declarations: [
    App,
    Login,
    Landing,
    EditarPerfil,
    GruposAsignados,
  
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
