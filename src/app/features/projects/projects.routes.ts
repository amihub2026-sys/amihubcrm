import {permissionGuard} from '../../core/guards/permission.guard';
import { Routes } from '@angular/router';

export const PROJECTS_ROUTES: Routes = [
  {path:'',pathMatch:'full',redirectTo:'projects'},
  {path:'projects',canActivate:[permissionGuard],data:{resource:'projects'},loadComponent:()=>import('./pages/projects/projects.component').then(m=>m.ProjectsPageComponent)},
  {path:'tasks',canActivate:[permissionGuard],data:{resource:'tasks'},loadComponent:()=>import('./pages/tasks/tasks.component').then(m=>m.TasksPageComponent)},
  {path:'files',canActivate:[permissionGuard],data:{resource:'files'},loadComponent:()=>import('./pages/files/files.component').then(m=>m.FilesPageComponent)}
];
