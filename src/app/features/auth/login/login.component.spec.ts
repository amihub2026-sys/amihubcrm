import {test} from 'node:test';
import assert from 'node:assert/strict';
import {createEnvironmentInjector,runInInjectionContext,EnvironmentInjector} from '@angular/core';
import {LoginComponent} from './login.component';
import {AuthService} from '../../../core/services/auth.service';
test('login sends email/password without a self-selected role',async()=>{let received:unknown[]=[];const injector=createEnvironmentInjector([{provide:AuthService,useValue:{login:async(...args:unknown[])=>{received=args;}}}],null as unknown as EnvironmentInjector);const page=runInInjectionContext(injector,()=>new LoginComponent());page.email='sales@example.com';page.password='test-password';await page.submit();assert.deepEqual(received,['sales@example.com','test-password']);assert.equal(page.password,'');assert.equal(page.busy(),false);injector.destroy();});
test('failed login reports an error and releases loading state',async()=>{const injector=createEnvironmentInjector([{provide:AuthService,useValue:{login:async()=>{throw {status:401};}}}],null as unknown as EnvironmentInjector);const page=runInInjectionContext(injector,()=>new LoginComponent());page.email='a@example.com';page.password='bad';await page.submit();assert.match(page.error(),/incorrect/);assert.equal(page.busy(),false);injector.destroy();});
