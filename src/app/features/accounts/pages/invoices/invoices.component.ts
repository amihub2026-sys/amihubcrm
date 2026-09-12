import { AccountsService } from '../../services/accounts.service';
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecordPageController } from '../../../../shared/controllers/record-page.controller';
import { RecordTableComponent } from '../../../../shared/components/record-table/record-table.component';
import { RecordEditorComponent } from '../../../../shared/components/record-editor/record-editor.component';

@Component({
 selector: 'app-accounts-invoices', standalone: true,
 imports: [CommonModule, RecordTableComponent, RecordEditorComponent],
 templateUrl: './invoices.component.html',
 styleUrl: './invoices.component.css'
})
export class InvoicesPageComponent extends RecordPageController {
 constructor() { super('accounts', 'invoices', inject(AccountsService)); }
}
