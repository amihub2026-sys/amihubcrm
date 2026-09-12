import { SalesService } from '../../services/sales.service';
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecordPageController } from '../../../../shared/controllers/record-page.controller';
import { RecordTableComponent } from '../../../../shared/components/record-table/record-table.component';
import { RecordEditorComponent } from '../../../../shared/components/record-editor/record-editor.component';

@Component({
 selector: 'app-sales-calls', standalone: true,
 imports: [CommonModule, RecordTableComponent, RecordEditorComponent],
 templateUrl: './calls.component.html',
 styleUrl: './calls.component.css'
})
export class CallsPageComponent extends RecordPageController {
 constructor() { super('sales', 'calls', inject(SalesService)); }
}
