import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
<<<<<<< HEAD
import { authGuard } from './core/guards/auth.guard';
import { roleGuard } from './core/guards/role.guard';

const routes: Routes = [
  {
    path: 'login',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
=======
import { AuthGuard } from './core/guards/auth.guard';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then(m => m.AuthModule)
  },
  {
    path: 'employees',
    loadChildren: () => import('./employees/employees.module').then(m => m.EmployeesModule),
    canActivate: [AuthGuard],
    data: { role: 'EMPLOYEE' }
  },
  {
    path: 'clients',
    loadChildren: () => import('./clients/clients.module').then(m => m.ClientsModule),
    canActivate: [AuthGuard],
    data: { role: 'CLIENT' }
>>>>>>> 481124ae13b2f8a22152d2caef26f10e9fc17528
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
<<<<<<< HEAD
    redirectTo: 'login',
    pathMatch: 'full'
  },
  {
    path: '**',
    redirectTo: 'login'
=======
    redirectTo: 'auth',
    pathMatch: 'full'
  },
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
>>>>>>> 481124ae13b2f8a22152d2caef26f10e9fc17528
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
