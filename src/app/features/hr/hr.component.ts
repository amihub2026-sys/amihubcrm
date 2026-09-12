import {CommonModule} from '@angular/common';
import {PermissionService} from '../../core/services/permission.service';
import { Component,inject } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
@Component({selector:'app-hr',standalone:true,imports:[CommonModule,RouterLink,RouterLinkActive,RouterOutlet],templateUrl:'./hr.component.html',styleUrl:'./hr.component.css'})
export class HrComponent { readonly access=inject(PermissionService); }
