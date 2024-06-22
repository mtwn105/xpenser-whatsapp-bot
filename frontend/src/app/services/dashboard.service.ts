import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http: HttpClient) { }

  getDashboardOverview(userId: string) {
    return this.http.get(environment.backendUrl + '/api/analytics/dashboard/overview/' + userId);
  }

  getDashboardExpenseChart(userId: string) {
    return this.http.get(environment.backendUrl + '/api/analytics/dashboard/expense-chart/' + userId);
  }
  getDashboardCategoryChart(userId: string) {
    return this.http.get(environment.backendUrl + '/api/analytics/dashboard/category-chart/' + userId);
  }

}
