import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { roleGuard } from './core/guards/role.guard';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: 'client',
    canActivate: [authGuard, roleGuard],
    data: { roles: ['ROLE_CLIENT'] },
    loadChildren: () => import('./clients/clients-module').then( m => m.ClientsModule)
  },
  {
    path: 'employee',
    canActivate: [authGuard, roleGuard],
    data: { roles: ['ROLE_PERSONNEL', 'ROLE_ADMIN', 'ROLE_MANAGER', 'ROLE_RECEPTIONIST'] },
    loadChildren: () => import('./employees/employees-module').then( m => m.EmployeesModule)
  },
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'login'
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
