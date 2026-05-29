import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';
import { EmployeeTaskService, EmployeeProfile } from '../../core/services/employee-task.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  standalone: false,
})
export class DashboardComponent implements OnInit {
  employee: EmployeeProfile | null = null;

  constructor(private authService: AuthService, private taskService: EmployeeTaskService) { }

  ngOnInit() {
    this.taskService.getEmployeeProfile().subscribe({
      next: (profile) => {
        this.employee = profile;
      },
      error: (err) => {
        console.error('Error fetching employee profile', err);
      }
    });
  }

  logout() {
    this.authService.logout();
  }
}
