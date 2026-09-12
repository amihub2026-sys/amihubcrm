import {inject} from '@angular/core';
import {CanActivateFn,Router} from '@angular/router';
import {PermissionService} from '../services/permission.service';
export const permissionGuard:CanActivateFn=route=>inject(PermissionService).can(route.data['resource'])?true:inject(Router).createUrlTree(['/dashboard']);
