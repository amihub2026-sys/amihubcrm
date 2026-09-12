import {CrmStore} from './crm-store.service';
import { Injectable,signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { firstValueFrom,timeout } from 'rxjs';
import { CurrentUser,UserRole } from '../models/user.model';
import { environment } from '../../../environments/environment';
const roles:UserRole[]=['owner','admin','hr','sales','telecaller','project_manager','developer','designer','video_editor','digital_marketing','accounts','support'];
@Injectable({providedIn:'root'})
export class AuthService {
 readonly preview=environment.preview;
 readonly user=signal<CurrentUser|null>(null);
 readonly sessionMessage=signal('');
 constructor(private router:Router,private http:HttpClient,private store:CrmStore) {}
 private accept(payload:unknown):CurrentUser {
  const u=(payload as {user?:CurrentUser})?.user;
  if(!u||typeof u.id!=='string'||!u.id||typeof u.name!=='string'||typeof u.email!=='string'||!roles.includes(u.role))throw new Error('Invalid user session returned by server.');
  return {id:u.id,employeeId:u.employeeId,name:u.name,email:u.email,role:u.role};
 }
 async restoreSession():Promise<void> {
  if(environment.preview){this.setPreviewRole('owner');return;}
  // Discard obsolete demo identities; never trust roles persisted by the browser.
  localStorage.removeItem('amihub_crm_user');localStorage.removeItem('amihub_crm_token');
  try {this.user.set(this.accept(await firstValueFrom(this.http.get(environment.apiUrl+'/auth/me',{withCredentials:true}).pipe(timeout(10000)))));}catch{this.user.set(null);}
 }
 setPreviewRole(role:UserRole){if(!environment.preview)return;const sample:Partial<Record<UserRole,{name:string;employeeId:string}>>={developer:{name:'Arjun M',employeeId:'EM-102'},project_manager:{name:'Arjun M',employeeId:'EM-102'},designer:{name:'Sneha K',employeeId:'EM-103'},digital_marketing:{name:'Sneha K',employeeId:'EM-103'},video_editor:{name:'Rahul V',employeeId:'EM-104'},sales:{name:'Priya S',employeeId:'EM-101'},telecaller:{name:'Karthik R',employeeId:'EM-105'},support:{name:'Arjun M',employeeId:'EM-102'}};this.user.set({id:'preview-'+role,name:sample[role]?.name||'AMI HUB Admin',employeeId:sample[role]?.employeeId,email:'preview@example.com',role});void this.router.navigate(['/dashboard']);}
 async login(email:string,password:string):Promise<void> {
  this.sessionMessage.set('');
  const payload=await firstValueFrom(this.http.post(environment.apiUrl+'/auth/login',{email:email.trim(),password},{withCredentials:true}).pipe(timeout(15000)));
  this.user.set(this.accept(payload));
  await this.router.navigate(['/dashboard']);
 }
 async logout():Promise<void> {
  if(environment.preview){this.user.set(null);this.store.clear();await this.router.navigate(['/login']);return;}
  try {await firstValueFrom(this.http.post(environment.apiUrl+'/auth/logout',{}, {withCredentials:true}).pipe(timeout(10000)));this.sessionMessage.set('');}
  catch {this.sessionMessage.set('Sign-out could not be confirmed by the server. Please retry when your connection is restored.');}
  this.store.clear();this.user.set(null);await this.router.navigate(['/login']);
 }
 expire(){this.store.clear();this.user.set(null);this.sessionMessage.set('Your session has expired. Please sign in again.');void this.router.navigate(['/login']);}
 isLoggedIn(){return !!this.user();}
 hasRole(...allowed:UserRole[]){const role=this.user()?.role;return !!role&&allowed.includes(role);}
}
