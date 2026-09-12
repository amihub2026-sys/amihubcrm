import {ReminderService} from '../../core/services/reminder.service';
import {PermissionService} from '../../core/services/permission.service';
import { Component,inject } from '@angular/core';
import { CommonModule } from '@angular/common';import { RouterLink } from '@angular/router';import { CrmStore } from '../../core/services/crm-store.service';import { AuthService } from '../../core/services/auth.service';
@Component({selector:'app-dashboard',standalone:true,imports:[CommonModule,RouterLink],templateUrl:'./dashboard.component.html',styleUrl:'./dashboard.component.css'})
export class DashboardComponent {access=inject(PermissionService);reminders=inject(ReminderService);store=inject(CrmStore);auth=inject(AuthService);today=new Date();
 get management(){return this.auth.hasRole('owner','admin')}
 get sales(){return this.auth.hasRole('owner','admin','sales','telecaller')}
 get finance(){return this.auth.hasRole('owner','admin','accounts')}
 get delivery(){return this.auth.hasRole('owner','admin','hr','project_manager','developer','designer','video_editor')}
 get collected(){return this.store.list('payments').reduce((s,p)=>s+Number(p.amount),0)}
 get balance(){return this.store.list('invoices').reduce((s,p)=>s+this.store.balance(p),0)}
 get tasks(){return this.store.list('tasks').filter(x=>this.access.visible('tasks',x,this.store.records()))}
 get projects(){return this.store.list('projects').filter(x=>this.access.visible('projects',x,this.store.records()))}
 get leads(){return this.store.list('leads').filter(x=>this.access.visible('leads',x,this.store.records()))}
 get customers(){return this.store.list('customers').filter(x=>this.access.visible('customers',x,this.store.records()))}

 stages=['NEW','INTERESTED','MEETING','QUOTATION','NEGOTIATION','WON'];colors=['#9bb2e3','#708fe0','#4d74d2','#365aba','#264697','#163273'];
 count(stage:string){return this.leads.filter(x=>x.status===stage).length}
 pretty(s:string){return s.replace(/_/g,' ').toLowerCase().replace(/\b\w/g,c=>c.toUpperCase())}
}
