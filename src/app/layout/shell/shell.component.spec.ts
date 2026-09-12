import {test} from 'node:test';
import assert from 'node:assert/strict';
import {routes} from '../../app.routes';
test('shell requires authentication and protects accounts by role',async()=>{const shell=routes.find(r=>r.path==='');assert.ok(shell?.canActivate?.length);const accounts=shell?.children?.find(r=>r.path==='accounts');assert.ok(accounts?.canActivate?.length);assert.ok(accounts?.data?.['roles'].includes('accounts'));assert.ok(!accounts?.data?.['roles'].includes('developer'));});
