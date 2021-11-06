import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';

@Injectable()
export class TokenInterceptor implements HttpInterceptor {

  constructor(
    private authService:AuthService
  ) {}

  //Intercepta las peticiones y agrega en la cabezera el token
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<any>> {
    let token = this.authService.token;
    if(token != null){
      const authReq = request.clone({
        headers : request.headers.set('Authorization','Bearer '+token)
      });
      
      return next.handle(authReq);
    }
  return next.handle(request);
  }
}
