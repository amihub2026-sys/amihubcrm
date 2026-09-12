import {CommonModule} from '@angular/common';
import {PermissionService} from '../../core/services/permission.service';
import { Component,inject } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
@Component({selector:'app-sales',standalone:true,imports:[CommonModule,RouterLink,RouterLinkActive,RouterOutlet],templateUrl:'./sales.component.html',styleUrl:'./sales.component.css'})
export class SalesComponent { readonly access=inject(PermissionService); }
