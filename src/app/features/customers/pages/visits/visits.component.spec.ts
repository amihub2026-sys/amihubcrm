import {test} from 'node:test';
import assert from 'node:assert/strict';
import {testContext} from '../../../../../testing/test-context';
import {VisitsPageComponent} from './visits.component';
test('visits search leaves source records unchanged',()=>{const c=testContext(VisitsPageComponent);const count=c.store.list('visits').length;c.page.query='not-a-real-match';assert.equal(c.page.rows.length,0);assert.equal(c.store.list('visits').length,count);c.dispose();});
