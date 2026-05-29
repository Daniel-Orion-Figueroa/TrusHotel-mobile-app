import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable, throwError } from 'rxjs';
import { tap, catchError, finalize } from 'rxjs/operators';
import { environment } from '../../../environments/environment';
import { LoginDTO, JwtTokenDTO, User, AuthState } from '../models/auth.models';
import { StorageService } from './storage.service';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
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
}
