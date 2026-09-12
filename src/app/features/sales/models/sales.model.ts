// Frontend record contracts. The backend remains the source of truth.
export type LeadsStatus = 'NEW' | 'ASSIGNED' | 'CONTACTED' | 'FOLLOW_UP' | 'INTERESTED' | 'MEETING' | 'QUOTATION' | 'NEGOTIATION' | 'WON' | 'LOST';
export interface LeadsRecord {
 id: string;
 revision?: number;
 status: LeadsStatus;
 businessName?: string;
 contactPerson?: string;
 phone?: string;
 email?: string;
 location?: string;
 interestedServices?: string;
 source?: string;
 assignedTo?: string;
 priority?: string;
 nextFollowUpDate?: string;
 notes?: string;
}

export type CallsStatus = 'CONNECTED' | 'NO_ANSWER' | 'BUSY' | 'SWITCHED_OFF' | 'CALL_BACK' | 'INTERESTED' | 'NOT_INTERESTED' | 'WRONG_NUMBER' | 'MEETING_FIXED';
export interface CallsRecord {
 id: string;
 revision?: number;
 status: CallsStatus;
 leadId?: string;
 employeeId?: string;
 callDate?: string;
 notes?: string;
 nextFollowUpDate?: string;
}

export type FollowupsStatus = 'PENDING' | 'COMPLETED' | 'CANCELLED';
export interface FollowupsRecord {
 id: string;
 revision?: number;
 status: FollowupsStatus;
 leadId?: string;
 assignedTo?: string;
 followUpDate?: string;
 followUpTime?: string;
 type?: string;
 notes?: string;
}

export type MeetingsStatus = 'SCHEDULED' | 'COMPLETED' | 'CANCELLED';
export interface MeetingsRecord {
 id: string;
 revision?: number;
 status: MeetingsStatus;
 title?: string;
 leadId?: string;
 date?: string;
 time?: string;
 meetingType?: string;
 location?: string;
 assignedEmployees?: string[];
 outcome?: string;
 nextAction?: string;
}

export type QuotationsStatus = 'DRAFT' | 'SENT' | 'ACCEPTED' | 'REJECTED' | 'EXPIRED';
export interface QuotationsRecord {
 id: string;
 revision?: number;
 status: QuotationsStatus;
 quotationNumber?: string;
 leadId?: string;
 description?: string;
 subtotal?: number;
 discount?: number;
 tax?: number;
 paymentTerms?: string;
 validUntil?: string;
 items?: {description:string;quantity:number;unitPrice:number}[];
}

