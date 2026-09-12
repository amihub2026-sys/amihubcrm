import {test} from 'node:test';
import assert from 'node:assert/strict';
import {routes} from './app.routes';
test('unknown URLs return to the default workspace',async()=>{assert.equal(routes.at(-1)?.path,'**');assert.equal(routes.at(-1)?.redirectTo,'');});
