import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Empleado } from 'src/app/entities/empleado';
import { EmpleadoService } from 'src/app/services/empleado.service';
import { EmpleadoFormModalComponent } from './empleado-form-modal/empleado-form-modal.component';
import swal from 'sweetalert2';

@Component({
  selector: 'app-empleados',
  templateUrl: './empleados.component.html',
  styleUrls: ['./empleados.component.scss']
})
export class EmpleadosComponent implements OnInit {

  listEmpleado: Empleado[];
  paginaActual: number = 1;
  pageNumber: number = 0;
  totalItems: number = 0;

  constructor(
    private empleadoService: EmpleadoService,
    private modalService: NgbModal,
  ) { }

  ngOnInit(): void {
    this.getListEmpleados();
  }

  getListEmpleados() {
    this.empleadoService.getListEmpleados(this.pageNumber).subscribe(
      response => {
        this.listEmpleado = response.content as Empleado[];
        this.totalItems = response.totalElements as number;
      }
    );
  }

  abrirEmpleadoFormModal(empleado: Empleado) {
    if (!empleado) {
      empleado = new Empleado()
    }
    const modalRef = this.modalService.open(EmpleadoFormModalComponent, { centered: true });
    modalRef.componentInstance.empleado = empleado;
    modalRef.result.then((result: any) => {
      this.getListEmpleados();
    }).catch((res: any) => { });
  }

  delete(empleado: Empleado) {
    swal.fire({
      title: '¿ Esta Seguro ?',
      text: "! No podrás recuperar al empleado luego de eliminarlo !",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Si, eliminar!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.empleadoService.delete(empleado.id).subscribe(
          response => {
            swal.fire('Empleados', `El empleado ha sido eliminado con exito`, 'success');
            this.getListEmpleados();
          },
          err => {
            swal.fire(`${err.error.mensaje}`, `${err.error.error}`, 'error');
          }
        )
      }
    })

  }


  pageChanged(event: any) {
    this.paginaActual = event;
    this.pageNumber = this.paginaActual - 1;
    this.getListEmpleados()
  }
}
