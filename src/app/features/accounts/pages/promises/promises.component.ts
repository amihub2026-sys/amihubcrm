import {Component,inject} from '@angular/core';
import {CommonModule} from '@angular/common';
import {RecordPageController} from '../../../../shared/controllers/record-page.controller';
import {RecordTableComponent} from '../../../../shared/components/record-table/record-table.component';
import {RecordEditorComponent} from '../../../../shared/components/record-editor/record-editor.component';
import {AccountsService} from '../../services/accounts.service';
@Component({selector:'app-promises',standalone:true,imports:[CommonModule,RecordTableComponent,RecordEditorComponent],templateUrl:'./promises.component.html',styleUrl:'./promises.component.css'})
export class PromisesPageComponent extends RecordPageController {constructor(){super('accounts','promises',inject(AccountsService));}}
