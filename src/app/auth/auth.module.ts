import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
<<<<<<< HEAD
<<<<<<< HEAD
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
=======
<<<<<<< HEAD:src/app/employees/employees-module.ts
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
=======
import { ReactiveFormsModule } from '@angular/forms';
>>>>>>> 481124ae13b2f8a22152d2caef26f10e9fc17528:src/app/auth/auth.module.ts
>>>>>>> 506e5932c7f1d087a62514d54b1ab6d0f6488a00

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
<<<<<<< HEAD
=======
<<<<<<< HEAD:src/app/employees/employees-module.ts
>>>>>>> 506e5932c7f1d087a62514d54b1ab6d0f6488a00
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    RouterModule.forChild(routes)
<<<<<<< HEAD
  ]
})
export class EmployeesModule { }
=======
import { ReactiveFormsModule } from '@angular/forms';



@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ReactiveFormsModule
=======
=======
    ReactiveFormsModule
>>>>>>> 481124ae13b2f8a22152d2caef26f10e9fc17528:src/app/auth/auth.module.ts
>>>>>>> 506e5932c7f1d087a62514d54b1ab6d0f6488a00
  ]
})
export class AuthModule { }
>>>>>>> 44e8b65064764c6a6a1c71d36a84e48cd8c60fcd
