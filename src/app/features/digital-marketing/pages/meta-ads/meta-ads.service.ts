import { Injectable } from '@angular/core';
import {
  HttpClient,
  HttpParams,
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../../environments/environment';

/* =========================================================
   COMMON TYPES
========================================================= */

export type MetaSyncState =
  | 'IDLE'
  | 'QUEUED'
  | 'RUNNING'
  | 'ERROR';

export type MetaEntityKind =
  | 'campaign'
  | 'adset'
  | 'ad';


/* =========================================================
   CUSTOMER
========================================================= */

export interface MetaCustomer {
  id: string;
  businessName?: string;
  accountManager?: string;
}


/* =========================================================
   METRICS
========================================================= */

export interface MetaMetrics {
  spend?: number;
  impressions?: number;
  clicks?: number;
  leads?: number;
  reach?: number;
  cpl?: number;
  ctr?: number;
  cpm?: number;
}


/* =========================================================
   META ACCOUNT
========================================================= */

export interface MetaAccount {
  id: string;

  customerId: string;
  metaAccountId: string;

  name?: string;

  currency?: string;
  timezone?: string;

  accountStatus?: number;

  enabled: boolean;

  syncState: MetaSyncState;

  syncError?: string;

  lastSyncedAt?: string | null;
  nextSyncAt?: string | null;

  syncMinutes?: number;

  createdAt?: string;
  updatedAt?: string;

  revision?: number;
}


/* =========================================================
   BOOTSTRAP
========================================================= */

export interface MetaBootstrapResponse {
  canManage: boolean;

  configured: boolean;

  connections: string[];

  customers: MetaCustomer[];

  accounts: MetaAccount[];
}


/* =========================================================
   CAMPAIGN
========================================================= */

export interface MetaCampaign {
  metaId: string;

  name: string;

  effectiveStatus?: string;

  objective?: string;

  dailyBudgetMinor?: string;

  lifetimeBudgetMinor?: string;

  startTime?: string;

  stopTime?: string;

  metrics?: MetaMetrics | null;
}


/* =========================================================
   REPORT
========================================================= */

export interface MetaAccountReport {
  totals: MetaMetrics;

  syncedAt?: string | null;
}


/* =========================================================
   DASHBOARD ACCOUNT
========================================================= */

export interface MetaDashboardAccount
  extends MetaAccount {

  customerName?: string;

  from: string;

  to: string;

  today: string;

  report?: MetaAccountReport | null;

  todaySpend?: number | null;

  monthSpend?: number | null;

  todaySyncedAt?: string | null;

  monthSyncedAt?: string | null;

  activeCampaigns?: number | null;

  campaigns: MetaCampaign[];
}


/* =========================================================
   CURRENCY SUMMARY

   IMPORTANT:
   The backend deliberately returns separate summaries
   for each currency. Never combine them in Angular.
========================================================= */

export interface MetaCurrencySummary {
  currency: string;

  totals?: MetaMetrics | null;

  reportedAccounts: number;

  totalAccounts: number;

  todaySpend?: number | null;

  todayReportedAccounts: number;

  monthSpend?: number | null;

  monthReportedAccounts: number;
}


/* =========================================================
   DASHBOARD RESPONSE
========================================================= */

export interface MetaDashboardResponse {
  accounts: MetaDashboardAccount[];

  currencies: MetaCurrencySummary[];

  clientCount: number;
}


/* =========================================================
   ENTITY DETAIL
========================================================= */

export interface MetaEntity {
  id: string;

  accountId: string;

  metaId: string;

  kind: MetaEntityKind;

  name?: string;

  campaignId?: string;

  adsetId?: string;

  status?: string;

  effectiveStatus?: string;

  objective?: string;

  dailyBudgetMinor?: string;

  lifetimeBudgetMinor?: string;

  startTime?: string;

  stopTime?: string;

  optimizationGoal?: string;

  targetingSummary?: string;

  createdAt?: string;

  updatedAt?: string;
}


/* =========================================================
   DAILY INSIGHT
========================================================= */

export interface MetaDailyInsight
  extends MetaMetrics {

  id: string;

  accountId: string;

  date: string;

  currency?: string;

  syncedAt?: string | null;
}


/* =========================================================
   DETAIL RESPONSE
========================================================= */

export interface MetaDetailResponse {
  entities: MetaEntity[];

  daily: MetaDailyInsight[];

  currency: string;

  timezone: string;
}


/* =========================================================
   REQUEST TYPES
========================================================= */

export interface MetaLinkAccountRequest {
  customerId: string;

  metaAccountId: string;

  connectionKey: string;
}

export interface MetaLinkAccountResponse {
  account: MetaAccount;
}

export interface MetaAccountUpdateResponse {
  account: MetaAccount;
}

export interface MetaSyncResponse {
  account: MetaAccount;
}

export interface MetaDashboardQuery {
  customerId?: string;

  from?: string;

  to?: string;
}

export interface MetaDetailQuery {
  from?: string;

  to?: string;
}


/* =========================================================
   SERVICE
========================================================= */

@Injectable({
  providedIn: 'root',
})
export class MetaAdsService {

  private readonly baseUrl =
    `${environment.apiUrl}/meta`;

  constructor(
    private readonly http: HttpClient,
  ) {}


  /* =======================================================
     INITIAL DATA

     GET /api/meta/bootstrap
  ======================================================= */

  bootstrap():
    Observable<MetaBootstrapResponse> {

    return this.http.get<MetaBootstrapResponse>(
      `${this.baseUrl}/bootstrap`,
    );
  }


  /* =======================================================
     DASHBOARD

     GET /api/meta/dashboard

     Optional:
     customerId
     from
     to
  ======================================================= */

  dashboard(
    query: MetaDashboardQuery = {},
  ): Observable<MetaDashboardResponse> {

    let params = new HttpParams();

    if (query.customerId) {
      params = params.set(
        'customerId',
        query.customerId,
      );
    }

    if (query.from) {
      params = params.set(
        'from',
        query.from,
      );
    }

    if (query.to) {
      params = params.set(
        'to',
        query.to,
      );
    }

    return this.http.get<MetaDashboardResponse>(
      `${this.baseUrl}/dashboard`,
      {
        params,
      },
    );
  }


  /* =======================================================
     LINK / RECONNECT META ACCOUNT

     POST /api/meta/accounts/link

     Tokens and app secrets NEVER enter Angular.
     Only the configured backend connection alias is sent.
  ======================================================= */

  linkAccount(
    payload: MetaLinkAccountRequest,
  ): Observable<MetaLinkAccountResponse> {

    return this.http.post<MetaLinkAccountResponse>(
      `${this.baseUrl}/accounts/link`,
      payload,
    );
  }


  /* =======================================================
     ENABLE / PAUSE CRM SYNC

     PATCH /api/meta/accounts/:id

     IMPORTANT:
     This only pauses CRM synchronization.
     It does NOT pause campaigns or ads in Meta.
  ======================================================= */

  setAccountEnabled(
    accountId: string,
    enabled: boolean,
  ): Observable<MetaAccountUpdateResponse> {

    return this.http.patch<MetaAccountUpdateResponse>(
      `${this.baseUrl}/accounts/${encodeURIComponent(accountId)}`,
      {
        enabled,
      },
    );
  }


  /* =======================================================
     MANUAL SYNC

     POST /api/meta/accounts/:id/sync
  ======================================================= */

  syncAccount(
    accountId: string,
    from?: string,
    to?: string,
  ): Observable<MetaSyncResponse> {

    const body: {
      from?: string;
      to?: string;
    } = {};

    if (from) {
      body.from = from;
    }

    if (to) {
      body.to = to;
    }

    return this.http.post<MetaSyncResponse>(
      `${this.baseUrl}/accounts/${encodeURIComponent(accountId)}/sync`,
      body,
    );
  }


  /* =======================================================
     ACCOUNT DETAIL

     GET /api/meta/accounts/:id/detail
  ======================================================= */

  detail(
    accountId: string,
    query: MetaDetailQuery = {},
  ): Observable<MetaDetailResponse> {

    let params = new HttpParams();

    if (query.from) {
      params = params.set(
        'from',
        query.from,
      );
    }

    if (query.to) {
      params = params.set(
        'to',
        query.to,
      );
    }

    return this.http.get<MetaDetailResponse>(
      `${this.baseUrl}/accounts/${encodeURIComponent(accountId)}/detail`,
      {
        params,
      },
    );
  }
}