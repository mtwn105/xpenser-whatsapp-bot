import { HttpErrorResponse, HttpEvent, HttpInterceptorFn } from "@angular/common/http";
import { inject } from "@angular/core";
import { Router } from "@angular/router";
import { Observable, catchError } from "rxjs";
import { AuthService } from "../services/auth.service";
import { ToasterService } from "../services/toaster.service";

export const jwtInterceptor: HttpInterceptorFn = (req, next) => {

  const authService = inject(AuthService)
  const router = inject(Router)
  const toasterService = inject(ToasterService)

  const authToken = localStorage.getItem("token");

  // Clone the request and add the authorization header
  const authReq = req.clone({
    setHeaders: {
      Authorization: `Bearer ${authToken}`
    }
  });

  // Pass the cloned request with the updated header to the next handler
  return next(authReq).pipe(
    catchError((err: any, caught: Observable<HttpEvent<any>>) => {

      if (err instanceof HttpErrorResponse) {
        if (err.status === 401) {
          // auto logout if 401 response returned from api
          toasterService.notify('You are not authorized to access this page. Please login again.', 'is-danger')
          authService.logout();
          router.navigate(['/signin']);
          return caught;
        }
      }

      // If there is an error, log the error and then pass it along
      console.error("There was an error: ", err);
      return caught;
    })
  );
};