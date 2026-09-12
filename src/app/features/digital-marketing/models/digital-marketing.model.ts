// Frontend record contracts. The backend remains the source of truth.
export type PlansStatus = 'PLANNED' | 'ACTIVE' | 'COMPLETED';
export interface PlansRecord {
 id: string;
 revision?: number;
 status: PlansStatus;
 title?: string;
 customerId?: string;
 month?: string;
 platforms?: string;
 posterTarget?: number;
 reelTarget?: number;
 storyTarget?: number;
 videoTarget?: number;
 assignedEmployees?: string[];
 planDueDate?: string;
 assetsDueDate?: string;
 reportDueDate?: string;
}

export type ContentStatus = 'PLANNED' | 'ASSIGNED' | 'CREATED' | 'INTERNAL_REVIEW' | 'CLIENT_REVIEW' | 'REVISION' | 'APPROVED' | 'SCHEDULED' | 'PUBLISHED';
export interface ContentRecord {
 id: string;
 revision?: number;
 status: ContentStatus;
 title?: string;
 marketingPlanId?: string;
 customerId?: string;
 contentType?: string;
 platform?: string;
 scheduledDate?: string;
 assignedTo?: string;
 fileUrl?: string;
 clientFeedback?: string;
 approvalDueDate?: string;
}

export type CampaignsStatus = 'DRAFT' | 'ACTIVE' | 'PAUSED' | 'COMPLETED';
export interface CampaignsRecord {
 id: string;
 revision?: number;
 status: CampaignsStatus;
 title?: string;
 customerId?: string;
 platform?: string;
 objective?: string;
 startDate?: string;
 endDate?: string;
 budget?: number;
 actualSpend?: number;
 leadCount?: number;
 conversions?: number;
 assignedTo?: string;
 notes?: string;
}

export type CampaignLeadsStatus = 'NEW' | 'CONTACTED' | 'INTERESTED' | 'CONVERTED' | 'LOST';
export interface CampaignLeadsRecord {
 id: string;
 revision?: number;
 status: CampaignLeadsStatus;
 name?: string;
 campaignId?: string;
 customerId?: string;
 phone?: string;
 email?: string;
 receivedDate?: string;
 assignedTo?: string;
 notes?: string;
}

