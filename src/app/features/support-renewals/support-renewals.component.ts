import {CommonModule} from '@angular/common';
import {PermissionService} from '../../core/services/permission.service';
import { Component,inject } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
@Component({selector:'app-support-renewals',standalone:true,imports:[CommonModule,RouterLink,RouterLinkActive,RouterOutlet],templateUrl:'./support-renewals.component.html',styleUrl:'./support-renewals.component.css'})
export class SupportRenewalsComponent { readonly access=inject(PermissionService); }
