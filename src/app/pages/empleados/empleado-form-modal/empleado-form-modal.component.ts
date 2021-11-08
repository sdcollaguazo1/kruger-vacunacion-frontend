import { Component, Input, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Empleado } from 'src/app/entities/empleado';
import { EmpleadoService } from 'src/app/services/empleado.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-empleado-form-modal',
  templateUrl: './empleado-form-modal.component.html',
  styleUrls: ['./empleado-form-modal.component.scss']
})
export class EmpleadoFormModalComponent implements OnInit {

  @Input() empleado: Empleado = new Empleado();
  empleadoForm: FormGroup;
  titulo:string = ''

  constructor(
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private empleadoService: EmpleadoService,
  ) { }

  
  ngOnInit(): void {
    this.validators();
    if(this.empleado.id){
      this.titulo = 'Actualizar Empleado'
    }else{
      this.titulo = 'Crear Empleado'
    }
  }

  validators() {
    this.empleadoForm = this.formBuilder.group({
      cedula: new FormControl(this.empleado.cedula, [Validators.required, Validators.maxLength(10),Validators.minLength(10),Validators.pattern('^[0-9,$]*$')]),
      nombre: new FormControl(this.empleado.nombre, [Validators.required, Validators.maxLength(100),Validators.pattern('[A-Za-z ]+')]),
      apellido: new FormControl(this.empleado.apellido, [Validators.required, Validators.maxLength(100),Validators.pattern('[A-Za-z ]+')]),
      email: new FormControl(this.empleado.email, [Validators.required, Validators.email, Validators.maxLength(100)]),
      id: new FormControl(this.empleado.id),
      fecha_nacimiento: new FormControl(this.empleado.fecha_nacimiento),
      direccion: new FormControl(this.empleado.direccion),
      numero_telefono: new FormControl(this.empleado.numero_telefono),
      estado: new FormControl(this.empleado.estado),
      vacuna: new FormControl(this.empleado.vacuna),
      fecha_vacuna: new FormControl(this.empleado.fecha_vacuna),
      num_dosis: new FormControl(this.empleado.num_dosis)
    })
  }

  create(){
    this.empleadoService.create(this.empleadoForm.value).subscribe(
      empleado => {
        swal.fire('Empleados',`Empleado ${empleado.nombre} ${empleado.apellido} creado con éxito`, 'success');
        this.activeModal.close();
        
      },
      err => {
        swal.fire(`${err.error.mensaje}`,`${err.error.error}`, 'error');
      }
    )
  }

  update(){
    this.empleadoService.update(this.empleadoForm.value).subscribe(
      empleado => {
        swal.fire('Empleados',`Empleado ${empleado.nombre} ${empleado.apellido} actualizado con éxito`, 'success');
        this.activeModal.close();
      },
      err => {
        swal.fire(`${err.error.mensaje}`,`${err.error.error}`, 'error');
      }
    )
  }

}
