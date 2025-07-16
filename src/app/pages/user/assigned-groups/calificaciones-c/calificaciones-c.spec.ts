import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CalificacionesC } from './calificaciones-c';

describe('CalificacionesC', () => {
  let component: CalificacionesC;
  let fixture: ComponentFixture<CalificacionesC>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CalificacionesC]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CalificacionesC);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
