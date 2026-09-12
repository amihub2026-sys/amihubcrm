import {test} from 'node:test';
import assert from 'node:assert/strict';
import {testContext} from '../../../../testing/test-context';
import {SupportRenewalsService} from './support-renewals.service';
test('support-renewals repository rejects writes outside its feature',async()=>{const c=testContext(SupportRenewalsService);assert.throws(()=>c.page.save('unrelated-collection',{},'Admin'));assert.ok(c.page.list('tickets'));c.dispose();});
