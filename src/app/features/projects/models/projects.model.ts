// Frontend record contracts. The backend remains the source of truth.
export type ProjectsStatus = 'REQUIREMENT' | 'DESIGN' | 'DEVELOPMENT' | 'TESTING' | 'INTERNAL_REVIEW' | 'CLIENT_REVIEW' | 'REVISION' | 'DEPLOYMENT' | 'COMPLETED' | 'DELIVERED';
export interface ProjectsRecord {
 id: string;
 revision?: number;
 status: ProjectsStatus;
 projectName?: string;
 customerId?: string;
 projectType?: string;
 description?: string;
 projectManager?: string;
 assignedEmployees?: string[];
 startDate?: string;
 deadline?: string;
 priority?: string;
 progress?: number;
 budget?: number;
}

export type TasksStatus = 'TODO' | 'IN_PROGRESS' | 'REVIEW' | 'CHANGES_REQUIRED' | 'COMPLETED';
export interface TasksRecord {
 id: string;
 revision?: number;
 status: TasksStatus;
 title?: string;
 projectId?: string;
 description?: string;
 assignedTo?: string;
 dueDate?: string;
 priority?: string;
 progress?: number;
 comments?: string;
 attachments?: string;
}

export type FilesStatus = 'REQUIREMENTS' | 'WORKING' | 'DELIVERABLE';
export interface FilesRecord {
 id: string;
 revision?: number;
 status: FilesStatus;
 title?: string;
 projectId?: string;
 fileUrl?: string;
 notes?: string;
}

