import {test} from 'node:test';
import assert from 'node:assert/strict';
import {testContext} from '../../../../testing/test-context';
import {HrService} from './hr.service';
test('hr repository rejects writes outside its feature',async()=>{const c=testContext(HrService);assert.throws(()=>c.page.save('unrelated-collection',{},'Admin'));assert.ok(c.page.list('employees'));c.dispose();});
