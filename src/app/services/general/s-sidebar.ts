// src/app/services/general/s-sidebar.ts
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

  setMaestroMenu() {
    const maestroMenu: MenuItem[] = [
      { title: 'Inicio', icon: 'home', route: '/landing' },
      { title: 'Mi Perfil', icon: 'person', route: '/profile' },
      { title: 'Mis Grupos', icon: 'group', route: '/groups' },
    ];
    this.setMenu(maestroMenu);
  }

  getMenu(): Observable<MenuItem[]> {
    return this.menuSubject.asObservable();
  }

  setMenu(menu: MenuItem[]) {
    this.menuSubject.next(menu);
  }
}