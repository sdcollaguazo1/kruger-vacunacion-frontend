import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EmpleadoFormModalComponent } from './empleado-form-modal.component';

describe('EmpleadoFormModalComponent', () => {
  let component: EmpleadoFormModalComponent;
  let fixture: ComponentFixture<EmpleadoFormModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EmpleadoFormModalComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EmpleadoFormModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
