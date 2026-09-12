import {test} from 'node:test';
import assert from 'node:assert/strict';
import {testContext} from '../../../../../testing/test-context';
import {PromisesPageComponent} from './promises.component';
test('promises search leaves source records unchanged',()=>{const c=testContext(PromisesPageComponent);const count=c.store.list('promises').length;c.page.query='not-a-real-match';assert.equal(c.page.rows.length,0);assert.equal(c.store.list('promises').length,count);c.dispose();});
