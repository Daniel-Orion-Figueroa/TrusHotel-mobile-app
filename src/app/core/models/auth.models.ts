/**
 * Authentication Models and Interfaces
 */

export interface LoginDTO {
  email: string;
  dni: string;
}

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'EMPLOYEE' | 'CLIENT';
  department?: string;
  phone?: string;
  country?: string;
  city?: string;
}

export interface JwtTokenDTO {
  accessToken: string;
  refreshToken: string;
  user: User;
}

export interface AuthResponse {
  success: boolean;
  message: string;
  data?: JwtTokenDTO;
}

export interface AuthState {
  isAuthenticated: boolean;
  user: User | null;
  accessToken: string | null;
  refreshToken: string | null;
  loading: boolean;
  error: string | null;
}
