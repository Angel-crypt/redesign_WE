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
  private menu: MenuItem[] = [];
  private menuSubject = new BehaviorSubject<MenuItem[]>(this.menu);

  getMenu(): Observable<MenuItem[]> {
    return this.menuSubject.asObservable();
  }

  setMenu(newMenu: MenuItem[]): void {
    this.menu = newMenu;
    this.menuSubject.next(this.menu);
  }

  addMenuItem(item: MenuItem): void {
    this.menu.push(item);
    this.menuSubject.next(this.menu);
  }

  clearMenu(): void {
    this.menu = [];
    this.menuSubject.next(this.menu);
  }
}