import {RouterLink} from '@angular/router';
import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RecordPageController } from '../../controllers/record-page.controller';

@Component({ selector:'app-record-editor', standalone:true, imports:[CommonModule, FormsModule, RouterLink], templateUrl:'./record-editor.component.html', styleUrl:'./record-editor.component.css' })
export class RecordEditorComponent {
 @Input({required:true}) vm!: RecordPageController;
}
