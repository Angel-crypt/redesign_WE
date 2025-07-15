import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DisponibilidadC } from './disponibilidad-c';

describe('DisponibilidadC', () => {
  let component: DisponibilidadC;
  let fixture: ComponentFixture<DisponibilidadC>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DisponibilidadC]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DisponibilidadC);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
