import { Module } from '../../core/models/crm-schema.model';

export const HrConfig: Module = {

  "title": "People & HR",

  "tabs": [

    {

      "key": "employees",

      "title": "Employees",

      "fields": [

        {

  "key": "name",

  "label": "Employee name",

  "type": "text",

  "required": true

},

       {

  "key": "email",

  "label": "Email",

  "type": "email",

  "required": true

},

        {

          "key": "phone",

          "label": "Phone",

          "type": "tel"

        },

        {

          "key": "department",

          "label": "Department",

          "type": "text"

        },

        {

          "key": "designation",

          "label": "Designation",

          "type": "text"

        },

        {

          "key": "joiningDate",

          "label": "Joining date",

          "type": "date"

        },

        {

          "key": "reportingManager",

          "label": "Reporting manager",

          "type": "employee"

        },

      {

  "key": "employmentType",

  "label": "Employment type",

  "type": "text"

},

{

  "key": "monthlySalary",

  "label": "Monthly salary",

  "type": "number"

},

{

  "key": "salaryWorkingDays",

  "label": "Salary working days",

  "type": "number"

},

{

  "key": "allowedCasualLeavePerMonth",

  "label": "Allowed casual leave per month",

  "type": "number"

}

      ],

      "statuses": [

        "ACTIVE",

        "ON_LEAVE",

        "INACTIVE"

      ],

      "rows": []

    },

    {

      "key": "attendance",

"title": "Attendance",

"fields": [

  {

    "key": "employeeId",

    "label": "Employee",

    "type": "employee",

    "required": true

  },

       {

  "key": "date",

  "label": "Date",

  "type": "date",

  "required": true

},

        {

          "key": "checkIn",

          "label": "Check-in",

          "type": "time"

        },

      {

  "key": "checkOut",

  "label": "Check-out",

  "type": "time"

},

{

  "key": "source",

  "label": "Source",

  "type": "text"

}

      ],

  "statuses": [
  "PRESENT",
  "ABSENT",
  "HALF_DAY",
  "REMOTE",
  "LEAVE"
],

      "rows": []

    },

    {

      "key": "attendanceSettings",

      "title": "Attendance Settings",

      "fields": [

        {

          "key": "officeStartTime",

          "label": "Office start time",

          "type": "time",

          "required": true

        },

        {

          "key": "officeEndTime",

          "label": "Office end time",

          "type": "time",

          "required": true

        },

        {

          "key": "absenceBufferMinutes",

          "label": "Absence buffer minutes",

          "type": "number",

          "required": true

        },

        {

          "key": "workingDays",

          "label": "Working days",

          "type": "number-list",

          "required": true

        },

        {

          "key": "timezone",

          "label": "Timezone",

          "type": "text",

          "required": true

        }

      ],

      "statuses": [

        "ACTIVE"

      ],

      "rows": []

    },

    {

      "key": "leave",

      "title": "Leave requests",

      "fields": [

       {

  "key": "employeeId",

  "label": "Employee",

  "type": "employee",

  "required": true

},

       {

  "key": "leaveType",

  "label": "Leave type",

  "type": "select",

  "required": true,

  "options": [

    "CASUAL",

    "SICK",

    "UNPAID"

  ]

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

  "key": "reason",

  "label": "Reason",

  "type": "textarea",

  "required": true

}

      ],

      "statuses": [

        "PENDING",

        "APPROVED",

        "REJECTED"

      ],

      "rows": []

    }

  ]

};