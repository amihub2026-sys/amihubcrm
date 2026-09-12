import {test} from 'node:test';
import assert from 'node:assert/strict';
import {SUPPORTRENEWALS_ROUTES} from './support-renewals.routes';
test('support-renewals opens its default child and exposes unique lazy routes',async()=>{
 const redirect=SUPPORTRENEWALS_ROUTES.find(r=>r.path==='');
 assert.ok(redirect?.redirectTo);
 assert.ok(SUPPORTRENEWALS_ROUTES.some(r=>r.path===redirect?.redirectTo&&r.loadComponent));
 assert.equal(new Set(SUPPORTRENEWALS_ROUTES.map(r=>r.path)).size,SUPPORTRENEWALS_ROUTES.length);
});
