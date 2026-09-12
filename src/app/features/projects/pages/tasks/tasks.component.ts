import { ProjectsService } from '../../services/projects.service';
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecordPageController } from '../../../../shared/controllers/record-page.controller';
import { RecordTableComponent } from '../../../../shared/components/record-table/record-table.component';
import { RecordEditorComponent } from '../../../../shared/components/record-editor/record-editor.component';

@Component({
 selector: 'app-projects-tasks', standalone: true,
 imports: [CommonModule, RecordTableComponent, RecordEditorComponent],
 templateUrl: './tasks.component.html',
 styleUrl: './tasks.component.css'
})
export class TasksPageComponent extends RecordPageController {
 constructor() { super('projects', 'tasks', inject(ProjectsService)); }
}
