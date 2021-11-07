import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';
import { Router } from '@angular/router';
import swal from 'sweetalert2';

@Component({
  selector: 'app-menu-lateral',
  templateUrl: './menu-lateral.component.html',
  styleUrls: ['./menu-lateral.component.scss']
})
export class MenuLateralComponent {

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    public authService:AuthService,
    private router: Router,
    ) {}

  logout(): void {
    this.authService.logout();
    swal.fire('Cerrar sesión', '! Has cerrado sesión con exito! ', 'success');
    this.router.navigate(['/login']);
  }

  getUrl() { 
    let urlFondo = '../assets/img/registro.jpg'
      return 'url('+urlFondo+')'
  }

}
