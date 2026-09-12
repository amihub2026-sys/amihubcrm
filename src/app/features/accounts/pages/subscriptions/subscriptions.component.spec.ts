import {test} from 'node:test';
import assert from 'node:assert/strict';
import {testContext} from '../../../../../testing/test-context';
import {SubscriptionsPageComponent} from './subscriptions.component';
test('subscriptions search leaves source records unchanged',()=>{const c=testContext(SubscriptionsPageComponent);const count=c.store.list('subscriptions').length;c.page.query='not-a-real-match';assert.equal(c.page.rows.length,0);assert.equal(c.store.list('subscriptions').length,count);c.dispose();});
