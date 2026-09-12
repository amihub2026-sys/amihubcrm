import {test} from 'node:test';
import assert from 'node:assert/strict';
import {DIGITALMARKETING_ROUTES} from './digital-marketing.routes';
test('digital-marketing opens its default child and exposes unique lazy routes',async()=>{
 const redirect=DIGITALMARKETING_ROUTES.find(r=>r.path==='');
 assert.ok(redirect?.redirectTo);
 assert.ok(DIGITALMARKETING_ROUTES.some(r=>r.path===redirect?.redirectTo&&r.loadComponent));
 assert.equal(new Set(DIGITALMARKETING_ROUTES.map(r=>r.path)).size,DIGITALMARKETING_ROUTES.length);
});
