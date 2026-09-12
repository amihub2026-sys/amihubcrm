import { SalesService } from '../../services/sales.service';
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecordPageController } from '../../../../shared/controllers/record-page.controller';
import { RecordTableComponent } from '../../../../shared/components/record-table/record-table.component';
import { RecordEditorComponent } from '../../../../shared/components/record-editor/record-editor.component';

@Component({
 selector: 'app-sales-leads', standalone: true,
 imports: [CommonModule, RecordTableComponent, RecordEditorComponent],
 templateUrl: './leads.component.html',
 styleUrl: './leads.component.css'
})
export class LeadsPageComponent extends RecordPageController {
 constructor() { super('sales', 'leads', inject(SalesService)); }
}
