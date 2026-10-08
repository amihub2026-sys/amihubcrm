import { permissionGuard } from '../../core/guards/permission.guard';
import { Routes } from '@angular/router';

export const DIGITALMARKETING_ROUTES: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'plans',
  },

  {
    path: 'plan-packages',
    canActivate: [permissionGuard],
    data: {
      resource: 'digitalMarketingPlans',
    },
    loadComponent: () =>
      import('./pages/plan-packages/plan-packages.component').then(
        (m) => m.PlanPackagesPageComponent,
      ),
  },

  {
    path: 'plans',
    canActivate: [permissionGuard],
    data: {
      resource: 'plans',
    },
    loadComponent: () =>
      import('./pages/plans/plans.component').then(
        (m) => m.PlansPageComponent,
      ),
  },

  {
    path: 'content',
    canActivate: [permissionGuard],
    data: {
      resource: 'content',
    },
    loadComponent: () =>
      import('./pages/content/content.component').then(
        (m) => m.ContentPageComponent,
      ),
  },

  // =====================================================
  // DIGITAL MARKETING REMINDERS
  // =====================================================
  {
    path: 'reminders',
    canActivate: [permissionGuard],
    data: {
      resource: 'content',
    },
    loadComponent: () =>
      import('./pages/reminders/reminders.component').then(
        (m) => m.RemindersPageComponent,
      ),
  },

  // =====================================================
  // OLD CAMPAIGN ROUTE
  // Hidden from top navigation
  // =====================================================
  {
    path: 'campaigns',
    canActivate: [permissionGuard],
    data: {
      resource: 'campaigns',
    },
    loadComponent: () =>
      import('./pages/campaigns/campaigns.component').then(
        (m) => m.CampaignsPageComponent,
      ),
  },

  // =====================================================
  // OLD CAMPAIGN LEADS ROUTE
  // Hidden from top navigation
  // =====================================================
  {
    path: 'campaignLeads',
    canActivate: [permissionGuard],
    data: {
      resource: 'campaignLeads',
    },
    loadComponent: () =>
      import('./pages/campaignLeads/campaignLeads.component').then(
        (m) => m.CampaignLeadsPageComponent,
      ),
  },

  // =====================================================
  // META ADS RUNNING
  // =====================================================
  {
    path: 'meta-ads-running',
    canActivate: [permissionGuard],
    data: {
      resource: 'campaigns',
    },
    loadComponent: () =>
      import('./pages/meta-ads-running/meta-ads-running.component').then(
        (m) => m.MetaAdsRunningComponent,
      ),
  },

  // =====================================================
  // META ADS TRACKING
  // =====================================================
  {
    path: 'meta-ads',
    canActivate: [permissionGuard],
    data: {
      resource: 'campaigns',
    },
    loadComponent: () =>
      import('./pages/meta-ads/meta-ads.component').then(
        (m) => m.MetaAdsComponent,
      ),
  },
];