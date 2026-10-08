import { Module } from '../../core/models/crm-schema.model';

export const CustomersConfig: Module = {
  title: 'Customers',

  tabs: [

    // =====================================================
    // ALL CUSTOMERS
    // =====================================================

    {
      key: 'customers',
      title: 'All customers',

      fields: [
        {
          key: 'businessName',
          label: 'Business name',
          type: 'text'
        },
        {
          key: 'contactPerson',
          label: 'Contact person',
          type: 'text'
        },
        {
          key: 'phone',
          label: 'Phone',
          type: 'tel'
        },
        {
          key: 'email',
          label: 'Email',
          type: 'email'
        },
        {
          key: 'address',
          label: 'Address',
          type: 'textarea'
        },
        {
          key: 'location',
          label: 'Location',
          type: 'text'
        },
        {
          key: 'services',
          label: 'Services',
          type: 'text'
        },
        {
          key: 'accountManager',
          label: 'Account manager',
          type: 'employee'
        }
      ],

      statuses: [
        'ACTIVE',
        'INACTIVE'
      ],

      rows: []
    },


    // =====================================================
    // CUSTOMER VISITS
    // =====================================================

    {
      key: 'visits',
      title: 'Customer visits',

      fields: [
        {
          key: 'title',
          label: 'Visit purpose',
          type: 'select',
          required: true,
          options: [
            'Sales discussion',
            'Requirements collection',
            'Project review',
            'Payment collection',
            'Support',
            'Renewal discussion',
            'Other'
          ]
        },
        {
          key: 'customerId',
          label: 'Customer',
          type: 'customer',
          required: true
        },
        {
          key: 'visitDate',
          label: 'Visit date',
          type: 'date',
          required: true
        },
        {
          key: 'visitTime',
          label: 'Time',
          type: 'time',
          required: false
        },
        {
          key: 'assignedTo',
          label: 'Visited by',
          type: 'employee',
          required: true
        },
        {
          key: 'location',
          label: 'Visit location',
          type: 'text',
          required: false
        },
        {
          key: 'outcome',
          label: 'Discussion and outcome',
          type: 'textarea',
          required: true
        },
        {
          key: 'nextAction',
          label: 'Next action',
          type: 'text',
          required: false
        },
        {
          key: 'nextFollowUpDate',
          label: 'Next follow-up',
          type: 'date',
          required: false
        },
        {
          key: 'notes',
          label: 'Internal notes',
          type: 'textarea',
          required: false
        }
      ],

      statuses: [
        'PLANNED',
        'COMPLETED',
        'CANCELLED'
      ],

      rows: []
    },


    // =====================================================
    // DOMAIN RENEWALS
    // =====================================================

    {
      key: 'domainRenewals',
      title: 'Domain renewals',

      fields: [

        {
          key: 'customerId',
          label: 'Customer',
          type: 'customer',
          required: true
        },

        {
          key: 'domainName',
          label: 'Domain name',
          type: 'text',
          required: true
        },

        {
          key: 'provider',
          label: 'Domain provider',
          type: 'text',
          required: false
        },

        {
          key: 'purchaseDate',
          label: 'Purchase date',
          type: 'date',
          required: false
        },

        {
          key: 'expiryDate',
          label: 'Expiry / renewal date',
          type: 'date',
          required: true
        },

        {
          key: 'renewalAmount',
          label: 'Renewal amount',
          type: 'number',
          required: false
        },

        {
          key: 'nextFollowUpDate',
          label: 'Next follow-up / reminder date',
          type: 'date',
          required: false
        },

        {
          key: 'followUpNote',
          label: 'Follow-up note',
          type: 'textarea',
          required: false
        },

        {
          key: 'newExpiryDate',
          label: 'New expiry date',
          type: 'date',
          required: false
        },

        {
          key: 'notes',
          label: 'Internal notes',
          type: 'textarea',
          required: false
        }

      ],

      statuses: [
        'ACTIVE',
        'DUE_SOON',
        'PAYMENT_PENDING',
        'PROMISED_DATE',
        'ON_HOLD',
        'RENEWED',
        'EXPIRED'
      ],

      rows: []
    }

  ]
};