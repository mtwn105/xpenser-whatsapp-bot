import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { SignupComponent } from './components/signup/signup.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { authGuard } from './guard/auth.guard';
import { LoginComponent } from './components/login/login.component';
import { ExpenseComponent } from './components/expense/expense.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full'
  },
  {
    path: 'home',
    component: HomeComponent
  }, {
    path: 'signin',
    component: LoginComponent
  },
  {
    path: 'signup',
    component: SignupComponent
  }, {
    path: 'dashboard',
    component: DashboardComponent,
    canActivate: [authGuard]
  }, {
    path: 'expense/:id',
    component: ExpenseComponent,
    canActivate: [authGuard]
  }, {
    path: 'expense',
    component: ExpenseComponent,
    canActivate: [authGuard]
  }
];
