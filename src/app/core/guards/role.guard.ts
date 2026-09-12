import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../services/auth.service';
import { UserRole } from '../models/user.model';
export const roleGuard: CanActivateFn = route => {
  const roles = (route.data['roles'] || []) as UserRole[];
  const auth = inject(AuthService); const router = inject(Router);
  return roles.length === 0 || auth.hasRole(...roles) ? true : router.createUrlTree(['/dashboard']);
};
