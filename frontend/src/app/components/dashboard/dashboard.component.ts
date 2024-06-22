import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import { ToasterService } from '../../services/toaster.service';
import { DashboardService } from '../../services/dashboard.service';
import { CommonModule, CurrencyPipe } from '@angular/common';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [CurrencyPipe],
  providers: [AuthService, DashboardService, CommonModule],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss'
})
export class DashboardComponent {

  dashboardData: any = {}


  constructor(private router: Router, public authService: AuthService, private toasterService: ToasterService, private dashboardService: DashboardService) { }

  ngOnInit() {
    this.dashboardService.getDashboard(this.authService.loggedInUser.id).subscribe(
      {
        next: (data) => {
          this.dashboardData = data;
          console.log(data);
        },
        error: (err) => {
          console.log(err);
        }
      }
    )
  }


}
