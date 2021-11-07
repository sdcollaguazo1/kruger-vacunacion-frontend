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
  
  constructor(
    public activeModal: NgbActiveModal,
    private formBuilder: FormBuilder,
    private empleadoService: EmpleadoService,
  ) { }

  
  ngOnInit(): void {
    this.validators();
  }

  validators() {
    this.empleadoForm = this.formBuilder.group({
      cedula: new FormControl(this.empleado.cedula, [Validators.required, Validators.maxLength(10),Validators.minLength(10),Validators.pattern('^[0-9,$]*$')]),
      nombre: new FormControl(this.empleado.nombre, [Validators.required, Validators.maxLength(100),Validators.pattern('[A-Za-z ]+')]),
      apellido: new FormControl(this.empleado.apellido, [Validators.required, Validators.maxLength(100),Validators.pattern('[A-Za-z ]+')]),
      email: new FormControl(this.empleado.email, [Validators.required, Validators.email, Validators.maxLength(100)]),
      id: new FormControl(this.empleado.id),
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
