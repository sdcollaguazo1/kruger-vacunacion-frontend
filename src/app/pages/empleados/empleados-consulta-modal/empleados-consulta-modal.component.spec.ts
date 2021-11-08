import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpleadosConsultaModalComponent } from './empleados-consulta-modal.component';

describe('EmpleadosConsultaModalComponent', () => {
  let component: EmpleadosConsultaModalComponent;
  let fixture: ComponentFixture<EmpleadosConsultaModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmpleadosConsultaModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmpleadosConsultaModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
