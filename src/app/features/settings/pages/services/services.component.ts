import { SettingsService } from '../../services/settings.service';
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecordPageController } from '../../../../shared/controllers/record-page.controller';
import { RecordTableComponent } from '../../../../shared/components/record-table/record-table.component';
import { RecordEditorComponent } from '../../../../shared/components/record-editor/record-editor.component';

@Component({
 selector: 'app-settings-services', standalone: true,
 imports: [CommonModule, RecordTableComponent, RecordEditorComponent],
 templateUrl: './services.component.html',
 styleUrl: './services.component.css'
})
export class ServicesPageComponent extends RecordPageController {
 constructor() { super('settings', 'services', inject(SettingsService)); }
}
