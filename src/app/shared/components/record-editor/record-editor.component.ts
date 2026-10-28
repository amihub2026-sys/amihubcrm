
import { RouterLink } from '@angular/router';
import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RecordPageController } from '../../controllers/record-page.controller';

@Component({
  selector: 'app-record-editor',
  standalone: true,
  imports: [CommonModule, FormsModule, RouterLink],
  templateUrl: './record-editor.component.html',
  styleUrl: './record-editor.component.css'
})
export class RecordEditorComponent implements OnChanges {
  @Input({ required: true }) vm!: RecordPageController;

  customerMode: 'existing' | 'manual' = 'existing';
  projectMode: 'existing' | 'manual' = 'existing';

  get isInvoice(): boolean {
    return this.vm.tab.key === 'invoices';
  }

  setCustomerMode(mode: 'existing' | 'manual'): void {
    this.customerMode = mode;

    if (mode === 'manual') {
      this.vm.draft['customerId'] = '';
    } else {
      this.vm.draft['manualCustomerName'] = '';
      this.vm.draft['manualCustomerPhone'] = '';
      this.vm.draft['manualCustomerAddress'] = '';
      this.vm.draft['manualCustomerGstin'] = '';
    }

    // Reset Project when the Customer changes.
    this.projectMode = 'existing';
    this.vm.draft['projectId'] = '';
    this.vm.draft['manualProjectName'] = '';
  }

  setProjectMode(mode: 'existing' | 'manual'): void {
    this.projectMode = mode;

    if (mode === 'manual') {
      this.vm.draft['projectId'] = '';
    } else {
      this.vm.draft['manualProjectName'] = '';
    }
  }
ngOnChanges(changes: SimpleChanges): void {
  if (changes['vm'] && this.isInvoice) {
    this.customerMode = this.vm.draft['manualCustomerName']
      ? 'manual'
      : 'existing';

    this.projectMode = this.vm.draft['manualProjectName']
      ? 'manual'
      : 'existing';
  }
}
  isManualReference(key: string): boolean {
    return this.isInvoice && (
      (key === 'customerId' && this.customerMode === 'manual') ||
      (key === 'projectId' && this.projectMode === 'manual')
    );
  }
}
