import {permissionGuard} from '../../core/guards/permission.guard';
import { Routes } from '@angular/router';

export const HR_ROUTES: Routes = [
  {path:'',pathMatch:'full',redirectTo:'employees'},
  {path:'employees',canActivate:[permissionGuard],data:{resource:'employees'},loadComponent:()=>import('./pages/employees/employees.component').then(m=>m.EmployeesPageComponent)},
  {path:'attendance',canActivate:[permissionGuard],data:{resource:'attendance'},loadComponent:()=>import('./pages/attendance/attendance.component').then(m=>m.AttendancePageComponent)},
  {path:'leave',canActivate:[permissionGuard],data:{resource:'leave'},loadComponent:()=>import('./pages/leave/leave.component').then(m=>m.LeavePageComponent)}
];
