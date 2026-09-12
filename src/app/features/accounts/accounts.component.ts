import {CommonModule} from '@angular/common';
import {PermissionService} from '../../core/services/permission.service';
import { Component,inject } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
@Component({selector:'app-accounts',standalone:true,imports:[CommonModule,RouterLink,RouterLinkActive,RouterOutlet],templateUrl:'./accounts.component.html',styleUrl:'./accounts.component.css'})
export class AccountsComponent { readonly access=inject(PermissionService); }
