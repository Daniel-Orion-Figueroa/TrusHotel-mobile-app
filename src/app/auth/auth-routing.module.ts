import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GuestGuard } from '../core/guards/guest.guard';
import { LoginPage } from './pages/login/login.page';
import { RoleSelectorPage } from './pages/role-selector/role-selector.page';

const routes: Routes = [
  {
    path: 'login',
    component: LoginPage,
    canActivate: [GuestGuard]
  },
  {
    path: 'role-selector',
    component: RoleSelectorPage,
    canActivate: [GuestGuard]
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
