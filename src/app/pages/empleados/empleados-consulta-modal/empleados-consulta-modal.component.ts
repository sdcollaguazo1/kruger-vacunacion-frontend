import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Vacuna } from 'src/app/entities/vacuna';
import { VacunaService } from 'src/app/services/vacuna.service';
import swal from 'sweetalert2';

@Component({
  selector: 'app-empleados-consulta-modal',
  templateUrl: './empleados-consulta-modal.component.html',
  styleUrls: ['./empleados-consulta-modal.component.scss']
})
export class EmpleadosConsultaModalComponent implements OnInit {

  consultas: any[] = [];
  consulta: any = null;

  estados: any[] = [];
  estado: any = null

  listVacunas:Vacuna[] = []
  vacuna:Vacuna = new Vacuna()

  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });

  constructor(public activeModal: NgbActiveModal, 
    private vacunaService: VacunaService) { }

  ngOnInit(): void {
    this.getVacunas();

    this.consultas = [
      { id: 1, nombre: 'Estado de vacunación' },
      { id: 2, nombre: 'Tipo de vacuna' },
      { id: 3, nombre: 'Fecha de vacunación' },
    ]

    this.estados = [
      { id: 1, nombre: 'Vacunado', vacunado: true },
      { id: 2, nombre: 'No Vacunado', vacunado: false },
    ]
  }

  selectConsulta(event: any) {
    this.estado = null;
    this.vacuna = new Vacuna();

    this.range = new FormGroup({
      start: new FormControl(),
      end: new FormControl()
    })
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

  consultar() {
    let result = {
      'id': this.consulta.id,
      'estado': this.estado?.vacunado ?? null,
      'vacuna': this.vacuna?.id ?? null,
      'fechaInicio': this.range.value.start,
      'fechaFin': this.range.value.end
    }
    this.activeModal.close(result);
  }
}
