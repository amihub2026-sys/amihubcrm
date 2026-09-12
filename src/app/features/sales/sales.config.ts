import { Module } from '../../core/models/crm-schema.model';

export const SalesConfig: Module = {
  "title": "Sales",
  "tabs": [
    {
      "key": "leads",
      "title": "Leads",
      "fields": [
        {
          "key": "businessName",
          "label": "Business name",
          "type": "text"
        },
        {
          "key": "contactPerson",
          "label": "Contact person",
          "type": "text"
        },
        {
          "key": "phone",
          "label": "Phone",
          "type": "tel"
        },
        {
          "key": "email",
          "label": "Email",
          "type": "email"
        },
        {
          "key": "location",
          "label": "Location",
          "type": "text"
        },
        {
          "key": "interestedServices",
          "label": "Interested services",
          "type": "text"
        },
        {
          "key": "source",
          "label": "Lead source",
          "type": "text"
        },
        {
          "key": "assignedTo",
          "label": "Assigned to",
          "type": "employee"
        },
        {
          "key": "priority",
          "label": "Priority",
          "type": "text"
        },
        {
          "key": "nextFollowUpDate",
          "label": "Next follow-up",
          "type": "date"
        },
        {
          "key": "notes",
          "label": "Notes",
          "type": "textarea"
        }
      ],
      "statuses": [
        "NEW",
        "ASSIGNED",
        "CONTACTED",
        "FOLLOW_UP",
        "INTERESTED",
        "MEETING",
        "QUOTATION",
        "NEGOTIATION",
        "WON",
        "LOST"
      ],
      "rows": []
    },
    {
      "key": "calls",
      "title": "Call activity",
      "fields": [
        {
          "key": "leadId",
          "label": "Lead",
          "type": "lead"
        },
        {
          "key": "employeeId",
          "label": "Employee",
          "type": "employee"
        },
        {
          "key": "callDate",
          "label": "Call date",
          "type": "date"
        },
        {
          "key": "notes",
          "label": "Call notes",
          "type": "textarea"
        },
        {
          "key": "nextFollowUpDate",
          "label": "Next follow-up",
          "type": "date"
        }
      ],
      "statuses": [
        "CONNECTED",
        "NO_ANSWER",
        "BUSY",
        "SWITCHED_OFF",
        "CALL_BACK",
        "INTERESTED",
        "NOT_INTERESTED",
        "WRONG_NUMBER",
        "MEETING_FIXED"
      ],
      "rows": []
    },
    {
      "key": "followups",
      "title": "Follow-ups",
      "fields": [
        {
          "key": "leadId",
          "label": "Lead",
          "type": "lead"
        },
        {
          "key": "assignedTo",
          "label": "Assigned to",
          "type": "employee"
        },
        {
          "key": "followUpDate",
          "label": "Date",
          "type": "date"
        },
        {
          "key": "followUpTime",
          "label": "Time",
          "type": "time"
        },
        {
          "key": "type",
          "label": "Contact method",
          "type": "text"
        },
        {
          "key": "notes",
          "label": "Notes",
          "type": "textarea"
        }
      ],
      "statuses": [
        "PENDING",
        "COMPLETED",
        "CANCELLED"
      ],
      "rows": []
    },
    {
      "key": "meetings",
      "title": "Meetings",
      "fields": [
        {
          "key": "title",
          "label": "Meeting title",
          "type": "text"
        },
        {
          "key": "leadId",
          "label": "Lead",
          "type": "lead"
        },
        {
          "key": "date",
          "label": "Date",
          "type": "date"
        },
        {
          "key": "time",
          "label": "Time",
          "type": "time"
        },
        {
          "key": "meetingType",
          "label": "Meeting type",
          "type": "text"
        },
        {
          "key": "location",
          "label": "Location / meeting link",
          "type": "text"
        },
        {
          "key": "assignedEmployees",
          "label": "Attendees",
          "type": "employee-list"
        },
        {
          "key": "outcome",
          "label": "Outcome",
          "type": "textarea"
        },
        {
          "key": "nextAction",
          "label": "Next action",
          "type": "text"
        }
      ],
      "statuses": [
        "SCHEDULED",
        "COMPLETED",
        "CANCELLED"
      ],
      "rows": []
    },
    {
      "key": "quotations",
      "title": "Quotations",
      "fields": [
        {
          "key": "quotationNumber",
          "label": "Quotation number",
          "type": "text"
        },
        {
          "key": "leadId",
          "label": "Lead",
          "type": "lead"
        },
        {
          "key": "description",
          "label": "Scope / line items",
          "type": "textarea"
        },
        {
          "key": "subtotal",
          "label": "Subtotal",
          "type": "number"
        },
        {
          "key": "discount",
          "label": "Discount",
          "type": "number"
        },
        {
          "key": "tax",
          "label": "Tax amount",
          "type": "number"
        },
        {
          "key": "paymentTerms",
          "label": "Payment terms",
          "type": "text"
        },
        {
          "key": "validUntil",
          "label": "Valid until",
          "type": "date"
        }
      ],
      "statuses": [
        "DRAFT",
        "SENT",
        "ACCEPTED",
        "REJECTED",
        "EXPIRED"
      ],
      "rows": []
    }
  ]
};
