import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
<<<<<<< HEAD:src/app/employees/employees-module.ts
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
=======
import { ReactiveFormsModule } from '@angular/forms';
>>>>>>> 481124ae13b2f8a22152d2caef26f10e9fc17528:src/app/auth/auth.module.ts

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
<<<<<<< HEAD:src/app/employees/employees-module.ts
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    RouterModule.forChild(routes)
=======
    ReactiveFormsModule
>>>>>>> 481124ae13b2f8a22152d2caef26f10e9fc17528:src/app/auth/auth.module.ts
  ]
})
export class AuthModule { }
