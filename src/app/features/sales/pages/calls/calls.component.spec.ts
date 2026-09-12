import {test} from 'node:test';
import assert from 'node:assert/strict';
import {testContext} from '../../../../../testing/test-context';
import {CallsPageComponent} from './calls.component';

test('saving a call schedules its next follow-up',async()=>{const c=testContext(CallsPageComponent);const before=c.store.list('followups').length;c.page.draft={leadId:'LD-1001',employeeId:'Priya S',nextFollowUpDate:'2026-10-12',status:'CONNECTED'};await c.page.save();assert.equal(c.store.list('followups').length,before+1);assert.equal(c.store.list('followups')[0].leadId,'LD-1001');c.dispose();});
