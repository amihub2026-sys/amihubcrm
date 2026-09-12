import { SalesService } from '../../services/sales.service';
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecordPageController } from '../../../../shared/controllers/record-page.controller';
import { RecordTableComponent } from '../../../../shared/components/record-table/record-table.component';
import { RecordEditorComponent } from '../../../../shared/components/record-editor/record-editor.component';

@Component({
 selector: 'app-sales-quotations', standalone: true,
 imports: [CommonModule, RecordTableComponent, RecordEditorComponent],
 templateUrl: './quotations.component.html',
 styleUrl: './quotations.component.css'
})
export class QuotationsPageComponent extends RecordPageController {
 constructor() { super('sales', 'quotations', inject(SalesService)); }
}
