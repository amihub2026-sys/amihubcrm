import {campaignMetrics} from '../../../../core/services/business-metrics';
import {Component,inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RecordPageController} from '../../../../shared/controllers/record-page.controller';
import {RecordTableComponent} from '../../../../shared/components/record-table/record-table.component';
import {RecordEditorComponent} from '../../../../shared/components/record-editor/record-editor.component';
import {DigitalMarketingService} from '../../services/digital-marketing.service';
@Component({selector:'app-campaigns',standalone:true,imports:[CommonModule,RecordTableComponent,RecordEditorComponent],templateUrl:'./campaigns.component.html',styleUrl:'./campaigns.component.css'})
export class CampaignsPageComponent extends RecordPageController {get metrics(){return campaignMetrics(this.rows)}
 constructor(){super('digital-marketing','campaigns',inject(DigitalMarketingService));}}
