import { Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { CustomersService } from '../../services/customers.service';
import { CrmStore } from '../../../../core/services/crm-store.service';

type RenewalStatus =
  | 'ACTIVE'
  | 'DUE_SOON'
  | 'PAYMENT_PENDING'
  | 'PROMISED_DATE'
  | 'ON_HOLD'
  | 'RENEWED'
  | 'EXPIRED';

interface DomainForm {
  customerId: string;
  domainName: string;
  provider: string;
  purchaseDate: string;
  expiryDate: string;
  renewalAmount: number | null;
  status: RenewalStatus;
  nextFollowUpDate: string;
  followUpNote: string;
  newExpiryDate: string;
  reminderDays: number[];
  notes: string;
}

@Component({
  selector: 'app-domain-renewals',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule
  ],
  templateUrl: './domain-renewals.component.html',
  styleUrl: './domain-renewals.component.css'
})
export class DomainRenewalsPageComponent {

  private readonly customersService = inject(CustomersService);
  private readonly store = inject(CrmStore);

  showAddDomain = false;

  saving = false;

  saveError = '';

  domainForm: DomainForm = this.createEmptyForm();


  // ==========================================
  // CUSTOMERS
  // ==========================================

  get customers(): any[] {
    return this.customersService.list('customers');
  }

  customerLabel(customer: any): string {
    return (
      customer?.businessName ||
      customer?.customerName ||
      customer?.companyName ||
      customer?.name ||
      'Customer'
    );
  }

  customerName(customerId: string): string {

    const customer =
      this.customers.find(
        x => x.id === customerId
      );

    return customer
      ? this.customerLabel(customer)
      : 'Customer';
  }


  // ==========================================
  // DOMAIN RECORDS
  // ==========================================

  get domains(): any[] {
    return this.store.list('domainRenewals');
  }

  get totalDomains(): number {
    return this.domains.length;
  }

  get dueSoonCount(): number {

    return this.domains.filter(
      x => x.status === 'DUE_SOON'
    ).length;
  }

  get followUpCount(): number {

    return this.domains.filter(
      x =>
        x.status === 'PAYMENT_PENDING' ||
        x.status === 'PROMISED_DATE' ||
        x.status === 'ON_HOLD'
    ).length;
  }

  get expiredCount(): number {

    return this.domains.filter(
      x => x.status === 'EXPIRED'
    ).length;
  }


  statusLabel(status: string): string {

    const labels: Record<string, string> = {

      ACTIVE: 'Active',

      DUE_SOON: 'Due soon',

      PAYMENT_PENDING: 'Payment pending',

      PROMISED_DATE: 'Promised date',

      ON_HOLD: 'On hold',

      RENEWED: 'Renewed',

      EXPIRED: 'Expired'

    };

    return labels[status] || status;
  }


  statusClass(status: string): string {

    return String(status || '')
      .toLowerCase()
      .replace(/_/g, '-');
  }


  // ==========================================
  // MODAL
  // ==========================================

  openAddDomain(): void {

    this.domainForm =
      this.createEmptyForm();

    this.saveError = '';

    this.showAddDomain = true;
  }


  closeAddDomain(): void {

    if (this.saving) {
      return;
    }

    this.showAddDomain = false;

    this.saveError = '';
  }


  // ==========================================
  // SAVE
  // ==========================================

  async saveDomain(): Promise<void> {

    this.saveError = '';

    if (!this.domainForm.customerId) {

      this.saveError =
        'Please select a customer.';

      return;
    }


    if (!this.domainForm.domainName.trim()) {

      this.saveError =
        'Please enter the domain name.';

      return;
    }


    if (!this.domainForm.expiryDate) {

      this.saveError =
        'Please select the expiry / renewal date.';

      return;
    }


    if (
      this.domainForm.status === 'RENEWED' &&
      !this.domainForm.newExpiryDate
    ) {

      this.saveError =
        'Please enter the new expiry date.';

      return;
    }


    this.saving = true;


    try {

      const record = {

        customerId:
          this.domainForm.customerId,

        domainName:
          this.domainForm.domainName
            .trim()
            .toLowerCase(),

        provider:
          this.domainForm.provider,

        purchaseDate:
          this.domainForm.purchaseDate || null,

        expiryDate:
          this.domainForm.expiryDate,

        renewalAmount:
          Number(
            this.domainForm.renewalAmount || 0
          ),

        status:
          this.domainForm.status,

        nextFollowUpDate:
          this.domainForm.nextFollowUpDate || null,

        followUpNote:
          this.domainForm.followUpNote.trim(),

        newExpiryDate:
          this.domainForm.newExpiryDate || null,

        notes:
          this.domainForm.notes.trim()

      };


      await this.store.save(
        'domainRenewals',
        record
      );


      this.store.toast(
        'Domain renewal saved successfully.'
      );


      this.showAddDomain = false;

      this.domainForm =
        this.createEmptyForm();


    } catch (error: any) {

      console.error(
        'Domain renewal save failed:',
        error
      );


      this.saveError =
        error?.error?.message ||
        error?.message ||
        'Unable to save domain renewal.';

    } finally {

      this.saving = false;
    }
  }


  private createEmptyForm(): DomainForm {

    return {

      customerId: '',

      domainName: '',

      provider: '',

      purchaseDate: '',

      expiryDate: '',

      renewalAmount: null,

      status: 'ACTIVE',

      nextFollowUpDate: '',

      followUpNote: '',

      newExpiryDate: '',

      reminderDays: [
        30,
        15,
        7,
        1
      ],

      notes: ''
    };
  }

}