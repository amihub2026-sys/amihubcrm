import { Module } from '../../core/models/crm-schema.model';

export const AccountsConfig: Module = {

  "title": "Accounts",

  "tabs": [

    {
      "key": "invoices",
      "title": "Invoices",
      "fields": [
        {
          "key": "invoiceNumber",
          "label": "Invoice number",
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
          "key": "projectId",
          "label": "Project",
          "type": "project"
        },
        {
          "key": "description",
          "label": "Line items / scope",
          "type": "textarea"
        },
        {
          "key": "subtotal",
          "label": "Subtotal",
          "type": "number"
        },
        {
          "key": "tax",
          "label": "Tax amount",
          "type": "number"
        },
        {
          "key": "discount",
          "label": "Discount",
          "type": "number"
        },
        {
          "key": "invoiceDate",
          "label": "Invoice date",
          "type": "date",
          "required": true
        },
        {
          "key": "dueDate",
          "label": "Due date",
          "type": "date",
          "required": true
        },
        {
          "key": "subscriptionId",
          "label": "Recurring service",
          "type": "subscription",
          "required": false
        },
        {
          "key": "billingPeriod",
          "label": "Service period",
          "type": "month",
          "required": false
        }
      ],
      "statuses": [
        "DRAFT",
        "SENT",
        "PARTIALLY_PAID",
        "PAID",
        "OVERDUE"
      ],
      "rows": []
    },

    {
      "key": "installments",
      "title": "Installments",
      "fields": [
        {
          "key": "installmentName",
          "label": "Installment name",
          "type": "text"
        },
        {
          "key": "invoiceId",
          "label": "Invoice",
          "type": "invoice"
        },
        {
          "key": "amount",
          "label": "Amount",
          "type": "number"
        },
        {
          "key": "dueDate",
          "label": "Due date",
          "type": "date"
        },
        {
          "key": "notes",
          "label": "Notes",
          "type": "textarea"
        }
        
      ],
      "statuses": [
        "PENDING",
        "PARTIALLY_PAID",
        "PAID",
        "OVERDUE"
      ],
      "rows": []
    },

    {
      "key": "payments",
      "title": "Payments",
      "fields": [
        {
          "key": "invoiceId",
          "label": "Invoice",
          "type": "invoice"
        },
        {
          "key": "installmentId",
          "label": "Installment (optional)",
          "type": "installment"
        },
        {
          "key": "amount",
          "label": "Amount received",
          "type": "number"
        },
        {
          "key": "paymentDate",
          "label": "Payment date",
          "type": "date"
        },
        {
          "key": "paymentMethod",
          "label": "Payment method",
          "type": "text"
        },
        {
          "key": "transactionReference",
          "label": "Transaction reference",
          "type": "text"
        },
        {
          "key": "notes",
          "label": "Notes",
          "type": "textarea"
        },
        {
          "key": "visitId",
          "label": "Collection visit",
          "type": "visit",
          "required": false
        },
        {
          "key": "promiseId",
          "label": "Payment promise",
          "type": "promise",
          "required": false
        }
      ],
      "statuses": [
        "RECEIVED"
      ],
      "rows": []
    },

    {
      "key": "expenses",
      "title": "Expenses",
      "fields": [
        {
          "key": "description",
          "label": "Description",
          "type": "text"
        },
        {
          "key": "category",
          "label": "Category",
          "type": "text"
        },
        {
          "key": "amount",
          "label": "Amount",
          "type": "number"
        },
        {
          "key": "expenseDate",
          "label": "Expense date",
          "type": "date"
        },
        {
          "key": "paymentMethod",
          "label": "Payment method",
          "type": "text"
        },
        {
          "key": "projectId",
          "label": "Project (optional)",
          "type": "project"
        },
        {
          "key": "receiptUrl",
          "label": "Receipt URL",
          "type": "url"
        }
      ],
      "statuses": [
        "PENDING",
        "APPROVED",
        "REJECTED"
      ],
      "rows": []
    },

    {
      "key": "promises",
      "title": "Payment promises",
      "fields": [
        {
          "key": "title",
          "label": "Promise description",
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
          "key": "invoiceId",
          "label": "Invoice",
          "type": "invoice",
          "required": true
        },
        {
          "key": "amount",
          "label": "Promised amount ₹",
          "type": "number",
          "required": true
        },
        {
          "key": "promisedDate",
          "label": "Promised payment date",
          "type": "date",
          "required": true
        },
        {
          "key": "assignedTo",
          "label": "Collection owner",
          "type": "employee",
          "required": true
        },
        {
          "key": "visitId",
          "label": "Related visit",
          "type": "visit",
          "required": false
        },
        {
          "key": "notes",
          "label": "Customer statement / notes",
          "type": "textarea",
          "required": false
        }
      ],
      "statuses": [
        "OPEN",
        "PARTIALLY_FULFILLED",
        "FULFILLED",
        "BROKEN",
        "CANCELLED"
      ],
      "rows": []
    },

    {
      "key": "subscriptions",
      "title": "Recurring services",
      "fields": [
        {
          "key": "serviceName",
          "label": "Service name",
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
          "key": "serviceType",
          "label": "Service type",
          "type": "select",
          "required": true,
          "options": [
            "Backend maintenance",
            "Digital marketing",
            "SEO",
            "Hosting",
            "Software support",
            "Other"
          ]
        },
        {
          "key": "amount",
          "label": "Service fee per cycle ₹",
          "type": "number",
          "required": true
        },
        {
          "key": "frequency",
          "label": "Billing frequency",
          "type": "select",
          "required": true,
          "options": [
            "Monthly",
            "Quarterly",
            "Yearly"
          ]
        },
        {
          "key": "startDate",
          "label": "Service start",
          "type": "date",
          "required": true
        },
        {
          "key": "nextBillingDate",
          "label": "Next invoice date",
          "type": "date",
          "required": true
        },
        {
          "key": "paymentDueDays",
          "label": "Payment due within (days)",
          "type": "number",
          "required": false
        },
        {
          "key": "assignedTo",
          "label": "Account owner",
          "type": "employee",
          "required": true
        },
        {
          "key": "notes",
          "label": "Service commitment",
          "type": "textarea",
          "required": false
        }
      ],
      "statuses": [
        "ACTIVE",
        "PAUSED",
        "CANCELLED"
      ],
      "rows": []
    },

    {
      "key": "payroll",
      "title": "Payroll",
      "fields": [
        {
          "key": "employeeId",
          "label": "Employee",
          "type": "employee",
          "required": true
        },
        {
          "key": "month",
          "label": "Salary month",
          "type": "month",
          "required": true
        },
        {
          "key": "year",
          "label": "Year",
          "type": "number",
          "required": true
        },
        {
          "key": "otherDeduction",
          "label": "Other deduction",
          "type": "number"
        },
        {
          "key": "bonus",
          "label": "Bonus",
          "type": "number"
        },
        {
          "key": "allowance",
          "label": "Allowance",
          "type": "number"
        },
        {
          "key": "paymentDate",
          "label": "Payment date",
          "type": "date"
        },
        {
          "key": "paymentMethod",
          "label": "Payment method",
          "type": "text"
        },
        {
          "key": "transactionReference",
          "label": "Transaction reference",
          "type": "text"
        },
        {
          "key": "notes",
          "label": "Notes",
          "type": "textarea"
        },
        {
          "key": "grossSalary",
          "label": "Gross salary",
          "type": "number"
        },
        {
          "key": "workingDays",
          "label": "Working days",
          "type": "number"
        },
        {
          "key": "presentDays",
          "label": "Present days",
          "type": "number"
        },
        {
  "key": "absentDays",
  "label": "Absent days",
  "type": "number"
},
        {
          "key": "halfDays",
          "label": "Half days",
          "type": "number"
        },
        {
          "key": "casualLeaveDays",
          "label": "Casual leave days",
          "type": "number"
        },
        {
          "key": "allowedCasualLeaveDays",
          "label": "Allowed casual leave days",
          "type": "number"
        },
        {
          "key": "extraLeaveDays",
          "label": "Extra casual leave days",
          "type": "number"
        },
        {
          "key": "unpaidLeaveDays",
          "label": "Unpaid leave days",
          "type": "number"
        },
        {
          "key": "perDaySalary",
          "label": "Per day salary",
          "type": "number"
        },
        {
          "key": "leaveDeduction",
          "label": "Leave deduction",
          "type": "number"
        },
        {
          "key": "netSalary",
          "label": "Net salary",
          "type": "number"
        }
      ],
      "statuses": [
        "CALCULATED",
        "APPROVED",
        "PAID"
      ],
      "rows": []
    }

  ]

};