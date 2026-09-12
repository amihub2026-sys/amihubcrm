import { HrService } from '../../services/hr.service';
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecordPageController } from '../../../../shared/controllers/record-page.controller';
import { RecordTableComponent } from '../../../../shared/components/record-table/record-table.component';
import { RecordEditorComponent } from '../../../../shared/components/record-editor/record-editor.component';

@Component({
 selector: 'app-hr-attendance', standalone: true,
 imports: [CommonModule, RecordTableComponent, RecordEditorComponent],
 templateUrl: './attendance.component.html',
 styleUrl: './attendance.component.css'
})
export class AttendancePageComponent extends RecordPageController {
 constructor() { super('hr', 'attendance', inject(HrService)); }
}
