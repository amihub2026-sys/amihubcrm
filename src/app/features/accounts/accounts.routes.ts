import {permissionGuard} from '../../core/guards/permission.guard';
import { Routes } from '@angular/router';

export const ACCOUNTS_ROUTES: Routes = [
  {path:'',pathMatch:'full',redirectTo:'invoices'},
  {path:'invoices',canActivate:[permissionGuard],data:{resource:'invoices'},loadComponent:()=>import('./pages/invoices/invoices.component').then(m=>m.InvoicesPageComponent)},
  {path:'installments',canActivate:[permissionGuard],data:{resource:'installments'},loadComponent:()=>import('./pages/installments/installments.component').then(m=>m.InstallmentsPageComponent)},
  {path:'payments',canActivate:[permissionGuard],data:{resource:'payments'},loadComponent:()=>import('./pages/payments/payments.component').then(m=>m.PaymentsPageComponent)},
  {path:'expenses',canActivate:[permissionGuard],data:{resource:'expenses'},loadComponent:()=>import('./pages/expenses/expenses.component').then(m=>m.ExpensesPageComponent)},
  {path:'promises',canActivate:[permissionGuard],data:{resource:'promises'},loadComponent:()=>import('./pages/promises/promises.component').then(m=>m.PromisesPageComponent)},
 {path:'subscriptions',canActivate:[permissionGuard],data:{resource:'subscriptions'},loadComponent:()=>import('./pages/subscriptions/subscriptions.component').then(m=>m.SubscriptionsPageComponent)},
 {path:'payroll',canActivate:[permissionGuard],data:{resource:'payroll'},loadComponent:()=>import('./pages/payroll/payroll.component').then(m=>m.PayrollPageComponent)}
];
