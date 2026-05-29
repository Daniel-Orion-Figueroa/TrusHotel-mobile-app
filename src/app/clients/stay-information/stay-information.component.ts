import { Component, OnInit } from '@angular/core';
import { RoomServiceService, Staying, ClientProfile } from '../../core/services/room-service.service';

@Component({
  selector: 'app-stay-information',
  templateUrl: './stay-information.component.html',
  styleUrls: ['./stay-information.component.scss'],
  standalone: false,
})
export class StayInformationComponent implements OnInit {
  staying: Staying | null = null;
  client: ClientProfile | null = null;
  loading = true;
  errorMsg = '';

  constructor(private roomService: RoomServiceService) { }

  ngOnInit() {
    this.fetchData();
  }

  onClickOnStayCard() {
    console.log("click")
  }
  fetchData() {
    this.loading = true;
    this.errorMsg = '';

    this.roomService.getClientProfile().subscribe({
      next: (profile) => {
        this.client = profile;
        this.roomService.getActiveStaying().subscribe({
          next: (stay) => {
            this.staying = stay;
            this.loading = false;
          },
          error: (err) => {
            this.loading = false;
            this.errorMsg = 'No se encontró una estadía activa para tu cuenta.';
            console.error('Error fetching staying', err);
          }
        });
      },
      error: (err) => {
        this.loading = false;
        this.errorMsg = 'No se pudo cargar el perfil del cliente. Verifica tu sesión.';
        console.error('Error fetching profile', err);
      }
    });
  }
}
