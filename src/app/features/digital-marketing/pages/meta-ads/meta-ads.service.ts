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
   CREATE META CAMPAIGN
========================================================= */

export type MetaCampaignObjective =
  | 'OUTCOME_AWARENESS'
  | 'OUTCOME_TRAFFIC'
  | 'OUTCOME_ENGAGEMENT'
  | 'OUTCOME_LEADS'
  | 'OUTCOME_SALES'
  | 'OUTCOME_APP_PROMOTION';


export interface MetaCreateCampaignRequest {
  name: string;

  objective: MetaCampaignObjective;

  specialAdCategories?: string[];
}


export interface MetaCreatedCampaign {
  id: string;

  name: string;

  objective: string;

  status: string;

  accountId: string;

  metaAccountId: string;
}


export interface MetaCreateCampaignResponse {
  campaign: MetaCreatedCampaign;
}


/* =========================================================
   CREATE META AD SET / AUDIENCE
========================================================= */

export type MetaAdSetGender =
  | 'ALL'
  | 'MALE'
  | 'FEMALE';


export interface MetaCreateAdSetRequest {
  campaignId: string;

  name: string;

  dailyBudget: number;

  ageMin: number;

  ageMax: number;

  gender: MetaAdSetGender;

  locationKey: string;

  startTime: string;

  endTime: string;

  optimizationGoal: string;

  billingEvent: string;

  destinationType?: string;

  promotedObject?: Record<string, unknown>;
}


export interface MetaCreatedAdSet {
  id: string;

  campaignId: string;

  name: string;

  dailyBudget: number;

  ageMin: number;

  ageMax: number;

  gender: MetaAdSetGender;

  locationKey: string;

  startTime: string;

  endTime: string;

  status: string;

  accountId: string;

  metaAccountId: string;
}


export interface MetaCreateAdSetResponse {
  adSet: MetaCreatedAdSet;
}


/* =========================================================
   META LOCATION SEARCH
========================================================= */

export interface MetaTargetLocation {
  key: string;

  name: string;

  type: string;

  countryCode: string;

  countryName: string;

  region: string;

  regionId: string;
}


export interface MetaLocationSearchResponse {
  locations: MetaTargetLocation[];
}


/* =========================================================
   META CREATIVE ASSETS
========================================================= */

export interface MetaFacebookPage {
  id: string;

  name: string;
}


export interface MetaInstagramAccount {
  id: string;

  name: string;

  username: string;
}


export interface MetaCreativeAssetsResponse {
  pages: MetaFacebookPage[];

  instagramAccounts: MetaInstagramAccount[];
}


/* =========================================================
   CREATE META IMAGE AD
========================================================= */

export interface MetaCreateImageAdRequest {
  // Meta Ad Set ID
  adSetId: string;

  // Final Meta Ad name
  name: string;

  // Facebook Page selected from creativeAssets()
  pageId: string;

  // Optional Instagram account
  instagramAccountId?: string;

  // Main ad caption
  primaryText: string;

  // Optional headline
  headline?: string;

  // Optional description
  description?: string;

  // Public HTTPS landing page
  destinationUrl: string;

  // Public HTTPS image
  imageUrl: string;

  // Meta CTA value
  callToAction: string;
}


export interface MetaCreatedAd {
  id: string;

  name: string;

  adSetId: string;

  pageId: string;

  instagramAccountId: string;

  imageUrl: string;

  destinationUrl: string;

  callToAction: string;

  status: string;

  accountId: string;

  metaAccountId: string;
}


export interface MetaCreateImageAdResponse {
  ad: MetaCreatedAd;
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

     GET:
     /api/meta/bootstrap
  ======================================================= */

  bootstrap():
    Observable<MetaBootstrapResponse> {

    return this.http.get<MetaBootstrapResponse>(
      `${this.baseUrl}/bootstrap`,
    );
  }


  /* =======================================================
     DASHBOARD

     GET:
     /api/meta/dashboard

     OPTIONAL:
     customerId
     from
     to
  ======================================================= */

  dashboard(
    query: MetaDashboardQuery = {},
  ): Observable<MetaDashboardResponse> {

    let params =
      new HttpParams();


    if (query.customerId) {

      params =
        params.set(
          'customerId',
          query.customerId,
        );

    }


    if (query.from) {

      params =
        params.set(
          'from',
          query.from,
        );

    }


    if (query.to) {

      params =
        params.set(
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

     POST:
     /api/meta/accounts/link
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

     PATCH:
     /api/meta/accounts/:id
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

     POST:
     /api/meta/accounts/:id/sync
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

      body.from =
        from;

    }


    if (to) {

      body.to =
        to;

    }


    return this.http.post<MetaSyncResponse>(
      `${this.baseUrl}/accounts/${encodeURIComponent(accountId)}/sync`,
      body,
    );
  }


  /* =======================================================
     CREATE META CAMPAIGN

     POST:
     /api/meta/accounts/:id/campaigns

     Campaign is created as PAUSED.
  ======================================================= */

  createCampaign(
    accountId: string,
    payload: MetaCreateCampaignRequest,
  ): Observable<MetaCreateCampaignResponse> {

    return this.http.post<MetaCreateCampaignResponse>(
      `${this.baseUrl}/accounts/${encodeURIComponent(accountId)}/campaigns`,
      payload,
    );
  }


  /* =======================================================
     CREATE META AD SET / AUDIENCE

     POST:
     /api/meta/accounts/:id/adsets

     Ad Set is created as PAUSED.
  ======================================================= */

  createAdSet(
    accountId: string,
    payload: MetaCreateAdSetRequest,
  ): Observable<MetaCreateAdSetResponse> {

    return this.http.post<MetaCreateAdSetResponse>(
      `${this.baseUrl}/accounts/${encodeURIComponent(accountId)}/adsets`,
      payload,
    );
  }


  /* =======================================================
     SEARCH META TARGET LOCATIONS

     GET:
     /api/meta/accounts/:id/locations/search?q=Madurai
  ======================================================= */

  searchLocations(
    accountId: string,
    query: string,
  ): Observable<MetaLocationSearchResponse> {

    const params =
      new HttpParams()
        .set(
          'q',
          query.trim(),
        );


    return this.http.get<MetaLocationSearchResponse>(
      `${this.baseUrl}/accounts/${encodeURIComponent(accountId)}/locations/search`,
      {
        params,
      },
    );
  }


  /* =======================================================
     GET META CREATIVE ASSETS

     GET:
     /api/meta/accounts/:id/creative-assets

     RETURNS:
     - Facebook Pages
     - Instagram Accounts
  ======================================================= */

  creativeAssets(
    accountId: string,
  ): Observable<MetaCreativeAssetsResponse> {

    return this.http.get<MetaCreativeAssetsResponse>(
      `${this.baseUrl}/accounts/${encodeURIComponent(accountId)}/creative-assets`,
    );
  }


  /* =======================================================
     CREATE META IMAGE AD

     POST:
     /api/meta/accounts/:id/ads

     Creates:
     - Meta creative configuration
     - Final Meta Ad

     Final Ad is created as PAUSED.
  ======================================================= */

  createImageAd(
    accountId: string,
    payload: MetaCreateImageAdRequest,
  ): Observable<MetaCreateImageAdResponse> {

    return this.http.post<MetaCreateImageAdResponse>(
      `${this.baseUrl}/accounts/${encodeURIComponent(accountId)}/ads`,
      payload,
    );
  }


  /* =======================================================
     ACCOUNT DETAIL

     GET:
     /api/meta/accounts/:id/detail
  ======================================================= */

  detail(
    accountId: string,
    query: MetaDetailQuery = {},
  ): Observable<MetaDetailResponse> {

    let params =
      new HttpParams();


    if (query.from) {

      params =
        params.set(
          'from',
          query.from,
        );

    }


    if (query.to) {

      params =
        params.set(
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