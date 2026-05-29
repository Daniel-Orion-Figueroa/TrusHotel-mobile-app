import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AuthService } from './auth.service';

export interface Staying {
  stayingId: number;
  bookingId: number;
  roomId: number;
  checkInDate: string;
  checkOutDate: string;
  status: string;
  totalAmount: number;
  invoiceId: number;
}

export interface ClientProfile {
  clientId: number;
  dni: string;
  name: string;
  email: string;
  phone: string;
  address: string;
}

export interface RoomService {
  roomServiceId: number;
  name: string;
  description: string;
  price: number;
  category: string;
}

export interface RoomServiceRequest {
  requestId: number;
  stayingId: number;
  roomServiceId: number;
  clientId: number;
  employeeId: number | null;
  status: string;
  notes: string;
  quantity: number;
  unitPrice: number;
  requestedAt: string;
  assignedAt: string | null;
  completedAt: string | null;
  // UI helper fields
  roomServiceName?: string;
  clientName?: string;
  roomNumber?: string;
}

@Injectable({
  providedIn: 'root'
})
export class RoomServiceService {
  constructor(private http: HttpClient, private authService: AuthService) {}

  getClientProfile(): Observable<ClientProfile> {
    return this.http.get<ClientProfile>(
      `${environment.API_URL}/clients/me`,
      this.authService.getHeaders()
    );
  }

  getActiveStaying(): Observable<Staying> {
    return this.http.get<Staying>(
      `${environment.API_URL}/stayings/active`,
      this.authService.getHeaders()
    );
  }

  getRoomServices(): Observable<RoomService[]> {
    return this.http.get<RoomService[]>(
      `${environment.API_URL}/room-services`,
      this.authService.getHeaders()
    );
  }

  createRequest(stayingId: number, clientId: number, roomServiceId: number, quantity: number, notes: string): Observable<RoomServiceRequest> {
    const body = {
      stayingId,
      clientId,
      roomServiceId,
      quantity,
      notes
    };
    return this.http.post<RoomServiceRequest>(
      `${environment.API_URL}/service-requests`,
      body,
      this.authService.getHeaders()
    );
  }

  getRequests(): Observable<RoomServiceRequest[]> {
    return this.http.get<RoomServiceRequest[]>(
      `${environment.API_URL}/service-requests`,
      this.authService.getHeaders()
    );
  }

  cancelRequest(requestId: number, clientId: number): Observable<any> {
    const body = {
      requestId,
      clientId
    };
    return this.http.patch<any>(
      `${environment.API_URL}/service-requests/cancel`,
      body,
      this.authService.getHeaders()
    );
  }
}
