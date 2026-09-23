import {permissionGuard} from './core/guards/permission.guard';
import { Routes } from '@angular/router';
import { authGuard } from './core/guards/auth.guard';
import { roleGuard } from './core/guards/role.guard';

const management = ['owner','admin'] as const;

export const routes: Routes = [
  { path: 'login', loadComponent: () => import('./features/auth/login/login.component').then(m => m.LoginComponent) },
  {
    path: '',
    canActivate: [authGuard],
    loadComponent: () => import('./layout/shell/shell.component').then(m => m.ShellComponent),
    children: [
      {path:'billing/invoices/:id',canActivate:[permissionGuard],data:{resource:'invoices'},loadComponent:()=>import('./features/accounts/billing-document/billing-document.component').then(m=>m.BillingDocumentComponent)},
      {path:'billing/quotations/:id',canActivate:[permissionGuard],data:{resource:'quotations'},loadComponent:()=>import('./features/accounts/billing-document/billing-document.component').then(m=>m.BillingDocumentComponent)},
      {path:'billing/payments/:id',canActivate:[permissionGuard],data:{resource:'payments'},loadComponent:()=>import('./features/accounts/billing-document/billing-document.component').then(m=>m.BillingDocumentComponent)},

      {path:'reminders',loadComponent:()=>import('./features/dashboard/reminders/reminders.component').then(m=>m.RemindersComponent)},
      { path: 'dashboard', loadComponent: () => import('./features/dashboard/dashboard.component').then(m => m.DashboardComponent) },
      {
  path: 'my-leave',
  canActivate: [permissionGuard],
  data: { resource: 'leave' },
  loadComponent: () =>
    import('./features/hr/pages/leave/leave.component')
      .then(m => m.LeavePageComponent)
},
      { path: 'sales', canActivate: [roleGuard], data: { module: 'sales', roles: [...management,'sales','telecaller'] }, loadComponent: () => import('./features/sales/sales.component').then(m => m.SalesComponent), loadChildren: () => import('./features/sales/sales.routes').then(m => m.SALES_ROUTES) },
      { path: 'customers', canActivate: [roleGuard], data: { module: 'customers', roles: [...management,'sales','accounts','project_manager','support','digital_marketing'] }, loadComponent: () => import('./features/customers/customers.component').then(m => m.CustomersComponent), loadChildren: () => import('./features/customers/customers.routes').then(m => m.CUSTOMERS_ROUTES) },
      { path: 'projects', canActivate: [roleGuard], data: { module: 'projects', roles: [...management,'hr','project_manager','developer','designer','video_editor'] }, loadComponent: () => import('./features/projects/projects.component').then(m => m.ProjectsComponent), loadChildren: () => import('./features/projects/projects.routes').then(m => m.PROJECTS_ROUTES) },
      { path: 'digital-marketing', canActivate: [roleGuard], data: { module: 'digital-marketing', roles: [...management,'digital_marketing','designer','video_editor'] }, loadComponent: () => import('./features/digital-marketing/digital-marketing.component').then(m => m.DigitalMarketingComponent), loadChildren: () => import('./features/digital-marketing/digital-marketing.routes').then(m => m.DIGITALMARKETING_ROUTES) },
      { path: 'hr', canActivate: [roleGuard], data: { module: 'hr', roles: [...management,'hr'] }, loadComponent: () => import('./features/hr/hr.component').then(m => m.HrComponent), loadChildren: () => import('./features/hr/hr.routes').then(m => m.HR_ROUTES) },
      { path: 'accounts', canActivate: [roleGuard], data: { module: 'accounts', roles: [...management,'accounts'] }, loadComponent: () => import('./features/accounts/accounts.component').then(m => m.AccountsComponent), loadChildren: () => import('./features/accounts/accounts.routes').then(m => m.ACCOUNTS_ROUTES) },
      { path: 'support-renewals', canActivate: [roleGuard], data: { module: 'support-renewals', roles: [...management,'support','accounts'] }, loadComponent: () => import('./features/support-renewals/support-renewals.component').then(m => m.SupportRenewalsComponent), loadChildren: () => import('./features/support-renewals/support-renewals.routes').then(m => m.SUPPORTRENEWALS_ROUTES) },
      { path: 'reports', canActivate: [roleGuard], data: { roles: [...management,'hr','sales','accounts','project_manager','digital_marketing'] }, loadComponent: () => import('./features/reports/reports.component').then(m => m.ReportsComponent) },
      { path: 'settings', canActivate: [roleGuard], data: { module: 'settings', roles: [...management] }, loadComponent: () => import('./features/settings/settings.component').then(m => m.SettingsComponent), loadChildren: () => import('./features/settings/settings.routes').then(m => m.SETTINGS_ROUTES) },
      { path: '', pathMatch: 'full', redirectTo: 'dashboard' }
    ]
  },
  { path: '**', redirectTo: '' }
];
