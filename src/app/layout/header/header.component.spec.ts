import {test} from 'node:test';
import assert from 'node:assert/strict';
import {testContext} from '../../../testing/test-context';
import {HeaderComponent} from './header.component';
test('accounts reminders include due invoices',async()=>{const c=testContext(HeaderComponent,'accounts');c.store.save('invoices',{invoiceNumber:'TEST-DUE',dueDate:'2000-01-01',status:'SENT',subtotal:100});assert.ok(c.page.reminders.some(r=>r.title==='TEST-DUE payment'));c.dispose();});
