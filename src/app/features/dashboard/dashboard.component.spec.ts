import {test} from 'node:test';
import assert from 'node:assert/strict';
import {testContext} from '../../../testing/test-context';
import {DashboardComponent} from './dashboard.component';
test('dashboard respects its data contract',async()=>{const c=testContext(DashboardComponent,'owner');assert.equal(c.page.balance,c.store.list('invoices').reduce((sum,i)=>sum+c.store.balance(i),0));c.dispose();});
