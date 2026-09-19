import {nextCycle} from './business-metrics';
import { Injectable,inject,signal } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { firstValueFrom,timeout } from 'rxjs';
import { environment } from '../../../environments/environment';
import { MODULES } from '../models/crm.config';
@Injectable({providedIn:'root'})
export class CrmStore {
 private http=inject(HttpClient);readonly records=signal<Record<string,any[]>>({});readonly activity=signal<any[]>([]);readonly notice=signal('');readonly loading=signal(false);readonly loadError=signal('');
 private allowed:string[]=[];
 private async request<T>(method:string,path:string,body?:unknown):Promise<T>{return firstValueFrom(this.http.request<T>(method,environment.apiUrl+path,{body,withCredentials:true}).pipe(timeout(20000)));}
 list(key:string):any[]{if(key==='invoiceDirectory')return this.records()['invoiceDirectory']?.length?this.records()['invoiceDirectory']:this.list('invoices').map(r=>({id:r.id,invoiceNumber:r.invoiceNumber,customerId:r.customerId}));return this.records()[key]||[]}
 async loadRemote(){if(environment.preview){if(!Object.keys(this.records()).length){const {previewWorkspace}=await import('../data/preview-workspace');this.records.set(previewWorkspace());this.allowed=Object.keys(this.records());}this.loading.set(false);this.loadError.set('');return;}this.loading.set(true);this.loadError.set('');this.records.set({});this.activity.set([]);try{const boot=await this.request<{resources:string[];directory:any[];projectDirectory?:any[];invoiceDirectory?:any[];activity:any[]}>('GET','/bootstrap');this.allowed=boot.resources;this.records.set({directory:boot.directory,projectDirectory:boot.projectDirectory||[],invoiceDirectory:boot.invoiceDirectory||[]});this.activity.set(boot.activity);for(let i=0;i<this.allowed.length;i+=4)await Promise.all(this.allowed.slice(i,i+4).map(key=>this.refresh(key)));}catch(error){this.records.set({});this.loadError.set('Workspace data could not be loaded. Check your connection and retry.');throw error;}finally{this.loading.set(false);}}
 async refresh(key:string){if(!this.allowed.includes(key))return;let items:any[]=[];let page=1,total=0;do{const result=await this.request<{items:any[];total:number}>('GET','/'+key+'?page='+page+'&pageSize=200');items.push(...result.items);total=result.total;if(!result.items.length&&items.length<total)throw new Error('Incomplete server response');page++;}while(items.length<total);this.records.update(state=>({...state,[key]:items}));}
 async save(key:string,record:any,_actor=''){if(environment.preview){const item=structuredClone({...record,id:record.id||key+'-'+crypto.randomUUID(),revision:(record.revision||0)+1});if(['invoices','quotations'].includes(key)){item.totalAmount=Number(item.subtotal||0)+Number(item.tax||0)-Number(item.discount||0);delete item.paidAmount;delete item.balanceAmount;}this.records.update(state=>({...state,[key]:[item,...this.list(key).filter(r=>r.id!==item.id)]}));if(key==='calls'&&item.nextFollowUpDate)await this.save('followups',{leadId:item.leadId,assignedTo:item.employeeId,followUpDate:item.nextFollowUpDate,notes:item.notes,status:'PENDING'},_actor);this.activity.update(a=>[{text:'Saved '+key+': '+(item.title||item.businessName||item.id),actor:_actor,date:new Date().toISOString()},...a]);return item;}const config=Object.values(MODULES).flatMap(m=>m.tabs).find(t=>t.key===key);if(!config)throw new Error('Unknown record type');const body:Record<string,unknown>={};
 
 for (const field of config.fields) {
  if (record[field.key] !== undefined) {

    let value = record[field.key];

    if (field.type === 'number' && value !== '' && value !== null) {
      value = Number(value);
    }

    body[field.key] = value;
  }
}
 
 if(record.status!==undefined)body['status']=record.status;if(record.items)body['items']=record.items;if(record.initialPassword)body['initialPassword']=record.initialPassword;if(record.id)body['expectedRevision']=record.revision;
 const result=await this.request<{record:any}>(record.id?'PATCH':'POST','/'+key+(record.id?'/'+encodeURIComponent(record.id):''),body);
 this.records.update(state=>({...state,[key]:[result.record,...this.list(key).filter(x=>x.id!==result.record.id)]}));
 const related=key==='payments'||key==='installments'?['invoices','installments']:key==='invoices'?['installments']:key==='calls'?['followups']:[];try{await Promise.all(related.map(r=>this.refresh(r)));}catch{this.toast('Saved, but related records could not be refreshed. Reload the workspace.');}return result.record;}
 async remove(key:string,id:string,_actor:string){if(environment.preview){this.records.update(state=>({...state,[key]:this.list(key).filter(r=>r.id!==id)}));return;}const record=this.list(key).find(r=>r.id===id);await this.request('DELETE','/'+key+'/'+encodeURIComponent(id)+'?revision='+encodeURIComponent(record?.revision??0));this.records.update(state=>({...state,[key]:this.list(key).filter(r=>r.id!==id)}));}
 async convertLead(id:string){if(environment.preview){const lead=this.list('leads').find(r=>r.id===id);const prior=this.list('customers').find(r=>r.sourceLeadId===id);if(prior)return prior;return this.save('customers',{...lead,id:undefined,sourceLeadId:id,status:'ACTIVE'});}const result=await this.request<{record:any}>('POST','/leads/'+encodeURIComponent(id)+'/convert',{});this.records.update(state=>({...state,customers:[result.record,...this.list('customers').filter(r=>r.id!==result.record.id)]}));await this.refresh('leads');return result.record;}
 async createCycleInvoice(subscription:any){
 if(!environment.preview){const result=await this.request<{record:any}>('POST','/subscriptions/'+subscription.id+'/invoice',{});await Promise.all([this.refresh('invoices'),this.refresh('subscriptions')]);return result.record;}
 const period=subscription.nextBillingDate;const prior=this.list('invoices').find(i=>i.subscriptionId===subscription.id&&i.cycleDate===period);if(prior)return prior;
 const due=new Date(period+'T00:00:00Z');due.setUTCDate(due.getUTCDate()+Number(subscription.paymentDueDays||0));const item=await this.save('invoices',{invoiceNumber:'AMI-'+period.replace(/-/g,'')+'-'+String(this.list('invoices').length+1).padStart(3,'0'),customerId:subscription.customerId,subscriptionId:subscription.id,cycleDate:period,billingPeriod:period.slice(0,7),description:subscription.serviceName,items:[{description:subscription.serviceName,quantity:1,unitPrice:Number(subscription.amount)}],subtotal:Number(subscription.amount),tax:0,discount:0,invoiceDate:period,dueDate:due.toISOString().slice(0,10),status:'SENT'});
 await this.save('subscriptions',{...subscription,nextBillingDate:nextCycle(period,subscription.frequency)});return item;
 }
 clear(){this.records.set({});this.activity.set([]);this.allowed=[];}
 total(inv:any){return inv.totalAmount??Math.max(0,Number(inv.subtotal||0)+Number(inv.tax||0)-Number(inv.discount||0))}
 paid(id:string){const invoice=this.list('invoices').find(i=>i.id===id);return invoice?.paidAmount??this.list('payments').filter(p=>p.invoiceId===id).reduce((s,p)=>s+Number(p.amount),0)}
 balance(inv:any){return inv.balanceAmount??this.total(inv)-this.paid(inv.id)}
 label(key:string,id:string){const lookup=key==='employees'?'directory':key;const x=this.list(lookup).find(x=>x.id===id);return x?.businessName||x?.projectName||x?.invoiceNumber||x?.installmentName||x?.name||x?.title||id||'—'}
 toast(message:string){this.notice.set(message);setTimeout(()=>this.notice.set(''),5000)}
}
