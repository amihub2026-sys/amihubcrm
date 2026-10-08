import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RecordPageController } from '../../../../shared/controllers/record-page.controller';
import { RecordEditorComponent } from '../../../../shared/components/record-editor/record-editor.component';

import { DigitalMarketingService } from '../../services/digital-marketing.service';

@Component({
  selector: 'app-digital-marketing-reminders',
  standalone: true,
  imports: [
    CommonModule,
    RecordEditorComponent
  ],
  templateUrl: './reminders.component.html',
  styleUrl: './reminders.component.css'
})
export class RemindersPageComponent extends RecordPageController {

  constructor() {
    super(
      'digital-marketing',
      'content',
      inject(DigitalMarketingService)
    );
  }


  // =====================================================
  // TODAY DATE
  // Example: 2026-10-05
  // =====================================================

  get todayDate(): string {

    const today = new Date();

    const year =
      today.getFullYear();

    const month =
      String(
        today.getMonth() + 1
      ).padStart(2, '0');

    const day =
      String(
        today.getDate()
      ).padStart(2, '0');

    return `${year}-${month}-${day}`;
  }


  // =====================================================
  // TODAY REMINDERS
  // ALL CUSTOMERS
  // =====================================================

  get todayReminders() {

    return this.store
      .list('content')
      .filter(
        (item) =>
          item.scheduledDate === this.todayDate
      );
  }


  // =====================================================
  // PENDING REMINDERS
  // PUBLISHED = COMPLETED FOR NOW
  // =====================================================

  get pendingReminders() {

    return this.todayReminders.filter(
      (item) =>
        String(item.status || '')
          .toUpperCase() !== 'PUBLISHED'
    );
  }


  // =====================================================
  // COMPLETED TODAY
  // =====================================================

  get completedReminders() {

    return this.todayReminders.filter(
      (item) =>
        String(item.status || '')
          .toUpperCase() === 'PUBLISHED'
    );
  }


  // =====================================================
  // CUSTOMER NAME
  // =====================================================

  customerName(item: any): string {

    if (!item?.customerId) {
      return 'Unknown customer';
    }

    return (
      this.store.label(
        'customers',
        item.customerId
      ) || 'Unknown customer'
    );
  }


  // =====================================================
  // ASSIGNED EMPLOYEE
  // =====================================================

  employeeName(item: any): string {

    if (!item?.assignedTo) {
      return 'Not assigned';
    }

    return (
      this.store.label(
        'directory',
        item.assignedTo
      ) || 'Not assigned'
    );
  }


  // =====================================================
  // PLAN NAME
  // =====================================================

  planName(item: any): string {

    if (!item?.marketingPlanId) {
      return '—';
    }

    return (
      this.store.label(
        'plans',
        item.marketingPlanId
      ) || '—'
    );
  }


  // =====================================================
  // IS REMINDER PENDING
  // =====================================================

  isPending(item: any): boolean {

    return (
      String(item?.status || '')
        .toUpperCase() !== 'PUBLISHED'
    );
  }
}