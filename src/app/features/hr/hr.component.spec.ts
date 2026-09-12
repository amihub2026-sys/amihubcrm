import {test} from 'node:test';
import assert from 'node:assert/strict';
import {HR_ROUTES} from './hr.routes';
test('hr opens its default child and exposes unique lazy routes',async()=>{
 const redirect=HR_ROUTES.find(r=>r.path==='');
 assert.ok(redirect?.redirectTo);
 assert.ok(HR_ROUTES.some(r=>r.path===redirect?.redirectTo&&r.loadComponent));
 assert.equal(new Set(HR_ROUTES.map(r=>r.path)).size,HR_ROUTES.length);
});
