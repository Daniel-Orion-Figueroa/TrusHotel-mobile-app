import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';

@Component({
  selector: 'app-role-selector',
  templateUrl: './role-selector.page.html',
  styleUrls: ['./role-selector.page.scss']
})
export class RoleSelectorPage {
  constructor(
    private router: Router,
    private authService: AuthService
  ) {}

  selectRole(role: 'EMPLOYEE' | 'CLIENT'): void {
    if (role === 'EMPLOYEE') {
      this.router.navigate(['/employees/dashboard']);
    } else {
      this.router.navigate(['/clients/dashboard']);
    }
  }
}
