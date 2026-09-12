import {test} from 'node:test';
import assert from 'node:assert/strict';
import {SETTINGS_ROUTES} from './settings.routes';
test('settings opens its default child and exposes unique lazy routes',async()=>{
 const redirect=SETTINGS_ROUTES.find(r=>r.path==='');
 assert.ok(redirect?.redirectTo);
 assert.ok(SETTINGS_ROUTES.some(r=>r.path===redirect?.redirectTo&&r.loadComponent));
 assert.equal(new Set(SETTINGS_ROUTES.map(r=>r.path)).size,SETTINGS_ROUTES.length);
});
