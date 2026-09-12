import {test} from 'node:test';
import assert from 'node:assert/strict';
import {testContext} from '../../../testing/test-context';
import {ReportsComponent} from './reports.component';
test('reports respects its data contract',async()=>{const c=testContext(ReportsComponent,'accounts');assert.ok(c.page.domains.every(d=>d.key==='invoices'));c.dispose();});
