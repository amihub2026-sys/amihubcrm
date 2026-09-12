import {Injectable} from '@angular/core';
import {RecordDomainService} from '../../../core/services/record-domain.service';

@Injectable({providedIn:'root'})
export class SalesService extends RecordDomainService {
 constructor() {super(["leads", "calls", "followups", "meetings", "quotations"]);}

 override async convertLead(lead:any,_actor:string):Promise<string> {
  if(lead.status!=='WON')return 'Mark the lead as Won before converting.';
  await this.store.convertLead(lead.id);
  return 'Lead converted to a customer.';
 }
}
