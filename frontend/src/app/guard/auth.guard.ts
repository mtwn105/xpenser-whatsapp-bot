import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, GuardResult, MaybeAsync, Router, RouterStateSnapshot } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { Injectable, inject } from '@angular/core';
import { ToasterService } from '../services/toaster.service';

export const authGuard: CanActivateFn = (route, state) => {

  const authService = inject(AuthService)
  const router = inject(Router)
  const toasterService = inject(ToasterService)

  if (!authService.loggedInUser) {
    // toasterService.notify("Please login to continue", "is-danger", 3000);
    router.navigate(['/home'])
    return false;
  }

  return true;
};
