import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Empleado } from 'src/app/entities/empleado';
import { Vacuna } from 'src/app/entities/vacuna';
import { AuthService } from 'src/app/services/auth.service';
import { EmpleadoService } from 'src/app/services/empleado.service';
import { VacunaService } from 'src/app/services/vacuna.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.component.html',
  styleUrls: ['./registro.component.scss']
})
export class RegistroComponent implements OnInit {

  empleado: Empleado = new Empleado();
  isChecked: boolean = false;
  empleadoForm: FormGroup;
  listVacunas:Vacuna[]=[];
  listValidator:any[]=[];

  constructor(
    private authService: AuthService,
    private empleadoService: EmpleadoService,
    private vacunaService:VacunaService,
    private formBuilder: FormBuilder,
  ) { }

  ngOnInit(): void {
    this.validators();
    this.getUsuario();
    this.getVacunas();
  }

  validators() {
    this.empleadoForm = this.formBuilder.group({
      cedula: new FormControl({ value: this.empleado.cedula, disabled: true }, [Validators.required, Validators.maxLength(10), Validators.minLength(10), Validators.pattern('^[0-9,$]*$')]),
      nombre: new FormControl({ value: this.empleado.nombre, disabled: true }, [Validators.required, Validators.maxLength(100), Validators.pattern('[A-Za-z ]+')]),
      apellido: new FormControl({ value: this.empleado.apellido, disabled: true }, [Validators.required, Validators.maxLength(100), Validators.pattern('[A-Za-z ]+')]),
      email: new FormControl({ value: this.empleado.email, disabled: true }, [Validators.required, Validators.email, Validators.maxLength(100)]),
      id: new FormControl(this.empleado.id),
      fecha_nacimiento: new FormControl(this.empleado.fecha_nacimiento),
      direccion: new FormControl(this.empleado.direccion),
      numero_telefono: new FormControl(this.empleado.numero_telefono),
      estado: new FormControl(this.empleado.estado),
      vacuna: new FormControl(this.empleado.vacuna,this.listValidator),
      fecha_vacuna: new FormControl(this.empleado.fecha_vacuna,this.listValidator),
      num_dosis: new FormControl(this.empleado.num_dosis,this.listValidator)
    })
  }

  getUsuario() {
    this.empleadoService.getEmpleado(this.authService.usuario.id).subscribe(
      empleado => {
        this.empleado = empleado;
        this.isChecked = this.empleado.estado
        if(this.empleado.vacuna.id == 1){
          this.empleado.vacuna = null;
        }
        this.validators();
      },
      err => {
        swal.fire(`${err.error.mensaje}`, `${err.error.error}`, 'error');
      }
    )
  }

  update() {
    this.empleadoForm.value.cedula = this.empleado.cedula
    this.empleadoForm.value.nombre = this.empleado.nombre
    this.empleadoForm.value.apellido = this.empleado.apellido
    this.empleadoForm.value.email = this.empleado.email
    console.log('-----------')
    console.log(this.empleadoForm.value)
    this.empleadoService.update(this.empleadoForm.value).subscribe(
      empleado => {
        swal.fire('Empleados', `Empleado ${empleado.nombre} ${empleado.apellido} actualizado con éxito`, 'success');
      },
      err => {
        swal.fire(`${err.error.mensaje}`, `${err.error.error}`, 'error');
      }
    )
  }

  getVacunas() {
    this.vacunaService.getListVacunas().subscribe(
      vacunas => {
        this.listVacunas = vacunas
      },
      err => {
        swal.fire(`${err.error.mensaje}`, `${err.error.error}`, 'error');
      }
    )
  }

  checkEstado(check: boolean){
    this.isChecked = check;
    if(check){
      this.guardarInf()
      this.listValidator = [Validators.required]
      this.validators();
    }else{
      this.guardarInf()
      this.listValidator = []
      this.validators();
    }
  }

  guardarInf(){
    this.empleado.estado = this.empleadoForm.value.estado
    this.empleado.fecha_nacimiento = this.empleadoForm.value.fecha_nacimiento
    this.empleado.direccion = this.empleadoForm.value.direccion
    this.empleado.numero_telefono = this.empleadoForm.value.numero_telefono
  }
  
  compararVacuna(v1: Vacuna, v2: Vacuna): boolean {
    if (v1 === undefined && v2 === undefined) {
      return true;
    }
    return v1 === null || v2 === null || v1 === undefined || v2 === undefined ? false : v1.id === v2.id;
  }
}
