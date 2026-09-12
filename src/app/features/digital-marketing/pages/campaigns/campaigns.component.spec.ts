import {test} from 'node:test';
import assert from 'node:assert/strict';
import {testContext} from '../../../../../testing/test-context';
import {CampaignsPageComponent} from './campaigns.component';
test('campaigns search leaves source records unchanged',()=>{const c=testContext(CampaignsPageComponent);const count=c.store.list('campaigns').length;c.page.query='not-a-real-match';assert.equal(c.page.rows.length,0);assert.equal(c.store.list('campaigns').length,count);c.dispose();});
