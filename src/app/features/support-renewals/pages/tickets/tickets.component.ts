import { SupportRenewalsService } from '../../services/support-renewals.service';
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecordPageController } from '../../../../shared/controllers/record-page.controller';
import { RecordTableComponent } from '../../../../shared/components/record-table/record-table.component';
import { RecordEditorComponent } from '../../../../shared/components/record-editor/record-editor.component';

@Component({
 selector: 'app-support-renewals-tickets', standalone: true,
 imports: [CommonModule, RecordTableComponent, RecordEditorComponent],
 templateUrl: './tickets.component.html',
 styleUrl: './tickets.component.css'
})
export class TicketsPageComponent extends RecordPageController {
 constructor() { super('support-renewals', 'tickets', inject(SupportRenewalsService)); }
}
