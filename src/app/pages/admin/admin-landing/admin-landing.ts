import { Component, OnInit } from '@angular/core';
import { SSidebar } from '../../../services/general/s-sidebar';

@Component({
  selector: 'app-admin-landing',
  standalone: false,
  templateUrl: './admin-landing.html',
  styleUrl: './admin-landing.less'
})
export class AdminLanding implements OnInit {
  constructor(private sidebarService: SSidebar) {
  }

  ngOnInit(): void {
    this.sidebarService.setAdminMenu();
  }
}
