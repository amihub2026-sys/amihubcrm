import {test} from 'node:test';
import assert from 'node:assert/strict';
import {testContext} from '../../../testing/test-context';
import {TestStore as CrmStore} from '../../../testing/test-store';
test('rapid creates have distinct identities and survive reload',async()=>{const c=testContext(CrmStore);const ids=Array.from({length:30},(_,i)=>c.store.save('leads',{businessName:'Lead '+i,status:'NEW'}).id);assert.equal(new Set(ids).size,30);const next=new CrmStore();assert.ok(ids.every(id=>next.list('leads').some(x=>x.id===id)));c.dispose();});
