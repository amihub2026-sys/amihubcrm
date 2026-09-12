import {ReminderService} from '../app/core/services/reminder.service';
import {TestStore} from './test-store';
import {PermissionService} from '../app/core/services/permission.service';
import {AccountsService} from '../app/features/accounts/services/accounts.service';
import {CustomersService} from '../app/features/customers/services/customers.service';
import {DigitalMarketingService} from '../app/features/digital-marketing/services/digital-marketing.service';
import {HrService} from '../app/features/hr/services/hr.service';
import {ProjectsService} from '../app/features/projects/services/projects.service';
import {SalesService} from '../app/features/sales/services/sales.service';
import {SettingsService} from '../app/features/settings/services/settings.service';
import {SupportRenewalsService} from '../app/features/support-renewals/services/support-renewals.service';
import '@angular/compiler';
import { createEnvironmentInjector, runInInjectionContext, Type, EnvironmentInjector } from '@angular/core';
import { CrmStore } from '../app/core/services/crm-store.service';
import { AuthService } from '../app/core/services/auth.service';
import { UserRole } from '../app/core/models/user.model';

export function testContext<T>(component: Type<T>, role: UserRole = 'owner') {
 const memory = new Map<string,string>();
 const storage: Storage = { get length(){return memory.size;}, clear(){memory.clear();}, getItem(key){return memory.get(key)??null;}, setItem(key,value){memory.set(key,String(value));}, removeItem(key){memory.delete(key);}, key(index){return [...memory.keys()][index]??null;} };
 Object.defineProperty(globalThis, 'localStorage', {value: storage, configurable:true});
 Object.defineProperty(globalThis, 'document', {value: {querySelector:()=>null}, configurable:true});
 const store = new TestStore();
 store.toast=()=>{};
 const user={id:'test-owner', name:role==='developer'?'Arjun M':'AMI HUB Admin',email:'test@example.com',role};
 const auth = {user:()=>user, hasRole:(...roles:UserRole[])=>roles.includes(role)};
 const injector=createEnvironmentInjector([ReminderService,PermissionService,{provide:CrmStore,useValue:store},{provide:AuthService,useValue:auth},AccountsService,CustomersService,DigitalMarketingService,HrService,ProjectsService,SalesService,SettingsService,SupportRenewalsService], null as unknown as EnvironmentInjector);
 const page=component===CrmStore as any?store as unknown as T:runInInjectionContext(injector,()=>new component());
 return {page,store,auth,dispose:()=>injector.destroy()};
}
