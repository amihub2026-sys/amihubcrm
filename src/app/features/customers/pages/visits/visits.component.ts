import {Component,inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RecordPageController} from '../../../../shared/controllers/record-page.controller';
import {RecordTableComponent} from '../../../../shared/components/record-table/record-table.component';
import {RecordEditorComponent} from '../../../../shared/components/record-editor/record-editor.component';
import {CustomersService} from '../../services/customers.service';
@Component({selector:'app-visits',standalone:true,imports:[CommonModule,RecordTableComponent,RecordEditorComponent],templateUrl:'./visits.component.html',styleUrl:'./visits.component.css'})
export class VisitsPageComponent extends RecordPageController {constructor(){super('customers','visits',inject(CustomersService));}}
