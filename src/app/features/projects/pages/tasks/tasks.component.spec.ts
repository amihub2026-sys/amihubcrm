import {test} from 'node:test';
import assert from 'node:assert/strict';
import {testContext} from '../../../../../testing/test-context';
import {TasksPageComponent} from './tasks.component';

test('developer sees assigned tasks only',async()=>{const c=testContext(TasksPageComponent,'developer');assert.ok(c.page.rows.length);assert.ok(c.page.rows.every(x=>x.assignedTo==='Arjun M'));c.dispose();});
