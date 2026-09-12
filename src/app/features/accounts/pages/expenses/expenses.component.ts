import { AccountsService } from '../../services/accounts.service';
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecordPageController } from '../../../../shared/controllers/record-page.controller';
import { RecordTableComponent } from '../../../../shared/components/record-table/record-table.component';
import { RecordEditorComponent } from '../../../../shared/components/record-editor/record-editor.component';

@Component({
 selector: 'app-accounts-expenses', standalone: true,
 imports: [CommonModule, RecordTableComponent, RecordEditorComponent],
 templateUrl: './expenses.component.html',
 styleUrl: './expenses.component.css'
})
export class ExpensesPageComponent extends RecordPageController {
 constructor() { super('accounts', 'expenses', inject(AccountsService)); }
}
