import { Component } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { CommonModule } from '@angular/common';
import { AvatarComponent } from '../avatar/avatar.component';
import { Router } from '@angular/router';
import { ToasterService } from '../../services/toaster.service';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [CommonModule, AvatarComponent],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {

  menuOpen = false;

  constructor(public authService: AuthService, private router: Router, private toasterService: ToasterService) { }

  logout() {
    this.menuOpen = false;
    this.authService.logout();
    this.toasterService.notify('Logged out successfully', 'is-success');
    this.router.navigate(['/signin']);
  }

  goToHome() {
    this.menuOpen = false;
    this.router.navigate(['/dashboard']);
  }

  goToExpenses() {
    this.menuOpen = false;
    this.router.navigate(['/expenses']);
  }

}
