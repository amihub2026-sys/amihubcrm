import { Injectable, signal } from '@angular/core';
import { DEMO_RECORDS } from '../app/core/data/demo-records';
@Injectable({providedIn:'root'})
export class TestStore {
 readonly records=signal<Record<string,any[]>>(this.load());
 readonly activity=signal<any[]>(this.read('ami-activity',[]));
 readonly notice=signal('');
 private read(key:string,fallback:any){try{return JSON.parse(localStorage.getItem(key)||'null')??fallback}catch{return fallback}}
 private load(){return this.read('ami-crm-demo-v2',structuredClone(DEMO_RECORDS))}
 async convertLead(id:string){const lead=this.list('leads').find(x=>x.id===id);const prior=this.list('customers').find(x=>x.sourceLeadId===id);if(prior)return prior;return this.save('customers',{...lead,id:undefined,sourceLeadId:id,status:'ACTIVE'})}
 list(key:string){return this.records()[key]||[]}
 save(key:string,record:any,actor='Admin'){const current=this.list(key);const exists=current.some(x=>x.id===record.id);const item={...record,id:record.id||key.slice(0,2).toUpperCase()+'-'+crypto.randomUUID()};this.records.update(s=>({...s,[key]:exists?current.map(x=>x.id===item.id?item:x):[item,...current]}));if(key==='calls'&&item.nextFollowUpDate)this.save('followups',{leadId:item.leadId,followUpDate:item.nextFollowUpDate,status:'PENDING'});this.persist();this.log(`${exists?'Updated':'Created'} ${key}: ${item.businessName||item.title||item.name||item.id}`,actor);return item}
 remove(key:string,id:string,actor:string){this.records.update(s=>({...s,[key]:this.list(key).filter(x=>x.id!==id)}));this.persist();this.log(`Deleted ${key}: ${id}`,actor)}
 persist(){try{localStorage.setItem('ami-crm-demo-v2',JSON.stringify(this.records()))}catch{this.notice.set('Browser storage is full. Export your records before closing.')}}
 log(text:string,actor:string){const a={text,actor,date:new Date().toISOString()};this.activity.update(x=>[a,...x].slice(0,200));try{localStorage.setItem('ami-activity',JSON.stringify(this.activity()))}catch{this.notice.set('Activity could not be saved to this browser.')}}
 total(inv:any){return Math.max(0,Number(inv.subtotal||0)+Number(inv.tax||0)-Number(inv.discount||0))}
 paid(id:string){return this.list('payments').filter(p=>p.invoiceId===id).reduce((s,p)=>s+Number(p.amount),0)}
 balance(inv:any){return this.total(inv)-this.paid(inv.id)}
 label(key:string,id:string){const x=this.list(key).find(x=>x.id===id);return x?.businessName||x?.projectName||x?.invoiceNumber||x?.installmentName||x?.name||x?.title||id||'—'}
 toast(message:string){this.notice.set(message);setTimeout(()=>this.notice.set(''),4000)}
}
