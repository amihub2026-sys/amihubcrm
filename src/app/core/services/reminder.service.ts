import {Injectable,inject,signal} from '@angular/core';
import {CrmStore} from './crm-store.service';import {PermissionService} from './permission.service';import {AuthService} from './auth.service';import {dayGap,promiseBalance} from './business-metrics';
export interface Reminder {id:string;recordId:string;title:string;detail:string;date:string;days:number;resource:string;route:string;customerId?:string;read:boolean;kind:string;}
@Injectable({providedIn:'root'})
export class ReminderService {
 readonly store=inject(CrmStore);private access=inject(PermissionService);private auth=inject(AuthService);private reads=signal<string[]>([]);
 markRead(id:string){this.reads.update(rows=>[...new Set([...rows,id])]);}
 get items():Reminder[]{
  const today=new Date().toISOString().slice(0,10),out:Reminder[]=[];
  const add=(resource:string,row:any,date:string,title:string,detail:string,route:string,kind:string,window=7)=>{if(!date||!this.access.visible(resource,row,this.store.records()))return;const days=dayGap(date,today);if(!Number.isFinite(days)||days>window)return;const stage=kind==='Payment received'?'received':days<0?'overdue':days===0?'due':kind==='Renewal'?(days>15?'30-day':days>7?'15-day':'7-day'):'upcoming';const id=[this.auth.user()?.id,resource,row.id,kind,date,stage].join(':');out.push({id,recordId:row.id,title,detail,date,days,resource,route,kind,customerId:row.customerId,read:this.reads().includes(id)});};
  for(const row of this.store.list('renewals'))if(row.status!=='CANCELLED')add('renewals',row,row.expiryDate,row.serviceName+' renewal','Complete renewal and record the new expiry date.','/support-renewals/renewals','Renewal',30);
  for(const row of this.store.list('subscriptions'))if(row.status==='ACTIVE')add('subscriptions',row,row.nextBillingDate,row.serviceName+' billing','Prepare the next service invoice. Previous unpaid invoices remain outstanding.','/accounts/subscriptions','Monthly billing');
  for(const row of this.store.list('invoices'))if(row.status!=='DRAFT'&&this.store.balance(row)>0)add('invoices',row,row.dueDate,row.invoiceNumber+' payment','Outstanding ₹'+this.store.balance(row).toLocaleString('en-IN'),'/accounts/invoices','Payment');
  for(const row of this.store.list('installments'))if(!['PAID','CANCELLED'].includes(row.status))add('installments',row,row.dueDate,row.installmentName,'Review the remaining installment balance.','/accounts/installments','Installment');
  for(const row of this.store.list('promises'))if(!['FULFILLED','CANCELLED'].includes(row.status)&&promiseBalance(row,this.store.list('payments'))>0)add('promises',row,row.promisedDate,row.title,'Follow up on the customer’s promised payment.','/customers/promises','Payment promise');
  for(const row of this.store.list('visits'))if(row.status==='PLANNED')add('visits',row,row.visitDate,row.title,'Customer visit · '+(row.visitTime||'Time to confirm'),'/customers/visits','Visit');
  for(const row of this.store.list('followups'))if(row.status==='PENDING')add('followups',row,row.followUpDate,'Customer follow-up',row.notes||'Contact the customer.','/sales/followups','Follow-up');
  for(const row of this.store.list('meetings'))if(row.status==='SCHEDULED')add('meetings',row,row.date,row.title,row.time||'Check meeting time.','/sales/meetings','Meeting');
  for(const row of this.store.list('quotations'))if(['DRAFT','SENT'].includes(row.status))add('quotations',row,row.validUntil,row.quotationNumber+' expires','Follow up before quotation validity ends.','/sales/quotations','Quotation');
  for(const resource of ['projects','tasks'])for(const row of this.store.list(resource))if(!['COMPLETED','DELIVERED'].includes(row.status))add(resource,row,row.deadline||row.dueDate,row.projectName||row.title,'Review progress and the next action.','/projects/'+resource,'Work deadline');
  for(const row of this.store.list('content'))if(!['PUBLISHED','CANCELLED'].includes(row.status))add('content',row,row.status==='CLIENT_REVIEW'?row.approvalDueDate||row.scheduledDate:row.scheduledDate,row.title,row.status==='CLIENT_REVIEW'?'Waiting for client approval.':'Prepare or publish the approved content.','/digital-marketing/content',row.status==='CLIENT_REVIEW'?'Approval':'Content');
  for(const row of this.store.list('plans'))if(row.status!=='COMPLETED')for(const [key,label] of [['planDueDate','Prepare content plan'],['assetsDueDate','Collect customer photos and videos'],['reportDueDate','Send monthly performance report']])add('plans',row,row[key],label+' · '+row.title,'Monthly marketing commitment.','/digital-marketing/plans','Marketing');
  for(const row of this.store.list('tickets'))if(!['RESOLVED','CLOSED'].includes(row.status))add('tickets',row,row.dueDate,row.title,'Customer support needs attention.','/support-renewals/tickets','Support');
  if(this.auth.hasRole('owner','admin','accounts'))for(const row of this.store.list('payments'))if(row.paymentDate&&dayGap(row.paymentDate,today)>=-7)add('payments',row,row.paymentDate,'Payment recorded','₹'+Number(row.amount).toLocaleString('en-IN')+' received · '+this.store.label('invoices',row.invoiceId),'/accounts/payments','Payment received');
  return out.sort((a,b)=>a.days-b.days||a.title.localeCompare(b.title));
 }
}
