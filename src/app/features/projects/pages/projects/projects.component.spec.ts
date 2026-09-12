import {test} from 'node:test';
import assert from 'node:assert/strict';
import {testContext} from '../../../../../testing/test-context';
import {ProjectsPageComponent} from './projects.component';

test('HR project access is read only',async()=>{const c=testContext(ProjectsPageComponent,'hr');const before=c.store.list('projects').length;c.page.draft={projectName:'Forbidden',status:'DESIGN'};await c.page.save();assert.equal(c.page.canEdit,false);assert.equal(c.store.list('projects').length,before);c.dispose();});
