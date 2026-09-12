// Fictional browser-only preview records. Replace through API integration.
export const DEMO_RECORDS: Record<string, any[]> = {
  "leads": [
    {
      "id": "LD-1001",
      "businessName": "Greenfield Academy",
      "contactPerson": "Kavitha",
      "phone": "9000000001",
      "email": "office@example.com",
      "location": "Madurai",
      "interestedServices": "Website development",
      "source": "Referral",
      "assignedTo": "Priya S",
      "priority": "High",
      "nextFollowUpDate": "2026-09-12",
      "status": "NEGOTIATION",
      "notes": "Review the admissions website proposal."
    },
    {
      "id": "LD-1002",
      "businessName": "Urban Living Interiors",
      "contactPerson": "Arun",
      "phone": "9000000002",
      "location": "Madurai",
      "interestedServices": "Digital marketing",
      "source": "Instagram",
      "assignedTo": "Priya S",
      "priority": "High",
      "nextFollowUpDate": "2026-09-11",
      "status": "INTERESTED"
    },
    {
      "id": "LD-1003",
      "businessName": "Lotus Dental Care",
      "contactPerson": "Meena",
      "phone": "9000000003",
      "location": "Dindigul",
      "interestedServices": "Website + SEO",
      "source": "Website enquiry",
      "assignedTo": "Karthik R",
      "priority": "Medium",
      "nextFollowUpDate": "2026-09-14",
      "status": "MEETING"
    },
    {
      "id": "LD-1004",
      "businessName": "Southern Auto Works",
      "contactPerson": "Raj",
      "phone": "9000000004",
      "location": "Madurai",
      "interestedServices": "Social media",
      "source": "Outbound",
      "assignedTo": "Karthik R",
      "priority": "Medium",
      "status": "NEW"
    },
    {
      "id": "LD-1005",
      "businessName": "Horizon Textiles",
      "contactPerson": "Divya",
      "phone": "9000000005",
      "location": "Theni",
      "interestedServices": "E-commerce",
      "assignedTo": "Priya S",
      "priority": "Low",
      "status": "QUOTATION"
    }
  ],
  "calls": [],
  "followups": [
    {
      "id": "FU-101",
      "leadId": "LD-1001",
      "assignedTo": "Priya S",
      "followUpDate": "2026-09-12",
      "followUpTime": "10:30",
      "type": "Call",
      "notes": "Discuss proposal feedback",
      "status": "PENDING"
    }
  ],
  "meetings": [
    {
      "id": "MT-101",
      "title": "Website discovery meeting",
      "leadId": "LD-1003",
      "date": "2026-09-14",
      "time": "11:00",
      "meetingType": "Online",
      "assignedEmployees": "Karthik R",
      "status": "SCHEDULED"
    }
  ],
  "quotations": [
    {
      "id": "QT-101",
      "quotationNumber": "AMI-Q-2026-001",
      "leadId": "LD-1001",
      "description": "School website design and development",
      "subtotal": 45000,
      "tax": 0,
      "discount": 0,
      "paymentTerms": "50% advance, 50% on delivery",
      "validUntil": "2026-09-25",
      "status": "SENT"
    }
  ],
  "customers": [
    {
      "id": "CU-101",
      "businessName": "Oak & Ivory Furniture",
      "contactPerson": "Suresh",
      "phone": "9000000011",
      "email": "suresh@example.com",
      "location": "Madurai",
      "services": "Website, Digital marketing",
      "accountManager": "Priya S",
      "status": "ACTIVE"
    },
    {
      "id": "CU-102",
      "businessName": "Bloom Wellness Studio",
      "contactPerson": "Nithya",
      "phone": "9000000012",
      "location": "Madurai",
      "services": "Social media management",
      "accountManager": "Karthik R",
      "status": "ACTIVE"
    },
    {
      "id": "CU-103",
      "businessName": "Evergreen Foods",
      "contactPerson": "Vijay",
      "phone": "9000000013",
      "location": "Trichy",
      "services": "E-commerce website",
      "accountManager": "Priya S",
      "status": "ACTIVE"
    }
  ],
  "projects": [
    {
      "id": "PR-101",
      "projectName": "Furniture e-commerce website",
      "customerId": "CU-101",
      "projectType": "Website development",
      "projectManager": "Arjun M",
      "assignedEmployees": "Arjun M, Sneha K",
      "startDate": "2026-09-01",
      "deadline": "2026-09-28",
      "priority": "High",
      "progress": 65,
      "budget": 60000,
      "status": "DEVELOPMENT"
    },
    {
      "id": "PR-102",
      "projectName": "September brand campaign",
      "customerId": "CU-102",
      "projectType": "Digital marketing",
      "projectManager": "Sneha K",
      "assignedEmployees": "Sneha K, Rahul V",
      "deadline": "2026-09-30",
      "priority": "Medium",
      "progress": 40,
      "budget": 15000,
      "status": "CLIENT_REVIEW"
    },
    {
      "id": "PR-103",
      "projectName": "Online ordering platform",
      "customerId": "CU-103",
      "projectType": "Web application",
      "projectManager": "Arjun M",
      "assignedEmployees": "Arjun M",
      "deadline": "2026-10-08",
      "priority": "High",
      "progress": 25,
      "budget": 85000,
      "status": "DESIGN"
    }
  ],
  "tasks": [
    {
      "id": "TK-101",
      "title": "Build product catalogue",
      "projectId": "PR-101",
      "assignedTo": "Arjun M",
      "dueDate": "2026-09-14",
      "priority": "High",
      "progress": 70,
      "status": "IN_PROGRESS"
    },
    {
      "id": "TK-102",
      "title": "Review campaign artwork",
      "projectId": "PR-102",
      "assignedTo": "Sneha K",
      "dueDate": "2026-09-11",
      "priority": "High",
      "progress": 90,
      "status": "REVIEW"
    },
    {
      "id": "TK-103",
      "title": "Approve checkout wireframes",
      "projectId": "PR-103",
      "assignedTo": "Arjun M",
      "dueDate": "2026-09-15",
      "priority": "Medium",
      "progress": 0,
      "status": "TODO"
    }
  ],
  "files": [],
  "plans": [
    {
      "id": "MP-101",
      "title": "Bloom • September 2026",
      "customerId": "CU-102",
      "month": "2026-09",
      "platforms": "Instagram, Facebook",
      "posterTarget": 10,
      "reelTarget": 4,
      "storyTarget": 8,
      "videoTarget": 0,
      "assignedEmployees": "Sneha K, Rahul V",
      "status": "ACTIVE"
    }
  ],
  "content": [
    {
      "id": "CT-101",
      "title": "Meet your wellness routine",
      "marketingPlanId": "MP-101",
      "customerId": "CU-102",
      "contentType": "Reel",
      "platform": "Instagram",
      "scheduledDate": "2026-09-15",
      "assignedTo": "Rahul V",
      "status": "CLIENT_REVIEW"
    },
    {
      "id": "CT-102",
      "title": "Weekend wellness offer",
      "marketingPlanId": "MP-101",
      "customerId": "CU-102",
      "contentType": "Poster",
      "platform": "Facebook",
      "scheduledDate": "2026-09-19",
      "assignedTo": "Sneha K",
      "status": "PLANNED"
    }
  ],
  "employees": [
    {
      "id": "EM-101",
      "name": "Priya S",
      "email": "priya@example.com",
      "department": "Sales",
      "designation": "Business Development Executive",
      "joiningDate": "2026-01-05",
      "status": "ACTIVE"
    },
    {
      "id": "EM-102",
      "name": "Arjun M",
      "email": "arjun@example.com",
      "department": "Development",
      "designation": "Project Manager",
      "joiningDate": "2025-12-10",
      "status": "ACTIVE"
    },
    {
      "id": "EM-103",
      "name": "Sneha K",
      "email": "sneha@example.com",
      "department": "Design",
      "designation": "Creative Designer",
      "joiningDate": "2026-02-15",
      "status": "ACTIVE"
    },
    {
      "id": "EM-104",
      "name": "Rahul V",
      "email": "rahul@example.com",
      "department": "Marketing",
      "designation": "Video Editor",
      "joiningDate": "2026-03-01",
      "status": "ACTIVE"
    },
    {
      "id": "EM-105",
      "name": "Karthik R",
      "email": "karthik@example.com",
      "department": "Sales",
      "designation": "Sales Executive",
      "joiningDate": "2026-04-01",
      "status": "ON_LEAVE"
    }
  ],
  "attendance": [],
  "leave": [
    {
      "id": "LV-101",
      "employeeId": "EM-105",
      "leaveType": "Personal leave",
      "startDate": "2026-09-11",
      "endDate": "2026-09-11",
      "reason": "Personal appointment",
      "status": "APPROVED"
    }
  ],
  "invoices": [
    {
      "id": "IN-101",
      "invoiceNumber": "AMI-INV-001",
      "customerId": "CU-101",
      "projectId": "PR-101",
      "description": "E-commerce website",
      "subtotal": 60000,
      "tax": 0,
      "discount": 0,
      "invoiceDate": "2026-09-01",
      "dueDate": "2026-09-20",
      "status": "PARTIALLY_PAID"
    },
    {
      "id": "IN-102",
      "invoiceNumber": "AMI-INV-002",
      "customerId": "CU-102",
      "projectId": "PR-102",
      "description": "September marketing retainer",
      "subtotal": 15000,
      "invoiceDate": "2026-09-01",
      "dueDate": "2026-09-10",
      "status": "OVERDUE"
    }
  ],
  "installments": [
    {
      "id": "IS-101",
      "installmentName": "Design approval milestone",
      "invoiceId": "IN-101",
      "amount": 30000,
      "dueDate": "2026-09-20",
      "status": "PENDING"
    }
  ],
  "payments": [
    {
      "id": "PY-101",
      "invoiceId": "IN-101",
      "amount": 30000,
      "paymentDate": "2026-09-02",
      "paymentMethod": "Bank transfer",
      "transactionReference": "DEMO-001",
      "status": "RECEIVED"
    }
  ],
  "expenses": [
    {
      "id": "EX-101",
      "description": "Creative software subscription",
      "category": "Software",
      "amount": 2500,
      "expenseDate": "2026-09-01",
      "paymentMethod": "Card",
      "status": "APPROVED"
    }
  ],
  "tickets": [
    {
      "id": "ST-101",
      "title": "Update business opening hours",
      "customerId": "CU-101",
      "projectId": "PR-101",
      "description": "Update the footer hours after client confirmation.",
      "priority": "Low",
      "assignedTo": "Arjun M",
      "status": "OPEN"
    }
  ],
  "renewals": [
    {
      "id": "RN-101",
      "serviceName": "Website hosting",
      "customerId": "CU-101",
      "renewalType": "HOSTING",
      "startDate": "2025-10-01",
      "expiryDate": "2026-10-01",
      "amount": 6000,
      "assignedTo": "Priya S",
      "status": "DUE_SOON"
    },
    {
      "id": "RN-102",
      "serviceName": "Monthly social media retainer",
      "customerId": "CU-102",
      "renewalType": "DIGITAL_MARKETING",
      "startDate": "2026-09-01",
      "expiryDate": "2026-09-30",
      "amount": 15000,
      "assignedTo": "Karthik R",
      "status": "ACTIVE"
    }
  ],
  "users": [
    {
      "id": "US-101",
      "name": "AMI HUB Admin",
      "email": "admin@example.com",
      "role": "admin",
      "status": "ACTIVE"
    }
  ],
  "services": [
    {
      "id": "SV-101",
      "name": "Website development",
      "description": "Business websites and web applications",
      "status": "ACTIVE"
    },
    {
      "id": "SV-102",
      "name": "Digital marketing",
      "description": "Social media, SEO and campaigns",
      "status": "ACTIVE"
    }
  ],
  "departments": [
    {
      "id": "DP-101",
      "name": "Sales",
      "description": "Sales and telecalling",
      "status": "ACTIVE"
    },
    {
      "id": "DP-102",
      "name": "Development",
      "description": "Website and application delivery",
      "status": "ACTIVE"
    }
  ]
};
