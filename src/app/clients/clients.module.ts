import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
<<<<<<< HEAD
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { DashboardComponent } from './dashboard/dashboard.component';
import { StayInformationComponent } from './stay-information/stay-information.component';
import { CreateServiceRequestComponent } from './create-service-request/create-service-request.component';
import { MyRequestsComponent } from './my-requests/my-requests.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      { path: 'stay', component: StayInformationComponent },
      { path: 'request', component: CreateServiceRequestComponent },
      { path: 'requests', component: MyRequestsComponent },
      { path: '', redirectTo: 'stay', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  declarations: [
    DashboardComponent,
    StayInformationComponent,
    CreateServiceRequestComponent,
    MyRequestsComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    RouterModule.forChild(routes)
=======



@NgModule({
  declarations: [],
  imports: [
    CommonModule
>>>>>>> 44e8b65064764c6a6a1c71d36a84e48cd8c60fcd
  ]
})
export class ClientsModule { }
