import {test} from 'node:test';
import assert from 'node:assert/strict';
import {testContext} from '../../../../testing/test-context';
import {InvoicesPageComponent} from '../../../features/accounts/pages/invoices/invoices.component';
import {RecordEditorComponent} from './record-editor.component';
test('editor cancels its draft without adding a record',async()=>{const c=testContext(InvoicesPageComponent);const editor=new RecordEditorComponent();editor.vm=c.page;const before=c.store.list('invoices').length;editor.vm.open();editor.vm.draft.invoiceNumber='UNSAVED';editor.vm.close();assert.equal(editor.vm.modal,false);assert.equal(c.store.list('invoices').length,before);c.dispose();});
