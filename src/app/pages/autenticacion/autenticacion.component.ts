import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Usuario } from 'src/app/entities/usuario';
import { AuthService } from 'src/app/services/auth.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-autenticacion',
  templateUrl: './autenticacion.component.html',
  styleUrls: ['./autenticacion.component.scss']
})
export class AutenticacionComponent implements OnInit {

  usuario: Usuario;

  constructor(
    private authService: AuthService,
    private router: Router
  ) {
    this.usuario = new Usuario();
  }

  ngOnInit(): void {
    if(this.authService.isAuthenticated()){
      //swal.fire('Inicio de sesión','! Ya has iniciado sesión! ','info');
      this.router.navigate(['/inicio']);
    }
  }

  login():void{
    
    if(this.usuario.username == null || this.usuario.contrasena == null){
      swal.fire('Error inicio de sesión','! Usuario o contraseña vacías! ','error');
      return;
    }
    
    this.authService.login(this.usuario).subscribe(
      response => {
      
        this.authService.guardarUsuario(response.access_token);
        this.authService.guardarToken(response.access_token);
        let usuario = this.authService.usuario;
      
        this.router.navigate(['/inicio']);
        
        swal.fire('Inicio de sesión',`! Has iniciado sesión con exito ${usuario.username} ! `,'success');
      },
      err => {

        if(err.status == 400){
          swal.fire('Inicio de sesión','! Usuario o contraseña incorrecta ! ','error');
        }

        if(err.status == 500){
          swal.fire('Licencia Caducada','! Por favor comuniquese con el administrador de sistema ! ','error');
        }
      }
    )
  }

}
