import { Module } from '../../core/models/crm-schema.model';

export const DigitalMarketingConfig: Module = {
  "title": "Digital Marketing",
  "tabs": [

    // =====================================================
    // MASTER DIGITAL MARKETING PACKAGES
    // =====================================================
    {
      "key": "digitalMarketingPlans",
      "title": "Plan Packages",
      "fields": [
        {
          "key": "name",
          "label": "Plan Name",
          "type": "text",
          "required": true
        },
        {
          "key": "price",
          "label": "Monthly Price ₹",
          "type": "number",
          "required": true
        },
        {
          "key": "posterCount",
          "label": "Posters",
          "type": "number",
          "required": true
        },
        {
          "key": "videoCount",
          "label": "Videos",
          "type": "number",
          "required": true
        },
        {
          "key": "description",
          "label": "Description",
          "type": "textarea",
          "required": false
        }
      ],
      "statuses": [
        "ACTIVE",
        "INACTIVE"
      ],
      "rows": []
    },

    // =====================================================
    // CUSTOMER MONTHLY PLAN
    // =====================================================
    {
      "key": "plans",
      "title": "Monthly plans",
      "fields": [
        {
          "key": "customerId",
          "label": "Customer",
          "type": "customer",
          "required": true
        },
        {
          "key": "digitalMarketingPlanId",
          "label": "Plan Package",
          "type": "digitalMarketingPlan",
          "required": true
        },
        {
          "key": "month",
          "label": "Month",
          "type": "month",
          "required": true
        },
        {
  "key": "planStartDate",
  "label": "Plan Start Date",
  "type": "date",
  "required": true
},
{
  "key": "nextPaymentDate",
  "label": "Next Payment Date",
  "type": "date",
  "required": false,
  "readonly": true
},
        {
          "key": "monthlyPrice",
          "label": "Monthly Price ₹",
          "type": "number",
          "required": true,
          "readonly": true
        },
        {
          "key": "posterTarget",
          "label": "Posters",
          "type": "number",
          "required": true,
          "readonly": true
        },
        {
          "key": "videoTarget",
          "label": "Videos",
          "type": "number",
          "required": true,
          "readonly": true
        },
        {
          "key": "autoPayEnabled",
          "label": "Auto Pay",
          "type": "checkbox",
          "required": false
        }
      ],
      "statuses": [
        "PLANNED",
        "ACTIVE",
        "COMPLETED"
      ],
      "rows": []
    },

 // =====================================================
// CONTENT CALENDAR
// =====================================================
{
  "key": "content",
  "title": "Content calendar",
  "fields": [

    {
      "key": "customerId",
      "label": "Customer",
      "type": "customer",
      "required": true,
      "readonly": true
    },

    {
      "key": "marketingPlanId",
      "label": "Monthly Plan",
      "type": "plan",
      "required": true,
      "readonly": true
    },

    {
      "key": "scheduledDate",
      "label": "Scheduled Date",
      "type": "date",
      "required": true,
      "readonly": true
    },

    {
      "key": "title",
      "label": "Content Title",
      "type": "text",
      "required": true
    },

    {
      "key": "contentType",
      "label": "Content Type",
      "type": "select",
      "required": true,
      "options": [
        "Poster",
        "Video"
      ]
    },

    {
      "key": "platform",
      "label": "Platform",
      "type": "select",
      "required": true,
      "options": [
        "Instagram",
        "Facebook",
        "Instagram + Facebook",
        "YouTube",
        "LinkedIn",
        "Website",
        "Other"
      ]
    },

    {
      "key": "assignedTo",
      "label": "Assigned Employee",
      "type": "employee",
      "required": true
    }

  ],

  "statuses": [
    "PLANNED",
    "ASSIGNED",
    "CREATED",
    "INTERNAL_REVIEW",
    "CLIENT_REVIEW",
    "REVISION",
    "APPROVED",
    "SCHEDULED",
    "PUBLISHED"
  ],

  "rows": []
},

    // =====================================================
    // AD CAMPAIGNS
    // =====================================================
    {
      "key": "campaigns",
      "title": "Ad campaigns",
      "fields": [
        {
          "key": "title",
          "label": "Campaign name",
          "type": "text",
          "required": true
        },
        {
          "key": "customerId",
          "label": "Customer",
          "type": "customer",
          "required": true
        },
        {
          "key": "platform",
          "label": "Ad platform",
          "type": "select",
          "required": true,
          "options": [
            "Meta — Facebook & Instagram",
            "Google Ads",
            "LinkedIn",
            "YouTube",
            "Other"
          ]
        },
        {
          "key": "objective",
          "label": "Campaign objective",
          "type": "text",
          "required": false
        },
        {
          "key": "startDate",
          "label": "Start date",
          "type": "date",
          "required": true
        },
        {
          "key": "endDate",
          "label": "End date",
          "type": "date",
          "required": true
        },
        {
          "key": "budget",
          "label": "Approved ad budget ₹",
          "type": "number",
          "required": true
        },
        {
          "key": "actualSpend",
          "label": "Actual ad spend ₹",
          "type": "number",
          "required": true
        },
        {
          "key": "leadCount",
          "label": "Reported leads generated",
          "type": "number",
          "required": true
        },
        {
          "key": "conversions",
          "label": "Reported paying customers",
          "type": "number",
          "required": true
        },
        {
          "key": "assignedTo",
          "label": "Campaign owner",
          "type": "employee",
          "required": true
        },
        {
          "key": "notes",
          "label": "Results / attribution notes",
          "type": "textarea",
          "required": false
        }
      ],
      "statuses": [
        "DRAFT",
        "ACTIVE",
        "PAUSED",
        "COMPLETED"
      ],
      "rows": []
    },

    // =====================================================
    // CAMPAIGN ENQUIRIES
    // =====================================================
    {
      "key": "campaignLeads",
      "title": "Campaign enquiries",
      "fields": [
        {
          "key": "name",
          "label": "Enquirer name",
          "type": "text",
          "required": true
        },
        {
          "key": "campaignId",
          "label": "Ad campaign",
          "type": "campaign",
          "required": true
        },
        {
          "key": "customerId",
          "label": "Client business",
          "type": "customer",
          "required": true
        },
        {
          "key": "phone",
          "label": "Phone",
          "type": "tel",
          "required": false
        },
        {
          "key": "email",
          "label": "Email",
          "type": "email",
          "required": false
        },
        {
          "key": "receivedDate",
          "label": "Enquiry date",
          "type": "date",
          "required": true
        },
        {
          "key": "assignedTo",
          "label": "Follow-up owner",
          "type": "employee",
          "required": false
        },
        {
          "key": "notes",
          "label": "Enquiry / outcome",
          "type": "textarea",
          "required": false
        }
      ],
      "statuses": [
        "NEW",
        "CONTACTED",
        "INTERESTED",
        "CONVERTED",
        "LOST"
      ],
      "rows": []
    }

  ]
};