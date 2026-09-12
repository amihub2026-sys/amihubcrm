import { HrService } from '../../services/hr.service';
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecordPageController } from '../../../../shared/controllers/record-page.controller';
import { RecordTableComponent } from '../../../../shared/components/record-table/record-table.component';
import { RecordEditorComponent } from '../../../../shared/components/record-editor/record-editor.component';

@Component({
 selector: 'app-hr-leave', standalone: true,
 imports: [CommonModule, RecordTableComponent, RecordEditorComponent],
 templateUrl: './leave.component.html',
 styleUrl: './leave.component.css'
})
export class LeavePageComponent extends RecordPageController {
 constructor() { super('hr', 'leave', inject(HrService)); }
}
