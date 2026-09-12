import {test} from 'node:test';
import assert from 'node:assert/strict';
import {testContext} from '../../../../testing/test-context';
import {AccountsService} from './accounts.service';
test('accounts repository rejects writes outside its feature',async()=>{const c=testContext(AccountsService);assert.throws(()=>c.page.save('unrelated-collection',{},'Admin'));assert.ok(c.page.list('invoices'));c.dispose();});
