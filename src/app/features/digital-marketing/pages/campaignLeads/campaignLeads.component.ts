import {Component,inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RecordPageController} from '../../../../shared/controllers/record-page.controller';
import {RecordTableComponent} from '../../../../shared/components/record-table/record-table.component';
import {RecordEditorComponent} from '../../../../shared/components/record-editor/record-editor.component';
import {DigitalMarketingService} from '../../services/digital-marketing.service';
@Component({selector:'app-campaignleads',standalone:true,imports:[CommonModule,RecordTableComponent,RecordEditorComponent],templateUrl:'./campaignLeads.component.html',styleUrl:'./campaignLeads.component.css'})
export class CampaignLeadsPageComponent extends RecordPageController {constructor(){super('digital-marketing','campaignLeads',inject(DigitalMarketingService));}}
