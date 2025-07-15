import { Component, OnInit } from '@angular/core';
import { SSidebar } from '../../../../services/general/s-sidebar';

@Component({
  selector: 'app-profile-page',
  standalone: false,
  templateUrl: './profile-page.html',
  styleUrl: './profile-page.less'
})
export class ProfilePage implements OnInit {
  constructor(private sidebarService: SSidebar) {}

  ngOnInit() {
    this.sidebarService.setMaestroMenu();
  }

}
