import {Component,inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RecordPageController} from '../../../../shared/controllers/record-page.controller';
import {RecordTableComponent} from '../../../../shared/components/record-table/record-table.component';
import {RecordEditorComponent} from '../../../../shared/components/record-editor/record-editor.component';
import {SettingsService} from '../../services/settings.service';
@Component({selector:'app-billingprofile',standalone:true,imports:[CommonModule,RecordTableComponent,RecordEditorComponent],templateUrl:'./billingProfile.component.html',styleUrl:'./billingProfile.component.css'})
export class BillingProfilePageComponent extends RecordPageController {constructor(){super('settings','billingProfile',inject(SettingsService));}}
