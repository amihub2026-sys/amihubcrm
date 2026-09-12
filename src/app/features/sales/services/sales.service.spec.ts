import {test} from 'node:test';
import assert from 'node:assert/strict';
import {testContext} from '../../../../testing/test-context';
import {SalesService} from './sales.service';
test('sales repository rejects writes outside its feature',async()=>{const c=testContext(SalesService);assert.throws(()=>c.page.save('unrelated-collection',{},'Admin'));assert.ok(c.page.list('leads'));c.dispose();});
