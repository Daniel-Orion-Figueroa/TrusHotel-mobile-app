import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
<<<<<<< HEAD
import { Router } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { tap } from 'rxjs/operators';
import { environment } from '../../../environments/environment';

export interface UserSession {
  name: string;
  email: string;
  role: string;
}
=======
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { tap, catchError, finalize } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { LoginDTO, JwtTokenDTO, User, AuthState } from '../models/auth.models';
import { StorageService } from './storage.service';
<<<<<<< HEAD
>>>>>>> 44e8b65064764c6a6a1c71d36a84e48cd8c60fcd
=======
>>>>>>> 481124ae13b2f8a22152d2caef26f10e9fc17528
>>>>>>> 506e5932c7f1d087a62514d54b1ab6d0f6488a00

@Injectable({
  providedIn: 'root'
})
export class AuthService {
<<<<<<< HEAD
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
=======
  private apiUrl = `${environment.api_url}/auth`;
  
  private authState = new BehaviorSubject<AuthState>({
    isAuthenticated: false,
    user: null,
    accessToken: null,
    refreshToken: null,
    loading: false,
    error: null
  });

  public authState$ = this.authState.asObservable();

  constructor(
    private http: HttpClient,
    private storage: StorageService
  ) {
    this.initializeAuth();
  }

  /**
   * Initialize authentication from stored tokens
   */
  private async initializeAuth(): Promise<void> {
    try {
      const token = await this.storage.getToken();
      const user = await this.storage.getUser();
      const refreshToken = await this.storage.getRefreshToken();

      if (token && user) {
        this.authState.next({
          isAuthenticated: true,
          user,
          accessToken: token,
          refreshToken: refreshToken || null,
          loading: false,
          error: null
        });
      }
    } catch (error) {
      console.error('Error initializing auth:', error);
    }
  }

  /**
   * Login user with email and DNI
   */
  login(credentials: LoginDTO): Observable<JwtTokenDTO> {
    this.updateAuthState({ loading: true, error: null });

    return this.http.post<JwtTokenDTO>(`${this.apiUrl}/login`, credentials).pipe(
      tap(async (response) => {
        await this.storage.setToken(response.accessToken);
        await this.storage.setRefreshToken(response.refreshToken);
        await this.storage.setUser(response.user);

        this.updateAuthState({
          isAuthenticated: true,
          user: response.user,
          accessToken: response.accessToken,
          refreshToken: response.refreshToken,
          loading: false,
          error: null
        });
      }),
      catchError((error) => {
        const errorMsg = error?.error?.message || 'Login failed. Please try again.';
        this.updateAuthState({
          loading: false,
          error: errorMsg
        });
        return throwError(() => error);
      })
    );
  }

  /**
   * Refresh access token using refresh token
   */
  refreshToken(): Observable<JwtTokenDTO> {
    const currentState = this.authState.value;
    const refreshToken = currentState.refreshToken;

    if (!refreshToken) {
      return throwError(() => new Error('No refresh token available'));
    }

    return this.http.post<JwtTokenDTO>(`${this.apiUrl}/refresh`, { refreshToken }).pipe(
      tap(async (response) => {
        await this.storage.setToken(response.accessToken);
        await this.storage.setRefreshToken(response.refreshToken);

        this.updateAuthState({
          accessToken: response.accessToken,
          refreshToken: response.refreshToken
        });
      }),
      catchError((error) => {
        this.logout();
        return throwError(() => error);
      })
    );
  }

  /**
   * Logout user
   */
  async logout(): Promise<void> {
    await this.storage.clearAuth();
    this.authState.next({
      isAuthenticated: false,
      user: null,
      accessToken: null,
      refreshToken: null,
      loading: false,
      error: null
    });
  }

  /**
   * Get current authentication state
   */
  getAuthState(): AuthState {
    return this.authState.value;
  }

  /**
   * Get current user
   */
  getCurrentUser(): User | null {
    return this.authState.value.user;
  }

  /**
   * Get current access token
   */
  getAccessToken(): string | null {
    return this.authState.value.accessToken;
  }

  /**
   * Check if user is authenticated
   */
  isAuthenticated(): boolean {
    return this.authState.value.isAuthenticated;
  }

  /**
   * Check if user has specific role
   */
  hasRole(role: 'EMPLOYEE' | 'CLIENT'): boolean {
    return this.authState.value.user?.role === role;
  }

  /**
   * Update auth state (internal helper)
   */
  private updateAuthState(partial: Partial<AuthState>): void {
    const currentState = this.authState.value;
    this.authState.next({ ...currentState, ...partial });
  }
<<<<<<< HEAD
>>>>>>> 44e8b65064764c6a6a1c71d36a84e48cd8c60fcd
=======
>>>>>>> 481124ae13b2f8a22152d2caef26f10e9fc17528
>>>>>>> 506e5932c7f1d087a62514d54b1ab6d0f6488a00
}
