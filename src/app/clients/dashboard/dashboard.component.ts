import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../core/services/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss'],
  standalone: false,
})
export class DashboardComponent implements OnInit {
  userName = '';

  constructor(private authService: AuthService) { }

  ngOnInit() {
    const user = this.authService.getCurrentUser();
    if (user) {
      this.userName = user.name;
    }
  }

  logout() {
    this.authService.logout();
  }
}
