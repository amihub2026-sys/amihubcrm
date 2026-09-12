import {FormsModule} from '@angular/forms';
import {RouterLink} from '@angular/router';
import {ReminderService} from '../../core/services/reminder.service';
import {PermissionService} from '../../core/services/permission.service';
import {Component,inject} from '@angular/core';import {CommonModule} from '@angular/common';import {AuthService} from '../../core/services/auth.service';import {CrmStore} from '../../core/services/crm-store.service';
@Component({selector:'app-header',standalone:true,imports:[CommonModule,RouterLink,FormsModule],templateUrl:'./header.component.html',styleUrl:'./header.component.css'})
export class HeaderComponent {access=inject(PermissionService);auth=inject(AuthService);store=inject(CrmStore);notifications=false;previewRoles=['owner','admin','sales','telecaller','project_manager','developer','designer','video_editor','digital_marketing','hr','accounts','support'] as const;reminderService=inject(ReminderService);get reminders(){return this.reminderService.items.slice(0,6)}menu(){document.body.classList.toggle('nav-open')}}
