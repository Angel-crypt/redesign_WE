import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

export interface MenuItem {
  title: string;
  icon?: string;
  route?: string;
  action?: string;
}

@Injectable({
  providedIn: 'root',
})
export class SSidebar {
  private menuSubject = new BehaviorSubject<MenuItem[]>([]);
  private hasBeenInitialized = false;

  setMaestroMenu() {
    const maestroMenu: MenuItem[] = [
      { title: 'Inicio', icon: 'home', route: '/landing' },
      { title: 'Mi Perfil', icon: 'person', route: '/profile' },
      { title: 'Mis Grupos', icon: 'assignment', route: '/groups' },
    ];
    this.hasBeenInitialized = true;
    this.setMenu(maestroMenu);
  }

  setAdminMenu() {
    const adminMenu: MenuItem[] = [
      { title: 'Dashboard', icon: 'dashboard', route: '/admin/landing' },
      { title: 'Gestión de Maestros', icon: 'people', route: '/admin/maestros' },
      { title: 'Cursos', icon: 'school', route: '/admin/cursos' },
    ];
    this.setMenu(adminMenu);
  }

  getMenu(): Observable<MenuItem[]> {
    return this.menuSubject.asObservable();
  }

  setMenu(menu: MenuItem[]) {
    this.menuSubject.next(menu);
  }

  isInitialized(): boolean {
    return this.hasBeenInitialized;
  }

  initializeMaestroMenuIfNeeded() {
    if (!this.hasBeenInitialized) {
      this.setMaestroMenu();
    }
  }

  initializeAdminMenuIfNeeded() {
    if (!this.hasBeenInitialized) {
      this.setAdminMenu();
    }
  }
}
