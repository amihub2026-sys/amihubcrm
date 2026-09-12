// Frontend record contracts. The backend remains the source of truth.
export type UsersStatus = 'ACTIVE' | 'INACTIVE';
export interface UsersRecord {
 id: string;
 revision?: number;
 status: UsersStatus;
 name?: string;
 email?: string;
 role?: string;
 employeeId?: string;
 initialPassword?: string;
}

export type ServicesStatus = 'ACTIVE' | 'INACTIVE';
export interface ServicesRecord {
 id: string;
 revision?: number;
 status: ServicesStatus;
 name?: string;
 description?: string;
}

export type DepartmentsStatus = 'ACTIVE' | 'INACTIVE';
export interface DepartmentsRecord {
 id: string;
 revision?: number;
 status: DepartmentsStatus;
 name?: string;
 description?: string;
}

export type BillingProfileStatus = 'ACTIVE';
export interface BillingProfileRecord {
 id: string;
 revision?: number;
 status: BillingProfileStatus;
 name?: string;
 address?: string;
 email?: string;
 phone?: string;
 taxId?: string;
 bankDetails?: string;
 terms?: string;
}

