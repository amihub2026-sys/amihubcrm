import {test} from 'node:test';
import assert from 'node:assert/strict';
import {testContext} from '../../../../../testing/test-context';
import {RenewalsPageComponent} from './renewals.component';

test('rejects renewal expiry before service start',async()=>{const c=testContext(RenewalsPageComponent);const before=c.store.list('renewals').length;c.page.draft={serviceName:'Hosting',startDate:'2026-10-01',expiryDate:'2026-09-01',status:'RENEWED'};await c.page.save();assert.ok(c.page.error);assert.equal(c.store.list('renewals').length,before);c.dispose();});
