import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../environments/environment';
import { AuthService } from './auth.service';
import { RoomServiceRequest } from './room-service.service';

export interface EmployeeProfile {
  employeeId: number;
  hotelId: number;
  dni: string;
  name: string;
  email: string;
  phone: string;
  salary: number;
  workShift: string;
  active: boolean;
  type: string;
}

@Injectable({
  providedIn: 'root'
})
export class EmployeeTaskService {
  constructor(private http: HttpClient, private authService: AuthService) {}

  getEmployeeProfile(): Observable<EmployeeProfile> {
    return this.http.get<EmployeeProfile>(
      `${environment.API_URL}/employees/me`,
      this.authService.getHeaders()
    );
  }

  getMyTasks(): Observable<RoomServiceRequest[]> {
    return this.http.get<RoomServiceRequest[]>(
      `${environment.API_URL}/service-requests/my-tasks`,
      this.authService.getHeaders()
    );
  }

  startRequest(requestId: number, employeeId: number): Observable<RoomServiceRequest> {
    const body = {
      requestId,
      employeeId
    };
    return this.http.patch<RoomServiceRequest>(
      `${environment.API_URL}/service-requests/start`,
      body,
      this.authService.getHeaders()
    );
  }

  completeRequest(requestId: number, employeeId: number): Observable<RoomServiceRequest> {
    const body = {
      requestId,
      employeeId
    };
    return this.http.patch<RoomServiceRequest>(
      `${environment.API_URL}/service-requests/complete`,
      body,
      this.authService.getHeaders()
    );
  }
}
