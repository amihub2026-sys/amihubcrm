import {test} from 'node:test';
import assert from 'node:assert/strict';
import {testContext} from '../../../../../testing/test-context';
import {BillingProfilePageComponent} from './billingProfile.component';
test('billingProfile search leaves source records unchanged',()=>{const c=testContext(BillingProfilePageComponent);const count=c.store.list('billingProfile').length;c.page.query='not-a-real-match';assert.equal(c.page.rows.length,0);assert.equal(c.store.list('billingProfile').length,count);c.dispose();});
