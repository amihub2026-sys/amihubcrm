import {test} from 'node:test';
import assert from 'node:assert/strict';
import {testContext} from '../../../../testing/test-context';
import {SettingsService} from './settings.service';
test('settings repository rejects writes outside its feature',async()=>{const c=testContext(SettingsService);assert.throws(()=>c.page.save('unrelated-collection',{},'Admin'));assert.ok(c.page.list('users'));c.dispose();});
