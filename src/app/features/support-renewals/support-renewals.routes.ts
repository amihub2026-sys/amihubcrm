import {permissionGuard} from '../../core/guards/permission.guard';
import { Routes } from '@angular/router';

export const SUPPORTRENEWALS_ROUTES: Routes = [
  {path:'',pathMatch:'full',redirectTo:'renewals'},
  {path:'tickets',canActivate:[permissionGuard],data:{resource:'tickets'},loadComponent:()=>import('./pages/tickets/tickets.component').then(m=>m.TicketsPageComponent)},
  {path:'renewals',canActivate:[permissionGuard],data:{resource:'renewals'},loadComponent:()=>import('./pages/renewals/renewals.component').then(m=>m.RenewalsPageComponent)}
];
