import {test} from 'node:test';
import assert from 'node:assert/strict';
import {testContext} from '../../../../testing/test-context';
import {LeadsPageComponent} from '../../../features/sales/pages/leads/leads.component';
import {RecordTableComponent} from './record-table.component';
test('table paging exposes only the selected page',async()=>{const c=testContext(LeadsPageComponent);for(let i=0;i<12;i++)c.store.save('leads',{businessName:'Test '+i,status:'NEW'});const table=new RecordTableComponent();table.vm=c.page;const first=table.vm.paged.map(r=>r.id);table.vm.page=2;assert.equal(table.vm.paged.length,8);assert.ok(table.vm.paged.every(r=>!first.includes(r.id)));c.dispose();});
