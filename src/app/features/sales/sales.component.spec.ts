import {test} from 'node:test';
import assert from 'node:assert/strict';
import {SALES_ROUTES} from './sales.routes';
test('sales opens its default child and exposes unique lazy routes',async()=>{
 const redirect=SALES_ROUTES.find(r=>r.path==='');
 assert.ok(redirect?.redirectTo);
 assert.ok(SALES_ROUTES.some(r=>r.path===redirect?.redirectTo&&r.loadComponent));
 assert.equal(new Set(SALES_ROUTES.map(r=>r.path)).size,SALES_ROUTES.length);
});
