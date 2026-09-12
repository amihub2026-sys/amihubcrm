import { ProjectsService } from '../../services/projects.service';
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecordPageController } from '../../../../shared/controllers/record-page.controller';
import { RecordTableComponent } from '../../../../shared/components/record-table/record-table.component';
import { RecordEditorComponent } from '../../../../shared/components/record-editor/record-editor.component';

@Component({
 selector: 'app-projects-projects', standalone: true,
 imports: [CommonModule, RecordTableComponent, RecordEditorComponent],
 templateUrl: './projects.component.html',
 styleUrl: './projects.component.css'
})
export class ProjectsPageComponent extends RecordPageController {
 constructor() { super('projects', 'projects', inject(ProjectsService)); }
}
