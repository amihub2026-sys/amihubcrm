import {permissionGuard} from '../../core/guards/permission.guard';
import { Routes } from '@angular/router';

export const SALES_ROUTES: Routes = [
  {path:'',pathMatch:'full',redirectTo:'leads'},
  {path:'leads',canActivate:[permissionGuard],data:{resource:'leads'},loadComponent:()=>import('./pages/leads/leads.component').then(m=>m.LeadsPageComponent)},
  {path:'calls',canActivate:[permissionGuard],data:{resource:'calls'},loadComponent:()=>import('./pages/calls/calls.component').then(m=>m.CallsPageComponent)},
  {path:'followups',canActivate:[permissionGuard],data:{resource:'followups'},loadComponent:()=>import('./pages/followups/followups.component').then(m=>m.FollowupsPageComponent)},
  {path:'meetings',canActivate:[permissionGuard],data:{resource:'meetings'},loadComponent:()=>import('./pages/meetings/meetings.component').then(m=>m.MeetingsPageComponent)},
  {path:'quotations',canActivate:[permissionGuard],data:{resource:'quotations'},loadComponent:()=>import('./pages/quotations/quotations.component').then(m=>m.QuotationsPageComponent)}
];
