import {test} from 'node:test';
import assert from 'node:assert/strict';
import {testContext} from '../../../../testing/test-context';
import {CustomersService} from './customers.service';
test('customers repository rejects writes outside its feature',async()=>{const c=testContext(CustomersService);assert.throws(()=>c.page.save('unrelated-collection',{},'Admin'));assert.ok(c.page.list('customers'));c.dispose();});
