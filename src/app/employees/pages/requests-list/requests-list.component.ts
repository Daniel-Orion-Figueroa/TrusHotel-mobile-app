import { Component, OnInit } from '@angular/core';
<<<<<<< HEAD:src/app/employees/pages/requests-list/requests-list.component.ts
<<<<<<< HEAD
import { EmployeeTaskService, EmployeeProfile } from '../../core/services/employee-task.service';
import { RoomServiceService, RoomService, RoomServiceRequest } from '../../core/services/room-service.service';
=======
>>>>>>> 44e8b65064764c6a6a1c71d36a84e48cd8c60fcd
=======
>>>>>>> parent of 5116e8c (feat: implement stay information and employee dashboard features):src/app/employees/requests-list/requests-list.component.ts

@Component({
  selector: 'app-requests-list',
  templateUrl: './requests-list.component.html',
  styleUrls: ['./requests-list.component.scss'],
<<<<<<< HEAD:src/app/employees/pages/requests-list/requests-list.component.ts
<<<<<<< HEAD
  standalone: false
=======
>>>>>>> parent of 5116e8c (feat: implement stay information and employee dashboard features):src/app/employees/requests-list/requests-list.component.ts
})
export class RequestsListComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

<<<<<<< HEAD:src/app/employees/pages/requests-list/requests-list.component.ts
  fetchData() {
    this.loading = true;
    this.errorMsg = '';

    this.taskService.getEmployeeProfile().subscribe({
      next: (profile) => {
        this.employee = profile;
        this.roomService.getRoomServices().subscribe({
          next: (services) => {
            this.services = services;
            this.loadTasks();
          },
          error: (err) => {
            this.loading = false;
            this.errorMsg = 'Error al cargar los servicios de habitación.';
            console.error(err);
          }
        });
      },
      error: (err) => {
        this.loading = false;
        this.errorMsg = 'Error al cargar el perfil del empleado. Inicie sesión de nuevo.';
        console.error(err);
      }
    });
  }

  loadTasks() {
    this.taskService.getMyTasks().subscribe({
      next: (reqs) => {
        this.tasks = reqs.map(r => {
          const matchedService = this.services.find(s => s.roomServiceId === r.roomServiceId);
          return {
            ...r,
            roomServiceName: matchedService ? matchedService.name : `Servicio #${r.roomServiceId}`
          };
        }).sort((a, b) => new Date(b.requestedAt).getTime() - new Date(a.requestedAt).getTime());
        this.loading = false;
      },
      error: (err) => {
        this.loading = false;
        this.errorMsg = 'Error al cargar las tareas asignadas.';
        console.error(err);
      }
    });
  }

  startTask(requestId: number) {
    if (!this.employee) return;
    this.loading = true;
    this.taskService.startRequest(requestId, this.employee.employeeId).subscribe({
      next: () => {
        this.loadTasks();
      },
      error: (err) => {
        this.loading = false;
        alert(err.error?.message || 'Error al iniciar la tarea.');
      }
    });
  }

  completeTask(requestId: number) {
    if (!this.employee) return;
    this.loading = true;
    this.taskService.completeRequest(requestId, this.employee.employeeId).subscribe({
      next: () => {
        this.loadTasks();
      },
      error: (err) => {
        this.loading = false;
        alert(err.error?.message || 'Error al completar la tarea.');
      }
    });
  }

  getStatusBadgeClass(status: string): string {
    switch (status.toUpperCase()) {
      case 'PENDING': return 'pending';
      case 'ASSIGNED': return 'assigned';
      case 'ON_PROGRESS': return 'progress';
      case 'COMPLETED': return 'completed';
      case 'CANCELED': return 'canceled';
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
export class RequestsListComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

>>>>>>> 44e8b65064764c6a6a1c71d36a84e48cd8c60fcd
=======
>>>>>>> parent of 5116e8c (feat: implement stay information and employee dashboard features):src/app/employees/requests-list/requests-list.component.ts
}
