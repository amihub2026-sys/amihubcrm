import {Injectable} from '@angular/core';
import {RecordDomainService} from '../../../core/services/record-domain.service';

@Injectable({providedIn:'root'})
export class CustomersService extends RecordDomainService {
 constructor() {super(["visits","customers"]);}
}
