import {test} from 'node:test';
import assert from 'node:assert/strict';
import {testContext} from '../../../../../testing/test-context';
import {LeadsPageComponent} from './leads.component';

test('won leads convert once and preserve sourceLeadId',async()=>{const c=testContext(LeadsPageComponent);const lead=c.store.list('leads')[0];const before=c.store.list('customers').length;await c.page.convert(lead);assert.equal(c.store.list('customers').length,before);await c.page.convert({...lead,status:'WON'});await c.page.convert({...lead,status:'WON'});assert.equal(c.store.list('customers').length,before+1);assert.equal(c.store.list('customers')[0].sourceLeadId,lead.id);c.dispose();});
