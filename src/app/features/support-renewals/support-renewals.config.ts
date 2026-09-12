import { Module } from '../../core/models/crm-schema.model';

export const SupportRenewalsConfig: Module = {
  "title": "Support & Renewals",
  "tabs": [
    {
      "key": "tickets",
      "title": "Support tickets",
      "fields": [
        {
          "key": "title",
          "label": "Ticket title",
          "type": "text"
        },
        {
          "key": "customerId",
          "label": "Customer",
          "type": "customer"
        },
        {
          "key": "projectId",
          "label": "Project",
          "type": "project"
        },
        {
          "key": "description",
          "label": "Issue description",
          "type": "textarea"
        },
        {
          "key": "priority",
          "label": "Priority",
          "type": "text"
        },
        {
          "key": "assignedTo",
          "label": "Assigned to",
          "type": "employee"
        },
        {
          "key": "resolution",
          "label": "Resolution",
          "type": "textarea"
        },
        {
          "key": "dueDate",
          "label": "Response / resolution due",
          "type": "date"
        }
      ],
      "statuses": [
        "OPEN",
        "ASSIGNED",
        "IN_PROGRESS",
        "WAITING_CLIENT",
        "RESOLVED",
        "CLOSED"
      ],
      "rows": []
    },
    {
      "key": "renewals",
      "title": "Renewals",
      "fields": [
        {
          "key": "serviceName",
          "label": "Service name",
          "type": "text"
        },
        {
          "key": "customerId",
          "label": "Customer",
          "type": "customer"
        },
        {
          "key": "renewalType",
          "label": "Renewal type",
          "type": "text"
        },
        {
          "key": "startDate",
          "label": "Start date",
          "type": "date"
        },
        {
          "key": "expiryDate",
          "label": "Expiry date",
          "type": "date"
        },
        {
          "key": "amount",
          "label": "Renewal amount",
          "type": "number"
        },
        {
          "key": "assignedTo",
          "label": "Assigned to",
          "type": "employee"
        },
        {
          "key": "notes",
          "label": "Notes",
          "type": "textarea"
        }
      ],
      "statuses": [
        "ACTIVE",
        "DUE_SOON",
        "CONTACTED",
        "RENEWED",
        "EXPIRED"
      ],
      "rows": []
    }
  ]
};
