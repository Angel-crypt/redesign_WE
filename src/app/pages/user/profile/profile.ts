import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../../../services/maestro/profile/profile-service';
import { SSidebar } from '../../../services/general/s-sidebar';
import { Maestro } from '../../../interfaces/entities';

@Component({
  selector: 'app-profile',
  standalone: false,
  templateUrl: './profile.html',
  styleUrl: './profile.less'
})
export class Profile {
  maestroData: Maestro | null = null;
  loading: boolean = true;
  error: string | null = null;

  constructor(private profileService: ProfileService, private sidebarService: SSidebar) { }

  ngOnInit(): void {
    this.sidebarService.setMaestroMenu();
    this.profileService.getPerfilData().subscribe({
      next: (res) => {
        if (res.success) {
          this.maestroData = res.data!;
          console.log(this.maestroData);
        } else {
          this.error = 'No se pudieron cargar los datos del perfil';
        }
        this.loading = false;
      },
      error: (err) => {
        this.error = 'Ocurrió un error al consultar el perfil';
        this.loading = false;
        console.error(err);
      }
    })
  }
}
