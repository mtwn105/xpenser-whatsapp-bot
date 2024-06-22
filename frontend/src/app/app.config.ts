import { ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter, withViewTransitions } from '@angular/router';
import { JwtModule } from "@auth0/angular-jwt";
import { provideToastr } from 'ngx-toastr';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { jwtInterceptor } from './interceptors/jwt-interceptor';
import { provideAnimations } from '@angular/platform-browser/animations';
export function tokenGetter() {
  return localStorage.getItem("token");
}
export const appConfig: ApplicationConfig = {
  providers: [
    provideAnimations(),
    provideRouter(routes, withViewTransitions()),
    importProvidersFrom(
      JwtModule.forRoot({
        config: {
          tokenGetter: tokenGetter,
        },
      }),
    ),
    provideHttpClient(withInterceptors([jwtInterceptor])),
    provideToastr({
      positionClass: 'toast-bottom-center',
      timeOut: 2000,
    })
  ]
};
