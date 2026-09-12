import { Module } from '../../core/models/crm-schema.model';

export const DigitalMarketingConfig: Module = {
  "title": "Digital Marketing",
  "tabs": [
    {
      "key": "plans",
      "title": "Monthly plans",
      "fields": [
        {
          "key": "title",
          "label": "Plan name",
          "type": "text"
        },
        {
          "key": "customerId",
          "label": "Customer",
          "type": "customer"
        },
        {
          "key": "month",
          "label": "Month",
          "type": "month"
        },
        {
          "key": "platforms",
          "label": "Platforms",
          "type": "text"
        },
        {
          "key": "posterTarget",
          "label": "Posters",
          "type": "number"
        },
        {
          "key": "reelTarget",
          "label": "Reels",
          "type": "number"
        },
        {
          "key": "storyTarget",
          "label": "Stories",
          "type": "number"
        },
        {
          "key": "videoTarget",
          "label": "Videos",
          "type": "number"
        },
        {
          "key": "assignedEmployees",
          "label": "Team",
          "type": "employee-list"
        },
        {
          "key": "planDueDate",
          "label": "Content plan due",
          "type": "date"
        },
        {
          "key": "assetsDueDate",
          "label": "Customer assets due",
          "type": "date"
        },
        {
          "key": "reportDueDate",
          "label": "Monthly report due",
          "type": "date"
        }
      ],
      "statuses": [
        "PLANNED",
        "ACTIVE",
        "COMPLETED"
      ],
      "rows": []
    },
    {
      "key": "content",
      "title": "Content calendar",
      "fields": [
        {
          "key": "title",
          "label": "Content title",
          "type": "text"
        },
        {
          "key": "marketingPlanId",
          "label": "Marketing plan",
          "type": "plan"
        },
        {
          "key": "customerId",
          "label": "Customer",
          "type": "customer"
        },
        {
          "key": "contentType",
          "label": "Content type",
          "type": "text"
        },
        {
          "key": "platform",
          "label": "Platform",
          "type": "text"
        },
        {
          "key": "scheduledDate",
          "label": "Scheduled date",
          "type": "date"
        },
        {
          "key": "assignedTo",
          "label": "Assigned to",
          "type": "employee"
        },
        {
          "key": "fileUrl",
          "label": "Creative URL",
          "type": "url"
        },
        {
          "key": "clientFeedback",
          "label": "Client feedback",
          "type": "textarea"
        },
        {
          "key": "approvalDueDate",
          "label": "Client approval due",
          "type": "date"
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
            "Meta \u2014 Facebook & Instagram",
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
          "label": "Approved ad budget \u20b9",
          "type": "number",
          "required": true
        },
        {
          "key": "actualSpend",
          "label": "Actual ad spend \u20b9",
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
