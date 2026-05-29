import { Component, OnInit } from '@angular/core';
<<<<<<< HEAD:src/app/clients/pages/create-service-request/create-service-request.component.ts
<<<<<<< HEAD
import {
  RoomServiceService,
  Staying,
  ClientProfile,
  RoomService,
} from '../../core/services/room-service.service';
import { Router } from '@angular/router';
=======
>>>>>>> 44e8b65064764c6a6a1c71d36a84e48cd8c60fcd
=======
>>>>>>> parent of 5116e8c (feat: implement stay information and employee dashboard features):src/app/clients/create-service-request/create-service-request.component.ts

@Component({
  selector: 'app-create-service-request',
  templateUrl: './create-service-request.component.html',
  styleUrls: ['./create-service-request.component.scss'],
<<<<<<< HEAD:src/app/clients/pages/create-service-request/create-service-request.component.ts
<<<<<<< HEAD
  standalone: false,
=======
>>>>>>> parent of 5116e8c (feat: implement stay information and employee dashboard features):src/app/clients/create-service-request/create-service-request.component.ts
})
export class CreateServiceRequestComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

<<<<<<< HEAD:src/app/clients/pages/create-service-request/create-service-request.component.ts
  constructor(
    private roomService: RoomServiceService,
    private router: Router,
  ) {}

  ngOnInit() {
    this.fetchData();
  }

  fetchData() {
    this.loading = true;
    this.errorMsg = '';
    console.log(this.selectedServiceId);

    this.roomService.getClientProfile().subscribe({
      next: (profile) => {
        this.client = profile;
        console.log('cliente ', this.client);
        this.roomService.getActiveStaying().subscribe({
          next: (stay) => {
            this.staying = stay;
            console.log('estadia ', this.staying);
            this.roomService.getRoomServices().subscribe({
              next: (services) => {
                this.services = services;
                this.loading = false;
              },
              error: (err) => {
                this.loading = false;
                this.errorMsg = 'Error al cargar los servicios disponibles.';
                console.error('Error fetching services', err);
              },
            });
          },
          error: (err) => {
            this.loading = false;
            this.errorMsg =
              'Debes tener una estadía activa para solicitar servicios de habitación.';
            console.error('Error fetching staying', err);
          },
        });
      },
      error: (err) => {
        this.loading = false;
        this.errorMsg = 'Error de autenticación o perfil de usuario.';
        console.error('Error fetching profile', err);
      },
    });
  }

  incrementQty() {
    if (this.quantity < 10) {
      this.quantity++;
    }
  }

  decrementQty() {
    if (this.quantity > 1) {
      this.quantity--;
    }
  }

  selectService(serviceId: any) {
    console.log('Service selected:', serviceId);
    this.selectedServiceId = serviceId;
    this.notes = '';
    this.quantity = 1;
    console.log('selected service id ' + this.selectedServiceId);
  }

  trackByService(index: number, service: RoomService) {
    return service.roomServiceId;
  }

  getSelectedService() {
    return this.services.find(
      (s) => s.roomServiceId === this.selectedServiceId,
    );
  }

  onSubmit() {
    if (!this.staying || !this.client || !this.selectedServiceId) {
      return;
    }

    this.submitting = true;
    this.errorMsg = '';

    this.roomService
      .createRequest(
        this.staying.stayingId,
        this.client.clientId,
        this.selectedServiceId,
        this.quantity,
        this.notes,
      )
      .subscribe({
        next: () => {
          this.submitting = false;
          this.success = true;
          this.selectedServiceId = null;
          this.quantity = 1;
          this.notes = '';
          setTimeout(() => {
            this.success = false;
            this.router.navigate(['/client/requests']);
          }, 2000);
        },
        error: (err) => {
          this.submitting = false;
          this.errorMsg = err.error?.message || 'Error al enviar la solicitud.';
          console.error('Error creating request', err);
        },
      });
  }
=======
})
export class CreateServiceRequestComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

>>>>>>> 44e8b65064764c6a6a1c71d36a84e48cd8c60fcd
=======
>>>>>>> parent of 5116e8c (feat: implement stay information and employee dashboard features):src/app/clients/create-service-request/create-service-request.component.ts
}
