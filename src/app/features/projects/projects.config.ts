import { Module } from '../../core/models/crm-schema.model';

export const ProjectsConfig: Module = {
  "title": "Projects",
  "tabs": [
    {
      "key": "projects",
      "title": "All projects",
      "fields": [
        {
          "key": "projectName",
          "label": "Project name",
          "type": "text"
        },
        {
          "key": "customerId",
          "label": "Customer",
          "type": "customer"
        },
        {
          "key": "projectType",
          "label": "Project type",
          "type": "text"
        },
        {
          "key": "description",
          "label": "Description",
          "type": "textarea"
        },
        {
          "key": "projectManager",
          "label": "Project manager",
          "type": "employee"
        },
        {
          "key": "assignedEmployees",
          "label": "Team",
          "type": "employee-list"
        },
        {
          "key": "startDate",
          "label": "Start date",
          "type": "date"
        },
        {
          "key": "deadline",
          "label": "Deadline",
          "type": "date"
        },
        {
          "key": "priority",
          "label": "Priority",
          "type": "text"
        },
        {
          "key": "progress",
          "label": "Progress (%)",
          "type": "number"
        },
        {
          "key": "budget",
          "label": "Budget",
          "type": "number"
        }
      ],
      "statuses": [
        "REQUIREMENT",
        "DESIGN",
        "DEVELOPMENT",
        "TESTING",
        "INTERNAL_REVIEW",
        "CLIENT_REVIEW",
        "REVISION",
        "DEPLOYMENT",
        "COMPLETED",
        "DELIVERED"
      ],
      "rows": []
    },
    {
      "key": "tasks",
      "title": "Tasks",
      "fields": [
        {
          "key": "title",
          "label": "Task title",
          "type": "text"
        },
        {
          "key": "projectId",
          "label": "Project",
          "type": "project"
        },
        {
          "key": "description",
          "label": "Description",
          "type": "textarea"
        },
        {
          "key": "assignedTo",
          "label": "Assigned to",
          "type": "employee"
        },
        {
          "key": "dueDate",
          "label": "Due date",
          "type": "date"
        },
        {
          "key": "priority",
          "label": "Priority",
          "type": "text"
        },
        {
          "key": "progress",
          "label": "Progress (%)",
          "type": "number"
        },
        {
          "key": "comments",
          "label": "Comments",
          "type": "textarea"
        },
        {
          "key": "attachments",
          "label": "File link",
          "type": "url"
        }
      ],
      "statuses": [
        "TODO",
        "IN_PROGRESS",
        "REVIEW",
        "CHANGES_REQUIRED",
        "COMPLETED"
      ],
      "rows": []
    },
    {
      "key": "files",
      "title": "Project files",
      "fields": [
        {
          "key": "title",
          "label": "File name",
          "type": "text"
        },
        {
          "key": "projectId",
          "label": "Project",
          "type": "project"
        },
        {
          "key": "fileUrl",
          "label": "File URL",
          "type": "url"
        },
        {
          "key": "notes",
          "label": "Notes",
          "type": "textarea"
        }
      ],
      "statuses": [
        "REQUIREMENTS",
        "WORKING",
        "DELIVERABLE"
      ],
      "rows": []
    }
  ]
};
