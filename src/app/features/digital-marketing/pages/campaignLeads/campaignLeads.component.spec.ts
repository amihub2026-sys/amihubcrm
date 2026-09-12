import {test} from 'node:test';
import assert from 'node:assert/strict';
import {testContext} from '../../../../../testing/test-context';
import {CampaignLeadsPageComponent} from './campaignLeads.component';
test('campaignLeads search leaves source records unchanged',()=>{const c=testContext(CampaignLeadsPageComponent);const count=c.store.list('campaignLeads').length;c.page.query='not-a-real-match';assert.equal(c.page.rows.length,0);assert.equal(c.store.list('campaignLeads').length,count);c.dispose();});
