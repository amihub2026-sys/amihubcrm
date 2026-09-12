import {permissionGuard} from '../../core/guards/permission.guard';
import { Routes } from '@angular/router';

export const DIGITALMARKETING_ROUTES: Routes = [
  {path:'',pathMatch:'full',redirectTo:'plans'},
  {path:'plans',canActivate:[permissionGuard],data:{resource:'plans'},loadComponent:()=>import('./pages/plans/plans.component').then(m=>m.PlansPageComponent)},
  {path:'content',canActivate:[permissionGuard],data:{resource:'content'},loadComponent:()=>import('./pages/content/content.component').then(m=>m.ContentPageComponent)},
  {path:'campaigns',canActivate:[permissionGuard],data:{resource:'campaigns'},loadComponent:()=>import('./pages/campaigns/campaigns.component').then(m=>m.CampaignsPageComponent)},
  {path:'campaignLeads',canActivate:[permissionGuard],data:{resource:'campaignLeads'},loadComponent:()=>import('./pages/campaignLeads/campaignLeads.component').then(m=>m.CampaignLeadsPageComponent)}
];
