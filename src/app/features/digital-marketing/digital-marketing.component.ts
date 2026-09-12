import {CommonModule} from '@angular/common';
import {PermissionService} from '../../core/services/permission.service';
import { Component,inject } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';
@Component({selector:'app-digital-marketing',standalone:true,imports:[CommonModule,RouterLink,RouterLinkActive,RouterOutlet],templateUrl:'./digital-marketing.component.html',styleUrl:'./digital-marketing.component.css'})
export class DigitalMarketingComponent { readonly access=inject(PermissionService); }
