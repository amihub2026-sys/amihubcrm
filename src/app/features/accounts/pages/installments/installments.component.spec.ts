import {test} from 'node:test';
import assert from 'node:assert/strict';
import {testContext} from '../../../../../testing/test-context';
import {InstallmentsPageComponent} from './installments.component';

test('partial receipt preserves the installment outstanding state',async()=>{const c=testContext(InstallmentsPageComponent);const item={...c.store.list('installments')[0],dueDate:'2099-12-01'};c.store.save('payments',{invoiceId:item.invoiceId,installmentId:item.id,amount:6000,status:'RECEIVED'});assert.equal(c.page.recordStatus(item),'PARTIALLY_PAID');c.dispose();});
