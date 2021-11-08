import { LOCALE_ID, NgModule } from '@angular/core';
//Añadir Common module antes de browserModule para evitar inconvenientes
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//Librerias para interceptores
import {HttpClientModule,HTTP_INTERCEPTORS} from '@angular/common/http';

//Importar interceptores
import { TokenInterceptor } from './interceptors/token.interceptor';
import { AuthInterceptor } from './interceptors/auth.interceptor';

//Librerias de formularios
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

//Librerias de Angular Material
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button'; 

//Librerias para fechas y date picker
import { MatDatepickerModule } from '@angular/material/datepicker';
import {MatMomentDateModule} from '@angular/material-moment-adapter';
import { Moment } from 'moment';

//Librerias menu lateral
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatDividerModule } from '@angular/material/divider';
import { MatMenuModule } from '@angular/material/menu';
import { MatListModule } from '@angular/material/list'; 
import { MatExpansionModule } from '@angular/material/expansion'; 
import {MatSelectModule} from '@angular/material/select'; 
import {MatTooltipModule} from '@angular/material/tooltip';

//Librerias de Bootstrap
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';


//Libreria para paginacion
import {NgxPaginationModule} from 'ngx-pagination';

//Librerias de lenguaje en español
import {registerLocaleData} from '@angular/common';
import localeES from '@angular/common/locales/es';


//Google charts
import { GoogleChartsModule } from 'angular-google-charts';

//Componentes
import { AutenticacionComponent } from './pages/autenticacion/autenticacion.component';
import { InicioComponent } from './pages/inicio/inicio.component';
import { MenuLateralComponent } from './shared/menu-lateral/menu-lateral.component';
import { EmpleadosComponent } from './pages/empleados/empleados.component';
import { RegistroComponent } from './pages/registro/registro.component';
import { EmpleadoFormModalComponent } from './pages/empleados/empleado-form-modal/empleado-form-modal.component';
import { EmpleadosConsultaModalComponent } from './pages/empleados/empleados-consulta-modal/empleados-consulta-modal.component'


registerLocaleData(localeES,'es')

@NgModule({
  declarations: [
    AppComponent,
    AutenticacionComponent,
    InicioComponent,
    MenuLateralComponent,
    EmpleadosComponent,
    RegistroComponent,
    EmpleadoFormModalComponent,
    EmpleadosConsultaModalComponent
  ],
  imports: [
    CommonModule,
    BrowserModule,  
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    HttpClientModule,
    NgbModalModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatIconModule,
    MatButtonModule,
    FormsModule,
    LayoutModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatDividerModule,
    MatMenuModule,
    MatExpansionModule,
    NgxPaginationModule,
    MatDatepickerModule,
    MatMomentDateModule,
    MatSelectModule,
    MatTooltipModule,
    GoogleChartsModule,
  ],
  
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptor, multi: true },
    {provide: LOCALE_ID, useValue: 'es' }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
