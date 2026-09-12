import {Injectable} from '@angular/core';
import {RecordDomainService} from '../../../core/services/record-domain.service';

@Injectable({providedIn:'root'})
export class SettingsService extends RecordDomainService {
 constructor() {super(["billingProfile","users", "services", "departments"]);}
}
