import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RecordPageController } from '../../../../shared/controllers/record-page.controller';
import { RecordTableComponent } from '../../../../shared/components/record-table/record-table.component';
import { RecordEditorComponent } from '../../../../shared/components/record-editor/record-editor.component';

import { HrService } from '../../services/hr.service';

@Component({
  selector: 'app-attendance-settings',
  standalone: true,
  imports: [
    CommonModule,
    RecordTableComponent,
    RecordEditorComponent
  ],
  templateUrl: './attendance-settings.component.html',
  styleUrl: './attendance-settings.component.css'
})
export class AttendanceSettingsPageComponent extends RecordPageController {

  constructor() {
    super(
      'hr',
      'attendanceSettings',
      inject(HrService)
    );
  }

}