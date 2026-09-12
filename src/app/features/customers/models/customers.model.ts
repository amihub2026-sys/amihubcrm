// Frontend record contracts. The backend remains the source of truth.
export type CustomersStatus = 'ACTIVE' | 'INACTIVE';
export interface CustomersRecord {
 id: string;
 revision?: number;
 status: CustomersStatus;
 businessName?: string;
 contactPerson?: string;
 phone?: string;
 email?: string;
 address?: string;
 location?: string;
 services?: string;
 accountManager?: string;
}

export type VisitsStatus = 'PLANNED' | 'COMPLETED' | 'CANCELLED';
export interface VisitsRecord {
 id: string;
 revision?: number;
 status: VisitsStatus;
 title?: string;
 customerId?: string;
 visitDate?: string;
 visitTime?: string;
 assignedTo?: string;
 location?: string;
 outcome?: string;
 nextAction?: string;
 nextFollowUpDate?: string;
 notes?: string;
}

