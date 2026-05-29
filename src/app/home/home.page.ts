import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../core/services/auth.service';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage {
  email = '';
  password = '';
  loading = false;
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) {
    if (this.authService.isLoggedIn()) {
      this.redirectUser();
    }
  }

  onLogin() {
    if (!this.email || !this.password) {
      this.errorMessage = 'Por favor, ingrese correo y contraseña.';
      return;
    }

    this.loading = true;
    this.errorMessage = '';

    this.authService.login(this.email, this.password).subscribe({
      next: () => {
        this.loading = false;
        this.redirectUser();
      },
      error: (err) => {
        this.loading = false;
        this.errorMessage = err.error?.message || 'Credenciales inválidas o error de conexión.';
      }
    });
  }

  private redirectUser() {
    const user = this.authService.getCurrentUser();
    if (user) {
      if (user.role === 'ROLE_CLIENT') {
        this.router.navigate(['/client']);
      } else {
        this.router.navigate(['/employee']);
      }
    }
  }
}
