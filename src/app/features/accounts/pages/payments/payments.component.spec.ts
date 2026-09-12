import {test} from 'node:test';
import assert from 'node:assert/strict';
import {testContext} from '../../../../../testing/test-context';
import {PaymentsPageComponent} from './payments.component';

test('rejects overpayment and records partial receipts',async()=>{const c=testContext(PaymentsPageComponent);const invoice=c.store.list('invoices')[0];const balance=c.store.balance(invoice);c.page.draft={invoiceId:invoice.id,amount:balance+1,status:'RECEIVED'};await c.page.save();assert.ok(c.page.error);assert.equal(c.store.balance(invoice),balance);c.page.draft={invoiceId:invoice.id,amount:6000,installmentId:'IS-101',status:'RECEIVED'};await c.page.save();assert.equal(c.page.error,'');assert.equal(c.store.balance(invoice),balance-6000);c.dispose();});
