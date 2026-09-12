import {CommonModule} from '@angular/common';
import {PermissionService} from '../../core/services/permission.service';
import { Component,inject } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
@Component({selector:'app-projects',standalone:true,imports:[CommonModule,RouterLink,RouterLinkActive,RouterOutlet],templateUrl:'./projects.component.html',styleUrl:'./projects.component.css'})
export class ProjectsComponent { readonly access=inject(PermissionService); }
