import {Injectable} from '@angular/core';
import {RecordDomainService} from '../../../core/services/record-domain.service';

@Injectable({providedIn:'root'})
export class HrService extends RecordDomainService {
 constructor() {super(["employees", "attendance", "leave"]);}
}
