import { DigitalMarketingService } from '../../services/digital-marketing.service';
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecordPageController } from '../../../../shared/controllers/record-page.controller';
import { RecordTableComponent } from '../../../../shared/components/record-table/record-table.component';
import { RecordEditorComponent } from '../../../../shared/components/record-editor/record-editor.component';

@Component({
 selector: 'app-digital-marketing-plans', standalone: true,
 imports: [CommonModule, RecordTableComponent, RecordEditorComponent],
 templateUrl: './plans.component.html',
 styleUrl: './plans.component.css'
})
export class PlansPageComponent extends RecordPageController {
 constructor() { super('digital-marketing', 'plans', inject(DigitalMarketingService)); }
}
