import {test} from 'node:test';
import assert from 'node:assert/strict';
import {testContext} from '../../../../testing/test-context';
import {DigitalMarketingService} from './digital-marketing.service';
test('digital-marketing repository rejects writes outside its feature',async()=>{const c=testContext(DigitalMarketingService);assert.throws(()=>c.page.save('unrelated-collection',{},'Admin'));assert.ok(c.page.list('plans'));c.dispose();});
