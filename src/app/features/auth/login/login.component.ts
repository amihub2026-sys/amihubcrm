import {CommonModule} from '@angular/common';
import {Component,inject,signal} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpErrorResponse} from '@angular/common/http';
import {AuthService} from '../../../core/services/auth.service';
@Component({selector:'app-login',standalone:true,imports:[CommonModule,FormsModule],templateUrl:'./login.component.html',styleUrl:'./login.component.css'})
export class LoginComponent {
 readonly auth=inject(AuthService);
 email='';password='';showPassword=false;readonly busy=signal(false);readonly error=signal('');
 async submit(){
  if(this.busy()||!this.email.trim()||!this.password)return;
  this.busy.set(true);this.error.set('');
  try{await this.auth.login(this.email,this.password);this.password='';}
  catch(error){const status=(error as HttpErrorResponse)?.status;this.error.set(status===401?'The email or password is incorrect.':status===403?'Your account does not have access. Contact your administrator.':status===429?'Too many sign-in attempts. Please try again later.':'Unable to reach the sign-in service. Please try again or contact your administrator.');}
  finally{this.busy.set(false);}
 }
}
