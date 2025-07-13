import { Component } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.html',
  standalone: false,
  styleUrl: './app.less',
})
export class App {
  protected title = 'redesign_WE';
  constructor(private router: Router) {}
  isNotLoginPage(): boolean {
    return this.router.url !== '/login';
  }
}
