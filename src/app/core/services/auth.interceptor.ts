import {inject} from '@angular/core';
import {HttpInterceptorFn,HttpErrorResponse} from '@angular/common/http';
import {catchError,throwError} from 'rxjs';
import {AuthService} from './auth.service';
import {environment} from '../../../environments/environment';
export const authInterceptor:HttpInterceptorFn=(request,next)=>{
 const auth=inject(AuthService);
 const ownApi=request.url===environment.apiUrl||request.url.startsWith(environment.apiUrl+'/');
 if(!ownApi)return next(request);
 return next(request.clone({withCredentials:true})).pipe(catchError((error:HttpErrorResponse)=>{
  if(error.status===401&&!request.url.includes('/auth/'))auth.expire();
  return throwError(()=>error);
 }));
};
