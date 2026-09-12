import { AccountsService } from '../../services/accounts.service';
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecordPageController } from '../../../../shared/controllers/record-page.controller';
import { RecordTableComponent } from '../../../../shared/components/record-table/record-table.component';
import { RecordEditorComponent } from '../../../../shared/components/record-editor/record-editor.component';

@Component({
 selector: 'app-accounts-payments', standalone: true,
 imports: [CommonModule, RecordTableComponent, RecordEditorComponent],
 templateUrl: './payments.component.html',
 styleUrl: './payments.component.css'
})
export class PaymentsPageComponent extends RecordPageController {
 constructor() { super('accounts', 'payments', inject(AccountsService)); }
}
