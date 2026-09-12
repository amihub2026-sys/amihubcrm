import { SalesService } from '../../services/sales.service';
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecordPageController } from '../../../../shared/controllers/record-page.controller';
import { RecordTableComponent } from '../../../../shared/components/record-table/record-table.component';
import { RecordEditorComponent } from '../../../../shared/components/record-editor/record-editor.component';

@Component({
 selector: 'app-sales-meetings', standalone: true,
 imports: [CommonModule, RecordTableComponent, RecordEditorComponent],
 templateUrl: './meetings.component.html',
 styleUrl: './meetings.component.css'
})
export class MeetingsPageComponent extends RecordPageController {
 constructor() { super('sales', 'meetings', inject(SalesService)); }
}
