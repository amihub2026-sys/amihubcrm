// Frontend record contracts. The backend remains the source of truth.
export type EmployeesStatus = 'ACTIVE' | 'ON_LEAVE' | 'INACTIVE';
export interface EmployeesRecord {
 id: string;
 revision?: number;
 status: EmployeesStatus;
 name?: string;
 email?: string;
 phone?: string;
 department?: string;
 designation?: string;
 joiningDate?: string;
 reportingManager?: string;
 employmentType?: string;
}

export type AttendanceStatus = 'PRESENT' | 'ABSENT' | 'HALF_DAY' | 'REMOTE';
export interface AttendanceRecord {
 id: string;
 revision?: number;
 status: AttendanceStatus;
 employeeId?: string;
 date?: string;
 checkIn?: string;
 checkOut?: string;
}

export type LeaveStatus = 'PENDING' | 'APPROVED' | 'REJECTED';
export interface LeaveRecord {
 id: string;
 revision?: number;
 status: LeaveStatus;
 employeeId?: string;
 leaveType?: string;
 startDate?: string;
 endDate?: string;
 reason?: string;
}

