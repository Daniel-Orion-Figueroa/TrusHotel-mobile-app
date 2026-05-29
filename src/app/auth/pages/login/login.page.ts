import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../../core/services/auth.service';
import { IonHeader, IonToolbar, IonTitle, IonContent, IonIcon, IonItem, IonLabel, IonInput, IonText, IonAlert, IonButton, IonSpinner } from "@ionic/angular/standalone";

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false
})
export class LoginPage implements OnInit {
  loginForm!: FormGroup;
  isLoading = false;
  error: string | null = null;

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.initializeForm();
  }

  private initializeForm(): void {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      dni: ['', [Validators.required, Validators.minLength(8)]]
    });
  }

  onLogin(): void {
    if (this.loginForm.invalid) {
      return;
    }

    this.isLoading = true;
    this.error = null;

    this.authService.login(this.loginForm.value).subscribe({
      next: (response) => {
        this.isLoading = false;
        // Navigate based on user role
        const user = this.authService.getCurrentUser();
        if (user?.role === 'EMPLOYEE') {
          this.router.navigate(['/employees/dashboard']);
        } else {
          this.router.navigate(['/clients/dashboard']);
        }
      },
      error: (error) => {
        this.isLoading = false;
        this.error = error?.error?.message || 'Error al iniciar sesión. Intenta de nuevo.';
        console.error('Login error:', error);
      }
    });
  }
}
