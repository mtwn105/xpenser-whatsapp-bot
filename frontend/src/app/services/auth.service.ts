import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {


  constructor(private http: HttpClient,) { }

  sendOtp(phonenumber: string) {
    return this.http.post(environment.backendUrl + '/api/auth/otp/send', { phonenumber });
  }

  verifyOtp(data: any, newUser: boolean = false) {
    return this.http.post(environment.backendUrl + '/api/auth/otp/verify' + '?newUser=' + newUser, data);
  }

  get loggedInUser() {
    return localStorage.getItem('loggedInUser') ? JSON.parse(localStorage.getItem('loggedInUser') as string) : null;
  }

  get isLoggedIn() {
    return this.loggedInUser !== null;
  }

  loginUser(user: any, token: string) {
    localStorage.setItem('loggedInUser', JSON.stringify(user));
    localStorage.setItem('token', token);
  }

  logout() {
    localStorage.removeItem('loggedInUser');
    localStorage.removeItem('token');
  }

}
