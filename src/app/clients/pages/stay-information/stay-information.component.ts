import { Component, OnInit } from '@angular/core';
<<<<<<< HEAD:src/app/clients/pages/stay-information/stay-information.component.ts
<<<<<<< HEAD
import { RoomServiceService, Staying, ClientProfile } from '../../core/services/room-service.service';
=======
>>>>>>> 44e8b65064764c6a6a1c71d36a84e48cd8c60fcd
=======
>>>>>>> parent of 5116e8c (feat: implement stay information and employee dashboard features):src/app/clients/stay-information/stay-information.component.ts

@Component({
  selector: 'app-stay-information',
  templateUrl: './stay-information.component.html',
  styleUrls: ['./stay-information.component.scss'],
<<<<<<< HEAD:src/app/clients/pages/stay-information/stay-information.component.ts
<<<<<<< HEAD
  standalone: false,
=======
>>>>>>> parent of 5116e8c (feat: implement stay information and employee dashboard features):src/app/clients/stay-information/stay-information.component.ts
})
export class StayInformationComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

<<<<<<< HEAD:src/app/clients/pages/stay-information/stay-information.component.ts
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
=======
})
export class StayInformationComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

>>>>>>> 44e8b65064764c6a6a1c71d36a84e48cd8c60fcd
=======
>>>>>>> parent of 5116e8c (feat: implement stay information and employee dashboard features):src/app/clients/stay-information/stay-information.component.ts
}
