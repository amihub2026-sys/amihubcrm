import {PermissionService} from './permission.service';
import { inject } from '@angular/core';
import { CrmStore } from './crm-store.service';

/** Browser repository boundary. Replace store calls with domain HTTP APIs during integration. */
export abstract class RecordDomainService {
 protected readonly store=inject(CrmStore);
 protected readonly access=inject(PermissionService);
 constructor(private readonly collections: readonly string[]) {}
 private check(collection:string) {
  if(!this.collections.includes(collection)) throw new Error('Collection is outside this feature: '+collection);
 }
 list(collection:string) { this.check(collection); return this.store.list(collection).filter(record=>this.access.visible(collection,record,this.store.records())); }
 save(collection:string,record:any,actor:string) { this.check(collection); if(!this.access.can(collection,record.id?'update':'create'))throw new Error('Action not permitted.'); return this.store.save(collection,record,actor); }
 remove(collection:string,id:string,actor:string) { this.check(collection); if(!this.access.can(collection,'delete'))throw new Error('Action not permitted.'); return this.store.remove(collection,id,actor); }
 async convertLead(_record:any,_actor:string): Promise<string> { return 'Customer conversion is available in Sales.'; }
}
