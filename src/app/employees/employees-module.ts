import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';

import { DashboardComponent } from './dashboard/dashboard.component';
import { RequestsListComponent } from './requests-list/requests-list.component';

const routes: Routes = [
  {
    path: '',
    component: DashboardComponent,
    children: [
      { path: 'tasks', component: RequestsListComponent },
      { path: '', redirectTo: 'tasks', pathMatch: 'full' }
    ]
  }
];

@NgModule({
  declarations: [
    DashboardComponent,
    RequestsListComponent
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    RouterModule.forChild(routes)
  ]
})
export class EmployeesModule { }
