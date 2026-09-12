import { Injectable,inject } from '@angular/core';
import { AuthService } from './auth.service';
import { Action,Resource,GRANTS,SECTIONS,SCOPED_ROLES } from '../models/permissions.model';
@Injectable({providedIn:'root'})
export class PermissionService {
 private auth=inject(AuthService);
 can(resource:string,action:Action='read'):boolean {const role=this.auth.user()?.role;if(!role)return false;if(role==='owner'||role==='admin')return true;return GRANTS[role]?.[resource as Resource]?.includes(action)??false;}
 section(section:string):boolean {return section==='dashboard'?!!this.auth.user():section==='reports'?this.auth.hasRole('owner','admin','sales','hr','accounts','project_manager','digital_marketing'):(SECTIONS[section]||[]).some(r=>this.can(r));}
 canField(resource:string,field:string):boolean {
  if(['budget','subtotal','tax','discount','paidAmount','balanceAmount'].includes(field)&&['projects','tasks'].includes(resource))return this.auth.hasRole('owner','admin','accounts','project_manager');
  if(['assignedTo','assignedEmployees','projectManager'].includes(field)&&this.auth.hasRole('developer','designer','video_editor','telecaller'))return false;
  return true;
 }
 visible(resource:string,record:any,all:Record<string,any[]>,action:Action='read'):boolean {
  if(!this.can(resource,action))return false;
  const user=this.auth.user();if(!user)return false;
  if(!SCOPED_ROLES.includes(user.role))return true;
  const identities=[user.id,user.employeeId,user.name].filter(Boolean);
  const matches=(v:any):boolean=>(Array.isArray(v)?v:String(v||'').split(',')).some((x:any)=>identities.includes(String(x).trim()));
  const assigned=(r:any)=>['assignedTo','assignedEmployees','projectManager','employeeId','accountManager'].some(k=>matches(r?.[k]));
  const project=(id:string)=>(all['projects']||[]).find(p=>p.id===id);
  const lead=(id:string)=>(all['leads']||[]).find(p=>p.id===id);
  if(assigned(record))return true;
  if(['calls','followups','meetings'].includes(resource))return assigned(lead(record.leadId));
  if(resource==='files')return assigned(project(record.projectId));
  if(resource==='tasks'&&user.role==='project_manager')return assigned(project(record.projectId));
  if(resource==='customers')return ['projects','plans','tickets','renewals'].some(k=>(all[k]||[]).some(r=>r.customerId===record.id&&assigned(r)));
  if(resource==='content')return assigned((all['plans']||[]).find(p=>p.id===record.marketingPlanId));
  return false;
 }
}
