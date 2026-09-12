import { Module } from '../../core/models/crm-schema.model';

export const SettingsConfig: Module = {
  "title": "Settings",
  "tabs": [
    {
      "key": "users",
      "title": "User access",
      "fields": [
        {
          "key": "name",
          "label": "Name",
          "type": "text"
        },
        {
          "key": "email",
          "label": "Email",
          "type": "email"
        },
        {
          "key": "role",
          "label": "Role",
          "type": "role"
        },
        {
          "key": "employeeId",
          "label": "Employee",
          "type": "employee"
        },
        {
          "key": "initialPassword",
          "label": "Initial / new password (12+ characters)",
          "type": "password"
        }
      ],
      "statuses": [
        "ACTIVE",
        "INACTIVE"
      ],
      "rows": []
    },
    {
      "key": "services",
      "title": "Services",
      "fields": [
        {
          "key": "name",
          "label": "Service name",
          "type": "text"
        },
        {
          "key": "description",
          "label": "Description",
          "type": "textarea"
        }
      ],
      "statuses": [
        "ACTIVE",
        "INACTIVE"
      ],
      "rows": []
    },
    {
      "key": "departments",
      "title": "Departments",
      "fields": [
        {
          "key": "name",
          "label": "Department name",
          "type": "text"
        },
        {
          "key": "description",
          "label": "Description",
          "type": "text"
        }
      ],
      "statuses": [
        "ACTIVE",
        "INACTIVE"
      ],
      "rows": []
    },
    {
      "key": "billingProfile",
      "title": "Billing profile",
      "fields": [
        {
          "key": "name",
          "label": "Business / legal name",
          "type": "text",
          "required": true
        },
        {
          "key": "address",
          "label": "Billing address",
          "type": "textarea",
          "required": true
        },
        {
          "key": "email",
          "label": "Billing email",
          "type": "email",
          "required": false
        },
        {
          "key": "phone",
          "label": "Business phone",
          "type": "tel",
          "required": false
        },
        {
          "key": "taxId",
          "label": "Tax registration ID (if applicable)",
          "type": "text",
          "required": false
        },
        {
          "key": "bankDetails",
          "label": "Bank / UPI payment instructions",
          "type": "textarea",
          "required": false
        },
        {
          "key": "terms",
          "label": "Default invoice terms",
          "type": "textarea",
          "required": false
        }
      ],
      "statuses": [
        "ACTIVE"
      ],
      "rows": []
    }
  ]
};
