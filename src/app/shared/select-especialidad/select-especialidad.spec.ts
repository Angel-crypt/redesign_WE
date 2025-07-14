import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SelectEspecialidad } from './select-especialidad';

describe('SelectEspecialidad', () => {
  let component: SelectEspecialidad;
  let fixture: ComponentFixture<SelectEspecialidad>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SelectEspecialidad]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SelectEspecialidad);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
