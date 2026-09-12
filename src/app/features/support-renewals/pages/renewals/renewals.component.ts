import { SupportRenewalsService } from '../../services/support-renewals.service';
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecordPageController } from '../../../../shared/controllers/record-page.controller';
import { RecordTableComponent } from '../../../../shared/components/record-table/record-table.component';
import { RecordEditorComponent } from '../../../../shared/components/record-editor/record-editor.component';

@Component({
 selector: 'app-support-renewals-renewals', standalone: true,
 imports: [CommonModule, RecordTableComponent, RecordEditorComponent],
 templateUrl: './renewals.component.html',
 styleUrl: './renewals.component.css'
})
export class RenewalsPageComponent extends RecordPageController {
 constructor() { super('support-renewals', 'renewals', inject(SupportRenewalsService)); }
}
