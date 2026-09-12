import { HrService } from '../../services/hr.service';
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecordPageController } from '../../../../shared/controllers/record-page.controller';
import { RecordTableComponent } from '../../../../shared/components/record-table/record-table.component';
import { RecordEditorComponent } from '../../../../shared/components/record-editor/record-editor.component';

@Component({
 selector: 'app-hr-employees', standalone: true,
 imports: [CommonModule, RecordTableComponent, RecordEditorComponent],
 templateUrl: './employees.component.html',
 styleUrl: './employees.component.css'
})
export class EmployeesPageComponent extends RecordPageController {
 constructor() { super('hr', 'employees', inject(HrService)); }
}
