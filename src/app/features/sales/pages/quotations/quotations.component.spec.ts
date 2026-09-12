import {test} from 'node:test';
import assert from 'node:assert/strict';
import {testContext} from '../../../../../testing/test-context';
import {QuotationsPageComponent} from './quotations.component';

test('cancelling item edits preserves the saved record',async()=>{const c=testContext(QuotationsPageComponent);const original=c.store.save('quotations',{...c.store.list('quotations')[0],items:[{description:'Website',quantity:1,unitPrice:12000}]});c.page.open(original);c.page.draft.items[0].unitPrice=500;c.page.close();assert.equal(c.store.list('quotations')[0].items[0].unitPrice,12000);c.dispose();});
