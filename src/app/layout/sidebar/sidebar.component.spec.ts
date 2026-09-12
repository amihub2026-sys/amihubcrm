import {test} from 'node:test';
import assert from 'node:assert/strict';
import {testContext} from '../../../testing/test-context';
import {SidebarComponent} from './sidebar.component';
test('developer sidebar excludes accounts, HR and sales',async()=>{const c=testContext(SidebarComponent,'developer');const paths=c.page.visibleItems().map(i=>i.route);assert.ok(paths.includes('/projects'));assert.ok(!paths.includes('/accounts'));assert.ok(!paths.includes('/sales'));assert.ok(!paths.includes('/hr'));c.dispose();});
