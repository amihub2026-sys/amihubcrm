import {test} from 'node:test';
import assert from 'node:assert/strict';
import {testContext} from '../../../../../testing/test-context';
import {ServicesPageComponent} from './services.component';

test('services: empty search leaves stored records untouched',async()=>{const c=testContext(ServicesPageComponent);const before=structuredClone(c.store.list('services'));c.page.query='__no_matching_record__';assert.equal(c.page.rows.length,0);assert.equal(c.page.pages,1);assert.deepEqual(c.store.list('services'),before);c.dispose();});
