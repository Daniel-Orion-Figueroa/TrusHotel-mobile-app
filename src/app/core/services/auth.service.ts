import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

export interface UserSession {
  name: string;
  email: string;
  role: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private currentUserSubject = new BehaviorSubject<UserSession | null>(null);
  public currentUser$ = this.currentUserSubject.asObservable();

  constructor(private http: HttpClient, private router: Router) {
    this.loadSession();
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post<any>(`${environment.API_URL}/auth/login`, { email, password })
      .pipe(
        tap(response => {
          if (response && response.token) {
            localStorage.setItem('auth_token', response.token);
            this.loadSession();
          }
        })
      );
  }

  logout() {
    localStorage.removeItem('auth_token');
    this.currentUserSubject.next(null);
    this.router.navigate(['/login']);
  }

  isLoggedIn(): boolean {
    return !!localStorage.getItem('auth_token');
  }

  getToken(): string | null {
    return localStorage.getItem('auth_token');
  }

  getHeaders() {
    const token = this.getToken();
    return {
      headers: {
        'Authorization': token ? `Bearer ${token}` : '',
        'Content-Type': 'application/json'
      }
    };
  }

  getCurrentUser(): UserSession | null {
    return this.currentUserSubject.value;
  }

  private loadSession() {
    const token = this.getToken();
    if (token) {
      const decoded = this.decodeToken(token);
      if (decoded) {
        const userSession: UserSession = {
          name: decoded.user || 'Usuario',
          email: decoded.sub || '',
          role: decoded.role || ''
        };
        this.currentUserSubject.next(userSession);
      } else {
        this.currentUserSubject.next(null);
      }
    } else {
      this.currentUserSubject.next(null);
    }
  }

  private decodeToken(token: string): any {
    try {
      const parts = token.split('.');
      if (parts.length !== 3) return null;
      // Decode base64 URL safe string
      const payload = parts[1].replace(/-/g, '+').replace(/_/g, '/');
      return JSON.parse(atob(payload));
    } catch (e) {
      console.error('Error decoding token', e);
      return null;
    }
  }
}
