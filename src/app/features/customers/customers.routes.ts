import { permissionGuard } from '../../core/guards/permission.guard';
import { Routes } from '@angular/router';

export const CUSTOMERS_ROUTES: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'customers'
  },

  {
    path: 'customers',
    canActivate: [permissionGuard],
    data: { resource: 'customers' },
    loadComponent: () =>
      import('./pages/customers/customers.component')
        .then(m => m.CustomersPageComponent)
  },

  {
    path: 'visits',
    canActivate: [permissionGuard],
    data: { resource: 'visits' },
    loadComponent: () =>
      import('./pages/visits/visits.component')
        .then(m => m.VisitsPageComponent)
  },

  {
    path: 'promises',
    canActivate: [permissionGuard],
    data: { resource: 'promises' },
    loadComponent: () =>
      import('../accounts/pages/promises/promises.component')
        .then(m => m.PromisesPageComponent)
  },

  {
    path: 'domain-renewals',
    canActivate: [permissionGuard],
    data: { resource: 'customers' },
    loadComponent: () =>
      import('./pages/domain-renewals/domain-renewals.component')
        .then(m => m.DomainRenewalsPageComponent)
  }
];