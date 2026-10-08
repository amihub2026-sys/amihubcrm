import {
  ChangeDetectorRef,
  Component,
  OnInit,
  inject
} from '@angular/core';

import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import {
  MetaAdsService,
  MetaDashboardAccount,
  MetaCampaignObjective,
  MetaAdSetGender,
  MetaTargetLocation,
  MetaFacebookPage,
  MetaInstagramAccount
} from '../meta-ads/meta-ads.service';


@Component({
  selector: 'app-meta-ads-running',

  standalone: true,

  imports: [
    CommonModule,
    FormsModule
  ],

  templateUrl:
    './meta-ads-running.component.html',

  styleUrl:
    './meta-ads-running.component.css'
})
export class MetaAdsRunningComponent
  implements OnInit {

  // =====================================================
  // SERVICES
  // =====================================================

  private readonly metaAdsService =
    inject(MetaAdsService);

  private readonly cdr =
    inject(ChangeDetectorRef);


  // =====================================================
  // PAGE DATA
  // =====================================================

  runningAccounts:
    MetaDashboardAccount[] = [];

  loading = false;

  loadError = '';

  canManage = false;


  // =====================================================
  // CREATE META AD WIZARD
  // =====================================================

  showCreateForm = false;

  createStep:
    'CAMPAIGN' |
    'ADSET' |
    'CREATIVE' =
      'CAMPAIGN';

  submitting = false;

  createError = '';

  createSuccess = '';


  // =====================================================
  // ACCOUNT
  // =====================================================

  selectedAccountId = '';


  // =====================================================
  // CAMPAIGN FORM
  // =====================================================

  campaignName = '';

  objective:
    MetaCampaignObjective =
      'OUTCOME_LEADS';

  createdCampaignId = '';

  createdCampaignName = '';


  // =====================================================
  // AD SET FORM
  // =====================================================

  adSetName = '';

  dailyBudget:
    number | null = null;

  ageMin = 18;

  ageMax = 65;

  gender:
    MetaAdSetGender =
      'ALL';

  startTime = '';

  endTime = '';

  optimizationGoal =
    'LEAD_GENERATION';

  billingEvent =
    'IMPRESSIONS';

  destinationType = '';

  createdAdSetId = '';

  createdAdSetName = '';


  // =====================================================
  // LOCATION SEARCH
  // =====================================================

  locationQuery = '';

  locations:
    MetaTargetLocation[] = [];

  searchingLocations = false;

  locationSearchError = '';

  selectedLocationKey = '';

  selectedLocationName = '';


  // =====================================================
  // CREATIVE ASSETS
  // =====================================================

  loadingCreativeAssets = false;

  creativeAssetsError = '';

  facebookPages:
    MetaFacebookPage[] = [];

  instagramAccounts:
    MetaInstagramAccount[] = [];

  selectedPageId = '';

  selectedInstagramAccountId = '';


  // =====================================================
  // CREATIVE FORM
  // =====================================================

  creativeName = '';

  primaryText = '';

  headline = '';

  description = '';

  destinationUrl = '';

  imageUrl = '';

  callToAction =
    'LEARN_MORE';

  creativeMediaType:
    'IMAGE' |
    'VIDEO' =
      'IMAGE';

  createdAdId = '';

  createdAdName = '';


  // =====================================================
  // OBJECTIVES
  // =====================================================

  objectives: {
    value: MetaCampaignObjective;
    label: string;
  }[] = [

    {
      value: 'OUTCOME_LEADS',
      label: 'Leads'
    },

    {
      value: 'OUTCOME_ENGAGEMENT',
      label: 'Engagement / Messages'
    },

    {
      value: 'OUTCOME_TRAFFIC',
      label: 'Traffic'
    },

    {
      value: 'OUTCOME_AWARENESS',
      label: 'Awareness'
    },

    {
      value: 'OUTCOME_SALES',
      label: 'Sales'
    },

    {
      value: 'OUTCOME_APP_PROMOTION',
      label: 'App Promotion'
    }

  ];


  // =====================================================
  // GENDERS
  // =====================================================

  genders: {
    value: MetaAdSetGender;
    label: string;
  }[] = [

    {
      value: 'ALL',
      label: 'All'
    },

    {
      value: 'MALE',
      label: 'Male'
    },

    {
      value: 'FEMALE',
      label: 'Female'
    }

  ];


  // =====================================================
  // CALL TO ACTIONS
  // =====================================================

  callToActions = [

    {
      value: 'LEARN_MORE',
      label: 'Learn More'
    },

    {
      value: 'CONTACT_US',
      label: 'Contact Us'
    },

    {
      value: 'SIGN_UP',
      label: 'Sign Up'
    },

    {
      value: 'GET_QUOTE',
      label: 'Get Quote'
    },

    {
      value: 'APPLY_NOW',
      label: 'Apply Now'
    },

    {
      value: 'BOOK_NOW',
      label: 'Book Now'
    },

    {
      value: 'SHOP_NOW',
      label: 'Shop Now'
    },

    {
      value: 'SEND_MESSAGE',
      label: 'Send Message'
    }

  ];


  // =====================================================
  // INIT
  // =====================================================

  ngOnInit(): void {

    this.loadMetaData();

  }


  // =====================================================
  // LOAD META DATA
  // =====================================================

  loadMetaData(): void {

    this.loading = true;

    this.loadError = '';

    this.cdr.detectChanges();


    this.metaAdsService
      .bootstrap()
      .subscribe({

        next: (bootstrap) => {

          this.canManage =
            bootstrap.canManage;


          this.metaAdsService
            .dashboard()
            .subscribe({

              next: (dashboard) => {

                this.runningAccounts =
                  dashboard.accounts || [];

                this.loading = false;

                this.loadError = '';

                this.cdr.detectChanges();

              },


              error: (error) => {

                this.loading = false;

                this.loadError =
                  error?.error?.message ||
                  'Unable to load Meta Ads data.';

                this.cdr.detectChanges();

              }

            });

        },


        error: (error) => {

          this.loading = false;

          this.loadError =
            error?.error?.message ||
            'Unable to load Meta configuration.';

          this.cdr.detectChanges();

        }

      });

  }


  // =====================================================
  // RUNNING CUSTOMER COUNT
  // =====================================================

  get runningCount(): number {

    return this.runningAccounts
      .filter(
        (item) =>
          Number(
            item.activeCampaigns || 0
          ) > 0
      )
      .length;

  }


  // =====================================================
  // TOTAL TODAY SPEND
  // =====================================================

  get totalTodaySpend(): number {

    return this.runningAccounts
      .reduce(
        (
          sum,
          item
        ) =>
          sum +
          Number(
            item.todaySpend || 0
          ),
        0
      );

  }


  // =====================================================
  // TOTAL ACTIVE CAMPAIGNS
  // =====================================================

  get totalActiveCampaigns(): number {

    return this.runningAccounts
      .reduce(
        (
          sum,
          item
        ) =>
          sum +
          Number(
            item.activeCampaigns || 0
          ),
        0
      );

  }


  // =====================================================
  // OPEN CREATE META AD
  // =====================================================

  openCreateCampaign(): void {

    this.createError = '';

    this.createSuccess = '';

    this.showCreateForm = true;

    this.createStep =
      'CAMPAIGN';

    this.submitting = false;


    // ACCOUNT
    this.selectedAccountId = '';


    // CAMPAIGN
    this.campaignName = '';

    this.objective =
      'OUTCOME_LEADS';

    this.createdCampaignId = '';

    this.createdCampaignName = '';


    // AD SET
    this.resetAdSetForm();


    // CREATIVE
    this.resetCreativeForm();


    this.cdr.detectChanges();

  }


  // =====================================================
  // RESET AD SET
  // =====================================================

  resetAdSetForm(): void {

    this.adSetName = '';

    this.dailyBudget = null;

    this.ageMin = 18;

    this.ageMax = 65;

    this.gender =
      'ALL';

    this.startTime = '';

    this.endTime = '';

    this.optimizationGoal =
      'LEAD_GENERATION';

    this.billingEvent =
      'IMPRESSIONS';

    this.destinationType = '';

    this.createdAdSetId = '';

    this.createdAdSetName = '';


    // LOCATION

    this.locationQuery =
      'Madurai';

    this.locations = [];

    this.searchingLocations = false;

    this.locationSearchError = '';

    this.selectedLocationKey = '';

    this.selectedLocationName = '';

  }


  // =====================================================
  // RESET CREATIVE
  // =====================================================

  resetCreativeForm(): void {

    this.loadingCreativeAssets = false;

    this.creativeAssetsError = '';

    this.facebookPages = [];

    this.instagramAccounts = [];

    this.selectedPageId = '';

    this.selectedInstagramAccountId = '';


    this.creativeName = '';

    this.primaryText = '';

    this.headline = '';

    this.description = '';

    this.destinationUrl = '';

    this.imageUrl = '';

    this.callToAction =
      'LEARN_MORE';

    this.creativeMediaType =
      'IMAGE';


    this.createdAdId = '';

    this.createdAdName = '';

  }


  // =====================================================
  // CLOSE CREATE META AD
  // =====================================================

  closeCreateCampaign(): void {

    if (this.submitting) {
      return;
    }

    this.showCreateForm = false;

    this.createError = '';

    this.createSuccess = '';

    this.cdr.detectChanges();

  }


  // =====================================================
  // CREATE META CAMPAIGN
  // =====================================================

  createCampaign(): void {

    this.createError = '';

    this.createSuccess = '';


    // ===================================================
    // ACCOUNT
    // ===================================================

    if (!this.selectedAccountId) {

      this.createError =
        'Select a Meta ad account.';

      this.cdr.detectChanges();

      return;

    }


    // ===================================================
    // CAMPAIGN NAME
    // ===================================================

    const name =
      this.campaignName.trim();


    if (name.length < 3) {

      this.createError =
        'Enter a campaign name.';

      this.cdr.detectChanges();

      return;

    }


    this.submitting = true;

    this.cdr.detectChanges();


    // ===================================================
    // CREATE CAMPAIGN
    // ===================================================

    this.metaAdsService
      .createCampaign(
        this.selectedAccountId,
        {
          name,

          objective:
            this.objective,

          specialAdCategories: []
        }
      )
      .subscribe({

        next: (response) => {

          this.submitting = false;


          this.createdCampaignId =
            response.campaign.id;

          this.createdCampaignName =
            response.campaign.name;


          this.adSetName =
            `${response.campaign.name} - Ad Set 1`;


          this.setOptimizationDefaults();


          this.createStep =
            'ADSET';


          this.createSuccess =
            `Campaign "${response.campaign.name}" created in Meta as PAUSED. Now configure the Audience / Ad Set.`;


          this.createError = '';

          this.cdr.detectChanges();


          this.loadMetaData();

        },


        error: (error) => {

          this.submitting = false;

          this.createError =
            error?.error?.message ||
            'Unable to create Meta campaign.';

          this.cdr.detectChanges();

        }

      });

  }


  // =====================================================
  // OBJECTIVE DEFAULTS
  // =====================================================

  setOptimizationDefaults(): void {

    switch (this.objective) {

      case 'OUTCOME_LEADS':

        this.optimizationGoal =
          'LEAD_GENERATION';

        this.billingEvent =
          'IMPRESSIONS';

        break;


      case 'OUTCOME_TRAFFIC':

        this.optimizationGoal =
          'LINK_CLICKS';

        this.billingEvent =
          'IMPRESSIONS';

        break;


      case 'OUTCOME_ENGAGEMENT':

        this.optimizationGoal =
          'POST_ENGAGEMENT';

        this.billingEvent =
          'IMPRESSIONS';

        break;


      case 'OUTCOME_AWARENESS':

        this.optimizationGoal =
          'REACH';

        this.billingEvent =
          'IMPRESSIONS';

        break;


      case 'OUTCOME_SALES':

        this.optimizationGoal =
          'OFFSITE_CONVERSIONS';

        this.billingEvent =
          'IMPRESSIONS';

        break;


      case 'OUTCOME_APP_PROMOTION':

        this.optimizationGoal =
          'APP_INSTALLS';

        this.billingEvent =
          'IMPRESSIONS';

        break;


      default:

        this.optimizationGoal =
          'IMPRESSIONS';

        this.billingEvent =
          'IMPRESSIONS';

    }

  }


  // =====================================================
  // SEARCH LOCATION
  // =====================================================

  searchLocation(): void {

    this.locationSearchError = '';

    this.locations = [];

    this.selectedLocationKey = '';

    this.selectedLocationName = '';


    if (!this.selectedAccountId) {

      this.locationSearchError =
        'Meta ad account is missing.';

      this.cdr.detectChanges();

      return;

    }


    const query =
      this.locationQuery.trim();


    if (query.length < 2) {

      this.locationSearchError =
        'Enter at least 2 characters.';

      this.cdr.detectChanges();

      return;

    }


    this.searchingLocations = true;

    this.cdr.detectChanges();


    this.metaAdsService
      .searchLocations(
        this.selectedAccountId,
        query
      )
      .subscribe({

        next: (response) => {

          this.searchingLocations = false;

          this.locations =
            response.locations || [];


          if (!this.locations.length) {

            this.locationSearchError =
              'No Meta targeting locations found.';

          }

          this.cdr.detectChanges();

        },


        error: (error) => {

          this.searchingLocations = false;

          this.locations = [];

          this.locationSearchError =
            error?.error?.message ||
            'Unable to search Meta locations.';

          this.cdr.detectChanges();

        }

      });

  }


  // =====================================================
  // SELECT LOCATION
  // =====================================================

  selectLocation(
    location: MetaTargetLocation
  ): void {

    this.selectedLocationKey =
      location.key;


    this.selectedLocationName =
      this.locationDisplayName(
        location
      );


    this.locationQuery =
      location.name;


    this.locations = [];

    this.locationSearchError = '';

    this.cdr.detectChanges();

  }


  // =====================================================
  // LOCATION DISPLAY
  // =====================================================

  locationDisplayName(
    location: MetaTargetLocation
  ): string {

    const parts = [

      location.name,

      location.region,

      location.countryName

    ]
      .filter(Boolean);


    return parts.join(', ');

  }


  // =====================================================
  // CREATE AD SET
  // =====================================================

  createAdSet(): void {

    this.createError = '';

    this.createSuccess = '';


    // ===================================================
    // CAMPAIGN ID
    // ===================================================

    if (!this.createdCampaignId) {

      this.createError =
        'Meta campaign ID is missing.';

      this.cdr.detectChanges();

      return;

    }


    // ===================================================
    // AD SET NAME
    // ===================================================

    const name =
      this.adSetName.trim();


    if (name.length < 3) {

      this.createError =
        'Enter an Ad Set name.';

      this.cdr.detectChanges();

      return;

    }


    // ===================================================
    // BUDGET
    // ===================================================

    const budget =
      Number(
        this.dailyBudget
      );


    if (
      !Number.isFinite(budget) ||
      budget <= 0
    ) {

      this.createError =
        'Enter a valid daily budget.';

      this.cdr.detectChanges();

      return;

    }


    // ===================================================
    // AGE MIN
    // ===================================================

    if (
      !Number.isInteger(
        Number(this.ageMin)
      ) ||
      Number(this.ageMin) < 18 ||
      Number(this.ageMin) > 65
    ) {

      this.createError =
        'Minimum age must be between 18 and 65.';

      this.cdr.detectChanges();

      return;

    }


    // ===================================================
    // AGE MAX
    // ===================================================

    if (
      !Number.isInteger(
        Number(this.ageMax)
      ) ||
      Number(this.ageMax) <
        Number(this.ageMin) ||
      Number(this.ageMax) > 65
    ) {

      this.createError =
        'Maximum age must be greater than or equal to minimum age.';

      this.cdr.detectChanges();

      return;

    }


    // ===================================================
    // LOCATION
    // ===================================================

    if (!this.selectedLocationKey) {

      this.createError =
        'Search and select a Meta target location.';

      this.cdr.detectChanges();

      return;

    }


    // ===================================================
    // START TIME
    // ===================================================

    if (
      !this.startTime ||
      !Number.isFinite(
        Date.parse(
          this.startTime
        )
      )
    ) {

      this.createError =
        'Select a valid start date and time.';

      this.cdr.detectChanges();

      return;

    }


    // ===================================================
    // END TIME
    // ===================================================

    if (
      !this.endTime ||
      !Number.isFinite(
        Date.parse(
          this.endTime
        )
      )
    ) {

      this.createError =
        'Select a valid end date and time.';

      this.cdr.detectChanges();

      return;

    }


    if (
      Date.parse(
        this.endTime
      ) <=
      Date.parse(
        this.startTime
      )
    ) {

      this.createError =
        'End date must be after start date.';

      this.cdr.detectChanges();

      return;

    }


    // ===================================================
    // SUBMIT AD SET
    // ===================================================

    this.submitting = true;

    this.cdr.detectChanges();


    this.metaAdsService
      .createAdSet(
        this.selectedAccountId,
        {

          campaignId:
            this.createdCampaignId,

          name,

          dailyBudget:
            budget,

          ageMin:
            Number(this.ageMin),

          ageMax:
            Number(this.ageMax),

          gender:
            this.gender,

          locationKey:
            this.selectedLocationKey,

          startTime:
            new Date(
              this.startTime
            ).toISOString(),

          endTime:
            new Date(
              this.endTime
            ).toISOString(),

          optimizationGoal:
            this.optimizationGoal,

          billingEvent:
            this.billingEvent,

          ...(this.destinationType
            ? {
                destinationType:
                  this.destinationType
              }
            : {})

        }
      )
      .subscribe({

        next: (response) => {

          this.submitting = false;


          this.createdAdSetId =
            response.adSet.id;

          this.createdAdSetName =
            response.adSet.name;


          // =============================================
          // PREPARE CREATIVE
          // =============================================

          this.creativeName =
            `${response.adSet.name} - Ad 1`;


          // =============================================
          // STEP 3
          // =============================================

          this.createStep =
            'CREATIVE';


          this.createError = '';

          this.createSuccess =
            `Ad Set "${response.adSet.name}" created in Meta as PAUSED. Now configure the Ad Creative.`;


          this.cdr.detectChanges();


          // LOAD FACEBOOK + INSTAGRAM

          this.loadCreativeAssets();


          // REFRESH DASHBOARD

          this.loadMetaData();

        },


        error: (error) => {

          this.submitting = false;

          this.createError =
            error?.error?.message ||
            'Unable to create Meta Ad Set.';

          this.cdr.detectChanges();

        }

      });

  }


  // =====================================================
  // LOAD CREATIVE ASSETS
  // =====================================================

  loadCreativeAssets(): void {

    this.creativeAssetsError = '';

    this.facebookPages = [];

    this.instagramAccounts = [];

    this.selectedPageId = '';

    this.selectedInstagramAccountId = '';


    if (!this.selectedAccountId) {

      this.creativeAssetsError =
        'Meta ad account is missing.';

      this.cdr.detectChanges();

      return;

    }


    this.loadingCreativeAssets = true;

    this.cdr.detectChanges();


    this.metaAdsService
      .creativeAssets(
        this.selectedAccountId
      )
      .subscribe({

        next: (response) => {

          this.loadingCreativeAssets = false;


          this.facebookPages =
            response.pages || [];


          this.instagramAccounts =
            response.instagramAccounts || [];


          // =============================================
          // AUTO SELECT SINGLE FACEBOOK PAGE
          // =============================================

          if (
            this.facebookPages.length === 1
          ) {

            this.selectedPageId =
              this.facebookPages[0].id;

          }


          // =============================================
          // AUTO SELECT SINGLE INSTAGRAM ACCOUNT
          // =============================================

          if (
            this.instagramAccounts.length === 1
          ) {

            this.selectedInstagramAccountId =
              this.instagramAccounts[0].id;

          }


          if (!this.facebookPages.length) {

            this.creativeAssetsError =
              'No Facebook Page is available for this Meta ad account.';

          }


          this.cdr.detectChanges();

        },


        error: (error) => {

          this.loadingCreativeAssets = false;

          this.facebookPages = [];

          this.instagramAccounts = [];


          this.creativeAssetsError =
            error?.error?.message ||
            'Unable to load Facebook Page and Instagram accounts from Meta.';


          this.cdr.detectChanges();

        }

      });

  }


  // =====================================================
  // SELECTED FACEBOOK PAGE NAME
  // =====================================================

  selectedFacebookPageName(): string {

    if (!this.selectedPageId) {
      return '';
    }


    const page =
      this.facebookPages.find(
        (item) =>
          item.id ===
          this.selectedPageId
      );


    return page?.name || '';

  }


  // =====================================================
  // SELECTED INSTAGRAM NAME
  // =====================================================

  selectedInstagramName(): string {

    if (!this.selectedInstagramAccountId) {
      return '';
    }


    const account =
      this.instagramAccounts.find(
        (item) =>
          item.id ===
          this.selectedInstagramAccountId
      );


    if (!account) {
      return '';
    }


    if (account.username) {

      return `@${account.username}`;

    }


    return (
      account.name ||
      account.id
    );

  }


  // =====================================================
  // CREATE FINAL META IMAGE AD
  // =====================================================

  createImageAd(): void {

    this.createError = '';

    this.createSuccess = '';


    // ===================================================
    // META ACCOUNT
    // ===================================================

    if (!this.selectedAccountId) {

      this.createError =
        'Meta ad account is missing.';

      this.cdr.detectChanges();

      return;

    }


    // ===================================================
    // AD SET
    // ===================================================

    if (!this.createdAdSetId) {

      this.createError =
        'Meta Ad Set ID is missing.';

      this.cdr.detectChanges();

      return;

    }


    // ===================================================
    // FACEBOOK PAGE
    // ===================================================

    if (!this.selectedPageId) {

      this.createError =
        'Select a Facebook Page.';

      this.cdr.detectChanges();

      return;

    }


    // ===================================================
    // CURRENT VERSION SUPPORTS IMAGE ADS
    // ===================================================

    if (
      this.creativeMediaType !==
      'IMAGE'
    ) {

      this.createError =
        'Video ad creation is not connected yet. Select Image for this test.';

      this.cdr.detectChanges();

      return;

    }


    // ===================================================
    // AD NAME
    // ===================================================

    const name =
      this.creativeName.trim();


    if (
      name.length < 3 ||
      name.length > 200
    ) {

      this.createError =
        'Enter a valid Ad name.';

      this.cdr.detectChanges();

      return;

    }


    // ===================================================
    // PRIMARY TEXT
    // ===================================================

    const primaryText =
      this.primaryText.trim();


    if (!primaryText) {

      this.createError =
        'Enter the Primary Text.';

      this.cdr.detectChanges();

      return;

    }


    if (
      primaryText.length > 2000
    ) {

      this.createError =
        'Primary Text is too long.';

      this.cdr.detectChanges();

      return;

    }


    // ===================================================
    // HEADLINE
    // ===================================================

    const headline =
      this.headline.trim();


    if (
      headline.length > 255
    ) {

      this.createError =
        'Headline is too long.';

      this.cdr.detectChanges();

      return;

    }


    // ===================================================
    // DESCRIPTION
    // ===================================================

    const description =
      this.description.trim();


    if (
      description.length > 1000
    ) {

      this.createError =
        'Description is too long.';

      this.cdr.detectChanges();

      return;

    }


    // ===================================================
    // DESTINATION URL
    // ===================================================

    const destinationUrl =
      this.destinationUrl.trim();


    if (
      !this.isHttpsUrl(
        destinationUrl
      )
    ) {

      this.createError =
        'Enter a public HTTPS destination URL.';

      this.cdr.detectChanges();

      return;

    }


    // ===================================================
    // IMAGE URL
    // ===================================================

    const imageUrl =
      this.imageUrl.trim();


    if (
      !this.isHttpsUrl(
        imageUrl
      )
    ) {

      this.createError =
        'Enter a public HTTPS image URL.';

      this.cdr.detectChanges();

      return;

    }


    // ===================================================
    // SUBMIT FINAL AD
    // ===================================================

    this.submitting = true;

    this.cdr.detectChanges();


    this.metaAdsService
      .createImageAd(
        this.selectedAccountId,
        {

          adSetId:
            this.createdAdSetId,

          name,

          pageId:
            this.selectedPageId,

          ...(this.selectedInstagramAccountId
            ? {
                instagramAccountId:
                  this.selectedInstagramAccountId
              }
            : {}),

          primaryText,

          ...(headline
            ? {
                headline
              }
            : {}),

          ...(description
            ? {
                description
              }
            : {}),

          destinationUrl,

          imageUrl,

          callToAction:
            this.callToAction

        }
      )
      .subscribe({

        // ===============================================
        // SUCCESS
        // ===============================================

        next: (response) => {

          this.submitting = false;


          this.createdAdId =
            response.ad.id;

          this.createdAdName =
            response.ad.name;


          this.createError = '';

          this.createSuccess =
            `Ad "${response.ad.name}" created successfully in Meta as PAUSED.`;


          this.cdr.detectChanges();


          // Refresh Meta dashboard.
          // PAUSED ad will NOT count as active.

          this.loadMetaData();

        },


        // ===============================================
        // ERROR
        // ===============================================

        error: (error) => {

          this.submitting = false;


          this.createError =
            error?.error?.message ||
            'Unable to create Meta Ad.';


          this.cdr.detectChanges();

        }

      });

  }


  // =====================================================
  // HTTPS URL CHECK
  // =====================================================

  private isHttpsUrl(
    value: string
  ): boolean {

    if (!value) {
      return false;
    }


    try {

      const url =
        new URL(value);


      return (
        url.protocol === 'https:' &&
        !!url.hostname
      );

    } catch {

      return false;

    }

  }


  // =====================================================
  // CUSTOMER NAME
  // =====================================================

  accountCustomerName(
    account: MetaDashboardAccount
  ): string {

    return (
      account.customerName ||
      'Unknown Customer'
    );

  }

}