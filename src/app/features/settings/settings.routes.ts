import {permissionGuard} from '../../core/guards/permission.guard';
import { Routes } from '@angular/router';

export const SETTINGS_ROUTES: Routes = [
  {path:'',pathMatch:'full',redirectTo:'users'},
  {path:'users',canActivate:[permissionGuard],data:{resource:'users'},loadComponent:()=>import('./pages/users/users.component').then(m=>m.UsersPageComponent)},
  {path:'services',canActivate:[permissionGuard],data:{resource:'services'},loadComponent:()=>import('./pages/services/services.component').then(m=>m.ServicesPageComponent)},
  {path:'departments',canActivate:[permissionGuard],data:{resource:'departments'},loadComponent:()=>import('./pages/departments/departments.component').then(m=>m.DepartmentsPageComponent)},
  {path:'billingProfile',canActivate:[permissionGuard],data:{resource:'billingProfile'},loadComponent:()=>import('./pages/billingProfile/billingProfile.component').then(m=>m.BillingProfilePageComponent)}
];
