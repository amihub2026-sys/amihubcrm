import {test} from 'node:test';
import assert from 'node:assert/strict';
import {CUSTOMERS_ROUTES} from './customers.routes';
test('customers opens its default child and exposes unique lazy routes',async()=>{
 const redirect=CUSTOMERS_ROUTES.find(r=>r.path==='');
 assert.ok(redirect?.redirectTo);
 assert.ok(CUSTOMERS_ROUTES.some(r=>r.path===redirect?.redirectTo&&r.loadComponent));
 assert.equal(new Set(CUSTOMERS_ROUTES.map(r=>r.path)).size,CUSTOMERS_ROUTES.length);
});
