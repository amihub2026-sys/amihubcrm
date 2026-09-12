import {test} from 'node:test';
import assert from 'node:assert/strict';
import {ACCOUNTS_ROUTES} from './accounts.routes';
test('accounts opens its default child and exposes unique lazy routes',async()=>{
 const redirect=ACCOUNTS_ROUTES.find(r=>r.path==='');
 assert.ok(redirect?.redirectTo);
 assert.ok(ACCOUNTS_ROUTES.some(r=>r.path===redirect?.redirectTo&&r.loadComponent));
 assert.equal(new Set(ACCOUNTS_ROUTES.map(r=>r.path)).size,ACCOUNTS_ROUTES.length);
});
