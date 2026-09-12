// Frontend record contracts. The backend remains the source of truth.
export type TicketsStatus = 'OPEN' | 'ASSIGNED' | 'IN_PROGRESS' | 'WAITING_CLIENT' | 'RESOLVED' | 'CLOSED';
export interface TicketsRecord {
 id: string;
 revision?: number;
 status: TicketsStatus;
 title?: string;
 customerId?: string;
 projectId?: string;
 description?: string;
 priority?: string;
 assignedTo?: string;
 resolution?: string;
 dueDate?: string;
}

export type RenewalsStatus = 'ACTIVE' | 'DUE_SOON' | 'CONTACTED' | 'RENEWED' | 'EXPIRED';
export interface RenewalsRecord {
 id: string;
 revision?: number;
 status: RenewalsStatus;
 serviceName?: string;
 customerId?: string;
 renewalType?: string;
 startDate?: string;
 expiryDate?: string;
 amount?: number;
 assignedTo?: string;
 notes?: string;
}

