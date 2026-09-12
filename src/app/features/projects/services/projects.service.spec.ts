import {test} from 'node:test';
import assert from 'node:assert/strict';
import {testContext} from '../../../../testing/test-context';
import {ProjectsService} from './projects.service';
test('projects repository rejects writes outside its feature',async()=>{const c=testContext(ProjectsService);assert.throws(()=>c.page.save('unrelated-collection',{},'Admin'));assert.ok(c.page.list('projects'));c.dispose();});
