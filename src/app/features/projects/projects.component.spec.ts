import {test} from 'node:test';
import assert from 'node:assert/strict';
import {PROJECTS_ROUTES} from './projects.routes';
test('projects opens its default child and exposes unique lazy routes',async()=>{
 const redirect=PROJECTS_ROUTES.find(r=>r.path==='');
 assert.ok(redirect?.redirectTo);
 assert.ok(PROJECTS_ROUTES.some(r=>r.path===redirect?.redirectTo&&r.loadComponent));
 assert.equal(new Set(PROJECTS_ROUTES.map(r=>r.path)).size,PROJECTS_ROUTES.length);
});
