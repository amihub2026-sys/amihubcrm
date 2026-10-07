import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RecordPageController } from '../../../../shared/controllers/record-page.controller';
import { RecordTableComponent } from '../../../../shared/components/record-table/record-table.component';
import { RecordEditorComponent } from '../../../../shared/components/record-editor/record-editor.component';

import { DigitalMarketingService } from '../../services/digital-marketing.service';

@Component({
  selector: 'app-digital-marketing-plan-packages',
  standalone: true,
  imports: [
    CommonModule,
    RecordTableComponent,
    RecordEditorComponent
  ],
  templateUrl: './plan-packages.component.html',
  styleUrl: './plan-packages.component.css'
})
export class PlanPackagesPageComponent extends RecordPageController {
  constructor() {
    super(
      'digital-marketing',
      'digitalMarketingPlans',
      inject(DigitalMarketingService)
    );
  }
}