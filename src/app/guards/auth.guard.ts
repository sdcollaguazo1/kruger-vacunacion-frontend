import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';
import { AuthService } from '../services/auth.service';
import swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(
    private authServices: AuthService,
    private router: Router,
  ) { }
  
  //Intercepta las rutas y muestra mensajes dependiendo de las validaciones
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      //Verifica autenticacion
      if (!this.authServices.isAuthenticated()) {
        this.router.navigate(['/login']);
        return false;
      }
  
      //Verifica la expiracion del token
      if (this.isTokenExpirado()) {
        this.authServices.logout();
        this.router.navigate(['/login']);
        return false;
      }
  
      //Verifica si tiene el rol asignado para acceder a la ruta
      let roles = route.data['role'] as string[];
      for (let i = 0; i < roles.length; i++) {
        if (this.authServices.hasRole(roles[i])) {
          return true;
        }
      }
  
  
      swal.fire('Acceso denegado', '! No tienes acceso a este recurso! ', 'error');
      this.router.navigate(['/inicio']);
      return false;
  }
  
  isTokenExpirado(): boolean {
    let token = this.authServices.token;
    let payload = this.authServices.obtenerDatosToken(token);
    let now = new Date().getTime() / 1000;
    if (payload.exp < now) {
      return true;
    }
    return false;
  }
}
