import {PermissionService} from '../../core/services/permission.service';
import { Component, computed, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from '@angular/router';
import { AuthService } from '../../core/services/auth.service';
import { UserRole } from '../../core/models/user.model';
interface NavItem { label:string; icon:string; route:string; roles:UserRole[]; }
@Component({selector:'app-sidebar',standalone:true,imports:[RouterLink,RouterLinkActive],templateUrl:'./sidebar.component.html',styleUrl:'./sidebar.component.css'})
export class SidebarComponent{
  private auth=inject(AuthService); readonly access=inject(PermissionService); closeNav(){document.body.classList.remove('nav-open')}
  readonly user=this.auth.user;
  private readonly all:UserRole[]=['owner','admin','hr','sales','telecaller','project_manager','developer','designer','video_editor','digital_marketing','accounts','support'];
  readonly items:NavItem[]=[
    {label:'Dashboard',icon:'⌂',route:'/dashboard',roles:this.all},
    {label:'Sales',icon:'↗',route:'/sales',roles:['owner','admin','sales','telecaller']},
    {label:'Customers',icon:'♙',route:'/customers',roles:['owner','admin','sales','accounts','project_manager','support']},
    {label:'Projects',icon:'▣',route:'/projects',roles:['owner','admin','hr','project_manager','developer','designer','video_editor']},
    {label:'Digital Marketing',icon:'◉',route:'/digital-marketing',roles:['owner','admin','digital_marketing','designer','video_editor']},
    {label:'People & HR',icon:'♙',route:'/hr',roles:['owner','admin','hr']},
    {label:'Accounts',icon:'₹',route:'/accounts',roles:['owner','admin','accounts']},
    {label:'Support & Renewals',icon:'↻',route:'/support-renewals',roles:['owner','admin','support','accounts']},
    {label:'Reports',icon:'▤',route:'/reports',roles:['owner','admin','hr','sales','accounts','project_manager','digital_marketing']},
    {label:'Settings',icon:'⚙',route:'/settings',roles:['owner','admin']}
  ];
  readonly visibleItems=computed(()=>{const role=this.user()?.role;return role?this.items.filter(x=>this.access.section(x.route.slice(1))):[]});
}
