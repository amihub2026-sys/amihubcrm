import {Injectable} from '@angular/core';
import {RecordDomainService} from '../../../core/services/record-domain.service';

@Injectable({providedIn:'root'})
export class SupportRenewalsService extends RecordDomainService {
 constructor() {super(["tickets", "renewals"]);}
}
