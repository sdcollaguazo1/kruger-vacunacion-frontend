import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { AuthService } from '../services/auth.service';
import swal from 'sweetalert2';
import { catchError } from 'rxjs/operators';
import { Router } from '@angular/router'

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private authService: AuthService,
    private router: Router,
  ) { }

  //Intercepta las peticiones y muestra mensajes dependiendo del status de la petición
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(request).pipe(
      catchError(e => {

        //No autenticado, retorna al login
        if(e.status == 401 ){

          if(this.authService.isAuthenticated()){
            this.authService.logout();
          }
    
          this.router.navigate(['/login'])
          
        }
    
        //No tiene acceso al recurso
        if(e.status == 403){
          swal.fire(
            'Acceso denegado',
            '! No tienes acceso al recurso !',
            'warning' 
          ),
          this.router.navigate(['/inicio'])         
        }
        return throwError(e);
      })
        
    );
  }
}
