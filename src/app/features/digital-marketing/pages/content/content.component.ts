import { DigitalMarketingService } from '../../services/digital-marketing.service';
import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';

import { RecordPageController } from '../../../../shared/controllers/record-page.controller';
import { RecordEditorComponent } from '../../../../shared/components/record-editor/record-editor.component';

@Component({
  selector: 'app-digital-marketing-content',
  standalone: true,
  imports: [
    CommonModule,
    RecordEditorComponent
  ],
  templateUrl: './content.component.html',
  styleUrl: './content.component.css'
})
export class ContentPageComponent extends RecordPageController {

  selectedCustomerId = '';
  selectedPlanId = '';

  constructor() {
    super(
      'digital-marketing',
      'content',
      inject(DigitalMarketingService)
    );
  }


  // =====================================================
  // CUSTOMERS
  // =====================================================

  get customers() {
    return this.store.list('customers');
  }


  // =====================================================
  // MONTHLY PLANS FOR SELECTED CUSTOMER
  // =====================================================

  get customerPlans() {
    if (!this.selectedCustomerId) {
      return [];
    }

    return this.store
      .list('plans')
      .filter(
        (plan) =>
          plan.customerId === this.selectedCustomerId
      );
  }


  // =====================================================
  // SELECTED PLAN
  // =====================================================

  get selectedPlan() {
    if (!this.selectedPlanId) {
      return null;
    }

    return (
      this.store
        .list('plans')
        .find(
          (plan) =>
            plan.id === this.selectedPlanId
        ) || null
    );
  }


  // =====================================================
  // CUSTOMER CHANGE
  // =====================================================

  selectCustomer(customerId: string) {
    this.selectedCustomerId = customerId;
    this.selectedPlanId = '';
  }


  // =====================================================
  // PLAN CHANGE
  // =====================================================

  selectPlan(planId: string) {
    this.selectedPlanId = planId;
  }


  // =====================================================
  // CONTENT FOR SELECTED PLAN
  // =====================================================

  get scheduledContent() {
    if (!this.selectedPlanId) {
      return [];
    }

    return this.store
      .list('content')
      .filter(
        (item) =>
          item.marketingPlanId === this.selectedPlanId
      );
  }


  // =====================================================
  // PACKAGE TARGETS
  // =====================================================

  get posterTarget() {
    return Number(
      this.selectedPlan?.posterTarget || 0
    );
  }

  get videoTarget() {
    return Number(
      this.selectedPlan?.videoTarget || 0
    );
  }


  // =====================================================
  // SCHEDULED COUNTS
  // =====================================================

  get scheduledPosters() {
    return this.scheduledContent.filter(
      (item) =>
        String(item.contentType || '')
          .trim()
          .toLowerCase() === 'poster'
    ).length;
  }

  get scheduledVideos() {
    return this.scheduledContent.filter(
      (item) =>
        String(item.contentType || '')
          .trim()
          .toLowerCase() === 'video'
    ).length;
  }


  // =====================================================
  // REMAINING COUNTS
  // =====================================================

  get remainingPosters() {
    return Math.max(
      0,
      this.posterTarget - this.scheduledPosters
    );
  }

  get remainingVideos() {
    return Math.max(
      0,
      this.videoTarget - this.scheduledVideos
    );
  }


  // =====================================================
  // PLAN CYCLE DATES
  // =====================================================

  get cycleStartDate() {
    return this.selectedPlan?.planStartDate || '';
  }

  get nextPaymentDate() {
    return this.selectedPlan?.nextPaymentDate || '';
  }


  // =====================================================
  // DISPLAY PLAN CYCLE
  // Example:
  // 05 Oct 2026 - 04 Nov 2026
  // =====================================================

  get cycleLabel() {

    if (
      !this.cycleStartDate ||
      !this.nextPaymentDate
    ) {
      return '';
    }

    const start =
      this.parseDate(
        this.cycleStartDate
      );

    const nextPayment =
      this.parseDate(
        this.nextPaymentDate
      );

    if (
      !start ||
      !nextPayment
    ) {
      return '';
    }

    // Day before next payment
    const end =
      new Date(
        nextPayment.getTime()
      );

    end.setUTCDate(
      end.getUTCDate() - 1
    );

    return (
      `${this.formatDisplayDate(start)} - ${this.formatDisplayDate(end)}`
    );
  }


  // =====================================================
  // CONTENT CALENDAR
  //
  // IMPORTANT:
  //
  // Plan Start:
  // 05-10-2026
  //
  // Next Payment:
  // 05-11-2026
  //
  // Calendar:
  // 05 Oct → 04 Nov
  //
  // =====================================================

  get calendarCells() {

    if (
      !this.cycleStartDate ||
      !this.nextPaymentDate
    ) {
      return [];
    }


    const startDate =
      this.parseDate(
        this.cycleStartDate
      );

    const nextPaymentDate =
      this.parseDate(
        this.nextPaymentDate
      );


    if (
      !startDate ||
      !nextPaymentDate
    ) {
      return [];
    }


    if (
      startDate.getTime() >=
      nextPaymentDate.getTime()
    ) {
      return [];
    }


    const cells: any[] = [];


    // ===================================================
    // EMPTY CELLS BEFORE START DATE
    //
    // Example:
    // Plan starts Monday.
    // Sunday gets one empty box.
    // ===================================================

    const firstWeekDay =
      startDate.getUTCDay();

    for (
      let i = 0;
      i < firstWeekDay;
      i++
    ) {
      cells.push({
        empty: true
      });
    }


    // ===================================================
    // START DATE → DAY BEFORE NEXT PAYMENT
    // ===================================================

    const current =
      new Date(
        startDate.getTime()
      );


    while (
      current.getTime() <
      nextPaymentDate.getTime()
    ) {

      const year =
        current.getUTCFullYear();

      const month =
        current.getUTCMonth() + 1;

      const day =
        current.getUTCDate();

      const weekDay =
        current.getUTCDay();


      const date =
        `${year}-${String(month).padStart(2, '0')}-${String(day).padStart(2, '0')}`;


      const entries =
        this.scheduledContent.filter(
          (item) =>
            item.scheduledDate === date
        );


      cells.push({
        empty: false,

        day,

        date,

        month,

        year,

        monthName:
          this.getMonthShortName(
            month
          ),

        displayDate:
          `${day} ${this.getMonthShortName(month)}`,

        isSunday:
          weekDay === 0,

        entries
      });


      current.setUTCDate(
        current.getUTCDate() + 1
      );
    }


    return cells;
  }


  // =====================================================
  // CLICK DATE → CREATE CONTENT
  // =====================================================

  scheduleDate(cell: any) {

    if (
      !cell ||
      cell.empty
    ) {
      return;
    }


    // Sundays blocked
    if (cell.isSunday) {
      return;
    }


    if (
      !this.selectedCustomerId ||
      !this.selectedPlanId ||
      !this.selectedPlan
    ) {
      return;
    }


    if (!this.canCreate) {
      return;
    }


    // New content record
    this.draft = {

      status: 'PLANNED',

      customerId:
        this.selectedCustomerId,

      marketingPlanId:
        this.selectedPlanId,

      scheduledDate:
        cell.date
    };


    this.error = '';
    this.modal = true;


    setTimeout(
      () =>
        document
          .querySelector<HTMLInputElement>(
            '.modal input'
          )
          ?.focus(),
      30
    );
  }


  // =====================================================
  // DATE HELPERS
  // =====================================================

  private parseDate(
    value: string
  ): Date | null {

    if (
      !/^\d{4}-\d{2}-\d{2}$/.test(
        value
      )
    ) {
      return null;
    }


    const [
      year,
      month,
      day
    ] =
      value
        .split('-')
        .map(Number);


    return new Date(
      Date.UTC(
        year,
        month - 1,
        day
      )
    );
  }


  private getMonthShortName(
    month: number
  ) {

    const months = [
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec'
    ];

    return (
      months[month - 1] || ''
    );
  }


  private formatDisplayDate(
    date: Date
  ) {

    return (
      `${String(date.getUTCDate()).padStart(2, '0')} ` +
      `${this.getMonthShortName(date.getUTCMonth() + 1)} ` +
      `${date.getUTCFullYear()}`
    );
  }
}