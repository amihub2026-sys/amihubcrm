import { Injectable } from '@angular/core';

import { RecordDomainService } from '../../../core/services/record-domain.service';

@Injectable({ providedIn: 'root' })

export class AccountsService extends RecordDomainService {

  constructor() {
    super([
      "promises",
      "subscriptions",
      "invoices",
      "installments",
      "payments",
      "expenses",
      "payroll"
    ]);
  }

}