export type UserRole = 'owner' | 'admin' | 'hr' | 'sales' | 'telecaller' | 'project_manager' | 'developer' | 'designer' | 'video_editor' | 'digital_marketing' | 'accounts' | 'support';

export interface CurrentUser {
  id: string;
  employeeId?: string;
  name: string;
  email: string;
  role: UserRole;
}
