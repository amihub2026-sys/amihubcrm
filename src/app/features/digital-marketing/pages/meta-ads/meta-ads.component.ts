import { CommonModule } from '@angular/common';
import {
  Component,
  OnDestroy,
  OnInit,
  inject,
} from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpErrorResponse } from '@angular/common/http';
import { Subscription } from 'rxjs';

import {
  MetaAccount,
  MetaAdsService,
  MetaBootstrapResponse,
  MetaCampaign,
  MetaCurrencySummary,
  MetaDailyInsight,
  MetaDashboardAccount,
  MetaDashboardResponse,
  MetaDetailResponse,
  MetaEntity,
} from './meta-ads.service';

@Component({
  selector: 'app-meta-ads',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
  ],
  templateUrl: './meta-ads.component.html',
  styleUrl: './meta-ads.component.css',
})
export class MetaAdsComponent
  implements OnInit, OnDestroy {

  private readonly metaAdsService =
    inject(MetaAdsService);

  private readonly subscriptions =
    new Subscription();

  /* =====================================================
     PAGE STATE
  ===================================================== */

  loading = false;
  bootstrapLoading = false;
  dashboardLoading = false;
  detailLoading = false;

  errorMessage = '';
  successMessage = '';

  canManage = false;
  configured = false;

  connections: string[] = [];
  customers: MetaBootstrapResponse['customers'] = [];
  linkedAccounts: MetaAccount[] = [];

  dashboardAccounts: MetaDashboardAccount[] = [];
  currencies: MetaCurrencySummary[] = [];

  clientCount = 0;

  /* =====================================================
     FILTERS
  ===================================================== */

  selectedCustomerId = '';

  fromDate = '';
  toDate = '';

  /* =====================================================
     LINK ACCOUNT FORM
  ===================================================== */

  linkCustomerId = '';
  metaAccountId = '';
  connectionKey = '';

  linking = false;

  /* =====================================================
     ACCOUNT DETAIL
  ===================================================== */

  selectedAccount: MetaDashboardAccount | null = null;

  entities: MetaEntity[] = [];
  daily: MetaDailyInsight[] = [];

  detailCurrency = '';
  detailTimezone = '';

  selectedDetailTab:
    | 'campaigns'
    | 'adsets'
    | 'ads'
    | 'daily' = 'campaigns';

  /* =====================================================
     PER-ACCOUNT ACTION STATE
  ===================================================== */

  syncingAccountId = '';
  updatingAccountId = '';

  /* =====================================================
     INITIALIZATION
  ===================================================== */

  ngOnInit(): void {
    this.setDefaultDates();
    this.loadBootstrap();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  /* =====================================================
     DEFAULT DATE RANGE
  ===================================================== */

  private setDefaultDates(): void {
    const today = new Date();

    this.toDate =
      this.toDateInputValue(today);

    const monthStart = new Date(
      today.getFullYear(),
      today.getMonth(),
      1,
    );

    this.fromDate =
      this.toDateInputValue(monthStart);
  }

  private toDateInputValue(
    date: Date,
  ): string {

    const year =
      date.getFullYear();

    const month =
      String(
        date.getMonth() + 1,
      ).padStart(2, '0');

    const day =
      String(
        date.getDate(),
      ).padStart(2, '0');

    return `${year}-${month}-${day}`;
  }

  /* =====================================================
     BOOTSTRAP
  ===================================================== */

  loadBootstrap(): void {
    this.bootstrapLoading = true;
    this.errorMessage = '';

    const sub =
      this.metaAdsService
        .bootstrap()
        .subscribe({
          next: (response) => {
            this.canManage =
              response.canManage;

            this.configured =
              response.configured;

            this.connections =
              response.connections || [];

            this.customers =
              response.customers || [];

            this.linkedAccounts =
              response.accounts || [];

            if (
              !this.linkCustomerId &&
              this.customers.length
            ) {
              this.linkCustomerId =
                this.customers[0].id;
            }

            if (
              !this.connectionKey &&
              this.connections.length
            ) {
              this.connectionKey =
                this.connections[0];
            }

            this.bootstrapLoading = false;

            this.loadDashboard();
          },

          error: (error) => {
            this.bootstrapLoading = false;

            this.errorMessage =
              this.getErrorMessage(
                error,
                'Unable to load Meta Ads setup.',
              );
          },
        });

    this.subscriptions.add(sub);
  }

  /* =====================================================
     DASHBOARD
  ===================================================== */

  loadDashboard(): void {
    if (
      this.fromDate &&
      this.toDate &&
      this.fromDate > this.toDate
    ) {
      this.errorMessage =
        'From date cannot be after To date.';

      return;
    }

    this.dashboardLoading = true;
    this.errorMessage = '';
    this.successMessage = '';

    const sub =
      this.metaAdsService
        .dashboard({
          customerId:
            this.selectedCustomerId ||
            undefined,

          from:
            this.fromDate ||
            undefined,

          to:
            this.toDate ||
            undefined,
        })
        .subscribe({
          next: (
            response:
              MetaDashboardResponse,
          ) => {

            this.dashboardAccounts =
              response.accounts || [];

            this.currencies =
              response.currencies || [];

            this.clientCount =
              response.clientCount || 0;

            this.dashboardLoading = false;

            if (
              this.selectedAccount
            ) {
              const updated =
                this.dashboardAccounts.find(
                  (account) =>
                    account.id ===
                    this.selectedAccount?.id,
                );

              if (updated) {
                this.selectedAccount =
                  updated;
              } else {
                this.closeDetail();
              }
            }
          },

          error: (error) => {
            this.dashboardLoading = false;

            this.errorMessage =
              this.getErrorMessage(
                error,
                'Unable to load Meta Ads dashboard.',
              );
          },
        });

    this.subscriptions.add(sub);
  }

  /* =====================================================
     FILTER EVENTS
  ===================================================== */

  applyFilters(): void {
    this.loadDashboard();
  }

  clearFilters(): void {
    this.selectedCustomerId = '';

    this.setDefaultDates();

    this.closeDetail();

    this.loadDashboard();
  }

  /* =====================================================
     LINK / RECONNECT ACCOUNT
  ===================================================== */

  linkAccount(): void {
    if (!this.canManage) {
      return;
    }

    if (!this.configured) {
      this.errorMessage =
        'Meta backend connection is not configured yet.';

      return;
    }

    if (!this.linkCustomerId) {
      this.errorMessage =
        'Select a CRM customer.';

      return;
    }

    if (!this.metaAccountId.trim()) {
      this.errorMessage =
        'Enter the Meta ad account ID.';

      return;
    }

    if (!this.connectionKey) {
      this.errorMessage =
        'Select a backend connection.';

      return;
    }

    this.linking = true;
    this.errorMessage = '';
    this.successMessage = '';

    const sub =
      this.metaAdsService
        .linkAccount({
          customerId:
            this.linkCustomerId,

          metaAccountId:
            this.metaAccountId.trim(),

          connectionKey:
            this.connectionKey,
        })
        .subscribe({
          next: () => {
            this.linking = false;

            this.metaAccountId = '';

            this.successMessage =
              'Meta ad account linked successfully.';

            this.loadBootstrap();
          },

          error: (error) => {
            this.linking = false;

            this.errorMessage =
              this.getErrorMessage(
                error,
                'Unable to link the Meta ad account.',
              );
          },
        });

    this.subscriptions.add(sub);
  }

  /* =====================================================
     PAUSE / RESUME CRM SYNC
  ===================================================== */

  toggleAccount(
    account:
      MetaDashboardAccount,
  ): void {

    if (
      !this.canManage ||
      this.updatingAccountId
    ) {
      return;
    }

    this.updatingAccountId =
      account.id;

    this.errorMessage = '';
    this.successMessage = '';

    const enabled =
      !account.enabled;

    const sub =
      this.metaAdsService
        .setAccountEnabled(
          account.id,
          enabled,
        )
        .subscribe({
          next: () => {
            this.updatingAccountId = '';

            this.successMessage =
              enabled
                ? 'CRM Meta sync resumed.'
                : 'CRM Meta sync paused. Your Meta ads are not paused.';

            this.loadBootstrap();
          },

          error: (error) => {
            this.updatingAccountId = '';

            this.errorMessage =
              this.getErrorMessage(
                error,
                'Unable to update CRM Meta sync.',
              );
          },
        });

    this.subscriptions.add(sub);
  }

  /* =====================================================
     MANUAL SYNC
  ===================================================== */

  syncAccount(
    account:
      MetaDashboardAccount,
  ): void {

    if (
      this.syncingAccountId ||
      !account.enabled
    ) {
      return;
    }

    if (
      this.fromDate &&
      this.toDate &&
      this.fromDate > this.toDate
    ) {
      this.errorMessage =
        'From date cannot be after To date.';

      return;
    }

    this.syncingAccountId =
      account.id;

    this.errorMessage = '';
    this.successMessage = '';

    const sub =
      this.metaAdsService
        .syncAccount(
          account.id,
          this.fromDate || undefined,
          this.toDate || undefined,
        )
        .subscribe({
          next: () => {
            this.syncingAccountId = '';

            this.successMessage =
              'Meta sync has been queued.';

            this.loadBootstrap();
          },

          error: (error) => {
            this.syncingAccountId = '';

            this.errorMessage =
              this.getErrorMessage(
                error,
                'Unable to queue Meta sync.',
              );
          },
        });

    this.subscriptions.add(sub);
  }

  /* =====================================================
     ACCOUNT DETAIL
  ===================================================== */

  openDetail(
    account:
      MetaDashboardAccount,
  ): void {

    this.selectedAccount =
      account;

    this.entities = [];
    this.daily = [];

    this.detailCurrency =
      account.currency || '';

    this.detailTimezone =
      account.timezone || '';

    this.selectedDetailTab =
      'campaigns';

    this.loadDetail();
  }

  loadDetail(): void {
    if (!this.selectedAccount) {
      return;
    }

    this.detailLoading = true;
    this.errorMessage = '';

    const sub =
      this.metaAdsService
        .detail(
          this.selectedAccount.id,
          {
            from:
              this.fromDate ||
              undefined,

            to:
              this.toDate ||
              undefined,
          },
        )
        .subscribe({
          next: (
            response:
              MetaDetailResponse,
          ) => {

            this.entities =
              response.entities || [];

            this.daily =
              response.daily || [];

            this.detailCurrency =
              response.currency || '';

            this.detailTimezone =
              response.timezone || '';

            this.detailLoading = false;
          },

          error: (error) => {
            this.detailLoading = false;

            this.errorMessage =
              this.getErrorMessage(
                error,
                'Unable to load Meta account details.',
              );
          },
        });

    this.subscriptions.add(sub);
  }

  closeDetail(): void {
    this.selectedAccount = null;

    this.entities = [];
    this.daily = [];

    this.detailCurrency = '';
    this.detailTimezone = '';
  }

  /* =====================================================
     ENTITY COLLECTIONS
  ===================================================== */

  get campaignEntities():
    MetaEntity[] {

    return this.entities.filter(
      (entity) =>
        entity.kind ===
        'campaign',
    );
  }

  get adSetEntities():
    MetaEntity[] {

    return this.entities.filter(
      (entity) =>
        entity.kind ===
        'adset',
    );
  }

  get adEntities():
    MetaEntity[] {

    return this.entities.filter(
      (entity) =>
        entity.kind ===
        'ad',
    );
  }

  /* =====================================================
     CAMPAIGN HELPERS
  ===================================================== */

  getAccountCampaigns(
    account:
      MetaDashboardAccount,
  ): MetaCampaign[] {

    return account.campaigns || [];
  }

  campaignName(
    metaId?: string,
  ): string {

    if (!metaId) {
      return '—';
    }

    const campaign =
      this.entities.find(
        (entity) =>
          entity.kind ===
            'campaign' &&
          entity.metaId ===
            metaId,
      );

    return (
      campaign?.name ||
      metaId
    );
  }

  adSetName(
    metaId?: string,
  ): string {

    if (!metaId) {
      return '—';
    }

    const adSet =
      this.entities.find(
        (entity) =>
          entity.kind ===
            'adset' &&
          entity.metaId ===
            metaId,
      );

    return (
      adSet?.name ||
      metaId
    );
  }

  /* =====================================================
     DISPLAY HELPERS
  ===================================================== */

  customerName(
    customerId?: string,
  ): string {

    if (!customerId) {
      return '—';
    }

    const customer =
      this.customers.find(
        (item) =>
          item.id === customerId,
      );

    return (
      customer?.businessName ||
      customerId
    );
  }

  displayValue(
    value:
      | number
      | string
      | null
      | undefined,
  ): string {

    if (
      value === null ||
      value === undefined ||
      value === ''
    ) {
      return '—';
    }

    return String(value);
  }

  formatNumber(
    value:
      | number
      | null
      | undefined,
    maximumFractionDigits = 0,
  ): string {

    if (
      value === null ||
      value === undefined ||
      !Number.isFinite(value)
    ) {
      return '—';
    }

    return new Intl.NumberFormat(
      'en-IN',
      {
        maximumFractionDigits,
      },
    ).format(value);
  }

  formatMoney(
    value:
      | number
      | null
      | undefined,
    currency?: string,
  ): string {

    if (
      value === null ||
      value === undefined ||
      !Number.isFinite(value)
    ) {
      return '—';
    }

    if (!currency) {
      return this.formatNumber(
        value,
        2,
      );
    }

    try {
      return new Intl.NumberFormat(
        'en-IN',
        {
          style: 'currency',
          currency,
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        },
      ).format(value);
    } catch {
      return `${currency} ${this.formatNumber(
        value,
        2,
      )}`;
    }
  }

  formatBudget(
    value:
      | string
      | null
      | undefined,
    currency?: string,
  ): string {

    if (
      value === null ||
      value === undefined ||
      value === ''
    ) {
      return '—';
    }

    const minor =
      Number(value);

    if (!Number.isFinite(minor)) {
      return '—';
    }

    return this.formatMoney(
      minor / 100,
      currency,
    );
  }

  formatPercent(
    value:
      | number
      | null
      | undefined,
  ): string {

    if (
      value === null ||
      value === undefined ||
      !Number.isFinite(value)
    ) {
      return '—';
    }

    return `${this.formatNumber(
      value,
      2,
    )}%`;
  }

  formatDate(
    value:
      | string
      | null
      | undefined,
  ): string {

    if (!value) {
      return '—';
    }

    const date =
      new Date(value);

    if (
      Number.isNaN(
        date.getTime(),
      )
    ) {
      return value;
    }

    return new Intl.DateTimeFormat(
      'en-IN',
      {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
      },
    ).format(date);
  }

  formatDateTime(
    value:
      | string
      | null
      | undefined,
  ): string {

    if (!value) {
      return '—';
    }

    const date =
      new Date(value);

    if (
      Number.isNaN(
        date.getTime(),
      )
    ) {
      return value;
    }

    return new Intl.DateTimeFormat(
      'en-IN',
      {
        day: '2-digit',
        month: 'short',
        year: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
      },
    ).format(date);
  }

  /* =====================================================
     STATUS HELPERS
  ===================================================== */

  statusClass(
    status:
      | string
      | null
      | undefined,
  ): string {

    const value =
      String(
        status || '',
      ).toUpperCase();

    if (
      value === 'ACTIVE' ||
      value === 'IDLE'
    ) {
      return 'status-success';
    }

    if (
      value === 'QUEUED' ||
      value === 'RUNNING'
    ) {
      return 'status-warning';
    }

    if (
      value === 'ERROR' ||
      value === 'DISABLED'
    ) {
      return 'status-danger';
    }

    return 'status-neutral';
  }

  /* =====================================================
     CSV EXPORT
  ===================================================== */

  exportCsv(): void {
    if (
      !this.dashboardAccounts.length
    ) {
      this.errorMessage =
        'There is no Meta Ads data to export.';

      return;
    }

    const rows: string[][] = [
      [
        'Client',
        'Meta Account',
        'Currency',
        'From',
        'To',
        'Spend',
        'Leads',
        'CPL',
        'Clicks',
        'Impressions',
        'Reach',
        'CTR',
        'CPM',
        'Last Sync',
      ],
    ];

    for (
      const account
      of this.dashboardAccounts
    ) {
      const totals =
        account.report?.totals;

      rows.push([
        account.customerName ||
          this.customerName(
            account.customerId,
          ),

        account.name ||
          account.metaAccountId,

        account.currency || '',

        account.from || '',
        account.to || '',

        this.csvValue(
          totals?.spend,
        ),

        this.csvValue(
          totals?.leads,
        ),

        this.csvValue(
          totals?.cpl,
        ),

        this.csvValue(
          totals?.clicks,
        ),

        this.csvValue(
          totals?.impressions,
        ),

        this.csvValue(
          totals?.reach,
        ),

        this.csvValue(
          totals?.ctr,
        ),

        this.csvValue(
          totals?.cpm,
        ),

        account.report?.syncedAt ||
          account.lastSyncedAt ||
          '',
      ]);
    }

    const csv =
      rows
        .map((row) =>
          row
            .map((value) =>
              this.escapeCsv(
                value,
              ),
            )
            .join(','),
        )
        .join('\r\n');

    const blob =
      new Blob(
        [csv],
        {
          type:
            'text/csv;charset=utf-8;',
        },
      );

    const url =
      URL.createObjectURL(
        blob,
      );

    const anchor =
      document.createElement(
        'a',
      );

    anchor.href = url;

    anchor.download =
      `meta-ads-report-${this.fromDate || 'from'}-${this.toDate || 'to'}.csv`;

    anchor.click();

    URL.revokeObjectURL(
      url,
    );
  }

  private csvValue(
    value:
      | string
      | number
      | null
      | undefined,
  ): string {

    if (
      value === null ||
      value === undefined
    ) {
      return '';
    }

    return String(value);
  }

  private escapeCsv(
    value: string,
  ): string {

    return `"${String(value)
      .replace(
        /"/g,
        '""',
      )}"`;
  }

  /* =====================================================
     ERROR HANDLING
  ===================================================== */

  private getErrorMessage(
    error: unknown,
    fallback: string,
  ): string {

    const httpError =
      error as HttpErrorResponse;

    const backendMessage =
      httpError?.error?.message;

    if (
      typeof backendMessage ===
        'string' &&
      backendMessage.trim()
    ) {
      return backendMessage;
    }

    if (
      httpError?.status === 403
    ) {
      return 'You do not have permission to access this Meta Ads data.';
    }

    if (
      httpError?.status === 404
    ) {
      return 'The requested Meta Ads record was not found.';
    }

    if (
      httpError?.status === 409
    ) {
      return 'The Meta account is currently busy. Please refresh and try again.';
    }

    if (
      httpError?.status === 422
    ) {
      return 'Please check the Meta Ads information and try again.';
    }

    if (
      httpError?.status === 0
    ) {
      return 'Unable to connect to the CRM backend.';
    }

    return fallback;
  }
}