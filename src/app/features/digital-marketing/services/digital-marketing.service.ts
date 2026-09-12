import {Injectable} from '@angular/core';
import {RecordDomainService} from '../../../core/services/record-domain.service';

@Injectable({providedIn:'root'})
export class DigitalMarketingService extends RecordDomainService {
 constructor() {super(["campaigns","campaignLeads","plans", "content"]);}
}
