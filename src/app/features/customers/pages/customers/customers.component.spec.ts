import {test} from 'node:test';
import assert from 'node:assert/strict';
import {testContext} from '../../../../../testing/test-context';
import {CustomersPageComponent} from './customers.component';

test('customers: empty search leaves stored records untouched',async()=>{const c=testContext(CustomersPageComponent);const before=structuredClone(c.store.list('customers'));c.page.query='__no_matching_record__';assert.equal(c.page.rows.length,0);assert.equal(c.page.pages,1);assert.deepEqual(c.store.list('customers'),before);c.dispose();});
