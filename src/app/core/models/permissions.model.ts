import { UserRole } from './user.model';

export type Action =
  'read' |
  'create' |
  'update' |
  'delete' |
  'export';

export type Resource =
  'leads' |
  'calls' |
  'followups' |
  'meetings' |
  'quotations' |
  'customers' |
  'projects' |
  'tasks' |
  'files' |
  'plans' |
  'content' |
  'employees' |
  'attendance' |
  'attendanceSettings' |
  'leave' |
  'invoices' |
  'installments' |
  'payments' |
  'expenses' |
  'payroll' |
  'tickets' |
  'renewals' |
  'users' |
  'services' |
  'departments' |
  'visits' |
  'promises' |
  'subscriptions' |
  'campaigns' |
  'campaignLeads' |
  'billingProfile';

export const SECTIONS: Record<string, Resource[]> = {

  sales: [
    'leads',
    'calls',
    'followups',
    'meetings',
    'quotations'
  ],

  customers: [
    'customers',
    'visits'
  ],

  projects: [
    'projects',
    'tasks',
    'files'
  ],

  'digital-marketing': [
    'plans',
    'content',
    'campaigns',
    'campaignLeads'
  ],

hr: [
  'employees',
  'attendance',
  'attendanceSettings'
],

  'my-leave': [
    'leave'
  ],

  accounts: [
    'invoices',
    'installments',
    'payments',
    'expenses',
    'promises',
    'subscriptions',
    'payroll'
  ],

  'support-renewals': [
    'tickets',
    'renewals'
  ],

  settings: [
    'users',
    'services',
    'departments',
    'billingProfile'
  ]

};

const edit: Action[] = [
  'read',
  'create',
  'update',
  'export'
];

const work: Action[] = [
  'read',
  'update'
];

const read: Action[] = [
  'read'
];

const selfLeave: Action[] = [
  'read',
  'create'
];

/** Deny by default. Admin/owner authority is decided by the server-issued role. */

export const GRANTS: Partial<
  Record<UserRole, Partial<Record<Resource, Action[]>>>
> = {

  sales: {
    visits: edit,
    promises: edit,
    leads: edit,
    calls: edit,
    followups: edit,
    meetings: edit,
    quotations: edit,
    customers: edit,
    leave: selfLeave
  },

  telecaller: {
    leads: work,
    calls: ['read', 'create'],
    followups: ['read', 'create', 'update'],
    meetings: read,
    leave: selfLeave
  },

  project_manager: {
    visits: edit,
    customers: read,
    projects: edit,
    tasks: edit,
    files: edit,
    leave: selfLeave
  },

  developer: {
    projects: read,
    tasks: work,
    files: edit,
    leave: selfLeave
  },

  designer: {
    projects: read,
    tasks: work,
    files: edit,
    plans: read,
    content: work,
    leave: selfLeave
  },

  video_editor: {
    projects: read,
    tasks: work,
    files: edit,
    plans: read,
    content: work,
    leave: selfLeave
  },

  digital_marketing: {
    campaigns: edit,
    campaignLeads: edit,
    visits: edit,
    customers: read,
    plans: edit,
    content: edit,
    leave: selfLeave
  },

  hr: {
    employees: edit,
    attendance: edit,
    attendanceSettings: edit,
    leave: edit,
    projects: read,
    tasks: read
  },

  accounts: {
    employees: read,
    billingProfile: read,
    visits: read,
    promises: edit,
    subscriptions: edit,
    customers: read,
    invoices: edit,
    installments: edit,
    payments: edit,
    expenses: edit,
    payroll: edit,
    renewals: edit,
    leave: selfLeave
  },

  support: {
    visits: edit,
    customers: read,
    tickets: edit,
    renewals: edit,
    leave: selfLeave
  }

};

export const SCOPED_ROLES: UserRole[] = [
  'telecaller',
  'project_manager',
  'developer',
  'designer',
  'video_editor',
  'digital_marketing',
  'support'
];