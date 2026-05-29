import { Component, OnInit } from '@angular/core';
<<<<<<< HEAD
import { RoomServiceService, Staying, ClientProfile, RoomService, RoomServiceRequest } from '../../core/services/room-service.service';
=======
>>>>>>> 44e8b65064764c6a6a1c71d36a84e48cd8c60fcd

@Component({
  selector: 'app-my-requests',
  templateUrl: './my-requests.component.html',
  styleUrls: ['./my-requests.component.scss'],
<<<<<<< HEAD
  standalone: false,
})
export class MyRequestsComponent implements OnInit {
  staying: Staying | null = null;
  client: ClientProfile | null = null;
  services: RoomService[] = [];
  requests: RoomServiceRequest[] = [];

  loading = true;
  errorMsg = '';

  constructor(private roomService: RoomServiceService) { }

  ngOnInit() {
    this.fetchData();
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
            this.roomService.getRoomServices().subscribe({
              next: (services) => {
                this.services = services;
                this.loadRequests();
              },
              error: (err) => {
                this.loading = false;
                this.errorMsg = 'Error al cargar la información de servicios.';
                console.error(err);
              }
            });
          },
          error: (err) => {
            this.loading = false;
            this.errorMsg = 'No tienes una estadía activa registrada.';
            console.error(err);
          }
        });
      },
      error: (err) => {
        this.loading = false;
        this.errorMsg = 'Error de autenticación o perfil del cliente.';
        console.error(err);
      }
    });
  }

  loadRequests() {
    this.roomService.getRequests().subscribe({
      next: (reqs) => {
        if (this.staying) {
          const activeStayingId = this.staying.stayingId;
          this.requests = reqs
            .filter(r => r.stayingId === activeStayingId)
            .map(r => {
              const matchedService = this.services.find(s => s.roomServiceId === r.roomServiceId);
              return {
                ...r,
                roomServiceName: matchedService ? matchedService.name : `Servicio #${r.roomServiceId}`
              };
            })
            .sort((a, b) => new Date(b.requestedAt).getTime() - new Date(a.requestedAt).getTime());
        }
        this.loading = false;
      },
      error: (err) => {
        this.loading = false;
        this.errorMsg = 'Error al cargar tus pedidos.';
        console.error(err);
      }
    });
  }

  cancelReq(requestId: number) {
    if (!this.client) return;

    this.loading = true;
    this.roomService.cancelRequest(requestId, this.client.clientId).subscribe({
      next: () => {
        this.loadRequests();
      },
      error: (err) => {
        this.loading = false;
        alert(err.error?.message || 'No se pudo cancelar el pedido.');
      }
    });
  }

  getStatusColor(status: string): string {
    switch (status.toUpperCase()) {
      case 'PENDING': return 'warning';
      case 'ASSIGNED': return 'primary';
      case 'ON_PROGRESS': return 'secondary';
      case 'COMPLETED': return 'success';
      case 'CANCELED': return 'danger';
      default: return 'medium';
    }
  }

  getStatusName(status: string): string {
    switch (status.toUpperCase()) {
      case 'PENDING': return 'Pendiente';
      case 'ASSIGNED': return 'Asignado';
      case 'ON_PROGRESS': return 'En Progreso';
      case 'COMPLETED': return 'Completado';
      case 'CANCELED': return 'Cancelado';
      default: return status;
    }
  }
=======
})
export class MyRequestsComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

>>>>>>> 44e8b65064764c6a6a1c71d36a84e48cd8c60fcd
}
