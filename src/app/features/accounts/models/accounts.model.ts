// Frontend record contracts. The backend remains the source of truth.
export type InvoicesStatus = 'DRAFT' | 'SENT' | 'PARTIALLY_PAID' | 'PAID' | 'OVERDUE';
export interface InvoicesRecord {
 id: string;
 revision?: number;
 status: InvoicesStatus;
 invoiceNumber?: string;
 customerId?: string;
 projectId?: string;
 description?: string;
 subtotal?: number;
 tax?: number;
 discount?: number;
 invoiceDate?: string;
 dueDate?: string;
 subscriptionId?: string;
 billingPeriod?: string;
 items?: {description:string;quantity:number;unitPrice:number}[];
}

export type InstallmentsStatus = 'PENDING' | 'PARTIALLY_PAID' | 'PAID' | 'OVERDUE';
export interface InstallmentsRecord {
 id: string;
 revision?: number;
 status: InstallmentsStatus;
 installmentName?: string;
 invoiceId?: string;
 amount?: number;
 dueDate?: string;
 notes?: string;
}

export type PaymentsStatus = 'RECEIVED';
export interface PaymentsRecord {
 id: string;
 revision?: number;
 status: PaymentsStatus;
 invoiceId?: string;
 installmentId?: string;
 amount?: number;
 paymentDate?: string;
 paymentMethod?: string;
 transactionReference?: string;
 notes?: string;
 visitId?: string;
 promiseId?: string;
}

export type ExpensesStatus = 'PENDING' | 'APPROVED' | 'REJECTED';
export interface ExpensesRecord {
 id: string;
 revision?: number;
 status: ExpensesStatus;
 description?: string;
 category?: string;
 amount?: number;
 expenseDate?: string;
 paymentMethod?: string;
 projectId?: string;
 receiptUrl?: string;
}

export type PromisesStatus = 'OPEN' | 'PARTIALLY_FULFILLED' | 'FULFILLED' | 'BROKEN' | 'CANCELLED';
export interface PromisesRecord {
 id: string;
 revision?: number;
 status: PromisesStatus;
 title?: string;
 customerId?: string;
 invoiceId?: string;
 amount?: number;
 promisedDate?: string;
 assignedTo?: string;
 visitId?: string;
 notes?: string;
}

export type SubscriptionsStatus = 'ACTIVE' | 'PAUSED' | 'CANCELLED';
export interface SubscriptionsRecord {
 id: string;
 revision?: number;
 status: SubscriptionsStatus;
 serviceName?: string;
 customerId?: string;
 serviceType?: string;
 amount?: number;
 frequency?: string;
 startDate?: string;
 nextBillingDate?: string;
 paymentDueDays?: number;
 assignedTo?: string;
 notes?: string;
}

