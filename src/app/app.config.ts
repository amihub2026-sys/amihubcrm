import {AuthService} from './core/services/auth.service';
import { ApplicationConfig,provideAppInitializer,inject } from '@angular/core';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';
import { authInterceptor } from './core/services/auth.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [provideAppInitializer(()=>inject(AuthService).restoreSession()),provideRouter(routes), provideHttpClient(withInterceptors([authInterceptor]))]
};
