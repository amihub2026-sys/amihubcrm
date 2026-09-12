import { CustomersService } from '../../services/customers.service';
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RecordPageController } from '../../../../shared/controllers/record-page.controller';
import { RecordTableComponent } from '../../../../shared/components/record-table/record-table.component';
import { RecordEditorComponent } from '../../../../shared/components/record-editor/record-editor.component';

@Component({
 selector: 'app-customers-customers', standalone: true,
 imports: [CommonModule, RecordTableComponent, RecordEditorComponent],
 templateUrl: './customers.component.html',
 styleUrl: './customers.component.css'
})
export class CustomersPageComponent extends RecordPageController {
 constructor() { super('customers', 'customers', inject(CustomersService)); }
}
