import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class DashboardService {

  constructor(private http: HttpClient) { }

  getDashboard(userId: string) {
    return this.http.get(environment.backendUrl + '/api/analytics/dashboard/' + userId);
  }
}
