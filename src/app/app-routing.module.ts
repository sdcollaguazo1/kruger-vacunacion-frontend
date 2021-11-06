import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './guards/auth.guard';
import { AutenticacionComponent } from './pages/autenticacion/autenticacion.component';
import { InicioComponent } from './pages/inicio/inicio.component';

const routes: Routes = [
  { path: 'inicio', component: InicioComponent,canActivate: [AuthGuard],data: { role: ['ROLE_ADMIN', 'ROLE_USER'] ,breadcrumb: 'Inicio'}},
  { path: 'login', component: AutenticacionComponent },
  { path: '**', redirectTo: 'inicio',pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
