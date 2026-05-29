import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms'; // <-- Agrega ReactiveFormsModule
import { LoginPage } from './login.page';
import { IonHeader } from "@ionic/angular/standalone";
import { IonicModule } from "@ionic/angular";

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule // <-- Añádelo aquí
    ,
    IonHeader,
    IonicModule
],
  declarations: [LoginPage]
})
export class LoginModule {}
