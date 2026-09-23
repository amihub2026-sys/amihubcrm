import { AccountsService } from '../../services/accounts.service';

import { Component, inject } from '@angular/core';

import { CommonModule } from '@angular/common';

import { RecordPageController } from '../../../../shared/controllers/record-page.controller';

import { RecordTableComponent } from '../../../../shared/components/record-table/record-table.component';

import { RecordEditorComponent } from '../../../../shared/components/record-editor/record-editor.component';

@Component({
  selector: 'app-accounts-payroll',
  standalone: true,

  imports: [CommonModule, RecordTableComponent, RecordEditorComponent],

  templateUrl: './payroll.component.html',

  styleUrl: './payroll.component.css'
})
export class PayrollPageComponent extends RecordPageController {
  constructor() {
    super('accounts', 'payroll', inject(AccountsService));
  }
}