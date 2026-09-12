import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RecordPageController } from '../../controllers/record-page.controller';

@Component({ selector:'app-record-table', standalone:true, imports:[CommonModule, FormsModule], templateUrl:'./record-table.component.html', styleUrl:'./record-table.component.css' })
export class RecordTableComponent {
 @Input({required:true}) vm!: RecordPageController;
}
