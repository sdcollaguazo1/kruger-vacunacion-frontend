import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { AutenticacionComponent } from './pages/autenticacion/autenticacion.component';
import { EmpleadosComponent } from './pages/empleados/empleados.component';
import { InicioComponent } from './pages/inicio/inicio.component';
import { RegistroComponent } from './pages/registro/registro.component';

const routes: Routes = [
  { path: 'inicio', component: InicioComponent,canActivate: [AuthGuard],data: { role: ['ROLE_ADMIN', 'ROLE_USER'] ,breadcrumb: 'Inicio'}},
  { path: 'empleados', component: EmpleadosComponent, canActivate: [AuthGuard], data: { role: ['ROLE_ADMIN'] } },
  { path: 'registro', component: RegistroComponent, canActivate: [AuthGuard], data: { role: ['ROLE_USER'] } },
  { path: 'login', component: AutenticacionComponent },
  { path: '**', redirectTo: 'inicio',pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
